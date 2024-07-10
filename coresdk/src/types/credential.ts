export type Version = "v0" | "v1";

/** The state of a credential */
export type State =
  | "Active"
  | "DeviceDeleted"
  | "Invalid"
  | "Revoked"
  | "UserDeleted"
  | "UserSuspended"
  | "Unknown";

export type KeyType = "subtle" | "webauthn";

/**
 * A credential.
 */
export interface Credential {
  version: Version;

  /**
   * A credential.
   */
  id: string;

  /**
   * Date the credential was created.
   */
  created: string;

  /**
   * The current state of the Credential.
   */
  state: State;

  /**
   * The type of key associated with the credential. May be either:
   * "subtle" or "webauthn".
   *
   * "subtle" keys are software based and stored in IndexedDb.
   * "webauthn" keys may be hardware based and are stored in the authenticator (aka browser).
   */
  keyType?: KeyType;

  tenant: Tenant;
  realm: Realm;
  identity: Identity;
  links: Links;
  theme: Theme;
}

export interface Tenant {
  id: string;
  displayName: string;
}

export interface Realm {
  id: string;
  displayName: string;
}

export interface Identity {
  id: string;
  username: string;
  displayName?: string;
  externalId?: string;
  emailAddress?: string;
}

export interface Theme {
  logoUrlLight: string;
  logoUrlDark: string;
  supportUrl?: string;
}

export interface Links {
  loginUri?: string;
  enrollUri?: string;
}

export interface BindResponse {
  credential: Credential;
  message?: String;
  postBindRedirect?: string;
}

export type AuthenticateResponse =
  | {
      allow: {
        operation?: string;
        redirectURL: string;
        message?: string;
        credential?: Credential;
        passkeyBindingToken?: string;
        handledRedirectExternally?: boolean;
        redirectBundle?: string;
      };
    }
  | {
      continue: {
        reason: string;
        url: string;
      };
    };

export type UrlResponse =
  | { type: "authenticate"; authenticate: AuthenticateResponse }
  | { type: "bind"; bind: BindResponse };
