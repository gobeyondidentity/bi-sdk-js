import {
  CoreBuilder,
  Core,
  CredentialV1 as Credential,
  CredentialId,
  BindCredentialV1Result as BindCredentialResponse,
  BIAuthenticateUrlResponse as AuthenticateResponse,
  UrlResponse,
} from "coresdk";

export interface Config {
  allowedDomains?: string[];
}

export class Embedded {
  private core: Core;

  private constructor(core: Core) {
    this.core = core;
  }

  /**
   * Initialize the Embedded SDK. This function must
   * be called first.
   * @returns An instance of the Embedded SDK.
   */
  static initialize = async (config?: Config): Promise<Embedded> => {
    const defaults = {
      allowedDomains: ["beyondidentity.dev", "beyondidentity.run", "beyondidentity.xyz", "beyondidentity.com"],
    };
    config = config ? config : defaults;
    let allowedDomains = config.allowedDomains ? config.allowedDomains : defaults.allowedDomains;
    let builder = new CoreBuilder().allowedDomains(allowedDomains.join(","));
    const core = await builder.build();
    return new Embedded(core);
  };

  /**
   * Binds a credential to this browser.
   * @param url The url in order to bind a credential. This can either
   * be a credential binding link generated from a call to the Beyond
   * Identity API or a credential binding instruction from an email/sms.
   * @returns A Promise that resolves to a BindCredentialResponse which
   * contains a credential as well as a post bind redirect uri.
   */
  bindCredential = async (url: string): Promise<BindCredentialResponse> => {
    return await this.core.bindCredentialUrl(url);
  };

  /**
   * @returns A Promise that resolves to a list of all Credentials bound
   * to this browser.
   */
  getCredentials = async (): Promise<Credential[]> => {
    return await this.core.listCredentials();
  };

  /**
   * Deletes a credential from this browser.
   * @param id The id to the credential to be deleted.
   */
  deleteCredential = async (id: CredentialId): Promise<void> => {
    return await this.core.deleteCredentialV1(id);
  };

  /**
   * Returns true if the URL passed in is a bind credential url.
   * @param url The url in order to bind a credential. This can either
   * be a credential binding link generated from a call to the Beyond
   * Identity API or a credential binding instruction from an email/sms.
   * @returns A boolean indicating if the url passed in is a well formatted
   * bind credential url.
   */
  isBindCredentialUrl = (url: string): boolean => {
    try {
      const urlType = this.core.getUrlType(url);
      return urlType.type === "Bind";
    } catch (_) {
      // getUrlType throws an error if the url is invalid.
      // In this case, we always want to return false.
      return false;
    }
  };

  /**
   * Returns true if the URL passed in is an authenticate url.
   * @param url The url in order authenticate against a bound credential.
   * @returns A boolean indicating if the url passed in is a well formatted
   * authenticate url.
   */
  isAuthenticateUrl = (url: string): boolean => {
    try {
      const urlType = this.core.getUrlType(url);
      return urlType.type === "Authenticate";
    } catch (_) {
      // getUrlType throws an error if the url is invalid.
      // In this case, we always want to return false.
      return false;
    }
  };

  /**
   * Authenticates against a credential bound to the browser.
   * If more than one credential is present, a callback is used to
   * determine which credential to authenticate against.
   * @param url The url in order to authenticate against a credential.
   * @param onSelectCredential A callback that expects a credential id to be returned given a list of credentials.
   * @returns A Promise that resolves to an AuthenticateResponse which
   * contains a redirectUrl as well as a message.
   */
  authenticate = async (
    url: string,
    onSelectCredential: (
      credentials: Credential[]
    ) => Promise<string | undefined>
  ): Promise<AuthenticateResponse> => {
    return await this.core.authenticate(
      url,
      "EmbeddedSource",
      onSelectCredential
    );
  };
}
