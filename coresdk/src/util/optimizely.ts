import * as optimizelySdk from "@optimizely/optimizely-sdk";
import {Environment} from "../env";

export class Optimizely {
  /**
   * The optimizely client
   */
  client: optimizelySdk.Client;

  private constructor(client: optimizelySdk.Client) {
    this.client = client;
  }

  static async init(): Promise<Optimizely> {
    const client = optimizelySdk.createInstance({
      sdkKey: Environment.optimizelySdkKey,
    });
    const ready = await client.onReady();
    if (!ready.success) {
      throw new Error(ready.reason ?? "Optimizely error");
    }
    return new Optimizely(client);
  }

  queryFeatureFlag(
    flag: string,
    appInstanceId: string
  ): boolean {
    switch (flag) {
      case "crypto_provider_hal":
        return this.client.isFeatureEnabled(flag, appInstanceId);
      default:
        return false;
    }
  }
}

/**
 * Global opimizely instance.
 *
 * We read optimizely data in response to a synchronous host
 * callback, so we can't init optimizely & get the app instance
 * id at the point of the call (both async). So we init once at
 * startup and save the data globally.
 */
var optimizely: Optimizely | undefined = undefined;
