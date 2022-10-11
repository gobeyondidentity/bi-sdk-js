import { Configuration } from "./configuration";
import { Types as Messaging } from "./messaging";
import { Pkce, PkceCodeChallenge, TrustedSource, AuthorizationCode, UrlResponse, TokenResponse, BrowserInfo, Credential, BindCredentialV1Result, CredentialV1, KeyType, CredentialId } from "./types";
import { Host } from "./host";
import { BIAuthenticateUrlResponse } from "./types/credential";
/**
 * The CoreDispatch is responsible for marshaling invoking KMC and marshalling
 * requests to/from the Host.
 */
export interface CoreDispatch {
    host: Host;
    bindCredentialUrl(url: string): Promise<BindCredentialV1Result>;
    getUrlType(url: string): Messaging.UrlType;
    migrateDatabase(allowedDomains?: string): Promise<void>;
    cancel(): Promise<void>;
    createPkce(): Promise<Pkce>;
    createCredential(handle: string, name: string, imageUrl: string, loginUri?: string, enrollUri?: string): Promise<Credential>;
    deleteCredential(handle: string): Promise<void>;
    deleteCredentialV1(id: CredentialId): Promise<void>;
    authenticate(url: string, credentialId: CredentialId | undefined, trusted: TrustedSource, onSelectCredential?: (credentials: CredentialV1[]) => Promise<string | undefined>): Promise<BIAuthenticateUrlResponse>;
    authenticateConfidential(authURL: string, clientId: string, redirectURI: string, scope: string, PKCECodeChallenge?: PkceCodeChallenge, nonce?: string): Promise<AuthorizationCode>;
    authenticatePublic(authURL: string, tokenURL: string, clientId: string, redirectURI: string, nonce?: string): Promise<TokenResponse>;
    export(handle: string): Promise<void>;
    getCredentials(): Promise<Credential[]>;
    listCredentials(): Promise<CredentialV1[]>;
    getKeyType(keyHandle: string): Promise<KeyType>;
    handleURL(url: string, trusted: TrustedSource): Promise<UrlResponse>;
    import(token: string): Promise<Credential | undefined>;
    register(url: string, trusted: TrustedSource): Promise<UrlResponse>;
    getAppInstanceId(): Promise<string>;
    getBrowserInfo(): Promise<BrowserInfo>;
}
/**
 * Creates the CoreDispatch that Core uses.
 *
 * @param config Configuration data
 * @returns a new CoreDispatch object: `KmcDispatch | `MockDispatch`
 */
export declare function createDispatch(config: Configuration): CoreDispatch;
