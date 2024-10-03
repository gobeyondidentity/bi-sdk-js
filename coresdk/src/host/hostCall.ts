import { Host } from "./host";
import {
  HostMessage,
  CoreMessage,
  writeResponse,
  readRequest,
} from "../messaging";
import { makeError } from "../util/error";

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
      }else if ("CredentialStateChanged" == rq) {
        return CoreMessage.ok();
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
          .selectCredential(rq.SelectAuthNCredential)
          .then((id) => CoreMessage.selectedAuthNCredential(id));
      }
    }
  } catch (err) {
    return CoreMessage.error(err);
  }

  return CoreMessage.error("Not implemented");
}
