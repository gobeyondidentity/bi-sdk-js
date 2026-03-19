import '@beyondidentity/bi-sdk-js';
import { Embedded } from '@beyondidentity/bi-sdk-js';
export type { Passkey } from '@beyondidentity/bi-sdk-js';

// Module-level singleton: all instances share one initialization promise
// to prevent concurrent WASM double-init (which causes memory corruption).
let _embeddedPromise: Promise<Embedded> | null = null;

class BeyondIdentityEmbeddedSdk {
  private initialized = async () => {
    if (!_embeddedPromise) {
      _embeddedPromise = Embedded.initialize({
        logger: {
          write: function (logType: string, message: string): void {
            console.log(`[${logType}] ${message}`);
          }
        }
      });
    }
    return _embeddedPromise;
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

  getAuthenticationContext = async (url: string) => {
    return (await this.initialized()).getAuthenticationContext(url);
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

  authenticateOtp = async (
    url: string,
    emailAddress: string
  ) => {
    return (await this.initialized()).authenticateOtp(url, emailAddress);
  };

  redeemOtp = async (
    url: string,
    otp: string
  ) => {
    return (await this.initialized()).redeemOtp(url, otp);
  };
}

export default BeyondIdentityEmbeddedSdk;
