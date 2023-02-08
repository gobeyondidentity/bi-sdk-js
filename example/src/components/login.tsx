import { signIn, useSession } from "next-auth/react"
import "bootstrap/dist/css/bootstrap.css";
import styles from "./login.module.css"

export default function Login() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <main className="flex-shrink-0 mb-5">
      <section className="py-1 container">
        <div className="row py-3">
          <div className="col-lg-12 mx-auto">
            <noscript>
              <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
            </noscript>

            <div className={styles.signedInStatus}>
              <h3 className="fw-light">Sign in with Local Passkey</h3>
              <p className="lead text-muted">Click Sign in to initiate the OpenID Connect flow and sign in with the Passkey(s) created in step 1.
                <br /><br />
                Note: If you are signing in using Okta, you must recover the the username &quot;difficult-coat@email.com&quot; in the &quot;Existing User&quot; tab before continuing. This user has been configured to authenticate with Okta.</p>
              <div className={`nojs-show ${!session && loading ? styles.loading : styles.loaded}`}>
                {!session && (
                  <>
                    <a
                      id="authCredButton"
                      href={`/api/auth/signin`}
                      className="btn btn-primary btn-lg px-4 m-1"
                      onClick={(e) => {
                        e.preventDefault()
                        signIn("beyondidentity")
                      }}
                    >
                      Beyond Identity
                    </a>
                    <a
                      id="authCredButton"
                      href={`/api/auth/signin`}
                      className="btn btn-primary btn-lg px-4 m-1"
                      onClick={(e) => {
                        e.preventDefault()
                        signIn("auth0")
                      }}
                    >
                      Auth0
                    </a>
                    <a
                      id="authCredButton"
                      href={`/api/auth/signin`}
                      className="btn btn-primary btn-lg px-4 m-1"
                      onClick={(e) => {
                        e.preventDefault()
                        signIn("okta")
                      }}
                    >
                      Okta
                    </a>
                  </>
                )}
                {session?.user && (
                  <div className="container">
                    <div
                      style={{ backgroundImage: `url('https://user-images.githubusercontent.com/238738/178780350-489309c5-8fae-4121-a20b-562e8025c0ee.png` }}
                      className={styles.avatar}
                    />
                    <div className={styles.signedInText}>
                      <div className={styles.signedinSmall}>OIDC Token for User:</div>
                      <h6><strong>session.user.name: {session.user.name}</strong></h6>
                    </div>
                    <div className="lead">Click Sign out above to try again with a different passkey.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
