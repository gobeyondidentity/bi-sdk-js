export { CertHandle, KeyHandle, ProfileHandle } from "./handles";
export { Credential, UrlResponse, BIAuthenticateUrlResponse } from "./credential";
export {
  CredentialV1,
  RealmV1,
  ThemeV1,
  IdentityV1,
  BindCredentialV1Result,
  CredentialId,
  RealmId,
  TenantId,
  IdentityId,
  CredentialBindingJobId,
} from "./v1";
export { State, KeyType, IntegrityFailureError } from "./credential";
export { Pkce, PkceCodeChallenge } from "./pkce";
export { BrowserInfo } from "./browserInfo";

export type TrustedSource =
  // This feature is inactive either because it is behind a feature flag or
  // not used by the tenant.
  | "InactiveFeature"
  // The HandleUrl request is coming from an untrusted source.
  | "UntrustedSource"
  // The HandleUrl request is coming from a trusted source.
  | "TrustedSource"
  // The HandleUrl request is coming from the Embedded SDK.
  | "EmbeddedSource";

export interface AuthorizationCode {
  code: string;
}

export interface RegistrationRequest {
  externalId: string;
  email: string;
  username: string;
  displayName: string;
}

export type RecoverRequest = { ExternalID: string } | { InternalID: string };

export type FeatureFlagRequest = "IsInternalBuild";

export type FeatureFlagResponse = {
  IsInternalBuild: boolean;
};

export interface PromptDetail {
  label: string;
  detail: string;
}

export type RegistrationStatus =
  | "UserStatusActive"
  | "UserStatusSuspended"
  | "UserStatusDeleted";

export enum PathType {
  osQuery = 0,
}

export interface HostFilePath {
  type: PathType;
  path: string;
}

export type CheckRetireResponse = {
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

export type CryptoSource = "Host" | "Hal";
export type KeyStorageStrategy = "TeeIfAvailable" | "ForceSoftware";

export interface ClientEnvironment {
  cryptoSource: CryptoSource;
  keyStorageStrategy: KeyStorageStrategy;
}
