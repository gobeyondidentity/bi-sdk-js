import { Host, HostEvents, ImportEvent, ExportEvent } from "./host";
import { ConsoleLog, Log } from "../log";
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
import { HostMessage, CoreMessage } from "../messaging";
import { Configuration } from "../configuration";
import { Environment } from "../env";

/**
 * The WebHost is the live implementation of the Host interface.
 * It is responsible for dispatching messages from Core to the
 * Enclave, or DeviceQuery, or the UI.
 */
export class WebHost implements Host, HostEvents {
  logger: Log;

  onexport?: (this: Host, ev: ExportEvent) => void;
  onimport?: (this: Host, ev: ImportEvent) => void;

  queryFeatureFlag: (flag: string) => boolean;
  onSelectCredentialV1?: (
    credentials: CredentialV1[]
  ) => Promise<string | undefined>;

  get events(): HostEvents {
    return this;
  }

  constructor(config: Configuration) {
    // Install a default feature flag provider.
    this.queryFeatureFlag = (string) => {
      return false;
    };
    this.logger = config.log ? config.log : new ConsoleLog();
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
    this.logger.write(msg);
    return;
  }

  selectCredentialV1(credentials: CredentialV1[]): Promise<string | undefined> {
    if (this.onSelectCredentialV1) {
      return this.onSelectCredentialV1(credentials);
    }
    return Promise.resolve(credentials[0].id);
  }
}
