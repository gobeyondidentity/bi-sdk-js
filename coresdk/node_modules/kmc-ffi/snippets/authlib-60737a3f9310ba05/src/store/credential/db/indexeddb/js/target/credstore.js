// src/err.js
var BadPlatform = class extends Error {
  constructor(facility) {
    super(`${facility} is not supported on this platform`);
    this.name = "BadPlatform";
  }
};
var InvalidArg = class extends Error {
  constructor(arg) {
    super(`invalid arg: ${arg}`);
    this.name = "InvalidArg";
  }
};
var OperationBlocked = class extends Error {
  constructor(op) {
    super(`operation blocked in ${op}`);
    this.name = "OperationBlocked";
  }
};
var KeyNotFound = class extends Error {
  constructor(handle) {
    super(`${handle} not found`);
    this.name = "KeyNotFound";
  }
};

// src/validate.js
function validateDatabase(tx) {
  return tx instanceof IDBDatabase;
}
function validateTransactionMode(mode) {
  return mode === "readonly" || mode === "readwrite";
}
function validateTransactionScope(scope) {
  return typeof scope === "string" || scope instanceof Array && scope.reduce((p, c) => p && typeof c === "string", true);
}
function validateTransaction(tx) {
  return tx instanceof IDBTransaction;
}
function validateObjectStore(store) {
  return typeof store === "string";
}

// src/idb.js
var idbTransaction = {
  readonly: "readonly",
  readwrite: "readwrite"
};
function idbOpenDb(name, version2, runMigrations2) {
  if (!window.indexedDB)
    return Promise.reject(new BadPlatform("indexedDB"));
  if (typeof name !== "string")
    return Promise.reject(new InvalidArg("name"));
  if (typeof version2 !== "number")
    return Promise.reject(new InvalidArg("version"));
  if (typeof runMigrations2 !== "function")
    return Promise.reject(new InvalidArg("runMigrations"));
  return new Promise((resolve, reject) => {
    try {
      const rq = window.indexedDB.open(name, version2);
      rq.onupgradeneeded = (e) => {
        try {
          runMigrations2(e.target.result, e.target.transaction, e.newVersion, e.oldVersion);
        } catch (err) {
          reject(err);
        }
      };
      rq.onblocked = (e) => {
        reject(new OperationBlocked("idbOpenDb"));
      };
      rq.onerror = (e) => {
        reject(e.target.error);
      };
      rq.onsuccess = (e) => {
        const db = e.target.result;
        db.onversionchange = () => {
          db.close();
        };
        resolve(db);
      };
    } catch (err) {
      reject(err);
    }
  });
}
function idbCloseDb(db) {
  if (db instanceof IDBDatabase)
    db.close();
}
function idbBeginTransaction(db, scope, mode) {
  if (!validateDatabase(db))
    throw new InvalidArg("db");
  if (!validateTransactionScope(scope))
    throw new InvalidArg("scope");
  if (!validateTransactionMode(mode))
    throw new InvalidArg("mode");
  const tx = db.transaction(scope, mode);
  tx.result = null;
  tx.promise = new Promise((resolve, reject) => {
    tx.oncomplete = (e) => {
      resolve(tx.result);
    };
    tx.onerror = (e) => {
      reject(tx.error ? tx.error : e.target.error);
    };
    tx.onabort = (e) => {
      reject(tx.result);
    };
  });
  return tx;
}
function idbFinishTransaction(tx) {
  if (!validateTransaction(tx))
    throw new InvalidArg("tx");
  if (tx.error) {
    return Promise.reject(tx.error);
  }
  return tx.promise;
}
function idbAbortTransaction(tx, error) {
  if (!validateTransaction(tx))
    throw new InvalidArg("tx");
  tx.result = error;
  tx.abort();
}
function idbGetAll(tx, store) {
  if (!validateTransaction(tx))
    throw new InvalidArg("tx");
  if (!validateObjectStore(store))
    throw new InvalidArg("store");
  try {
    const os = tx.objectStore(store);
    const rq = os.getAll();
    rq.onsuccess = (e) => {
      tx.result = rq.result;
    };
    rq.onerror = (e) => {
      tx.result = e.target.error;
      tx.abort();
    };
  } catch (err) {
    tx.result = err;
    tx.abort();
  }
}
function idbPut(tx, store, value, key) {
  if (!validateTransaction(tx))
    throw new InvalidArg("tx");
  if (!validateObjectStore(store))
    throw new InvalidArg("store");
  try {
    const os = tx.objectStore(store);
    const rq = os.put(value, key);
    rq.onsuccess = (e) => {
      tx.result = rq.result;
    };
    rq.onerror = (e) => {
      tx.result = e.target.error;
      tx.abort();
    };
  } catch (err) {
    tx.result = err;
    tx.abort();
  }
}
function idbAdd(tx, store, value, key) {
  if (!validateTransaction(tx))
    throw new InvalidArg("tx");
  if (!validateObjectStore(store))
    throw new InvalidArg("store");
  try {
    const os = tx.objectStore(store);
    const rq = os.add(value, key);
    rq.onsuccess = (e) => {
      tx.result = rq.result;
    };
    rq.onerror = (e) => {
      tx.result = e.target.error;
      tx.abort();
    };
  } catch (err) {
    tx.result = err;
    tx.abort();
  }
}
function idbDelete(tx, store, key) {
  if (!validateTransaction(tx))
    throw new InvalidArg("tx");
  if (!validateObjectStore(store))
    throw new InvalidArg("store");
  try {
    const os = tx.objectStore(store);
    const rq = os.delete(key);
    rq.onsuccess = (e) => {
      tx.result = rq.result;
    };
    rq.onerror = (e) => {
      tx.result = e.target.error;
      tx.abort();
    };
  } catch (err) {
    tx.result = err;
    tx.abort();
  }
}

// src/store.js
var version = 1;
var dbName = "credentials";
var credentialStore = "credentials";
function runMigrations(db) {
  db.createObjectStore(credentialStore, {
    keyPath: "id"
  });
}
async function openCredentialDb() {
  return await idbOpenDb(dbName, version, runMigrations);
}
async function closeCredentialDb(db) {
  idbCloseDb(db);
}
async function createCredential(db, cred, deleteId) {
  let tx = idbBeginTransaction(db, credentialStore, idbTransaction.readwrite);
  if (deleteId !== void 0) {
    idbDelete(tx, credentialStore, deleteId);
  }
  idbAdd(tx, credentialStore, cred);
  await idbFinishTransaction(tx);
}
async function readCredentials(db) {
  let tx = idbBeginTransaction(db, credentialStore, idbTransaction.readwrite);
  idbGetAll(tx, credentialStore);
  return await idbFinishTransaction(tx);
}
async function updateCredential(db, update) {
  let tx = idbBeginTransaction(db, credentialStore, idbTransaction.readwrite);
  idbPut(tx, credentialStore, update);
  await idbFinishTransaction(tx);
}
async function deleteCredential(db, id) {
  let tx = idbBeginTransaction(db, credentialStore, idbTransaction.readwrite);
  let store = tx.objectStore(credentialStore);
  store.openCursor().onsuccess = (e) => {
    let cursor = e.target.result;
    if (cursor) {
      if (cursor.value.id === id) {
        cursor.delete();
        id = void 0;
      }
      cursor.continue();
    } else {
      if (id !== void 0) {
        idbAbortTransaction(tx, new KeyNotFound(id));
        return;
      }
    }
  };
  await idbFinishTransaction(tx);
}
export {
  closeCredentialDb,
  createCredential,
  deleteCredential,
  openCredentialDb,
  readCredentials,
  updateCredential
};
