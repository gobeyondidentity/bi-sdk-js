import { Configuration } from "./configuration";
import { CoreMessage, HostMessage, Types as Messaging } from "./messaging";
import {
  Pkce,
  PkceCodeChallenge,
  TrustedSource,
  AuthorizationCode,
  UrlResponse,
  TokenResponse,
  CheckRetireResponse,
  BrowserInfo,
  Credential,
  BindCredentialV1Result,
  CredentialV1,
  KeyType,
  CredentialId,
} from "./types";
import { Host, hostCall } from "./host";
import init, {
  kmc_delete_credential,
  kmc_cancel,
  kmc_create_pkce,
  kmc_create_profile,
  kmc_embedded_confidential_oidc,
  kmc_embedded_public_oidc,
  kmc_import,
  kmc_list_credentials,
  kmc_handle_url,
  kmc_export,
  kmc_delete_profile,
  kmc_all_credentials,
  kmc_get_app_instance_id,
  kmc_get_user_agent,
  kmc_get_key_type,
  kmc_migrate_database,
  kmc_url_type,
} from "kmc-ffi";
import { WebHost } from "./host/webHost";
import { MockDispatch } from "./mock/mockDispatch";
import { BIAuthenticateUrlResponse } from "./types/credential";

/**
 * The CoreDispatch is responsible for marshaling invoking KMC and marshalling
 * requests to/from the Host.
 */
export interface CoreDispatch {
  host: Host;

  bindCredentialUrl(url: string): Promise<BindCredentialV1Result>;
  getUrlType(url: string): Messaging.UrlType;
  migrateDatabase(allowedDomains?: string): void;
  cancel(): Promise<void>;
  createPkce(): Promise<Pkce>;
  createCredential(
    handle: string,
    name: string,
    imageUrl: string,
    loginUri?: string,
    enrollUri?: string
  ): Promise<Credential>;
  deleteCredential(handle: string): Promise<void>;
  deleteCredentialV1(id: CredentialId): Promise<void>;
  authenticate(
    url: string,
    trusted: TrustedSource,
    onSelectCredential?: (
      credentials: CredentialV1[]
    ) => Promise<string | undefined>
  ): Promise<BIAuthenticateUrlResponse>;
  authenticateConfidential(
    authURL: string,
    clientId: string,
    redirectURI: string,
    scope: string,
    PKCECodeChallenge?: PkceCodeChallenge,
    nonce?: string
  ): Promise<AuthorizationCode>;
  authenticatePublic(
    authURL: string,
    tokenURL: string,
    clientId: string,
    redirectURI: string,
    nonce?: string
  ): Promise<TokenResponse>;
  export(handle: string): Promise<void>;
  getCredentials(): Promise<Credential[]>;
  listCredentials(): Promise<CredentialV1[]>;
  getKeyType(keyHandle: string): Promise<KeyType>;
  handleURL(url: string, trusted: TrustedSource): Promise<UrlResponse>;
  import(token: string): Promise<Credential | undefined>;
  register(url: string, trusted: TrustedSource): Promise<UrlResponse>;
  getAppInstanceId(): Promise<string>;
  getBrowserInfo(): Promise<BrowserInfo>;
}

class KmcDispatch implements CoreDispatch {
  host: Host;

  constructor(config: Configuration) {
    this.host = new WebHost(config);
  }

  bindCredentialUrl = async (url: string): Promise<BindCredentialV1Result> => {
    const rawUrlType = kmc_url_type(url);
    if (Messaging.toUrlType(rawUrlType).type !== "Bind") {
      return Promise.reject(
        new Error("Invalid Url Type. Expected a Bind Credential Url.")
      );
    }

    // TODO: modify the trusted source
    const rsp = await kmc_handle_url(
      url,
      undefined,
      "EmbeddedSource",
      (msg: string) => {
        return hostCall(this.host, msg);
      }
    );

    const urlResponse = Messaging.toUrlResponse(rsp);
    switch (urlResponse.type) {
      case "bindCredential": {
        return urlResponse.bindCredential;
      }
      default: {
        return Promise.reject(new Error("Invalid response type"));
      }
    }
  };

  getUrlType = (url: string): Messaging.UrlType => {
    const rawUrlType = kmc_url_type(url);
    return Messaging.toUrlType(rawUrlType);
  };

  migrateDatabase = (allowedDomains?: string) => {
    migrate_db(allowedDomains);
  };

  auth = async (url: string, trusted: TrustedSource): Promise<UrlResponse> =>
    Promise.reject("Not implemented");

  cancel = async (): Promise<void> => await kmc_cancel();

  createPkce = async (): Promise<Pkce> => {
    let pkce = await kmc_create_pkce();
    return {
      codeVerifier: pkce.code_verifier,
      codeChallenge: {
        challenge: pkce.code_challenge.challenge,
        method: pkce.code_challenge.method,
      },
    };
  };

  createCredential = async (
    handle: string,
    name: string,
    imageUrl: string,
    loginUri?: string,
    enrollUri?: string
  ): Promise<Credential> => {
    let profile = await kmc_create_profile(
      handle,
      name,
      imageUrl,
      enrollUri,
      loginUri,
      undefined,
      undefined,
      undefined,
      (msg: string) => {
        return hostCall(this.host, msg);
      }
    );
    let credential = Messaging.credentialFromProfile(profile);
    await this.updateCredentialInfo(credential);
    return credential;
  };

  deleteCredential = async (handle: string): Promise<void> =>
    await kmc_delete_profile(handle, (msg: string) => {
      return hostCall(this.host, msg);
    });

  deleteCredentialV1 = async (id: CredentialId): Promise<void> =>
    await kmc_delete_credential(id, (msg: string) => {
      return hostCall(this.host, msg);
    });

