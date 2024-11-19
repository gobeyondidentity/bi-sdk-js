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
  PkceCodeChallenge,
  UrlResponse,
  CryptoSource,
  KeyStorageStrategy,
  PathType,
  AuthenticationContext,
  AuthenticationMethod,
} from "../types";

export {
  PkceCodeChallenge,
  RegistrationStatus,
  PromptDetail,
  FeatureFlagRequest,
  FeatureFlagResponse,
  PathType,
} from "../types";

export interface HandleSelfIssueUrlResponse {
  operation: string;
  profile: Credential;
  redirect_url: string;
  handled_redirect_externally?: boolean;
}

export interface HandleRegisterUrlResponse {
  operation: string;
  profile: Credential;
}

export interface HandleBiAuthenticateUrlResponse {
  operation: string;
  redirect_url: string;
  message?: string;
  passkey_binding_token?: string;
  redirect_bundle?: string;
}

export interface HandleBiContinueResponse {
  reason: string;
  url: string;
}

export interface HandleBindCredentialUrlResponse {
  credential: Credential;
  post_binding_redirect_uri?: string;
}

// FIXME: We're missing v0 fields in some of these responses.
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
      type: "authenticate",
      authenticate: {
        allow: {
          credential: rsp["SelfIssue"].profile,
          redirectURL: rsp["SelfIssue"].redirect_url,
          handledRedirectExternally:
            rsp["SelfIssue"].handled_redirect_externally,
          redirectBundle: undefined,
        },
      },
    };
  } else if ("BiAuthenticate" in rsp) {
    return {
      type: "authenticate",
      authenticate: {
        allow: {
          redirectURL: rsp["BiAuthenticate"].redirect_url,
          message: rsp["BiAuthenticate"].message,
          passkeyBindingToken: rsp["BiAuthenticate"].passkey_binding_token,
          redirectBundle: rsp["BiAuthenticate"].redirect_bundle,
        },
      },
    };
  } else if ("BiContinue" in rsp) {
    return {
      type: "authenticate",
      authenticate: {
        continue: {
          reason: rsp["BiContinue"].reason,
          url: rsp["BiContinue"].url,
        },
      },
    };
  } else if ("Registration" in rsp) {
    return {
      type: "bind",
      bind: {
        credential: rsp["Registration"].profile,
      },
    };
  } else if ("BindCredential" in rsp) {
    return {
      type: "bind",
      bind: {
        credential: rsp["BindCredential"].credential,
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
  gdc_url: string;
  keymaker_allowed_domains: string,
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
  coreContext: CoreAuthenticationRequestContext,
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

  if (
    coreContext.config.config.type == "hosted_web" ||
    coreContext.config.config.type == "hosted_login" ||
    coreContext.config.config.type == "embedded"
  ) {
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

/** Authenticator Profile configuration.
 * Note that `hosted_login` is only provided for backwards compatibility,
 * and has been renamed to `hosted_web`.
 */
type CoreAuthenticatorProfileConfig =
  | { type: "hosted_web"; authentication_methods: AuthenticationMethod[] }
  | { type: "hosted_login"; authentication_methods: AuthenticationMethod[] }
  | { type: "platform" }
  | { type: "embedded"; authentication_methods: AuthenticationMethod[] };

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
