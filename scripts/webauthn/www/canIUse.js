// src/version.ts
function parseVersion(versionString) {
  let parts = versionString.split(".").map((part) => parseInt(part.trim())).filter((part) => !isNaN(part));
  return parts.length > 0 ? parts : [0];
}

// src/browser.ts
function inferBrowser(versions, vendor, platform) {
  let browser = {
    version: [0],
    versions
  };
  let version;
  if (vendor === "google inc.") {
    if (version = versions.find((version2) => version2.name === "google chrome")) {
      browser.name = "chrome";
      browser.version = parseVersion(version.version);
    } else if (version = versions.find((version2) => version2.name === "microsoft edge")) {
      browser.name = "edge";
      browser.version = parseVersion(version.version);
    } else if (version = versions.find((version2) => version2.name === "opera")) {
      browser.name = "opera";
      browser.version = parseVersion(version.version);
    } else if (version = versions.find((version2) => version2.name === "OPR")) {
      browser.name = "opera";
      browser.version = parseVersion(version.version);
    }
  } else if (vendor === "apple computer, inc.") {
    if (platform === "macos" && (version = versions.find((version2) => version2.name === "version"))) {
      browser.name = "safari";
      browser.version = parseVersion(version.version);
    } else if (version = versions.find((version2) => version2.name === "crios")) {
      browser.name = "chrome";
      browser.version = parseVersion(version.version);
    } else if (version = versions.find((version2) => version2.name === "fxios")) {
      browser.name = "firefox";
      browser.version = parseVersion(version.version);
    } else if (version = versions.find((version2) => version2.name === "edgios")) {
      browser.name = "edge";
      browser.version = parseVersion(version.version);
    }
  } else if (version = versions.find((version2) => version2.name === "firefox")) {
    browser.name = "firefox";
    browser.version = parseVersion(version.version);
  }
  return browser;
}

// src/userAgent.ts
function parseUserAgent() {
  return UaParser.parse({
    userAgent: navigator.userAgent,
    vendor: navigator.vendor
  });
}
var parsers = [];
var UaParser = class _UaParser {
  constructor() {
    this.navigator = { userAgent: "", vendor: "" };
    this.platform = "";
    this.versions = "";
  }
  get init() {
    if (this._init === void 0) {
      this._init = /\(([^)]+)\)?/g;
    }
    return this._init;
  }
  get windows() {
    if (this._windows === void 0) {
      this._windows = /windows nt (\d+(\.\d+)*)/;
    }
    return this._windows;
  }
  get android() {
    if (this._android === void 0) {
      this._android = /android (\d+(\.\d+)*)/;
    }
    return this._android;
  }
  get iphone() {
    if (this._iphone === void 0) {
      this._iphone = /(iphone|ipod touch); cpu iphone os (\d+(_\d+)*)/;
    }
    return this._iphone;
  }
  get ipad() {
    if (this._ipad === void 0) {
      this._ipad = /(ipad); cpu os (\d+(_\d+)*)/;
    }
    return this._ipad;
  }
  get macos() {
    if (this._macos === void 0) {
      this._macos = /macintosh; (intel|\w+) mac os x (\d+(_\d+)*)/;
    }
    return this._macos;
  }
  get linux() {
    if (this._linux === void 0) {
      this._linux = /linux/;
    }
    return this._linux;
  }
  get chromeos() {
    if (this._chromeos === void 0) {
      this._chromeos = /cros (\w+) (\d+(\.\d+)*)/;
    }
    return this._chromeos;
  }
  get brands() {
    if (this._brands === void 0) {
      this._brands = /([\w\-\s]+)\/(\d+(\.\d+)*)/;
    }
    return this._brands;
  }
  static parse(info) {
    let parser = parsers.pop();
    if (parser === void 0) {
      parser = new _UaParser();
    }
    let data = parser.update({
      userAgent: info.userAgent.toLowerCase(),
      vendor: info.vendor.toLowerCase()
    });
    parser.reset();
    parsers.push(parser);
    return data;
  }
  update(navigator2) {
    this.navigator = navigator2;
    let ua = this.navigator.userAgent;
    this.versions = ua.replace(this.init, (_, platform2) => {
      if (this.platform.length == 0) {
        this.platform = platform2;
      }
      return "";
    });
    console.log(this.versions);
    let platform = this.parsePlatform();
    platform.mobile = ua.indexOf("mobile") !== -1;
    let browser = this.parseBrowser(platform.name);
    return {
      platform,
      browser,
      source: "user-agent",
      sourceUaString: this.navigator.userAgent
    };
  }
  reset() {
    [
      this._init,
      this._windows,
      this._android,
      this._iphone,
      this._ipad,
      this._macos,
      this._linux
    ].forEach((item) => {
      if (item !== void 0) {
        item.lastIndex = 0;
      }
    });
    this.navigator = { userAgent: "", vendor: "" };
    this.platform = "";
    this.versions = "";
  }
  parsePlatform() {
    let platform;
    let match;
    if (match = this.windows.exec(this.platform)) {
      platform = this.parseWindows(match[1]);
    } else if (match = this.android.exec(this.platform)) {
      platform = this.parseAndroid(match[1]);
    } else if (match = this.iphone.exec(this.platform)) {
      platform = this.parseIos(match[2]);
    } else if (match = this.ipad.exec(this.platform)) {
      platform = this.parseIos(match[2]);
    } else if (match = this.macos.exec(this.platform)) {
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
      bitness: platform.bitness
    };
  }
  parseWindows(version) {
    if (version === "10.0") {
      version = "10.0.0";
    } else {
      version = "0.0.0";
    }
    let architecture = void 0;
    let bitness = void 0;
    let parts = this.platform.split(";").map((part) => part.trim()).filter((part) => part.length > 0);
    if (parts.find(
      (part) => part === "win64" || part === "win64" || part === "x64"
    )) {
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
      architecture,
      bitness
    };
  }
  parseAndroid(version) {
    return {
      name: "android",
      version: parseVersion(version)
    };
  }
  parseIos(version) {
    return {
      name: "ios",
      version: parseVersion(version.replaceAll("_", "."))
    };
  }
  parseMacos(version) {
    return {
      name: "macos",
      version: parseVersion(version.replaceAll("_", "."))
    };
  }
  parseLinux() {
    return {
      name: "linux",
      version: [0]
    };
  }
  parseChromeos(version) {
    return {
      name: "chromeos",
      version: [0]
    };
  }
  parseBrowser(platform) {
    let versions = this.versions.split(" ").map((value) => value.trim()).filter((value) => value.length > 0).map((value) => this.brands.exec(value)).map((value) => {
      if (value && value[1] && value[2]) {
        return {
          name: value[1],
          version: value[2]
        };
      } else {
        return {
          name: "",
          version: "0"
        };
      }
    }).filter((value) => value.name !== "");
    return inferBrowser(versions, this.navigator.vendor, platform);
  }
};

