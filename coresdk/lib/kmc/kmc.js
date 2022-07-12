import { openCredentialDb, closeCredentialDb, createCredential, readCredentials, updateCredential, deleteCredential } from './snippets/authlib-523d9c6c585091d8/src/store/credential/db/indexeddb/js/target/credstore.js';
import { sleep } from './snippets/common-9958b286e1acf929/inline0.js';
import { ecdsa_generate_key_pair, ecdsa_import_key, ecdsa_sign, ecdsa_verify, key_export, rsa_import_key, rsa_verify } from './snippets/crypto-7439096d35d6fc1f/src/ecdsa_wasm/js/crypto.js';
import { FfiCreateKeyP256, FfiQueryKeyP256, FfiDeleteKeyP256, FfiVerifyExistingKeyP256, FfiSignWithP256, FfiPublicBitsP256 } from './snippets/hal-e64fddde4ee31121/src/wasm/legacy/js/target/hal.js';
import { kmc_open_db, kmc_get_cert, kmc_put_cert, kmc_delete_cert, kmc_generate_key, kmc_is_key_webauthn_backed, kmc_sign, kmc_public_key, kmc_encrypt, kmc_decrypt, kmc_delete_key, kmc_write_profile, kmc_write_profile_id, kmc_update_profile_metadata, kmc_has_profile, kmc_get_profile, kmc_get_all_profiles, kmc_delete_profile as kmc_delete_profile2, kmc_add_authenticator_client_id, kmc_delete_all_authenticator_client_ids, kmc_get_app_settings, kmc_get_device_info, kmc_get_user_agent as kmc_get_user_agent2 } from './snippets/kmc-js-a8479199104cfb09/src/js/dist/kmc.js';

let wasm;

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

