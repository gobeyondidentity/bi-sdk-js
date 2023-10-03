/// <reference types="user-agent-data-types" />

import { inferBrowser } from "./browser";
import { Browser, Platform, PlatformName, UserAgentData } from "./index";
import { VersionInfo, parseVersion } from "./version";

interface UaData {
  platform: string;
  platformVersion?: string;

  architecture?: string;
  bitness?: string;
  mobile?: boolean;
  model?: string;

  fullVersionList?: Brand[];
  brands?: Brand[];
}

interface Brand {
  brand: string;
  version: string;
}

export async function queryUserAgentData(): Promise<UserAgentData | undefined> {
  // If UserAgentData is available, we can be sure we're running on one of
  // * Chrome or Edge (or any chromium based browser)
  // * Chrome for Android
  // * Opera
  // * Opera mobile
  // https://caniuse.com/?search=useragentdata
  //
  // On chrome at least, we should ONLY use this API because they've frozen the
  // user agent strings.

  if (navigator.userAgentData) {
    let uaData: UaData = {
      platform: navigator.userAgentData.platform,
      brands: navigator.userAgentData.brands,
      mobile: navigator.userAgentData.mobile,
    };

    if (navigator.userAgentData.getHighEntropyValues) {
      try {
        // Just query for values not present in userAgentData.
        let values = await navigator.userAgentData.getHighEntropyValues([
          "platformVersion",
          "architecture",
          "bitness",
          "model",
          "fullVersionList",
        ]);

        uaData.platformVersion = values.platformVersion;
        uaData.architecture = values.architecture;
        uaData.bitness = values.bitness;
        uaData.model = values.model;
        uaData.fullVersionList = values.fullVersionList;
      } catch (_) {
        // Ignore the error & fall through
      }
    }

    let platform = getPlatform(uaData);
    let browser = getBrowser(uaData, platform.name);

    return {
      platform: platform,
      browser: browser,
      source: "client-hints",
      sourceUaData: uaData,
      sourceUaString: navigator.userAgent,
    };
  }

  return undefined;
}

function getPlatform(data: UaData): Platform {
  let platform: Platform = {
    version: [0],
  };

  switch (data.platform.toLowerCase()) {
    case "windows":
      platform.name = "windows";
      break;
    case "macos":
      platform.name = "macos";
      break;
    case "ios":
      platform.name = "ios";
      break;
    case "linux":
      platform.name = "linux";
      break;
    case "android":
      platform.name = "android";
      break;
    case "chromeos":
      platform.name = "chromeos";
      break;
    default:
      break;
  }

  if (data.platformVersion !== undefined) {
    platform.version = parseVersion(data.platformVersion);
  }

  platform.architecture = data.architecture;
  platform.bitness = data.bitness;
  platform.mobile = data.mobile;
  platform.model = data.model;

  return platform;
}

function getBrowser(data: UaData, platform?: PlatformName): Browser {
  return inferBrowser(
    data.fullVersionList?.map(
      (value) =>
        <VersionInfo>{
          name: value.brand.toLowerCase(),
          version: value.version,
        }
    ) || [],
    navigator.vendor.toLowerCase(),
    platform
  );
}
