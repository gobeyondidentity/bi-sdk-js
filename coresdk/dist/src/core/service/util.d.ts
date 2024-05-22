import { BrowserInfo } from "../../types";
import { Types } from "../../messaging";
export declare function getAppInstanceId(): Promise<string>;
export declare function getBrowserInfo(): Promise<BrowserInfo>;
export declare function getServiceUrlType(url: string): Types.UrlType;
