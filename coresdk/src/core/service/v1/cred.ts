import { getKeyType } from "../util";
import { BindCredentialV1Result, CredentialV1, KeyType } from "../../../types";
import {
  kmc_handle_url,
  kmc_delete_credential,
  kmc_get_key_type,
  kmc_list_credentials,
} from "kmc-ffi";
import { Host, hostCall } from "../../../host";
import { Types } from "../../../messaging";

/**
 * Binds a credential to the current browser.
 * @param url
 * @param host
 * @returns
 */
export async function bindCredential(
  url: string,
  host: Host
): Promise<BindCredentialV1Result> {
  const rsp = await kmc_handle_url(
    url,
    undefined,
    undefined,
    "EmbeddedSource", 
    (msg: string) => {
      return hostCall(host, msg);
    }
  );

  const urlResponse = Types.toUrlResponse(rsp);
  switch (urlResponse.type) {
    case "bindCredential": {
      return urlResponse.bindCredential;
    }
    default: {
      return Promise.reject(new Error("Invalid response type"));
    }
  }
}

export async function getCredentials(host: Host): Promise<CredentialV1[]> {
  let creds = <Types.CoreCredentialV1[]>(
    await kmc_list_credentials((msg: string) => {
      return hostCall(host, msg);
    })
  );
  let credentials = creds.map((cred) => Types.credentialV1FromCredential(cred));
  for (let credential of credentials) {
    credential.keyType = await getKeyType(credential.keyHandle);
  }
  return credentials;
}

/**
 *
 * @param id
 * @param host
 */
export async function deleteCredential(id: string, host: Host): Promise<void> {
  await kmc_delete_credential(id, (msg: string) => {
    return hostCall(host, msg);
  });
}