// src/userAgentData.ts
async function queryUserAgentData() {
  if (navigator.userAgentData) {
    let uaData = {
      platform: navigator.userAgentData.platform,
      brands: navigator.userAgentData.brands,
      mobile: navigator.userAgentData.mobile
    };
    if (navigator.userAgentData.getHighEntropyValues) {
      try {
        let values = await navigator.userAgentData.getHighEntropyValues([
          "platformVersion",
          "architecture",
          "bitness",
          "model",
          "fullVersionList"
        ]);
        uaData.platformVersion = values.platformVersion;
        uaData.architecture = values.architecture;
        uaData.bitness = values.bitness;
        uaData.model = values.model;
        uaData.fullVersionList = values.fullVersionList;
      } catch (_) {
      }
    }
    let platform = getPlatform(uaData);
    let browser = getBrowser(uaData, platform.name);
    return {
      platform,
      browser,
      source: "client-hints",
      sourceUaData: uaData,
      sourceUaString: navigator.userAgent
    };
  }
  return void 0;
}
function getPlatform(data) {
  let platform = {
    version: [0]
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
  if (data.platformVersion !== void 0) {
    platform.version = parseVersion(data.platformVersion);
  }
  platform.architecture = data.architecture;
  platform.bitness = data.bitness;
  platform.mobile = data.mobile;
  platform.model = data.model;
  return platform;
}
function getBrowser(data, platform) {
  return inferBrowser(
    data.fullVersionList?.map(
      (value) => ({
        name: value.brand.toLowerCase(),
        version: value.version
      })
    ) || [],
    navigator.vendor.toLowerCase(),
    platform
  );
}

// src/webauthn.json
var webauthn_default = [
  { platform: "windows", result: false, reason: "Windows 10 and previous cannot use WebAuthn." },
  { platform: "windows", version: 10, browser: "firefox", result: true, reason: "Firefox on Windows 10 MAY use WebAuthn." },
  { platform: "windows", version: 13, browser: "firefox", result: true, reason: "Firefox on Windows 11 (13) MAY use WebAuthn." },
  { platform: "windows", version: 14, browser: "firefox", result: true, reason: "Firefox on Windows 11 (14) MAY use WebAuthn." },
  { platform: "windows", version: 15, result: true, reason: "All browsers on Windows 11 (15) support WebAuthn. " },
  { platform: "macos", result: false, reason: "Browsers MacOS prior to Monterey (12) do not support WebAuthn using a platform authenticator." },
  { platform: "macos", version: 12, browser: "safari", result: false, reason: "Safari on MacOS Monterey (12) requires user interaction to invoke WebAuthn APIs, which is incompatible with how Beyond Identity uses WebAuthn." },
  { platform: "macos", version: 12, result: true },
  { platform: "macos", version: 13, browser: "safari", result: false, reason: "Safari on MacOS Ventura (13) requires a user to enable iCloud Keychain, which cannot, in general, be done with a managed AppleId." },
  { platform: "macos", version: 13, result: true },
  { platform: "ios", result: false, reason: "Browsers on iOS devices requires a user to enable iCloud Keychain, which cannot, in general, be done with a managed AppleId." },
  { platform: "android", browser: "firefox", result: false },
  { platform: "android", result: true }
];

// src/index.ts
var decisionTable = [...webauthn_default];
async function collectEvidence() {
  const ua = await getUserAgentData();
  const hasUVPA = window.PublicKeyCredential ? await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable() : void 0;
  return {
    userAgent: ua,
    hasUVPA
  };
}
async function getUserAgentData() {
  let data;
  if ((data = await queryUserAgentData()) === void 0) {
    data = parseUserAgent();
  }
  return data;
}
async function canIUseWebAuthn(platform, browser) {
  let decisions = decisionTable.filter(
    (entry) => (entry.platform === platform.name || entry.platform === void 0) && (entry.browser === browser.name || entry.browser === void 0)
  );
  if (decisions.length > 0) {
    let decision = decisions.find(
      (entry) => entry.version === platform.version[0]
    );
    if (decision) {
      return decision.result;
    }
    decision = decisions.find((entry) => entry.version === void 0);
    if (decision) {
      return decision.result;
    }
  }
  return true;
}
export {
  canIUseWebAuthn,
  collectEvidence
};
