import {
  initialize,
  getAppInstanceId,
  getBrowserInfo,
  v0,
  v1,
} from "./service";
import { Configuration } from "../configuration";
import {
  Credential,
  CredentialV1,
  BindCredentialV1Result,
  PkceCodeChallenge,
  Pkce,
  AuthorizationCode,
  UrlResponse,
  TokenResponse,
  BrowserInfo,
  CredentialDescriptor,
  AuthenticationContext
} from "../types";
import { Host, HostEvents, ExportEvent, ImportEvent } from "../host";

import { BiAuthenticateResponse } from "../types/credential";
import { Types } from "../messaging";

/**
 * This class encapsulates all the methods required to interact with Core
 * as well as the Host interface. 
 */
export class Core {
  host: Host;

  constructor(host: Host) {
    this.host = host;
  }

  get events(): HostEvents {
    return this.host.events;
  }

  /**
   * Perform one-time initialization; specifically,
   * this is done to initially populate appSettings objectStore
   * with an appInstanceId, which is required for the import flow.
   */
  static init = async (config: Configuration): Promise<Core> =>
    initialize(config);

  //
  // V1 Functions
  //

  /**
   * Binds a credential to this device
   */
  bindCredential = async (url: string): Promise<BindCredentialV1Result> =>
    v1.bindCredential(url, this.host);

  /**
   * Deletes a Credential from the local store.
   */
  deleteCredentialV1 = async (id: string): Promise<void> =>
    v1.deleteCredential(id, this.host);

  /**
   * Returns a list of all the Credentials in the local store.
   */
  listCredentials = async (): Promise<CredentialV1[]> =>
    v1.getCredentials(this.host);

  /**
   * Authenticate using the specified credential.
   * 
   * If the provided credential describes an OTP credential,
   * a follow up call to `redeemOtp` is required.
   */
  authenticate = async (
    url: string,
    credDesc: CredentialDescriptor
  ): Promise<BiAuthenticateResponse> =>
    v1.authenticate(url, credDesc, this.host);

  /**
   * Returns the type of a URL. The url may be a Credential Binding Link
   * or an Authentication request.
   */
  getAuthenticationContext = async (
    url: string
  ): Promise<AuthenticationContext> =>
    v1.getAuthenticationContext(url, this.host);

  /**
   * TODO: doc
   */
  getUrlType = (url: string): Types.UrlType => v1.getUrlType(url);

  //
  // V0 Functions
  //

  /**
   * Create a new Credential. Testing only.
   */
  createCredential = async (
    handle: string,
    name: string,
    imageUrl: string,
    loginUri?: string,
    enrollUri?: string
  ): Promise<Credential> =>
    v0.createCredential(handle, name, imageUrl, loginUri, enrollUri, this.host);

  /**
   * Returns all the Credentials in the local store.
   */
  getCredentials = async (): Promise<Credential[]> =>
    v0.getCredentials(this.host);

  /**
   * Delete a Credential from the local store.
   */
  deleteCredential = async (handle: string): Promise<void> =>
    v0.deleteCredential(handle, this.host);

  /**
   * Register a new Credential on this device.
   */
  register = async (url: string): Promise<UrlResponse> =>
    v0.register(url, this.host);

  /**
   * Begins an export of the specified credential.
   * @param handle
   * @param url
   * @returns A promise that resolves to a rendezvous token
   * that is the result of an export "started" event.
   * This does not indicate that the operation has completed.
   * The caller must then periodically poll the `core's`
   * `exportStatus` member to check for an updated token in
   * the event of a timeout.
   *
   * If the operation fails for any reason, then the promise
   * will be rejected.
   */
  export = async (
    handle: string,
    onExport: (event: ExportEvent) => void
  ): Promise<string> => v0.export_(handle, onExport, this.host);

  /**
   * TODO: when should this promise be resolved?
   * @param token
   * @param address
   * @returns
   */
  import = async (
    token: string,
    onImport?: (ev: ImportEvent) => void
  ): Promise<Credential | undefined> => v0.import_(token, onImport, this.host);

  /**
   * Cancels an ongoing `export` operation.
   */
  cancel = async (): Promise<void> => v0.cancel();

  /**
   * Confidential OIDC authentication.
   */
  authenticateConfidential = async (
    authURL: string,
    clientId: string,
    redirectURI: string,
    scope: string,
    PKCECodeChallenge?: PkceCodeChallenge,
    nonce?: string
  ): Promise<AuthorizationCode> =>
    v0.authenticateConfidential(
      authURL,
      clientId,
      redirectURI,
      scope,
      PKCECodeChallenge,
      nonce,
      this.host
    );

  /**
   * TODO: We don't support this flow. Can we delete this?
   */
  authenticatePublic = async (
    authURL: string,
    tokenURL: string,
    clientId: string,
    redirectURI: string,
    nonce?: string
  ): Promise<TokenResponse> =>
    v0.authenticatePublic(
      authURL,
      tokenURL,
      clientId,
      redirectURI,
      nonce,
      this.host
    );

  /**
   * Creates a PKCE code verifier and code challenge.
   */
  createPkce = async (): Promise<Pkce> => v0.createPkce();

  //
  // Utility Functions
  //

  getAppInstanceId = async (): Promise<string> => getAppInstanceId();

  getBrowserInfo = async (): Promise<BrowserInfo> => getBrowserInfo();

  /**
   * TESTING ONLY!
   * Deletes the keymaker database.
   */
  static reset = async (): Promise<void> =>
    new Promise((resolve, reject) => {
      let rq = window.indexedDB.deleteDatabase("keymaker");
      rq.onerror = (e) => {
        reject("unexpected error");
      };
      rq.onsuccess = (e) => {
        resolve();
      };
    });
}
