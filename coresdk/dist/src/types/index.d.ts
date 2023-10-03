import { CredentialV1 } from "./v1";
export { CertHandle, KeyHandle, ProfileHandle } from "./handles";
export { Credential, UrlResponse, BiAuthenticateResponse } from "./credential";
export { CredentialV1, RealmV1, ThemeV1, IdentityV1, BindCredentialV1Result, } from "./v1";
export { State, KeyType, IntegrityFailureError } from "./credential";
export { Pkce, PkceCodeChallenge } from "./pkce";
export { BrowserInfo } from "./browserInfo";
export interface AuthorizationCode {
    code: string;
}
export interface RegistrationRequest {
    externalId: string;
    email: string;
    username: string;
    displayName: string;
}
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
    gdcUrl: string;
}
/**
 * Describes a Credential and method with which to authenticate.
 * * `credentialId` - the referenced Credential is a passkey
 * * `emailOtp` - email OTP
 * * `credentialSelect` - the supplied callback will be invoked during prior to authentication.
 */
export declare type CredentialDescriptor = {
    credentialId: string;
} | {
    beginEmailOtp: string;
} | {
    redeemOtp: string;
} | {
    credentialSelect: (credentials: CredentialV1[]) => Promise<string | undefined>;
};
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
export declare type AuthenticationMethod = {
    type: "webauthn_passkey";
} | {
    type: "software_passkey";
} | {
    type: "email_one_time_password";
};
