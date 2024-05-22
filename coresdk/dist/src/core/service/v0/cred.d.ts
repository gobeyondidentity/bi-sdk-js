import { Host } from "../../../host";
import { Credential } from "../../../types";
export declare function createCredential(handle: string, name: string, imageUrl: string, loginUri: string | undefined, enrollUri: string | undefined, host: Host): Promise<Credential>;
