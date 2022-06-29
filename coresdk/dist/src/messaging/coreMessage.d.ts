import * as Messaging from "./types";
import { ClientEnvironment } from "../types";
/**
 * Core Messages
 * -------------
 * These messages are passed into Kmc as a response to a Host call.
 *
 * Bytes(Vec<u8>),
 * DeviceGatewayUrl(String),
 * DeviceInfo(String), // Base64 encoded proto
 * Bool(bool),
 * FeatureFlags(Vec<FeatureFlagResponse>),
 * FilePath(HostFilePath),
 * Unit,
 * Pending,
 */
export declare type BoolResponse = {
    Bool: boolean;
};
export declare type BytesResponse = {
    Bytes: number[];
};
export declare type DeviceGatewayUrlResponse = {
    DeviceGatewayUrl: string;
};
export declare type DeviceInfoResponse = {
    DeviceInfo: string;
};
export declare type FeatureFlagsResponse = {
    FeatureFlags: Messaging.FeatureFlagResponse[];
};
export declare type FilePathResponse = {
    FilePath: Messaging.HostFilePath;
};
export declare type ClientEnvironmentResponse = {
    ClientEnvironment: Messaging.ClientEnvironment;
};
export declare type PendingResponse = {
    Pending: string;
};
export declare type AuthNCredentialIdResponse = {
    SelectedAuthNCredentialId: string | undefined;
};
export declare type CoreResponse = BytesResponse | DeviceGatewayUrlResponse | DeviceInfoResponse | FeatureFlagsResponse | FilePathResponse | ClientEnvironmentResponse | AuthNCredentialIdResponse | BoolResponse | "Unit";
export declare type CoreResult = {
    Ok: CoreResponse;
} | {
    Err: string;
};
export declare function ok(rsp?: CoreResponse): CoreResult;
export declare function error(err: any): CoreResult;
export declare function featureFlagResponse(flags: Messaging.FeatureFlagResponse[]): CoreResult;
export declare function deviceGatewayUrl(url: string): CoreResult;
export declare function clientEnvironment(clientEnvironment: ClientEnvironment): CoreResult;
export declare function deviceInfo(info: string): CoreResult;
export declare function filePath(path: Messaging.HostFilePath): CoreResult;
export declare function bool(value: boolean): CoreResult;
export declare function bytes(data: Uint8Array): CoreResult;
export declare function selectedAuthNCredential(id?: string): CoreResult;
