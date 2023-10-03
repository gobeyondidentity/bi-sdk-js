import { signIn, useSession } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./login.module.css";
import { useEffect, useState } from "react";

export default function LoginOtp() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [email, setEmail] = useState(String);
  const [authenticationContext, setAuthenticationContext] = useState(String);

  useEffect(() => {
    const ctxt = window.localStorage.getItem("bi-otp-authentication-context");
    if (ctxt) {
      window.localStorage.removeItem("bi-otp-authentication-context");
      const jsonObject = JSON.parse(ctxt);
      const prettyJson = JSON.stringify(jsonObject, null, 4);
      setAuthenticationContext(prettyJson);
    }
  }, []);

  return (
    <main className="flex-shrink-0 mb-5">
      <section className="py-1 container">
        <div className="row py-3">
          <div className="col-lg-12 mx-auto">
            <noscript>
              <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
            </noscript>

            <div className={styles.signedInStatus}>
              <h3 className="fw-light">Sign in with One Time Password</h3>
              <p className="lead text-muted">
                Click Sign in to initiate an email OTP flow.
              </p>
              <div
                className={`nojs-show ${
                  !session && loading ? styles.loading : styles.loaded
                }`}
              >
                {!session && (
                  <>
                    <div className="form-floating">
                      <input
                        id="emailInput"
                        type="text"
                        className="form-control rounded-4 mb-3"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      <label htmlFor="email">Email</label>
                      <a
                        id="authCredButton"
                        href={`/api/auth/signin`}
                        className="btn btn-primary btn-lg px-4 m-1"
                        style={
                          email.length === 0
                            ? { pointerEvents: "none", opacity: 0.5 }
                            : {}
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          if (email.length === 0) {
                            return;
                          }
                          window.localStorage.setItem("bi-otp-email", email);
                          signIn("beyondidentity");
                        }}
                      >
                        OTP
                      </a>
                    </div>
                  </>
                )}
                {session?.user && (
                  <div className="container">
                    <div
                      style={{
                        backgroundImage: `url('https://user-images.githubusercontent.com/238738/178780350-489309c5-8fae-4121-a20b-562e8025c0ee.png`,
                      }}
                      className={styles.avatar}
                    />
                    <div className={styles.signedInText}>
                      <div className={styles.signedinSmall}>
                        OIDC Token for User:
                      </div>
                      <h6>
                        <strong>session.user.name: {session.user.name}</strong>
                      </h6>
                    </div>
                    <h5>Authentication Context</h5>
                    {authenticationContext ? (
                      <pre>{authenticationContext}</pre>
                    ) : (
                      <p>
                        This is only displayed immediatley after an OTP sign
                        in. If you are seeing this, you may have refreshed the
                        page. If you&apos;re interested in seeing the authentication
                        context, try signing in again.
                      </p>
                    )}
                    <div className="lead">
                      Click Sign out above to try again.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
