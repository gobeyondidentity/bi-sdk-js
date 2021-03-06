import { createHost, Host } from "../host";
import { CoreDispatch } from "../coreDispatch";
import { DispatchData } from "./mockConfig";
import { resolve } from "./mockData";
import {
  Credential,
  PkceCodeChallenge,
  Pkce,
  TrustedSource,
  AuthorizationCode,
  UrlResponse,
  TokenResponse,
  CheckRetireResponse,
  BrowserInfo,
  BindCredentialV1Result,
  CredentialV1,
  KeyType,
  CredentialId,
} from "../types";
import { UrlType } from "../messaging/types";
import { Configuration } from "../configuration";
import { BIAuthenticateUrlResponse } from "../types/credential";
import { exitCode } from "process";

export class MockDispatch implements CoreDispatch {
  host: Host;
  mock: DispatchData;

  // FIXME: supply default config data

  constructor(config: Configuration) {
    this.mock = config.mock ? <DispatchData>config.mock.dispatch : {};
    this.host = createHost(config);
  }

  bindCredentialUrl(url: string): Promise<BindCredentialV1Result> {
    if (this.mock.bindCredential) return resolve(this.mock.bindCredential);

    return Promise.resolve({
      credential: {
        id: "123-456",
        localCreated: new Date().toISOString(),
        localUpdated: new Date().toISOString(),
        apiBaseUrl: "www.example.com",
        tenantId: "tenant-id",
        realmId: "realm-id",
        identityId: "identity-id",
        credentialId: "abc",
        keyHandle: "abc",
        state: "Active",
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        realm: {
          name: "realm",
          displayName: "My First Realm",
        },
        identity: {
          displayName: "First User",
          username: "FirstUser",
          emailAddress: "",
        },
        theme: {
          logoUrlLight:
            "https://app.rolling.byndid.run/static/img/logo.eada4aebc845fb4514b5.png",
          logoUrlDark:
            "https://app.rolling.byndid.run/static/img/logo.eada4aebc845fb4514b5.png",
          primaryColorLight: "#4673D3",
          primaryColorDark: "#FFFFFF",
          supportUrl:
            "https://beyondidentity.atlassian.net/wiki/spaces/CS/overview",
        },
      },
      postBindRedirect: "https://google.com",
    });
  }

  getUrlType(url: string): UrlType {
    return { type: "Authenticate" };
  }

  updateCredential(credentialId: string): Promise<CredentialV1> {
    return Promise.resolve({
      id: "123-456",
      localCreated: new Date().toISOString(),
      localUpdated: new Date().toISOString(),
      apiBaseUrl: "www.example.com",
      tenantId: "tenant-id",
      realmId: "realm-id",
      identityId: "identity-id",
      credentialId: "abc",
      keyHandle: "abc",
      state: "Revoked",
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      realm: {
        name: "realm",
        displayName: "My First Realm",
      },
      identity: {
        displayName: "First User",
        username: "FirstUser",
        emailAddress: "",
      },
      theme: {
        logoUrlLight:
          "https://app.rolling.byndid.run/static/img/logo.eada4aebc845fb4514b5.png",
        logoUrlDark:
          "https://app.rolling.byndid.run/static/img/logo.eada4aebc845fb4514b5.png",
        primaryColorLight: "#4673D3",
        primaryColorDark: "#FFFFFF",
        supportUrl:
          "https://beyondidentity.atlassian.net/wiki/spaces/CS/overview",
      },
    });
  }

  migrateDatabase(allowedDomains?: string): void {}

  cancel(): Promise<void> {
    if (this.mock.cancel) return resolve(this.mock.cancel);

    return Promise.resolve();
  }

  createPkce(): Promise<Pkce> {
    if (this.mock.createPkce) return resolve(this.mock.createPkce);

    let response = {
      codeVerifier: "",
      codeChallenge: {
        challenge: "123",
        method: "",
      },
    };
    return Promise.resolve(response);
  }

  async createCredential(
    handle: string,
    name: string,
    imageUrl: string,
    loginUri?: string,
    enrollUri?: string
  ): Promise<Credential> {
    if (this.mock.createCredential) return resolve(this.mock.createCredential);

    // return the profile.
    let profile: Credential = {
      state: "Active",
      created: new Date().toISOString(),
      handle: "abcde",
      keyHandle: "12345",
      name: "Carl Hungus",
      imageURL: "www.example.com",
      chain: ["qwerty", "asdfg"],
      rootFingerprint: "3",
    };
    return profile;
  }

  deleteCredential(handle: string): Promise<void> {
    if (this.mock.deleteCredential) return resolve(this.mock.deleteCredential);

    return Promise.resolve();
  }

  deleteCredentialV1(id: CredentialId): Promise<void> {
    return Promise.resolve();
  }

