const bi = window.biCore;
var profiles = [];

async function crashTest(core) {
  await core.crashTest();
}

async function testCreatePkce(core) {
  let pkce = await core.createPKCE();
  return pkce;
}

async function testCreateCredential(core, handle, name, imageUrl) {
  try {
    let profile = await core.createCredential(handle, name, imageUrl);
    return profile;
  } catch (err) {
    console.log(err);
  }
}

async function testRegister(core, url) {
  try {
    let response = await core.register(url, "EmbeddedSource");
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function testGetCredentials(core) {
  let credentials = await core.getCredentials();
  return credentials;
}

async function testAuthConfidential(core) {
  try {
    let credentials = await core.authenticateConfidential(
      "https://www.example.com/",
      "12345",
      "http://foo.com/",
      "abcde"
    );
    return credentials;
  } catch (err) {
    console.log(err);
  }
}

async function testExport(core) {
  try {
    await core.export(["kajflkj"], "https://example.com/");
  } catch (err) {
    console.log(err.message);
  }
}

async function testImport(core) {
  try {
    await core.import("abcde", "https://example.com/");
  } catch (err) {
    console.log(err.message);
  }
}

function append(what, data) {
  let h = document.createElement("h3");
  h.appendChild(document.createTextNode(what));
  let p = document.createElement("p");
  if (typeof data === "string") {
    p.appendChild(document.createTextNode(data));
  } else {
    p.appendChild(document.createTextNode(JSON.stringify(data)));
  }
  let log = document.getElementById("log");
  log.appendChild(h);
  log.appendChild(p);
}

async function test() {
  let coresdk = window["coresdk"];

  let builder = new coresdk.CoreBuilder();
  let core = await builder.build();
  let events = core.events;
  events.onexport = (ev) => {
    console.log(ev.type, ev.data);
  };

  // Make sure we have an app isntance id
  let settings = await core.getAppInstanceId();
  console.log(settings);

  // let cred = await core.bindCredential(
  //   "https://www.google.com",
  //   "1",
  //   "2",
  //   "3",
  //   "5",
  //   "x"
  // );
  // console.log(cred);
  
  // // Extract the profile handles from the db.
  // let creds = await testGetCredentials(core);
  // creds.forEach(cred => profiles.push(cred.handle));

  let button;

  button = document.getElementById("reset");
  button.onclick = async () => {
    await coresdk.Core.reset();
  };

  button = document.getElementById("listCredentials");
  button.onclick = async () => {
    let creds = await testGetCredentials(core);
    append("all creds", creds);
  };

  button = document.getElementById("createCredential");
  button.onclick = async () => {
    let handle = "" + Math.floor(Math.random() * 1000000000);
    let name = "" + Math.floor(Math.random() * 1000000000);
    let cred = await testCreateCredential(core, handle, name, "http://foo");
    profiles.push(handle);
    append("new cred", cred);
  };

  button = document.getElementById("deleteCredential");
  button.onclick = async () => {
    try {
      if (profiles.length == 0) {
        return Promise.resolve();
      }

      let handle = profiles.pop();
      await core.deleteCredential(handle);
      append("delete cred", "ok");
    } catch (err) {
      profiles.push(handle);
      append("delete cred err", err.message);
    }
  };

  button = document.getElementById("exportCredential");
  button.onclick = async () => {
    try {
      await core.export("kajflkj");
      append("export cred", "ok");
    } catch (err) {
      append("export cred err", err.message);
    }
  };

  // await core.reset();

  let result;

  // result = await testCreatePkce(core);
  // console.log(result);

  // result = await testCreateCredential(core, "kajflkj", "lkfjakj", "http://foo");
  // console.log("ok:", result);

  // result = await testRegister(core, "beyond-identity-endpoint:///register?token=eyJhbGciOiJFUzI1NiIsImtpZCI6IiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VfZ2F0ZXdheSI6Imh0dHBzOi8vZGV2aWNlLWdhdGV3YXkuYnluZGlkLmNvbSIsImV4cCI6MTYzODEyNzcyNiwiaGFuZGxlIjoidGVzdC1hY21lLWNvcnAiLCJpYXQiOjE2MzU1MzU3MjYsImludml0ZV9pZCI6IlJ2MFJiNHZjMS9GT0lpcnZicnJSaVNiVmVWbVd4aW12Uys3SHk4WWRPME4zYUxieGRzRlZxM1ZCcVVuUWtKalYiLCJub25jZSI6ImF5ays4MzF4dkJYUFg4WWtyVzkzNnd2SDRpeDhwMEMveitJU3d3cVIzM00wTytiVFI4UXZKT3J3bGZpb1VmSU0iLCJyZWlzc3VlIjoxNjM2MTQwNTI2LCJ0YXJnZXQiOiJyZWdkLWludml0ZS5ncnBjLmJ5bmRpZC5jb206NDQzIn0.JVExnLsPjZHyBD_uXGlLwjW4Zu_wo7sgDgwjY5gEQbrfsOwpgTtsNslYZe7aahcuEvOBPA9-D9N_CN6WMfDPuA");
  // console.log("ok:", result);

  // result = await testGetCredentials(core);
  // console.log("ok:", result);

  // result = await testAuthConfidential(core);
  // console.log("ok:", result);

  // result = await testAuthPublic(core);
  // console.log("ok:", result);

  // result = await testExport(core);
  // console.log("ok:");

  // result = await testImport(core);
  // console.log("ok:", result);
}

await test();
