/**
 * This is a version string taken directly from the platformVersion
 * field in UserAgentData, or the version info parsed from the UserAgent
 * string and split by '.' so that the first entry should be the major version
 * number.
 *
 * If no version numbers can be parsed from the string then this value receives
 * a value of `[0]`.
 */
export type Version = number[];

export function parseVersion(versionString: string): Version {
  let parts = versionString
    .split(".")
    .map((part) => parseInt(part.trim()))
    .filter((part) => !isNaN(part));
  return parts.length > 0 ? parts : [0];
}

/**
 * A product (or brand) & version derived from UserAgentData or parsed from the User Agent
 * String.
 */
export interface VersionInfo {
  /**
   * The given or parsed name
   */
  name: string;
  /**
   * The given or parsed version
   */
  version: string;
}
