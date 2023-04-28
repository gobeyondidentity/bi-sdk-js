export { CertHandle, KeyHandle, ProfileHandle } from "./handles";
export { Credential, UrlResponse, BIAuthenticateUrlResponse } from "./credential";
export { CredentialV1, RealmV1, ThemeV1, IdentityV1, BindCredentialV1Result, } from "./v1";
export { State, KeyType, IntegrityFailureError } from "./credential";
export { Pkce, PkceCodeChallenge } from "./pkce";
export { BrowserInfo } from "./browserInfo";
export declare type TrustedSource = "InactiveFeature" | "UntrustedSource" | "TrustedSource" | "EmbeddedSource";
export interface AuthorizationCode {
    code: string;
}
export interface RegistrationRequest {
    externalId: string;
    email: string;
    username: string;
    displayName: string;
}
export declare type RecoverRequest = {
    ExternalID: string;
} | {
    InternalID: string;
};
export declare type FeatureFlagRequest = "IsInternalBuild";
export declare type FeatureFlagResponse = {
    IsInternalBuild: boolean;
};
export interface PromptDetail {
    label: string;
    detail: string;
}
export declare type RegistrationStatus = "UserStatusActive" | "UserStatusSuspended" | "UserStatusDeleted";
export declare enum PathType {
    osQuery = 0
}
export interface HostFilePath {
    type: PathType;
    path: string;
}
export declare type CheckRetireResponse = {
    version: number;
    isRetired: boolean;
    reason: string;
    infoUrl: string;
};
export interface TokenResponse {
    accessToken: string;
    idToken: string;
    tokenType: string;
    expiresIn: number;
}
export declare type CryptoSource = "Host" | "Hal";
export declare type KeyStorageStrategy = "TeeIfAvailable" | "ForceSoftware";
export interface ClientEnvironment {
    cryptoSource: CryptoSource;
    keyStorageStrategy: KeyStorageStrategy;
}
