type Channel = "devel" | "rolling" | "staging" | "production";

declare const CHANNEL: Channel;
declare const DEVICE_GATEWAY_URL: string;
declare const OPTIMIZELY_SDK_KEY: string;

/**
 * Environmental parameters defined at build time
 */
export const Environment = new (class {
  /**
   * devel, rolling, staging, prod
   */
  channel: Channel;

  /**
   * The device gateway URL
   */
  deviceGatewayUrl: string;

  /**
   * Optimizely key
   */
  optimizelySdkKey: string;

  constructor() {
    this.channel = CHANNEL ?? "devel";
    this.deviceGatewayUrl = DEVICE_GATEWAY_URL ?? "http://dockerhost:8008";
    this.optimizelySdkKey = OPTIMIZELY_SDK_KEY ?? "";
  }
})();
