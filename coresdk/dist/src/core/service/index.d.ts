import { Host } from "../../host";
import { BindResponse, Credential, CredentialDescriptor, AuthenticationContext, AuthenticateResponse } from "../../types";
export { initialize } from "./initialize";
export { getAppInstanceId, getBrowserInfo, getServiceUrlType } from "./util";
export * as v0 from "./v0";
export declare function bindCredential(url: string, host: Host): Promise<BindResponse>;
export declare function deleteCredential(id: string, host: Host): Promise<void>;
export declare function getCredentials(host: Host): Promise<Credential[]>;
export declare function updateCredentials(host: Host): Promise<void>;
export declare function getAuthenticationContext(url: string, host: Host): Promise<AuthenticationContext>;
/**
 *
 * @param url Authentication URL. For example auth-us.beyondidentity.com.
 * @param credDesc A structure describing the credential to authenticate,
 * or a credential selection callback
 * @param host The Host callbacks.
 * @returns
 */
export declare function authenticate(url: string, credDesc: CredentialDescriptor, host: Host): Promise<AuthenticateResponse>;
