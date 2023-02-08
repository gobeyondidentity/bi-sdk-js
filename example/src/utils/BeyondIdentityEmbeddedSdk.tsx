import '@beyondidentity/bi-sdk-js';
import { Embedded } from '@beyondidentity/bi-sdk-js';
export type { Passkey } from '@beyondidentity/bi-sdk-js';

class BeyondIdentityEmbeddedSdk {
  embedded: Embedded | null = null;

  private initialized = async () => {
    if (!this.embedded) {
      this.embedded = await Embedded.initialize();
    }
    return this.embedded as Embedded;
  };

  bindPasskey = async (url: string) => {
    return (await this.initialized()).bindPasskey(url);
  };

  getPasskeys = async () => {
    return (await this.initialized()).getPasskeys();
  };

  deletePasskey = async (id: string) => {
    return (await this.initialized()).deletePasskey(id);
  };

  isAuthenticateUrl = async (url: string) => {
    return (await this.initialized()).isAuthenticateUrl(url);
  };

  isBindPasskeyUrl = async (url: string) => {
    return (await this.initialized()).isBindPasskeyUrl(url);
  };

  authenticate = async (
    url: string,
    passkeyId: string
  ) => {
    return (await this.initialized()).authenticate(url, passkeyId);
  };
}

export default BeyondIdentityEmbeddedSdk;
