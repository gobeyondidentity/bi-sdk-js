import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Highlight from "react-highlight";

const AuthenticateWithBeyondIdentity = () => {
  const [biAuthenticateResult, setBiAuthenticateResult] = useState("");

  useEffect(() => {
    const authenticate = async () => {
      const BeyondIdentityEmbeddedSdk = await import("../utils/BeyondIdentityEmbeddedSdk");
      let embedded = new BeyondIdentityEmbeddedSdk.default();
      embedded.isAuthenticateUrl(window.location.href).then(async shouldAuthenticate => {
        if (shouldAuthenticate) {
          let biAuthenticateUrl = window.location.href;
          biAuthenticate(biAuthenticateUrl).then(redirectURL => {
            window.location.href = redirectURL;
          }).catch(error => {
            setBiAuthenticateResult(error.toString());
          });
        }
      });
    }
    authenticate().catch(console.error);
  }, []);

  async function biAuthenticate(url: string): Promise<string> {
    const BeyondIdentityEmbeddedSdk = await import("../utils/BeyondIdentityEmbeddedSdk");
    let embedded = new BeyondIdentityEmbeddedSdk.default();

    // Display credentials so user can select one
    let credentials = await embedded.getCredentials();
    let promptText = credentials.map((credential, index) => {
      return `${index}: ${credential.identity.username}`;
    }).join("\n");
    let selectedIndex = parseInt(prompt(promptText, "index")!!);
    if (selectedIndex >= 0 && selectedIndex < credentials.length) {
      let selectedId = credentials[selectedIndex].id;
      // Perform authentication using selected id
      let result = await embedded.authenticate(url, selectedId);
      return Promise.resolve(result.redirectURL);
    } else {
      // This will fail in core as it won't match to any id
      return Promise.resolve("unknown_id");
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        </div>
        <div className="row">
          {
            biAuthenticateResult.length > 0 &&
            <div className="row row-cols-1 row-cols-md-1 mt-3">
              <div className="col">
                <Highlight className='json'>
                  {JSON.stringify(biAuthenticateResult, null, 2)}
                </Highlight>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default AuthenticateWithBeyondIdentity;
