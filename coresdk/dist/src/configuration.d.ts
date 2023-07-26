import { Log } from "./log";
/**
 * The configuration supplied to Core.
 */
export declare class Configuration {
    /**
     * The logging facility. Defaults to `ConsoleLog`.
     */
    log?: Log;
    /**
     * Domains trusted by Core. A comma separated list of domains.
     *
     * If Core is required to make an
     * API call, the domain of the called API must be present
     * in this list.
     */
    allowedDomains?: string;
}
