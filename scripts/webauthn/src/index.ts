import { parseUserAgent } from "./userAgent";
import { queryUserAgentData } from "./userAgentData";
import { Version, VersionInfo } from "./version";
import webauthn from "./webauthn.json";
const decisionTable = [...webauthn] as Decision[];

export type PlatformName =
  | "windows"
  | "macos"
  | "ios"
  | "linux"
  | "android"
  | "chromeos";

export interface Platform {
  /** The name of the platform. This is taken directly from the platform field
   * in UserAgentData, or the platform info parsed from the UserAgent string. If
   * this value is undefined, then the platform is one that we do not explicitly
   * support.
   */
  name?: PlatformName;

  /** The platform version.
   */
  version: Version;

  mobile?: boolean;
  architecture?: string;
  bitness?: string;
  model?: string;
}

export type BrowserName = "chrome" | "edge" | "firefox" | "safari" | "opera";

export interface Browser {
  /** The name of the browser. This is inferred from the fullVersionList of
   * UserAgentData, or the collection of version strings in the UserAgent
   * string. If this value is undefined then the browser is one that we do not
   * explicitly support. However, in this case, we assume the browser is Chrome-based.
   */
  name?: BrowserName;

  /**
   * The version associated with the detected browser listed above.
   */
  version: Version;

  /**
   * A list of products/versions used to infer the the browser.
   * When client hints is available, this is the fullVersionsList.
   * Otherwise it is parsed from the UA string.
   */
  versions: VersionInfo[];
}

export interface UserAgentData {
  /**
   * The detected platform.
   */
  platform: Platform;

  /**
   * The detected browser.
   */
  browser: Browser;

  source: "client-hints" | "user-agent";
  sourceUaData?: any;
  sourceUaString: string;
}

export interface WebAuthnEvidence {
  userAgent: UserAgentData;
  hasUVPA: boolean | undefined;
}

export async function collectEvidence(): Promise<WebAuthnEvidence> {
  const ua = await getUserAgentData();
  const hasUVPA = window.PublicKeyCredential
    ? await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
    : undefined;
  return {
    userAgent: ua,
    hasUVPA: hasUVPA,
  };
}

async function getUserAgentData(): Promise<UserAgentData> {
  let data;
  if ((data = await queryUserAgentData()) === undefined) {
    data = parseUserAgent();
  }
  return data;
}

export interface Decision {
  /**
   * The name of the platform for which the decisions is valid. If
   * undefined, the decision is valid for all platforms not otherwise matched.
   */
  platform?: "windows" | "macos" | "ios" | "linux" | "android" | "chromeos";

  /**
   * The name of the browser for which the decision is valid.  If
   * undefined, the decision is valid for all browsers not otherwise matched.
   */
  browser?: "chrome" | "edge" | "firefox" | "safari" | "opera";
  /**
   * TODO: figure out how to doc this
   */
  version?: number;

  /**
   * True if webauthn should be enabled for the platform/browser,
   * false otherwise.
   */
  result: boolean;

  /** The reason we support or don't support webauthn for this platform/browser */
  reason?: string;
}


export async function canIUseWebAuthn(
  platform: Platform,
  browser: Browser
): Promise<boolean> {

  // Match platforms & browsers
  let decisions = decisionTable.filter(
    (entry) =>
      (entry.platform === platform.name || entry.platform === undefined) &&
      (entry.browser === browser.name || entry.browser === undefined)
  );

  if (decisions.length > 0) {
    // We only care about major platform versions (for now).
    // Do we have a decision for this platform/browser?
    let decision = decisions.find(
      (entry) => entry.version === platform.version[0]
    );
    if (decision) {
      return decision.result;
    }

    // Do we have a decision for any version?
    decision = decisions.find((entry) => entry.version === undefined);
    if (decision) {
      return decision.result;
    }
  }

  return true;
}
