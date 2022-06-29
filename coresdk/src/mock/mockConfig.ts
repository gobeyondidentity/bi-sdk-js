
import { Void, AsyncVoid, Data, AsyncData } from "./mockData";
import { HostMessage } from "../messaging";
import {
    Pkce, Credential, AuthorizationCode, FeatureFlagResponse,
    HostFilePath, UrlResponse, TokenResponse, CheckRetireResponse, BindCredentialV1Result, CredentialV1
} from "../types";
import { CoreDispatch } from "../coreDispatch";
import { Host } from "../host";

export interface MockConfiguration {
    dispatch?: DispatchData | (() => CoreDispatch);
    host?: HostData | (() => Host);
}

export interface DispatchData {
    bindCredential?: AsyncData<BindCredentialV1Result>;
    cancel?: AsyncVoid;
    checkRetirement?: AsyncData<CheckRetireResponse>;
    crashTest?: AsyncVoid;
    createPkce?: AsyncData<Pkce>;
    createCredential?: AsyncData<Credential>;
    deleteCredential?: AsyncVoid;
    authenticate?: AsyncData<UrlResponse>;
    authenticateConfidential?: AsyncData<AuthorizationCode>;
    authenticatePublic?: AsyncData<TokenResponse>;
    export?: AsyncVoid;
    getCredentials?: AsyncData<Credential[]>;
    handleURL?: AsyncData<UrlResponse>;
    listCredentials?: AsyncData<CredentialV1[]>;
    import?: AsyncData<Credential | undefined>;
    register?: AsyncData<UrlResponse>;
}

export interface HostData {
    checkFeatureFlags?: Data<FeatureFlagResponse[]>;
    exportStarted?: Void;
    exportTokenTimeout?: Void;
    exportRequestReceived?: Void;
    getDeviceGatewayUrl?: Data<string>;
    getFilePath?: Data<HostFilePath>;
    importStarted?: Void;
    importManifestReceived?: Void;
    importRequestsToSign?: Void;
    importReceivedSigned?: Void;
    ask?: Data<boolean>;
    authenticationPrompt?: Data<boolean>;
    getDeviceInfo?: Data<string>;
}
