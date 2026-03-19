/* tslint:disable */
/* eslint-disable */

/**
 * Runtime test harness support instantiated in JS.
 *
 * The node.js entry script instantiates a `Context` here which is used to
 * drive test execution.
 */
export class WasmBindgenTestContext {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Handle filter argument.
     */
    filtered_count(filtered: number): void;
    /**
     * Handle `--include-ignored` flag.
     */
    include_ignored(include_ignored: boolean): void;
    /**
     * Creates a new context ready to run tests.
     *
     * A `Context` is the main structure through which test execution is
     * coordinated, and this will collect output and results for all executed
     * tests.
     */
    constructor(is_bench: boolean);
    /**
     * Executes a list of tests, returning a promise representing their
     * eventual completion.
     *
     * This is the main entry point for executing tests. All the tests passed
     * in are the JS `Function` object that was plucked off the
     * `WebAssembly.Instance` exports list.
     *
     * The promise returned resolves to either `true` if all tests passed or
     * `false` if at least one test failed.
     */
    run(tests: any[]): Promise<any>;
}

/**
 * Used to read benchmark data, and then the runner stores it on the local disk.
 */
export function __wbgbench_dump(): Uint8Array | undefined;

/**
 * Used to write previous benchmark data before the benchmark, for later comparison.
 */
export function __wbgbench_import(baseline: Uint8Array): void;

/**
 * Handler for `console.debug` invocations. See above.
 */
export function __wbgtest_console_debug(args: Array<any>): void;

/**
 * Handler for `console.error` invocations. See above.
 */
export function __wbgtest_console_error(args: Array<any>): void;

/**
 * Handler for `console.info` invocations. See above.
 */
export function __wbgtest_console_info(args: Array<any>): void;

/**
 * Handler for `console.log` invocations.
 *
 * If a test is currently running it takes the `args` array and stringifies
 * it and appends it to the current output of the test. Otherwise it passes
 * the arguments to the original `console.log` function, psased as
 * `original`.
 */
export function __wbgtest_console_log(args: Array<any>): void;

/**
 * Handler for `console.warn` invocations. See above.
 */
export function __wbgtest_console_warn(args: Array<any>): void;

export function __wbgtest_cov_dump(): Uint8Array | undefined;

/**
 * Path to use for coverage data.
 */
export function __wbgtest_coverage_path(env: string | null | undefined, pid: number, temp_dir: string, module_signature: bigint): string;

export function __wbgtest_module_signature(): bigint | undefined;

export function kmc_all_credentials(cb: Function): Promise<any>;

export function kmc_cancel(): Promise<any>;

export function kmc_create_pkce(): Promise<any>;

export function kmc_create_profile(handle: string, name: string, image_url: string, enroll_uri: string | null | undefined, login_uri: string | null | undefined, desktop_login_url: string | null | undefined, device_gateway_url: string | null | undefined, migrate_addr: string | null | undefined, v1_api_url: string | null | undefined, cb: Function): Promise<any>;

export function kmc_delete_credential(credential_id: string, cb: Function): Promise<any>;

declare function kmc_delete_profile2(handle: string, cb: Function): Promise<any>;
export { kmc_delete_profile2 as kmc_delete_profile }

export function kmc_embedded_confidential_oidc(auth_url: string, client_id: string, redirect_uri: string, scope: string, pkce_challenge: any, nonce: string | null | undefined, cb: Function): Promise<any>;

export function kmc_export(handle: string, cb: Function): Promise<any>;

export function kmc_get_app_instance_id(): Promise<string>;

export function kmc_get_auth_context(url: string, allowed_domains: string | null | undefined, cb: Function): Promise<any>;

declare function kmc_get_user_agent2(): Promise<any>;
export { kmc_get_user_agent2 as kmc_get_user_agent }

export function kmc_handle_url(url: string, cred_desc: any, allowed_domains: string | null | undefined, trusted_source: string, cb: Function): Promise<any>;

export function kmc_import(token: string, cb: Function): Promise<any>;

export function kmc_list_credentials(cb: Function): Promise<any>;

export function kmc_migrate_database(allowed_domains?: string | null): Promise<any>;

export function kmc_update_all_credentials(cb: Function): Promise<any>;

export function kmc_url_type(url: string): any;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly kmc_all_credentials: (a: number) => number;
    readonly kmc_cancel: () => number;
    readonly kmc_create_pkce: () => number;
    readonly kmc_create_profile: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
    readonly kmc_delete_credential: (a: number, b: number) => number;
    readonly kmc_delete_profile: (a: number, b: number) => number;
    readonly kmc_embedded_confidential_oidc: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
    readonly kmc_export: (a: number, b: number) => number;
    readonly kmc_get_app_instance_id: () => number;
    readonly kmc_get_auth_context: (a: number, b: number, c: number, d: number) => number;
    readonly kmc_get_user_agent: () => number;
    readonly kmc_handle_url: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly kmc_import: (a: number, b: number) => number;
    readonly kmc_list_credentials: (a: number) => number;
    readonly kmc_migrate_database: (a: number) => number;
    readonly kmc_update_all_credentials: (a: number) => number;
    readonly kmc_url_type: (a: number, b: number) => void;
    readonly __wbg_wasmbindgentestcontext_free: (a: number, b: number) => void;
    readonly __wbgbench_dump: (a: number) => void;
    readonly __wbgbench_import: (a: number, b: number) => void;
    readonly __wbgtest_console_debug: (a: number) => void;
    readonly __wbgtest_console_error: (a: number) => void;
    readonly __wbgtest_console_info: (a: number) => void;
    readonly __wbgtest_console_log: (a: number) => void;
    readonly __wbgtest_console_warn: (a: number) => void;
    readonly __wbgtest_cov_dump: (a: number) => void;
    readonly __wbgtest_coverage_path: (a: number, b: number, c: number, d: number, e: number, f: number, g: bigint) => void;
    readonly __wbgtest_module_signature: (a: number) => void;
    readonly wasmbindgentestcontext_filtered_count: (a: number, b: number) => void;
    readonly wasmbindgentestcontext_include_ignored: (a: number, b: number) => void;
    readonly wasmbindgentestcontext_new: (a: number) => number;
    readonly wasmbindgentestcontext_run: (a: number, b: number, c: number) => number;
    readonly ring_core_0_17_14__bn_mul_mont: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly __wasm_bindgen_func_elem_20775: (a: number, b: number) => void;
    readonly __wasm_bindgen_func_elem_20967: (a: number, b: number) => void;
    readonly __wasm_bindgen_func_elem_22529: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly __wasm_bindgen_func_elem_22494: (a: number, b: number, c: number, d: number) => void;
    readonly __wasm_bindgen_func_elem_22499: (a: number, b: number, c: number, d: number) => void;
    readonly __wasm_bindgen_func_elem_20786: (a: number, b: number) => void;
    readonly __wbindgen_export: (a: number, b: number) => number;
    readonly __wbindgen_export2: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_export3: (a: number) => void;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
    readonly __wbindgen_export4: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
