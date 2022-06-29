export * as Types from "./types";
export * as CoreMessage from "./coreMessage";
export * as HostMessage from "./hostMessage";
import { CoreResponse, CoreResult } from "./coreMessage";
import { HostRequest } from "./hostMessage";
declare type Message = CoreResponse | CoreResult | HostRequest;
/**
 * Returns the type the request/response type from the interface.
*/
export declare function messageType(msg: Message): string;
/**
 * Writes a core result as a JSON string.
 * @param res The result to be serialized.
 * @returns
 */
export declare function writeResponse(res: CoreResult): string;
/**
 * Parses a host request from a JSON string
 * @param req the request to parse.
 */
export declare function readRequest(req: string): HostRequest;
