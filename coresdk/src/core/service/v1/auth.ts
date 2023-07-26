import { Host, hostCall } from "../../../host";
import { Types } from "../../../messaging";
import {
  CoreAuthenticationRequestContext,
  toAuthContext,
} from "../../../messaging/types";
import {
  BiAuthenticateResponse,
  CredentialDescriptor,
  AuthenticationContext,
} from "../../../types";
import { kmc_handle_url, kmc_get_auth_context } from "kmc-ffi";

export async function getAuthenticationContext(
  url: string,
  host: Host
): Promise<AuthenticationContext> {
  let context = await kmc_get_auth_context(url, undefined, (msg: string) => {
    return hostCall(host, msg);
  });

  return toAuthContext(<CoreAuthenticationRequestContext>context);
}

/**
 *
 * @param url Authentication URL. For example auth-us.beyondidentity.com.
 * @param credDesc A structure describing the credential to authenticate,
 * or a credential selection callback
 * @param host The Host callbacks.
 * @returns
 */
export async function authenticate(
  url: string,
  credDesc: CredentialDescriptor,
  host: Host
): Promise<BiAuthenticateResponse> {
  let descriptor: any = undefined;
  if (`credentialSelect` in credDesc) {
    // Register the callback with the host and _do not_ provide any
    // credential descriptor to kmc_handle_url.
    host.events.onSelectCredentialV1 = credDesc.credentialSelect;
  } else {
    // By providing a CredentialDescriptor, kmc_handle_url will
    // not invoke a credential selection callback.
    descriptor = credDesc;
  }

  try {
    const rsp = await kmc_handle_url(
      url,
      descriptor,
      undefined,
      "EmbeddedSource",
      (msg: string) => {
        return hostCall(host, msg);
      }
    );

    let urlResponse = Types.toUrlResponse(rsp);
    switch (urlResponse.type) {
      case "biAuthenticate": {
        return urlResponse.biAuthenticate;
      }
      default: {
        return Promise.reject(new Error("Invalid response type"));
      }
    }
  } finally {
    // reset select credential callback
    host.events.onSelectCredentialV1 = undefined;
  }
}

