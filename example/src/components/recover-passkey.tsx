import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Highlight from "react-highlight";
import GetPasskeys from "./get-passkeys";

const RecoverPasskey = () => {
  const [recoverPasskeyUsername, setRecoverPasskeyUsername] = useState(String);
  const [recoverPasskeyResult, setRecoverPasskeyResult] = useState({});

  async function handleRecoverPasskeyClick(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    const BeyondIdentityEmbeddedSdk = await import(
      "../utils/BeyondIdentityEmbeddedSdk"
    );
    let embedded = new BeyondIdentityEmbeddedSdk.default();
    let username = recoverPasskeyUsername;
    let response = await fetch(
      "https://acme-cloud.byndid.com/recover-credential-binding-link",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          authenticator_type: "web",
          delivery_method: "return",
        }),
      }
    );
    let jsonResponse = await response.json();
    if (response.status !== 200 || jsonResponse === null) {
      setRecoverPasskeyResult(jsonResponse);
      return;
    }
    let credentialBindingLink = jsonResponse.credential_binding_link;
    try {
      if (await embedded.isBindPasskeyUrl(credentialBindingLink)) {
        let result = await embedded.bindPasskey(credentialBindingLink);
        setRecoverPasskeyResult(result);
        window.postMessage("update-passkeys", "*");
      } else {
        setRecoverPasskeyResult(jsonResponse);
      }
    } catch (err) {
      setRecoverPasskeyResult({ error: err });
    }
  }

  return (
    <main className="flex-shrink-0 mb-5">
      <section className="py-1 container">
        <div className="row py-3">
          <div className="col-lg-12 mx-auto">
            <h3 className="fw-light">Add Passkey for Existing User</h3>
            <p className="lead text-muted">
              If you have an existing account, this flow creates a new local
              passkey for that user. Enter a username for an existing user, and
              click &quot;Get Passkey&quot; to create the key.
              <br />
              <br />
              Note: This requires a username for which an identity HAS been
              created before in this realm. It will fail if no identity exists
              for that username.
            </p>

            <div className="row row-cols-1 row-cols-md-1">
              <div className="col">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control rounded-4 mb-3"
                    onChange={(event) =>
                      setRecoverPasskeyUsername(event.target.value)
                    }
                  />
                  <label htmlFor="bindPasskeyUsername">Username</label>
                  <button
                    type="button"
                    onClick={handleRecoverPasskeyClick}
                    className="btn btn-primary btn-lg px-4"
                  >
                    Get Passkey
                  </button>
                </div>
              </div>
            </div>

            {Object.keys(recoverPasskeyResult).length > 0 && (
              <div className="row row-cols-1 row-cols-md-1 mt-3">
                <div className="col">
                  <Highlight className="json">
                    {JSON.stringify(recoverPasskeyResult, null, 2)}
                  </Highlight>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <GetPasskeys></GetPasskeys>
    </main>
  );
};

export default RecoverPasskey;
