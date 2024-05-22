import { BrowserInfo, Credential, KeyType } from "../../types";
import { Types } from "../../messaging";
import {
  kmc_get_app_instance_id,
  kmc_get_user_agent,
  kmc_url_type,
} from "kmc-ffi";

export async function getAppInstanceId(): Promise<string> {
  let halVersion = "H";
  return (await kmc_get_app_instance_id()) + `[${halVersion}]`;
}

export async function getBrowserInfo(): Promise<BrowserInfo> {
  return await kmc_get_user_agent();
}

export function getServiceUrlType(url: string): Types.UrlType {
  const rawUrlType = kmc_url_type(url);
  return Types.toUrlType(rawUrlType);
}
