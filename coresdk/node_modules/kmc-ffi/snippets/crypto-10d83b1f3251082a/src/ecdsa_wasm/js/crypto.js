
export function key_export(key, format) {
    return new Promise((resolve, reject) => {
        window.crypto.subtle.exportKey(format, key)
            .then(data => {
                resolve(new Uint8Array(data));
            }, err => {
                reject(err);
            });
    });
}

//can be "P-256", "P-384", or "P-521"
export function ecdsa_generate_key_pair(curve) {
    return new Promise((resolve, reject) => {
        let params = {
            name: "ECDSA",
            namedCurve: curve,
        };
        window.crypto.subtle.generateKey(params, true, ["sign", "verify"])
            .then(keyPair => {
                resolve(keyPair);
            }, err => {
                reject(err);
            });
    });
}

export function ecdsa_import_key(format, curve, bits, use) {
    return new Promise((resolve, reject) => {
        let params = {
            name: "ECDSA",
            namedCurve: curve,
        };
        window.crypto.subtle.importKey(format, bits, params, true, [use])
            .then(keyPair => {
                resolve(keyPair);
            }, err => {
                reject(err);
            });
    });
}

//can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
export function ecdsa_sign(key, hash, data) {
    return new Promise((resolve, reject) => {
        let params = {
            name: "ECDSA",
            hash: hash,
        };
        window.crypto.subtle.sign(params, key, data)
            .then(signature => {
                signature = new Uint8Array(signature);
                resolve(signature);
            }, err => {
                reject(err);
            });
    });
};

// SubtleCrypto requires raw signatures, an (x,y) 
// pair of 32-bit BigInt's.  If the length of 
// the signature is > 64, then assume the signature
// is asn.1 encoded as sequence(int, int). 
function ecdsa_decode_signature(signature) {
    if (signature.length == 64) return signature;

    const err = new Error("Invalid signature");

    if (signature.length < 64) throw err;

    // Expected: asn.1 sequence primitive (0x48)
    if (signature[0] != 48) throw err;

    let rawSignature = new Uint8Array(64);

    let pos = 2;

    // Expected: asn.1 integer primitive (0x48)
    if (signature[pos++] != 2) throw err;

    // Parse x.
    // Expected: integer length, either 32 or 33 bytes
    // If the length begins with a 0, then the int is 
    // positive and we can skip the byte.
    let len = signature[pos++];
    if (len == 33) pos++;
    else if (len != 32) throw err;
    rawSignature.set(signature.slice(pos, pos + 32), 0);

    // Parse y, same as x. 
    pos += 32;
    if (signature[pos++] != 2) throw err;
    len = signature[pos++];
    if (len == 33) pos++;
    else if (len != 32) throw err;
    rawSignature.set(signature.slice(pos, pos + 32), 32);

    return rawSignature;
}

export function ecdsa_verify(key, hash, signature, message) {

    return new Promise((resolve, reject) => {
        try {
            signature = ecdsa_decode_signature(signature);
        }
        catch (err) {
            reject(err);
            return;
        }
        let params = {
            name: "ECDSA",
            hash: hash,
        };
        window.crypto.subtle.verify(params, key, signature, message)
            .then(ok => {
                resolve(ok);
            }, err => {
                reject(err);
            });
    });
};

export function aesgcm_generate_key() {
    return new Promise((resolve, reject) => {
        let params = {
            name: "AES-GCM",
            length: 256,
        };
        window.crypto.subtle.generateKey(params, false, ["encrypt", "decrypt"])
            .then(key => {
                resolve(key)
            }, err => {
                reject(err)
            });
    });
}

export function rsa_import_key(format, bits, use, hash) {
    return new Promise((resolve, reject) => {
        let params = {
            name: "RSASSA-PKCS1-v1_5",
            hash: hash,
        };
        window.crypto.subtle.importKey(format, bits, params, true, [use])
            .then(keyPair => {
                resolve(keyPair);
            }, err => {
                reject(err);
            });
    });
}

export function rsa_verify(key, signature, message) {

    return new Promise((resolve, reject) => {
        let params = {
            name: "RSASSA-PKCS1-v1_5",
        };
        window.crypto.subtle.verify(params, key, signature, message)
            .then(ok => {
                resolve(ok);
            }, err => {
                reject(err);
            });
    });
};

