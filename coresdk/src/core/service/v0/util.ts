import { Pkce } from "../../../types";
import { kmc_create_pkce } from "kmc-ffi";

export async function createPkce(): Promise<Pkce> {
  let pkce = await kmc_create_pkce();
  return {
    codeVerifier: pkce.code_verifier,
    codeChallenge: {
      challenge: pkce.code_challenge.challenge,
      method: pkce.code_challenge.method,
    },
  };
}

