import { Configuration } from "./configuration";
import { MockConfiguration } from "./mock";
import { CoreDispatch } from "./coreDispatch";
import { Credential, CredentialV1, BindCredentialV1Result, PkceCodeChallenge, Pkce, TrustedSource, AuthorizationCode, UrlResponse, TokenResponse, BrowserInfo, CredentialId } from "./types";
import { Log } from "./log";
import { HostEvents, ExportEvent, ImportEvent } from "./host";
import { BIAuthenticateUrlResponse } from "./types/credential";
/**
 * CoreBuilder is a wrapper around `CoreConfig` with a "fluent" interface.
 */
export declare class CoreBuilder {
    config: Configuration;
    constructor();
    mock(data: MockConfiguration): CoreBuilder;
    log(log?: Log): CoreBuilder;
    allowedDomains(allowedDomains?: string): CoreBuilder;
    /**
     * Construct the `Core`.
     * @returns `Core`
     */
    build(): Promise<Core>;
}
/**
 * The only thing you need!
 * Wraps the core dispatch so it can be configured with a Mock interface.
 */
export declare class Core {
    dispatch: CoreDispatch;
    constructor(dispatch: CoreDispatch);
    get events(): HostEvents;
    /**
     * Perform one-time initialization; specifically,
     * this is done to initially populate appSettings objectStore
     * with an appInstanceId, which is required for the import flow.
     */
    init: (config: Configuration) => Promise<void>;
    bindCredentialUrl: (url: string) => Promise<BindCredentialV1Result>;
    getUrlType: (url: string) => import("./messaging/types").UrlType;
    cancel: () => Promise<void>;
    createPKCE: () => Promise<Pkce>;
    createCredential: (handle: string, name: string, imageUrl: string, loginUri?: string | undefined, enrollUri?: string | undefined) => Promise<Credential>;
    deleteCredential: (handle: string) => Promise<void>;
    deleteCredentialV1: (id: CredentialId) => Promise<void>;
    authenticateConfidential: (authURL: string, clientId: string, redirectURI: string, scope: string, PKCECodeChallenge?: PkceCodeChallenge | undefined, nonce?: string | undefined) => Promise<AuthorizationCode>;
    /**
     * Authenticates a credential.
     */
    authenticate: (url: string, credentialId: CredentialId | undefined, trusted: TrustedSource, onSelectCredential?: ((credentials: CredentialV1[]) => Promise<string | undefined>) | undefined) => Promise<BIAuthenticateUrlResponse>;
    authenticatePublic: (authURL: string, tokenURL: string, clientId: string, redirectURI: string, nonce?: string | undefined) => Promise<TokenResponse>;
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
    export: (handle: string, onExport: (event: ExportEvent) => void) => Promise<string>;
    getCredentials: () => Promise<Credential[]>;
    listCredentials: () => Promise<CredentialV1[]>;
    handleURL: (url: string, trusted: TrustedSource) => Promise<UrlResponse>;
    /**
     * TODO: whn should this promise be resolved?
     * @param token
     * @param address
     * @returns
     */
    import: (token: string, onImport?: ((ev: ImportEvent) => void) | undefined) => Promise<Credential | undefined>;
    register: (url: string, trusted: TrustedSource) => Promise<UrlResponse>;
    getAppInstanceId: () => Promise<string>;
    getBrowserInfo: () => Promise<BrowserInfo>;
    /**
     * TESTING ONLY!
     * Deletes the keymaker database.
     */
    static reset: () => Promise<void>;
}
