import { PromptDetail, FeatureFlagRequest, PathType, CoreCredentialV1 } from "./types";
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
export declare type AskRequest = {
    Ask: string;
};
export declare type AuthenticationPromptRequest = {
    AuthenticationPrompt: {
        appName: string;
        detailList: PromptDetail[];
    };
};
export declare type CheckFeatureFlagsRequest = {
    CheckFeatureFlags: FeatureFlagRequest[];
};
export declare type ExportRequestReceivedRequest = {
    ExportRequestReceived: Map<string, Uint8Array>;
};
export declare type ExportStartedRequest = {
    ExportStarted: string;
};
export declare type ExportTokenTimeoutRequest = {
    ExportTokenTimeout: string;
};
export declare type GetDeviceGatewayUrlRequest = {
    GetDeviceGatewayUrl: undefined;
};
export declare type GetDeviceInfoRequest = {
    GetDeviceInfo: undefined;
};
export declare type GetFilePathRequest = {
    GetFilePath: PathType;
};
export declare type ImportManifestReceivedRequest = {
    ImportManifestReceived: string;
};
export declare type ImportReceivedSignedRequest = {
    ImportReceivedSigned: string;
};
export declare type ImportRequestsToSignRequest = {
    ImportRequestsToSign: string;
};
export declare type ImportStartedRequest = {
    ImportStarted: string;
};
export declare type LogRequest = {
    Log: string;
};
export declare type SelectAuthNCredentialRequest = {
    SelectAuthNCredential: CoreCredentialV1[];
};
export declare type HostRequest = AskRequest | AuthenticationPromptRequest | CheckFeatureFlagsRequest | ExportRequestReceivedRequest | ExportStartedRequest | ExportTokenTimeoutRequest | GetDeviceGatewayUrlRequest | GetDeviceInfoRequest | GetFilePathRequest | ImportManifestReceivedRequest | ImportReceivedSignedRequest | ImportRequestsToSignRequest | ImportStartedRequest | LogRequest | SelectAuthNCredentialRequest;
