import { AuthorizationCode, PkceCodeChallenge } from "../../../types";
import { Host } from "../../../host";
export declare function authenticateConfidential(authURL: string, clientId: string, redirectURI: string, scope: string, challenge: PkceCodeChallenge | undefined, nonce: string | undefined, host: Host): Promise<AuthorizationCode>;
