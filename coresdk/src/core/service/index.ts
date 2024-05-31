import { Host, hostCall } from "../../host";
import {
  kmc_handle_url,
  kmc_delete_credential,
  kmc_delete_profile,
  kmc_list_credentials,
  kmc_get_auth_context,
} from "kmc-ffi";
import {
  BindResponse,
  Credential,
  CredentialDescriptor,
  AuthenticationContext,
  AuthenticateResponse,
} from "../../types";
import {
  toUrlResponse,
  toAuthContext,
  CoreAuthenticationRequestContext,
} from "../../messaging/types";

export { initialize } from "./initialize";
export { getAppInstanceId, getBrowserInfo, getServiceUrlType } from "./util";
export * as v0 from "./v0";

export async function bindCredential(
  url: string,
  host: Host
): Promise<BindResponse> {
  let rsp = await kmc_handle_url(
    url,
    undefined,
    undefined,
    "EmbeddedSource",
    (msg: string) => {
      return hostCall(host, msg);
    }
  );
  const response = toUrlResponse(rsp);
  if (response.type === "bind") {
    return response.bind;
  } else {
    throw new Error("Invalid response");
  }
}

export async function deleteCredential(id: string, host: Host): Promise<void> {
  // Since we only have an id & no concept of "version-ness", we need to find the
  // offending cred in either db.
  let cred = (await getCredentials(host)).find((cred) => cred.id === id);
  if (cred) {
    if (cred.version == "v0") {
      await kmc_delete_profile(cred.tenant.id, (msg: string) => {
        return hostCall(host, msg);
      });
    } else if (cred.version == "v1") {
      await kmc_delete_credential(id, (msg: string) => {
        return hostCall(host, msg);
      });
    }
  }
}

export async function getCredentials(host: Host): Promise<Credential[]> {
  return await kmc_list_credentials((msg: string) => {
    return hostCall(host, msg);
  });
}

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
): Promise<AuthenticateResponse> {
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

    const response = toUrlResponse(rsp);
    if (response.type === "authenticate") {
      return response.authenticate;
    } else {
      throw new Error("Invalid response");
    }
  } finally {
    // reset select credential callback
    host.events.onSelectCredentialV1 = undefined;
  }
}
