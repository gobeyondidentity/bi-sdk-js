import { KeyType } from "./credential";
import { KeyHandle } from "./handles";
export declare type TenantId = string;
export declare type RealmId = string;
export declare type IdentityId = string;
export declare type CredentialId = string;
export declare type CredentialBindingJobId = string;
/**
 * Credential in the directory V1 sense
 */
export interface CredentialV1 {
    id: string;
    localCreated: string;
    localUpdated: string;
    apiBaseUrl: string;
    tenantId: TenantId;
    realmId: RealmId;
    identityId: IdentityId;
    keyHandle: KeyHandle;
    keyType?: KeyType;
    state: "Active" | "Revoked";
    created: string;
    updated: string;
    realm: RealmV1;
    identity: IdentityV1;
    theme: ThemeV1;
}
export interface RealmV1 {
    displayName: string;
}
export interface IdentityV1 {
    displayName: string;
    username: string;
    emailAddress: string;
}
export interface ThemeV1 {
    logoUrlLight: string;
    logoUrlDark: string;
    supportUrl: string;
}
/**
 * The result of binding a CredentialV1
 */
export interface BindCredentialV1Result {
    credential: CredentialV1;
    postBindRedirect?: string;
}
