import styles from "./header.module.css"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Header() {
  
  const { data: session, status } = useSession()
  const loading = status === "loading"
  return (
    <header className={styles.header}>

      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>

      <div className={styles.signedInStatus}>
        <p className={`nojs-show ${!session && loading ? styles.loading : styles.loaded}`}>
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
            </>
          )}
          {session?.user && (
            <>
              <span
                style={{ backgroundImage: `url('https://user-images.githubusercontent.com/238738/178780350-489309c5-8fae-4121-a20b-562e8025c0ee.png` }}
                className={styles.avatar}
              />
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>

      <div className={styles.navItems}>
        <div className={styles.navItem}>
          <a href="https://developer.beyondidentity.com/docs/v1/getting-started">Documentation</a>
        </div>
        <div className={styles.navItem}>
          <a href="https://github.com/gobeyondidentity">GitHub</a>
        </div>
        <div className={styles.navItem}>
          <a href="https://join.slack.com/t/byndid/shared_invite/zt-1anns8n83-NQX4JvW7coi9dksADxgeBQ">Slack</a>
        </div>
      </div>

      <section style={{ textAlign: "center" }}>
        <br />
        <a href="https://developers.beyondidentity.com" target="_blank" rel="noreferrer">
          <img src="https://user-images.githubusercontent.com/238738/178780350-489309c5-8fae-4121-a20b-562e8025c0ee.png" width="150px" alt="Beyond Identity Developer Homepage"></img>
        </a>
        <h3 style={{ textAlign: "center" }}>Beyond Identity</h3>
        <p style={{ textAlign: "center" }}>Universal Passkeys for Developers</p>
        <p style={{ textAlign: "center" }}>
          All devices. Any protocol. Zero shared secrets.
        </p>
      </section>
    </header>
  )
}
