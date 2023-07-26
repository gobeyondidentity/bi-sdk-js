/**
 * These messaging types are duplicates of the application types
 * with the exception that they have snake_case spellings
 * so that they are properly serialized into/out of Core.
 *
 * Some types have the same spelling, so they are re-exports
 * of the application types.
 */

import {
  Credential,
  CredentialV1,
  PkceCodeChallenge,
  UrlResponse,
  CryptoSource,
  KeyStorageStrategy,
  PathType,
  State,
  IntegrityFailureError,
  AuthenticationContext,
} from "../types";

export {
  PkceCodeChallenge,
  RegistrationStatus,
  PromptDetail,
  FeatureFlagRequest,
  FeatureFlagResponse,
  PathType,
} from "../types";

/**
 * A Profile is identical to a Credential, but
 * is named differently for legacy reasons.
 */
export interface Profile {
  state: State;
  created: string;
  handle: string;
  key_handle: string;
  name: string;
  image_url: string;
  login_uri?: string;
  enroll_uri?: string;
  chain: string[];
  root_fingerprint: string;
  user_id?: Uint8Array;

  key_type?: "subtle" | "webauthn";
}

/**
 * Ok or Err.
 * FIXME: parameterize this over the "Ok" type.
 */
export type IntegrityResult = { Ok: string } | { Err: IntegrityFailureError };

/**
 * Returned from kmc_all_credentials
 */
export interface CoreCredential {
  created: IntegrityResult;
  state: State;
  handle: IntegrityResult;
  key_handle: IntegrityResult;
  name: string;
  image_url: string;
  chain_handles: IntegrityResult[];
  enroll_uri: string;
  login_uri: string;
  desktop_login_url: string;
  device_gateway_url: string;
  migrate_addr: string;
  root_fingerprint: IntegrityResult;
  user?: User;
  device_credential?: DeviceCredential;
  ssids: [{}]; // unused

  key_type?: "subtle" | "webauthn";
}

interface User {}

interface DeviceCredential {}

/** Helper method for constructing Credentials from rust Profile objects. */
export function credentialFromProfile(profile: Profile): Credential {
  return {
    state: profile.state,
    created: profile.created,
    handle: profile.handle,
    keyHandle: profile.key_handle,
    keyType: profile.key_type,
    name: profile.name,
    imageURL: profile.image_url,
    loginURI: profile.login_uri,
    enrollURI: profile.enroll_uri,
    chain: profile.chain,
    rootFingerprint: profile.root_fingerprint,
    userId: profile.user_id,
  };
}

function unwrapString(
  result: IntegrityResult,
  name: string,
  errors: Record<string, IntegrityFailureError>
): string {
  if ("Ok" in result) {
    return result["Ok"];
  } else {
    errors[name] = result["Err"] ?? "ResultParse";
    return "";
  }
}

function unwrapStringArray(
  results: IntegrityResult[],
  name: string,
  errors: Record<string, IntegrityFailureError>
): string[] {
  return results.map((result) => {
    return unwrapString(result, name, errors);
  });
}

export function credentialFromCore(cred: CoreCredential): Credential {
  let errors = {};
  let newCred: Credential = {
    state: cred.state,
    created: unwrapString(cred.created, "created", errors),
    handle: unwrapString(cred.handle, "handle", errors),
    keyHandle: unwrapString(cred.key_handle, "keyHandle", errors),
    keyType: undefined,
    name: cred.name,
    imageURL: cred.image_url,
    loginURI: cred.login_uri,
    enrollURI: cred.enroll_uri,
    chain: unwrapStringArray(cred.chain_handles, "chain", errors),
    rootFingerprint: unwrapString(
      cred.root_fingerprint,
      "rootFingerprint",
      errors
    ),
    userId: undefined,
    user: {},
    deviceCredential: {},
    integrityFailures: Object.keys(errors).length ? errors : undefined,
  };
  return newCred;
}

export interface HandleSelfIssueUrlResponse {
  operation: string;
  profile: Profile;
  redirect_url: string;
  handled_redirect_externally?: boolean;
}

export interface HandleRegisterUrlResponse {
  operation: string;
  profile: Profile;
}

export interface HandleBiAuthenticateUrlResponse {
  operation: string;
  redirect_url: string;
  message?: string;
  passkey_binding_token?: string;
}

export interface HandleBiContinueResponse {
  reason: string;
  url: string,
}

export interface HandleBindCredentialUrlResponse {
  credential: CoreCredentialV1;
  post_binding_redirect_uri?: string;
}

export type HandleUrlResponse =
  | { SelfIssue: HandleSelfIssueUrlResponse }
  | { Registration: HandleRegisterUrlResponse }
  | { BiAuthenticate: HandleBiAuthenticateUrlResponse }
  | { BiContinue: HandleBiContinueResponse }
  | { BindCredential: HandleBindCredentialUrlResponse };

