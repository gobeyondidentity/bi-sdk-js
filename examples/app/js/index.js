// Invoke an Embedded SDK call & report the result to
// the results modal.
async function invokeEmbedded(name, fn) {
  let result;
  try {
    result = await fn();
  } catch (err) {
    result = err;
  }
  Results.update(name, result);
}

export class BindCredential {
  static init() {
    // Pre-populate the bind credential button with location.
    // This value will be passed into the Embedded SDK's
    // bindCredentialUrl method to complete the bind credential
    // flow.
    let params = new URLSearchParams(document.location.search);
    if (
      params.get("token") !== undefined &&
      params.get("updates_uri") != undefined
    ) {
      document.getElementById("bindCredentialUrl").value = window.location.href;
    }

    document.getElementById("bindCredential").onclick = async () => {
      invokeEmbedded("bindCredential", async () => {
        let url = document.getElementById("bindCredentialUrl").value;
        return await window.embedded.bindCredential(url);
      });
    };
  }
}

export class Authenticate {
  static init() {
    document.getElementById("authenticate").onclick = async () => {
      invokeEmbedded("authenticate", async () => {
        let url = document.getElementById("authenticateUrl").value;
        return await window.embedded.authenticate(url, (credentials) => {
          let promptText = credentials.map((credential, index) => {
            return `${index}: ${credential.id}\n`;
          });
          let selectedIndex = prompt(promptText, "index");
          if (selectedIndex >= 0 && selectedIndex < credentials.length) {
            let selectedId = credentials[selectedIndex].id;
            console.log("Authenticating with credential id:", selectedId)
            return selectedId;
          } else {
            // This will fail in core as it won't match to any id
            return "unknown_id";
          }
        });
      });
    };
  }
}

export class UrlValidation {
  static init() {
    document.getElementById("isBindCredentialUrl").addEventListener("change", (e) => {
      // Clear previous border
      document.getElementById("isBindCredentialUrl").classList.remove("is-invalid");
      document.getElementById("isBindCredentialUrl").classList.remove("is-valid");

      // Fill in new border
      let result = window.embedded.isBindCredentialUrl(e.target.value)
        ? "is-valid"
        : "is-invalid";
      document.getElementById("isBindCredentialUrl").classList.add(result);
    });

    document.getElementById("isAuthenticateUrl").addEventListener("change", (e) => {
      // Clear previous border
      document.getElementById("isAuthenticateUrl").classList.remove("is-invalid");
      document.getElementById("isAuthenticateUrl").classList.remove("is-valid");

      // Fill in new border
      let result = window.embedded.isAuthenticateUrl(e.target.value)
        ? "is-valid"
        : "is-invalid";
      document.getElementById("isAuthenticateUrl").classList.add(result);
    });
  }
}

export class Delete {
  static init(cred) {
    let button = document.getElementById(`delete-${cred.id}`);
    button["data-bi-cred"] = cred;
    button.onclick = async (e) => {
      invokeEmbedded("deleteCredential", async () => {
        let cred = e.target["data-bi-cred"];
        return await window.embedded.deleteCredential(cred.id, () => {});
      });
    };
  }
}

export class Credentials {
  static async init() {
    let credList = document.getElementById("credentials");
    credList.replaceChildren();
    credList.classList.remove("collapse.show");

    let noCreds = document.getElementById("noCredentials");

    let creds = await window.embedded.getCredentials();
    creds.push({
      apiBaseUrl: "https://apibaseurl.com",
      tenantId: "tenant-id",
      realmId: "realm-id",
      identityId: "identity-id",
      id: "credential-id",
      localCreated: "2000-10-31",
      localUpdated: "2000-10-31",
      keyHandle: "key-handle",
      keyType: "subtle",
      state: "Active",
      created: "2000-10-31",
      updated: "2000-10-31",
      realm: {
        displayName: "realm-display-name",
      },
      identity: {
        displayName: "identity-display-name",
        emailAddress: "email-address",
      },
      theme: {
        logoUrlLight: "https://picsum.photos/256",
        logoUrlDark: "https://picsum.photos/256",
        supportUrl: "https://google.com",
      },
    });

    if (creds && creds.length) {
      creds.forEach((cred) => {
        let item = makeCredCard(cred);
        credList.appendChild(item);

        Delete.init(cred);
      });
      credList.classList.add("collapse.show");
      noCreds.classList.add("collapse");
    } else {
      credList.classList.add("collapse");
      noCreds.classList.add("collapse.show");
    }
  }
}

function makeCredCard(cred) {
  let div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = `<div class="card shadow-sm">
    <img
      src="${cred.theme.logoUrlLight}"
      class="card-img-top rounded-circle flex-shrink-0 p-4"
    />
    <div class="card-body pt-0">
      <p class="card-text">Display Name: ${cred.identity.displayName}</p>
      <p class="card-text">Credential Id: ${cred.id}</p>
      <p class="card-text text-muted">${new Date(
        Date.parse(cred.created)
      ).toLocaleString()}</p>
      <button
        id="delete-${cred.id}"
        type="button"
        class="btn btn-sm btn-outline-primary mb-1"
      >
        Delete
      </button>
    </div>
  </div>`.trim();

  return div;
}

export class Results {
  static update(fn, result) {
    if (result instanceof Error) {
      result = {
        name: result.name,
        message: result.message,
        stack: result.stack
          ?.split("\n")
          .map((line) => line.trim())
          .slice(1),
      };
    }
    const html = prettyPrintJson.toHtml(result);
    switch (fn) {
      case "bindCredential":
        document.getElementById("bindCredentialResult").innerHTML = html;
        break;
      case "authenticate":
        document.getElementById("authenticateResult").innerHTML = html;
        break;
      case "authenticateWithId":
        document.getElementById("authenticateWithIdResult").innerHTML = html;
        break;
    }
  }
}

export class Footer {
  static init() {
    // -- TODO: Display SDK version here instead
    // let info = window.embedded.getSdkInfo();
    // // TODO: use client hints, if available
    // document.getElementById(
    //   "bi-platform"
    // ).innerText = `${info.browserInfo.platform.name} (${info.browserInfo.platform.version})`;
    // document.getElementById(
    //   "bi-browser"
    // ).innerText = `${info.browserInfo.browser.name} (${info.browserInfo.browser.version})`;
    // document.getElementById("bi-app-id").innerText = info.appInstanceId;
  }
}
