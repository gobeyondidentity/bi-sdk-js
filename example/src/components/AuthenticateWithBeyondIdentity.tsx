import { useState, useEffect, useRef } from "react";
import BeyondIdentityEmbeddedSdk from "../utils/Embedded";
import "bootstrap/dist/css/bootstrap.css";
import '../App.css';
import Highlight from "react-highlight";
import { Credential } from '@beyondidentity/bi-sdk-js';

function randomState() {
  const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let array = new Uint8Array(40);
  window.crypto.getRandomValues(array);
  array = array.map(x => validChars.charCodeAt(x % validChars.length));
  return String.fromCharCode.apply(null, Array.from(array));
}

const AuthenticateWithBeyondIdentity = () => {
  const [authenticateResult, setAuthenticateResult] = useState({});
  const scrollReference = useRef<null | HTMLDivElement>(null);
  const embedded = new BeyondIdentityEmbeddedSdk();


  useEffect(() => {
    embedded.isAuthenticateUrl(window.location.href).then(shouldAuthenticate => {
      if (shouldAuthenticate) {
        // Pull "bi-authenticate URL from URL"
        let biAuthenticateUrl = window.location.href;
        // Remove "bi-authenticate" and replace with origin
        window.history.pushState({ path: window.location.origin }, "", window.location.origin);
        // Actually authenticate with Beyond Identity
        biAuthenticate(biAuthenticateUrl);
      }
    });
  }, []);

  async function biAuthenticate(url: string) {
    let selectedCredentialId = await async function () {
      let credentials = await embedded.getCredentials();
      if (credentials.length === 0) {
        return Promise.resolve("unknown_id");
      } else if (credentials.length === 1) {
        return Promise.resolve(credentials[0].id);
      }
      let promptText = credentials.map((credential, index) => {
        return `${index}: ${credential.identity.username}`;
      }).join("\n");
      let selectedIndex = parseInt(prompt(promptText, "index")!!);
      if (selectedIndex >= 0 && selectedIndex < credentials.length) {
        let selectedId = credentials[selectedIndex].id;
        return Promise.resolve(selectedId);
      } else {
        // This will fail in core as it won't match to any id
        return Promise.resolve("unknown_id");
      }
    }();
    let result = await embedded.authenticate(url, selectedCredentialId);

    // Scroll down to this element
    scrollReference.current?.scrollIntoView();

    // Validate OAuth State
    let persistedState = window.localStorage.getItem("state");
    window.localStorage.removeItem("state")
    if (persistedState === null) {
      setAuthenticateResult(JSON.stringify({ error: "state not set at beginning of OAuth transaction" }));
      return;
    }
    let biAuthenticateState = (new URLSearchParams(result.redirectURL)).get("state");
    if (biAuthenticateState === null) {
      setAuthenticateResult(JSON.stringify({ error: "state not found in bi-authenticate redirect URL" }));
      return;
    }
    if (biAuthenticateState === persistedState) {
      setAuthenticateResult(result);
    } else {
      setAuthenticateResult(JSON.stringify({ error: `persisted state \"${persistedState}\" does not match incoming state \"${biAuthenticateState}\"` }));
    }
  }

  async function handleAuthenticateWithBeyondIdentityClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    let state = randomState();
    window.localStorage.setItem('state', state);
    let authorizeUrl = "https://auth-us.beyondidentity.com/v1/tenants/00012da391ea206d/realms/862e4b72cfdce072/applications/2d19c741-74e5-48f1-8709-cc2c5f0f101e/authorize?response_type=code&client_id=31eQMDR_ftmj7tGoD3PZWb-n&redirect_uri=http%3A%2F%2Flocalhost%3A8083&scope=openid&state=" + state;
    window.location.href = authorizeUrl;
  }

  return (
    <main className="flex-shrink-0 mb-5" ref={scrollReference}>
      <section className="py-1 container">
        <div className="row py-3">
          <div className="col-lg-12 mx-auto">
            <h1 className="fw-light">Authenticate With Beyond Identity</h1>
            <p className="lead text-muted">
              Authenticates against a credential bound to the browser using
              Beyond Identity as the primary IdP. If more than one credential
              is present, you must select a credential during authentication.
            </p>

            <div className="row row-cols-1 row-cols-md-1">
              <div className="col">
                <div className="form-floating">
                  <button
                    type="button"
                    onClick={handleAuthenticateWithBeyondIdentityClick}
                    className="btn btn-primary btn-lg px-4"
                  >
                    Authenticate With Beyond Identity
                  </button>
                </div>
              </div>
            </div>

            {Object.keys(authenticateResult).length > 0 &&
              <div className="row row-cols-1 row-cols-md-1 mt-3">
                <div className="col">
                  <Highlight className='json'>
                    {JSON.stringify(authenticateResult, null, 2)}
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

export default AuthenticateWithBeyondIdentity;
