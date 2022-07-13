const invalidSignature = new Error("invalid signature");

/**
 * SubtleCrypto requires raw signatures, an (x,y) pair of 32-bit BigInt's.
 * If the length of the signature is > 64, then assume the signature
 * is asn.1 encoded as sequence(int, int).
 * @param {*} signature Sequence of bytes containting the signature.
 * @returns A raw ECDSA signature
 */
function decodeSignature(signature) {
  if (signature.length == 64) return signature;

  if (signature.length < 64) throw invalidSignature;

  // Expected: asn.1 sequence primitive (0x48)
  if (signature[0] != 48) throw invalidSignature;

  let rawSignature = new Uint8Array(64);

  let pos = 2;

  // Expected: asn.1 integer primitive (0x48)
  if (signature[pos++] != 2) throw invalidSignature;

  // Parse x.
  // Expected: integer length, either 32 or 33 bytes
  // If the length begins with a 0, then the int is
  // positive and we can skip the byte.
  let len = signature[pos++];
  if (len == 33) pos++;
  else if (len != 32) throw invalidSignature;
  rawSignature.set(signature.slice(pos, pos + 32), 0);

  // Parse y, same as x.
  pos += 32;
  if (signature[pos++] != 2) throw invalidSignature;
  len = signature[pos++];
  if (len == 33) pos++;
  else if (len != 32) throw invalidSignature;
  rawSignature.set(signature.slice(pos, pos + 32), 32);

  return rawSignature;
}

/**
 * Verifies a signed message, in raw format, with an ECDSA CryptoKey with
 * the specified hashing algorithm
 * @param {*} key Raw public key bits
 * @param {*} signature ArrayBuffer containing the signature in raw or
 * DER-encoded format.
 * @param {*} message The original message signed.
 * @returns A Promise that resolves to true, if the signature was verified,
 * false otherwise.
 */
export function verifyES256(keyBits, signature, message) {
  return new Promise(async (resolve, reject) => {
    try {
      let key = await window.crypto.subtle.importKey(
        "raw",
        keyBits,
        { name: "ECDSA", namedCurve: "P-256" },
        true,
        ["verify"]
      );
      let ok = await window.crypto.subtle.verify(
        {
          name: "ECDSA",
          hash: "SHA-256",
        },
        key,
        decodeSignature(signature),
        message
      );
      resolve(ok);
    } catch (err) {
      reject(err);
      return;
    }
  });
}
