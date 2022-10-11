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
 * A default implementation of the Log interface that logs data to the console.
 */
export declare class ConsoleLog implements Log {
    write(...data: any): void;
}