  authenticate = async (
    url: string,
    trusted: TrustedSource
  ): Promise<BIAuthenticateUrlResponse> => {
    const rsp = await kmc_handle_url(url, undefined, trusted, (msg: string) => {
      return hostCall(this.host, msg);
    });
    let urlResponse = Messaging.toUrlResponse(rsp);
    switch (urlResponse.type) {
      case "biAuthenticate": {
        return urlResponse.biAuthenticate;
      }
      default: {
        return Promise.reject(new Error("Invalid response type"));
      }
    }
  };

  authenticateConfidential = async (
    authURL: string,
    clientId: string,
    redirectURI: string,
    scope: string,
    challenge?: PkceCodeChallenge,
    nonce?: string
  ): Promise<AuthorizationCode> => {
    let code = <AuthorizationCode>(
      await kmc_embedded_confidential_oidc(
        authURL,
        clientId,
        redirectURI,
        scope,
        challenge,
        nonce,
        (msg: string) => {
          return hostCall(this.host, msg);
        }
      )
    );
    return code;
  };

  authenticatePublic = async (
    authURL: string,
    tokenURL: string,
    clientId: string,
    redirectURI: string,
    nonce?: string
  ): Promise<TokenResponse> => {
    let token = <Messaging.TokenResponse>(
      await kmc_embedded_public_oidc(
        authURL,
        tokenURL,
        clientId,
        redirectURI,
        nonce,
        (msg: string) => {
          return hostCall(this.host, msg);
        }
      )
    );
    return {
      accessToken: token.access_token,
      idToken: token.id_token,
      tokenType: token.token_type,
      expiresIn: token.expires_in,
    };
  };

  export = async (handle: string): Promise<void> =>
    await kmc_export(handle, (msg: string) => {
      return hostCall(this.host, msg);
    });

  getCredentials = async (): Promise<Credential[]> => {
    // Retrieve the credentials from the database.
    let creds = <Messaging.CoreCredential[]>(
      await kmc_all_credentials((msg: string) => {
        return hostCall(this.host, msg);
      })
    );
    // Convert the raw credentials into a more friendly type.
    let credentials = creds.map((cred) => Messaging.credentialFromCore(cred));
    // Supply the key type for each credential.
    for (let cred of credentials) {
      await this.updateCredentialInfo(cred);
    }
    return credentials;
  };

  listCredentials = async (): Promise<CredentialV1[]> => {
    let creds = <Messaging.CoreCredentialV1[]>(
      await kmc_list_credentials((msg: string) => {
        return hostCall(this.host, msg);
      })
    );
    let credentials = creds.map((cred) =>
      Messaging.credentialV1FromCredential(cred)
    );
    for (let credential of credentials) {
      credential.keyType = await this.getKeyType(credential.keyHandle);
    }
    return credentials;
  };

  getKeyType = async (keyHandle: string): Promise<KeyType> => {
    let rsp = await kmc_get_key_type(keyHandle);
    return <KeyType>rsp;
  };

  handleURL = async (
    url: string,
    trusted: TrustedSource
  ): Promise<UrlResponse> => {
    // FIXME: get allowed domains from somewhere
    let rsp = await kmc_handle_url(url, undefined, trusted, (msg: string) => {
      return hostCall(this.host, msg);
    });
    return Messaging.toUrlResponse(rsp);
  };

  import = async (token: string): Promise<Credential | undefined> => {
    let profile = await kmc_import(token, (msg: string) => {
      return hostCall(this.host, msg);
    });
    if (profile === undefined) return undefined;

    let credential = Messaging.credentialFromProfile(profile);
    await this.updateCredentialInfo(credential);
    return credential;
  };

  register = async (
    url: string,
    trusted: TrustedSource
  ): Promise<UrlResponse> => {
    /// FIXME Allowed domains?
    let rsp = await kmc_handle_url(url, undefined, trusted, (msg: string) => {
      return hostCall(this.host, msg);
    });
    return Messaging.toUrlResponse(rsp);
  };

  getAppInstanceId = async (): Promise<string> =>
    await kmc_get_app_instance_id();

  getBrowserInfo = async (): Promise<BrowserInfo> => await kmc_get_user_agent();

  private updateCredentialInfo = async (cred: Credential) => {
    try {
      cred.keyType = await this.getKeyType(cred.keyHandle);
    } catch (err) {
      // Update the integrity failure map as needed.
      if (cred.integrityFailures === undefined) {
        cred.integrityFailures = {};
      }
      cred.integrityFailures["keyType"] = {
        KeyType: err instanceof Error ? err.message : JSON.stringify(err),
      };
    }
  };
}

/**
 * Creates the CoreDispatch that Core uses.
 *
 * @param config Configuration data
 * @returns a new CoreDispatch object: `KmcDispatch | `MockDispatch`
 */
export function createDispatch(config: Configuration): CoreDispatch {
  if (config.mock) {
    if (config.mock.dispatch) {
      if (config.mock.dispatch instanceof Function)
        return config.mock.dispatch();
      else return new MockDispatch(config);
    }
  }
  return new KmcDispatch(config);
}

/**
 * global one-time-call flag for kmc-migrate-database
 */
let __migrate_db = false;

/**
 * one-time-call for kmc-migrate-database.
 * This function exists because in the WebAuthenticator,
 * reactJS in development mode, will initialize core 
 * twice, which will induce a panic in kmc_migrate_database.
 * @param allowedDomains 
 */
function migrate_db(allowedDomains?: string) {
  if (!__migrate_db) {
    kmc_migrate_database(allowedDomains)
    __migrate_db = true;
  }
}