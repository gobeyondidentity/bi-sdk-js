import * as optimizelySdk from "@optimizely/optimizely-sdk";
export declare class Optimizely {
    /**
     * The optimizely client
     */
    client: optimizelySdk.Client;
    private constructor();
    static init(): Promise<Optimizely>;
    queryFeatureFlag(flag: string, appInstanceId: string): boolean;
}
