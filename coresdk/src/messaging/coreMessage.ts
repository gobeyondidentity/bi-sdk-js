import * as Messaging from "./types";
import { ClientEnvironment } from "../types";

function makeError(err: any) {
  if (typeof err === "string") return new Error(err);
  else if ("message" in err) return <Error>err;
  else return new Error(err);
}

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
  DeviceInfo: string; // Base64 encoded proto
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

export type CoreResponse =
  | BytesResponse
  | DeviceGatewayUrlResponse
  | DeviceInfoResponse
  | FeatureFlagsResponse
  | FilePathResponse
  | ClientEnvironmentResponse
  | AuthNCredentialIdResponse
  | BoolResponse
  | "Unit";

export type CoreResult = { Ok: CoreResponse } | { Err: string };

export function ok(rsp?: CoreResponse): CoreResult {
  return { Ok: rsp ? rsp : "Unit" };
}

export function error(err: any): CoreResult {
  return { Err: makeError(err).message };
}

export function featureFlagResponse(
  flags: Messaging.FeatureFlagResponse[]
): CoreResult {
  return ok({ FeatureFlags: flags });
}

export function deviceGatewayUrl(url: string): CoreResult {
  return ok({ DeviceGatewayUrl: url });
}

export function clientEnvironment(
  clientEnvironment: ClientEnvironment
): CoreResult {
  return ok({
    ClientEnvironment: {
      crypto_source: clientEnvironment.cryptoSource,
      key_storage_strategy: clientEnvironment.keyStorageStrategy,
      gdc_url: clientEnvironment.gdcUrl,
      keymaker_allowed_domains: clientEnvironment.keymakerAllowedDomains,
    },
  });
}

export function deviceInfo(info: string): CoreResult {
  return ok({ DeviceInfo: info });
}

export function filePath(path: Messaging.HostFilePath): CoreResult {
  return ok({ FilePath: path });
}

export function bool(value: boolean): CoreResult {
  return ok({ Bool: value });
}

export function bytes(data: Uint8Array): CoreResult {
  return ok({ Bytes: Array.from(data) });
}

export function selectedAuthNCredential(id?: string) {
  return ok({ SelectedAuthNCredentialId: id });
}
