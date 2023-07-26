import { BrowserInfo, Credential, KeyType } from "../../types";
import {
  kmc_get_app_instance_id,
  kmc_get_user_agent,
  kmc_get_key_type,
} from "kmc-ffi";

export async function getAppInstanceId(): Promise<string> {
  let halVersion = "H";
  return (await kmc_get_app_instance_id()) + `[${halVersion}]`;
}

export async function getBrowserInfo(): Promise<BrowserInfo> {
  return await kmc_get_user_agent();
}

/** Returns the type of key, webauthn or subtle. */
export async function getKeyType(keyHandle: string): Promise<KeyType> {
  let rsp = await kmc_get_key_type(keyHandle);
  return <KeyType>rsp;
}

/** Updates a V0 credential with key type and integrity errors (if they exist). */
export async function updateV0CredentialInfo(cred: Credential) {
  try {
    cred.keyType = await getKeyType(cred.keyHandle);
  } catch (err) {
    // Update the integrity failure map as needed.
    if (cred.integrityFailures === undefined) {
      cred.integrityFailures = {};
    }
    cred.integrityFailures["keyType"] = {
      KeyType: err instanceof Error ? err.message : JSON.stringify(err),
    };
  }
}
