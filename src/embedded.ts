import {
  BiAuthenticateResponse,
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
 * Information associated with the current authentication request returned
 * from `getAuthenticationContext`.
 *
 * Note that the `authUrl` field may differ from the URL passed into
 * `getAuthenticationContext`. In this event, the new `authUrl` must be
 * passed into `authenticate` or `authenticateOtp`, rather than the
 * original URL.
 */
export interface AuthenticationContext {
  authUrl: string;
  authMethods?: AuthenticationMethod[];
  application: {
    id: string;
    displayName?: string;
  };
  origin: {
    sourceIp?: string;
    userAgent?: string;
    geolocation?: string;
    referer?: string;
  };
}

export type AuthenticationMethod =
  | { type: "webauthn_passkey" }
  | { type: "software_passkey" }
  | { type: "email_one_time_password" };

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
  /**
   * A one-time-token that may be redeemed for a CredentialBindingLink.
   */
  passkeyBindingToken?: string;
}

/**
 * A response returned if the SDK requires an OTP.
 */
export interface OtpChallengeResponse {
  /**
   * A URL containing the state of the authentication.
   */
  url: string;
}

export class Embedded {
  private core: Core;

  private constructor(core: Core) {
    this.core = core;
  }

  /**
   * Initializes the Embedded SDK. This function must
   * be called before any other function.
   * @param {Config} config The optional configuration for the Embedded SDK.
   * @returns {Promise<Embedded>} A promise that resolves to an instance of the Embedded SDK.
   * @throws {Error} Will throw an error if the operation fails.
   */
  static initialize = async (config?: Config): Promise<Embedded> => {
    const defaults = {
      allowedDomains: ["beyondidentity.com"],
    };
    config = config ? config : defaults;
    let allowedDomains = config.allowedDomains
      ? config.allowedDomains
      : defaults.allowedDomains;
    allowedDomains.push(window.location.host);
    let builder = new CoreBuilder()
      .allowedDomains(allowedDomains.join(","))
      .log(config.logger);

    const core = await builder.build();
    return new Embedded(core);
  };

  /**
   * Binds a passkey to this browser.
   * @param {string} url The URL to bind a passkey. This can either
   * be a passkey binding link generated from a call to the Beyond
   * Identity API or a passkey binding instruction from an email/sms.
   * @returns {Promise<BindPasskeyResponse>} A promise that resolves
   * to a BindPasskeyResponse containing the bound passkey and the
   * post-binding redirect URI.
   * @throws {Error} Will throw an error if the operation fails.
   */
  bindPasskey = async (url: string): Promise<BindPasskeyResponse> => {
    const response: BindCredentialV1Result = await this.core.bindCredential(
      url
    );
    return {
      passkey: response.credential,
      postBindingRedirectUri: response.postBindRedirect,
    };
  };

  /**
   * Returns a list of all passkeys bound to this browser.
   * @returns {Promise<Passkey[]>} A promise that resolves to a
   * list of all passkeys bound to this browser.
   * @throws {Error} Will throw an error if the operation fails.
   */
  getPasskeys = async (): Promise<Passkey[]> => {
    return await this.core.listCredentials();
  };

  /**
   * Deletes a passkey from this browser.
   * @param {string} id The ID of the passkey to be deleted.
   * @returns {Promise<void>} A promise that resolves when the
   * passkey is successfully deleted.
   * @throws {Error} Will throw an error if the operation fails.
   */
  deletePasskey = async (id: string): Promise<void> => {
    return await this.core.deleteCredentialV1(id);
  };

  /**
   * Checks if the given URL is a bind passkey URL.
   * @param {string} url The URL to be checked. This can either
   * be a passkey binding link generated from a call to the Beyond
   * Identity API or a passkey binding instruction from an email/sms.
   * @returns {boolean} Returns true if the URL is a bind passkey URL,
   * otherwise false.
   * @throws {Error} Will throw an error if the operation fails.
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
   * Checks if the given URL is an authenticate URL.
   * @param {string} url The URL to be checked.
   * @returns {boolean} Returns true if the URL is an authenticate URL,
   * otherwise false.
   * @throws {Error} Will throw an error if the operation fails.
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
   * Returns the Authentication Context for the current transaction.
   * The Authentication Context contains the Authenticator Config,
   * Authentication Method Configuration, request origin, and the
   * authenticating application.
   * @param {string} url The authentication URL of the current transaction.
   * @returns {Promise<AuthenticationContext>} A promise that resolves to
   * the Authentication Context.
   */
  getAuthenticationContext = async (
    url: string
  ): Promise<AuthenticationContext> => {
    const authContext = await this.core.getAuthenticationContext(url);
    return {
      authUrl: authContext.authUrl,
      authMethods: authContext.authMethods,
      application: authContext.application,
      origin: authContext.origin,
    };
  };

  /**
   * Authenticates against the specified passkey bound to the browser.
   * @param {string} url The authentication URL of the current transaction.
   * @param {string} passkeyId The ID of the passkey to authenticate with.
   * @returns {Promise<AuthenticateResponse>} A promise that resolves to an
   * AuthenticateResponse containing a redirect URL and a message.
   * @throws {Error} Will throw an error if the operation fails.
   */
  authenticate = async (
    url: string,
    passkeyId: string
  ): Promise<AuthenticateResponse> => {
    const response: BiAuthenticateResponse = await this.core.authenticate(url, {
      credentialId: passkeyId,
    });

    if ("allow" in response) {
      return {
        redirectUrl: response.allow.redirectURL,
        message: response.allow.message,
      };
    } else {
      throw new Error("unexpected response");
    }
  };

  /**
   * Initiates authentication using an OTP, which will be sent to the
   * provided email address.
   * @param {string} url The authentication URL of the current transaction.
   * @param {string} email The email address where the OTP will be sent.
   * @returns {Promise<OtpChallengeResponse>} A promise that resolves to an
   * OtpChallengeResponse containing a URL with the state of the authentication.
   * @throws {Error} Will throw an error if the operation fails.
   */
  authenticateOtp = async (
    url: string,
    email: string
  ): Promise<OtpChallengeResponse> => {
    const response: BiAuthenticateResponse = await this.core.authenticate(url, {
      beginEmailOtp: email,
    });

    if ("continue" in response) {
      return {
        url: response.continue.url,
      };
    } else {
      throw new Error("unexpected response");
    }
  };

  /**
   * Redeems an OTP for a grant code.
   * @param {string} url The authentication URL of the current transaction.
   * @param {string} otp The OTP to redeem.
   * @returns {Promise<AuthenticateResponse | OtpChallengeResponse>} A promise that resolves
   * to an AuthenticateResponse on success or an OtpChallengeResponse on failure.
   * @throws {Error} Will throw an error if the operation fails.
   */
  redeemOtp = async (
    url: string,
    otp: string
  ): Promise<AuthenticateResponse | OtpChallengeResponse> => {
    const response: BiAuthenticateResponse = await this.core.authenticate(url, {
      redeemOtp: otp,
    });

    if ("allow" in response) {
      return {
        redirectUrl: response.allow.redirectURL,
        message: response.allow.message,
        passkeyBindingToken: response.allow.passkeyBindingToken,
      };
    } else if ("continue" in response) {
      return {
        url: response.continue.url,
      };
    } else {
      throw new Error("unexpected response");
    }
  };
}
