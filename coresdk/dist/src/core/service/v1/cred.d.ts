import { BindCredentialV1Result, CredentialV1 } from "../../../types";
import { Host } from "../../../host";
/**
 * Binds a credential to the current browser.
 * @param url
 * @param host
 * @returns
 */
export declare function bindCredential(url: string, host: Host): Promise<BindCredentialV1Result>;
export declare function getCredentials(host: Host): Promise<CredentialV1[]>;
/**
 *
 * @param id
 * @param host
 */
export declare function deleteCredential(id: string, host: Host): Promise<void>;
