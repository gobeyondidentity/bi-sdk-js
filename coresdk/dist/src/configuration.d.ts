import { Log } from "./log";
import { MockConfiguration } from "./mock";
/**
 * TODO: Doc
 */
export declare class Configuration {
    /**
     * Assigning this to `{}` will create the mock environmnent.
     * TODO: Assign to something like `{ auth: {...}, }` to
     * mock specific flows.
     */
    mock?: MockConfiguration;
    /**
     * The logging facility. Defaults to `ConsoleLog`.
     */
    log?: Log;
    allowedDomains?: string;
}
