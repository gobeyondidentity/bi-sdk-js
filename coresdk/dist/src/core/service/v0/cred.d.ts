import { Host } from "../../../host";
import { UrlResponse } from "../../../types";
import { Credential } from "../../../types";
export declare function createCredential(handle: string, name: string, imageUrl: string, loginUri: string | undefined, enrollUri: string | undefined, host: Host): Promise<Credential>;
export declare function register(url: string, host: Host): Promise<UrlResponse>;
export declare function getCredentials(host: Host): Promise<Credential[]>;
export declare function deleteCredential(handle: string, host: Host): Promise<void>;
