import {
  BIAuthenticateUrlResponse,
  BindCredentialV1Result,
  Core,
  CoreBuilder,
  KeyHandle,
  KeyType,
  Log,
} from "coresdk";

export interface Config {
  allowedDomains?: string[];
  logger?: Log;
}

/**
 * A Universal Passkey is a public and private key pair. The private key is
 * generated and stored securely on the device's TEE. The public key is sent
 * to the Beyond Identity cloud. The private key cannot be tampered with,
 * viewed, or removed from the device in which it is created unless the user
 * explicitly indicates that the trusted device be removed. Passkeys are
 * cryptographically linked to devices and an Identity. A single device can
 * store multiple passkeys for different users and a single Identity can have
 * multiple passkeys.
 */
export interface Passkey {
  /** The globally unique identifier of the passkey. */
  id: string;
  /**
   * The time when this passkey was created locally. This could be different
   * from "created" which is the time when this passkey was created on
   * the server.
 */
  localCreated: string;
  /**
   * The last time when this passkey was updated locally. This could be
   * different from "updated" which is the last time when this passkey
   * was updated on the server.
  */
  localUpdated: string;
  /** The base url for all binding & auth requests */
  apiBaseUrl: string;
  /** Associated key handle */
  keyHandle: KeyHandle;
  /**
   * KeyType indicates where the key was created. This can be either "subtle"
   * or "webauthn".
  */
  keyType?: KeyType;
  /** The current state of this passkey */
  state: "Active" | "Revoked";
  /** The time this passkey was created. */
  created: string;
  /** The last time this passkey was updated */
  updated: string;
  /** Tenant information associated with this passkey */
  tenant: Tenant;
  /** Realm information associated with this passkey */
  realm: Realm;
  /** Identity information associated with this passkey */
  identity: Identity;
  /** Theme information associated with this passkey */
  theme: Theme;
}

/**
 * Realm information associated with a `Passkey`. A Realm is a unique
 * administrative domain within a `Tenant`. Some Tenants will only need
 * the use of a single Realm, in this case a Realm and a Tenant may seem
 * synonymous. Each Realm contains a unique set of Directory, Policy, Event,
 * Application, and Branding objects.
*/
export interface Realm {
  id: string;
  displayName: string;
}

/**
 * Identity information associated with a `Passkey`. An Identity is a unique
 * identifier that may be used by an end-user to gain access governed by
 * Beyond Identity. An Identity is created at the Realm level. An end-user
 * may have multiple identities. A Realm can have many Identities.
*/
export interface Identity {
  id: string;
  displayName: string;
  username: string;
  primaryEmailAddress?: string;
}

/**
 * Theme associated with a `Passkey`.
*/
export interface Theme {
  logoUrlLight: string;
  logoUrlDark: string;
  supportUrl: string;
}

/**
 * Tenant information associated with a `Passkey`. A Tenant represents an
 * organization in the Beyond Identity Cloud and serves as a root container
 * for all other cloud components in your configuration.
*/
export interface Tenant {
  id: string;
  displayName: string;
}

/**
 * A response returned after successfully binding a passkey to a device.
*/
export interface BindPasskeyResponse {
  /**
   * The `Passkey` bound to the device.
  */
  passkey: Passkey;
  /**
   * A URI that can be redirected to once a passkey is bound. This could
   * be a URI that automatically logs the user in with the newly bound
   * passkey, or a success page indicating that a passkey has been bound.
  */
  postBindingRedirectUri?: string;
}

/**
 * A response returned after successfully authenticating.
*/
export interface AuthenticateResponse {
  /**
   * The redirect URL that originates from the /authorize call's
   * `redirect_uri` parameter. The OAuth2 authorization `code` and
   * the `state` parameter of the /authorize call are attached with the
   * "code" and "state" parameters to this URL.
  */
  redirectUrl: string;
  /**
   * An optional displayable message defined by policy returned by the
   * cloud on success.
  */
  message?: string;
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
   * @throws Will throw an error if the operation fails.
   */
  static initialize = async (config?: Config): Promise<Embedded> => {
    const defaults = {
      allowedDomains: ["beyondidentity.com"],
    };
    config = config ? config : defaults;
    let allowedDomains = config.allowedDomains
      ? config.allowedDomains
      : defaults.allowedDomains;
    let builder = new CoreBuilder()
      .allowedDomains(allowedDomains.join(","))
      .log(config.logger);

    const core = await builder.build();
    return new Embedded(core);
  };

  /**
   * Binds a passkey to this browser.
   * @param url The url in order to bind a passkey. This can either
   * be a passkey binding link generated from a call to the Beyond
   * Identity API or a passkey binding instruction from an email/sms.
   * @returns A Promise that resolves to a BindPasskeyResponse which
   * contains a passkey as well as a post bind redirect uri.
   * @throws Will throw an error if the operation fails.
   */
  bindPasskey = async (url: string): Promise<BindPasskeyResponse> => {
    const response: BindCredentialV1Result = await this.core.bindCredentialUrl(url);
    return {
      passkey: response.credential,
      postBindingRedirectUri: response.postBindRedirect,
    };
  };

  /**
   * @returns A Promise that resolves to a list of all passkeys bound
   * to this browser.
   * @throws Will throw an error if the operation fails.
   */
  getPasskeys = async (): Promise<Passkey[]> => {
    return await this.core.listCredentials();
  };

  /**
   * Deletes a passkey from this browser.
   * @param id The id to the passkey to be deleted.
   * @throws Will throw an error if the operation fails.
   */
  deletePasskey = async (id: string): Promise<void> => {
    return await this.core.deleteCredentialV1(id);
  };

  /**
   * Returns true if the URL passed in is a bind passkey url.
   * @param url The url in order to bind a passkey. This can either
   * be a passkey binding link generated from a call to the Beyond
   * Identity API or a passkey binding instruction from an email/sms.
   * @returns A boolean indicating if the url passed in is a well formatted
   * bind passkey url.
   * @throws Will throw an error if the operation fails.
   */
  isBindPasskeyUrl = (url: string): boolean => {
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
   * @param url The url in order authenticate against a bound passkey.
   * @returns A boolean indicating if the url passed in is a well formatted
   * authenticate url.
   * @throws Will throw an error if the operation fails.
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
   * Authenticates against the specified passkey bound to the browser.
   * @param url The url in order to authenticate against a passkey.
   * @param passkeyId The ID of the passkey with which to authenticate.
   * @returns A Promise that resolves to an AuthenticateResponse which
   * contains a redirectUrl as well as a message.
   * @throws Will throw an error if the operation fails.
   */
  authenticate = async (
    url: string,
    passkeyId: string
  ): Promise<AuthenticateResponse> => {
    const response: BIAuthenticateUrlResponse = await this.core.authenticate(
      url,
      passkeyId,
      "EmbeddedSource",
      undefined
    );
    return {
      redirectUrl: response.redirectURL,
      message: response.message,
    };
  };
}
