import { Configuration } from "../configuration";
import { Host, HostEvents, ImportEvent, ExportEvent } from "../host/host";
import { FeatureFlagRequest, FeatureFlagResponse, PathType, HostFilePath, PromptDetail, ClientEnvironment, CredentialV1 } from "../types";
import { HostData } from "./mockConfig";
export declare class MockHost implements Host, HostEvents {
    mock: HostData;
    onexport?: (this: Host, ev: ExportEvent) => void;
    onimport?: (this: Host, ev: ImportEvent) => void;
    onSelectCredentialV1?: (credentials: CredentialV1[]) => Promise<string | undefined>;
    queryFeatureFlag: (flag: string) => boolean;
    get events(): HostEvents;
    constructor(config: Configuration);
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
}