let cachegetFloat64Memory0 = null;
function getFloat64Memory0() {
    if (cachegetFloat64Memory0 === null || cachegetFloat64Memory0.buffer !== wasm.memory.buffer) {
        cachegetFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachegetFloat64Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_38(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h27858a87ec431f1e(arg0, arg1, addHeapObject(arg2));
}

/**
* Returns the type of the key, "webauthn" or "subtle" for a specified credential.
* @param {string} handle
* @returns {Promise<any>}
*/
export function kmc_get_key_type(handle) {
    const ret = wasm.kmc_get_key_type(addHeapObject(handle));
    return takeObject(ret);
}

/**
* @returns {Promise<any>}
*/
export function kmc_get_user_agent() {
    const ret = wasm.kmc_get_user_agent();
    return takeObject(ret);
}

/**
* @returns {Promise<string>}
*/
export function kmc_get_app_instance_id() {
    const ret = wasm.kmc_get_app_instance_id();
    return takeObject(ret);
}

/**
* @param {string | undefined} allowed_domains
*/
export function kmc_migrate_database(allowed_domains) {
    wasm.kmc_migrate_database(isLikeNone(allowed_domains) ? 0 : addHeapObject(allowed_domains));
}

/**
* @param {string} token
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_import(token, cb) {
    const ret = wasm.kmc_import(addHeapObject(token), addHeapObject(cb));
    return takeObject(ret);
}

/**
* @param {string} url
* @param {any} allowed_domains
* @param {string} trusted_source
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_handle_url(url, allowed_domains, trusted_source, cb) {
    const ret = wasm.kmc_handle_url(addHeapObject(url), addHeapObject(allowed_domains), addHeapObject(trusted_source), addHeapObject(cb));
    return takeObject(ret);
}

/**
* @param {string} auth_url
* @param {string} token_url
* @param {string} client_id
* @param {string} redirect_uri
* @param {string | undefined} nonce
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_embedded_public_oidc(auth_url, token_url, client_id, redirect_uri, nonce, cb) {
    const ret = wasm.kmc_embedded_public_oidc(addHeapObject(auth_url), addHeapObject(token_url), addHeapObject(client_id), addHeapObject(redirect_uri), isLikeNone(nonce) ? 0 : addHeapObject(nonce), addHeapObject(cb));
    return takeObject(ret);
}

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
export function kmc_embedded_confidential_oidc(auth_url, client_id, redirect_uri, scope, pkce_challenge, nonce, cb) {
    const ret = wasm.kmc_embedded_confidential_oidc(addHeapObject(auth_url), addHeapObject(client_id), addHeapObject(redirect_uri), addHeapObject(scope), addHeapObject(pkce_challenge), isLikeNone(nonce) ? 0 : addHeapObject(nonce), addHeapObject(cb));
    return takeObject(ret);
}

/**
* @param {string} handle
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_export(handle, cb) {
    const ret = wasm.kmc_export(addHeapObject(handle), addHeapObject(cb));
    return takeObject(ret);
}

/**
* @param {string} handle
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_delete_profile(handle, cb) {
    const ret = wasm.kmc_delete_profile(addHeapObject(handle), addHeapObject(cb));
    return takeObject(ret);
}

/**
* @param {string} handle
* @param {string} name
* @param {string} image_url
* @param {string | undefined} enroll_uri
* @param {string | undefined} login_uri
* @param {string | undefined} desktop_login_url
* @param {string | undefined} device_gateway_url
* @param {string | undefined} migrate_addr
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_create_profile(handle, name, image_url, enroll_uri, login_uri, desktop_login_url, device_gateway_url, migrate_addr, cb) {
    const ret = wasm.kmc_create_profile(addHeapObject(handle), addHeapObject(name), addHeapObject(image_url), isLikeNone(enroll_uri) ? 0 : addHeapObject(enroll_uri), isLikeNone(login_uri) ? 0 : addHeapObject(login_uri), isLikeNone(desktop_login_url) ? 0 : addHeapObject(desktop_login_url), isLikeNone(device_gateway_url) ? 0 : addHeapObject(device_gateway_url), isLikeNone(migrate_addr) ? 0 : addHeapObject(migrate_addr), addHeapObject(cb));
    return takeObject(ret);
}

/**
* @returns {Promise<any>}
*/
export function kmc_create_pkce() {
    const ret = wasm.kmc_create_pkce();
    return takeObject(ret);
}

/**
* @returns {Promise<any>}
*/
export function kmc_cancel() {
    const ret = wasm.kmc_cancel();
    return takeObject(ret);
}

/**
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_all_credentials(cb) {
    const ret = wasm.kmc_all_credentials(addHeapObject(cb));
    return takeObject(ret);
}

/**
* @param {string} credential_id
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_delete_credential(credential_id, cb) {
    const ret = wasm.kmc_delete_credential(addHeapObject(credential_id), addHeapObject(cb));
    return takeObject(ret);
}

/**
* @param {Function} cb
* @returns {Promise<any>}
*/
export function kmc_list_credentials(cb) {
    const ret = wasm.kmc_list_credentials(addHeapObject(cb));
    return takeObject(ret);
}

/**
* @param {string} url
* @returns {any}
*/
export function kmc_url_type(url) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.kmc_url_type(retptr, addHeapObject(url));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return takeObject(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
function __wbg_adapter_258(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h3cc26d5c09b00dcf(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('kmc_bg.wasm', import.meta.url);
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_json_serialize = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = JSON.stringify(obj === undefined ? null : obj);
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_json_parse = function(arg0, arg1) {
        const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_falsy = function(arg0) {
        const ret = !getObject(arg0);
        return ret;
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'string';
        return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbg_kmcopendb_0c15ab508c820158 = function() {
        const ret = kmc_open_db();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcgetcert_9d9058e60d2ec288 = function(arg0, arg1) {
        const ret = kmc_get_cert(takeObject(arg0), takeObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcputcert_84f499cd9a009fed = function(arg0, arg1, arg2) {
        const ret = kmc_put_cert(takeObject(arg0), takeObject(arg1), takeObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcdeletecert_aa441281a012cdb3 = function(arg0, arg1) {
        const ret = kmc_delete_cert(takeObject(arg0), takeObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcgeneratekey_511765beae970253 = function(arg0, arg1, arg2) {
        const ret = kmc_generate_key(takeObject(arg0), takeObject(arg1), takeObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmciskeywebauthnbacked_84c8f490e60b8e21 = function(arg0, arg1) {
        const ret = kmc_is_key_webauthn_backed(takeObject(arg0), takeObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcsign_a1f9b36ba3bf96a1 = function(arg0, arg1, arg2) {
        const ret = kmc_sign(takeObject(arg0), takeObject(arg1), takeObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcpublickey_48e7a20de431dd34 = function(arg0, arg1) {
        const ret = kmc_public_key(takeObject(arg0), takeObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcencrypt_b47fd84a2dd0d3ac = function(arg0, arg1, arg2) {
        const ret = kmc_encrypt(takeObject(arg0), takeObject(arg1), takeObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcdecrypt_850adb9a77b67169 = function(arg0, arg1, arg2) {
        const ret = kmc_decrypt(takeObject(arg0), takeObject(arg1), takeObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcdeletekey_7934c88601db8baa = function(arg0, arg1) {
        const ret = kmc_delete_key(takeObject(arg0), takeObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcwriteprofile_95e66bc35f3057e8 = function(arg0, arg1) {
        const ret = kmc_write_profile(takeObject(arg0), takeObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcwriteprofileid_a1c4524c6e454b4d = function(arg0, arg1) {
        const ret = kmc_write_profile_id(takeObject(arg0), takeObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcupdateprofilemetadata_7dd39690d361aac1 = function(arg0, arg1, arg2) {
        const ret = kmc_update_profile_metadata(takeObject(arg0), takeObject(arg1), takeObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmchasprofile_f03472fe16f4bc09 = function(arg0, arg1) {
        const ret = kmc_has_profile(takeObject(arg0), takeObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcgetprofile_04f002673b484dee = function(arg0, arg1) {
        const ret = kmc_get_profile(takeObject(arg0), takeObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcgetallprofiles_0a96be1e897d44de = function(arg0) {
        const ret = kmc_get_all_profiles(takeObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcdeleteprofile_5baa32b96311cc6b = function(arg0, arg1) {
        const ret = kmc_delete_profile2(takeObject(arg0), takeObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcaddauthenticatorclientid_3e48bda48cf7a7f9 = function(arg0, arg1, arg2) {
        const ret = kmc_add_authenticator_client_id(takeObject(arg0), takeObject(arg1), takeObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcdeleteallauthenticatorclientids_c00ba8cbf9e43629 = function(arg0, arg1) {
        const ret = kmc_delete_all_authenticator_client_ids(takeObject(arg0), takeObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcgetappsettings_2c607c976452a3de = function(arg0) {
        const ret = kmc_get_app_settings(takeObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcgetdeviceinfo_b4df9bf7e9cd2396 = function(arg0) {
        const ret = kmc_get_device_info(takeObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_kmcgetuseragent_49d884f2eefd978a = function() {
        const ret = kmc_get_user_agent2();
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_null = function(arg0) {
        const ret = getObject(arg0) === null;
        return ret;
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = getObject(arg0);
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        return ret;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbg_get_2d1407dba3452350 = function(arg0, arg1) {
        const ret = getObject(arg0)[takeObject(arg1)];
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_f1a4ac8f3a605b11 = function(arg0, arg1, arg2) {
        getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
    };
    imports.wbg.__wbg_openCredentialDb_2c31e465b79aeb4b = function() {
        const ret = openCredentialDb();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_closeCredentialDb_499a2108e4b4822f = function(arg0) {
        closeCredentialDb(getObject(arg0));
    };
    imports.wbg.__wbg_createCredential_6f45800f2fdcec1d = function(arg0, arg1, arg2) {
        const ret = createCredential(getObject(arg0), takeObject(arg1), takeObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_readCredentials_ed2f34efb313cfa6 = function(arg0) {
        const ret = readCredentials(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_updateCredential_04f9a5eb92588314 = function(arg0, arg1) {
        const ret = updateCredential(getObject(arg0), takeObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_deleteCredential_cc34ffcf344933b6 = function(arg0, arg1, arg2) {
        const ret = deleteCredential(getObject(arg0), getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_randomFillSync_654a7797990fb8db = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_getRandomValues_fb6b088efb6bead2 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_process_70251ed1291754d5 = function(arg0) {
        const ret = getObject(arg0).process;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_versions_b23f2588cdb2ddbb = function(arg0) {
        const ret = getObject(arg0).versions;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_node_61b8c9a82499895d = function(arg0) {
        const ret = getObject(arg0).node;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_static_accessor_NODE_MODULE_33b45247c55045b0 = function() {
        const ret = module;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_require_2a93bc09fee45aca = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).require(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_crypto_2f56257a38275dbd = function(arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_msCrypto_d07655bf62361f21 = function(arg0) {
        const ret = getObject(arg0).msCrypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_FfiCreateKeyP256_1ea6df076ad676d8 = function(arg0, arg1, arg2) {
        const ret = FfiCreateKeyP256(takeObject(arg0), takeObject(arg1), takeObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_FfiQueryKeyP256_bd2028fecb05a435 = function(arg0) {
        const ret = FfiQueryKeyP256(takeObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_FfiDeleteKeyP256_e119e3b875b9f8c9 = function(arg0) {
        const ret = FfiDeleteKeyP256(takeObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_FfiVerifyExistingKeyP256_544e39da8d5b0a20 = function(arg0) {
        const ret = FfiVerifyExistingKeyP256(takeObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_FfiSignWithP256_da3f1d9e87e6d193 = function(arg0, arg1) {
        const ret = FfiSignWithP256(takeObject(arg0), takeObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_FfiPublicBitsP256_56218065ca738413 = function(arg0) {
        const ret = FfiPublicBitsP256(takeObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_String_c4052d6424160ac1 = function(arg0, arg1) {
        const ret = String(getObject(arg1));
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_get_f7833d6ec572e462 = function(arg0, arg1) {
        const ret = getObject(arg0)[takeObject(arg1)];
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_fbb49ad265f9dee8 = function(arg0, arg1, arg2) {
        getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
    };
    imports.wbg.__wbg_ecdsageneratekeypair_edaf8ac094978593 = function(arg0) {
        const ret = ecdsa_generate_key_pair(takeObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_ecdsaimportkey_32ec19de54ff9e22 = function(arg0, arg1, arg2, arg3) {
        const ret = ecdsa_import_key(takeObject(arg0), takeObject(arg1), takeObject(arg2), takeObject(arg3));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_ecdsasign_0bc4242d048360c0 = function(arg0, arg1, arg2) {
        const ret = ecdsa_sign(takeObject(arg0), takeObject(arg1), takeObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_ecdsaverify_a91e7aa3ad495d6d = function(arg0, arg1, arg2, arg3) {
        const ret = ecdsa_verify(takeObject(arg0), takeObject(arg1), takeObject(arg2), takeObject(arg3));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_keyexport_c8a6f2f55abf5481 = function(arg0, arg1) {
        const ret = key_export(takeObject(arg0), takeObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_rsaimportkey_4b6778ef963f6efc = function(arg0, arg1, arg2, arg3) {
        const ret = rsa_import_key(takeObject(arg0), takeObject(arg1), takeObject(arg2), takeObject(arg3));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_rsaverify_15a6c31972526405 = function(arg0, arg1, arg2) {
        const ret = rsa_verify(takeObject(arg0), takeObject(arg1), takeObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_sleep_28a06b11e85af039 = function(arg0) {
        const ret = sleep(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_fetch_811d43d6bdcad5b1 = function(arg0) {
        const ret = fetch(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_Window_0e6c0f1096d66c3c = function(arg0) {
        const ret = getObject(arg0) instanceof Window;
        return ret;
    };
    imports.wbg.__wbg_crypto_2ea42c2930d26d8d = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_fetch_bf56e2a9f0644e3f = function(arg0, arg1) {
        const ret = getObject(arg0).fetch(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_89d7f088c1c45353 = function() { return handleError(function () {
        const ret = new Headers();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_append_f4f93bc73c45ee3e = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_getRandomValues_e68d8462fdaf08a2 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).getRandomValues(getArrayU8FromWasm0(arg1, arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_newwithu8arraysequenceandoptions_c4b364ec4473b510 = function() { return handleError(function (arg0, arg1) {
        const ret = new Blob(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_instanceof_Response_ccfeb62399355bcd = function(arg0) {
        const ret = getObject(arg0) instanceof Response;
        return ret;
    };
    imports.wbg.__wbg_url_06c0f822d68d195c = function(arg0, arg1) {
        const ret = getObject(arg1).url;
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_status_600fd8b881393898 = function(arg0) {
        const ret = getObject(arg0).status;
        return ret;
    };
    imports.wbg.__wbg_headers_9e7f2c05a9b962ea = function(arg0) {
        const ret = getObject(arg0).headers;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_arrayBuffer_5a99283a3954c850 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).arrayBuffer();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_text_2612fbe0b9d32220 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).text();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_newwithstrandinit_fd99688f189f053e = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_22a989bb3c63448e = function() { return handleError(function () {
        const ret = new FormData();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_append_310ac5aa48274952 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        getObject(arg0).append(getStringFromWasm0(arg1, arg2), getObject(arg3));
    }, arguments) };
    imports.wbg.__wbg_append_69cf6e3e3f8bc319 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        getObject(arg0).append(getStringFromWasm0(arg1, arg2), getObject(arg3), getStringFromWasm0(arg4, arg5));
    }, arguments) };
    imports.wbg.__wbg_get_590a2cd912f2ae46 = function(arg0, arg1) {
        const ret = getObject(arg0)[arg1 >>> 0];
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_2cd798326f2cc4c1 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_new_94fb1279cf6afea5 = function() {
        const ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_valueOf_534d8e99d070af85 = function(arg0) {
        const ret = getObject(arg0).valueOf();
        return ret;
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'function';
        return ret;
    };
    imports.wbg.__wbg_newnoargs_e23b458e372830de = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_cabb70b365520721 = function(arg0) {
        const ret = getObject(arg0).next;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_bf3d83fc18df496e = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_done_040f966faa9a72b3 = function(arg0) {
        const ret = getObject(arg0).done;
        return ret;
    };
    imports.wbg.__wbg_value_419afbd9b9574c4c = function(arg0) {
        const ret = getObject(arg0).value;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_iterator_4832ef1f15b0382b = function() {
        const ret = Symbol.iterator;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_a9cab131e3152c49 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_ae78342adc33730a = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_36359baae5a47e27 = function() {
        const ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_from_7b9a99a7cd3ef15f = function(arg0) {
        const ret = Array.from(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_isArray_6721f2e508996340 = function(arg0) {
        const ret = Array.isArray(getObject(arg0));
        return ret;
    };
    imports.wbg.__wbg_push_40c6a90f1805aa90 = function(arg0, arg1) {
        const ret = getObject(arg0).push(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_b81b40c2ae0ab898 = function(arg0) {
        const ret = getObject(arg0) instanceof ArrayBuffer;
        return ret;
    };
    imports.wbg.__wbg_values_b1b9e8c63dbe01c2 = function(arg0) {
        const ret = getObject(arg0).values();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_3047bf4b4f02b802 = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_message_dcca38fbff239fbf = function(arg0) {
        const ret = getObject(arg0).message;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_name_642dd84602f48d65 = function(arg0) {
        const ret = getObject(arg0).name;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_3ed288a247f13ea5 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_isSafeInteger_c87467ed96815119 = function(arg0) {
        const ret = Number.isSafeInteger(getObject(arg0));
        return ret;
    };
    imports.wbg.__wbg_getTime_bffb1c09df09618b = function(arg0) {
        const ret = getObject(arg0).getTime();
        return ret;
    };
    imports.wbg.__wbg_new0_0ff7eb5c1486f3ec = function() {
        const ret = new Date();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_entries_aaf7a1fbe90f014a = function(arg0) {
        const ret = Object.entries(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_Promise_56353edbaec268c3 = function(arg0) {
        const ret = getObject(arg0) instanceof Promise;
        return ret;
    };
    imports.wbg.__wbg_new_37705eed627d5ed9 = function(arg0, arg1) {
        try {
            var state0 = {a: arg0, b: arg1};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_258(a, state0.b, arg0, arg1);
                } finally {
                    state0.a = a;
                }
            };
            const ret = new Promise(cb0);
            return addHeapObject(ret);
        } finally {
            state0.a = state0.b = 0;
        }
    };
    imports.wbg.__wbg_reject_36ac21d22ef591b3 = function(arg0) {
        const ret = Promise.reject(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_resolve_a9a87bdd64e9e62c = function(arg0) {
        const ret = Promise.resolve(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_ce526c837d07b68f = function(arg0, arg1) {
        const ret = getObject(arg0).then(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_842e65b843962f56 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_self_99737b4dcdf6f0d8 = function() { return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_9b61fbbf3564c4fb = function() { return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_8e275ef40caea3a3 = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_5de1e0f82bddcd27 = function() { return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_buffer_7af23f65f6c64548 = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_ce1e75f0ce5f7974 = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_cc9018bd6f283b6f = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_f25e869e4565d2a2 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_0acb1cf9bbaf8519 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Uint8Array_edb92795fc0c63b4 = function(arg0) {
        const ret = getObject(arg0) instanceof Uint8Array;
        return ret;
    };
    imports.wbg.__wbg_newwithlength_8f0657faca9f1422 = function(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_subarray_da527dbd24eafb6b = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_has_ce995ec88636803d = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.has(getObject(arg0), getObject(arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_93b1c87ee2af852e = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_stringify_c760003feffcc1f2 = function() { return handleError(function (arg0) {
        const ret = JSON.stringify(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper6560 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 2388, __wbg_adapter_38);
        return addHeapObject(ret);
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }



    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

export default init;

