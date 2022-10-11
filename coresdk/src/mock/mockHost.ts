import { Configuration } from "../configuration";
import { Host, HostEvents, ImportEvent, ExportEvent } from "../host/host";
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
import { HostData } from "./mockConfig";
import { get } from "./mockData";

export class MockHost implements Host, HostEvents {
  mock: HostData;

  // Note: these are assignable, but never called.
  onexport?: (this: Host, ev: ExportEvent) => void;
  onimport?: (this: Host, ev: ImportEvent) => void;
  onSelectCredentialV1?: (
    credentials: CredentialV1[]
  ) => Promise<string | undefined>;

  get events(): HostEvents {
    return this;
  }

  constructor(config: Configuration) {
    this.mock = config.mock ? <HostData>config.mock.host : {};
  }

  checkFeatureFlags(
    feature_flags: FeatureFlagRequest[]
  ): FeatureFlagResponse[] {
    if (this.mock.checkFeatureFlags) return get(this.mock.checkFeatureFlags);

    throw new Error("unimplemented");
  }

  getClientEnvironment(): ClientEnvironment {
    return {
      cryptoSource: "Hal",
      keyStorageStrategy: "ForceSoftware",
    };
  }
  exportStarted(rendezvous_token: string): void {
    if (this.mock.exportStarted) return get(this.mock.exportStarted);
  }

  exportTokenTimeout(rendezvous_token: string): void {
    if (this.mock.exportTokenTimeout) return get(this.mock.exportTokenTimeout);
  }

  exportRequestReceived(requests: Map<string, Uint8Array>): void {
    if (this.mock.exportRequestReceived)
      return get(this.mock.exportRequestReceived);
  }

  getDeviceGatewayUrl(): string {
    if (this.mock.getDeviceGatewayUrl)
      return get(this.mock.getDeviceGatewayUrl);

    throw new Error("unimplemented");
  }

  getFilePath(path_type: PathType): HostFilePath {
    if (this.mock.getFilePath) return get(this.mock.getFilePath);

    throw new Error("unimplemented");
  }

  importStarted(token: string): void {
    if (this.mock.importStarted) return get(this.mock.importStarted);
  }

  importManifestReceived(manifests: string): void {
    if (this.mock.importManifestReceived)
      return get(this.mock.importManifestReceived);
  }

  importRequestsToSign(requests: string): void {
    if (this.mock.importRequestsToSign)
      return get(this.mock.importRequestsToSign);
  }

  importReceivedSigned(signed: string): void {
    if (this.mock.importReceivedSigned)
      return get(this.mock.importReceivedSigned);
  }

  ask(profile_handle: string): boolean {
    if (this.mock.ask) return get(this.mock.ask);

    throw new Error("unimplemented");
  }

  authenticationPrompt(app_name: string, detail_list: PromptDetail[]): boolean {
    if (this.mock.authenticationPrompt)
      return get(this.mock.authenticationPrompt);

    throw new Error("unimplemented");
  }

  log(msg: string): void {
    console.log(msg);
  }

  selectCredentialV1(credentials: CredentialV1[]): Promise<string | undefined> {
    if (this.onSelectCredentialV1) {
      return this.onSelectCredentialV1(credentials);
    }
    return Promise.resolve(credentials[0].id);
  }
}
