import { AuthorizationCode, PkceCodeChallenge, TokenResponse } from "../../../types";
import { Host } from "../../../host";
export declare function authenticateConfidential(authURL: string, clientId: string, redirectURI: string, scope: string, challenge: PkceCodeChallenge | undefined, nonce: string | undefined, host: Host): Promise<AuthorizationCode>;
export declare function authenticatePublic(authURL: string, tokenURL: string, clientId: string, redirectURI: string, nonce: string | undefined, host: Host): Promise<TokenResponse>;
