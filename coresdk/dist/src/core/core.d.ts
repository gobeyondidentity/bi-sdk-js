import { Configuration } from "../configuration";
import { Credential, CredentialV1, BindCredentialV1Result, PkceCodeChallenge, Pkce, AuthorizationCode, UrlResponse, TokenResponse, BrowserInfo, CredentialDescriptor, AuthenticationContext } from "../types";
import { Host, HostEvents, ExportEvent, ImportEvent } from "../host";
import { BiAuthenticateResponse } from "../types/credential";
import { Types } from "../messaging";
/**
 * This class encapsulates all the methods required to interact with Core
 * as well as the Host interface.
 */
export declare class Core {
    host: Host;
    constructor(host: Host);
    get events(): HostEvents;
    /**
     * Perform one-time initialization; specifically,
     * this is done to initially populate appSettings objectStore
     * with an appInstanceId, which is required for the import flow.
     */
    static init: (config: Configuration) => Promise<Core>;
    /**
     * Binds a credential to this device
     */
    bindCredential: (url: string) => Promise<BindCredentialV1Result>;
    /**
     * Deletes a Credential from the local store.
     */
    deleteCredentialV1: (id: string) => Promise<void>;
    /**
     * Returns a list of all the Credentials in the local store.
     */
    listCredentials: () => Promise<CredentialV1[]>;
    /**
     * Authenticate using the specified credential.
     *
     * If the provided credential describes an OTP credential,
     * a follow up call to `redeemOtp` is required.
     */
    authenticate: (url: string, credDesc: CredentialDescriptor) => Promise<BiAuthenticateResponse>;
    /**
     * Returns the Authentication Context for the current transaction.
     *
     * The Authentication Context contains the Authenticator Config,
     * Authentication Method Configuration, request origin, and the
     * authenticating application.
     */
    getAuthenticationContext: (url: string) => Promise<AuthenticationContext>;
    /**
     * Returns the type of a URL. The url may be a Credential Binding Link
     * or an Authentication request.
     */
    getUrlType: (url: string) => Types.UrlType;
    /**
     * Create a new Credential. Testing only.
     */
    createCredential: (handle: string, name: string, imageUrl: string, loginUri?: string | undefined, enrollUri?: string | undefined) => Promise<Credential>;
    /**
     * Returns all the Credentials in the local store.
     */
    getCredentials: () => Promise<Credential[]>;
    /**
     * Delete a Credential from the local store.
     */
    deleteCredential: (handle: string) => Promise<void>;
    /**
     * Register a new Credential on this device.
     */
    register: (url: string) => Promise<UrlResponse>;
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
    /**
     * TODO: when should this promise be resolved?
     * @param token
     * @param address
     * @returns
     */
    import: (token: string, onImport?: ((ev: ImportEvent) => void) | undefined) => Promise<Credential | undefined>;
    /**
     * Cancels an ongoing `export` operation.
     */
    cancel: () => Promise<void>;
    /**
     * Confidential OIDC authentication.
     */
    authenticateConfidential: (authURL: string, clientId: string, redirectURI: string, scope: string, PKCECodeChallenge?: PkceCodeChallenge | undefined, nonce?: string | undefined) => Promise<AuthorizationCode>;
    /**
     * TODO: We don't support this flow. Can we delete this?
     */
    authenticatePublic: (authURL: string, tokenURL: string, clientId: string, redirectURI: string, nonce?: string | undefined) => Promise<TokenResponse>;
    /**
     * Creates a PKCE code verifier and code challenge.
     */
    createPkce: () => Promise<Pkce>;
    getAppInstanceId: () => Promise<string>;
    getBrowserInfo: () => Promise<BrowserInfo>;
    /**
     * TESTING ONLY!
     * Deletes the keymaker database.
     */
    static reset: () => Promise<void>;
}
