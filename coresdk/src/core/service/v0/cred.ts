import { updateV0CredentialInfo } from "../util";
import { Host, hostCall } from "../../../host";
import { Types } from "../../../messaging";
import { UrlResponse } from "../../../types";
import {
  kmc_all_credentials,
  kmc_create_profile,
  kmc_delete_profile,
  kmc_handle_url,
} from "kmc-ffi";
import { Credential } from "../../../types";

export async function createCredential(
  handle: string,
  name: string,
  imageUrl: string,
  loginUri: string | undefined,
  enrollUri: string | undefined,
  host: Host
): Promise<Credential> {
  let profile = await kmc_create_profile(
    handle,
    name,
    imageUrl,
    enrollUri,
    loginUri,
    undefined,
    undefined,
    undefined,
    (msg: string) => {
      return hostCall(host, msg);
    }
  );
  let credential = Types.credentialFromProfile(profile);
  await updateV0CredentialInfo(credential);
  return credential;
}

export async function register(
  url: string,
  host: Host
): Promise<UrlResponse> {
  let rsp = await kmc_handle_url(
    url,
    undefined,
    undefined,
    "EmbeddedSource",
    (msg: string) => {
      return hostCall(host, msg);
    }
  );
  return Types.toUrlResponse(rsp);
}

export async function getCredentials(host: Host): Promise<Credential[]> {
  // Retrieve the credentials from the database.
  let creds = <Types.CoreCredential[]>(
    await kmc_all_credentials((msg: string) => {
      return hostCall(host, msg);
    })
  );
  // Convert the raw credentials into a more friendly type.
  let credentials = creds.map((cred) => Types.credentialFromCore(cred));
  // Supply the key type for each credential.
  for (let cred of credentials) {
    await updateV0CredentialInfo(cred);
  }
  return credentials;
}

export async function deleteCredential(
  handle: string,
  host: Host
): Promise<void> {
  await kmc_delete_profile(handle, (msg: string) => {
    return hostCall(host, msg);
  });
}
