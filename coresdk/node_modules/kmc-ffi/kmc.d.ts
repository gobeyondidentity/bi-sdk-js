/* tslint:disable */
/* eslint-disable */
/**
* @returns {Promise<any>}
*/
export function kmc_get_user_agent(): Promise<any>;
/**
* @returns {Promise<string>}
*/
export function kmc_get_app_instance_id(): Promise<string>;
/**
* @param {string | undefined} allowed_domains
* @returns {Promise<any>}
*/
export function kmc_migrate_database(allowed_domains?: string): Promise<any>;
/**
* @param {string} token
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_import(token: string, cb: Function): Promise<any>;
/**
* @param {string} url
* @param {string | undefined} allowed_domains
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_get_auth_context(url: string, allowed_domains: string | undefined, cb: Function): Promise<any>;
/**
* @param {string} url
* @param {any} cred_desc
* @param {string | undefined} allowed_domains
* @param {string} trusted_source
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_handle_url(url: string, cred_desc: any, allowed_domains: string | undefined, trusted_source: string, cb: Function): Promise<any>;
/**
* @param {string} auth_url
* @param {string} client_id
* @param {string} redirect_uri
* @param {string} scope
* @param {any} pkce_challenge
* @param {string | undefined} nonce
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_embedded_confidential_oidc(auth_url: string, client_id: string, redirect_uri: string, scope: string, pkce_challenge: any, nonce: string | undefined, cb: Function): Promise<any>;
/**
* @param {string} handle
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_export(handle: string, cb: Function): Promise<any>;
/**
* @param {string} handle
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_delete_profile(handle: string, cb: Function): Promise<any>;
/**
* @param {string} handle
* @param {string} name
* @param {string} image_url
* @param {string | undefined} enroll_uri
* @param {string | undefined} login_uri
* @param {string | undefined} desktop_login_url
* @param {string | undefined} device_gateway_url
* @param {string | undefined} migrate_addr
* @param {string | undefined} v1_api_url
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_create_profile(handle: string, name: string, image_url: string, enroll_uri: string | undefined, login_uri: string | undefined, desktop_login_url: string | undefined, device_gateway_url: string | undefined, migrate_addr: string | undefined, v1_api_url: string | undefined, cb: Function): Promise<any>;
/**
* @returns {Promise<any>}
*/
export function kmc_create_pkce(): Promise<any>;
/**
* @returns {Promise<any>}
*/
export function kmc_cancel(): Promise<any>;
/**
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_all_credentials(cb: Function): Promise<any>;
/**
* @param {string} credential_id
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_delete_credential(credential_id: string, cb: Function): Promise<any>;
/**
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_update_all_credentials(cb: Function): Promise<any>;
/**
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_list_credentials(cb: Function): Promise<any>;
/**
* @param {string} url
* @returns {any}
*/
export function kmc_url_type(url: string): any;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly kmc_get_user_agent: () => number;
  readonly kmc_get_app_instance_id: () => number;
  readonly kmc_migrate_database: (a: number) => number;
  readonly kmc_import: (a: number, b: number) => number;
  readonly kmc_get_auth_context: (a: number, b: number, c: number, d: number) => number;
  readonly kmc_handle_url: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly kmc_embedded_confidential_oidc: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly kmc_export: (a: number, b: number) => number;
  readonly kmc_delete_profile: (a: number, b: number) => number;
  readonly kmc_create_profile: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => number;
  readonly kmc_create_pkce: () => number;
  readonly kmc_cancel: () => number;
  readonly kmc_all_credentials: (a: number) => number;
  readonly kmc_delete_credential: (a: number, b: number) => number;
  readonly kmc_update_all_credentials: (a: number) => number;
  readonly kmc_list_credentials: (a: number) => number;
  readonly kmc_url_type: (a: number, b: number) => void;
  readonly ring_core_0_17_8_bn_mul_mont: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly __wbindgen_export_0: (a: number) => number;
  readonly __wbindgen_export_1: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_export_3: (a: number, b: number) => void;
  readonly __wbindgen_export_4: (a: number, b: number) => void;
  readonly __wbindgen_export_5: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_export_6: (a: number) => void;
  readonly __wbindgen_export_7: (a: number, b: number, c: number, d: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
