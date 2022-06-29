import {
  KeyHandle,
  CertHandle,
  FeatureFlagRequest,
  FeatureFlagResponse,
  PathType,
  HostFilePath,
  PromptDetail,
  ClientEnvironment,
  CredentialV1,
} from "../types";
import {
  HostMessage,
  CoreMessage,
  writeResponse,
  readRequest,
} from "../messaging";
import { makeError } from "../util/error";
import { credentialV1FromCredential } from "../messaging/types";
import { CoreResponse } from "../messaging/coreMessage";

/**
 * The host describes the system calling into KMC.
 * when KMC needs more data, it calls back out to the Host.
 * The host requires several services:
 * - the Device, to provide DeviceInfo to KMC,
 * - the Enclave, to provide cryptographic services for KMC
 * - a logger that KMC can send text to,
 * - and many more! (or not...)
 *
 */
export interface Host {
  // Mechanism by which async host calls are invoked and then polled
  // for completion.
  readonly events: HostEvents;

  checkFeatureFlags(feature_flags: FeatureFlagRequest[]): FeatureFlagResponse[];
  getClientEnvironment(): ClientEnvironment;
  exportStarted(rendezvous_token: string): void;
  exportTokenTimeout(rendezvous_token: string): void;
  exportRequestReceived(requests: Map<string, Uint8Array>): void;
  getDeviceGatewayUrl(): string;
  getFilePath(path_type: PathType): HostFilePath;
  importStarted(token: string): void;
  importManifestReceived(manifests: string): void;
  importRequestsToSign(requests: string): void;
  importReceivedSigned(signed: string): void;
  ask(profile_handle: string): boolean;
  authenticationPrompt(app_name: string, detail_list: PromptDetail[]): boolean;
  log(msg: string): void;
  selectCredentialV1(credentials: CredentialV1[]): Promise<string | undefined>;

  queryFeatureFlag: (flag: string) => boolean;
}

export interface ExportEvent {
  type: "started" | "timeout" | "requestReceived" | "failed" | "cancelled";
  data: string | Map<string, Uint8Array> | Error | undefined;
}

export interface ImportEvent {
  type:
    | "started"
    | "manifestsReceived"
    | "requestsToSign"
    | "receivedSigned"
    | "failed"
    | "cancelled";
  data: string | Map<string, Uint8Array> | Error | undefined;
}

/**
 * Host events provide a mechanism to notify the UI about
 * certain events that require interaction, or just an
 * updated screen.
 */
export interface HostEvents {
  onexport?: (this: Host, ev: ExportEvent) => void;
  onimport?: (this: Host, ev: ImportEvent) => void;
  onSelectCredentialV1?: (
    credentials: CredentialV1[]
  ) => Promise<string | undefined>;
}

/**
 * Dispatches the HostRequest to a Host function. host function is
 * only ever called from Kmc, so we can assume that host will be
 * the WebHost (aka us).
 *
 * Note that this function is not asynchronous. If a Host receives
 * a request that begins an asynchronous operation (like `newKey`) then
 * the host will return a `Pending(token)` primitive to Core.
 * Core will then continually poll for the result until the async
 * operation completes successfully or fails. (see `AsyncDispatch`.)
 *
 * @param host The host that will respond to the request.
 * @param msg The JSON request received from KMC
 * @returns A JSON serialized CoreResult
 */
export function hostCall(host: Host, msg: string): string | Promise<string> {
  let rsp: string | Promise<string>;
  try {
    let rq = readRequest(msg);
    let result = dispatch(host, rq);
    if (typeof (<any>result).then === "function") {
      rsp = (<Promise<CoreMessage.CoreResult>>result).then((result) =>
        writeResponse(result)
      );
    } else {
      rsp = writeResponse(<CoreMessage.CoreResult>result);
    }
  } catch (err) {
    // Hand-crafted Error indication (JSON.stringify may throw)
    rsp = `{Err:${makeError(err).message}}`;
  }
  return rsp;
}

/**
 * Unpacks the hostRequest and calls the appropriate handler.
 * Only called from hostCall, which manages exception handling,
 * so implementors need not worry about catching exceptions here.
 *
 * Note that the MockDispatch can make calls directly to the
 * handlers & does not need to call `dispatch`.
 *
 * TODO: make a host dispatch table.
 * @param rq
 */
function dispatch(
  host: Host,
  rq: HostMessage.HostRequest
): CoreMessage.CoreResult | Promise<CoreMessage.CoreResult> {
  try {
    if (typeof rq === "string") {
      if (rq == "GetDeviceGatewayUrl") {
        return CoreMessage.deviceGatewayUrl(host.getDeviceGatewayUrl());
      } else if (rq == "ClientEnvironment") {
        return CoreMessage.clientEnvironment(host.getClientEnvironment());
      }
    } else {
      if ("Ask" in rq) {
        return CoreMessage.bool(host.ask(rq.Ask));
      } else if ("AuthenticationPrompt" in rq) {
        return CoreMessage.bool(
          host.authenticationPrompt(
            rq.AuthenticationPrompt.appName,
            rq.AuthenticationPrompt.detailList
          )
        );
      } else if ("CheckFeatureFlags" in rq) {
        return CoreMessage.featureFlagResponse(
          host.checkFeatureFlags(rq.CheckFeatureFlags)
        );
      } else if ("ExportRequestReceived" in rq) {
        host.exportRequestReceived(rq.ExportRequestReceived);
        return CoreMessage.ok();
      } else if ("ExportStarted" in rq) {
        host.exportStarted(rq.ExportStarted);
        return CoreMessage.ok();
      } else if ("ExportTokenTimeout" in rq) {
        host.exportTokenTimeout(rq.ExportTokenTimeout);
        return CoreMessage.ok();
      } else if ("GetFilePath" in rq) {
        let path = host.getFilePath(rq.GetFilePath);
        return CoreMessage.filePath({
          path_type: path.type,
          path: path.path,
        });
      } else if ("ImportManifestReceived" in rq) {
        host.importManifestReceived(rq.ImportManifestReceived);
        return CoreMessage.ok();
      } else if ("ImportReceivedSigned" in rq) {
        host.importReceivedSigned(rq.ImportReceivedSigned);
        return CoreMessage.ok();
      } else if ("ImportRequestsToSign" in rq) {
        host.importRequestsToSign(rq.ImportRequestsToSign);
        return CoreMessage.ok();
      } else if ("ImportStarted" in rq) {
        host.importStarted(rq.ImportStarted);
        return CoreMessage.ok();
      } else if ("Log" in rq) {
        host.log(rq.Log);
        return CoreMessage.ok();
      } else if ("SelectAuthNCredential" in rq) {
        return host
          .selectCredentialV1(
            rq.SelectAuthNCredential.map((cred) =>
              credentialV1FromCredential(cred)
            )
          )
          .then((id) => CoreMessage.selectedAuthNCredential(id));
      }
    }
  } catch (err) {
    return CoreMessage.error(err);
  }

  return CoreMessage.error("Not implemented");
}
