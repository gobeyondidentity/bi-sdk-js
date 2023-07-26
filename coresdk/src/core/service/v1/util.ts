import { Types } from "../../../messaging";
import { kmc_url_type } from "kmc-ffi";

export function getUrlType(url: string): Types.UrlType {
  const rawUrlType = kmc_url_type(url);
  return Types.toUrlType(rawUrlType);
}
