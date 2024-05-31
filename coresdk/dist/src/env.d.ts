type Channel = "devel" | "rolling" | "staging" | "production";
/**
 * Environmental parameters defined at build time
 */
export declare const Environment: {
    /**
     * devel, rolling, staging, prod
     */
    channel: Channel;
    /**
     * The device gateway URL
     */
    deviceGatewayUrl: string;
};
export {};
