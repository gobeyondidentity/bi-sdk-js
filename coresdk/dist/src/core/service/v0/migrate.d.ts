import { Host, ExportEvent, ImportEvent } from "../../../host";
import { Credential } from "../../../types";
export declare function export_(handle: string, onExport: (event: ExportEvent) => void, host: Host): Promise<string>;
export declare function import_(token: string, onImport: ((ev: ImportEvent) => void) | undefined, host: Host): Promise<Credential | undefined>;
export declare function cancel(): Promise<void>;
