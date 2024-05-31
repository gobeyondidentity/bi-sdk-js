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
export type BoolResponse = {
    Bool: boolean;
};
export type BytesResponse = {
    Bytes: number[];
};
export type DeviceGatewayUrlResponse = {
    DeviceGatewayUrl: string;
};
export type DeviceInfoResponse = {
    DeviceInfo: string;
};
export type FeatureFlagsResponse = {
    FeatureFlags: Messaging.FeatureFlagResponse[];
};
export type FilePathResponse = {
    FilePath: Messaging.HostFilePath;
};
export type ClientEnvironmentResponse = {
    ClientEnvironment: Messaging.ClientEnvironment;
};
export type PendingResponse = {
    Pending: string;
};
export type AuthNCredentialIdResponse = {
    SelectedAuthNCredentialId: string | undefined;
};
export type CoreResponse = BytesResponse | DeviceGatewayUrlResponse | DeviceInfoResponse | FeatureFlagsResponse | FilePathResponse | ClientEnvironmentResponse | AuthNCredentialIdResponse | BoolResponse | "Unit";
export type CoreResult = {
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
