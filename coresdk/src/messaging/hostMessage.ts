import {
  RegistrationStatus,
  PromptDetail,
  FeatureFlagRequest,
  PathType,
  Profile,
  Pkce,
  CoreCredentialV1,
} from "./types";

/**
 * Host Messages
 * -------------
 * These messages are passed from Kmc to the Host, sometimes
 * as callback, sometimes as the result of a Core Request.
 * Host Responses are not wrapped in "Ok"/"Err" wrappers like
 * Core responses.
 *
 * Host Requests
 * -------------
 *
 * Ask(string),
 * AuthenticationPrompt {
 *     app_name: string,
 *     detail_list: Vec<PromptDetail>,
 * },
 * CheckFeatureFlags(Vec<FeatureFlagRequest>),
 * CreateUser(CreateUserResponse),
 * RecoverUser(RecoverUserResponse),
 * CreatePkce(Pkce),
 * Decrypt(string, Vec<u8>),
 * DeleteCerts(Vec<string>),
 * DeleteKeystring,
 * EmbeddedConfidentialOidc(EmbeddedConfidentialOidcResponse),
 * EmbeddedPublicOidc(EmbeddedPublicOidcResponse),
 * Encrypt(string, Vec<u8>),
 * ExportRequestReceived(HashMap<string, Vec<u8>>),
 * ExportStartedstring,
 * ExportTokenTimeoutstring,
 * GetCertstring,
 * GetDeviceGatewayUrl,
 * GetDeviceInfo,
 * GetFilePath(PathType),
 * ImportManifestReceivedstring, // TODO: take manifest type
 * ImportReceivedSignedstring,   // TODO: take signed requests
 * ImportRequestsToSignstring,   // TODO: take hashmap
 * ImportStartedstring,
 * Logstring,
 * NewKeystring,
 * PublicKeystring,
 * PutCert(Vec<u8>),
 * Sign(string, Vec<u8>),
 * UrlResponse(HandleUrlResponse),
 *
 * Host Responses
 * --------------
 * ConnectivityState(ConnectivityState),
 * CheckRetireResponse(grpc::retire::CheckRetireResponse),
 * Profile(Profile),
 * Profiles(Vec<Profile>),
 * Unit,
 * Bool(bool),
 *
 */

export type AskRequest = {
  Ask: string;
};

export type AuthenticationPromptRequest = {
  AuthenticationPrompt: {
    appName: string;
    detailList: PromptDetail[];
  };
};

export type CheckFeatureFlagsRequest = {
  CheckFeatureFlags: FeatureFlagRequest[];
};

// FIXME: should be number[]
export type ExportRequestReceivedRequest = {
  ExportRequestReceived: Map<string, Uint8Array>;
};

export type ExportStartedRequest = {
  ExportStarted: string;
};

export type ExportTokenTimeoutRequest = {
  ExportTokenTimeout: string;
};

export type GetDeviceGatewayUrlRequest = {
  GetDeviceGatewayUrl: undefined;
};

export type GetDeviceInfoRequest = {
  GetDeviceInfo: undefined;
};

export type GetFilePathRequest = {
  GetFilePath: PathType;
};

export type ImportManifestReceivedRequest = {
  ImportManifestReceived: string;
};

export type ImportReceivedSignedRequest = {
  ImportReceivedSigned: string;
};

export type ImportRequestsToSignRequest = {
  ImportRequestsToSign: string;
};

export type ImportStartedRequest = {
  ImportStarted: string;
};

export type LogRequest = {
  Log: string;
};

export type SelectAuthNCredentialRequest = {
  SelectAuthNCredential: CoreCredentialV1[];
};

export type HostRequest =
  | AskRequest
  | AuthenticationPromptRequest
  | CheckFeatureFlagsRequest
  | ExportRequestReceivedRequest
  | ExportStartedRequest
  | ExportTokenTimeoutRequest
  | GetDeviceGatewayUrlRequest
  | GetDeviceInfoRequest
  | GetFilePathRequest
  | ImportManifestReceivedRequest
  | ImportReceivedSignedRequest
  | ImportRequestsToSignRequest
  | ImportStartedRequest
  | LogRequest
  | SelectAuthNCredentialRequest;
