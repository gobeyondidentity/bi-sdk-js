import { KeyType } from "./credential";
import { KeyHandle } from "./handles";

export type TenantId = string;
export type RealmId = string;
export type IdentityId = string;
export type CredentialId = string;
export type CredentialBindingJobId = string;

/**
 * Credential in the directory V1 sense
 */
export interface CredentialV1 {
  id: string;
  localCreated: string;
  localUpdated: string;
  apiBaseUrl: string;
  keyHandle: KeyHandle;
  keyType?: KeyType;
  state: "Active" | "Revoked";
  created: string;
  updated: string;
  tenant: TenantV1;
  realm: RealmV1;
  identity: IdentityV1;
  theme: ThemeV1;
}

export interface RealmV1 {
  id: RealmId;
  displayName: string;
}

export interface IdentityV1 {
  id: IdentityId;
  displayName: string;
  username: string;
  primaryEmailAddress?: string;
}

export interface ThemeV1 {
  logoUrlLight: string;
  logoUrlDark: string;
  supportUrl: string;
}

export interface TenantV1 {
  id: TenantId;
  displayName: string;
}

/**
 * The result of binding a CredentialV1
 */
export interface BindCredentialV1Result {
  credential: CredentialV1;
  postBindRedirect?: string;
}
