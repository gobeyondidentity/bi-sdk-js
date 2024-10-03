import { Host, hostCall } from "../../../host";
import { Types } from "../../../messaging";
import { UrlResponse } from "../../../types";
import { kmc_create_profile } from "kmc-ffi";
import { Credential } from "../../../types";

export async function createCredential(
  handle: string,
  name: string,
  imageUrl: string,
  loginUri: string | undefined,
  enrollUri: string | undefined,
  host: Host
): Promise<Credential> {
  // FIXME: kmc_create_profile does not return a VCredential. 
  let credential = await kmc_create_profile(
    handle,
    name,
    imageUrl,
    enrollUri,
    loginUri,
    undefined,
    undefined,
    undefined,
    undefined,
    (msg: string) => {
      return hostCall(host, msg);
    }
  );
  return credential;
}
