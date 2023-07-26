import { Core } from "./core";
import { Configuration } from "../configuration";
import { Log } from "../log";
/**
 * CoreBuilder is a wrapper around `CoreConfig` with a "fluent" interface.
 */
export declare class CoreBuilder {
    config: Configuration;
    constructor();
    log(log?: Log): CoreBuilder;
    allowedDomains(allowedDomains?: string): CoreBuilder;
    /**
     * Construct the `Core`.
     * @returns `Core`
     */
    build(): Promise<Core>;
}