  async authenticate(
    url: string,
    trusted: TrustedSource,
    onSelectCredential?: (
      credentials: CredentialV1[]
    ) => Promise<string | undefined>
  ): Promise<BIAuthenticateUrlResponse> {
    const credentials = (await resolve(this.mock.listCredentials)) ?? [
      {
        id: "456-123",
        localCreated: new Date().toISOString(),
        localUpdated: new Date().toISOString(),
        apiBaseUrl: "www.example.com",
        tenantId: "tenant-id",
        realmId: "realm-id",
        identityId: "identity-id-1",
        keyHandle: "abc",
        state: "Active",
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        realm: {
          name: "realm",
          displayName: "My First Realm",
        },
        identity: {
          displayName: "First User",
          username: "FirstUser",
          emailAddress: "",
        },
        theme: {
          logoUrlLight:
            "https://app.rolling.byndid.run/static/img/logo.eada4aebc845fb4514b5.png",
          logoUrlDark:
            "https://app.rolling.byndid.run/static/img/logo.eada4aebc845fb4514b5.png",
          primaryColorLight: "#4673D3",
          primaryColorDark: "#FFFFFF",
          supportUrl:
            "https://beyondidentity.atlassian.net/wiki/spaces/CS/overview",
        },
      },
      {
        id: "123-456",
        localCreated: new Date().toISOString(),
        localUpdated: new Date().toISOString(),
        apiBaseUrl: "www.example.com",
        tenantId: "tenant-id",
        realmId: "realm-id",
        identityId: "identity-id-2",
        keyHandle: "def",
        state: "Active",
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        realm: {
          name: "realm",
          displayName: "My First Realm",
        },
        identity: {
          displayName: "Second User",
          username: "SecondUser",
          emailAddress: "",
        },
        theme: {
          logoUrlLight:
            "https://app.rolling.byndid.run/static/img/logo.eada4aebc845fb4514b5.png",
          logoUrlDark:
            "https://app.rolling.byndid.run/static/img/logo.eada4aebc845fb4514b5.png",
          primaryColorLight: "#4673D3",
          primaryColorDark: "#FFFFFF",
          supportUrl:
            "https://beyondidentity.atlassian.net/wiki/spaces/CS/overview",
        },
      },
    ];

    const selectedCredentialId = await (onSelectCredential
      ? onSelectCredential(credentials)
      : this.host.selectCredentialV1(credentials));

    if (this.mock.authenticate) {
      let response = await resolve(this.mock.authenticate);
      if (response.type == "biAuthenticate") return response.biAuthenticate;
      else throw new Error("Invalid response type");
    }
    return Promise.resolve({
      redirectURL: "https://example.com/bi-authenticate-done",
      message: "ok",
    });
  }

  authenticateConfidential(
    authURL: string,
    clientId: string,
    redirectURI: string,
    scope: string,
    PKCECodeChallenge?: PkceCodeChallenge,
    nonce?: string
  ): Promise<AuthorizationCode> {
    if (this.mock.authenticateConfidential)
      return resolve(this.mock.authenticateConfidential);

    let response = {
      code: "lmnop",
    };
    return Promise.resolve(response);
  }

  authenticatePublic(
    authURL: string,
    tokenURL: string,
    clientId: string,
    redirectURI: string,
    nonce?: string
  ): Promise<TokenResponse> {
    if (this.mock.authenticatePublic)
      return resolve(this.mock.authenticatePublic);

    let response = {
      accessToken: "123",
      idToken: "abc",
      tokenType: "bearer",
      expiresIn: 5,
    };
    return Promise.resolve(response);
  }

  export(handle: string): Promise<void> {
    if (this.mock.export) return resolve(this.mock.export);

    return Promise.resolve();
  }

  getCredentials(): Promise<Credential[]> {
    if (this.mock.getCredentials) return resolve(this.mock.getCredentials);

    let response: Credential = {
      state: "Active",
      created: new Date().toISOString(),
      handle: "abcde",
      keyHandle: "12345",
      name: "Carl Hungus",
      imageURL: "www.example.com",
      chain: ["qwerty", "asdfg"],
      rootFingerprint: "3",
    };
    return Promise.resolve([response]);
  }

  async listCredentials(): Promise<CredentialV1[]> {
    let response: CredentialV1 = {
      id: "abc",
      localCreated: new Date().toISOString(),
      localUpdated: new Date().toISOString(),
      apiBaseUrl: "www.example.com",
      tenantId: "tenant-id",
      realmId: "realm-id",
      identityId: "identity-id",
      keyHandle: "abc",
      state: "Active",
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      realm: {
        displayName: "My First Realm",
      },
      identity: {
        displayName: "First User",
        username: "FirstUser",
        emailAddress: "",
      },
      theme: {
        logoUrlLight:
          "https://app.rolling.byndid.run/static/img/logo.eada4aebc845fb4514b5.png",
        logoUrlDark:
          "https://app.rolling.byndid.run/static/img/logo.eada4aebc845fb4514b5.png",
        supportUrl:
          "https://beyondidentity.atlassian.net/wiki/spaces/CS/overview",
      },
    };

    return (
      (await resolve(this.mock.listCredentials)) ?? Promise.resolve([response])
    );
  }

  getKeyType(keyHandle: string): Promise<KeyType> {
    return Promise.resolve("subtle");
  }

  handleURL(url: string, trusted: TrustedSource): Promise<UrlResponse> {
    if (this.mock.handleURL) return resolve(this.mock.handleURL);

    return Promise.reject("Not sure what to return here...");
  }

  import(token: string): Promise<Credential | undefined> {
    if (this.mock.import) return resolve(this.mock.import);

    let response: Credential = {
      state: "Active",
      created: new Date().toISOString(),
      handle: "abcde",
      keyHandle: "12345",
      name: "Carl Hungus",
      imageURL: "www.example.com",
      chain: ["qwerty", "asdfg"],
      rootFingerprint: "3",
    };
    return Promise.resolve(response);
  }

  register(url: string, trusted: TrustedSource): Promise<UrlResponse> {
    if (this.mock.register) return resolve(this.mock.register);

    let credential: Credential = {
      state: "Active",
      created: new Date().toISOString(),
      handle: "abcde",
      keyHandle: "12345",
      name: "Carl Hungus",
      imageURL: "www.example.com",
      chain: ["qwerty", "asdfg"],
      rootFingerprint: "3",
    };
    let response: UrlResponse = {
      type: "registration",
      registration: {
        credential: credential,
      },
    };
    return Promise.resolve(response);
  }

  getAppInstanceId = async (): Promise<string> => {
    return Promise.resolve("123");
  };

  getBrowserInfo = async (): Promise<BrowserInfo> => {
    return {};
  };
}
