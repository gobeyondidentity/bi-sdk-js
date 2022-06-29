
export * as Types from "./types";
export * as CoreMessage from "./coreMessage";
export * as HostMessage from "./hostMessage";


import { Host } from "../host";
import { CoreResponse, CoreResult } from "./coreMessage";
import { HostRequest } from "./hostMessage";

type Message = CoreResponse | CoreResult | HostRequest;

/** 
 * Returns the type the request/response type from the interface.
*/
export function messageType(msg: Message): string {
    if (typeof msg === "string") 
        return msg;
    else 
        return Object.keys(<any>msg)[0];
}

function ok(res: CoreResult): res is {"Ok": CoreResponse} {
    return messageType(res) == "Ok";
}

/**
 * Writes a core result as a JSON string.
 * @param res The result to be serialized.
 * @returns 
 */
export function writeResponse(res: CoreResult): string {
    return JSON.stringify(res);
}

/**
 * Parses a host request from a JSON string
 * @param req the request to parse. 
 */
export function readRequest(req: string): HostRequest {
    return <HostRequest>JSON.parse(req);
}
