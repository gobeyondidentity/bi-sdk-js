import { BrowserInfo, Credential, KeyType } from "../../types";
export declare function getAppInstanceId(): Promise<string>;
export declare function getBrowserInfo(): Promise<BrowserInfo>;
/** Returns the type of key, webauthn or subtle. */
export declare function getKeyType(keyHandle: string): Promise<KeyType>;
/** Updates a V0 credential with key type and integrity errors (if they exist). */
export declare function updateV0CredentialInfo(cred: Credential): Promise<void>;
