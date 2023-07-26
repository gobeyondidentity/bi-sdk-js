import { Host } from "./host";
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
export declare function hostCall(host: Host, msg: string): string | Promise<string>;
