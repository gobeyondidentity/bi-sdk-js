
export { Host, HostEvents, ExportEvent, ImportEvent, hostCall } from "./host"

import { WebHost } from "./webHost"
import { MockHost } from "../mock/mockHost"
import { Configuration } from "../configuration";


export function createHost(config: Configuration) {
    if (config.mock) {
        if (config.mock.host) {
            if (config.mock.host instanceof Function)
                return config.mock.host();
            else 
                return new MockHost(config); 
        }
    }
    return new WebHost(config);
}