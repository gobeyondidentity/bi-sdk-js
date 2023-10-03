import { HostEvents, ImportEvent, ExportEvent } from "./hostEvents";
import { Configuration } from "../configuration";
import { Environment } from "../env";
import {
  FeatureFlagRequest,
  FeatureFlagResponse,
  PathType,
  HostFilePath,
  PromptDetail,
  ClientEnvironment,
  CredentialV1,
} from "../types";
import { Log } from "../log";

/**
 * The host describes the system calling into KMC.
 * when KMC needs more data, it calls back out to the Host.
 * The host requires several services:
 * - the Device, to provide DeviceInfo to KMC,
 * - the Enclave, to provide cryptographic services for KMC
 * - a logger that KMC can send text to,
 */
export class Host implements HostEvents {
  logger?: Log;

  onexport?: (this: Host, ev: ExportEvent) => void;
  onimport?: (this: Host, ev: ImportEvent) => void;

  onSelectCredentialV1?: (
    credentials: CredentialV1[]
  ) => Promise<string | undefined>;

  get events(): HostEvents {
    return this;
  }

  constructor(config: Configuration) {
    this.logger = config.log;
  }

  checkFeatureFlags(
    feature_flags: FeatureFlagRequest[]
  ): FeatureFlagResponse[] {
    return [];
  }

  exportStarted(token: string): void {
    if (this.onexport) this.onexport({ type: "started", data: token });
  }

  exportTokenTimeout(rendezvous_token: string): void {
    if (this.onexport)
      this.onexport({ type: "timeout", data: rendezvous_token });
  }

  exportRequestReceived(requests: Map<string, Uint8Array>): void {
    if (this.onexport)
      this.onexport({ type: "requestReceived", data: requests });
  }

  getClientEnvironment(): ClientEnvironment {
    // FIXME: update this description!

    // cryptoSource shall be set to "Host" so that Workforce flows
    // (register, import, export, oidcPublic, oidcConfidential, ...)
    // will only ever use the Host-based CryptoProvider and never the
    // HAL-based Crypto Provider; that is, HAL shall *only* be constructed
    // for PLG flows (bindCredential, authenticate).

    // The Host-based Crypto provider examines the value of
    // `window.localStorage.EnableWebauthn`:
    // * if "true", then the CryptoProvider will try to use WebAuthn for
    // key generation.
    // * otherwise, the CryptoProvider will use Subtle Crypto for key
    // generation.
    // `window.localStorage.EnableWebauthn` is undefined by default, and
    // can only be set manually per browser, effectively restricting
    // Workforce to use Subtle Crypto keys. This is consistent with
    // current Workforce deployments.

    // keyStorageStrategy shall be set to "TeeIfAvailable" so that HAL
    // will always try to use WebAuthn for key generation. As HAL is
    // only constructed for PLG flows, this value only affects the key
    // generation during PLG's bindCredential function.

    // HAL does not examine `window.localStorage.EnableWebauthn` to
    // determine key generation strategy.

    return {
      cryptoSource: "Host",
      keyStorageStrategy: "TeeIfAvailable",
      gdcUrl: Environment.deviceGatewayUrl + "/device",
    };
  }

  getDeviceGatewayUrl(): string {
    return Environment.deviceGatewayUrl;
  }

  getFilePath(path_type: PathType): HostFilePath {
    return {
      type: path_type,
      path: "",
    };
  }

  importStarted(token: string): void {
    if (this.onimport) {
      this.onimport({ type: "started", data: token });
    }
  }

  importManifestReceived(manifests: string): void {
    if (this.onimport) {
      this.onimport({ type: "manifestsReceived", data: manifests });
    }
  }

  importRequestsToSign(requests: string): void {
    if (this.onimport) {
      this.onimport({ type: "requestsToSign", data: requests });
    }
  }

  importReceivedSigned(signed: string): void {
    if (this.onimport) {
      this.onimport({ type: "receivedSigned", data: signed });
    }
  }

  ask(profile_handle: string): boolean {
    return true;
  }

  authenticationPrompt(app_name: string, detail_list: PromptDetail[]): boolean {
    return true;
  }

  log(msg: string): void {
    if (this.logger) this.logger.write(msg);
    return;
  }

  selectCredentialV1(credentials: CredentialV1[]): Promise<string | undefined> {
    if (this.onSelectCredentialV1) {
      return this.onSelectCredentialV1(credentials);
    }
    return Promise.resolve(credentials[0].id);
  }
}
