import { FeatureFlagRequest, FeatureFlagResponse, PathType, HostFilePath, PromptDetail, ClientEnvironment, CredentialV1 } from "../types";
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
    type: "started" | "manifestsReceived" | "requestsToSign" | "receivedSigned" | "failed" | "cancelled";
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
    onSelectCredentialV1?: (credentials: CredentialV1[]) => Promise<string | undefined>;
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
export declare function hostCall(host: Host, msg: string): string | Promise<string>;
