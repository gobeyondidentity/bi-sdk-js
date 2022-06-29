import { Host, HostEvents, ImportEvent, ExportEvent } from "./host";
import { Log } from "../log";
import { FeatureFlagRequest, FeatureFlagResponse, PathType, HostFilePath, PromptDetail, ClientEnvironment, CredentialV1 } from "../types";
import { Configuration } from "../configuration";
/**
 * The WebHost is the live implementation of the Host interface.
 * It is responsible for dispatching messages from Core to the
 * Enclave, or DeviceQuery, or the UI.
 */
export declare class WebHost implements Host, HostEvents {
    logger: Log;
    onexport?: (this: Host, ev: ExportEvent) => void;
    onimport?: (this: Host, ev: ImportEvent) => void;
    queryFeatureFlag: (flag: string) => boolean;
    onSelectCredentialV1?: (credentials: CredentialV1[]) => Promise<string | undefined>;
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
    selectCredentialV1(credentials: CredentialV1[]): Promise<string | undefined>;
}
