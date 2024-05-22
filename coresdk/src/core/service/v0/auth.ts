import {
  AuthorizationCode,
  PkceCodeChallenge,
  TokenResponse,
} from "../../../types";
import { Host, hostCall } from "../../../host";
import { Types } from "../../../messaging";
import { kmc_embedded_confidential_oidc } from "kmc-ffi";

export async function authenticateConfidential(
  authURL: string,
  clientId: string,
  redirectURI: string,
  scope: string,
  challenge: PkceCodeChallenge | undefined,
  nonce: string | undefined,
  host: Host
): Promise<AuthorizationCode> {
  let code = <AuthorizationCode>(
    await kmc_embedded_confidential_oidc(
      authURL,
      clientId,
      redirectURI,
      scope,
      challenge,
      nonce,
      (msg: string) => {
        return hostCall(host, msg);
      }
    )
  );
  return code;
}