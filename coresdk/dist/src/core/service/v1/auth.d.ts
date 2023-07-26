import { Host } from "../../../host";
import { BiAuthenticateResponse, CredentialDescriptor, AuthenticationContext } from "../../../types";
export declare function getAuthenticationContext(url: string, host: Host): Promise<AuthenticationContext>;
/**
 *
 * @param url Authentication URL. For example auth-us.beyondidentity.com.
 * @param credDesc A structure describing the credential to authenticate,
 * or a credential selection callback
 * @param host The Host callbacks.
 * @returns
 */
export declare function authenticate(url: string, credDesc: CredentialDescriptor, host: Host): Promise<BiAuthenticateResponse>;
