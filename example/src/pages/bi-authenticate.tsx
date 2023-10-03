import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Highlight from "react-highlight";

const AuthenticateWithBeyondIdentity = () => {
  const [biAuthenticateResult, setBiAuthenticateResult] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpEntry, setShowOtpEntry] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      const BeyondIdentityEmbeddedSdk = await import(
        "../utils/BeyondIdentityEmbeddedSdk"
      );
      let embedded = new BeyondIdentityEmbeddedSdk.default();

      embedded
        .isAuthenticateUrl(window.location.href)
        .then(async (shouldAuthenticate) => {
          if (shouldAuthenticate) {
            let biAuthenticateUrl = window.location.href;
            const otpEmail = window.localStorage.getItem("bi-otp-email");
            if (otpEmail) {
              // OTP Flow
              window.localStorage.removeItem("bi-otp-email");
              biAuthenticateOtp(biAuthenticateUrl, otpEmail)
                .then((redirectURL) => {
                  window.location.href = redirectURL;
                })
                .catch((error) => {
                  setBiAuthenticateResult(error.toString());
                });
            } else {
              // Standard Flow
              biAuthenticate(biAuthenticateUrl)
                .then((redirectURL) => {
                  window.location.href = redirectURL;
                })
                .catch((error) => {
                  setBiAuthenticateResult(error.toString());
                });
            }
          }
        });
    };
    authenticate().catch(console.error);
  }, []);

  async function biAuthenticateOtp(
    url: string,
    email: string
  ): Promise<string> {
    const BeyondIdentityEmbeddedSdk = await import(
      "../utils/BeyondIdentityEmbeddedSdk"
    );
    let embedded = new BeyondIdentityEmbeddedSdk.default();

    const authenticationContext = await embedded.getAuthenticationContext(url);
    console.log(authenticationContext);
    const authenticateResult = await embedded.authenticateOtp(url, email);
    window.localStorage.setItem(
      "bi-otp-authentication-context",
      JSON.stringify(authenticationContext)
    );
    const otp = prompt("Enter your OTP", "");
    const redeemResult = await embedded.redeemOtp(
      authenticateResult.url,
      otp!!
    );
    if ((redeemResult as any).redirectUrl) {
      return Promise.resolve((redeemResult as any).redirectUrl);
    }
    return Promise.reject(
      new Error("Error occurred. Make sure you entered the correct OTP.")
    );
  }

  async function biAuthenticate(url: string): Promise<string> {
    const BeyondIdentityEmbeddedSdk = await import(
      "../utils/BeyondIdentityEmbeddedSdk"
    );
    let embedded = new BeyondIdentityEmbeddedSdk.default();

    // Display passkeys so user can select one
    let passkeys = await embedded.getPasskeys();
    if (passkeys && passkeys.length === 0) {
      return Promise.reject(
        new Error(
          "There are no passkeys on this browser. Please bind a passkey before authenticating."
        )
      );
    }

    let selectedIndex = 0;
    if (passkeys.length > 1) {
      let promptText = passkeys
        .map((passkey, index) => {
          return `${index}: ${passkey.identity.username}`;
        })
        .join("\n");
      selectedIndex = parseInt(prompt(promptText, "index")!!);
    }

    // Note: If the selected Id was out of bounds or the
    // the prompt was cancelled, supply a default Id to
    // `authenticate` and let it fail in Core.
    let selectedId = "";
    if (selectedIndex >= 0 && selectedIndex < passkeys.length) {
      selectedId = passkeys[selectedIndex].id;
    }

    // Perform authentication using selected id
    let result = await embedded.authenticate(url, selectedId);
    return Promise.resolve(result.redirectUrl);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
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
          {biAuthenticateResult.length > 0 && (
            <div className="row row-cols-1 row-cols-md-1 mt-3">
              <div className="col">
                <Highlight className="json">
                  {JSON.stringify(biAuthenticateResult, null, 2)}
                </Highlight>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthenticateWithBeyondIdentity;
