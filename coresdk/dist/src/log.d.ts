/**
 * Interface by which the host will be notified to log data.
 */
export interface Log {
    /**
     * Called by the host to log data.
     * @param data values to be logged, typically a string.
     */
    write(...data: any): void;
}
/**
 * The default implementatino of the Log interface.
 * Data is logged to the debug console.
 */
export declare class ConsoleLog implements Log {
    write(...data: any): void;
}
