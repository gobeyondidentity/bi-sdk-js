import { useState } from "react";
import BeyondIdentityEmbeddedSdk from "../utils/Embedded";
import "bootstrap/dist/css/bootstrap.css";
import '../App.css';
import Highlight from "react-highlight";

const RecoverCredential = () => {
  const [recoverCredentialUsername, setRecoverCredentialUsername] = useState(String);
  const [recoverCredentialResult, setRecoverCredentialResult] = useState({});
  const embedded = new BeyondIdentityEmbeddedSdk();

  async function handleRecoverCredentialClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    let username = recoverCredentialUsername;
    let response = await fetch('https://acme-cloud.byndid.com/recover-credential-binding-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': username,
        'authenticator_type': 'web',
        'delivery_method': 'return'
      })
    });
    let jsonResponse = await response.json();
    let credentialBindingLink = jsonResponse.credential_binding_link;
    if (await embedded.isBindCredentialUrl(credentialBindingLink)) {
      let result = await embedded.bindCredential(credentialBindingLink);
      setRecoverCredentialResult(result);
      window.postMessage("update-credentials", "*");
    } else {
      setRecoverCredentialResult(jsonResponse);
    }
  }

  return (
    <main className="flex-shrink-0 mb-5">
      <section className="py-1 container">
        <div className="row py-3">
          <div className="col-lg-12 mx-auto">
            <h1 className="fw-light">Recover Credential</h1>
            <p className="lead text-muted">
              If you have an account with a credential you can't access anymore,
              enter your username to recover your account and bind a credential to this device.
              Note: This requires a username for which an identity HAS been created before. It
              will fail if no identity exists for that username.
            </p>

            <div className="row row-cols-1 row-cols-md-1">
              <div className="col">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control rounded-4 mb-3"
                    onChange={event => setRecoverCredentialUsername(event.target.value)}
                  />
                  <label htmlFor="bindCredentialUsername">Username</label>
                  <button
                    type="button"
                    onClick={handleRecoverCredentialClick}
                    className="btn btn-primary btn-lg px-4"
                  >
                    Recover Credential
                  </button>
                </div>
              </div>
            </div>

            {Object.keys(recoverCredentialResult).length > 0 &&
              <div className="row row-cols-1 row-cols-md-1 mt-3">
                <div className="col">
                  <Highlight className='json'>
                    {JSON.stringify(recoverCredentialResult, null, 2)}
                  </Highlight>
                </div>
              </div>
            }
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecoverCredential;
