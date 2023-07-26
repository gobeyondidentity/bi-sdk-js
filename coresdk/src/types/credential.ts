import { CertHandle, KeyHandle } from "./handles";
import { CredentialV1 } from "../types";

/** Defines all the ways that construction of a Credential may fail.
 * NOTE: the KeyType is a result of a failure in kmc_get_key_type.
 */
export type IntegrityFailureError =
  | { DateParse: string }
  | { ProfileHandle: string }
  | { KeyHandle: string }
  | { KeySigning: string }
  | "CertHandleParse"
  | { CertRead: string }
  | { CertCreate: string }
  | { RootFingerprint: string }
  | { KeyType: string }
  | "ResultParse";

/** The state of a credential */
export type State =
  | "Active"
  | "UserSuspended"
  | "UserDeleted"
  | "DeviceDeleted"
  | "Invalid";

export type KeyType = "subtle" | "webauthn";

export interface User {}

export interface DeviceCredential {}

/**
 * A credential.
 */
export interface Credential {
  /**
   * The current state of the Credential.
   */
  state: State;

  /**
   * Date the credential was created.
   */
  created: string;

  /**
   * The handle by which this credential is known.
   */
  handle: string;

  /**
   * The handle of the key associated with this
   * credential.
   */
  keyHandle: KeyHandle;

  /**
   * The type of key associated with the credential. May be either:
   * "subtle" or "webauthn".
   *
   * "subtle" keys are software based and stored in IndexedDb.
   * "webauthn" keys may be hardware based and are stored in the authenticator (aka browser).
   */
  keyType?: KeyType;

  /**
   * The display name of this credential.
   */
  name: string;

  /**
   *
   */
  imageURL: string;

  /**
   * The URL of the logo image for this credential
   */
  loginURI?: string;

  /**
   *
   */
  enrollURI?: string;

  /**
   * The certificate chain.
   */
  chain: CertHandle[];

  /**
   * SHA256 hash of the root certificate.
   */
  rootFingerprint: string;

  /**
   * A one-time generated string of bits that identifies
   * a user to the WebAuthn API. This may be provided by a
   * third party? For now, we generate it as random bits.
   */
  userId?: Uint8Array;

  user?: User;

  deviceCredential?: DeviceCredential;

  /**
   * A Map that identifies member names to failed integrity checks.
   * If no integrity checks failed, the integrityFailures will be
   * undefined.
   */
  integrityFailures?: Record<string, IntegrityFailureError>;
}

export interface SelfIssueUrlResponse {
  credential: Credential;
  redirectURL: string;
  handledRedirectExternally?: boolean;
}

export interface RegistrationUrlResponse {
  credential: Credential;
}

export type BiAuthenticateResponse =
  | {
      allow: {
        redirectURL: string;
        message?: string;
        passkeyBindingToken?: string;
      };
    }
  | {
      continue: {
        reason: string;
        url: string;
      };
    };

export interface BindCredentialUrlResponse {
  credential: CredentialV1;
  postBindRedirect?: string;
}

export type UrlResponse =
  | { type: "selfIssue"; selfIssue: SelfIssueUrlResponse }
  | { type: "registration"; registration: RegistrationUrlResponse }
  | { type: "biAuthenticate"; biAuthenticate: BiAuthenticateResponse }
  | { type: "bindCredential"; bindCredential: BindCredentialUrlResponse };
