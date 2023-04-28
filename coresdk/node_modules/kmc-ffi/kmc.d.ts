/* tslint:disable */
/* eslint-disable */
/**
* Returns the type of the key, "webauthn" or "subtle" for a specified credential.
* @param {string} handle
* @returns {Promise<any>}
*/
export function kmc_get_key_type(handle: string): Promise<any>;
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
* @param {string} _token
* @param {Function} _cb
* @returns {Promise<any>}
*/
export function kmc_import(_token: string, _cb: Function): Promise<any>;
/**
* @param {string} url
* @param {string | undefined} credential_id
* @param {string | undefined} allowed_domains
* @param {string} trusted_source
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_handle_url(url: string, credential_id: string | undefined, allowed_domains: string | undefined, trusted_source: string, cb: Function): Promise<any>;
/**
* @param {string} _auth_url
* @param {string} _token_url
* @param {string} _client_id
* @param {string} _redirect_uri
* @param {string | undefined} _nonce
* @param {Function} _cb
* @returns {Promise<any>}
*/
export function kmc_embedded_public_oidc(_auth_url: string, _token_url: string, _client_id: string, _redirect_uri: string, _nonce: string | undefined, _cb: Function): Promise<any>;
/**
* @param {string} _auth_url
* @param {string} _client_id
* @param {string} _redirect_uri
* @param {string} _scope
* @param {any} _pkce_challenge
* @param {string | undefined} _nonce
* @param {Function} _cb
* @returns {Promise<any>}
*/
export function kmc_embedded_confidential_oidc(_auth_url: string, _client_id: string, _redirect_uri: string, _scope: string, _pkce_challenge: any, _nonce: string | undefined, _cb: Function): Promise<any>;
/**
* @param {string} _handle
* @param {Function} _cb
* @returns {Promise<any>}
*/
export function kmc_export(_handle: string, _cb: Function): Promise<any>;
/**
* @param {string} _handle
* @param {Function} _cb
* @returns {Promise<any>}
*/
export function kmc_delete_profile(_handle: string, _cb: Function): Promise<any>;
/**
* @param {string} _handle
* @param {string} _name
* @param {string} _image_url
* @param {string | undefined} _enroll_uri
* @param {string | undefined} _login_uri
* @param {string | undefined} _desktop_login_url
* @param {string | undefined} _device_gateway_url
* @param {string | undefined} _migrate_addr
* @param {Function} _cb
* @returns {Promise<any>}
*/
export function kmc_create_profile(_handle: string, _name: string, _image_url: string, _enroll_uri: string | undefined, _login_uri: string | undefined, _desktop_login_url: string | undefined, _device_gateway_url: string | undefined, _migrate_addr: string | undefined, _cb: Function): Promise<any>;
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
export function kmc_list_credentials(cb: Function): Promise<any>;
/**
* @param {string} url
* @returns {any}
*/
export function kmc_url_type(url: string): any;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly kmc_get_key_type: (a: number) => number;
  readonly kmc_get_user_agent: () => number;
  readonly kmc_get_app_instance_id: () => number;
  readonly kmc_migrate_database: (a: number) => number;
  readonly kmc_import: (a: number, b: number) => number;
  readonly kmc_handle_url: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly kmc_embedded_public_oidc: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly kmc_embedded_confidential_oidc: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly kmc_export: (a: number, b: number) => number;
  readonly kmc_delete_profile: (a: number, b: number) => number;
  readonly kmc_create_profile: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
  readonly kmc_create_pkce: () => number;
  readonly kmc_cancel: () => number;
  readonly kmc_all_credentials: (a: number) => number;
  readonly kmc_delete_credential: (a: number, b: number) => number;
  readonly kmc_list_credentials: (a: number) => number;
  readonly kmc_url_type: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hac28956bd554ad35: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hbfecb83208773a15: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h19865b07147afc89: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hc71e64e004c44ff0: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h22c2f0768bc2fe65: (a: number, b: number, c: number, d: number) => void;
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
