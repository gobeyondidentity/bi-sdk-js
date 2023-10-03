import { inferBrowser } from "./browser";
import {
  Browser,
  Platform,
  PlatformName,
  UserAgentData,
} from "./index";
import { VersionInfo, parseVersion } from "./version";

/**
 * The navigator's user agent string and other data used to
 * determine the browser.
 */
interface NavigatorInfo {
  userAgent: string;
  vendor: string;
}

export function parseUserAgent(): UserAgentData {
  return UaParser.parse({
    userAgent: navigator.userAgent,
    vendor: navigator.vendor,
  });
}

let parsers: UaParser[] = [];

class UaParser {
  private _init?: RegExp;

  // Platform extractors
  private _windows?: RegExp;
  private _android?: RegExp;
  private _iphone?: RegExp;
  private _ipad?: RegExp;
  private _macos?: RegExp;
  private _linux?: RegExp;
  private _chromeos?: RegExp;
  private _brands?: RegExp;

  private get init(): RegExp {
    if (this._init === undefined) {
      this._init = /\(([^)]+)\)?/g;
    }
    return this._init;
  }

  private get windows(): RegExp {
    if (this._windows === undefined) {
      this._windows = /windows nt (\d+(\.\d+)*)/;
    }
    return this._windows;
  }

  private get android(): RegExp {
    if (this._android === undefined) {
      this._android = /android (\d+(\.\d+)*)/;
    }
    return this._android;
  }

  private get iphone(): RegExp {
    if (this._iphone === undefined) {
      this._iphone = /(iphone|ipod touch); cpu iphone os (\d+(_\d+)*)/;
    }
    return this._iphone;
  }

  private get ipad(): RegExp {
    if (this._ipad === undefined) {
      this._ipad = /(ipad); cpu os (\d+(_\d+)*)/;
    }
    return this._ipad;
  }

  private get macos(): RegExp {
    if (this._macos === undefined) {
      this._macos = /macintosh; (intel|\w+) mac os x (\d+(_\d+)*)/;
    }
    return this._macos;
  }

  private get linux(): RegExp {
    if (this._linux === undefined) {
      this._linux = /linux/;
    }
    return this._linux;
  }

  private get chromeos(): RegExp {
    if (this._chromeos === undefined) {
      this._chromeos = /cros (\w+) (\d+(\.\d+)*)/;
    }
    return this._chromeos;
  }

  private get brands(): RegExp {
    if (this._brands === undefined) {
      this._brands = /([\w\-\s]+)\/(\d+(\.\d+)*)/;
    }
    return this._brands;
  }

  navigator: NavigatorInfo = { userAgent: "", vendor: "" };

  platform: string = "";
  versions: string = "";

  static parse(info: NavigatorInfo): UserAgentData {
    // Acquire the existing (or new) parser.
    // Derived from here:
    // https://gist.github.com/fuweichin/18522d21d3cd947026c2819bda25e0a6

    // TODO: a singleton might be sufficient since this function is not async.
    // Perhaps we should be caching the result?
    let parser = parsers.pop();
    if (parser === undefined) {
      parser = new UaParser();
    }

    // Parse the data
    let data = parser.update({
      userAgent: info.userAgent.toLowerCase(),
      vendor: info.vendor.toLowerCase(),
    });

    // Reset & return the parser to the pool.
    parser.reset();
    parsers.push(parser);

    return data;
  }

  private update(navigator: NavigatorInfo): UserAgentData {
    this.navigator = navigator;

    let ua = this.navigator.userAgent;
    this.versions = ua.replace(this.init, (_, platform) => {
      if (this.platform.length == 0) {
        this.platform = platform;
      }
      return "";
    });

    console.log(this.versions);

    let platform = this.parsePlatform();
    platform.mobile = ua.indexOf("mobile") !== -1; // this is kind of a crappy test.

    let browser = this.parseBrowser(platform.name);

    return {
      platform: platform,
      browser: browser,
      source: "user-agent",
      sourceUaString: this.navigator.userAgent,
    };
  }

  private reset() {
    [
      this._init,
      this._windows,
      this._android,
      this._iphone,
      this._ipad,
      this._macos,
      this._linux,
    ].forEach((item) => {
      if (item !== undefined) {
        item.lastIndex = 0;
      }
    });

    this.navigator = { userAgent: "", vendor: "" };

    this.platform = "";
    this.versions = "";
  }

  parsePlatform(): Platform {
    // TODO: format version numbers to be consistent with values
    // returned by client hints api.
    // TODO: parse arch, bitness for various platforms.
    // TODO: reorder by popularity where possible.
    // TODO: model?

    let platform: Platform;
    let match;
    if ((match = this.windows.exec(this.platform))) {
      platform = this.parseWindows(match[1]);
    } else if ((match = this.android.exec(this.platform))) {
      platform = this.parseAndroid(match[1]);
    } else if ((match = this.iphone.exec(this.platform))) {
      platform = this.parseIos(match[2]);
    } else if ((match = this.ipad.exec(this.platform))) {
      platform = this.parseIos(match[2]);
    } else if ((match = this.macos.exec(this.platform))) {
      platform = this.parseMacos(match[2]);
    } else if ((match = this.linux.exec(this.platform)) !== null) {
      platform = this.parseLinux();
    } else if ((match = this.chromeos.exec(this.platform)) !== null) {
      platform = this.parseChromeos(match[2]);
    } else {
      platform = { version: [0] };
    }

    return {
      name: platform.name,
      version: platform.version,
      architecture: platform.architecture,
      bitness: platform.bitness,
    };
  }

  parseWindows(version: string): Platform {
    if (version === "10.0") {
      // Only Windows 10 is reported via this mechanism.
      // Assign platform version to 10.0 because we have to
      // way to figure out a more precise number.
      version = "10.0.0";
    } else {
      // All other versions of Windows have a platform version
      // of 0.0.
      version = "0.0.0";
    }

    let architecture: string | undefined = undefined;
    let bitness: string | undefined = undefined;

    // Try to parse the architecture &B bitness from the remaining
    // platform string.
    let parts = this.platform
      .split(";")
      .map((part) => part.trim())
      .filter((part) => part.length > 0);
    if (
      parts.find(
        (part) => part === "win64" || part === "win64" || part === "x64"
      )
    ) {
      architecture = "x86";
      bitness = "64";
    } else if (parts.find((part) => part === "arm64")) {
      architecture = "arm";
      bitness = "64";
    } else if (parts.find((part) => part === "arm32")) {
      architecture = "arm";
      bitness = "32";
    }

    return {
      name: "windows",
      version: parseVersion(version),
      architecture: architecture,
      bitness: bitness,
    };
  }

  parseAndroid(version: string): Platform {
    // TODO: Arch, bitness
    return {
      name: "android",
      version: parseVersion(version),
    };
  }

  parseIos(version: string): Platform {
    // TODO: Arch, bitness
    return {
      name: "ios",
      version: parseVersion(version.replaceAll("_", ".")),
    };
  }

  parseMacos(version: string): Platform {
    // TODO: Arch, bitness
    return {
      name: "macos",
      version: parseVersion(version.replaceAll("_", ".")),
    };
  }

  parseLinux(): Platform {
    // TODO: Version, Arch, bitness
    return {
      name: "linux",
      version: [0],
    };
  }

  parseChromeos(version: string): Platform {
    return {
      name: "chromeos",
      version: [0],
    };
  }

  parseBrowser(platform?: PlatformName): Browser {
    // Split the version string into a variation of UserAgentData's
    // fullVersionList.
    let versions = this.versions
      .split(" ")
      .map((value) => value.trim())
      .filter((value) => value.length > 0)
      .map((value) => this.brands.exec(value))
      .map((value) => {
        if (value && value[1] && value[2]) {
          return <VersionInfo>{
            name: value[1],
            version: value[2],
          };
        } else {
          return <VersionInfo>{
            name: "",
            version: "0",
          };
        }
      })
      .filter((value) => value.name !== "");

    return inferBrowser(versions, this.navigator.vendor, platform);
  }
}
