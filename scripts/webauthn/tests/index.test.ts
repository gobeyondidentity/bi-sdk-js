import { Browser, Decision, Platform, canIUseWebAuthn } from "../src/index";

interface TestCase {
  name: string;
  platform: Platform;
  browser: Browser;
  expected: boolean;
}

function execute(tests: TestCase[]) {
  for (let t of tests) {
    test(`WebAuthn on ${t.name} should be ${
      t.name ? "enabled" : "disabled"
    }`, async () => {
      let result = await canIUseWebAuthn(t.platform, t.browser);
      expect(result).toBe(t.expected);
    });
  }
}

describe("Generic tests", () => {
  const tests: TestCase[] = [
    {
      name: "Unknown platform, Unknown browser",
      platform: {
        version: [0],
      },
      browser: { version: [], versions: [] },
      expected: true,
    },
  ];

  execute(tests);
});

describe("Windows tests", () => {
  const tests: TestCase[] = [
    {
      name: "Windows 8.1 and prior",
      platform: {
        name: "windows",
        version: [0],
      },
      browser: { version: [], versions: [] },
      expected: false,
    },

    // Only firefox is allowed platform version 10.
    {
      name: "Firefox on Windows 10",
      platform: {
        name: "windows",
        version: [10],
      },
      browser: { name: "firefox", version: [], versions: [] },
      expected: true,
    },
    {
      name: "Edge on Windows 10",
      platform: {
        name: "windows",
        version: [10],
      },
      browser: { name: "edge", version: [], versions: [] },
      expected: false,
    },

    // Only firefox is allowed platform version 13.
    {
      name: "Firefox on Windows 11 (13)",
      platform: {
        name: "windows",
        version: [13],
      },
      browser: { name: "firefox", version: [], versions: [] },
      expected: true,
    },
    {
      name: "Any browser on Windows 11 (13)",
      platform: {
        name: "windows",
        version: [13],
      },
      browser: { version: [], versions: [] },
      expected: false,
    },

    // Only firefox is allowed platform version 14.
    {
      name: "Firefox on Windows 11 (14)",
      platform: {
        name: "windows",
        version: [13],
      },
      browser: { name: "firefox", version: [], versions: [] },
      expected: true,
    },
    {
      name: "Any browser on Windows 11 (14)",
      platform: {
        name: "windows",
        version: [13],
      },
      browser: { version: [], versions: [] },
      expected: false,
    },

    // Windows platform version 15 should all use webauthn.
    {
      name: "Chrome on Windows 11 (15)",
      platform: {
        name: "windows",
        version: [15],
      },
      browser: { name: "chrome", version: [], versions: [] },
      expected: true,
    },
    {
      name: "Firefox on Windows 11 (15)",
      platform: {
        name: "windows",
        version: [15],
      },
      browser: { name: "firefox", version: [], versions: [] },
      expected: true,
    },
    {
      name: "Chrome on Windows 11 (15)",
      platform: {
        name: "windows",
        version: [15],
      },
      browser: { version: [], versions: [] },
      expected: true,
    },
  ];

  execute(tests);
});

describe("Windows tests", () => {
  const tests: TestCase[] = [
    // MacOS prior to Monterey. Support is unclear.
    {
      name: "Any browser on MacOs prior to Monterey (12)",
      platform: {
        name: "macos",
        version: [3],
      },
      browser: { version: [], versions: [] },
      expected: false,
    },

    // MacOS Monterey (safari versions don't matter)
    {
      name: "Safari on MacOs Monterey (12)",
      platform: {
        name: "macos",
        version: [12],
      },
      browser: { name: "safari", version: [], versions: [] },
      expected: false,
    },
    {
      name: "Chrome on MacOS Monterey (12)",
      platform: {
        name: "macos",
        version: [12],
      },
      browser: { name: "chrome", version: [], versions: [] },
      expected: true,
    },

    // MacOS Ventura (safari versions don't matter)
    {
      name: "Safari on MacOs Ventura (13)",
      platform: {
        name: "macos",
        version: [13],
      },
      browser: { name: "safari", version: [], versions: [] },
      expected: false,
    },
    {
      name: "Chrome on MacOs Ventura (13)",
      platform: {
        name: "macos",
        version: [13],
      },
      browser: { name: "chrome", version: [], versions: [] },
      expected: true,
    },
  ];

  execute(tests);
});

describe("iOS tests", () => {
  const tests: TestCase[] = [
    {
      name: "Any browser on any iOS version",
      platform: {
        name: "ios",
        version: [99],
      },
      browser: { version: [], versions: [] },
      expected: false,
    },
  ];

  execute(tests);
});

describe("iOS tests", () => {
  const tests: TestCase[] = [
    {
      name: "Any browser on any iOS version",
      platform: {
        name: "ios",
        version: [99],
      },
      browser: { version: [], versions: [] },
      expected: false,
    },
  ];

  execute(tests);
});

describe("Android tests", () => {
  const tests: TestCase[] = [
    {
      name: "Firefox on Android",
      platform: {
        name: "android",
        version: [12],
      },
      browser: { name: "firefox", version: [], versions: [] },
      expected: false,
    },

    // TODO: these should all be false, as they all use google password manager.
    {
      name: "Any brower on Android",
      platform: {
        name: "android",
        version: [12],
      },
      browser: { version: [], versions: [] },
      expected: true,
    },
  ];

  execute(tests);
});
