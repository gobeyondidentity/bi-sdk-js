import '@beyondidentity/bi-sdk-js';
import { Credential, CredentialId, Embedded } from '@beyondidentity/bi-sdk-js';

class BeyondIdentityEmbeddedSdk {
  embedded: Embedded | null = null;

  private initialized = async () => {
    if (!this.embedded) {
      this.embedded = await Embedded.initialize();
    }
    return this.embedded as Embedded;
  };

  bindCredential = async (url: string) => {
    return (await this.initialized()).bindCredential(url);
  };

  getCredentials = async () => {
    return (await this.initialized()).getCredentials();
  };

  deleteCredential = async (id: CredentialId) => {
    return (await this.initialized()).deleteCredential(id);
  };

  isAuthenticateUrl = async (url: string) => {
    return (await this.initialized()).isAuthenticateUrl(url);
  };

  isBindCredentialUrl = async (url: string) => {
    return (await this.initialized()).isBindCredentialUrl(url);
  };

  authenticate = async (
    url: string,
    onSelectCredential: (
      credentials: Credential[]
    ) => Promise<string | undefined>
  ) => {
    return (await this.initialized()).authenticate(url, onSelectCredential);
  };
}

export default BeyondIdentityEmbeddedSdk;