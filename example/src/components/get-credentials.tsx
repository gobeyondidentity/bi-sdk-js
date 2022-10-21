import "bootstrap/dist/css/bootstrap.css";
import { Credential } from '../utils/BeyondIdentityEmbeddedSdk';
import { Component } from "react";

class GetCredentials extends Component<{}, { credentials: Credential[] }> {
  constructor(props: any) {
    super(props);
    this.state = { credentials: [] };
  }

  async componentDidMount() {
    const BeyondIdentityEmbeddedSdk = await import("../utils/BeyondIdentityEmbeddedSdk");
    let embedded = new BeyondIdentityEmbeddedSdk.default();
    this.setState({ credentials: await embedded.getCredentials() });
    window.addEventListener("message", async (event) => {
      if (event.data === "update-credentials") {
        this.setState({ credentials: await embedded.getCredentials() });
      } else {
        console.log("Unknown event data received:", event.data);
      }
    });
  }

  async handleDeleteCredentialClick(e: React.MouseEvent<HTMLButtonElement>, credential: Credential) {
    e.preventDefault();
    const BeyondIdentityEmbeddedSdk = await import("../utils/BeyondIdentityEmbeddedSdk");
    let embedded = new BeyondIdentityEmbeddedSdk.default();
    let result = window.confirm(`Are you sure you want to delete credential with username \"${credential.identity.username}\"?`);
    if (result) {
      await embedded.deleteCredential(credential.id);
      this.setState({ credentials: await embedded.getCredentials() });
    }
  }

  render() {
    return (
      <main className="flex-shrink-0 mb-5">
        <section className="py-1 container">
          <div className="row py-3">
            <div className="col-lg-12 mx-auto">
              <br></br>
              <h3 className="fw-light">Local Passkeys</h3>
              <br></br>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Logo</th>
                      <th scope="col">Username</th>
                      <th scope="col">Display Name</th>
                      <th scope="col">ID</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.credentials.map(credential => (
                      <tr key={credential.id}>
                        <td><button
                          type="button"
                          value={credential.id}
                          onClick={event => this.handleDeleteCredentialClick(event, credential)}
                          className="btn btn-primary btn-md"
                        >Delete</button></td>
                        <th scope="row"><img src={credential.theme.logoUrlLight} style={{ width: "50px" }} alt="Beyond Identity Credential Logo"></img></th>
                        <td>{credential.identity.username}</td>
                        <td>{credential.identity.displayName}</td>
                        <td>{credential.id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default GetCredentials;