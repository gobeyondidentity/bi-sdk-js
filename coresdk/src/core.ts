import { Configuration } from "./configuration";
import { MockConfiguration } from "./mock";
import { CoreDispatch, createDispatch } from "./coreDispatch";
import {
  Credential,
  CredentialV1,
  BindCredentialV1Result,
  PkceCodeChallenge,
  Pkce,
  TrustedSource,
  AuthorizationCode,
  UrlResponse,
  TokenResponse,
  BrowserInfo,
} from "./types";
import { Log } from "./log";
import { HostEvents, ExportEvent, ImportEvent } from "./host";
import init from "kmc-ffi";
import { BIAuthenticateUrlResponse } from "./types/credential";

/**
 * CoreBuilder is a wrapper around `CoreConfig` with a "fluent" interface.
 */
export class CoreBuilder {
  config: Configuration;

  constructor() {
    this.config = new Configuration();
  }

  mock(data: MockConfiguration): CoreBuilder {
    this.config.mock = data;
    return this;
  }

  log(log?: Log): CoreBuilder {
    this.config.log = log;
    return this;
  }

  allowedDomains(allowedDomains?: string): CoreBuilder {
    this.config.allowedDomains = allowedDomains;
    return this;
  }

  /**
   * Construct the `Core`.
   * @returns `Core`
   */
  async build(): Promise<Core> {
    if (!this.config.mock) {
      await init();
    }
    let core = new Core(createDispatch(this.config));
    await core.init(this.config);
    return core;
  }
}

/**
 * The only thing you need!
 * Wraps the core dispatch so it can be configured with a Mock interface.
 */
export class Core {
  dispatch: CoreDispatch;
  
  constructor(dispatch: CoreDispatch) {
    this.dispatch = dispatch;
  }

  get events(): HostEvents {
    return this.dispatch.host.events;
  }

  /**
   * Perform one-time initialization; specifically,
   * this is done to initially populate appSettings objectStore
   * with an appInstanceId, which is required for the import flow.
   */
  init = async (config: Configuration): Promise<void> => {
    await this.dispatch.migrateDatabase(config.allowedDomains);

    // Get the appInstanceID. This is the step that populates the 
    // appInstanceId on first run.
    await this.dispatch.getAppInstanceId();
  };

  bindCredentialUrl = async (url: string): Promise<BindCredentialV1Result> =>
    await this.dispatch.bindCredentialUrl(url);

  getUrlType = (url: string) => this.dispatch.getUrlType(url);

  cancel = async (): Promise<void> => this.dispatch.cancel();

  createPKCE = async (): Promise<Pkce> => this.dispatch.createPkce();

  createCredential = async (
    handle: string,
    name: string,
    imageUrl: string,
    loginUri?: string,
    enrollUri?: string
  ): Promise<Credential> =>
    this.dispatch.createCredential(handle, name, imageUrl, loginUri, enrollUri);

  deleteCredential = async (handle: string): Promise<void> =>
    this.dispatch.deleteCredential(handle);

  deleteCredentialV1 = async (id: string): Promise<void> =>
    this.dispatch.deleteCredentialV1(id);

  authenticateConfidential = async (
    authURL: string,
    clientId: string,
    redirectURI: string,
    scope: string,
    PKCECodeChallenge?: PkceCodeChallenge,
    nonce?: string
  ): Promise<AuthorizationCode> =>
    this.dispatch.authenticateConfidential(
      authURL,
      clientId,
      redirectURI,
      scope,
      PKCECodeChallenge,
      nonce
    );

  /**
   * Authenticates a credential.
   */
  authenticate = async (
    url: string,
    credentialId: string | undefined,
    trusted: TrustedSource,
    onSelectCredential?: (
      credentials: CredentialV1[]
    ) => Promise<string | undefined>
  ): Promise<BIAuthenticateUrlResponse> => {
    this.dispatch.host.events.onSelectCredentialV1 = onSelectCredential
      ? async (credentials) => onSelectCredential?.(credentials)
      : undefined; // use default credential selection handling defined by the host
    
    try {
      return await this.dispatch.authenticate(url, credentialId, trusted, onSelectCredential);
    } finally {
      // reset select credential callback
      this.dispatch.host.events.onSelectCredentialV1 = undefined;
    }
  };

  authenticatePublic = async (
    authURL: string,
    tokenURL: string,
    clientId: string,
    redirectURI: string,
    nonce?: string
  ): Promise<TokenResponse> =>
    this.dispatch.authenticatePublic(
      authURL,
      tokenURL,
      clientId,
      redirectURI,
      nonce
    );

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
  ): Promise<string> =>
    new Promise(async (resolve, reject) => {
      this.dispatch.host.events.onexport = (ev: ExportEvent) => {
        // We don't expect failed or cancelled events from the Host.
        if (ev.type == "started") {
          // Return the rendezvous token.
          resolve(<string>ev.data);
        }
        onExport(ev);
      };

      // Kick off the operation.
      // This promise resolves when the "started" event is
      // received. Any failures from export (including cancellation)
      // will reject the promise. The return value of export upon
      // success is ignored.

      try {
        await this.dispatch.export(handle);
      } catch (err) {
        reject(err);
      } finally {
        this.dispatch.host.events.onexport = undefined;
      }
    });

  getCredentials = async (): Promise<Credential[]> =>
    this.dispatch.getCredentials();

  listCredentials = async (): Promise<CredentialV1[]> =>
    this.dispatch.listCredentials();

  handleURL = async (
    url: string,
    trusted: TrustedSource
  ): Promise<UrlResponse> => this.dispatch.handleURL(url, trusted);

  /**
   * TODO: whn should this promise be resolved?
   * @param token
   * @param address
   * @returns
   */
  import = async (
    token: string,
    onImport?: (ev: ImportEvent) => void
  ): Promise<Credential | undefined> => {
    this.dispatch.host.events.onimport = onImport;
    try {
      return await this.dispatch.import(token);
    } finally {
      this.dispatch.host.events.onimport = undefined;
    }
  };

  register = async (
    url: string,
    trusted: TrustedSource
  ): Promise<UrlResponse> => this.dispatch.register(url, trusted);

  getAppInstanceId = async (): Promise<string> => {
    let halVersion = "H";
    return (await this.dispatch.getAppInstanceId()) + `[${halVersion}]`;
  };

  getBrowserInfo = async (): Promise<BrowserInfo> =>
    await this.dispatch.getBrowserInfo();

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
