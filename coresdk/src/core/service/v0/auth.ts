import {
  AuthorizationCode,
  PkceCodeChallenge,
  TokenResponse,
} from "../../../types";
import { Host, hostCall } from "../../../host";
import { Types } from "../../../messaging";
import {
  kmc_embedded_confidential_oidc,
  kmc_embedded_public_oidc,
} from "kmc-ffi";

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

export async function authenticatePublic(
  authURL: string,
  tokenURL: string,
  clientId: string,
  redirectURI: string,
  nonce: string | undefined,
  host: Host
): Promise<TokenResponse> {
  let token = <Types.TokenResponse>(
    await kmc_embedded_public_oidc(
      authURL,
      tokenURL,
      clientId,
      redirectURI,
      nonce,
      (msg: string) => {
        return hostCall(host, msg);
      }
    )
  );
  return {
    accessToken: token.access_token,
    idToken: token.id_token,
    tokenType: token.token_type,
    expiresIn: token.expires_in,
  };
}
