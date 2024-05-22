import { Host } from "./host";
export interface ExportEvent {
    type: "started" | "timeout" | "requestReceived" | "failed" | "cancelled";
    data: string | Map<string, Uint8Array> | Error | undefined;
}
export interface ImportEvent {
    type: "started" | "manifestsReceived" | "requestsToSign" | "receivedSigned" | "failed" | "cancelled";
    data: string | Map<string, Uint8Array> | Error | undefined;
}
/**
 * Host events provide a mechanism to notify the UI about
 * certain events that require interaction, or just an
 * updated screen.
 */
export interface HostEvents {
    onexport?: (this: Host, ev: ExportEvent) => void;
    onimport?: (this: Host, ev: ImportEvent) => void;
    onSelectCredentialV1?: (credentials: Credential[]) => Promise<string | undefined>;
}
