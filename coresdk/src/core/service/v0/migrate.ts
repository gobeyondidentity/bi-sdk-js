import { updateV0CredentialInfo } from "../util";
import { Host, hostCall, ExportEvent, ImportEvent } from "../../../host";
import { Types } from "../../../messaging";
import { Credential } from "../../../types";
import { kmc_cancel, kmc_export, kmc_import } from "kmc-ffi";

export async function export_(
  handle: string,
  onExport: (event: ExportEvent) => void,
  host: Host
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    host.events.onexport = (ev: ExportEvent) => {
      // We don't expect failed or cancelled events from the Host.
      if (ev.type == "started") {
        // Return the rendezvous token.
        resolve(<string>ev.data);
      }
      onExport(ev);
    };

    // Kick off the operation.
    // This promise resolves when the "started" event is
    // received. Any failures from export (including cancellation)
    // will reject the promise. The return value of export upon
    // success is ignored.

    try {
      await kmc_export(handle, (msg: string) => {
        return hostCall(host, msg);
      });
    } catch (err) {
      reject(err);
    } finally {
      host.events.onexport = undefined;
    }
  });
}

export async function import_(
  token: string,
  onImport: ((ev: ImportEvent) => void) | undefined,
  host: Host
): Promise<Credential | undefined> {
  host.events.onimport = onImport;
  try {
    let profile = await kmc_import(token, (msg: string) => {
      return hostCall(host, msg);
    });
    if (profile === undefined) return undefined;

    let credential = Types.credentialFromProfile(profile);
    await updateV0CredentialInfo(credential);
    return credential;
  } finally {
    host.events.onimport = undefined;
  }
}

export async function cancel() {
  await kmc_cancel();
}
