/**
 * These messaging types are duplicates of the application types
 * with the exception that they have snake_case spellings
 * so that they are properly serialized into/out of Core.
 *
 * Some types have the same spelling, so they are re-exports
 * of the application types.
 */
import { Credential, CredentialV1, PkceCodeChallenge, UrlResponse, CryptoSource, KeyStorageStrategy, PathType, State, IntegrityFailureError } from "../types";
export { TrustedSource, PkceCodeChallenge, RegistrationStatus, PromptDetail, FeatureFlagRequest, FeatureFlagResponse, PathType, } from "../types";
/**
 * A Profile is identical to a Credential, but
 * is named differently for legacy reasons.
 */
export interface Profile {
    state: State;
    created: string;
    handle: string;
    key_handle: string;
    name: string;
    image_url: string;
    login_uri?: string;
    enroll_uri?: string;
    chain: string[];
    root_fingerprint: string;
    user_id?: Uint8Array;
    key_type?: "subtle" | "webauthn";
}
/**
 * Ok or Err.
 * FIXME: parameterize this over the "Ok" type.
 */
export declare type IntegrityResult = {
    Ok: string;
} | {
    Err: IntegrityFailureError;
};
/**
 * Returned from kmc_all_credentials
 */
export interface CoreCredential {
    created: IntegrityResult;
    state: State;
    handle: IntegrityResult;
    key_handle: IntegrityResult;
    name: string;
    image_url: string;
    chain_handles: IntegrityResult[];
    enroll_uri: string;
    login_uri: string;
    desktop_login_url: string;
    device_gateway_url: string;
    migrate_addr: string;
    root_fingerprint: IntegrityResult;
    user?: User;
    device_credential?: DeviceCredential;
    ssids: [{}];
    key_type?: "subtle" | "webauthn";
}
interface User {
}
interface DeviceCredential {
}
/** Helper method for constructing Credentials from rust Profile objects. */
export declare function credentialFromProfile(profile: Profile): Credential;
export declare function credentialFromCore(cred: CoreCredential): Credential;
export interface HandleSelfIssueUrlResponse {
    operation: string;
    profile: Profile;
    redirect_url: string;
    handled_redirect_externally?: boolean;
}
export interface HandleRegisterUrlResponse {
    operation: string;
    profile: Profile;
}
export interface HandleBiAuthenticateUrlResponse {
    operation: string;
    redirect_url: string;
    message?: string;
}
export interface HandleBindCredentialUrlResponse {
    credential: CoreCredentialV1;
    post_binding_redirect_uri?: string;
}
export declare type HandleUrlResponse = {
    SelfIssue: HandleSelfIssueUrlResponse;
} | {
    Registration: HandleRegisterUrlResponse;
} | {
    BiAuthenticate: HandleBiAuthenticateUrlResponse;
} | {
    BindCredential: HandleBindCredentialUrlResponse;
};
/** Helper method for constructing UrlResponse from rust HandleUrlResponse objects. */
export declare function toUrlResponse(rsp: HandleUrlResponse): UrlResponse;
export interface HostFilePath {
    path_type: PathType;
    path: string;
}
export declare type CheckRetireResponse = {
    version: number;
    is_retired: boolean;
    reason: string;
    info_url: string;
};
export interface TokenResponse {
    access_token: string;
    id_token: string;
    token_type: string;
    expires_in: number;
}
export interface ConfigureGit {
    repoPath: string;
    keyFingerprint: string;
    gpgCliPath: string;
    alwaysSign?: boolean;
}
export interface RegistrationRequest {
    external_id: string;
    email: string;
    user_name: string;
    display_name: string;
}
export declare type RecoverRequest = {
    external_id: string;
} | {
    internal_id: string;
};
export interface Pkce {
    code_verifier: string;
    code_challenge: PkceCodeChallenge;
}
export interface ClientEnvironment {
    crypto_source: CryptoSource;
    key_storage_strategy: KeyStorageStrategy;
}
export interface CoreCredentialV1 {
    id: string;
    local_created: string;
    local_updated: string;
    api_base_url: string;
    tenant_id: string;
    realm_id: string;
    identity_id: string;
    key_handle: string;
    state: "Active" | "Revoked";
    created: string;
    updated: string;
    tenant: CoreTenantV1;
    realm: CoreRealmV1;
    identity: CoreIdentityV1;
    theme: CoreThemeV1;
}
export interface CoreRealmV1 {
    display_name: string;
}
export interface CoreIdentityV1 {
    display_name: string;
    username: string;
    primary_email_address?: string;
}
export interface CoreThemeV1 {
    logo_url_light: string;
    logo_url_dark: string;
    support_url: string;
}
export interface CoreTenantV1 {
    display_name: string;
}
export declare function credentialV1FromCredential(coreCred: CoreCredentialV1): CredentialV1;
export declare type UrlType = {
    type: "Authenticate";
} | {
    type: "Bind";
};
/** Helper method for constructing UrlType from string. */
export declare function toUrlType(rawUrlType: string): UrlType;