/** Helper method for constructing UrlResponse from rust HandleUrlResponse objects. */
export function toUrlResponse(rsp: HandleUrlResponse): UrlResponse {
  if ("SelfIssue" in rsp) {
    return {
      type: "selfIssue",
      selfIssue: {
        credential: credentialFromProfile(rsp["SelfIssue"].profile),
        redirectURL: rsp["SelfIssue"].redirect_url,
        handledRedirectExternally: rsp["SelfIssue"].handled_redirect_externally,
      },
    };
  } else if ("Registration" in rsp) {
    return {
      type: "registration",
      registration: {
        credential: credentialFromProfile(rsp["Registration"].profile),
      },
    };
  } else if ("BiAuthenticate" in rsp) {
    return {
      type: "biAuthenticate",
      biAuthenticate: {
        allow: {
          redirectURL: rsp["BiAuthenticate"].redirect_url,
          message: rsp["BiAuthenticate"].message,
          passkeyBindingToken: rsp["BiAuthenticate"].passkey_binding_token,
        },
      },
    };
  } else if ("BiContinue" in rsp) {
    return {
      type: "biAuthenticate",
      biAuthenticate: {
        continue: {
          reason: rsp["BiContinue"].reason,
          url: rsp["BiContinue"].url,
        },
      },
    };
  } else if ("BindCredential" in rsp) {
    return {
      type: "bindCredential",
      bindCredential: {
        credential: credentialV1FromCredential(
          rsp["BindCredential"].credential
        ),
        postBindRedirect: rsp["BindCredential"].post_binding_redirect_uri,
      },
    };
  } else {
    throw new Error("Unexpected error");
  }
}

export interface HostFilePath {
  path_type: PathType;
  path: string;
}

export type CheckRetireResponse = {
  version: number;
  is_retired: boolean;
  reason: string;
  info_url: string;
};

export interface TokenResponse {
  access_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
}

export interface ConfigureGit {
  repoPath: string;
  keyFingerprint: string;
  gpgCliPath: string;
  alwaysSign?: boolean;
}

export interface RegistrationRequest {
  external_id: string;
  email: string;
  user_name: string;
  display_name: string;
}

export interface Pkce {
  code_verifier: string;
  code_challenge: PkceCodeChallenge;
}

export interface ClientEnvironment {
  crypto_source: CryptoSource;
  key_storage_strategy: KeyStorageStrategy;
}

export interface CoreCredentialV1 {
  id: string;
  local_created: string;
  local_updated: string;
  api_base_url: string;
  tenant_id: string;
  realm_id: string;
  identity_id: string;
  key_handle: string;
  state: "Active" | "Revoked";
  created: string;
  updated: string;
  tenant: CoreTenantV1;
  realm: CoreRealmV1;
  identity: CoreIdentityV1;
  theme: CoreThemeV1;
}

export interface CoreRealmV1 {
  display_name: string;
}

export interface CoreIdentityV1 {
  display_name: string;
  username: string;
  primary_email_address?: string;
}

export interface CoreThemeV1 {
  logo_url_light: string;
  logo_url_dark: string;
  support_url: string;
}

export interface CoreTenantV1 {
  display_name: string;
}

export function credentialV1FromCredential(
  coreCred: CoreCredentialV1
): CredentialV1 {
  let cred: CredentialV1 = {
    id: coreCred.id,
    localCreated: coreCred.local_created,
    localUpdated: coreCred.local_updated,
    apiBaseUrl: coreCred.api_base_url,
    keyHandle: coreCred.key_handle,
    state: coreCred.state,
    created: coreCred.created,
    updated: coreCred.updated,
    tenant: {
      id: coreCred.tenant_id,
      displayName: coreCred.tenant.display_name,
    },
    realm: {
      id: coreCred.realm_id,
      displayName: coreCred.realm.display_name,
    },
    identity: {
      id: coreCred.realm_id,
      displayName: coreCred.identity.display_name,
      username: coreCred.identity.username,
      primaryEmailAddress: coreCred.identity.primary_email_address,
    },
    theme: {
      logoUrlLight: coreCred.theme.logo_url_light,
      logoUrlDark: coreCred.theme.logo_url_dark,
      supportUrl: coreCred.theme.support_url,
    },
  };
  return cred;
}

export type UrlType = { type: "Authenticate" } | { type: "Bind" };

/** Helper method for constructing UrlType from string. */
export function toUrlType(rawUrlType: string): UrlType {
  switch (rawUrlType) {
    case "Authenticate": {
      return { type: "Authenticate" };
    }
    case "Bind": {
      return { type: "Bind" };
    }
    default: {
      throw new Error("Unexpected Url Type");
    }
  }
}

export function toAuthContext(
  coreContext: CoreAuthenticationRequestContext
): AuthenticationContext {
  let context: AuthenticationContext = {
    authUrl: coreContext.auth_url,
    application: {
      id: coreContext.application.id,
      displayName: coreContext.application.display_name,
    },
    origin: {
      sourceIp: coreContext.origin.ip,
      userAgent: coreContext.origin.ua,
      geolocation: coreContext.origin.geo,
      referer: coreContext.origin.ref,
    },
  };

  if (coreContext.config.config.type == "hosted_login") {
    context.authMethods = coreContext.config.config.authentication_methods;
  }

  return context;
}

export interface CoreAuthenticationRequestContext {
  config: CoreAuthenticatorConfig;
  origin: CoreRequestOrigin;
  application: CoreApplication;
  auth_url: string;
}

interface CoreAuthenticatorConfig {
  id: string;
  tenant_id: string;
  realm_id: string;
  config: CoreAuthenticatorProfileConfig;
}

type CoreAuthenticatorProfileConfig =
  | { type: "hosted_web" }
  | { type: "hosted_login"; authentication_methods: CoreAuthenticationMethod[] }
  | { type: "platform" }
  | { type: "embedded" };

type CoreAuthenticationMethod =
  | { type: "webauthn_passkey" }
  | { type: "software_passkey" }
  | { type: "email_one_time_password" };

interface CoreRequestOrigin {
  ip?: string;
  ua?: string;
  geo?: string;
  ref?: string;
}

interface CoreApplication {
  id: string;
  display_name?: string;
}
