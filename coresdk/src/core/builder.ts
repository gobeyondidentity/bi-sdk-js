import { Core } from "./core";
import { Configuration } from "../configuration";
import { Log } from "../log";
import init from "kmc-ffi";

/**
 * CoreBuilder is a wrapper around `CoreConfig` with a "fluent" interface.
 */
export class CoreBuilder {
  config: Configuration;

  constructor() {
    this.config = new Configuration();
  }

  log(log?: Log): CoreBuilder {
    this.config.log = log;
    return this;
  }

  allowedDomains(allowedDomains?: string): CoreBuilder {
    this.config.allowedDomains = allowedDomains;
    return this;
  }

  /**
   * Construct the `Core`.
   * @returns `Core`
   */
  async build(): Promise<Core> {
    await init();
    return await Core.init(this.config);
  }
}
