import { HostEvents, ImportEvent, ExportEvent } from "./hostEvents";
import { Configuration } from "../configuration";
import { FeatureFlagRequest, FeatureFlagResponse, PathType, HostFilePath, PromptDetail, ClientEnvironment } from "../types";
import { Log } from "../log";
/**
 * The host describes the system calling into KMC.
 * when KMC needs more data, it calls back out to the Host.
 * The host requires several services:
 * - the Device, to provide DeviceInfo to KMC,
 * - the Enclave, to provide cryptographic services for KMC
 * - a logger that KMC can send text to,
 */
export declare class Host implements HostEvents {
    logger?: Log;
    onexport?: (this: Host, ev: ExportEvent) => void;
    onimport?: (this: Host, ev: ImportEvent) => void;
    onSelectCredential?: (credentials: Credential[]) => Promise<string | undefined>;
    get events(): HostEvents;
    constructor(config: Configuration);
    checkFeatureFlags(feature_flags: FeatureFlagRequest[]): FeatureFlagResponse[];
    exportStarted(token: string): void;
    exportTokenTimeout(rendezvous_token: string): void;
    exportRequestReceived(requests: Map<string, Uint8Array>): void;
    getClientEnvironment(): ClientEnvironment;
    getDeviceGatewayUrl(): string;
    getFilePath(path_type: PathType): HostFilePath;
    importStarted(token: string): void;
    importManifestReceived(manifests: string): void;
    importRequestsToSign(requests: string): void;
    importReceivedSigned(signed: string): void;
    ask(profile_handle: string): boolean;
    authenticationPrompt(app_name: string, detail_list: PromptDetail[]): boolean;
    log(msg: string): void;
    selectCredential(credentials: Credential[]): Promise<string | undefined>;
}
