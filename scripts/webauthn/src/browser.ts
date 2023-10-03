import { Browser, PlatformName } from "./index";
import { VersionInfo, parseVersion } from "./version";

export function inferBrowser(
  versions: VersionInfo[],
  vendor: string,
  platform?: PlatformName
): Browser {
  let browser: Browser = {
    version: [0],
    versions: versions,
  };

  let version;
  if (vendor === "google inc.") {
    if (
      (version = versions.find((version) => version.name === "google chrome"))
    ) {
      browser.name = "chrome";
      browser.version = parseVersion(version.version);
    } else if (
      (version = versions.find((version) => version.name === "microsoft edge"))
    ) {
      browser.name = "edge";
      browser.version = parseVersion(version.version);
    } else if (
      (version = versions.find((version) => version.name === "opera"))
    ) {
      browser.name = "opera";
      browser.version = parseVersion(version.version);
    } else if ((version = versions.find((version) => version.name === "OPR"))) {
      browser.name = "opera";
      browser.version = parseVersion(version.version);
    }
  } else if (vendor === "apple computer, inc.") {
    if (
      platform === "macos" &&
      (version = versions.find((version) => version.name === "version"))
    ) {
      browser.name = "safari";
      browser.version = parseVersion(version.version);
    } else if (
      (version = versions.find((version) => version.name === "crios"))
    ) {
      browser.name = "chrome";
      browser.version = parseVersion(version.version);
    } else if (
      (version = versions.find((version) => version.name === "fxios"))
    ) {
      browser.name = "firefox";
      browser.version = parseVersion(version.version);
    } else if (
      (version = versions.find((version) => version.name === "edgios"))
    ) {
      browser.name = "edge";
      browser.version = parseVersion(version.version);
    }
  } else if (
    (version = versions.find((version) => version.name === "firefox"))
  ) {
    browser.name = "firefox";
    browser.version = parseVersion(version.version);
  }

  return browser;
}
