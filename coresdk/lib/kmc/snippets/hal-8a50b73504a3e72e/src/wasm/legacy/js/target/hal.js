var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// node_modules/cbor-web/dist/cbor.js
var require_cbor = __commonJS({
  "node_modules/cbor-web/dist/cbor.js"(exports, module) {
    !function(e, t) {
      typeof exports == "object" && typeof module == "object" ? module.exports = t() : typeof define == "function" && define.amd ? define([], t) : typeof exports == "object" ? exports.cbor = t() : e.cbor = t();
    }(exports, function() {
      return (() => {
        var e = { 742: (e2, t2) => {
          "use strict";
          t2.byteLength = function(e3) {
            var t3 = u(e3), r3 = t3[0], n3 = t3[1];
            return 3 * (r3 + n3) / 4 - n3;
          }, t2.toByteArray = function(e3) {
            var t3, r3, o2 = u(e3), s2 = o2[0], a2 = o2[1], f2 = new i(function(e4, t4, r4) {
              return 3 * (t4 + r4) / 4 - r4;
            }(0, s2, a2)), h = 0, l = a2 > 0 ? s2 - 4 : s2;
            for (r3 = 0; r3 < l; r3 += 4)
              t3 = n2[e3.charCodeAt(r3)] << 18 | n2[e3.charCodeAt(r3 + 1)] << 12 | n2[e3.charCodeAt(r3 + 2)] << 6 | n2[e3.charCodeAt(r3 + 3)], f2[h++] = t3 >> 16 & 255, f2[h++] = t3 >> 8 & 255, f2[h++] = 255 & t3;
            return a2 === 2 && (t3 = n2[e3.charCodeAt(r3)] << 2 | n2[e3.charCodeAt(r3 + 1)] >> 4, f2[h++] = 255 & t3), a2 === 1 && (t3 = n2[e3.charCodeAt(r3)] << 10 | n2[e3.charCodeAt(r3 + 1)] << 4 | n2[e3.charCodeAt(r3 + 2)] >> 2, f2[h++] = t3 >> 8 & 255, f2[h++] = 255 & t3), f2;
          }, t2.fromByteArray = function(e3) {
            for (var t3, n3 = e3.length, i2 = n3 % 3, o2 = [], s2 = 16383, a2 = 0, u2 = n3 - i2; a2 < u2; a2 += s2)
              o2.push(f(e3, a2, a2 + s2 > u2 ? u2 : a2 + s2));
            return i2 === 1 ? (t3 = e3[n3 - 1], o2.push(r2[t3 >> 2] + r2[t3 << 4 & 63] + "==")) : i2 === 2 && (t3 = (e3[n3 - 2] << 8) + e3[n3 - 1], o2.push(r2[t3 >> 10] + r2[t3 >> 4 & 63] + r2[t3 << 2 & 63] + "=")), o2.join("");
          };
          for (var r2 = [], n2 = [], i = typeof Uint8Array != "undefined" ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, a = o.length; s < a; ++s)
            r2[s] = o[s], n2[o.charCodeAt(s)] = s;
          function u(e3) {
            var t3 = e3.length;
            if (t3 % 4 > 0)
              throw new Error("Invalid string. Length must be a multiple of 4");
            var r3 = e3.indexOf("=");
            return r3 === -1 && (r3 = t3), [r3, r3 === t3 ? 0 : 4 - r3 % 4];
          }
          function f(e3, t3, n3) {
            for (var i2, o2, s2 = [], a2 = t3; a2 < n3; a2 += 3)
              i2 = (e3[a2] << 16 & 16711680) + (e3[a2 + 1] << 8 & 65280) + (255 & e3[a2 + 2]), s2.push(r2[(o2 = i2) >> 18 & 63] + r2[o2 >> 12 & 63] + r2[o2 >> 6 & 63] + r2[63 & o2]);
            return s2.join("");
          }
          n2["-".charCodeAt(0)] = 62, n2["_".charCodeAt(0)] = 63;
        }, 764: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(742), i = r2(645), o = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
          t2.Buffer = u, t2.SlowBuffer = function(e3) {
            return +e3 != e3 && (e3 = 0), u.alloc(+e3);
          }, t2.INSPECT_MAX_BYTES = 50;
          const s = 2147483647;
          function a(e3) {
            if (e3 > s)
              throw new RangeError('The value "' + e3 + '" is invalid for option "size"');
            const t3 = new Uint8Array(e3);
            return Object.setPrototypeOf(t3, u.prototype), t3;
          }
          function u(e3, t3, r3) {
            if (typeof e3 == "number") {
              if (typeof t3 == "string")
                throw new TypeError('The "string" argument must be of type string. Received type number');
              return l(e3);
            }
            return f(e3, t3, r3);
          }
          function f(e3, t3, r3) {
            if (typeof e3 == "string")
              return function(e4, t4) {
                if (typeof t4 == "string" && t4 !== "" || (t4 = "utf8"), !u.isEncoding(t4))
                  throw new TypeError("Unknown encoding: " + t4);
                const r4 = 0 | g(e4, t4);
                let n4 = a(r4);
                const i3 = n4.write(e4, t4);
                return i3 !== r4 && (n4 = n4.slice(0, i3)), n4;
              }(e3, t3);
            if (ArrayBuffer.isView(e3))
              return function(e4) {
                if (z(e4, Uint8Array)) {
                  const t4 = new Uint8Array(e4);
                  return d(t4.buffer, t4.byteOffset, t4.byteLength);
                }
                return c(e4);
              }(e3);
            if (e3 == null)
              throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e3);
            if (z(e3, ArrayBuffer) || e3 && z(e3.buffer, ArrayBuffer))
              return d(e3, t3, r3);
            if (typeof SharedArrayBuffer != "undefined" && (z(e3, SharedArrayBuffer) || e3 && z(e3.buffer, SharedArrayBuffer)))
              return d(e3, t3, r3);
            if (typeof e3 == "number")
              throw new TypeError('The "value" argument must not be of type number. Received type number');
            const n3 = e3.valueOf && e3.valueOf();
            if (n3 != null && n3 !== e3)
              return u.from(n3, t3, r3);
            const i2 = function(e4) {
              if (u.isBuffer(e4)) {
                const t4 = 0 | p(e4.length), r4 = a(t4);
                return r4.length === 0 || e4.copy(r4, 0, 0, t4), r4;
              }
              return e4.length !== void 0 ? typeof e4.length != "number" || J(e4.length) ? a(0) : c(e4) : e4.type === "Buffer" && Array.isArray(e4.data) ? c(e4.data) : void 0;
            }(e3);
            if (i2)
              return i2;
            if (typeof Symbol != "undefined" && Symbol.toPrimitive != null && typeof e3[Symbol.toPrimitive] == "function")
              return u.from(e3[Symbol.toPrimitive]("string"), t3, r3);
            throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e3);
          }
          function h(e3) {
            if (typeof e3 != "number")
              throw new TypeError('"size" argument must be of type number');
            if (e3 < 0)
              throw new RangeError('The value "' + e3 + '" is invalid for option "size"');
          }
          function l(e3) {
            return h(e3), a(e3 < 0 ? 0 : 0 | p(e3));
          }
          function c(e3) {
            const t3 = e3.length < 0 ? 0 : 0 | p(e3.length), r3 = a(t3);
            for (let n3 = 0; n3 < t3; n3 += 1)
              r3[n3] = 255 & e3[n3];
            return r3;
          }
          function d(e3, t3, r3) {
            if (t3 < 0 || e3.byteLength < t3)
              throw new RangeError('"offset" is outside of buffer bounds');
            if (e3.byteLength < t3 + (r3 || 0))
              throw new RangeError('"length" is outside of buffer bounds');
            let n3;
            return n3 = t3 === void 0 && r3 === void 0 ? new Uint8Array(e3) : r3 === void 0 ? new Uint8Array(e3, t3) : new Uint8Array(e3, t3, r3), Object.setPrototypeOf(n3, u.prototype), n3;
          }
          function p(e3) {
            if (e3 >= s)
              throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
            return 0 | e3;
          }
          function g(e3, t3) {
            if (u.isBuffer(e3))
              return e3.length;
            if (ArrayBuffer.isView(e3) || z(e3, ArrayBuffer))
              return e3.byteLength;
            if (typeof e3 != "string")
              throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e3);
            const r3 = e3.length, n3 = arguments.length > 2 && arguments[2] === true;
            if (!n3 && r3 === 0)
              return 0;
            let i2 = false;
            for (; ; )
              switch (t3) {
                case "ascii":
                case "latin1":
                case "binary":
                  return r3;
                case "utf8":
                case "utf-8":
                  return H(e3).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return 2 * r3;
                case "hex":
                  return r3 >>> 1;
                case "base64":
                  return K(e3).length;
                default:
                  if (i2)
                    return n3 ? -1 : H(e3).length;
                  t3 = ("" + t3).toLowerCase(), i2 = true;
              }
          }
          function y(e3, t3, r3) {
            let n3 = false;
            if ((t3 === void 0 || t3 < 0) && (t3 = 0), t3 > this.length)
              return "";
            if ((r3 === void 0 || r3 > this.length) && (r3 = this.length), r3 <= 0)
              return "";
            if ((r3 >>>= 0) <= (t3 >>>= 0))
              return "";
            for (e3 || (e3 = "utf8"); ; )
              switch (e3) {
                case "hex":
                  return L(this, t3, r3);
                case "utf8":
                case "utf-8":
                  return A(this, t3, r3);
                case "ascii":
                  return R(this, t3, r3);
                case "latin1":
                case "binary":
                  return U(this, t3, r3);
                case "base64":
                  return I(this, t3, r3);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return N(this, t3, r3);
                default:
                  if (n3)
                    throw new TypeError("Unknown encoding: " + e3);
                  e3 = (e3 + "").toLowerCase(), n3 = true;
              }
          }
          function b(e3, t3, r3) {
            const n3 = e3[t3];
            e3[t3] = e3[r3], e3[r3] = n3;
          }
          function w(e3, t3, r3, n3, i2) {
            if (e3.length === 0)
              return -1;
            if (typeof r3 == "string" ? (n3 = r3, r3 = 0) : r3 > 2147483647 ? r3 = 2147483647 : r3 < -2147483648 && (r3 = -2147483648), J(r3 = +r3) && (r3 = i2 ? 0 : e3.length - 1), r3 < 0 && (r3 = e3.length + r3), r3 >= e3.length) {
              if (i2)
                return -1;
              r3 = e3.length - 1;
            } else if (r3 < 0) {
              if (!i2)
                return -1;
              r3 = 0;
            }
            if (typeof t3 == "string" && (t3 = u.from(t3, n3)), u.isBuffer(t3))
              return t3.length === 0 ? -1 : _(e3, t3, r3, n3, i2);
            if (typeof t3 == "number")
              return t3 &= 255, typeof Uint8Array.prototype.indexOf == "function" ? i2 ? Uint8Array.prototype.indexOf.call(e3, t3, r3) : Uint8Array.prototype.lastIndexOf.call(e3, t3, r3) : _(e3, [t3], r3, n3, i2);
            throw new TypeError("val must be string, number or Buffer");
          }
          function _(e3, t3, r3, n3, i2) {
            let o2, s2 = 1, a2 = e3.length, u2 = t3.length;
            if (n3 !== void 0 && ((n3 = String(n3).toLowerCase()) === "ucs2" || n3 === "ucs-2" || n3 === "utf16le" || n3 === "utf-16le")) {
              if (e3.length < 2 || t3.length < 2)
                return -1;
              s2 = 2, a2 /= 2, u2 /= 2, r3 /= 2;
            }
            function f2(e4, t4) {
              return s2 === 1 ? e4[t4] : e4.readUInt16BE(t4 * s2);
            }
            if (i2) {
              let n4 = -1;
              for (o2 = r3; o2 < a2; o2++)
                if (f2(e3, o2) === f2(t3, n4 === -1 ? 0 : o2 - n4)) {
                  if (n4 === -1 && (n4 = o2), o2 - n4 + 1 === u2)
                    return n4 * s2;
                } else
                  n4 !== -1 && (o2 -= o2 - n4), n4 = -1;
            } else
              for (r3 + u2 > a2 && (r3 = a2 - u2), o2 = r3; o2 >= 0; o2--) {
                let r4 = true;
                for (let n4 = 0; n4 < u2; n4++)
                  if (f2(e3, o2 + n4) !== f2(t3, n4)) {
                    r4 = false;
                    break;
                  }
                if (r4)
                  return o2;
              }
            return -1;
          }
          function m(e3, t3, r3, n3) {
            r3 = Number(r3) || 0;
            const i2 = e3.length - r3;
            n3 ? (n3 = Number(n3)) > i2 && (n3 = i2) : n3 = i2;
            const o2 = t3.length;
            let s2;
            for (n3 > o2 / 2 && (n3 = o2 / 2), s2 = 0; s2 < n3; ++s2) {
              const n4 = parseInt(t3.substr(2 * s2, 2), 16);
              if (J(n4))
                return s2;
              e3[r3 + s2] = n4;
            }
            return s2;
          }
          function E(e3, t3, r3, n3) {
            return V(H(t3, e3.length - r3), e3, r3, n3);
          }
          function v(e3, t3, r3, n3) {
            return V(function(e4) {
              const t4 = [];
              for (let r4 = 0; r4 < e4.length; ++r4)
                t4.push(255 & e4.charCodeAt(r4));
              return t4;
            }(t3), e3, r3, n3);
          }
          function S(e3, t3, r3, n3) {
            return V(K(t3), e3, r3, n3);
          }
          function T(e3, t3, r3, n3) {
            return V(function(e4, t4) {
              let r4, n4, i2;
              const o2 = [];
              for (let s2 = 0; s2 < e4.length && !((t4 -= 2) < 0); ++s2)
                r4 = e4.charCodeAt(s2), n4 = r4 >> 8, i2 = r4 % 256, o2.push(i2), o2.push(n4);
              return o2;
            }(t3, e3.length - r3), e3, r3, n3);
          }
          function I(e3, t3, r3) {
            return t3 === 0 && r3 === e3.length ? n2.fromByteArray(e3) : n2.fromByteArray(e3.slice(t3, r3));
          }
          function A(e3, t3, r3) {
            r3 = Math.min(e3.length, r3);
            const n3 = [];
            let i2 = t3;
            for (; i2 < r3; ) {
              const t4 = e3[i2];
              let o2 = null, s2 = t4 > 239 ? 4 : t4 > 223 ? 3 : t4 > 191 ? 2 : 1;
              if (i2 + s2 <= r3) {
                let r4, n4, a2, u2;
                switch (s2) {
                  case 1:
                    t4 < 128 && (o2 = t4);
                    break;
                  case 2:
                    r4 = e3[i2 + 1], (192 & r4) == 128 && (u2 = (31 & t4) << 6 | 63 & r4, u2 > 127 && (o2 = u2));
                    break;
                  case 3:
                    r4 = e3[i2 + 1], n4 = e3[i2 + 2], (192 & r4) == 128 && (192 & n4) == 128 && (u2 = (15 & t4) << 12 | (63 & r4) << 6 | 63 & n4, u2 > 2047 && (u2 < 55296 || u2 > 57343) && (o2 = u2));
                    break;
                  case 4:
                    r4 = e3[i2 + 1], n4 = e3[i2 + 2], a2 = e3[i2 + 3], (192 & r4) == 128 && (192 & n4) == 128 && (192 & a2) == 128 && (u2 = (15 & t4) << 18 | (63 & r4) << 12 | (63 & n4) << 6 | 63 & a2, u2 > 65535 && u2 < 1114112 && (o2 = u2));
                }
              }
              o2 === null ? (o2 = 65533, s2 = 1) : o2 > 65535 && (o2 -= 65536, n3.push(o2 >>> 10 & 1023 | 55296), o2 = 56320 | 1023 & o2), n3.push(o2), i2 += s2;
            }
            return function(e4) {
              const t4 = e4.length;
              if (t4 <= B)
                return String.fromCharCode.apply(String, e4);
              let r4 = "", n4 = 0;
              for (; n4 < t4; )
                r4 += String.fromCharCode.apply(String, e4.slice(n4, n4 += B));
              return r4;
            }(n3);
          }
          t2.kMaxLength = s, u.TYPED_ARRAY_SUPPORT = function() {
            try {
              const e3 = new Uint8Array(1), t3 = { foo: function() {
                return 42;
              } };
              return Object.setPrototypeOf(t3, Uint8Array.prototype), Object.setPrototypeOf(e3, t3), e3.foo() === 42;
            } catch (e3) {
              return false;
            }
          }(), u.TYPED_ARRAY_SUPPORT || typeof console == "undefined" || typeof console.error != "function" || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(u.prototype, "parent", { enumerable: true, get: function() {
            if (u.isBuffer(this))
              return this.buffer;
          } }), Object.defineProperty(u.prototype, "offset", { enumerable: true, get: function() {
            if (u.isBuffer(this))
              return this.byteOffset;
          } }), u.poolSize = 8192, u.from = function(e3, t3, r3) {
            return f(e3, t3, r3);
          }, Object.setPrototypeOf(u.prototype, Uint8Array.prototype), Object.setPrototypeOf(u, Uint8Array), u.alloc = function(e3, t3, r3) {
            return function(e4, t4, r4) {
              return h(e4), e4 <= 0 ? a(e4) : t4 !== void 0 ? typeof r4 == "string" ? a(e4).fill(t4, r4) : a(e4).fill(t4) : a(e4);
            }(e3, t3, r3);
          }, u.allocUnsafe = function(e3) {
            return l(e3);
          }, u.allocUnsafeSlow = function(e3) {
            return l(e3);
          }, u.isBuffer = function(e3) {
            return e3 != null && e3._isBuffer === true && e3 !== u.prototype;
          }, u.compare = function(e3, t3) {
            if (z(e3, Uint8Array) && (e3 = u.from(e3, e3.offset, e3.byteLength)), z(t3, Uint8Array) && (t3 = u.from(t3, t3.offset, t3.byteLength)), !u.isBuffer(e3) || !u.isBuffer(t3))
              throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (e3 === t3)
              return 0;
            let r3 = e3.length, n3 = t3.length;
            for (let i2 = 0, o2 = Math.min(r3, n3); i2 < o2; ++i2)
              if (e3[i2] !== t3[i2]) {
                r3 = e3[i2], n3 = t3[i2];
                break;
              }
            return r3 < n3 ? -1 : n3 < r3 ? 1 : 0;
          }, u.isEncoding = function(e3) {
            switch (String(e3).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return true;
              default:
                return false;
            }
          }, u.concat = function(e3, t3) {
            if (!Array.isArray(e3))
              throw new TypeError('"list" argument must be an Array of Buffers');
            if (e3.length === 0)
              return u.alloc(0);
            let r3;
            if (t3 === void 0)
              for (t3 = 0, r3 = 0; r3 < e3.length; ++r3)
                t3 += e3[r3].length;
            const n3 = u.allocUnsafe(t3);
            let i2 = 0;
            for (r3 = 0; r3 < e3.length; ++r3) {
              let t4 = e3[r3];
              if (z(t4, Uint8Array))
                i2 + t4.length > n3.length ? (u.isBuffer(t4) || (t4 = u.from(t4)), t4.copy(n3, i2)) : Uint8Array.prototype.set.call(n3, t4, i2);
              else {
                if (!u.isBuffer(t4))
                  throw new TypeError('"list" argument must be an Array of Buffers');
                t4.copy(n3, i2);
              }
              i2 += t4.length;
            }
            return n3;
          }, u.byteLength = g, u.prototype._isBuffer = true, u.prototype.swap16 = function() {
            const e3 = this.length;
            if (e3 % 2 != 0)
              throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (let t3 = 0; t3 < e3; t3 += 2)
              b(this, t3, t3 + 1);
            return this;
          }, u.prototype.swap32 = function() {
            const e3 = this.length;
            if (e3 % 4 != 0)
              throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (let t3 = 0; t3 < e3; t3 += 4)
              b(this, t3, t3 + 3), b(this, t3 + 1, t3 + 2);
            return this;
          }, u.prototype.swap64 = function() {
            const e3 = this.length;
            if (e3 % 8 != 0)
              throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (let t3 = 0; t3 < e3; t3 += 8)
              b(this, t3, t3 + 7), b(this, t3 + 1, t3 + 6), b(this, t3 + 2, t3 + 5), b(this, t3 + 3, t3 + 4);
            return this;
          }, u.prototype.toString = function() {
            const e3 = this.length;
            return e3 === 0 ? "" : arguments.length === 0 ? A(this, 0, e3) : y.apply(this, arguments);
          }, u.prototype.toLocaleString = u.prototype.toString, u.prototype.equals = function(e3) {
            if (!u.isBuffer(e3))
              throw new TypeError("Argument must be a Buffer");
            return this === e3 || u.compare(this, e3) === 0;
          }, u.prototype.inspect = function() {
            let e3 = "";
            const r3 = t2.INSPECT_MAX_BYTES;
            return e3 = this.toString("hex", 0, r3).replace(/(.{2})/g, "$1 ").trim(), this.length > r3 && (e3 += " ... "), "<Buffer " + e3 + ">";
          }, o && (u.prototype[o] = u.prototype.inspect), u.prototype.compare = function(e3, t3, r3, n3, i2) {
            if (z(e3, Uint8Array) && (e3 = u.from(e3, e3.offset, e3.byteLength)), !u.isBuffer(e3))
              throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e3);
            if (t3 === void 0 && (t3 = 0), r3 === void 0 && (r3 = e3 ? e3.length : 0), n3 === void 0 && (n3 = 0), i2 === void 0 && (i2 = this.length), t3 < 0 || r3 > e3.length || n3 < 0 || i2 > this.length)
              throw new RangeError("out of range index");
            if (n3 >= i2 && t3 >= r3)
              return 0;
            if (n3 >= i2)
              return -1;
            if (t3 >= r3)
              return 1;
            if (this === e3)
              return 0;
            let o2 = (i2 >>>= 0) - (n3 >>>= 0), s2 = (r3 >>>= 0) - (t3 >>>= 0);
            const a2 = Math.min(o2, s2), f2 = this.slice(n3, i2), h2 = e3.slice(t3, r3);
            for (let e4 = 0; e4 < a2; ++e4)
              if (f2[e4] !== h2[e4]) {
                o2 = f2[e4], s2 = h2[e4];
                break;
              }
            return o2 < s2 ? -1 : s2 < o2 ? 1 : 0;
          }, u.prototype.includes = function(e3, t3, r3) {
            return this.indexOf(e3, t3, r3) !== -1;
          }, u.prototype.indexOf = function(e3, t3, r3) {
            return w(this, e3, t3, r3, true);
          }, u.prototype.lastIndexOf = function(e3, t3, r3) {
            return w(this, e3, t3, r3, false);
          }, u.prototype.write = function(e3, t3, r3, n3) {
            if (t3 === void 0)
              n3 = "utf8", r3 = this.length, t3 = 0;
            else if (r3 === void 0 && typeof t3 == "string")
              n3 = t3, r3 = this.length, t3 = 0;
            else {
              if (!isFinite(t3))
                throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
              t3 >>>= 0, isFinite(r3) ? (r3 >>>= 0, n3 === void 0 && (n3 = "utf8")) : (n3 = r3, r3 = void 0);
            }
            const i2 = this.length - t3;
            if ((r3 === void 0 || r3 > i2) && (r3 = i2), e3.length > 0 && (r3 < 0 || t3 < 0) || t3 > this.length)
              throw new RangeError("Attempt to write outside buffer bounds");
            n3 || (n3 = "utf8");
            let o2 = false;
            for (; ; )
              switch (n3) {
                case "hex":
                  return m(this, e3, t3, r3);
                case "utf8":
                case "utf-8":
                  return E(this, e3, t3, r3);
                case "ascii":
                case "latin1":
                case "binary":
                  return v(this, e3, t3, r3);
                case "base64":
                  return S(this, e3, t3, r3);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return T(this, e3, t3, r3);
                default:
                  if (o2)
                    throw new TypeError("Unknown encoding: " + n3);
                  n3 = ("" + n3).toLowerCase(), o2 = true;
              }
          }, u.prototype.toJSON = function() {
            return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
          };
          const B = 4096;
          function R(e3, t3, r3) {
            let n3 = "";
            r3 = Math.min(e3.length, r3);
            for (let i2 = t3; i2 < r3; ++i2)
              n3 += String.fromCharCode(127 & e3[i2]);
            return n3;
          }
          function U(e3, t3, r3) {
            let n3 = "";
            r3 = Math.min(e3.length, r3);
            for (let i2 = t3; i2 < r3; ++i2)
              n3 += String.fromCharCode(e3[i2]);
            return n3;
          }
          function L(e3, t3, r3) {
            const n3 = e3.length;
            (!t3 || t3 < 0) && (t3 = 0), (!r3 || r3 < 0 || r3 > n3) && (r3 = n3);
            let i2 = "";
            for (let n4 = t3; n4 < r3; ++n4)
              i2 += X[e3[n4]];
            return i2;
          }
          function N(e3, t3, r3) {
            const n3 = e3.slice(t3, r3);
            let i2 = "";
            for (let e4 = 0; e4 < n3.length - 1; e4 += 2)
              i2 += String.fromCharCode(n3[e4] + 256 * n3[e4 + 1]);
            return i2;
          }
          function M(e3, t3, r3) {
            if (e3 % 1 != 0 || e3 < 0)
              throw new RangeError("offset is not uint");
            if (e3 + t3 > r3)
              throw new RangeError("Trying to access beyond buffer length");
          }
          function O(e3, t3, r3, n3, i2, o2) {
            if (!u.isBuffer(e3))
              throw new TypeError('"buffer" argument must be a Buffer instance');
            if (t3 > i2 || t3 < o2)
              throw new RangeError('"value" argument is out of bounds');
            if (r3 + n3 > e3.length)
              throw new RangeError("Index out of range");
          }
          function x(e3, t3, r3, n3, i2) {
            G(t3, n3, i2, e3, r3, 7);
            let o2 = Number(t3 & BigInt(4294967295));
            e3[r3++] = o2, o2 >>= 8, e3[r3++] = o2, o2 >>= 8, e3[r3++] = o2, o2 >>= 8, e3[r3++] = o2;
            let s2 = Number(t3 >> BigInt(32) & BigInt(4294967295));
            return e3[r3++] = s2, s2 >>= 8, e3[r3++] = s2, s2 >>= 8, e3[r3++] = s2, s2 >>= 8, e3[r3++] = s2, r3;
          }
          function k(e3, t3, r3, n3, i2) {
            G(t3, n3, i2, e3, r3, 7);
            let o2 = Number(t3 & BigInt(4294967295));
            e3[r3 + 7] = o2, o2 >>= 8, e3[r3 + 6] = o2, o2 >>= 8, e3[r3 + 5] = o2, o2 >>= 8, e3[r3 + 4] = o2;
            let s2 = Number(t3 >> BigInt(32) & BigInt(4294967295));
            return e3[r3 + 3] = s2, s2 >>= 8, e3[r3 + 2] = s2, s2 >>= 8, e3[r3 + 1] = s2, s2 >>= 8, e3[r3] = s2, r3 + 8;
          }
          function P(e3, t3, r3, n3, i2, o2) {
            if (r3 + n3 > e3.length)
              throw new RangeError("Index out of range");
            if (r3 < 0)
              throw new RangeError("Index out of range");
          }
          function j(e3, t3, r3, n3, o2) {
            return t3 = +t3, r3 >>>= 0, o2 || P(e3, 0, r3, 4), i.write(e3, t3, r3, n3, 23, 4), r3 + 4;
          }
          function C(e3, t3, r3, n3, o2) {
            return t3 = +t3, r3 >>>= 0, o2 || P(e3, 0, r3, 8), i.write(e3, t3, r3, n3, 52, 8), r3 + 8;
          }
          u.prototype.slice = function(e3, t3) {
            const r3 = this.length;
            (e3 = ~~e3) < 0 ? (e3 += r3) < 0 && (e3 = 0) : e3 > r3 && (e3 = r3), (t3 = t3 === void 0 ? r3 : ~~t3) < 0 ? (t3 += r3) < 0 && (t3 = 0) : t3 > r3 && (t3 = r3), t3 < e3 && (t3 = e3);
            const n3 = this.subarray(e3, t3);
            return Object.setPrototypeOf(n3, u.prototype), n3;
          }, u.prototype.readUintLE = u.prototype.readUIntLE = function(e3, t3, r3) {
            e3 >>>= 0, t3 >>>= 0, r3 || M(e3, t3, this.length);
            let n3 = this[e3], i2 = 1, o2 = 0;
            for (; ++o2 < t3 && (i2 *= 256); )
              n3 += this[e3 + o2] * i2;
            return n3;
          }, u.prototype.readUintBE = u.prototype.readUIntBE = function(e3, t3, r3) {
            e3 >>>= 0, t3 >>>= 0, r3 || M(e3, t3, this.length);
            let n3 = this[e3 + --t3], i2 = 1;
            for (; t3 > 0 && (i2 *= 256); )
              n3 += this[e3 + --t3] * i2;
            return n3;
          }, u.prototype.readUint8 = u.prototype.readUInt8 = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 1, this.length), this[e3];
          }, u.prototype.readUint16LE = u.prototype.readUInt16LE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 2, this.length), this[e3] | this[e3 + 1] << 8;
          }, u.prototype.readUint16BE = u.prototype.readUInt16BE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 2, this.length), this[e3] << 8 | this[e3 + 1];
          }, u.prototype.readUint32LE = u.prototype.readUInt32LE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 4, this.length), (this[e3] | this[e3 + 1] << 8 | this[e3 + 2] << 16) + 16777216 * this[e3 + 3];
          }, u.prototype.readUint32BE = u.prototype.readUInt32BE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 4, this.length), 16777216 * this[e3] + (this[e3 + 1] << 16 | this[e3 + 2] << 8 | this[e3 + 3]);
          }, u.prototype.readBigUInt64LE = Q(function(e3) {
            W(e3 >>>= 0, "offset");
            const t3 = this[e3], r3 = this[e3 + 7];
            t3 !== void 0 && r3 !== void 0 || Y(e3, this.length - 8);
            const n3 = t3 + 256 * this[++e3] + 65536 * this[++e3] + this[++e3] * 2 ** 24, i2 = this[++e3] + 256 * this[++e3] + 65536 * this[++e3] + r3 * 2 ** 24;
            return BigInt(n3) + (BigInt(i2) << BigInt(32));
          }), u.prototype.readBigUInt64BE = Q(function(e3) {
            W(e3 >>>= 0, "offset");
            const t3 = this[e3], r3 = this[e3 + 7];
            t3 !== void 0 && r3 !== void 0 || Y(e3, this.length - 8);
            const n3 = t3 * 2 ** 24 + 65536 * this[++e3] + 256 * this[++e3] + this[++e3], i2 = this[++e3] * 2 ** 24 + 65536 * this[++e3] + 256 * this[++e3] + r3;
            return (BigInt(n3) << BigInt(32)) + BigInt(i2);
          }), u.prototype.readIntLE = function(e3, t3, r3) {
            e3 >>>= 0, t3 >>>= 0, r3 || M(e3, t3, this.length);
            let n3 = this[e3], i2 = 1, o2 = 0;
            for (; ++o2 < t3 && (i2 *= 256); )
              n3 += this[e3 + o2] * i2;
            return i2 *= 128, n3 >= i2 && (n3 -= Math.pow(2, 8 * t3)), n3;
          }, u.prototype.readIntBE = function(e3, t3, r3) {
            e3 >>>= 0, t3 >>>= 0, r3 || M(e3, t3, this.length);
            let n3 = t3, i2 = 1, o2 = this[e3 + --n3];
            for (; n3 > 0 && (i2 *= 256); )
              o2 += this[e3 + --n3] * i2;
            return i2 *= 128, o2 >= i2 && (o2 -= Math.pow(2, 8 * t3)), o2;
          }, u.prototype.readInt8 = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 1, this.length), 128 & this[e3] ? -1 * (255 - this[e3] + 1) : this[e3];
          }, u.prototype.readInt16LE = function(e3, t3) {
            e3 >>>= 0, t3 || M(e3, 2, this.length);
            const r3 = this[e3] | this[e3 + 1] << 8;
            return 32768 & r3 ? 4294901760 | r3 : r3;
          }, u.prototype.readInt16BE = function(e3, t3) {
            e3 >>>= 0, t3 || M(e3, 2, this.length);
            const r3 = this[e3 + 1] | this[e3] << 8;
            return 32768 & r3 ? 4294901760 | r3 : r3;
          }, u.prototype.readInt32LE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 4, this.length), this[e3] | this[e3 + 1] << 8 | this[e3 + 2] << 16 | this[e3 + 3] << 24;
          }, u.prototype.readInt32BE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 4, this.length), this[e3] << 24 | this[e3 + 1] << 16 | this[e3 + 2] << 8 | this[e3 + 3];
          }, u.prototype.readBigInt64LE = Q(function(e3) {
            W(e3 >>>= 0, "offset");
            const t3 = this[e3], r3 = this[e3 + 7];
            t3 !== void 0 && r3 !== void 0 || Y(e3, this.length - 8);
            const n3 = this[e3 + 4] + 256 * this[e3 + 5] + 65536 * this[e3 + 6] + (r3 << 24);
            return (BigInt(n3) << BigInt(32)) + BigInt(t3 + 256 * this[++e3] + 65536 * this[++e3] + this[++e3] * 2 ** 24);
          }), u.prototype.readBigInt64BE = Q(function(e3) {
            W(e3 >>>= 0, "offset");
            const t3 = this[e3], r3 = this[e3 + 7];
            t3 !== void 0 && r3 !== void 0 || Y(e3, this.length - 8);
            const n3 = (t3 << 24) + 65536 * this[++e3] + 256 * this[++e3] + this[++e3];
            return (BigInt(n3) << BigInt(32)) + BigInt(this[++e3] * 2 ** 24 + 65536 * this[++e3] + 256 * this[++e3] + r3);
          }), u.prototype.readFloatLE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 4, this.length), i.read(this, e3, true, 23, 4);
          }, u.prototype.readFloatBE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 4, this.length), i.read(this, e3, false, 23, 4);
          }, u.prototype.readDoubleLE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 8, this.length), i.read(this, e3, true, 52, 8);
          }, u.prototype.readDoubleBE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 8, this.length), i.read(this, e3, false, 52, 8);
          }, u.prototype.writeUintLE = u.prototype.writeUIntLE = function(e3, t3, r3, n3) {
            e3 = +e3, t3 >>>= 0, r3 >>>= 0, n3 || O(this, e3, t3, r3, Math.pow(2, 8 * r3) - 1, 0);
            let i2 = 1, o2 = 0;
            for (this[t3] = 255 & e3; ++o2 < r3 && (i2 *= 256); )
              this[t3 + o2] = e3 / i2 & 255;
            return t3 + r3;
          }, u.prototype.writeUintBE = u.prototype.writeUIntBE = function(e3, t3, r3, n3) {
            e3 = +e3, t3 >>>= 0, r3 >>>= 0, n3 || O(this, e3, t3, r3, Math.pow(2, 8 * r3) - 1, 0);
            let i2 = r3 - 1, o2 = 1;
            for (this[t3 + i2] = 255 & e3; --i2 >= 0 && (o2 *= 256); )
              this[t3 + i2] = e3 / o2 & 255;
            return t3 + r3;
          }, u.prototype.writeUint8 = u.prototype.writeUInt8 = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 1, 255, 0), this[t3] = 255 & e3, t3 + 1;
          }, u.prototype.writeUint16LE = u.prototype.writeUInt16LE = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 2, 65535, 0), this[t3] = 255 & e3, this[t3 + 1] = e3 >>> 8, t3 + 2;
          }, u.prototype.writeUint16BE = u.prototype.writeUInt16BE = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 2, 65535, 0), this[t3] = e3 >>> 8, this[t3 + 1] = 255 & e3, t3 + 2;
          }, u.prototype.writeUint32LE = u.prototype.writeUInt32LE = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 4, 4294967295, 0), this[t3 + 3] = e3 >>> 24, this[t3 + 2] = e3 >>> 16, this[t3 + 1] = e3 >>> 8, this[t3] = 255 & e3, t3 + 4;
          }, u.prototype.writeUint32BE = u.prototype.writeUInt32BE = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 4, 4294967295, 0), this[t3] = e3 >>> 24, this[t3 + 1] = e3 >>> 16, this[t3 + 2] = e3 >>> 8, this[t3 + 3] = 255 & e3, t3 + 4;
          }, u.prototype.writeBigUInt64LE = Q(function(e3, t3 = 0) {
            return x(this, e3, t3, BigInt(0), BigInt("0xffffffffffffffff"));
          }), u.prototype.writeBigUInt64BE = Q(function(e3, t3 = 0) {
            return k(this, e3, t3, BigInt(0), BigInt("0xffffffffffffffff"));
          }), u.prototype.writeIntLE = function(e3, t3, r3, n3) {
            if (e3 = +e3, t3 >>>= 0, !n3) {
              const n4 = Math.pow(2, 8 * r3 - 1);
              O(this, e3, t3, r3, n4 - 1, -n4);
            }
            let i2 = 0, o2 = 1, s2 = 0;
            for (this[t3] = 255 & e3; ++i2 < r3 && (o2 *= 256); )
              e3 < 0 && s2 === 0 && this[t3 + i2 - 1] !== 0 && (s2 = 1), this[t3 + i2] = (e3 / o2 >> 0) - s2 & 255;
            return t3 + r3;
          }, u.prototype.writeIntBE = function(e3, t3, r3, n3) {
            if (e3 = +e3, t3 >>>= 0, !n3) {
              const n4 = Math.pow(2, 8 * r3 - 1);
              O(this, e3, t3, r3, n4 - 1, -n4);
            }
            let i2 = r3 - 1, o2 = 1, s2 = 0;
            for (this[t3 + i2] = 255 & e3; --i2 >= 0 && (o2 *= 256); )
              e3 < 0 && s2 === 0 && this[t3 + i2 + 1] !== 0 && (s2 = 1), this[t3 + i2] = (e3 / o2 >> 0) - s2 & 255;
            return t3 + r3;
          }, u.prototype.writeInt8 = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 1, 127, -128), e3 < 0 && (e3 = 255 + e3 + 1), this[t3] = 255 & e3, t3 + 1;
          }, u.prototype.writeInt16LE = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 2, 32767, -32768), this[t3] = 255 & e3, this[t3 + 1] = e3 >>> 8, t3 + 2;
          }, u.prototype.writeInt16BE = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 2, 32767, -32768), this[t3] = e3 >>> 8, this[t3 + 1] = 255 & e3, t3 + 2;
          }, u.prototype.writeInt32LE = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 4, 2147483647, -2147483648), this[t3] = 255 & e3, this[t3 + 1] = e3 >>> 8, this[t3 + 2] = e3 >>> 16, this[t3 + 3] = e3 >>> 24, t3 + 4;
          }, u.prototype.writeInt32BE = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 4, 2147483647, -2147483648), e3 < 0 && (e3 = 4294967295 + e3 + 1), this[t3] = e3 >>> 24, this[t3 + 1] = e3 >>> 16, this[t3 + 2] = e3 >>> 8, this[t3 + 3] = 255 & e3, t3 + 4;
          }, u.prototype.writeBigInt64LE = Q(function(e3, t3 = 0) {
            return x(this, e3, t3, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
          }), u.prototype.writeBigInt64BE = Q(function(e3, t3 = 0) {
            return k(this, e3, t3, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
          }), u.prototype.writeFloatLE = function(e3, t3, r3) {
            return j(this, e3, t3, true, r3);
          }, u.prototype.writeFloatBE = function(e3, t3, r3) {
            return j(this, e3, t3, false, r3);
          }, u.prototype.writeDoubleLE = function(e3, t3, r3) {
            return C(this, e3, t3, true, r3);
          }, u.prototype.writeDoubleBE = function(e3, t3, r3) {
            return C(this, e3, t3, false, r3);
          }, u.prototype.copy = function(e3, t3, r3, n3) {
            if (!u.isBuffer(e3))
              throw new TypeError("argument should be a Buffer");
            if (r3 || (r3 = 0), n3 || n3 === 0 || (n3 = this.length), t3 >= e3.length && (t3 = e3.length), t3 || (t3 = 0), n3 > 0 && n3 < r3 && (n3 = r3), n3 === r3)
              return 0;
            if (e3.length === 0 || this.length === 0)
              return 0;
            if (t3 < 0)
              throw new RangeError("targetStart out of bounds");
            if (r3 < 0 || r3 >= this.length)
              throw new RangeError("Index out of range");
            if (n3 < 0)
              throw new RangeError("sourceEnd out of bounds");
            n3 > this.length && (n3 = this.length), e3.length - t3 < n3 - r3 && (n3 = e3.length - t3 + r3);
            const i2 = n3 - r3;
            return this === e3 && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t3, r3, n3) : Uint8Array.prototype.set.call(e3, this.subarray(r3, n3), t3), i2;
          }, u.prototype.fill = function(e3, t3, r3, n3) {
            if (typeof e3 == "string") {
              if (typeof t3 == "string" ? (n3 = t3, t3 = 0, r3 = this.length) : typeof r3 == "string" && (n3 = r3, r3 = this.length), n3 !== void 0 && typeof n3 != "string")
                throw new TypeError("encoding must be a string");
              if (typeof n3 == "string" && !u.isEncoding(n3))
                throw new TypeError("Unknown encoding: " + n3);
              if (e3.length === 1) {
                const t4 = e3.charCodeAt(0);
                (n3 === "utf8" && t4 < 128 || n3 === "latin1") && (e3 = t4);
              }
            } else
              typeof e3 == "number" ? e3 &= 255 : typeof e3 == "boolean" && (e3 = Number(e3));
            if (t3 < 0 || this.length < t3 || this.length < r3)
              throw new RangeError("Out of range index");
            if (r3 <= t3)
              return this;
            let i2;
            if (t3 >>>= 0, r3 = r3 === void 0 ? this.length : r3 >>> 0, e3 || (e3 = 0), typeof e3 == "number")
              for (i2 = t3; i2 < r3; ++i2)
                this[i2] = e3;
            else {
              const o2 = u.isBuffer(e3) ? e3 : u.from(e3, n3), s2 = o2.length;
              if (s2 === 0)
                throw new TypeError('The value "' + e3 + '" is invalid for argument "value"');
              for (i2 = 0; i2 < r3 - t3; ++i2)
                this[i2 + t3] = o2[i2 % s2];
            }
            return this;
          };
          const F = {};
          function D(e3, t3, r3) {
            F[e3] = class extends r3 {
              constructor() {
                super(), Object.defineProperty(this, "message", { value: t3.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${e3}]`, this.stack, delete this.name;
              }
              get code() {
                return e3;
              }
              set code(e4) {
                Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: e4, writable: true });
              }
              toString() {
                return `${this.name} [${e3}]: ${this.message}`;
              }
            };
          }
          function $(e3) {
            let t3 = "", r3 = e3.length;
            const n3 = e3[0] === "-" ? 1 : 0;
            for (; r3 >= n3 + 4; r3 -= 3)
              t3 = `_${e3.slice(r3 - 3, r3)}${t3}`;
            return `${e3.slice(0, r3)}${t3}`;
          }
          function G(e3, t3, r3, n3, i2, o2) {
            if (e3 > r3 || e3 < t3) {
              const n4 = typeof t3 == "bigint" ? "n" : "";
              let i3;
              throw i3 = o2 > 3 ? t3 === 0 || t3 === BigInt(0) ? `>= 0${n4} and < 2${n4} ** ${8 * (o2 + 1)}${n4}` : `>= -(2${n4} ** ${8 * (o2 + 1) - 1}${n4}) and < 2 ** ${8 * (o2 + 1) - 1}${n4}` : `>= ${t3}${n4} and <= ${r3}${n4}`, new F.ERR_OUT_OF_RANGE("value", i3, e3);
            }
            !function(e4, t4, r4) {
              W(t4, "offset"), e4[t4] !== void 0 && e4[t4 + r4] !== void 0 || Y(t4, e4.length - (r4 + 1));
            }(n3, i2, o2);
          }
          function W(e3, t3) {
            if (typeof e3 != "number")
              throw new F.ERR_INVALID_ARG_TYPE(t3, "number", e3);
          }
          function Y(e3, t3, r3) {
            if (Math.floor(e3) !== e3)
              throw W(e3, r3), new F.ERR_OUT_OF_RANGE(r3 || "offset", "an integer", e3);
            if (t3 < 0)
              throw new F.ERR_BUFFER_OUT_OF_BOUNDS();
            throw new F.ERR_OUT_OF_RANGE(r3 || "offset", `>= ${r3 ? 1 : 0} and <= ${t3}`, e3);
          }
          D("ERR_BUFFER_OUT_OF_BOUNDS", function(e3) {
            return e3 ? `${e3} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
          }, RangeError), D("ERR_INVALID_ARG_TYPE", function(e3, t3) {
            return `The "${e3}" argument must be of type number. Received type ${typeof t3}`;
          }, TypeError), D("ERR_OUT_OF_RANGE", function(e3, t3, r3) {
            let n3 = `The value of "${e3}" is out of range.`, i2 = r3;
            return Number.isInteger(r3) && Math.abs(r3) > 2 ** 32 ? i2 = $(String(r3)) : typeof r3 == "bigint" && (i2 = String(r3), (r3 > BigInt(2) ** BigInt(32) || r3 < -(BigInt(2) ** BigInt(32))) && (i2 = $(i2)), i2 += "n"), n3 += ` It must be ${t3}. Received ${i2}`, n3;
          }, RangeError);
          const q = /[^+/0-9A-Za-z-_]/g;
          function H(e3, t3) {
            let r3;
            t3 = t3 || 1 / 0;
            const n3 = e3.length;
            let i2 = null;
            const o2 = [];
            for (let s2 = 0; s2 < n3; ++s2) {
              if (r3 = e3.charCodeAt(s2), r3 > 55295 && r3 < 57344) {
                if (!i2) {
                  if (r3 > 56319) {
                    (t3 -= 3) > -1 && o2.push(239, 191, 189);
                    continue;
                  }
                  if (s2 + 1 === n3) {
                    (t3 -= 3) > -1 && o2.push(239, 191, 189);
                    continue;
                  }
                  i2 = r3;
                  continue;
                }
                if (r3 < 56320) {
                  (t3 -= 3) > -1 && o2.push(239, 191, 189), i2 = r3;
                  continue;
                }
                r3 = 65536 + (i2 - 55296 << 10 | r3 - 56320);
              } else
                i2 && (t3 -= 3) > -1 && o2.push(239, 191, 189);
              if (i2 = null, r3 < 128) {
                if ((t3 -= 1) < 0)
                  break;
                o2.push(r3);
              } else if (r3 < 2048) {
                if ((t3 -= 2) < 0)
                  break;
                o2.push(r3 >> 6 | 192, 63 & r3 | 128);
              } else if (r3 < 65536) {
                if ((t3 -= 3) < 0)
                  break;
                o2.push(r3 >> 12 | 224, r3 >> 6 & 63 | 128, 63 & r3 | 128);
              } else {
                if (!(r3 < 1114112))
                  throw new Error("Invalid code point");
                if ((t3 -= 4) < 0)
                  break;
                o2.push(r3 >> 18 | 240, r3 >> 12 & 63 | 128, r3 >> 6 & 63 | 128, 63 & r3 | 128);
              }
            }
            return o2;
          }
          function K(e3) {
            return n2.toByteArray(function(e4) {
              if ((e4 = (e4 = e4.split("=")[0]).trim().replace(q, "")).length < 2)
                return "";
              for (; e4.length % 4 != 0; )
                e4 += "=";
              return e4;
            }(e3));
          }
          function V(e3, t3, r3, n3) {
            let i2;
            for (i2 = 0; i2 < n3 && !(i2 + r3 >= t3.length || i2 >= e3.length); ++i2)
              t3[i2 + r3] = e3[i2];
            return i2;
          }
          function z(e3, t3) {
            return e3 instanceof t3 || e3 != null && e3.constructor != null && e3.constructor.name != null && e3.constructor.name === t3.name;
          }
          function J(e3) {
            return e3 != e3;
          }
          const X = function() {
            const e3 = "0123456789abcdef", t3 = new Array(256);
            for (let r3 = 0; r3 < 16; ++r3) {
              const n3 = 16 * r3;
              for (let i2 = 0; i2 < 16; ++i2)
                t3[n3 + i2] = e3[r3] + e3[i2];
            }
            return t3;
          }();
          function Q(e3) {
            return typeof BigInt == "undefined" ? Z : e3;
          }
          function Z() {
            throw new Error("BigInt not supported");
          }
        }, 141: (e2, t2, r2) => {
          "use strict";
          t2.Commented = r2(20), t2.Diagnose = r2(694), t2.Decoder = r2(774), t2.Encoder = r2(666), t2.Simple = r2(32), t2.Tagged = r2(785), t2.Map = r2(70), t2.UI = t2.Commented.comment, t2.fI = t2.Decoder.decodeAll, t2.h8 = t2.Decoder.decodeFirst, t2.cc = t2.Decoder.decodeAllSync, t2.$u = t2.Decoder.decodeFirstSync, t2.M = t2.Diagnose.diagnose, t2.cv = t2.Encoder.encode, t2.N2 = t2.Encoder.encodeCanonical, t2.TG = t2.Encoder.encodeOne, t2.WR = t2.Encoder.encodeAsync, t2.Jx = t2.Decoder.decodeFirstSync, t2.ww = { decode: t2.Decoder.decodeFirstSync, encode: t2.Encoder.encode, buffer: true, name: "cbor" }, t2.mc = function() {
            t2.Encoder.reset(), t2.Tagged.reset();
          };
        }, 20: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(830), i = r2(873), o = r2(774), s = r2(202), { MT: a, NUMBYTES: u, SYMS: f } = r2(66), { Buffer: h } = r2(764);
          function l(e3) {
            return e3 > 1 ? "s" : "";
          }
          class c extends n2.Transform {
            constructor(e3 = {}) {
              const { depth: t3 = 1, max_depth: r3 = 10, no_summary: n3 = false, tags: i2 = {}, preferWeb: a2, encoding: u2, ...f2 } = e3;
              super({ ...f2, readableObjectMode: false, writableObjectMode: false }), this.depth = t3, this.max_depth = r3, this.all = new s(), i2[24] || (i2[24] = this._tag_24.bind(this)), this.parser = new o({ tags: i2, max_depth: r3, preferWeb: a2, encoding: u2 }), this.parser.on("value", this._on_value.bind(this)), this.parser.on("start", this._on_start.bind(this)), this.parser.on("start-string", this._on_start_string.bind(this)), this.parser.on("stop", this._on_stop.bind(this)), this.parser.on("more-bytes", this._on_more.bind(this)), this.parser.on("error", this._on_error.bind(this)), n3 || this.parser.on("data", this._on_data.bind(this)), this.parser.bs.on("read", this._on_read.bind(this));
            }
            _tag_24(e3) {
              const t3 = new c({ depth: this.depth + 1, no_summary: true });
              t3.on("data", (e4) => this.push(e4)), t3.on("error", (e4) => this.emit("error", e4)), t3.end(e3);
            }
            _transform(e3, t3, r3) {
              this.parser.write(e3, t3, r3);
            }
            _flush(e3) {
              return this.parser._flush(e3);
            }
            static comment(e3, t3 = {}, r3 = null) {
              if (e3 == null)
                throw new Error("input required");
              ({ options: t3, cb: r3 } = function(e4, t4) {
                switch (typeof e4) {
                  case "function":
                    return { options: {}, cb: e4 };
                  case "string":
                    return { options: { encoding: e4 }, cb: t4 };
                  case "number":
                    return { options: { max_depth: e4 }, cb: t4 };
                  case "object":
                    return { options: e4 || {}, cb: t4 };
                  default:
                    throw new TypeError("Unknown option type");
                }
              }(t3, r3));
              const n3 = new s(), { encoding: o2 = "hex", ...a2 } = t3, u2 = new c(a2);
              let f2 = null;
              return typeof r3 == "function" ? (u2.on("end", () => {
                r3(null, n3.toString("utf8"));
              }), u2.on("error", r3)) : f2 = new Promise((e4, t4) => {
                u2.on("end", () => {
                  e4(n3.toString("utf8"));
                }), u2.on("error", t4);
              }), u2.pipe(n3), i.guessEncoding(e3, o2).pipe(u2), f2;
            }
            _on_error(e3) {
              this.push("ERROR: "), this.push(e3.toString()), this.push("\n");
            }
            _on_read(e3) {
              this.all.write(e3);
              const t3 = e3.toString("hex");
              this.push(new Array(this.depth + 1).join("  ")), this.push(t3);
              let r3 = 2 * (this.max_depth - this.depth) - t3.length;
              r3 < 1 && (r3 = 1), this.push(new Array(r3 + 1).join(" ")), this.push("-- ");
            }
            _on_more(e3, t3, r3, n3) {
              let i2 = "";
              switch (this.depth++, e3) {
                case a.POS_INT:
                  i2 = "Positive number,";
                  break;
                case a.NEG_INT:
                  i2 = "Negative number,";
                  break;
                case a.ARRAY:
                  i2 = "Array, length";
                  break;
                case a.MAP:
                  i2 = "Map, count";
                  break;
                case a.BYTE_STRING:
                  i2 = "Bytes, length";
                  break;
                case a.UTF8_STRING:
                  i2 = "String, length";
                  break;
                case a.SIMPLE_FLOAT:
                  i2 = t3 === 1 ? "Simple value," : "Float,";
              }
              this.push(`${i2} next ${t3} byte${l(t3)}
`);
            }
            _on_start_string(e3, t3, r3, n3) {
              let i2 = "";
              switch (this.depth++, e3) {
                case a.BYTE_STRING:
                  i2 = `Bytes, length: ${t3}`;
                  break;
                case a.UTF8_STRING:
                  i2 = `String, length: ${t3.toString()}`;
              }
              this.push(`${i2}
`);
            }
            _on_start(e3, t3, r3, n3) {
              switch (this.depth++, r3) {
                case a.ARRAY:
                  this.push(`[${n3}], `);
                  break;
                case a.MAP:
                  n3 % 2 ? this.push(`{Val:${Math.floor(n3 / 2)}}, `) : this.push(`{Key:${Math.floor(n3 / 2)}}, `);
              }
              switch (e3) {
                case a.TAG:
                  this.push(`Tag #${t3}`), t3 === 24 && this.push(" Encoded CBOR data item");
                  break;
                case a.ARRAY:
                  t3 === f.STREAM ? this.push("Array (streaming)") : this.push(`Array, ${t3} item${l(t3)}`);
                  break;
                case a.MAP:
                  t3 === f.STREAM ? this.push("Map (streaming)") : this.push(`Map, ${t3} pair${l(t3)}`);
                  break;
                case a.BYTE_STRING:
                  this.push("Bytes (streaming)");
                  break;
                case a.UTF8_STRING:
                  this.push("String (streaming)");
              }
              this.push("\n");
            }
            _on_stop(e3) {
              this.depth--;
            }
            _on_value(e3, t3, r3, n3) {
              if (e3 !== f.BREAK)
                switch (t3) {
                  case a.ARRAY:
                    this.push(`[${r3}], `);
                    break;
                  case a.MAP:
                    r3 % 2 ? this.push(`{Val:${Math.floor(r3 / 2)}}, `) : this.push(`{Key:${Math.floor(r3 / 2)}}, `);
                }
              const o2 = i.cborValueToString(e3, -1 / 0);
              switch (typeof e3 == "string" || h.isBuffer(e3) ? (e3.length > 0 && (this.push(o2), this.push("\n")), this.depth--) : (this.push(o2), this.push("\n")), n3) {
                case u.ONE:
                case u.TWO:
                case u.FOUR:
                case u.EIGHT:
                  this.depth--;
              }
            }
            _on_data() {
              this.push("0x"), this.push(this.all.read().toString("hex")), this.push("\n");
            }
          }
          e2.exports = c;
        }, 66: (e2, t2) => {
          "use strict";
          t2.MT = { POS_INT: 0, NEG_INT: 1, BYTE_STRING: 2, UTF8_STRING: 3, ARRAY: 4, MAP: 5, TAG: 6, SIMPLE_FLOAT: 7 }, t2.TAG = { DATE_STRING: 0, DATE_EPOCH: 1, POS_BIGINT: 2, NEG_BIGINT: 3, DECIMAL_FRAC: 4, BIGFLOAT: 5, BASE64URL_EXPECTED: 21, BASE64_EXPECTED: 22, BASE16_EXPECTED: 23, CBOR: 24, URI: 32, BASE64URL: 33, BASE64: 34, REGEXP: 35, MIME: 36, SET: 258 }, t2.NUMBYTES = { ZERO: 0, ONE: 24, TWO: 25, FOUR: 26, EIGHT: 27, INDEFINITE: 31 }, t2.SIMPLE = { FALSE: 20, TRUE: 21, NULL: 22, UNDEFINED: 23 }, t2.SYMS = { NULL: Symbol.for("github.com/hildjj/node-cbor/null"), UNDEFINED: Symbol.for("github.com/hildjj/node-cbor/undef"), PARENT: Symbol.for("github.com/hildjj/node-cbor/parent"), BREAK: Symbol.for("github.com/hildjj/node-cbor/break"), STREAM: Symbol.for("github.com/hildjj/node-cbor/stream") }, t2.SHIFT32 = 4294967296, t2.BI = { MINUS_ONE: BigInt(-1), NEG_MAX: BigInt(-1) - BigInt(Number.MAX_SAFE_INTEGER), MAXINT32: BigInt("0xffffffff"), MAXINT64: BigInt("0xffffffffffffffff"), SHIFT32: BigInt(t2.SHIFT32) };
        }, 774: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(71), i = r2(785), o = r2(32), s = r2(873), a = r2(202), u = (r2(830), r2(66)), { MT: f, NUMBYTES: h, SYMS: l, BI: c } = u, { Buffer: d } = r2(764), p = Symbol("count"), g = Symbol("major type"), y = Symbol("error"), b = Symbol("not found");
          function w(e3, t3, r3) {
            const n3 = [];
            return n3[p] = r3, n3[l.PARENT] = e3, n3[g] = t3, n3;
          }
          function _(e3, t3) {
            const r3 = new a();
            return r3[p] = -1, r3[l.PARENT] = e3, r3[g] = t3, r3;
          }
          class m extends Error {
            constructor(e3, t3) {
              super(`Unexpected data: 0x${e3.toString(16)}`), this.name = "UnexpectedDataError", this.byte = e3, this.value = t3;
            }
          }
          function E(e3, t3) {
            switch (typeof e3) {
              case "function":
                return { options: {}, cb: e3 };
              case "string":
                return { options: { encoding: e3 }, cb: t3 };
              case "object":
                return { options: e3 || {}, cb: t3 };
              default:
                throw new TypeError("Unknown option type");
            }
          }
          class v extends n2 {
            constructor(e3 = {}) {
              const { tags: t3 = {}, max_depth: r3 = -1, preferWeb: n3 = false, required: i2 = false, encoding: o2 = "hex", extendedResults: s2 = false, preventDuplicateKeys: u2 = false, ...f2 } = e3;
              super({ defaultEncoding: o2, ...f2 }), this.running = true, this.max_depth = r3, this.tags = t3, this.preferWeb = n3, this.extendedResults = s2, this.required = i2, this.preventDuplicateKeys = u2, s2 && (this.bs.on("read", this._onRead.bind(this)), this.valueBytes = new a());
            }
            static nullcheck(e3) {
              switch (e3) {
                case l.NULL:
                  return null;
                case l.UNDEFINED:
                  return;
                case b:
                  throw new Error("Value not found");
                default:
                  return e3;
              }
            }
            static decodeFirstSync(e3, t3 = {}) {
              if (e3 == null)
                throw new TypeError("input required");
              ({ options: t3 } = E(t3));
              const { encoding: r3 = "hex", ...n3 } = t3, i2 = new v(n3), o2 = s.guessEncoding(e3, r3), a2 = i2._parse();
              let u2 = a2.next();
              for (; !u2.done; ) {
                const e4 = o2.read(u2.value);
                if (e4 == null || e4.length !== u2.value)
                  throw new Error("Insufficient data");
                i2.extendedResults && i2.valueBytes.write(e4), u2 = a2.next(e4);
              }
              let f2 = null;
              if (i2.extendedResults)
                f2 = u2.value, f2.unused = o2.read();
              else if (f2 = v.nullcheck(u2.value), o2.length > 0) {
                const e4 = o2.read(1);
                throw o2.unshift(e4), new m(e4[0], f2);
              }
              return f2;
            }
            static decodeAllSync(e3, t3 = {}) {
              if (e3 == null)
                throw new TypeError("input required");
              ({ options: t3 } = E(t3));
              const { encoding: r3 = "hex", ...n3 } = t3, i2 = new v(n3), o2 = s.guessEncoding(e3, r3), a2 = [];
              for (; o2.length > 0; ) {
                const e4 = i2._parse();
                let t4 = e4.next();
                for (; !t4.done; ) {
                  const r4 = o2.read(t4.value);
                  if (r4 == null || r4.length !== t4.value)
                    throw new Error("Insufficient data");
                  i2.extendedResults && i2.valueBytes.write(r4), t4 = e4.next(r4);
                }
                a2.push(v.nullcheck(t4.value));
              }
              return a2;
            }
            static decodeFirst(e3, t3 = {}, r3 = null) {
              if (e3 == null)
                throw new TypeError("input required");
              ({ options: t3, cb: r3 } = E(t3, r3));
              const { encoding: n3 = "hex", required: i2 = false, ...o2 } = t3, a2 = new v(o2);
              let u2 = b;
              const f2 = s.guessEncoding(e3, n3), h2 = new Promise((e4, t4) => {
                a2.on("data", (e5) => {
                  u2 = v.nullcheck(e5), a2.close();
                }), a2.once("error", (r4) => a2.extendedResults && r4 instanceof m ? (u2.unused = a2.bs.slice(), e4(u2)) : (u2 !== b && (r4.value = u2), u2 = y, a2.close(), t4(r4))), a2.once("end", () => {
                  switch (u2) {
                    case b:
                      return i2 ? t4(new Error("No CBOR found")) : e4(u2);
                    case y:
                      return;
                    default:
                      return e4(u2);
                  }
                });
              });
              return typeof r3 == "function" && h2.then((e4) => r3(null, e4), r3), f2.pipe(a2), h2;
            }
            static decodeAll(e3, t3 = {}, r3 = null) {
              if (e3 == null)
                throw new TypeError("input required");
              ({ options: t3, cb: r3 } = E(t3, r3));
              const { encoding: n3 = "hex", ...i2 } = t3, o2 = new v(i2), a2 = [];
              o2.on("data", (e4) => a2.push(v.nullcheck(e4)));
              const u2 = new Promise((e4, t4) => {
                o2.on("error", t4), o2.on("end", () => e4(a2));
              });
              return typeof r3 == "function" && u2.then((e4) => r3(void 0, e4), (e4) => r3(e4, void 0)), s.guessEncoding(e3, n3).pipe(o2), u2;
            }
            close() {
              this.running = false, this.__fresh = true;
            }
            _onRead(e3) {
              this.valueBytes.write(e3);
            }
            *_parse() {
              let e3 = null, t3 = 0, r3 = null;
              for (; ; ) {
                if (this.max_depth >= 0 && t3 > this.max_depth)
                  throw new Error(`Maximum depth ${this.max_depth} exceeded`);
                const [n3] = yield 1;
                if (!this.running)
                  throw this.bs.unshift(d.from([n3])), new m(n3);
                const u2 = n3 >> 5, y2 = 31 & n3, b2 = e3 == null ? void 0 : e3[g], E2 = e3 == null ? void 0 : e3.length;
                switch (y2) {
                  case h.ONE:
                    this.emit("more-bytes", u2, 1, b2, E2), [r3] = yield 1;
                    break;
                  case h.TWO:
                  case h.FOUR:
                  case h.EIGHT: {
                    const e4 = 1 << y2 - 24;
                    this.emit("more-bytes", u2, e4, b2, E2);
                    const t4 = yield e4;
                    r3 = u2 === f.SIMPLE_FLOAT ? t4 : s.parseCBORint(y2, t4);
                    break;
                  }
                  case 28:
                  case 29:
                  case 30:
                    throw this.running = false, new Error(`Additional info not implemented: ${y2}`);
                  case h.INDEFINITE:
                    switch (u2) {
                      case f.POS_INT:
                      case f.NEG_INT:
                      case f.TAG:
                        throw new Error(`Invalid indefinite encoding for MT ${u2}`);
                    }
                    r3 = -1;
                    break;
                  default:
                    r3 = y2;
                }
                switch (u2) {
                  case f.POS_INT:
                    break;
                  case f.NEG_INT:
                    r3 = r3 === Number.MAX_SAFE_INTEGER ? c.NEG_MAX : typeof r3 == "bigint" ? c.MINUS_ONE - r3 : -1 - r3;
                    break;
                  case f.BYTE_STRING:
                  case f.UTF8_STRING:
                    switch (r3) {
                      case 0:
                        this.emit("start-string", u2, r3, b2, E2), r3 = u2 === f.UTF8_STRING ? "" : this.preferWeb ? new Uint8Array(0) : d.allocUnsafe(0);
                        break;
                      case -1:
                        this.emit("start", u2, l.STREAM, b2, E2), e3 = _(e3, u2), t3++;
                        continue;
                      default:
                        this.emit("start-string", u2, r3, b2, E2), r3 = yield r3, u2 === f.UTF8_STRING ? r3 = s.utf8(r3) : this.preferWeb && (r3 = new Uint8Array(r3.buffer, r3.byteOffset, r3.length));
                    }
                    break;
                  case f.ARRAY:
                  case f.MAP:
                    switch (r3) {
                      case 0:
                        r3 = u2 === f.MAP ? {} : [];
                        break;
                      case -1:
                        this.emit("start", u2, l.STREAM, b2, E2), e3 = w(e3, u2, -1), t3++;
                        continue;
                      default:
                        this.emit("start", u2, r3, b2, E2), e3 = w(e3, u2, r3 * (u2 - 3)), t3++;
                        continue;
                    }
                    break;
                  case f.TAG:
                    this.emit("start", u2, r3, b2, E2), e3 = w(e3, u2, 1), e3.push(r3), t3++;
                    continue;
                  case f.SIMPLE_FLOAT:
                    if (typeof r3 == "number") {
                      if (y2 === h.ONE && r3 < 32)
                        throw new Error(`Invalid two-byte encoding of simple value ${r3}`);
                      const t4 = e3 != null;
                      r3 = o.decode(r3, t4, t4 && e3[p] < 0);
                    } else
                      r3 = s.parseCBORfloat(r3);
                }
                this.emit("value", r3, b2, E2, y2);
                let S = false;
                for (; e3 != null; ) {
                  if (r3 === l.BREAK)
                    e3[p] = 1;
                  else if (Array.isArray(e3))
                    e3.push(r3);
                  else {
                    const t4 = e3[g];
                    if (t4 != null && t4 !== u2)
                      throw this.running = false, new Error("Invalid major type in indefinite encoding");
                    e3.write(r3);
                  }
                  if (--e3[p] != 0) {
                    S = true;
                    break;
                  }
                  if (--t3, delete e3[p], Array.isArray(e3))
                    switch (e3[g]) {
                      case f.ARRAY:
                        r3 = e3;
                        break;
                      case f.MAP: {
                        let t4 = true;
                        if (e3.length % 2 != 0)
                          throw new Error(`Invalid map length: ${e3.length}`);
                        for (let r4 = 0, n5 = e3.length; r4 < n5; r4 += 2)
                          if (typeof e3[r4] != "string" || e3[r4] === "__proto__") {
                            t4 = false;
                            break;
                          }
                        if (t4) {
                          r3 = {};
                          for (let t5 = 0, n5 = e3.length; t5 < n5; t5 += 2) {
                            if (this.preventDuplicateKeys && Object.prototype.hasOwnProperty.call(r3, e3[t5]))
                              throw new Error("Duplicate keys in a map");
                            r3[e3[t5]] = e3[t5 + 1];
                          }
                        } else {
                          r3 = /* @__PURE__ */ new Map();
                          for (let t5 = 0, n5 = e3.length; t5 < n5; t5 += 2) {
                            if (this.preventDuplicateKeys && r3.has(e3[t5]))
                              throw new Error("Duplicate keys in a map");
                            r3.set(e3[t5], e3[t5 + 1]);
                          }
                        }
                        break;
                      }
                      case f.TAG:
                        r3 = new i(e3[0], e3[1]).convert(this.tags);
                    }
                  else if (e3 instanceof a)
                    switch (e3[g]) {
                      case f.BYTE_STRING:
                        r3 = e3.slice(), this.preferWeb && (r3 = new Uint8Array(r3.buffer, r3.byteOffset, r3.length));
                        break;
                      case f.UTF8_STRING:
                        r3 = e3.toString("utf-8");
                    }
                  this.emit("stop", e3[g]);
                  const n4 = e3;
                  e3 = e3[l.PARENT], delete n4[l.PARENT], delete n4[g];
                }
                if (!S) {
                  if (this.extendedResults) {
                    const e4 = this.valueBytes.slice(), t4 = { value: v.nullcheck(r3), bytes: e4, length: e4.length };
                    return this.valueBytes = new a(), t4;
                  }
                  return r3;
                }
              }
            }
          }
          v.NOT_FOUND = b, e2.exports = v;
        }, 694: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(830), i = r2(774), o = r2(873), s = r2(202), { MT: a, SYMS: u } = r2(66);
          class f extends n2.Transform {
            constructor(e3 = {}) {
              const { separator: t3 = "\n", stream_errors: r3 = false, tags: n3, max_depth: o2, preferWeb: s2, encoding: a2, ...u2 } = e3;
              super({ ...u2, readableObjectMode: false, writableObjectMode: false }), this.float_bytes = -1, this.separator = t3, this.stream_errors = r3, this.parser = new i({ tags: n3, max_depth: o2, preferWeb: s2, encoding: a2 }), this.parser.on("more-bytes", this._on_more.bind(this)), this.parser.on("value", this._on_value.bind(this)), this.parser.on("start", this._on_start.bind(this)), this.parser.on("stop", this._on_stop.bind(this)), this.parser.on("data", this._on_data.bind(this)), this.parser.on("error", this._on_error.bind(this));
            }
            _transform(e3, t3, r3) {
              return this.parser.write(e3, t3, r3);
            }
            _flush(e3) {
              return this.parser._flush((t3) => this.stream_errors ? (t3 && this._on_error(t3), e3()) : e3(t3));
            }
            static diagnose(e3, t3 = {}, r3 = null) {
              if (e3 == null)
                throw new TypeError("input required");
              ({ options: t3, cb: r3 } = function(e4, t4) {
                switch (typeof e4) {
                  case "function":
                    return { options: {}, cb: e4 };
                  case "string":
                    return { options: { encoding: e4 }, cb: t4 };
                  case "object":
                    return { options: e4 || {}, cb: t4 };
                  default:
                    throw new TypeError("Unknown option type");
                }
              }(t3, r3));
              const { encoding: n3 = "hex", ...i2 } = t3, a2 = new s(), u2 = new f(i2);
              let h = null;
              return typeof r3 == "function" ? (u2.on("end", () => r3(null, a2.toString("utf8"))), u2.on("error", r3)) : h = new Promise((e4, t4) => {
                u2.on("end", () => e4(a2.toString("utf8"))), u2.on("error", t4);
              }), u2.pipe(a2), o.guessEncoding(e3, n3).pipe(u2), h;
            }
            _on_error(e3) {
              this.stream_errors ? this.push(e3.toString()) : this.emit("error", e3);
            }
            _on_more(e3, t3, r3, n3) {
              e3 === a.SIMPLE_FLOAT && (this.float_bytes = { 2: 1, 4: 2, 8: 3 }[t3]);
            }
            _fore(e3, t3) {
              switch (e3) {
                case a.BYTE_STRING:
                case a.UTF8_STRING:
                case a.ARRAY:
                  t3 > 0 && this.push(", ");
                  break;
                case a.MAP:
                  t3 > 0 && (t3 % 2 ? this.push(": ") : this.push(", "));
              }
            }
            _on_value(e3, t3, r3) {
              if (e3 === u.BREAK)
                return;
              this._fore(t3, r3);
              const n3 = this.float_bytes;
              this.float_bytes = -1, this.push(o.cborValueToString(e3, n3));
            }
            _on_start(e3, t3, r3, n3) {
              switch (this._fore(r3, n3), e3) {
                case a.TAG:
                  this.push(`${t3}(`);
                  break;
                case a.ARRAY:
                  this.push("[");
                  break;
                case a.MAP:
                  this.push("{");
                  break;
                case a.BYTE_STRING:
                case a.UTF8_STRING:
                  this.push("(");
              }
              t3 === u.STREAM && this.push("_ ");
            }
            _on_stop(e3) {
              switch (e3) {
                case a.TAG:
                  this.push(")");
                  break;
                case a.ARRAY:
                  this.push("]");
                  break;
                case a.MAP:
                  this.push("}");
                  break;
                case a.BYTE_STRING:
                case a.UTF8_STRING:
                  this.push(")");
              }
            }
            _on_data() {
              this.push(this.separator);
            }
          }
          e2.exports = f;
        }, 666: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(830), i = r2(202), o = r2(873), s = r2(66), { MT: a, NUMBYTES: u, SHIFT32: f, SIMPLE: h, SYMS: l, TAG: c, BI: d } = s, { Buffer: p } = r2(764), g = a.SIMPLE_FLOAT << 5 | u.TWO, y = a.SIMPLE_FLOAT << 5 | u.FOUR, b = a.SIMPLE_FLOAT << 5 | u.EIGHT, w = a.SIMPLE_FLOAT << 5 | h.TRUE, _ = a.SIMPLE_FLOAT << 5 | h.FALSE, m = a.SIMPLE_FLOAT << 5 | h.UNDEFINED, E = a.SIMPLE_FLOAT << 5 | h.NULL, v = p.from([255]), S = p.from("f97e00", "hex"), T = p.from("f9fc00", "hex"), I = p.from("f97c00", "hex"), A = p.from("f98000", "hex"), B = {};
          let R = {};
          class U extends n2.Transform {
            constructor(e3 = {}) {
              const { canonical: t3 = false, encodeUndefined: r3, disallowUndefinedKeys: n3 = false, dateType: i2 = "number", collapseBigIntegers: o2 = false, detectLoops: s2 = false, omitUndefinedProperties: a2 = false, genTypes: u2 = [], ...f2 } = e3;
              if (super({ ...f2, readableObjectMode: false, writableObjectMode: true }), this.canonical = t3, this.encodeUndefined = r3, this.disallowUndefinedKeys = n3, this.dateType = function(e4) {
                if (!e4)
                  return "number";
                switch (e4.toLowerCase()) {
                  case "number":
                    return "number";
                  case "float":
                    return "float";
                  case "int":
                  case "integer":
                    return "int";
                  case "string":
                    return "string";
                }
                throw new TypeError(`dateType invalid, got "${e4}"`);
              }(i2), this.collapseBigIntegers = !!this.canonical || o2, this.detectLoops = void 0, typeof s2 == "boolean")
                s2 && (this.detectLoops = new WeakSet());
              else {
                if (!(s2 instanceof WeakSet))
                  throw new TypeError("detectLoops must be boolean or WeakSet");
                this.detectLoops = s2;
              }
              if (this.omitUndefinedProperties = a2, this.semanticTypes = { ...U.SEMANTIC_TYPES }, Array.isArray(u2))
                for (let e4 = 0, t4 = u2.length; e4 < t4; e4 += 2)
                  this.addSemanticType(u2[e4], u2[e4 + 1]);
              else
                for (const [e4, t4] of Object.entries(u2))
                  this.addSemanticType(e4, t4);
            }
            _transform(e3, t3, r3) {
              return r3(this.pushAny(e3) === false ? new Error("Push Error") : void 0);
            }
            _flush(e3) {
              return e3();
            }
            _pushUInt8(e3) {
              const t3 = p.allocUnsafe(1);
              return t3.writeUInt8(e3, 0), this.push(t3);
            }
            _pushUInt16BE(e3) {
              const t3 = p.allocUnsafe(2);
              return t3.writeUInt16BE(e3, 0), this.push(t3);
            }
            _pushUInt32BE(e3) {
              const t3 = p.allocUnsafe(4);
              return t3.writeUInt32BE(e3, 0), this.push(t3);
            }
            _pushFloatBE(e3) {
              const t3 = p.allocUnsafe(4);
              return t3.writeFloatBE(e3, 0), this.push(t3);
            }
            _pushDoubleBE(e3) {
              const t3 = p.allocUnsafe(8);
              return t3.writeDoubleBE(e3, 0), this.push(t3);
            }
            _pushNaN() {
              return this.push(S);
            }
            _pushInfinity(e3) {
              const t3 = e3 < 0 ? T : I;
              return this.push(t3);
            }
            _pushFloat(e3) {
              if (this.canonical) {
                const t3 = p.allocUnsafe(2);
                if (o.writeHalf(t3, e3))
                  return this._pushUInt8(g) && this.push(t3);
              }
              return Math.fround(e3) === e3 ? this._pushUInt8(y) && this._pushFloatBE(e3) : this._pushUInt8(b) && this._pushDoubleBE(e3);
            }
            _pushInt(e3, t3, r3) {
              const n3 = t3 << 5;
              if (e3 < 24)
                return this._pushUInt8(n3 | e3);
              if (e3 <= 255)
                return this._pushUInt8(n3 | u.ONE) && this._pushUInt8(e3);
              if (e3 <= 65535)
                return this._pushUInt8(n3 | u.TWO) && this._pushUInt16BE(e3);
              if (e3 <= 4294967295)
                return this._pushUInt8(n3 | u.FOUR) && this._pushUInt32BE(e3);
              let i2 = Number.MAX_SAFE_INTEGER;
              return t3 === a.NEG_INT && i2--, e3 <= i2 ? this._pushUInt8(n3 | u.EIGHT) && this._pushUInt32BE(Math.floor(e3 / f)) && this._pushUInt32BE(e3 % f) : t3 === a.NEG_INT ? this._pushFloat(r3) : this._pushFloat(e3);
            }
            _pushIntNum(e3) {
              return Object.is(e3, -0) ? this.push(A) : e3 < 0 ? this._pushInt(-e3 - 1, a.NEG_INT, e3) : this._pushInt(e3, a.POS_INT);
            }
            _pushNumber(e3) {
              return isNaN(e3) ? this._pushNaN() : isFinite(e3) ? Math.round(e3) === e3 ? this._pushIntNum(e3) : this._pushFloat(e3) : this._pushInfinity(e3);
            }
            _pushString(e3) {
              const t3 = p.byteLength(e3, "utf8");
              return this._pushInt(t3, a.UTF8_STRING) && this.push(e3, "utf8");
            }
            _pushBoolean(e3) {
              return this._pushUInt8(e3 ? w : _);
            }
            _pushUndefined(e3) {
              switch (typeof this.encodeUndefined) {
                case "undefined":
                  return this._pushUInt8(m);
                case "function":
                  return this.pushAny(this.encodeUndefined(e3));
                case "object": {
                  const e4 = o.bufferishToBuffer(this.encodeUndefined);
                  if (e4)
                    return this.push(e4);
                }
              }
              return this.pushAny(this.encodeUndefined);
            }
            _pushNull(e3) {
              return this._pushUInt8(E);
            }
            _pushTag(e3) {
              return this._pushInt(e3, a.TAG);
            }
            _pushJSBigint(e3) {
              let t3 = a.POS_INT, r3 = c.POS_BIGINT;
              if (e3 < 0 && (e3 = -e3 + d.MINUS_ONE, t3 = a.NEG_INT, r3 = c.NEG_BIGINT), this.collapseBigIntegers && e3 <= d.MAXINT64)
                return e3 <= 4294967295 ? this._pushInt(Number(e3), t3) : this._pushUInt8(t3 << 5 | u.EIGHT) && this._pushUInt32BE(Number(e3 / d.SHIFT32)) && this._pushUInt32BE(Number(e3 % d.SHIFT32));
              let n3 = e3.toString(16);
              n3.length % 2 && (n3 = `0${n3}`);
              const i2 = p.from(n3, "hex");
              return this._pushTag(r3) && U._pushBuffer(this, i2);
            }
            _pushObject(e3, t3) {
              if (!e3)
                return this._pushNull(e3);
              if (!(t3 = { indefinite: false, skipTypes: false, ...t3 }).indefinite && this.detectLoops) {
                if (this.detectLoops.has(e3))
                  throw new Error("Loop detected while CBOR encoding.\nCall removeLoopDetectors before resuming.");
                this.detectLoops.add(e3);
              }
              if (!t3.skipTypes) {
                const t4 = e3.encodeCBOR;
                if (typeof t4 == "function")
                  return t4.call(e3, this);
                const r4 = this.semanticTypes[e3.constructor.name];
                if (r4)
                  return r4.call(e3, this, e3);
              }
              const r3 = Object.keys(e3).filter((t4) => {
                const r4 = typeof e3[t4];
                return r4 !== "function" && (!this.omitUndefinedProperties || r4 !== "undefined");
              }), n3 = {};
              if (this.canonical && r3.sort((e4, t4) => {
                const r4 = n3[e4] || (n3[e4] = U.encode(e4)), i3 = n3[t4] || (n3[t4] = U.encode(t4));
                return r4.compare(i3);
              }), t3.indefinite) {
                if (!this._pushUInt8(a.MAP << 5 | u.INDEFINITE))
                  return false;
              } else if (!this._pushInt(r3.length, a.MAP))
                return false;
              let i2 = null;
              for (let t4 = 0, o2 = r3.length; t4 < o2; t4++) {
                const o3 = r3[t4];
                if (this.canonical && (i2 = n3[o3])) {
                  if (!this.push(i2))
                    return false;
                } else if (!this._pushString(o3))
                  return false;
                if (!this.pushAny(e3[o3]))
                  return false;
              }
              if (t3.indefinite) {
                if (!this.push(v))
                  return false;
              } else
                this.detectLoops && this.detectLoops.delete(e3);
              return true;
            }
            _encodeAll(e3) {
              const t3 = new i({ highWaterMark: this.readableHighWaterMark });
              this.pipe(t3);
              for (const t4 of e3)
                this.pushAny(t4);
              return this.end(), t3.read();
            }
            addSemanticType(e3, t3) {
              const r3 = typeof e3 == "string" ? e3 : e3.name, n3 = this.semanticTypes[r3];
              if (t3) {
                if (typeof t3 != "function")
                  throw new TypeError("fun must be of type function");
                this.semanticTypes[r3] = t3;
              } else
                n3 && delete this.semanticTypes[r3];
              return n3;
            }
            pushAny(e3) {
              switch (typeof e3) {
                case "number":
                  return this._pushNumber(e3);
                case "bigint":
                  return this._pushJSBigint(e3);
                case "string":
                  return this._pushString(e3);
                case "boolean":
                  return this._pushBoolean(e3);
                case "undefined":
                  return this._pushUndefined(e3);
                case "object":
                  return this._pushObject(e3);
                case "symbol":
                  switch (e3) {
                    case l.NULL:
                      return this._pushNull(null);
                    case l.UNDEFINED:
                      return this._pushUndefined(void 0);
                    default:
                      throw new TypeError(`Unknown symbol: ${e3.toString()}`);
                  }
                default:
                  throw new TypeError(`Unknown type: ${typeof e3}, ${typeof e3.toString == "function" ? e3.toString() : ""}`);
              }
            }
            static pushArray(e3, t3, r3) {
              r3 = { indefinite: false, ...r3 };
              const n3 = t3.length;
              if (r3.indefinite) {
                if (!e3._pushUInt8(a.ARRAY << 5 | u.INDEFINITE))
                  return false;
              } else if (!e3._pushInt(n3, a.ARRAY))
                return false;
              for (let r4 = 0; r4 < n3; r4++)
                if (!e3.pushAny(t3[r4]))
                  return false;
              return !(r3.indefinite && !e3.push(v));
            }
            removeLoopDetectors() {
              return !!this.detectLoops && (this.detectLoops = new WeakSet(), true);
            }
            static _pushDate(e3, t3) {
              switch (e3.dateType) {
                case "string":
                  return e3._pushTag(c.DATE_STRING) && e3._pushString(t3.toISOString());
                case "int":
                  return e3._pushTag(c.DATE_EPOCH) && e3._pushIntNum(Math.round(t3.getTime() / 1e3));
                case "float":
                  return e3._pushTag(c.DATE_EPOCH) && e3._pushFloat(t3.getTime() / 1e3);
                default:
                  return e3._pushTag(c.DATE_EPOCH) && e3.pushAny(t3.getTime() / 1e3);
              }
            }
            static _pushBuffer(e3, t3) {
              return e3._pushInt(t3.length, a.BYTE_STRING) && e3.push(t3);
            }
            static _pushNoFilter(e3, t3) {
              return U._pushBuffer(e3, t3.slice());
            }
            static _pushRegexp(e3, t3) {
              return e3._pushTag(c.REGEXP) && e3.pushAny(t3.source);
            }
            static _pushSet(e3, t3) {
              if (!e3._pushTag(c.SET))
                return false;
              if (!e3._pushInt(t3.size, a.ARRAY))
                return false;
              for (const r3 of t3)
                if (!e3.pushAny(r3))
                  return false;
              return true;
            }
            static _pushURL(e3, t3) {
              return e3._pushTag(c.URI) && e3.pushAny(t3.toString());
            }
            static _pushBoxed(e3, t3) {
              return e3.pushAny(t3.valueOf());
            }
            static _pushMap(e3, t3, r3) {
              r3 = { indefinite: false, ...r3 };
              let n3 = [...t3.entries()];
              if (e3.omitUndefinedProperties && (n3 = n3.filter(([e4, t4]) => t4 !== void 0)), r3.indefinite) {
                if (!e3._pushUInt8(a.MAP << 5 | u.INDEFINITE))
                  return false;
              } else if (!e3._pushInt(n3.length, a.MAP))
                return false;
              if (e3.canonical) {
                const t4 = new U({ genTypes: e3.semanticTypes, canonical: e3.canonical, detectLoops: Boolean(e3.detectLoops), dateType: e3.dateType, disallowUndefinedKeys: e3.disallowUndefinedKeys, collapseBigIntegers: e3.collapseBigIntegers }), r4 = new i({ highWaterMark: e3.readableHighWaterMark });
                t4.pipe(r4), n3.sort(([e4], [n4]) => {
                  t4.pushAny(e4);
                  const i2 = r4.read();
                  t4.pushAny(n4);
                  const o2 = r4.read();
                  return i2.compare(o2);
                });
                for (const [t5, r5] of n3) {
                  if (e3.disallowUndefinedKeys && t5 === void 0)
                    throw new Error("Invalid Map key: undefined");
                  if (!e3.pushAny(t5) || !e3.pushAny(r5))
                    return false;
                }
              } else
                for (const [t4, r4] of n3) {
                  if (e3.disallowUndefinedKeys && t4 === void 0)
                    throw new Error("Invalid Map key: undefined");
                  if (!e3.pushAny(t4) || !e3.pushAny(r4))
                    return false;
                }
              return !(r3.indefinite && !e3.push(v));
            }
            static _pushTypedArray(e3, t3) {
              let r3 = 64, n3 = t3.BYTES_PER_ELEMENT;
              const { name: i2 } = t3.constructor;
              return i2.startsWith("Float") ? (r3 |= 16, n3 /= 2) : i2.includes("U") || (r3 |= 8), (i2.includes("Clamped") || n3 !== 1 && !o.isBigEndian()) && (r3 |= 4), r3 |= { 1: 0, 2: 1, 4: 2, 8: 3 }[n3], !!e3._pushTag(r3) && U._pushBuffer(e3, p.from(t3.buffer, t3.byteOffset, t3.byteLength));
            }
            static _pushArrayBuffer(e3, t3) {
              return U._pushBuffer(e3, p.from(t3));
            }
            static encodeIndefinite(e3, t3, r3 = {}) {
              if (t3 == null) {
                if (this == null)
                  throw new Error("No object to encode");
                t3 = this;
              }
              const { chunkSize: n3 = 4096 } = r3;
              let i2 = true;
              const s2 = typeof t3;
              let f2 = null;
              if (s2 === "string") {
                i2 = i2 && e3._pushUInt8(a.UTF8_STRING << 5 | u.INDEFINITE);
                let r4 = 0;
                for (; r4 < t3.length; ) {
                  const o2 = r4 + n3;
                  i2 = i2 && e3._pushString(t3.slice(r4, o2)), r4 = o2;
                }
                i2 = i2 && e3.push(v);
              } else if (f2 = o.bufferishToBuffer(t3)) {
                i2 = i2 && e3._pushUInt8(a.BYTE_STRING << 5 | u.INDEFINITE);
                let t4 = 0;
                for (; t4 < f2.length; ) {
                  const r4 = t4 + n3;
                  i2 = i2 && U._pushBuffer(e3, f2.slice(t4, r4)), t4 = r4;
                }
                i2 = i2 && e3.push(v);
              } else if (Array.isArray(t3))
                i2 = i2 && U.pushArray(e3, t3, { indefinite: true });
              else if (t3 instanceof Map)
                i2 = i2 && U._pushMap(e3, t3, { indefinite: true });
              else {
                if (s2 !== "object")
                  throw new Error("Invalid indefinite encoding");
                i2 = i2 && e3._pushObject(t3, { indefinite: true, skipTypes: true });
              }
              return i2;
            }
            static encode(...e3) {
              return new U()._encodeAll(e3);
            }
            static encodeCanonical(...e3) {
              return new U({ canonical: true })._encodeAll(e3);
            }
            static encodeOne(e3, t3) {
              return new U(t3)._encodeAll([e3]);
            }
            static encodeAsync(e3, t3) {
              return new Promise((r3, n3) => {
                const i2 = [], o2 = new U(t3);
                o2.on("data", (e4) => i2.push(e4)), o2.on("error", n3), o2.on("finish", () => r3(p.concat(i2))), o2.pushAny(e3), o2.end();
              });
            }
            static get SEMANTIC_TYPES() {
              return R;
            }
            static set SEMANTIC_TYPES(e3) {
              R = e3;
            }
            static reset() {
              U.SEMANTIC_TYPES = { ...B };
            }
          }
          Object.assign(B, { Array: U.pushArray, Date: U._pushDate, Buffer: U._pushBuffer, [p.name]: U._pushBuffer, Map: U._pushMap, NoFilter: U._pushNoFilter, [i.name]: U._pushNoFilter, RegExp: U._pushRegexp, Set: U._pushSet, ArrayBuffer: U._pushArrayBuffer, Uint8ClampedArray: U._pushTypedArray, Uint8Array: U._pushTypedArray, Uint16Array: U._pushTypedArray, Uint32Array: U._pushTypedArray, Int8Array: U._pushTypedArray, Int16Array: U._pushTypedArray, Int32Array: U._pushTypedArray, Float32Array: U._pushTypedArray, Float64Array: U._pushTypedArray, URL: U._pushURL, Boolean: U._pushBoxed, Number: U._pushBoxed, String: U._pushBoxed }), typeof BigUint64Array != "undefined" && (B[BigUint64Array.name] = U._pushTypedArray), typeof BigInt64Array != "undefined" && (B[BigInt64Array.name] = U._pushTypedArray), U.reset(), e2.exports = U;
        }, 70: (e2, t2, r2) => {
          "use strict";
          const { Buffer: n2 } = r2(764), i = r2(666), o = r2(774), { MT: s } = r2(66);
          class a extends Map {
            constructor(e3) {
              super(e3);
            }
            static _encode(e3) {
              return i.encodeCanonical(e3).toString("base64");
            }
            static _decode(e3) {
              return o.decodeFirstSync(e3, "base64");
            }
            get(e3) {
              return super.get(a._encode(e3));
            }
            set(e3, t3) {
              return super.set(a._encode(e3), t3);
            }
            delete(e3) {
              return super.delete(a._encode(e3));
            }
            has(e3) {
              return super.has(a._encode(e3));
            }
            *keys() {
              for (const e3 of super.keys())
                yield a._decode(e3);
            }
            *entries() {
              for (const e3 of super.entries())
                yield [a._decode(e3[0]), e3[1]];
            }
            [Symbol.iterator]() {
              return this.entries();
            }
            forEach(e3, t3) {
              if (typeof e3 != "function")
                throw new TypeError("Must be function");
              for (const t4 of super.entries())
                e3.call(this, t4[1], a._decode(t4[0]), this);
            }
            encodeCBOR(e3) {
              if (!e3._pushInt(this.size, s.MAP))
                return false;
              if (e3.canonical) {
                const t3 = Array.from(super.entries()).map((e4) => [n2.from(e4[0], "base64"), e4[1]]);
                t3.sort((e4, t4) => e4[0].compare(t4[0]));
                for (const r3 of t3)
                  if (!e3.push(r3[0]) || !e3.pushAny(r3[1]))
                    return false;
              } else
                for (const t3 of super.entries())
                  if (!e3.push(n2.from(t3[0], "base64")) || !e3.pushAny(t3[1]))
                    return false;
              return true;
            }
          }
          e2.exports = a;
        }, 32: (e2, t2, r2) => {
          "use strict";
          const { MT: n2, SIMPLE: i, SYMS: o } = r2(66);
          class s {
            constructor(e3) {
              if (typeof e3 != "number")
                throw new Error("Invalid Simple type: " + typeof e3);
              if (e3 < 0 || e3 > 255 || (0 | e3) !== e3)
                throw new Error(`value must be a small positive integer: ${e3}`);
              this.value = e3;
            }
            toString() {
              return `simple(${this.value})`;
            }
            [Symbol.for("nodejs.util.inspect.custom")](e3, t3) {
              return `simple(${this.value})`;
            }
            encodeCBOR(e3) {
              return e3._pushInt(this.value, n2.SIMPLE_FLOAT);
            }
            static isSimple(e3) {
              return e3 instanceof s;
            }
            static decode(e3, t3 = true, r3 = false) {
              switch (e3) {
                case i.FALSE:
                  return false;
                case i.TRUE:
                  return true;
                case i.NULL:
                  return t3 ? null : o.NULL;
                case i.UNDEFINED:
                  if (t3)
                    return;
                  return o.UNDEFINED;
                case -1:
                  if (!t3 || !r3)
                    throw new Error("Invalid BREAK");
                  return o.BREAK;
                default:
                  return new s(e3);
              }
            }
          }
          e2.exports = s;
        }, 785: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(66), i = r2(873), o = Symbol("INTERNAL_JSON");
          function s(e3, t3) {
            if (i.isBufferish(e3))
              e3.toJSON = t3;
            else if (Array.isArray(e3))
              for (const r3 of e3)
                s(r3, t3);
            else if (e3 && typeof e3 == "object" && (!(e3 instanceof p) || e3.tag < 21 || e3.tag > 23))
              for (const r3 of Object.values(e3))
                s(r3, t3);
          }
          function a() {
            return i.base64(this);
          }
          function u() {
            return i.base64url(this);
          }
          function f() {
            return this.toString("hex");
          }
          const h = { 0: (e3) => new Date(e3), 1: (e3) => new Date(1e3 * e3), 2: (e3) => i.bufferToBigInt(e3), 3: (e3) => n2.BI.MINUS_ONE - i.bufferToBigInt(e3), 21: (e3, t3) => (i.isBufferish(e3) ? t3[o] = u : s(e3, u), t3), 22: (e3, t3) => (i.isBufferish(e3) ? t3[o] = a : s(e3, a), t3), 23: (e3, t3) => (i.isBufferish(e3) ? t3[o] = f : s(e3, f), t3), 32: (e3) => new URL(e3), 33: (e3, t3) => {
            if (!e3.match(/^[a-zA-Z0-9_-]+$/))
              throw new Error("Invalid base64url characters");
            const r3 = e3.length % 4;
            if (r3 === 1)
              throw new Error("Invalid base64url length");
            if (r3 === 2) {
              if ("AQgw".indexOf(e3[e3.length - 1]) === -1)
                throw new Error("Invalid base64 padding");
            } else if (r3 === 3 && "AEIMQUYcgkosw048".indexOf(e3[e3.length - 1]) === -1)
              throw new Error("Invalid base64 padding");
            return t3;
          }, 34: (e3, t3) => {
            const r3 = e3.match(/^[a-zA-Z0-9+/]+(?<padding>={0,2})$/);
            if (!r3)
              throw new Error("Invalid base64 characters");
            if (e3.length % 4 != 0)
              throw new Error("Invalid base64 length");
            if (r3.groups.padding === "=") {
              if ("AQgw".indexOf(e3[e3.length - 2]) === -1)
                throw new Error("Invalid base64 padding");
            } else if (r3.groups.padding === "==" && "AEIMQUYcgkosw048".indexOf(e3[e3.length - 3]) === -1)
              throw new Error("Invalid base64 padding");
            return t3;
          }, 35: (e3) => new RegExp(e3), 258: (e3) => new Set(e3) }, l = { 64: Uint8Array, 65: Uint16Array, 66: Uint32Array, 68: Uint8ClampedArray, 69: Uint16Array, 70: Uint32Array, 72: Int8Array, 73: Int16Array, 74: Int32Array, 77: Int16Array, 78: Int32Array, 81: Float32Array, 82: Float64Array, 85: Float32Array, 86: Float64Array };
          function c(e3, t3) {
            if (!i.isBufferish(e3))
              throw new TypeError("val not a buffer");
            const { tag: r3 } = t3, n3 = l[r3];
            if (!n3)
              throw new Error(`Invalid typed array tag: ${r3}`);
            const o2 = 2 ** (((16 & r3) >> 4) + (3 & r3));
            return !(4 & r3) !== i.isBigEndian() && o2 > 1 && function(e4, t4, r4, n4) {
              const i2 = new DataView(e4), [o3, s2] = { 2: [i2.getUint16, i2.setUint16], 4: [i2.getUint32, i2.setUint32], 8: [i2.getBigUint64, i2.setBigUint64] }[t4], a2 = r4 + n4;
              for (let e5 = r4; e5 < a2; e5 += t4)
                s2.call(i2, e5, o3.call(i2, e5, true));
            }(e3.buffer, o2, e3.byteOffset, e3.byteLength), new n3(e3.buffer.slice(e3.byteOffset, e3.byteOffset + e3.byteLength));
          }
          typeof BigUint64Array != "undefined" && (l[67] = BigUint64Array, l[71] = BigUint64Array), typeof BigInt64Array != "undefined" && (l[75] = BigInt64Array, l[79] = BigInt64Array);
          for (const e3 of Object.keys(l))
            h[e3] = c;
          let d = {};
          class p {
            constructor(e3, t3, r3) {
              if (this.tag = e3, this.value = t3, this.err = r3, typeof this.tag != "number")
                throw new Error(`Invalid tag type (${typeof this.tag})`);
              if (this.tag < 0 || (0 | this.tag) !== this.tag)
                throw new Error(`Tag must be a positive integer: ${this.tag}`);
            }
            toJSON() {
              if (this[o])
                return this[o].call(this.value);
              const e3 = { tag: this.tag, value: this.value };
              return this.err && (e3.err = this.err), e3;
            }
            toString() {
              return `${this.tag}(${JSON.stringify(this.value)})`;
            }
            encodeCBOR(e3) {
              return e3._pushTag(this.tag), e3.pushAny(this.value);
            }
            convert(e3) {
              let t3 = e3 == null ? void 0 : e3[this.tag];
              if (typeof t3 != "function" && (t3 = p.TAGS[this.tag], typeof t3 != "function"))
                return this;
              try {
                return t3.call(this, this.value, this);
              } catch (e4) {
                return e4 && e4.message && e4.message.length > 0 ? this.err = e4.message : this.err = e4, this;
              }
            }
            static get TAGS() {
              return d;
            }
            static set TAGS(e3) {
              d = e3;
            }
            static reset() {
              p.TAGS = { ...h };
            }
          }
          p.INTERNAL_JSON = o, p.reset(), e2.exports = p;
        }, 873: (e2, t2, r2) => {
          "use strict";
          const { Buffer: n2 } = r2(764), i = r2(202), o = r2(830), s = r2(66), { NUMBYTES: a, SHIFT32: u, BI: f, SYMS: h } = s, l = new TextDecoder("utf8", { fatal: true, ignoreBOM: true });
          t2.utf8 = (e3) => l.decode(e3), t2.utf8.checksUTF8 = true, t2.isBufferish = function(e3) {
            return e3 && typeof e3 == "object" && (n2.isBuffer(e3) || e3 instanceof Uint8Array || e3 instanceof Uint8ClampedArray || e3 instanceof ArrayBuffer || e3 instanceof DataView);
          }, t2.bufferishToBuffer = function(e3) {
            return n2.isBuffer(e3) ? e3 : ArrayBuffer.isView(e3) ? n2.from(e3.buffer, e3.byteOffset, e3.byteLength) : e3 instanceof ArrayBuffer ? n2.from(e3) : null;
          }, t2.parseCBORint = function(e3, t3) {
            switch (e3) {
              case a.ONE:
                return t3.readUInt8(0);
              case a.TWO:
                return t3.readUInt16BE(0);
              case a.FOUR:
                return t3.readUInt32BE(0);
              case a.EIGHT: {
                const e4 = t3.readUInt32BE(0), r3 = t3.readUInt32BE(4);
                return e4 > 2097151 ? BigInt(e4) * f.SHIFT32 + BigInt(r3) : e4 * u + r3;
              }
              default:
                throw new Error(`Invalid additional info for int: ${e3}`);
            }
          }, t2.writeHalf = function(e3, t3) {
            const r3 = n2.allocUnsafe(4);
            r3.writeFloatBE(t3, 0);
            const i2 = r3.readUInt32BE(0);
            if ((8191 & i2) != 0)
              return false;
            let o2 = i2 >> 16 & 32768;
            const s2 = i2 >> 23 & 255, a2 = 8388607 & i2;
            if (s2 >= 113 && s2 <= 142)
              o2 += (s2 - 112 << 10) + (a2 >> 13);
            else {
              if (!(s2 >= 103 && s2 < 113))
                return false;
              if (a2 & (1 << 126 - s2) - 1)
                return false;
              o2 += a2 + 8388608 >> 126 - s2;
            }
            return e3.writeUInt16BE(o2), true;
          }, t2.parseHalf = function(e3) {
            const t3 = 128 & e3[0] ? -1 : 1, r3 = (124 & e3[0]) >> 2, n3 = (3 & e3[0]) << 8 | e3[1];
            return r3 ? r3 === 31 ? t3 * (n3 ? NaN : 1 / 0) : t3 * 2 ** (r3 - 25) * (1024 + n3) : 5960464477539063e-23 * t3 * n3;
          }, t2.parseCBORfloat = function(e3) {
            switch (e3.length) {
              case 2:
                return t2.parseHalf(e3);
              case 4:
                return e3.readFloatBE(0);
              case 8:
                return e3.readDoubleBE(0);
              default:
                throw new Error(`Invalid float size: ${e3.length}`);
            }
          }, t2.hex = function(e3) {
            return n2.from(e3.replace(/^0x/, ""), "hex");
          }, t2.bin = function(e3) {
            let t3 = 0, r3 = (e3 = e3.replace(/\s/g, "")).length % 8 || 8;
            const i2 = [];
            for (; r3 <= e3.length; )
              i2.push(parseInt(e3.slice(t3, r3), 2)), t3 = r3, r3 += 8;
            return n2.from(i2);
          }, t2.arrayEqual = function(e3, t3) {
            return e3 == null && t3 == null || e3 != null && t3 != null && e3.length === t3.length && e3.every((e4, r3) => e4 === t3[r3]);
          }, t2.bufferToBigInt = function(e3) {
            return BigInt(`0x${e3.toString("hex")}`);
          }, t2.cborValueToString = function(e3, r3 = -1) {
            switch (typeof e3) {
              case "symbol": {
                switch (e3) {
                  case h.NULL:
                    return "null";
                  case h.UNDEFINED:
                    return "undefined";
                  case h.BREAK:
                    return "BREAK";
                }
                if (e3.description)
                  return e3.description;
                const t3 = e3.toString().match(/^Symbol\((?<name>.*)\)/);
                return t3 && t3.groups.name ? t3.groups.name : "Symbol";
              }
              case "string":
                return JSON.stringify(e3);
              case "bigint":
                return e3.toString();
              case "number": {
                const t3 = Object.is(e3, -0) ? "-0" : String(e3);
                return r3 > 0 ? `${t3}_${r3}` : t3;
              }
              case "object": {
                const n3 = t2.bufferishToBuffer(e3);
                if (n3) {
                  const e4 = n3.toString("hex");
                  return r3 === -1 / 0 ? e4 : `h'${e4}'`;
                }
                return typeof e3[Symbol.for("nodejs.util.inspect.custom")] == "function" ? e3[Symbol.for("nodejs.util.inspect.custom")]() : Array.isArray(e3) ? "[]" : "{}";
              }
            }
            return String(e3);
          }, t2.guessEncoding = function(e3, r3) {
            if (typeof e3 == "string")
              return new i(e3, r3 == null ? "hex" : r3);
            const n3 = t2.bufferishToBuffer(e3);
            if (n3)
              return new i(n3);
            if ((s2 = e3) instanceof o.Readable || ["read", "on", "pipe"].every((e4) => typeof s2[e4] == "function"))
              return e3;
            var s2;
            throw new Error("Unknown input type");
          };
          const c = { "=": "", "+": "-", "/": "_" };
          t2.base64url = function(e3) {
            return t2.bufferishToBuffer(e3).toString("base64").replace(/[=+/]/g, (e4) => c[e4]);
          }, t2.base64 = function(e3) {
            return t2.bufferishToBuffer(e3).toString("base64");
          }, t2.isBigEndian = function() {
            const e3 = new Uint8Array(4);
            return !((new Uint32Array(e3.buffer)[0] = 1) & e3[0]);
          };
        }, 202: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(830), { Buffer: i } = r2(764), o = new TextDecoder("utf8", { fatal: true, ignoreBOM: true });
          class s extends n2.Transform {
            constructor(e3, t3, r3 = {}) {
              let n3 = null, o2 = null;
              switch (typeof e3) {
                case "object":
                  i.isBuffer(e3) ? n3 = e3 : e3 && (r3 = e3);
                  break;
                case "string":
                  n3 = e3;
                  break;
                case "undefined":
                  break;
                default:
                  throw new TypeError("Invalid input");
              }
              switch (typeof t3) {
                case "object":
                  t3 && (r3 = t3);
                  break;
                case "string":
                  o2 = t3;
                  break;
                case "undefined":
                  break;
                default:
                  throw new TypeError("Invalid inputEncoding");
              }
              if (!r3 || typeof r3 != "object")
                throw new TypeError("Invalid options");
              n3 == null && (n3 = r3.input), o2 == null && (o2 = r3.inputEncoding), delete r3.input, delete r3.inputEncoding;
              const s2 = r3.watchPipe == null || r3.watchPipe;
              delete r3.watchPipe;
              const a = Boolean(r3.readError);
              delete r3.readError, super(r3), this.readError = a, s2 && this.on("pipe", (e4) => {
                const t4 = e4._readableState.objectMode;
                if (this.length > 0 && t4 !== this._readableState.objectMode)
                  throw new Error("Do not switch objectMode in the middle of the stream");
                this._readableState.objectMode = t4, this._writableState.objectMode = t4;
              }), n3 != null && this.end(n3, o2);
            }
            static isNoFilter(e3) {
              return e3 instanceof this;
            }
            static compare(e3, t3) {
              if (!(e3 instanceof this))
                throw new TypeError("Arguments must be NoFilters");
              return e3 === t3 ? 0 : e3.compare(t3);
            }
            static concat(e3, t3) {
              if (!Array.isArray(e3))
                throw new TypeError("list argument must be an Array of NoFilters");
              if (e3.length === 0 || t3 === 0)
                return i.alloc(0);
              t3 == null && (t3 = e3.reduce((e4, t4) => {
                if (!(t4 instanceof s))
                  throw new TypeError("list argument must be an Array of NoFilters");
                return e4 + t4.length;
              }, 0));
              let r3 = true, n3 = true;
              const o2 = e3.map((e4) => {
                if (!(e4 instanceof s))
                  throw new TypeError("list argument must be an Array of NoFilters");
                const t4 = e4.slice();
                return i.isBuffer(t4) ? n3 = false : r3 = false, t4;
              });
              if (r3)
                return i.concat(o2, t3);
              if (n3)
                return [].concat(...o2).slice(0, t3);
              throw new Error("Concatenating mixed object and byte streams not supported");
            }
            _transform(e3, t3, r3) {
              this._readableState.objectMode || i.isBuffer(e3) || (e3 = i.from(e3, t3)), this.push(e3), r3();
            }
            _bufArray() {
              let e3 = this._readableState.buffer;
              if (!Array.isArray(e3)) {
                let t3 = e3.head;
                for (e3 = []; t3 != null; )
                  e3.push(t3.data), t3 = t3.next;
              }
              return e3;
            }
            read(e3) {
              const t3 = super.read(e3);
              if (t3 != null) {
                if (this.emit("read", t3), this.readError && t3.length < e3)
                  throw new Error(`Read ${t3.length}, wanted ${e3}`);
              } else if (this.readError)
                throw new Error(`No data available, wanted ${e3}`);
              return t3;
            }
            readFull(e3) {
              let t3 = null, r3 = null, n3 = null;
              return new Promise((i2, o2) => {
                this.length >= e3 ? i2(this.read(e3)) : this.writableFinished ? o2(new Error(`Stream finished before ${e3} bytes were available`)) : (t3 = (t4) => {
                  this.length >= e3 && i2(this.read(e3));
                }, r3 = () => {
                  o2(new Error(`Stream finished before ${e3} bytes were available`));
                }, n3 = o2, this.on("readable", t3), this.on("error", n3), this.on("finish", r3));
              }).finally(() => {
                t3 && (this.removeListener("readable", t3), this.removeListener("error", n3), this.removeListener("finish", r3));
              });
            }
            promise(e3) {
              let t3 = false;
              return new Promise((r3, n3) => {
                this.on("finish", () => {
                  const n4 = this.read();
                  e3 == null || t3 || (t3 = true, e3(null, n4)), r3(n4);
                }), this.on("error", (r4) => {
                  e3 == null || t3 || (t3 = true, e3(r4)), n3(r4);
                });
              });
            }
            compare(e3) {
              if (!(e3 instanceof s))
                throw new TypeError("Arguments must be NoFilters");
              if (this === e3)
                return 0;
              const t3 = this.slice(), r3 = e3.slice();
              if (i.isBuffer(t3) && i.isBuffer(r3))
                return t3.compare(r3);
              throw new Error("Cannot compare streams in object mode");
            }
            equals(e3) {
              return this.compare(e3) === 0;
            }
            slice(e3, t3) {
              if (this._readableState.objectMode)
                return this._bufArray().slice(e3, t3);
              const r3 = this._bufArray();
              switch (r3.length) {
                case 0:
                  return i.alloc(0);
                case 1:
                  return r3[0].slice(e3, t3);
                default:
                  return i.concat(r3).slice(e3, t3);
              }
            }
            get(e3) {
              return this.slice()[e3];
            }
            toJSON() {
              const e3 = this.slice();
              return i.isBuffer(e3) ? e3.toJSON() : e3;
            }
            toString(e3, t3, r3) {
              const n3 = this.slice(t3, r3);
              return i.isBuffer(n3) ? e3 && e3 !== "utf8" ? n3.toString(e3) : o.decode(n3) : JSON.stringify(n3);
            }
            [Symbol.for("nodejs.util.inspect.custom")](e3, t3) {
              const r3 = this._bufArray().map((e4) => i.isBuffer(e4) ? t3.stylize(e4.toString("hex"), "string") : JSON.stringify(e4)).join(", ");
              return `${this.constructor.name} [${r3}]`;
            }
            get length() {
              return this._readableState.length;
            }
            writeBigInt(e3) {
              let t3 = e3.toString(16);
              if (e3 < 0) {
                const r3 = BigInt(Math.floor(t3.length / 2));
                t3 = (e3 = (BigInt(1) << r3 * BigInt(8)) + e3).toString(16);
              }
              return t3.length % 2 && (t3 = `0${t3}`), this.push(i.from(t3, "hex"));
            }
            readUBigInt(e3) {
              const t3 = this.read(e3);
              return i.isBuffer(t3) ? BigInt(`0x${t3.toString("hex")}`) : null;
            }
            readBigInt(e3) {
              const t3 = this.read(e3);
              if (!i.isBuffer(t3))
                return null;
              let r3 = BigInt(`0x${t3.toString("hex")}`);
              return 128 & t3[0] && (r3 -= BigInt(1) << BigInt(t3.length) * BigInt(8)), r3;
            }
            writeUInt8(e3) {
              const t3 = i.from([e3]);
              return this.push(t3);
            }
            writeUInt16LE(e3) {
              const t3 = i.alloc(2);
              return t3.writeUInt16LE(e3), this.push(t3);
            }
            writeUInt16BE(e3) {
              const t3 = i.alloc(2);
              return t3.writeUInt16BE(e3), this.push(t3);
            }
            writeUInt32LE(e3) {
              const t3 = i.alloc(4);
              return t3.writeUInt32LE(e3), this.push(t3);
            }
            writeUInt32BE(e3) {
              const t3 = i.alloc(4);
              return t3.writeUInt32BE(e3), this.push(t3);
            }
            writeInt8(e3) {
              const t3 = i.from([e3]);
              return this.push(t3);
            }
            writeInt16LE(e3) {
              const t3 = i.alloc(2);
              return t3.writeUInt16LE(e3), this.push(t3);
            }
            writeInt16BE(e3) {
              const t3 = i.alloc(2);
              return t3.writeUInt16BE(e3), this.push(t3);
            }
            writeInt32LE(e3) {
              const t3 = i.alloc(4);
              return t3.writeUInt32LE(e3), this.push(t3);
            }
            writeInt32BE(e3) {
              const t3 = i.alloc(4);
              return t3.writeUInt32BE(e3), this.push(t3);
            }
            writeFloatLE(e3) {
              const t3 = i.alloc(4);
              return t3.writeFloatLE(e3), this.push(t3);
            }
            writeFloatBE(e3) {
              const t3 = i.alloc(4);
              return t3.writeFloatBE(e3), this.push(t3);
            }
            writeDoubleLE(e3) {
              const t3 = i.alloc(8);
              return t3.writeDoubleLE(e3), this.push(t3);
            }
            writeDoubleBE(e3) {
              const t3 = i.alloc(8);
              return t3.writeDoubleBE(e3), this.push(t3);
            }
            writeBigInt64LE(e3) {
              const t3 = i.alloc(8);
              return t3.writeBigInt64LE(e3), this.push(t3);
            }
            writeBigInt64BE(e3) {
              const t3 = i.alloc(8);
              return t3.writeBigInt64BE(e3), this.push(t3);
            }
            writeBigUInt64LE(e3) {
              const t3 = i.alloc(8);
              return t3.writeBigUInt64LE(e3), this.push(t3);
            }
            writeBigUInt64BE(e3) {
              const t3 = i.alloc(8);
              return t3.writeBigUInt64BE(e3), this.push(t3);
            }
            readUInt8() {
              const e3 = this.read(1);
              return i.isBuffer(e3) ? e3.readUInt8() : null;
            }
            readUInt16LE() {
              const e3 = this.read(2);
              return i.isBuffer(e3) ? e3.readUInt16LE() : null;
            }
            readUInt16BE() {
              const e3 = this.read(2);
              return i.isBuffer(e3) ? e3.readUInt16BE() : null;
            }
            readUInt32LE() {
              const e3 = this.read(4);
              return i.isBuffer(e3) ? e3.readUInt32LE() : null;
            }
            readUInt32BE() {
              const e3 = this.read(4);
              return i.isBuffer(e3) ? e3.readUInt32BE() : null;
            }
            readInt8() {
              const e3 = this.read(1);
              return i.isBuffer(e3) ? e3.readInt8() : null;
            }
            readInt16LE() {
              const e3 = this.read(2);
              return i.isBuffer(e3) ? e3.readInt16LE() : null;
            }
            readInt16BE() {
              const e3 = this.read(2);
              return i.isBuffer(e3) ? e3.readInt16BE() : null;
            }
            readInt32LE() {
              const e3 = this.read(4);
              return i.isBuffer(e3) ? e3.readInt32LE() : null;
            }
            readInt32BE() {
              const e3 = this.read(4);
              return i.isBuffer(e3) ? e3.readInt32BE() : null;
            }
            readFloatLE() {
              const e3 = this.read(4);
              return i.isBuffer(e3) ? e3.readFloatLE() : null;
            }
            readFloatBE() {
              const e3 = this.read(4);
              return i.isBuffer(e3) ? e3.readFloatBE() : null;
            }
            readDoubleLE() {
              const e3 = this.read(8);
              return i.isBuffer(e3) ? e3.readDoubleLE() : null;
            }
            readDoubleBE() {
              const e3 = this.read(8);
              return i.isBuffer(e3) ? e3.readDoubleBE() : null;
            }
            readBigInt64LE() {
              const e3 = this.read(8);
              return i.isBuffer(e3) ? e3.readBigInt64LE() : null;
            }
            readBigInt64BE() {
              const e3 = this.read(8);
              return i.isBuffer(e3) ? e3.readBigInt64BE() : null;
            }
            readBigUInt64LE() {
              const e3 = this.read(8);
              return i.isBuffer(e3) ? e3.readBigUInt64LE() : null;
            }
            readBigUInt64BE() {
              const e3 = this.read(8);
              return i.isBuffer(e3) ? e3.readBigUInt64BE() : null;
            }
          }
          e2.exports = s;
        }, 71: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(830), i = r2(202);
          class o extends n2.Transform {
            constructor(e3) {
              super(e3), this._writableState.objectMode = false, this._readableState.objectMode = true, this.bs = new i(), this.__restart();
            }
            _transform(e3, t3, r3) {
              for (this.bs.write(e3); this.bs.length >= this.__needed; ) {
                let e4 = null;
                const t4 = this.__needed === null ? void 0 : this.bs.read(this.__needed);
                try {
                  e4 = this.__parser.next(t4);
                } catch (e5) {
                  return r3(e5);
                }
                this.__needed && (this.__fresh = false), e4.done ? (this.push(e4.value), this.__restart()) : this.__needed = e4.value || 1 / 0;
              }
              return r3();
            }
            *_parse() {
              throw new Error("Must be implemented in subclass");
            }
            __restart() {
              this.__needed = null, this.__parser = this._parse(), this.__fresh = true;
            }
            _flush(e3) {
              e3(this.__fresh ? null : new Error("unexpected end of input"));
            }
          }
          e2.exports = o;
        }, 187: (e2) => {
          "use strict";
          var t2, r2 = typeof Reflect == "object" ? Reflect : null, n2 = r2 && typeof r2.apply == "function" ? r2.apply : function(e3, t3, r3) {
            return Function.prototype.apply.call(e3, t3, r3);
          };
          t2 = r2 && typeof r2.ownKeys == "function" ? r2.ownKeys : Object.getOwnPropertySymbols ? function(e3) {
            return Object.getOwnPropertyNames(e3).concat(Object.getOwnPropertySymbols(e3));
          } : function(e3) {
            return Object.getOwnPropertyNames(e3);
          };
          var i = Number.isNaN || function(e3) {
            return e3 != e3;
          };
          function o() {
            o.init.call(this);
          }
          e2.exports = o, e2.exports.once = function(e3, t3) {
            return new Promise(function(r3, n3) {
              function i2(r4) {
                e3.removeListener(t3, o2), n3(r4);
              }
              function o2() {
                typeof e3.removeListener == "function" && e3.removeListener("error", i2), r3([].slice.call(arguments));
              }
              g(e3, t3, o2, { once: true }), t3 !== "error" && function(e4, t4, r4) {
                typeof e4.on == "function" && g(e4, "error", t4, { once: true });
              }(e3, i2);
            });
          }, o.EventEmitter = o, o.prototype._events = void 0, o.prototype._eventsCount = 0, o.prototype._maxListeners = void 0;
          var s = 10;
          function a(e3) {
            if (typeof e3 != "function")
              throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e3);
          }
          function u(e3) {
            return e3._maxListeners === void 0 ? o.defaultMaxListeners : e3._maxListeners;
          }
          function f(e3, t3, r3, n3) {
            var i2, o2, s2, f2;
            if (a(r3), (o2 = e3._events) === void 0 ? (o2 = e3._events = Object.create(null), e3._eventsCount = 0) : (o2.newListener !== void 0 && (e3.emit("newListener", t3, r3.listener ? r3.listener : r3), o2 = e3._events), s2 = o2[t3]), s2 === void 0)
              s2 = o2[t3] = r3, ++e3._eventsCount;
            else if (typeof s2 == "function" ? s2 = o2[t3] = n3 ? [r3, s2] : [s2, r3] : n3 ? s2.unshift(r3) : s2.push(r3), (i2 = u(e3)) > 0 && s2.length > i2 && !s2.warned) {
              s2.warned = true;
              var h2 = new Error("Possible EventEmitter memory leak detected. " + s2.length + " " + String(t3) + " listeners added. Use emitter.setMaxListeners() to increase limit");
              h2.name = "MaxListenersExceededWarning", h2.emitter = e3, h2.type = t3, h2.count = s2.length, f2 = h2, console && console.warn && console.warn(f2);
            }
            return e3;
          }
          function h() {
            if (!this.fired)
              return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
          }
          function l(e3, t3, r3) {
            var n3 = { fired: false, wrapFn: void 0, target: e3, type: t3, listener: r3 }, i2 = h.bind(n3);
            return i2.listener = r3, n3.wrapFn = i2, i2;
          }
          function c(e3, t3, r3) {
            var n3 = e3._events;
            if (n3 === void 0)
              return [];
            var i2 = n3[t3];
            return i2 === void 0 ? [] : typeof i2 == "function" ? r3 ? [i2.listener || i2] : [i2] : r3 ? function(e4) {
              for (var t4 = new Array(e4.length), r4 = 0; r4 < t4.length; ++r4)
                t4[r4] = e4[r4].listener || e4[r4];
              return t4;
            }(i2) : p(i2, i2.length);
          }
          function d(e3) {
            var t3 = this._events;
            if (t3 !== void 0) {
              var r3 = t3[e3];
              if (typeof r3 == "function")
                return 1;
              if (r3 !== void 0)
                return r3.length;
            }
            return 0;
          }
          function p(e3, t3) {
            for (var r3 = new Array(t3), n3 = 0; n3 < t3; ++n3)
              r3[n3] = e3[n3];
            return r3;
          }
          function g(e3, t3, r3, n3) {
            if (typeof e3.on == "function")
              n3.once ? e3.once(t3, r3) : e3.on(t3, r3);
            else {
              if (typeof e3.addEventListener != "function")
                throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e3);
              e3.addEventListener(t3, function i2(o2) {
                n3.once && e3.removeEventListener(t3, i2), r3(o2);
              });
            }
          }
          Object.defineProperty(o, "defaultMaxListeners", { enumerable: true, get: function() {
            return s;
          }, set: function(e3) {
            if (typeof e3 != "number" || e3 < 0 || i(e3))
              throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e3 + ".");
            s = e3;
          } }), o.init = function() {
            this._events !== void 0 && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
          }, o.prototype.setMaxListeners = function(e3) {
            if (typeof e3 != "number" || e3 < 0 || i(e3))
              throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e3 + ".");
            return this._maxListeners = e3, this;
          }, o.prototype.getMaxListeners = function() {
            return u(this);
          }, o.prototype.emit = function(e3) {
            for (var t3 = [], r3 = 1; r3 < arguments.length; r3++)
              t3.push(arguments[r3]);
            var i2 = e3 === "error", o2 = this._events;
            if (o2 !== void 0)
              i2 = i2 && o2.error === void 0;
            else if (!i2)
              return false;
            if (i2) {
              var s2;
              if (t3.length > 0 && (s2 = t3[0]), s2 instanceof Error)
                throw s2;
              var a2 = new Error("Unhandled error." + (s2 ? " (" + s2.message + ")" : ""));
              throw a2.context = s2, a2;
            }
            var u2 = o2[e3];
            if (u2 === void 0)
              return false;
            if (typeof u2 == "function")
              n2(u2, this, t3);
            else {
              var f2 = u2.length, h2 = p(u2, f2);
              for (r3 = 0; r3 < f2; ++r3)
                n2(h2[r3], this, t3);
            }
            return true;
          }, o.prototype.addListener = function(e3, t3) {
            return f(this, e3, t3, false);
          }, o.prototype.on = o.prototype.addListener, o.prototype.prependListener = function(e3, t3) {
            return f(this, e3, t3, true);
          }, o.prototype.once = function(e3, t3) {
            return a(t3), this.on(e3, l(this, e3, t3)), this;
          }, o.prototype.prependOnceListener = function(e3, t3) {
            return a(t3), this.prependListener(e3, l(this, e3, t3)), this;
          }, o.prototype.removeListener = function(e3, t3) {
            var r3, n3, i2, o2, s2;
            if (a(t3), (n3 = this._events) === void 0)
              return this;
            if ((r3 = n3[e3]) === void 0)
              return this;
            if (r3 === t3 || r3.listener === t3)
              --this._eventsCount == 0 ? this._events = Object.create(null) : (delete n3[e3], n3.removeListener && this.emit("removeListener", e3, r3.listener || t3));
            else if (typeof r3 != "function") {
              for (i2 = -1, o2 = r3.length - 1; o2 >= 0; o2--)
                if (r3[o2] === t3 || r3[o2].listener === t3) {
                  s2 = r3[o2].listener, i2 = o2;
                  break;
                }
              if (i2 < 0)
                return this;
              i2 === 0 ? r3.shift() : function(e4, t4) {
                for (; t4 + 1 < e4.length; t4++)
                  e4[t4] = e4[t4 + 1];
                e4.pop();
              }(r3, i2), r3.length === 1 && (n3[e3] = r3[0]), n3.removeListener !== void 0 && this.emit("removeListener", e3, s2 || t3);
            }
            return this;
          }, o.prototype.off = o.prototype.removeListener, o.prototype.removeAllListeners = function(e3) {
            var t3, r3, n3;
            if ((r3 = this._events) === void 0)
              return this;
            if (r3.removeListener === void 0)
              return arguments.length === 0 ? (this._events = Object.create(null), this._eventsCount = 0) : r3[e3] !== void 0 && (--this._eventsCount == 0 ? this._events = Object.create(null) : delete r3[e3]), this;
            if (arguments.length === 0) {
              var i2, o2 = Object.keys(r3);
              for (n3 = 0; n3 < o2.length; ++n3)
                (i2 = o2[n3]) !== "removeListener" && this.removeAllListeners(i2);
              return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this;
            }
            if (typeof (t3 = r3[e3]) == "function")
              this.removeListener(e3, t3);
            else if (t3 !== void 0)
              for (n3 = t3.length - 1; n3 >= 0; n3--)
                this.removeListener(e3, t3[n3]);
            return this;
          }, o.prototype.listeners = function(e3) {
            return c(this, e3, true);
          }, o.prototype.rawListeners = function(e3) {
            return c(this, e3, false);
          }, o.listenerCount = function(e3, t3) {
            return typeof e3.listenerCount == "function" ? e3.listenerCount(t3) : d.call(e3, t3);
          }, o.prototype.listenerCount = d, o.prototype.eventNames = function() {
            return this._eventsCount > 0 ? t2(this._events) : [];
          };
        }, 645: (e2, t2) => {
          t2.read = function(e3, t3, r2, n2, i) {
            var o, s, a = 8 * i - n2 - 1, u = (1 << a) - 1, f = u >> 1, h = -7, l = r2 ? i - 1 : 0, c = r2 ? -1 : 1, d = e3[t3 + l];
            for (l += c, o = d & (1 << -h) - 1, d >>= -h, h += a; h > 0; o = 256 * o + e3[t3 + l], l += c, h -= 8)
              ;
            for (s = o & (1 << -h) - 1, o >>= -h, h += n2; h > 0; s = 256 * s + e3[t3 + l], l += c, h -= 8)
              ;
            if (o === 0)
              o = 1 - f;
            else {
              if (o === u)
                return s ? NaN : 1 / 0 * (d ? -1 : 1);
              s += Math.pow(2, n2), o -= f;
            }
            return (d ? -1 : 1) * s * Math.pow(2, o - n2);
          }, t2.write = function(e3, t3, r2, n2, i, o) {
            var s, a, u, f = 8 * o - i - 1, h = (1 << f) - 1, l = h >> 1, c = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = n2 ? 0 : o - 1, p = n2 ? 1 : -1, g = t3 < 0 || t3 === 0 && 1 / t3 < 0 ? 1 : 0;
            for (t3 = Math.abs(t3), isNaN(t3) || t3 === 1 / 0 ? (a = isNaN(t3) ? 1 : 0, s = h) : (s = Math.floor(Math.log(t3) / Math.LN2), t3 * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (t3 += s + l >= 1 ? c / u : c * Math.pow(2, 1 - l)) * u >= 2 && (s++, u /= 2), s + l >= h ? (a = 0, s = h) : s + l >= 1 ? (a = (t3 * u - 1) * Math.pow(2, i), s += l) : (a = t3 * Math.pow(2, l - 1) * Math.pow(2, i), s = 0)); i >= 8; e3[r2 + d] = 255 & a, d += p, a /= 256, i -= 8)
              ;
            for (s = s << i | a, f += i; f > 0; e3[r2 + d] = 255 & s, d += p, s /= 256, f -= 8)
              ;
            e3[r2 + d - p] |= 128 * g;
          };
        }, 717: (e2) => {
          typeof Object.create == "function" ? e2.exports = function(e3, t2) {
            t2 && (e3.super_ = t2, e3.prototype = Object.create(t2.prototype, { constructor: { value: e3, enumerable: false, writable: true, configurable: true } }));
          } : e2.exports = function(e3, t2) {
            if (t2) {
              e3.super_ = t2;
              var r2 = function() {
              };
              r2.prototype = t2.prototype, e3.prototype = new r2(), e3.prototype.constructor = e3;
            }
          };
        }, 155: (e2) => {
          var t2, r2, n2 = e2.exports = {};
          function i() {
            throw new Error("setTimeout has not been defined");
          }
          function o() {
            throw new Error("clearTimeout has not been defined");
          }
          function s(e3) {
            if (t2 === setTimeout)
              return setTimeout(e3, 0);
            if ((t2 === i || !t2) && setTimeout)
              return t2 = setTimeout, setTimeout(e3, 0);
            try {
              return t2(e3, 0);
            } catch (r3) {
              try {
                return t2.call(null, e3, 0);
              } catch (r4) {
                return t2.call(this, e3, 0);
              }
            }
          }
          !function() {
            try {
              t2 = typeof setTimeout == "function" ? setTimeout : i;
            } catch (e3) {
              t2 = i;
            }
            try {
              r2 = typeof clearTimeout == "function" ? clearTimeout : o;
            } catch (e3) {
              r2 = o;
            }
          }();
          var a, u = [], f = false, h = -1;
          function l() {
            f && a && (f = false, a.length ? u = a.concat(u) : h = -1, u.length && c());
          }
          function c() {
            if (!f) {
              var e3 = s(l);
              f = true;
              for (var t3 = u.length; t3; ) {
                for (a = u, u = []; ++h < t3; )
                  a && a[h].run();
                h = -1, t3 = u.length;
              }
              a = null, f = false, function(e4) {
                if (r2 === clearTimeout)
                  return clearTimeout(e4);
                if ((r2 === o || !r2) && clearTimeout)
                  return r2 = clearTimeout, clearTimeout(e4);
                try {
                  r2(e4);
                } catch (t4) {
                  try {
                    return r2.call(null, e4);
                  } catch (t5) {
                    return r2.call(this, e4);
                  }
                }
              }(e3);
            }
          }
          function d(e3, t3) {
            this.fun = e3, this.array = t3;
          }
          function p() {
          }
          n2.nextTick = function(e3) {
            var t3 = new Array(arguments.length - 1);
            if (arguments.length > 1)
              for (var r3 = 1; r3 < arguments.length; r3++)
                t3[r3 - 1] = arguments[r3];
            u.push(new d(e3, t3)), u.length !== 1 || f || s(c);
          }, d.prototype.run = function() {
            this.fun.apply(null, this.array);
          }, n2.title = "browser", n2.browser = true, n2.env = {}, n2.argv = [], n2.version = "", n2.versions = {}, n2.on = p, n2.addListener = p, n2.once = p, n2.off = p, n2.removeListener = p, n2.removeAllListeners = p, n2.emit = p, n2.prependListener = p, n2.prependOnceListener = p, n2.listeners = function(e3) {
            return [];
          }, n2.binding = function(e3) {
            throw new Error("process.binding is not supported");
          }, n2.cwd = function() {
            return "/";
          }, n2.chdir = function(e3) {
            throw new Error("process.chdir is not supported");
          }, n2.umask = function() {
            return 0;
          };
        }, 281: (e2) => {
          "use strict";
          var t2 = {};
          function r2(e3, r3, n3) {
            n3 || (n3 = Error);
            var i = function(e4) {
              var t3, n4;
              function i2(t4, n5, i3) {
                return e4.call(this, function(e5, t5, n6) {
                  return typeof r3 == "string" ? r3 : r3(e5, t5, n6);
                }(t4, n5, i3)) || this;
              }
              return n4 = e4, (t3 = i2).prototype = Object.create(n4.prototype), t3.prototype.constructor = t3, t3.__proto__ = n4, i2;
            }(n3);
            i.prototype.name = n3.name, i.prototype.code = e3, t2[e3] = i;
          }
          function n2(e3, t3) {
            if (Array.isArray(e3)) {
              var r3 = e3.length;
              return e3 = e3.map(function(e4) {
                return String(e4);
              }), r3 > 2 ? "one of ".concat(t3, " ").concat(e3.slice(0, r3 - 1).join(", "), ", or ") + e3[r3 - 1] : r3 === 2 ? "one of ".concat(t3, " ").concat(e3[0], " or ").concat(e3[1]) : "of ".concat(t3, " ").concat(e3[0]);
            }
            return "of ".concat(t3, " ").concat(String(e3));
          }
          r2("ERR_INVALID_OPT_VALUE", function(e3, t3) {
            return 'The value "' + t3 + '" is invalid for option "' + e3 + '"';
          }, TypeError), r2("ERR_INVALID_ARG_TYPE", function(e3, t3, r3) {
            var i, o, s, a, u;
            if (typeof t3 == "string" && (o = "not ", t3.substr(0, o.length) === o) ? (i = "must not be", t3 = t3.replace(/^not /, "")) : i = "must be", function(e4, t4, r4) {
              return (r4 === void 0 || r4 > e4.length) && (r4 = e4.length), e4.substring(r4 - t4.length, r4) === t4;
            }(e3, " argument"))
              s = "The ".concat(e3, " ").concat(i, " ").concat(n2(t3, "type"));
            else {
              var f = (typeof u != "number" && (u = 0), u + ".".length > (a = e3).length || a.indexOf(".", u) === -1 ? "argument" : "property");
              s = 'The "'.concat(e3, '" ').concat(f, " ").concat(i, " ").concat(n2(t3, "type"));
            }
            return s + ". Received type ".concat(typeof r3);
          }, TypeError), r2("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), r2("ERR_METHOD_NOT_IMPLEMENTED", function(e3) {
            return "The " + e3 + " method is not implemented";
          }), r2("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), r2("ERR_STREAM_DESTROYED", function(e3) {
            return "Cannot call " + e3 + " after a stream was destroyed";
          }), r2("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), r2("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), r2("ERR_STREAM_WRITE_AFTER_END", "write after end"), r2("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), r2("ERR_UNKNOWN_ENCODING", function(e3) {
            return "Unknown encoding: " + e3;
          }, TypeError), r2("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), e2.exports.q = t2;
        }, 753: (e2, t2, r2) => {
          "use strict";
          var n2 = r2(155), i = Object.keys || function(e3) {
            var t3 = [];
            for (var r3 in e3)
              t3.push(r3);
            return t3;
          };
          e2.exports = h;
          var o = r2(481), s = r2(229);
          r2(717)(h, o);
          for (var a = i(s.prototype), u = 0; u < a.length; u++) {
            var f = a[u];
            h.prototype[f] || (h.prototype[f] = s.prototype[f]);
          }
          function h(e3) {
            if (!(this instanceof h))
              return new h(e3);
            o.call(this, e3), s.call(this, e3), this.allowHalfOpen = true, e3 && (e3.readable === false && (this.readable = false), e3.writable === false && (this.writable = false), e3.allowHalfOpen === false && (this.allowHalfOpen = false, this.once("end", l)));
          }
          function l() {
            this._writableState.ended || n2.nextTick(c, this);
          }
          function c(e3) {
            e3.end();
          }
          Object.defineProperty(h.prototype, "writableHighWaterMark", { enumerable: false, get: function() {
            return this._writableState.highWaterMark;
          } }), Object.defineProperty(h.prototype, "writableBuffer", { enumerable: false, get: function() {
            return this._writableState && this._writableState.getBuffer();
          } }), Object.defineProperty(h.prototype, "writableLength", { enumerable: false, get: function() {
            return this._writableState.length;
          } }), Object.defineProperty(h.prototype, "destroyed", { enumerable: false, get: function() {
            return this._readableState !== void 0 && this._writableState !== void 0 && this._readableState.destroyed && this._writableState.destroyed;
          }, set: function(e3) {
            this._readableState !== void 0 && this._writableState !== void 0 && (this._readableState.destroyed = e3, this._writableState.destroyed = e3);
          } });
        }, 725: (e2, t2, r2) => {
          "use strict";
          e2.exports = i;
          var n2 = r2(605);
          function i(e3) {
            if (!(this instanceof i))
              return new i(e3);
            n2.call(this, e3);
          }
          r2(717)(i, n2), i.prototype._transform = function(e3, t3, r3) {
            r3(null, e3);
          };
        }, 481: (e2, t2, r2) => {
          "use strict";
          var n2, i = r2(155);
          e2.exports = I, I.ReadableState = T, r2(187).EventEmitter;
          var o, s = function(e3, t3) {
            return e3.listeners(t3).length;
          }, a = r2(503), u = r2(764).Buffer, f = r2.g.Uint8Array || function() {
          }, h = r2(616);
          o = h && h.debuglog ? h.debuglog("stream") : function() {
          };
          var l, c, d, p = r2(327), g = r2(195), y = r2(457).getHighWaterMark, b = r2(281).q, w = b.ERR_INVALID_ARG_TYPE, _ = b.ERR_STREAM_PUSH_AFTER_EOF, m = b.ERR_METHOD_NOT_IMPLEMENTED, E = b.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
          r2(717)(I, a);
          var v = g.errorOrDestroy, S = ["error", "close", "destroy", "pause", "resume"];
          function T(e3, t3, i2) {
            n2 = n2 || r2(753), e3 = e3 || {}, typeof i2 != "boolean" && (i2 = t3 instanceof n2), this.objectMode = !!e3.objectMode, i2 && (this.objectMode = this.objectMode || !!e3.readableObjectMode), this.highWaterMark = y(this, e3, "readableHighWaterMark", i2), this.buffer = new p(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = false, this.endEmitted = false, this.reading = false, this.sync = true, this.needReadable = false, this.emittedReadable = false, this.readableListening = false, this.resumeScheduled = false, this.paused = true, this.emitClose = e3.emitClose !== false, this.autoDestroy = !!e3.autoDestroy, this.destroyed = false, this.defaultEncoding = e3.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = false, this.decoder = null, this.encoding = null, e3.encoding && (l || (l = r2(553).s), this.decoder = new l(e3.encoding), this.encoding = e3.encoding);
          }
          function I(e3) {
            if (n2 = n2 || r2(753), !(this instanceof I))
              return new I(e3);
            var t3 = this instanceof n2;
            this._readableState = new T(e3, this, t3), this.readable = true, e3 && (typeof e3.read == "function" && (this._read = e3.read), typeof e3.destroy == "function" && (this._destroy = e3.destroy)), a.call(this);
          }
          function A(e3, t3, r3, n3, i2) {
            o("readableAddChunk", t3);
            var s2, a2 = e3._readableState;
            if (t3 === null)
              a2.reading = false, function(e4, t4) {
                if (o("onEofChunk"), !t4.ended) {
                  if (t4.decoder) {
                    var r4 = t4.decoder.end();
                    r4 && r4.length && (t4.buffer.push(r4), t4.length += t4.objectMode ? 1 : r4.length);
                  }
                  t4.ended = true, t4.sync ? L(e4) : (t4.needReadable = false, t4.emittedReadable || (t4.emittedReadable = true, N(e4)));
                }
              }(e3, a2);
            else if (i2 || (s2 = function(e4, t4) {
              var r4, n4;
              return n4 = t4, u.isBuffer(n4) || n4 instanceof f || typeof t4 == "string" || t4 === void 0 || e4.objectMode || (r4 = new w("chunk", ["string", "Buffer", "Uint8Array"], t4)), r4;
            }(a2, t3)), s2)
              v(e3, s2);
            else if (a2.objectMode || t3 && t3.length > 0)
              if (typeof t3 == "string" || a2.objectMode || Object.getPrototypeOf(t3) === u.prototype || (t3 = function(e4) {
                return u.from(e4);
              }(t3)), n3)
                a2.endEmitted ? v(e3, new E()) : B(e3, a2, t3, true);
              else if (a2.ended)
                v(e3, new _());
              else {
                if (a2.destroyed)
                  return false;
                a2.reading = false, a2.decoder && !r3 ? (t3 = a2.decoder.write(t3), a2.objectMode || t3.length !== 0 ? B(e3, a2, t3, false) : M(e3, a2)) : B(e3, a2, t3, false);
              }
            else
              n3 || (a2.reading = false, M(e3, a2));
            return !a2.ended && (a2.length < a2.highWaterMark || a2.length === 0);
          }
          function B(e3, t3, r3, n3) {
            t3.flowing && t3.length === 0 && !t3.sync ? (t3.awaitDrain = 0, e3.emit("data", r3)) : (t3.length += t3.objectMode ? 1 : r3.length, n3 ? t3.buffer.unshift(r3) : t3.buffer.push(r3), t3.needReadable && L(e3)), M(e3, t3);
          }
          Object.defineProperty(I.prototype, "destroyed", { enumerable: false, get: function() {
            return this._readableState !== void 0 && this._readableState.destroyed;
          }, set: function(e3) {
            this._readableState && (this._readableState.destroyed = e3);
          } }), I.prototype.destroy = g.destroy, I.prototype._undestroy = g.undestroy, I.prototype._destroy = function(e3, t3) {
            t3(e3);
          }, I.prototype.push = function(e3, t3) {
            var r3, n3 = this._readableState;
            return n3.objectMode ? r3 = true : typeof e3 == "string" && ((t3 = t3 || n3.defaultEncoding) !== n3.encoding && (e3 = u.from(e3, t3), t3 = ""), r3 = true), A(this, e3, t3, false, r3);
          }, I.prototype.unshift = function(e3) {
            return A(this, e3, null, true, false);
          }, I.prototype.isPaused = function() {
            return this._readableState.flowing === false;
          }, I.prototype.setEncoding = function(e3) {
            l || (l = r2(553).s);
            var t3 = new l(e3);
            this._readableState.decoder = t3, this._readableState.encoding = this._readableState.decoder.encoding;
            for (var n3 = this._readableState.buffer.head, i2 = ""; n3 !== null; )
              i2 += t3.write(n3.data), n3 = n3.next;
            return this._readableState.buffer.clear(), i2 !== "" && this._readableState.buffer.push(i2), this._readableState.length = i2.length, this;
          };
          var R = 1073741824;
          function U(e3, t3) {
            return e3 <= 0 || t3.length === 0 && t3.ended ? 0 : t3.objectMode ? 1 : e3 != e3 ? t3.flowing && t3.length ? t3.buffer.head.data.length : t3.length : (e3 > t3.highWaterMark && (t3.highWaterMark = function(e4) {
              return e4 >= R ? e4 = R : (e4--, e4 |= e4 >>> 1, e4 |= e4 >>> 2, e4 |= e4 >>> 4, e4 |= e4 >>> 8, e4 |= e4 >>> 16, e4++), e4;
            }(e3)), e3 <= t3.length ? e3 : t3.ended ? t3.length : (t3.needReadable = true, 0));
          }
          function L(e3) {
            var t3 = e3._readableState;
            o("emitReadable", t3.needReadable, t3.emittedReadable), t3.needReadable = false, t3.emittedReadable || (o("emitReadable", t3.flowing), t3.emittedReadable = true, i.nextTick(N, e3));
          }
          function N(e3) {
            var t3 = e3._readableState;
            o("emitReadable_", t3.destroyed, t3.length, t3.ended), t3.destroyed || !t3.length && !t3.ended || (e3.emit("readable"), t3.emittedReadable = false), t3.needReadable = !t3.flowing && !t3.ended && t3.length <= t3.highWaterMark, j(e3);
          }
          function M(e3, t3) {
            t3.readingMore || (t3.readingMore = true, i.nextTick(O, e3, t3));
          }
          function O(e3, t3) {
            for (; !t3.reading && !t3.ended && (t3.length < t3.highWaterMark || t3.flowing && t3.length === 0); ) {
              var r3 = t3.length;
              if (o("maybeReadMore read 0"), e3.read(0), r3 === t3.length)
                break;
            }
            t3.readingMore = false;
          }
          function x(e3) {
            var t3 = e3._readableState;
            t3.readableListening = e3.listenerCount("readable") > 0, t3.resumeScheduled && !t3.paused ? t3.flowing = true : e3.listenerCount("data") > 0 && e3.resume();
          }
          function k(e3) {
            o("readable nexttick read 0"), e3.read(0);
          }
          function P(e3, t3) {
            o("resume", t3.reading), t3.reading || e3.read(0), t3.resumeScheduled = false, e3.emit("resume"), j(e3), t3.flowing && !t3.reading && e3.read(0);
          }
          function j(e3) {
            var t3 = e3._readableState;
            for (o("flow", t3.flowing); t3.flowing && e3.read() !== null; )
              ;
          }
          function C(e3, t3) {
            return t3.length === 0 ? null : (t3.objectMode ? r3 = t3.buffer.shift() : !e3 || e3 >= t3.length ? (r3 = t3.decoder ? t3.buffer.join("") : t3.buffer.length === 1 ? t3.buffer.first() : t3.buffer.concat(t3.length), t3.buffer.clear()) : r3 = t3.buffer.consume(e3, t3.decoder), r3);
            var r3;
          }
          function F(e3) {
            var t3 = e3._readableState;
            o("endReadable", t3.endEmitted), t3.endEmitted || (t3.ended = true, i.nextTick(D, t3, e3));
          }
          function D(e3, t3) {
            if (o("endReadableNT", e3.endEmitted, e3.length), !e3.endEmitted && e3.length === 0 && (e3.endEmitted = true, t3.readable = false, t3.emit("end"), e3.autoDestroy)) {
              var r3 = t3._writableState;
              (!r3 || r3.autoDestroy && r3.finished) && t3.destroy();
            }
          }
          function $(e3, t3) {
            for (var r3 = 0, n3 = e3.length; r3 < n3; r3++)
              if (e3[r3] === t3)
                return r3;
            return -1;
          }
          I.prototype.read = function(e3) {
            o("read", e3), e3 = parseInt(e3, 10);
            var t3 = this._readableState, r3 = e3;
            if (e3 !== 0 && (t3.emittedReadable = false), e3 === 0 && t3.needReadable && ((t3.highWaterMark !== 0 ? t3.length >= t3.highWaterMark : t3.length > 0) || t3.ended))
              return o("read: emitReadable", t3.length, t3.ended), t3.length === 0 && t3.ended ? F(this) : L(this), null;
            if ((e3 = U(e3, t3)) === 0 && t3.ended)
              return t3.length === 0 && F(this), null;
            var n3, i2 = t3.needReadable;
            return o("need readable", i2), (t3.length === 0 || t3.length - e3 < t3.highWaterMark) && o("length less than watermark", i2 = true), t3.ended || t3.reading ? o("reading or ended", i2 = false) : i2 && (o("do read"), t3.reading = true, t3.sync = true, t3.length === 0 && (t3.needReadable = true), this._read(t3.highWaterMark), t3.sync = false, t3.reading || (e3 = U(r3, t3))), (n3 = e3 > 0 ? C(e3, t3) : null) === null ? (t3.needReadable = t3.length <= t3.highWaterMark, e3 = 0) : (t3.length -= e3, t3.awaitDrain = 0), t3.length === 0 && (t3.ended || (t3.needReadable = true), r3 !== e3 && t3.ended && F(this)), n3 !== null && this.emit("data", n3), n3;
          }, I.prototype._read = function(e3) {
            v(this, new m("_read()"));
          }, I.prototype.pipe = function(e3, t3) {
            var r3 = this, n3 = this._readableState;
            switch (n3.pipesCount) {
              case 0:
                n3.pipes = e3;
                break;
              case 1:
                n3.pipes = [n3.pipes, e3];
                break;
              default:
                n3.pipes.push(e3);
            }
            n3.pipesCount += 1, o("pipe count=%d opts=%j", n3.pipesCount, t3);
            var a2 = t3 && t3.end === false || e3 === i.stdout || e3 === i.stderr ? g2 : u2;
            function u2() {
              o("onend"), e3.end();
            }
            n3.endEmitted ? i.nextTick(a2) : r3.once("end", a2), e3.on("unpipe", function t4(i2, s2) {
              o("onunpipe"), i2 === r3 && s2 && s2.hasUnpiped === false && (s2.hasUnpiped = true, o("cleanup"), e3.removeListener("close", d2), e3.removeListener("finish", p2), e3.removeListener("drain", f2), e3.removeListener("error", c2), e3.removeListener("unpipe", t4), r3.removeListener("end", u2), r3.removeListener("end", g2), r3.removeListener("data", l2), h2 = true, !n3.awaitDrain || e3._writableState && !e3._writableState.needDrain || f2());
            });
            var f2 = function(e4) {
              return function() {
                var t4 = e4._readableState;
                o("pipeOnDrain", t4.awaitDrain), t4.awaitDrain && t4.awaitDrain--, t4.awaitDrain === 0 && s(e4, "data") && (t4.flowing = true, j(e4));
              };
            }(r3);
            e3.on("drain", f2);
            var h2 = false;
            function l2(t4) {
              o("ondata");
              var i2 = e3.write(t4);
              o("dest.write", i2), i2 === false && ((n3.pipesCount === 1 && n3.pipes === e3 || n3.pipesCount > 1 && $(n3.pipes, e3) !== -1) && !h2 && (o("false write response, pause", n3.awaitDrain), n3.awaitDrain++), r3.pause());
            }
            function c2(t4) {
              o("onerror", t4), g2(), e3.removeListener("error", c2), s(e3, "error") === 0 && v(e3, t4);
            }
            function d2() {
              e3.removeListener("finish", p2), g2();
            }
            function p2() {
              o("onfinish"), e3.removeListener("close", d2), g2();
            }
            function g2() {
              o("unpipe"), r3.unpipe(e3);
            }
            return r3.on("data", l2), function(e4, t4, r4) {
              if (typeof e4.prependListener == "function")
                return e4.prependListener(t4, r4);
              e4._events && e4._events.error ? Array.isArray(e4._events.error) ? e4._events.error.unshift(r4) : e4._events.error = [r4, e4._events.error] : e4.on(t4, r4);
            }(e3, "error", c2), e3.once("close", d2), e3.once("finish", p2), e3.emit("pipe", r3), n3.flowing || (o("pipe resume"), r3.resume()), e3;
          }, I.prototype.unpipe = function(e3) {
            var t3 = this._readableState, r3 = { hasUnpiped: false };
            if (t3.pipesCount === 0)
              return this;
            if (t3.pipesCount === 1)
              return e3 && e3 !== t3.pipes || (e3 || (e3 = t3.pipes), t3.pipes = null, t3.pipesCount = 0, t3.flowing = false, e3 && e3.emit("unpipe", this, r3)), this;
            if (!e3) {
              var n3 = t3.pipes, i2 = t3.pipesCount;
              t3.pipes = null, t3.pipesCount = 0, t3.flowing = false;
              for (var o2 = 0; o2 < i2; o2++)
                n3[o2].emit("unpipe", this, { hasUnpiped: false });
              return this;
            }
            var s2 = $(t3.pipes, e3);
            return s2 === -1 || (t3.pipes.splice(s2, 1), t3.pipesCount -= 1, t3.pipesCount === 1 && (t3.pipes = t3.pipes[0]), e3.emit("unpipe", this, r3)), this;
          }, I.prototype.on = function(e3, t3) {
            var r3 = a.prototype.on.call(this, e3, t3), n3 = this._readableState;
            return e3 === "data" ? (n3.readableListening = this.listenerCount("readable") > 0, n3.flowing !== false && this.resume()) : e3 === "readable" && (n3.endEmitted || n3.readableListening || (n3.readableListening = n3.needReadable = true, n3.flowing = false, n3.emittedReadable = false, o("on readable", n3.length, n3.reading), n3.length ? L(this) : n3.reading || i.nextTick(k, this))), r3;
          }, I.prototype.addListener = I.prototype.on, I.prototype.removeListener = function(e3, t3) {
            var r3 = a.prototype.removeListener.call(this, e3, t3);
            return e3 === "readable" && i.nextTick(x, this), r3;
          }, I.prototype.removeAllListeners = function(e3) {
            var t3 = a.prototype.removeAllListeners.apply(this, arguments);
            return e3 !== "readable" && e3 !== void 0 || i.nextTick(x, this), t3;
          }, I.prototype.resume = function() {
            var e3 = this._readableState;
            return e3.flowing || (o("resume"), e3.flowing = !e3.readableListening, function(e4, t3) {
              t3.resumeScheduled || (t3.resumeScheduled = true, i.nextTick(P, e4, t3));
            }(this, e3)), e3.paused = false, this;
          }, I.prototype.pause = function() {
            return o("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== false && (o("pause"), this._readableState.flowing = false, this.emit("pause")), this._readableState.paused = true, this;
          }, I.prototype.wrap = function(e3) {
            var t3 = this, r3 = this._readableState, n3 = false;
            for (var i2 in e3.on("end", function() {
              if (o("wrapped end"), r3.decoder && !r3.ended) {
                var e4 = r3.decoder.end();
                e4 && e4.length && t3.push(e4);
              }
              t3.push(null);
            }), e3.on("data", function(i3) {
              o("wrapped data"), r3.decoder && (i3 = r3.decoder.write(i3)), r3.objectMode && i3 == null || (r3.objectMode || i3 && i3.length) && (t3.push(i3) || (n3 = true, e3.pause()));
            }), e3)
              this[i2] === void 0 && typeof e3[i2] == "function" && (this[i2] = function(t4) {
                return function() {
                  return e3[t4].apply(e3, arguments);
                };
              }(i2));
            for (var s2 = 0; s2 < S.length; s2++)
              e3.on(S[s2], this.emit.bind(this, S[s2]));
            return this._read = function(t4) {
              o("wrapped _read", t4), n3 && (n3 = false, e3.resume());
            }, this;
          }, typeof Symbol == "function" && (I.prototype[Symbol.asyncIterator] = function() {
            return c === void 0 && (c = r2(850)), c(this);
          }), Object.defineProperty(I.prototype, "readableHighWaterMark", { enumerable: false, get: function() {
            return this._readableState.highWaterMark;
          } }), Object.defineProperty(I.prototype, "readableBuffer", { enumerable: false, get: function() {
            return this._readableState && this._readableState.buffer;
          } }), Object.defineProperty(I.prototype, "readableFlowing", { enumerable: false, get: function() {
            return this._readableState.flowing;
          }, set: function(e3) {
            this._readableState && (this._readableState.flowing = e3);
          } }), I._fromList = C, Object.defineProperty(I.prototype, "readableLength", { enumerable: false, get: function() {
            return this._readableState.length;
          } }), typeof Symbol == "function" && (I.from = function(e3, t3) {
            return d === void 0 && (d = r2(167)), d(I, e3, t3);
          });
        }, 605: (e2, t2, r2) => {
          "use strict";
          e2.exports = h;
          var n2 = r2(281).q, i = n2.ERR_METHOD_NOT_IMPLEMENTED, o = n2.ERR_MULTIPLE_CALLBACK, s = n2.ERR_TRANSFORM_ALREADY_TRANSFORMING, a = n2.ERR_TRANSFORM_WITH_LENGTH_0, u = r2(753);
          function f(e3, t3) {
            var r3 = this._transformState;
            r3.transforming = false;
            var n3 = r3.writecb;
            if (n3 === null)
              return this.emit("error", new o());
            r3.writechunk = null, r3.writecb = null, t3 != null && this.push(t3), n3(e3);
            var i2 = this._readableState;
            i2.reading = false, (i2.needReadable || i2.length < i2.highWaterMark) && this._read(i2.highWaterMark);
          }
          function h(e3) {
            if (!(this instanceof h))
              return new h(e3);
            u.call(this, e3), this._transformState = { afterTransform: f.bind(this), needTransform: false, transforming: false, writecb: null, writechunk: null, writeencoding: null }, this._readableState.needReadable = true, this._readableState.sync = false, e3 && (typeof e3.transform == "function" && (this._transform = e3.transform), typeof e3.flush == "function" && (this._flush = e3.flush)), this.on("prefinish", l);
          }
          function l() {
            var e3 = this;
            typeof this._flush != "function" || this._readableState.destroyed ? c(this, null, null) : this._flush(function(t3, r3) {
              c(e3, t3, r3);
            });
          }
          function c(e3, t3, r3) {
            if (t3)
              return e3.emit("error", t3);
            if (r3 != null && e3.push(r3), e3._writableState.length)
              throw new a();
            if (e3._transformState.transforming)
              throw new s();
            return e3.push(null);
          }
          r2(717)(h, u), h.prototype.push = function(e3, t3) {
            return this._transformState.needTransform = false, u.prototype.push.call(this, e3, t3);
          }, h.prototype._transform = function(e3, t3, r3) {
            r3(new i("_transform()"));
          }, h.prototype._write = function(e3, t3, r3) {
            var n3 = this._transformState;
            if (n3.writecb = r3, n3.writechunk = e3, n3.writeencoding = t3, !n3.transforming) {
              var i2 = this._readableState;
              (n3.needTransform || i2.needReadable || i2.length < i2.highWaterMark) && this._read(i2.highWaterMark);
            }
          }, h.prototype._read = function(e3) {
            var t3 = this._transformState;
            t3.writechunk === null || t3.transforming ? t3.needTransform = true : (t3.transforming = true, this._transform(t3.writechunk, t3.writeencoding, t3.afterTransform));
          }, h.prototype._destroy = function(e3, t3) {
            u.prototype._destroy.call(this, e3, function(e4) {
              t3(e4);
            });
          };
        }, 229: (e2, t2, r2) => {
          "use strict";
          var n2, i = r2(155);
          function o(e3) {
            var t3 = this;
            this.next = null, this.entry = null, this.finish = function() {
              !function(e4, t4, r3) {
                var n3 = e4.entry;
                for (e4.entry = null; n3; ) {
                  var i2 = n3.callback;
                  t4.pendingcb--, i2(void 0), n3 = n3.next;
                }
                t4.corkedRequestsFree.next = e4;
              }(t3, e3);
            };
          }
          e2.exports = I, I.WritableState = T;
          var s, a = { deprecate: r2(927) }, u = r2(503), f = r2(764).Buffer, h = r2.g.Uint8Array || function() {
          }, l = r2(195), c = r2(457).getHighWaterMark, d = r2(281).q, p = d.ERR_INVALID_ARG_TYPE, g = d.ERR_METHOD_NOT_IMPLEMENTED, y = d.ERR_MULTIPLE_CALLBACK, b = d.ERR_STREAM_CANNOT_PIPE, w = d.ERR_STREAM_DESTROYED, _ = d.ERR_STREAM_NULL_VALUES, m = d.ERR_STREAM_WRITE_AFTER_END, E = d.ERR_UNKNOWN_ENCODING, v = l.errorOrDestroy;
          function S() {
          }
          function T(e3, t3, s2) {
            n2 = n2 || r2(753), e3 = e3 || {}, typeof s2 != "boolean" && (s2 = t3 instanceof n2), this.objectMode = !!e3.objectMode, s2 && (this.objectMode = this.objectMode || !!e3.writableObjectMode), this.highWaterMark = c(this, e3, "writableHighWaterMark", s2), this.finalCalled = false, this.needDrain = false, this.ending = false, this.ended = false, this.finished = false, this.destroyed = false;
            var a2 = e3.decodeStrings === false;
            this.decodeStrings = !a2, this.defaultEncoding = e3.defaultEncoding || "utf8", this.length = 0, this.writing = false, this.corked = 0, this.sync = true, this.bufferProcessing = false, this.onwrite = function(e4) {
              !function(e5, t4) {
                var r3 = e5._writableState, n3 = r3.sync, o2 = r3.writecb;
                if (typeof o2 != "function")
                  throw new y();
                if (function(e6) {
                  e6.writing = false, e6.writecb = null, e6.length -= e6.writelen, e6.writelen = 0;
                }(r3), t4)
                  !function(e6, t5, r4, n4, o3) {
                    --t5.pendingcb, r4 ? (i.nextTick(o3, n4), i.nextTick(N, e6, t5), e6._writableState.errorEmitted = true, v(e6, n4)) : (o3(n4), e6._writableState.errorEmitted = true, v(e6, n4), N(e6, t5));
                  }(e5, r3, n3, t4, o2);
                else {
                  var s3 = U(r3) || e5.destroyed;
                  s3 || r3.corked || r3.bufferProcessing || !r3.bufferedRequest || R(e5, r3), n3 ? i.nextTick(B, e5, r3, s3, o2) : B(e5, r3, s3, o2);
                }
              }(t3, e4);
            }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = false, this.errorEmitted = false, this.emitClose = e3.emitClose !== false, this.autoDestroy = !!e3.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new o(this);
          }
          function I(e3) {
            var t3 = this instanceof (n2 = n2 || r2(753));
            if (!t3 && !s.call(I, this))
              return new I(e3);
            this._writableState = new T(e3, this, t3), this.writable = true, e3 && (typeof e3.write == "function" && (this._write = e3.write), typeof e3.writev == "function" && (this._writev = e3.writev), typeof e3.destroy == "function" && (this._destroy = e3.destroy), typeof e3.final == "function" && (this._final = e3.final)), u.call(this);
          }
          function A(e3, t3, r3, n3, i2, o2, s2) {
            t3.writelen = n3, t3.writecb = s2, t3.writing = true, t3.sync = true, t3.destroyed ? t3.onwrite(new w("write")) : r3 ? e3._writev(i2, t3.onwrite) : e3._write(i2, o2, t3.onwrite), t3.sync = false;
          }
          function B(e3, t3, r3, n3) {
            r3 || function(e4, t4) {
              t4.length === 0 && t4.needDrain && (t4.needDrain = false, e4.emit("drain"));
            }(e3, t3), t3.pendingcb--, n3(), N(e3, t3);
          }
          function R(e3, t3) {
            t3.bufferProcessing = true;
            var r3 = t3.bufferedRequest;
            if (e3._writev && r3 && r3.next) {
              var n3 = t3.bufferedRequestCount, i2 = new Array(n3), s2 = t3.corkedRequestsFree;
              s2.entry = r3;
              for (var a2 = 0, u2 = true; r3; )
                i2[a2] = r3, r3.isBuf || (u2 = false), r3 = r3.next, a2 += 1;
              i2.allBuffers = u2, A(e3, t3, true, t3.length, i2, "", s2.finish), t3.pendingcb++, t3.lastBufferedRequest = null, s2.next ? (t3.corkedRequestsFree = s2.next, s2.next = null) : t3.corkedRequestsFree = new o(t3), t3.bufferedRequestCount = 0;
            } else {
              for (; r3; ) {
                var f2 = r3.chunk, h2 = r3.encoding, l2 = r3.callback;
                if (A(e3, t3, false, t3.objectMode ? 1 : f2.length, f2, h2, l2), r3 = r3.next, t3.bufferedRequestCount--, t3.writing)
                  break;
              }
              r3 === null && (t3.lastBufferedRequest = null);
            }
            t3.bufferedRequest = r3, t3.bufferProcessing = false;
          }
          function U(e3) {
            return e3.ending && e3.length === 0 && e3.bufferedRequest === null && !e3.finished && !e3.writing;
          }
          function L(e3, t3) {
            e3._final(function(r3) {
              t3.pendingcb--, r3 && v(e3, r3), t3.prefinished = true, e3.emit("prefinish"), N(e3, t3);
            });
          }
          function N(e3, t3) {
            var r3 = U(t3);
            if (r3 && (function(e4, t4) {
              t4.prefinished || t4.finalCalled || (typeof e4._final != "function" || t4.destroyed ? (t4.prefinished = true, e4.emit("prefinish")) : (t4.pendingcb++, t4.finalCalled = true, i.nextTick(L, e4, t4)));
            }(e3, t3), t3.pendingcb === 0 && (t3.finished = true, e3.emit("finish"), t3.autoDestroy))) {
              var n3 = e3._readableState;
              (!n3 || n3.autoDestroy && n3.endEmitted) && e3.destroy();
            }
            return r3;
          }
          r2(717)(I, u), T.prototype.getBuffer = function() {
            for (var e3 = this.bufferedRequest, t3 = []; e3; )
              t3.push(e3), e3 = e3.next;
            return t3;
          }, function() {
            try {
              Object.defineProperty(T.prototype, "buffer", { get: a.deprecate(function() {
                return this.getBuffer();
              }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
            } catch (e3) {
            }
          }(), typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (s = Function.prototype[Symbol.hasInstance], Object.defineProperty(I, Symbol.hasInstance, { value: function(e3) {
            return !!s.call(this, e3) || this === I && e3 && e3._writableState instanceof T;
          } })) : s = function(e3) {
            return e3 instanceof this;
          }, I.prototype.pipe = function() {
            v(this, new b());
          }, I.prototype.write = function(e3, t3, r3) {
            var n3, o2 = this._writableState, s2 = false, a2 = !o2.objectMode && (n3 = e3, f.isBuffer(n3) || n3 instanceof h);
            return a2 && !f.isBuffer(e3) && (e3 = function(e4) {
              return f.from(e4);
            }(e3)), typeof t3 == "function" && (r3 = t3, t3 = null), a2 ? t3 = "buffer" : t3 || (t3 = o2.defaultEncoding), typeof r3 != "function" && (r3 = S), o2.ending ? function(e4, t4) {
              var r4 = new m();
              v(e4, r4), i.nextTick(t4, r4);
            }(this, r3) : (a2 || function(e4, t4, r4, n4) {
              var o3;
              return r4 === null ? o3 = new _() : typeof r4 == "string" || t4.objectMode || (o3 = new p("chunk", ["string", "Buffer"], r4)), !o3 || (v(e4, o3), i.nextTick(n4, o3), false);
            }(this, o2, e3, r3)) && (o2.pendingcb++, s2 = function(e4, t4, r4, n4, i2, o3) {
              if (!r4) {
                var s3 = function(e5, t5, r5) {
                  return e5.objectMode || e5.decodeStrings === false || typeof t5 != "string" || (t5 = f.from(t5, r5)), t5;
                }(t4, n4, i2);
                n4 !== s3 && (r4 = true, i2 = "buffer", n4 = s3);
              }
              var a3 = t4.objectMode ? 1 : n4.length;
              t4.length += a3;
              var u2 = t4.length < t4.highWaterMark;
              if (u2 || (t4.needDrain = true), t4.writing || t4.corked) {
                var h2 = t4.lastBufferedRequest;
                t4.lastBufferedRequest = { chunk: n4, encoding: i2, isBuf: r4, callback: o3, next: null }, h2 ? h2.next = t4.lastBufferedRequest : t4.bufferedRequest = t4.lastBufferedRequest, t4.bufferedRequestCount += 1;
              } else
                A(e4, t4, false, a3, n4, i2, o3);
              return u2;
            }(this, o2, a2, e3, t3, r3)), s2;
          }, I.prototype.cork = function() {
            this._writableState.corked++;
          }, I.prototype.uncork = function() {
            var e3 = this._writableState;
            e3.corked && (e3.corked--, e3.writing || e3.corked || e3.bufferProcessing || !e3.bufferedRequest || R(this, e3));
          }, I.prototype.setDefaultEncoding = function(e3) {
            if (typeof e3 == "string" && (e3 = e3.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e3 + "").toLowerCase()) > -1))
              throw new E(e3);
            return this._writableState.defaultEncoding = e3, this;
          }, Object.defineProperty(I.prototype, "writableBuffer", { enumerable: false, get: function() {
            return this._writableState && this._writableState.getBuffer();
          } }), Object.defineProperty(I.prototype, "writableHighWaterMark", { enumerable: false, get: function() {
            return this._writableState.highWaterMark;
          } }), I.prototype._write = function(e3, t3, r3) {
            r3(new g("_write()"));
          }, I.prototype._writev = null, I.prototype.end = function(e3, t3, r3) {
            var n3 = this._writableState;
            return typeof e3 == "function" ? (r3 = e3, e3 = null, t3 = null) : typeof t3 == "function" && (r3 = t3, t3 = null), e3 != null && this.write(e3, t3), n3.corked && (n3.corked = 1, this.uncork()), n3.ending || function(e4, t4, r4) {
              t4.ending = true, N(e4, t4), r4 && (t4.finished ? i.nextTick(r4) : e4.once("finish", r4)), t4.ended = true, e4.writable = false;
            }(this, n3, r3), this;
          }, Object.defineProperty(I.prototype, "writableLength", { enumerable: false, get: function() {
            return this._writableState.length;
          } }), Object.defineProperty(I.prototype, "destroyed", { enumerable: false, get: function() {
            return this._writableState !== void 0 && this._writableState.destroyed;
          }, set: function(e3) {
            this._writableState && (this._writableState.destroyed = e3);
          } }), I.prototype.destroy = l.destroy, I.prototype._undestroy = l.undestroy, I.prototype._destroy = function(e3, t3) {
            t3(e3);
          };
        }, 850: (e2, t2, r2) => {
          "use strict";
          var n2, i = r2(155);
          function o(e3, t3, r3) {
            return t3 in e3 ? Object.defineProperty(e3, t3, { value: r3, enumerable: true, configurable: true, writable: true }) : e3[t3] = r3, e3;
          }
          var s = r2(610), a = Symbol("lastResolve"), u = Symbol("lastReject"), f = Symbol("error"), h = Symbol("ended"), l = Symbol("lastPromise"), c = Symbol("handlePromise"), d = Symbol("stream");
          function p(e3, t3) {
            return { value: e3, done: t3 };
          }
          function g(e3) {
            var t3 = e3[a];
            if (t3 !== null) {
              var r3 = e3[d].read();
              r3 !== null && (e3[l] = null, e3[a] = null, e3[u] = null, t3(p(r3, false)));
            }
          }
          function y(e3) {
            i.nextTick(g, e3);
          }
          var b = Object.getPrototypeOf(function() {
          }), w = Object.setPrototypeOf((o(n2 = { get stream() {
            return this[d];
          }, next: function() {
            var e3 = this, t3 = this[f];
            if (t3 !== null)
              return Promise.reject(t3);
            if (this[h])
              return Promise.resolve(p(void 0, true));
            if (this[d].destroyed)
              return new Promise(function(t4, r4) {
                i.nextTick(function() {
                  e3[f] ? r4(e3[f]) : t4(p(void 0, true));
                });
              });
            var r3, n3 = this[l];
            if (n3)
              r3 = new Promise(function(e4, t4) {
                return function(r4, n4) {
                  e4.then(function() {
                    t4[h] ? r4(p(void 0, true)) : t4[c](r4, n4);
                  }, n4);
                };
              }(n3, this));
            else {
              var o2 = this[d].read();
              if (o2 !== null)
                return Promise.resolve(p(o2, false));
              r3 = new Promise(this[c]);
            }
            return this[l] = r3, r3;
          } }, Symbol.asyncIterator, function() {
            return this;
          }), o(n2, "return", function() {
            var e3 = this;
            return new Promise(function(t3, r3) {
              e3[d].destroy(null, function(e4) {
                e4 ? r3(e4) : t3(p(void 0, true));
              });
            });
          }), n2), b);
          e2.exports = function(e3) {
            var t3, r3 = Object.create(w, (o(t3 = {}, d, { value: e3, writable: true }), o(t3, a, { value: null, writable: true }), o(t3, u, { value: null, writable: true }), o(t3, f, { value: null, writable: true }), o(t3, h, { value: e3._readableState.endEmitted, writable: true }), o(t3, c, { value: function(e4, t4) {
              var n3 = r3[d].read();
              n3 ? (r3[l] = null, r3[a] = null, r3[u] = null, e4(p(n3, false))) : (r3[a] = e4, r3[u] = t4);
            }, writable: true }), t3));
            return r3[l] = null, s(e3, function(e4) {
              if (e4 && e4.code !== "ERR_STREAM_PREMATURE_CLOSE") {
                var t4 = r3[u];
                return t4 !== null && (r3[l] = null, r3[a] = null, r3[u] = null, t4(e4)), void (r3[f] = e4);
              }
              var n3 = r3[a];
              n3 !== null && (r3[l] = null, r3[a] = null, r3[u] = null, n3(p(void 0, true))), r3[h] = true;
            }), e3.on("readable", y.bind(null, r3)), r3;
          };
        }, 327: (e2, t2, r2) => {
          "use strict";
          function n2(e3, t3) {
            var r3 = Object.keys(e3);
            if (Object.getOwnPropertySymbols) {
              var n3 = Object.getOwnPropertySymbols(e3);
              t3 && (n3 = n3.filter(function(t4) {
                return Object.getOwnPropertyDescriptor(e3, t4).enumerable;
              })), r3.push.apply(r3, n3);
            }
            return r3;
          }
          function i(e3, t3, r3) {
            return t3 in e3 ? Object.defineProperty(e3, t3, { value: r3, enumerable: true, configurable: true, writable: true }) : e3[t3] = r3, e3;
          }
          function o(e3, t3) {
            for (var r3 = 0; r3 < t3.length; r3++) {
              var n3 = t3[r3];
              n3.enumerable = n3.enumerable || false, n3.configurable = true, "value" in n3 && (n3.writable = true), Object.defineProperty(e3, n3.key, n3);
            }
          }
          var s = r2(764).Buffer, a = r2(361).inspect, u = a && a.custom || "inspect";
          e2.exports = function() {
            function e3() {
              !function(e4, t4) {
                if (!(e4 instanceof t4))
                  throw new TypeError("Cannot call a class as a function");
              }(this, e3), this.head = null, this.tail = null, this.length = 0;
            }
            var t3, r3;
            return t3 = e3, r3 = [{ key: "push", value: function(e4) {
              var t4 = { data: e4, next: null };
              this.length > 0 ? this.tail.next = t4 : this.head = t4, this.tail = t4, ++this.length;
            } }, { key: "unshift", value: function(e4) {
              var t4 = { data: e4, next: this.head };
              this.length === 0 && (this.tail = t4), this.head = t4, ++this.length;
            } }, { key: "shift", value: function() {
              if (this.length !== 0) {
                var e4 = this.head.data;
                return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, e4;
              }
            } }, { key: "clear", value: function() {
              this.head = this.tail = null, this.length = 0;
            } }, { key: "join", value: function(e4) {
              if (this.length === 0)
                return "";
              for (var t4 = this.head, r4 = "" + t4.data; t4 = t4.next; )
                r4 += e4 + t4.data;
              return r4;
            } }, { key: "concat", value: function(e4) {
              if (this.length === 0)
                return s.alloc(0);
              for (var t4, r4, n3, i2 = s.allocUnsafe(e4 >>> 0), o2 = this.head, a2 = 0; o2; )
                t4 = o2.data, r4 = i2, n3 = a2, s.prototype.copy.call(t4, r4, n3), a2 += o2.data.length, o2 = o2.next;
              return i2;
            } }, { key: "consume", value: function(e4, t4) {
              var r4;
              return e4 < this.head.data.length ? (r4 = this.head.data.slice(0, e4), this.head.data = this.head.data.slice(e4)) : r4 = e4 === this.head.data.length ? this.shift() : t4 ? this._getString(e4) : this._getBuffer(e4), r4;
            } }, { key: "first", value: function() {
              return this.head.data;
            } }, { key: "_getString", value: function(e4) {
              var t4 = this.head, r4 = 1, n3 = t4.data;
              for (e4 -= n3.length; t4 = t4.next; ) {
                var i2 = t4.data, o2 = e4 > i2.length ? i2.length : e4;
                if (o2 === i2.length ? n3 += i2 : n3 += i2.slice(0, e4), (e4 -= o2) == 0) {
                  o2 === i2.length ? (++r4, t4.next ? this.head = t4.next : this.head = this.tail = null) : (this.head = t4, t4.data = i2.slice(o2));
                  break;
                }
                ++r4;
              }
              return this.length -= r4, n3;
            } }, { key: "_getBuffer", value: function(e4) {
              var t4 = s.allocUnsafe(e4), r4 = this.head, n3 = 1;
              for (r4.data.copy(t4), e4 -= r4.data.length; r4 = r4.next; ) {
                var i2 = r4.data, o2 = e4 > i2.length ? i2.length : e4;
                if (i2.copy(t4, t4.length - e4, 0, o2), (e4 -= o2) == 0) {
                  o2 === i2.length ? (++n3, r4.next ? this.head = r4.next : this.head = this.tail = null) : (this.head = r4, r4.data = i2.slice(o2));
                  break;
                }
                ++n3;
              }
              return this.length -= n3, t4;
            } }, { key: u, value: function(e4, t4) {
              return a(this, function(e5) {
                for (var t5 = 1; t5 < arguments.length; t5++) {
                  var r4 = arguments[t5] != null ? arguments[t5] : {};
                  t5 % 2 ? n2(Object(r4), true).forEach(function(t6) {
                    i(e5, t6, r4[t6]);
                  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e5, Object.getOwnPropertyDescriptors(r4)) : n2(Object(r4)).forEach(function(t6) {
                    Object.defineProperty(e5, t6, Object.getOwnPropertyDescriptor(r4, t6));
                  });
                }
                return e5;
              }({}, t4, { depth: 0, customInspect: false }));
            } }], r3 && o(t3.prototype, r3), e3;
          }();
        }, 195: (e2, t2, r2) => {
          "use strict";
          var n2 = r2(155);
          function i(e3, t3) {
            s(e3, t3), o(e3);
          }
          function o(e3) {
            e3._writableState && !e3._writableState.emitClose || e3._readableState && !e3._readableState.emitClose || e3.emit("close");
          }
          function s(e3, t3) {
            e3.emit("error", t3);
          }
          e2.exports = { destroy: function(e3, t3) {
            var r3 = this, a = this._readableState && this._readableState.destroyed, u = this._writableState && this._writableState.destroyed;
            return a || u ? (t3 ? t3(e3) : e3 && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = true, n2.nextTick(s, this, e3)) : n2.nextTick(s, this, e3)), this) : (this._readableState && (this._readableState.destroyed = true), this._writableState && (this._writableState.destroyed = true), this._destroy(e3 || null, function(e4) {
              !t3 && e4 ? r3._writableState ? r3._writableState.errorEmitted ? n2.nextTick(o, r3) : (r3._writableState.errorEmitted = true, n2.nextTick(i, r3, e4)) : n2.nextTick(i, r3, e4) : t3 ? (n2.nextTick(o, r3), t3(e4)) : n2.nextTick(o, r3);
            }), this);
          }, undestroy: function() {
            this._readableState && (this._readableState.destroyed = false, this._readableState.reading = false, this._readableState.ended = false, this._readableState.endEmitted = false), this._writableState && (this._writableState.destroyed = false, this._writableState.ended = false, this._writableState.ending = false, this._writableState.finalCalled = false, this._writableState.prefinished = false, this._writableState.finished = false, this._writableState.errorEmitted = false);
          }, errorOrDestroy: function(e3, t3) {
            var r3 = e3._readableState, n3 = e3._writableState;
            r3 && r3.autoDestroy || n3 && n3.autoDestroy ? e3.destroy(t3) : e3.emit("error", t3);
          } };
        }, 610: (e2, t2, r2) => {
          "use strict";
          var n2 = r2(281).q.ERR_STREAM_PREMATURE_CLOSE;
          function i() {
          }
          e2.exports = function e3(t3, r3, o) {
            if (typeof r3 == "function")
              return e3(t3, null, r3);
            r3 || (r3 = {}), o = function(e4) {
              var t4 = false;
              return function() {
                if (!t4) {
                  t4 = true;
                  for (var r4 = arguments.length, n3 = new Array(r4), i2 = 0; i2 < r4; i2++)
                    n3[i2] = arguments[i2];
                  e4.apply(this, n3);
                }
              };
            }(o || i);
            var s = r3.readable || r3.readable !== false && t3.readable, a = r3.writable || r3.writable !== false && t3.writable, u = function() {
              t3.writable || h();
            }, f = t3._writableState && t3._writableState.finished, h = function() {
              a = false, f = true, s || o.call(t3);
            }, l = t3._readableState && t3._readableState.endEmitted, c = function() {
              s = false, l = true, a || o.call(t3);
            }, d = function(e4) {
              o.call(t3, e4);
            }, p = function() {
              var e4;
              return s && !l ? (t3._readableState && t3._readableState.ended || (e4 = new n2()), o.call(t3, e4)) : a && !f ? (t3._writableState && t3._writableState.ended || (e4 = new n2()), o.call(t3, e4)) : void 0;
            }, g = function() {
              t3.req.on("finish", h);
            };
            return function(e4) {
              return e4.setHeader && typeof e4.abort == "function";
            }(t3) ? (t3.on("complete", h), t3.on("abort", p), t3.req ? g() : t3.on("request", g)) : a && !t3._writableState && (t3.on("end", u), t3.on("close", u)), t3.on("end", c), t3.on("finish", h), r3.error !== false && t3.on("error", d), t3.on("close", p), function() {
              t3.removeListener("complete", h), t3.removeListener("abort", p), t3.removeListener("request", g), t3.req && t3.req.removeListener("finish", h), t3.removeListener("end", u), t3.removeListener("close", u), t3.removeListener("finish", h), t3.removeListener("end", c), t3.removeListener("error", d), t3.removeListener("close", p);
            };
          };
        }, 167: (e2) => {
          e2.exports = function() {
            throw new Error("Readable.from is not available in the browser");
          };
        }, 946: (e2, t2, r2) => {
          "use strict";
          var n2, i = r2(281).q, o = i.ERR_MISSING_ARGS, s = i.ERR_STREAM_DESTROYED;
          function a(e3) {
            if (e3)
              throw e3;
          }
          function u(e3, t3, i2, o2) {
            o2 = function(e4) {
              var t4 = false;
              return function() {
                t4 || (t4 = true, e4.apply(void 0, arguments));
              };
            }(o2);
            var a2 = false;
            e3.on("close", function() {
              a2 = true;
            }), n2 === void 0 && (n2 = r2(610)), n2(e3, { readable: t3, writable: i2 }, function(e4) {
              if (e4)
                return o2(e4);
              a2 = true, o2();
            });
            var u2 = false;
            return function(t4) {
              if (!a2 && !u2)
                return u2 = true, function(e4) {
                  return e4.setHeader && typeof e4.abort == "function";
                }(e3) ? e3.abort() : typeof e3.destroy == "function" ? e3.destroy() : void o2(t4 || new s("pipe"));
            };
          }
          function f(e3) {
            e3();
          }
          function h(e3, t3) {
            return e3.pipe(t3);
          }
          function l(e3) {
            return e3.length ? typeof e3[e3.length - 1] != "function" ? a : e3.pop() : a;
          }
          e2.exports = function() {
            for (var e3 = arguments.length, t3 = new Array(e3), r3 = 0; r3 < e3; r3++)
              t3[r3] = arguments[r3];
            var n3, i2 = l(t3);
            if (Array.isArray(t3[0]) && (t3 = t3[0]), t3.length < 2)
              throw new o("streams");
            var s2 = t3.map(function(e4, r4) {
              var o2 = r4 < t3.length - 1;
              return u(e4, o2, r4 > 0, function(e5) {
                n3 || (n3 = e5), e5 && s2.forEach(f), o2 || (s2.forEach(f), i2(n3));
              });
            });
            return t3.reduce(h);
          };
        }, 457: (e2, t2, r2) => {
          "use strict";
          var n2 = r2(281).q.ERR_INVALID_OPT_VALUE;
          e2.exports = { getHighWaterMark: function(e3, t3, r3, i) {
            var o = function(e4, t4, r4) {
              return e4.highWaterMark != null ? e4.highWaterMark : t4 ? e4[r4] : null;
            }(t3, i, r3);
            if (o != null) {
              if (!isFinite(o) || Math.floor(o) !== o || o < 0)
                throw new n2(i ? r3 : "highWaterMark", o);
              return Math.floor(o);
            }
            return e3.objectMode ? 16 : 16384;
          } };
        }, 503: (e2, t2, r2) => {
          e2.exports = r2(187).EventEmitter;
        }, 509: (e2, t2, r2) => {
          var n2 = r2(764), i = n2.Buffer;
          function o(e3, t3) {
            for (var r3 in e3)
              t3[r3] = e3[r3];
          }
          function s(e3, t3, r3) {
            return i(e3, t3, r3);
          }
          i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? e2.exports = n2 : (o(n2, t2), t2.Buffer = s), s.prototype = Object.create(i.prototype), o(i, s), s.from = function(e3, t3, r3) {
            if (typeof e3 == "number")
              throw new TypeError("Argument must not be a number");
            return i(e3, t3, r3);
          }, s.alloc = function(e3, t3, r3) {
            if (typeof e3 != "number")
              throw new TypeError("Argument must be a number");
            var n3 = i(e3);
            return t3 !== void 0 ? typeof r3 == "string" ? n3.fill(t3, r3) : n3.fill(t3) : n3.fill(0), n3;
          }, s.allocUnsafe = function(e3) {
            if (typeof e3 != "number")
              throw new TypeError("Argument must be a number");
            return i(e3);
          }, s.allocUnsafeSlow = function(e3) {
            if (typeof e3 != "number")
              throw new TypeError("Argument must be a number");
            return n2.SlowBuffer(e3);
          };
        }, 830: (e2, t2, r2) => {
          e2.exports = i;
          var n2 = r2(187).EventEmitter;
          function i() {
            n2.call(this);
          }
          r2(717)(i, n2), i.Readable = r2(481), i.Writable = r2(229), i.Duplex = r2(753), i.Transform = r2(605), i.PassThrough = r2(725), i.finished = r2(610), i.pipeline = r2(946), i.Stream = i, i.prototype.pipe = function(e3, t3) {
            var r3 = this;
            function i2(t4) {
              e3.writable && e3.write(t4) === false && r3.pause && r3.pause();
            }
            function o() {
              r3.readable && r3.resume && r3.resume();
            }
            r3.on("data", i2), e3.on("drain", o), e3._isStdio || t3 && t3.end === false || (r3.on("end", a), r3.on("close", u));
            var s = false;
            function a() {
              s || (s = true, e3.end());
            }
            function u() {
              s || (s = true, typeof e3.destroy == "function" && e3.destroy());
            }
            function f(e4) {
              if (h(), n2.listenerCount(this, "error") === 0)
                throw e4;
            }
            function h() {
              r3.removeListener("data", i2), e3.removeListener("drain", o), r3.removeListener("end", a), r3.removeListener("close", u), r3.removeListener("error", f), e3.removeListener("error", f), r3.removeListener("end", h), r3.removeListener("close", h), e3.removeListener("close", h);
            }
            return r3.on("error", f), e3.on("error", f), r3.on("end", h), r3.on("close", h), e3.on("close", h), e3.emit("pipe", r3), e3;
          };
        }, 553: (e2, t2, r2) => {
          "use strict";
          var n2 = r2(509).Buffer, i = n2.isEncoding || function(e3) {
            switch ((e3 = "" + e3) && e3.toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
              case "raw":
                return true;
              default:
                return false;
            }
          };
          function o(e3) {
            var t3;
            switch (this.encoding = function(e4) {
              var t4 = function(e5) {
                if (!e5)
                  return "utf8";
                for (var t5; ; )
                  switch (e5) {
                    case "utf8":
                    case "utf-8":
                      return "utf8";
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return "utf16le";
                    case "latin1":
                    case "binary":
                      return "latin1";
                    case "base64":
                    case "ascii":
                    case "hex":
                      return e5;
                    default:
                      if (t5)
                        return;
                      e5 = ("" + e5).toLowerCase(), t5 = true;
                  }
              }(e4);
              if (typeof t4 != "string" && (n2.isEncoding === i || !i(e4)))
                throw new Error("Unknown encoding: " + e4);
              return t4 || e4;
            }(e3), this.encoding) {
              case "utf16le":
                this.text = u, this.end = f, t3 = 4;
                break;
              case "utf8":
                this.fillLast = a, t3 = 4;
                break;
              case "base64":
                this.text = h, this.end = l, t3 = 3;
                break;
              default:
                return this.write = c, void (this.end = d);
            }
            this.lastNeed = 0, this.lastTotal = 0, this.lastChar = n2.allocUnsafe(t3);
          }
          function s(e3) {
            return e3 <= 127 ? 0 : e3 >> 5 == 6 ? 2 : e3 >> 4 == 14 ? 3 : e3 >> 3 == 30 ? 4 : e3 >> 6 == 2 ? -1 : -2;
          }
          function a(e3) {
            var t3 = this.lastTotal - this.lastNeed, r3 = function(e4, t4, r4) {
              if ((192 & t4[0]) != 128)
                return e4.lastNeed = 0, "\uFFFD";
              if (e4.lastNeed > 1 && t4.length > 1) {
                if ((192 & t4[1]) != 128)
                  return e4.lastNeed = 1, "\uFFFD";
                if (e4.lastNeed > 2 && t4.length > 2 && (192 & t4[2]) != 128)
                  return e4.lastNeed = 2, "\uFFFD";
              }
            }(this, e3);
            return r3 !== void 0 ? r3 : this.lastNeed <= e3.length ? (e3.copy(this.lastChar, t3, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (e3.copy(this.lastChar, t3, 0, e3.length), void (this.lastNeed -= e3.length));
          }
          function u(e3, t3) {
            if ((e3.length - t3) % 2 == 0) {
              var r3 = e3.toString("utf16le", t3);
              if (r3) {
                var n3 = r3.charCodeAt(r3.length - 1);
                if (n3 >= 55296 && n3 <= 56319)
                  return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e3[e3.length - 2], this.lastChar[1] = e3[e3.length - 1], r3.slice(0, -1);
              }
              return r3;
            }
            return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e3[e3.length - 1], e3.toString("utf16le", t3, e3.length - 1);
          }
          function f(e3) {
            var t3 = e3 && e3.length ? this.write(e3) : "";
            if (this.lastNeed) {
              var r3 = this.lastTotal - this.lastNeed;
              return t3 + this.lastChar.toString("utf16le", 0, r3);
            }
            return t3;
          }
          function h(e3, t3) {
            var r3 = (e3.length - t3) % 3;
            return r3 === 0 ? e3.toString("base64", t3) : (this.lastNeed = 3 - r3, this.lastTotal = 3, r3 === 1 ? this.lastChar[0] = e3[e3.length - 1] : (this.lastChar[0] = e3[e3.length - 2], this.lastChar[1] = e3[e3.length - 1]), e3.toString("base64", t3, e3.length - r3));
          }
          function l(e3) {
            var t3 = e3 && e3.length ? this.write(e3) : "";
            return this.lastNeed ? t3 + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t3;
          }
          function c(e3) {
            return e3.toString(this.encoding);
          }
          function d(e3) {
            return e3 && e3.length ? this.write(e3) : "";
          }
          t2.s = o, o.prototype.write = function(e3) {
            if (e3.length === 0)
              return "";
            var t3, r3;
            if (this.lastNeed) {
              if ((t3 = this.fillLast(e3)) === void 0)
                return "";
              r3 = this.lastNeed, this.lastNeed = 0;
            } else
              r3 = 0;
            return r3 < e3.length ? t3 ? t3 + this.text(e3, r3) : this.text(e3, r3) : t3 || "";
          }, o.prototype.end = function(e3) {
            var t3 = e3 && e3.length ? this.write(e3) : "";
            return this.lastNeed ? t3 + "\uFFFD" : t3;
          }, o.prototype.text = function(e3, t3) {
            var r3 = function(e4, t4, r4) {
              var n4 = t4.length - 1;
              if (n4 < r4)
                return 0;
              var i2 = s(t4[n4]);
              return i2 >= 0 ? (i2 > 0 && (e4.lastNeed = i2 - 1), i2) : --n4 < r4 || i2 === -2 ? 0 : (i2 = s(t4[n4])) >= 0 ? (i2 > 0 && (e4.lastNeed = i2 - 2), i2) : --n4 < r4 || i2 === -2 ? 0 : (i2 = s(t4[n4])) >= 0 ? (i2 > 0 && (i2 === 2 ? i2 = 0 : e4.lastNeed = i2 - 3), i2) : 0;
            }(this, e3, t3);
            if (!this.lastNeed)
              return e3.toString("utf8", t3);
            this.lastTotal = r3;
            var n3 = e3.length - (r3 - this.lastNeed);
            return e3.copy(this.lastChar, 0, n3), e3.toString("utf8", t3, n3);
          }, o.prototype.fillLast = function(e3) {
            if (this.lastNeed <= e3.length)
              return e3.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
            e3.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e3.length), this.lastNeed -= e3.length;
          };
        }, 927: (e2, t2, r2) => {
          function n2(e3) {
            try {
              if (!r2.g.localStorage)
                return false;
            } catch (e4) {
              return false;
            }
            var t3 = r2.g.localStorage[e3];
            return t3 != null && String(t3).toLowerCase() === "true";
          }
          e2.exports = function(e3, t3) {
            if (n2("noDeprecation"))
              return e3;
            var r3 = false;
            return function() {
              if (!r3) {
                if (n2("throwDeprecation"))
                  throw new Error(t3);
                n2("traceDeprecation") ? console.trace(t3) : console.warn(t3), r3 = true;
              }
              return e3.apply(this, arguments);
            };
          };
        }, 361: () => {
        }, 616: () => {
        } }, t = {};
        function r(n2) {
          var i = t[n2];
          if (i !== void 0)
            return i.exports;
          var o = t[n2] = { exports: {} };
          return e[n2](o, o.exports, r), o.exports;
        }
        r.d = (e2, t2) => {
          for (var n2 in t2)
            r.o(t2, n2) && !r.o(e2, n2) && Object.defineProperty(e2, n2, { enumerable: true, get: t2[n2] });
        }, r.g = function() {
          if (typeof globalThis == "object")
            return globalThis;
          try {
            return this || new Function("return this")();
          } catch (e2) {
            if (typeof window == "object")
              return window;
          }
        }(), r.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), r.r = (e2) => {
          typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        };
        var n = {};
        return (() => {
          "use strict";
          r.r(n), r.d(n, { Commented: () => e2.Commented, Decoder: () => e2.Decoder, Diagnose: () => e2.Diagnose, Encoder: () => e2.Encoder, Map: () => e2.Map, Simple: () => e2.Simple, Tagged: () => e2.Tagged, comment: () => e2.UI, decode: () => e2.Jx, decodeAll: () => e2.fI, decodeAllSync: () => e2.cc, decodeFirst: () => e2.h8, decodeFirstSync: () => e2.$u, diagnose: () => e2.M, encode: () => e2.cv, encodeAsync: () => e2.WR, encodeCanonical: () => e2.N2, encodeOne: () => e2.TG, leveldb: () => e2.ww, reset: () => e2.mc });
          var e2 = r(141);
        })(), n;
      })();
    });
  }
});

// node_modules/web-api/src/err.js
var BadPlatform = class extends Error {
  constructor(facility) {
    super(`${facility} is not supported on this platform`);
    this.name = "BadPlatform";
  }
};
var InvalidArg = class extends Error {
  constructor(arg) {
    super(`invalid arg: ${arg}`);
    this.name = "InvalidArg";
  }
};
var UnexpectedError = class extends Error {
  constructor() {
    super(`unexpected error`);
    this.name = "UnexpectedError";
  }
};
var InvalidKey = class extends Error {
  constructor(op) {
    super(`invalid key in ${op}`);
    this.name = "InvalidKey";
  }
};
var OperationBlocked = class extends Error {
  constructor(op) {
    super(`operation blocked in ${op}`);
    this.name = "OperationBlocked";
  }
};
var WebAuthnError = class extends Error {
  constructor(message, name) {
    super(message);
    this.name = name;
  }
};

// node_modules/web-api/src/validate.js
function validateDatabase(tx) {
  return tx instanceof IDBDatabase;
}
function validateTransactionMode(mode) {
  return mode === "readonly" || mode === "readwrite";
}
function validateTransactionScope(scope) {
  return typeof scope === "string" || scope instanceof Array && scope.reduce((p, c) => p && typeof c === "string", true);
}
function validateTransaction(tx) {
  return tx instanceof IDBTransaction;
}
function validateObjectStore(store) {
  return typeof store === "string";
}
function validateCryptoKey(key) {
  return key instanceof CryptoKey;
}

// node_modules/web-api/src/idb.js
function idbOpenDb(name, version, runMigrations2) {
  if (!window.indexedDB)
    return Promise.reject(new BadPlatform("indexedDB"));
  if (typeof name !== "string")
    return Promise.reject(new InvalidArg("name"));
  if (typeof version !== "number")
    return Promise.reject(new InvalidArg("version"));
  if (typeof runMigrations2 !== "function")
    return Promise.reject(new InvalidArg("runMigrations"));
  return new Promise((resolve, reject) => {
    try {
      const rq = window.indexedDB.open(name, version);
      rq.onupgradeneeded = (e) => {
        try {
          runMigrations2(e.target.result, e.target.transaction, e.newVersion, e.oldVersion);
        } catch (err) {
          reject(err);
        }
      };
      rq.onblocked = (e) => {
        reject(new OperationBlocked("idbOpenDb"));
      };
      rq.onerror = (e) => {
        reject(e.target.error);
      };
      rq.onsuccess = (e) => {
        const db = e.target.result;
        db.onversionchange = () => {
          db.close();
        };
        resolve(db);
      };
    } catch (err) {
      reject(err);
    }
  });
}
function idbCloseDb(db) {
  if (db instanceof IDBDatabase)
    db.close();
}
function idbDeleteDb(name) {
  if (typeof name !== "string")
    return Promise.reject(new InvalidArg(name));
  return new Promise((resolve, reject) => {
    const rq = window.indexedDB.deleteDatabase(name);
    rq.onerror = (e) => {
      reject(new UnexpectedError());
    };
    rq.onsuccess = (e) => {
      resolve();
    };
    rq.onblocked = (e) => {
      reject(new OperationBlocked("idbDeleteDb"));
    };
  });
}
function idbBeginTransaction(db, scope, mode) {
  if (!validateDatabase(db))
    throw new InvalidArg("db");
  if (!validateTransactionScope(scope))
    throw new InvalidArg("scope");
  if (!validateTransactionMode(mode))
    throw new InvalidArg("mode");
  const tx = db.transaction(scope, mode);
  tx.result = null;
  tx.promise = new Promise((resolve, reject) => {
    tx.oncomplete = (e) => {
      resolve(tx.result);
    };
    tx.onerror = (e) => {
      reject(tx.error ? tx.error : e.target.error);
    };
    tx.onabort = (e) => {
      reject(tx.result);
    };
  });
  return tx;
}
function idbFinishTransaction(tx) {
  if (!validateTransaction(tx))
    throw new InvalidArg("tx");
  if (tx.error) {
    return Promise.reject(tx.error);
  }
  return tx.promise;
}
function idbGet(tx, store, key) {
  if (!validateTransaction(tx))
    throw new InvalidArg("tx");
  if (!validateObjectStore(store))
    throw new InvalidArg("store");
  try {
    const os = tx.objectStore(store);
    const rq = os.get(key);
    rq.onsuccess = (e) => {
      tx.result = rq.result;
    };
    rq.onerror = (e) => {
      tx.result = e.target.error;
      tx.abort();
    };
  } catch (err) {
    tx.result = err;
    tx.abort();
  }
}
function idbAdd(tx, store, value, key) {
  if (!validateTransaction(tx))
    throw new InvalidArg("tx");
  if (!validateObjectStore(store))
    throw new InvalidArg("store");
  try {
    const os = tx.objectStore(store);
    const rq = os.add(value, key);
    rq.onsuccess = (e) => {
      tx.result = rq.result;
    };
    rq.onerror = (e) => {
      tx.result = e.target.error;
      tx.abort();
    };
  } catch (err) {
    tx.result = err;
    tx.abort();
  }
}
function idbDelete(tx, store, key) {
  if (!validateTransaction(tx))
    throw new InvalidArg("tx");
  if (!validateObjectStore(store))
    throw new InvalidArg("store");
  try {
    const os = tx.objectStore(store);
    const rq = os.delete(key);
    rq.onsuccess = (e) => {
      tx.result = rq.result;
    };
    rq.onerror = (e) => {
      tx.result = e.target.error;
      tx.abort();
    };
  } catch (err) {
    tx.result = err;
    tx.abort();
  }
}

// node_modules/web-api/src/subtle.js
function randomBytes(buffer) {
  window.crypto.getRandomValues(buffer);
}
function exportKey(key, format) {
  if (!(key instanceof CryptoKey))
    throw new InvalidArg(key);
  return new Promise((resolve, reject) => {
    window.crypto.subtle.exportKey(format, key).then((data) => {
      if (format === "jwk")
        resolve(data);
      else
        resolve(new Uint8Array(data));
    }, (err) => {
      reject(err);
    });
  });
}
function ecdsaGenerateKeyPair(curve) {
  return new Promise((resolve, reject) => {
    const params = {
      name: "ECDSA",
      namedCurve: curve
    };
    window.crypto.subtle.generateKey(params, false, ["sign", "verify"]).then((keyPair) => {
      resolve(keyPair);
    }, (err) => {
      reject(err);
    });
  });
}
function ecdsaImportKey(format, curve, bits, use) {
  return new Promise((resolve, reject) => {
    const params = {
      name: "ECDSA",
      namedCurve: curve
    };
    window.crypto.subtle.importKey(format, bits, params, true, [use]).then((key) => {
      resolve(key);
    }, (err) => {
      reject(err);
    });
  });
}
function ecdsaSign(key, hash, data) {
  if (!validateCryptoKey(key))
    throw new InvalidArg("key");
  return new Promise((resolve, reject) => {
    const params = {
      name: "ECDSA",
      hash
    };
    window.crypto.subtle.sign(params, key, data).then((signature) => {
      signature = new Uint8Array(signature);
      resolve(signature);
    }, (err) => {
      reject(err);
    });
  });
}

// node_modules/web-api/src/webauthn.js
var cbor = __toModule(require_cbor());
async function webauthnGenerateKeyPair(data, user) {
  const userId = new Uint8Array(16);
  randomBytes(userId);
  let challenge = data !== void 0 ? data : new Uint8Array(0);
  let attestationMethod = data !== void 0 ? "direct" : "none";
  const createOptions = {
    rp: {
      name: "Beyond Identity, Inc.",
      id: location.hostname
    },
    challenge,
    user: {
      id: userId,
      name: user.name,
      displayName: user.displayName
    },
    pubKeyCredParams: [
      {
        type: "public-key",
        alg: -7
      }
    ],
    attestation: attestationMethod,
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      userVerification: "required"
    }
  };
  let cred;
  try {
    cred = await navigator.credentials.create({
      publicKey: createOptions
    });
  } catch (err) {
    throw new WebAuthnError(err.message, err.name);
  }
  if (!cred)
    throw new InvalidArg(createOptions);
  const response = cred.response;
  const attestationObject = await cbor.decodeFirst(response.attestationObject);
  const authenticatorData = attestationObject.authData;
  let publicKey2 = await readPublicKey(response, authenticatorData);
  let transports = readTransports(response);
  let signature = readSignature(attestationObject);
  return {
    rawId: cred.rawId,
    publicKey: publicKey2,
    transports,
    clientDataJSON: response.clientDataJSON,
    attestationObject: response.attestationObject,
    authenticatorData,
    signature
  };
}
async function readPublicKey(response, authenticatorData) {
  if (typeof response.getPublicKey === "function") {
    let spkiPublicKey = response.getPublicKey();
    return await ecdsaImportKey("spki", "P-256", spkiPublicKey, "verify");
  } else {
    const credentialIdLengthView = new DataView(authenticatorData.buffer.slice(authenticatorData.byteOffset + 53, authenticatorData.byteOffset + 55));
    const credentialIdLength = credentialIdLengthView.getUint16();
    const cosePublicKeyCBOR = authenticatorData.slice(55 + credentialIdLength);
    const cosePublicKey = await cbor.decodeFirst(cosePublicKeyCBOR);
    let rawPublicKey = new Uint8Array(65);
    rawPublicKey[0] = 4;
    rawPublicKey.set(cosePublicKey.get(-2), 1);
    rawPublicKey.set(cosePublicKey.get(-3), 33);
    return await ecdsaImportKey("raw", "P-256", rawPublicKey, "verify");
  }
}
function readTransports(response) {
  let transports = [];
  if (typeof response.getTransports === "function") {
    transports = response.getTransports();
  }
  return transports;
}
function readSignature(attestation) {
  if (attestation.fmt === "packed") {
    return attestation.attStmt?.sig;
  }
  return void 0;
}
async function webauthnSign(key, data) {
  const getOptions = {
    challenge: data,
    allowCredentials: [
      {
        id: key.rawId,
        type: "public-key",
        transports: key.transports
      }
    ],
    userVerification: "required",
    timeout: 6e4
  };
  const cred = await navigator.credentials.get({ publicKey: getOptions });
  if (!cred)
    throw new InvalidArg(getOptions);
  let response = cred.response;
  return {
    authenticatorData: response.authenticatorData,
    clientDataJSON: response.clientDataJSON,
    signature: response.signature
  };
}

// src/validate.js
function validateKeyHandle(handle) {
  return typeof handle === "string";
}
function validateProvider(provider) {
  return provider === "subtle" || provider === "webauthn";
}
function validateKey(key) {
  if (key !== void 0 && typeof key === "object") {
    if (key.subtle !== void 0)
      return "subtle";
    else if (key.webauthn !== void 0)
      return "webauthn";
  }
  return void 0;
}

// src/crypto.js
var subtleProvider = "subtle";
var webAuthnProvider = "webauthn";
async function getWindowsVersion() {
  if (navigator.userAgentData && navigator.userAgentData.platform === "Windows") {
    try {
      const ua = await navigator.userAgentData.getHighEntropyValues([
        "platform",
        "platformVersion"
      ]);
      const winVer = parseInt(ua.platformVersion.split(".")[0]);
      if (winVer >= 15) {
        return 11;
      } else if (winVer > 10) {
        return 10.5;
      } else if (winVer > 0) {
        return 10;
      } else {
        return 0;
      }
    } catch (err) {
    }
  }
  return -1;
}
async function getWebAuthnSupport() {
  if (window.PublicKeyCredential) {
    try {
      return await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch (err) {
    }
  }
  return false;
}
async function hasWebAuthn() {
  const windowsVersion = await getWindowsVersion();
  return !!((windowsVersion < 0 || windowsVersion >= 11) && await getWebAuthnSupport());
}
function hasSubtleCrypto() {
  return !!window.crypto.subtle;
}
async function queryCryptoCapabilities(provider) {
  if (!validateProvider(provider))
    throw new InvalidArg("provider");
  if (provider === webAuthnProvider) {
    if (await hasWebAuthn())
      return webauthn;
  }
  if (hasSubtleCrypto())
    return subtle;
  throw new BadPlatform("crypto");
}
async function generateKey(provider, data, user) {
  if (!user) {
    throw new TypeError("invalid user");
  }
  let api = await queryCryptoCapabilities(provider);
  return await api.generateKey(data, user);
}
async function sign(key, data) {
  let api = keyProvider(key);
  if (api === void 0)
    throw new InvalidKey("sign");
  return await api.sign(key, data);
}
async function publicKey(key) {
  let api = keyProvider(key);
  if (api === void 0)
    throw new InvalidKey("sign");
  return await api.publicKey(key);
}
function keySanityCheck(key, provider) {
  return provider in key;
}
function keyProvider(key) {
  let provider = validateKey(key);
  if (provider === "subtle")
    return subtle;
  else if (provider === "webauthn")
    return webauthn;
  else
    return void 0;
}
var subtle = new class Subtle {
  extractKeys(key) {
    if (keySanityCheck(key, subtleProvider))
      return key.subtle;
    throw new InvalidKey("");
  }
  async generateKey(data, user) {
    let signingKey = await ecdsaGenerateKeyPair("P-256");
    let key = {
      subtle: {
        signingKey,
        encryptionKey: void 0
      }
    };
    let signature = data !== void 0 ? sign(key, data) : void 0;
    return [key, signature];
  }
  async publicKey(key) {
    let keys = this.extractKeys(key);
    return await exportKey(keys.signingKey.publicKey, "raw");
  }
  async sign(key, data) {
    let keys = this.extractKeys(key);
    let signature = await ecdsaSign(keys.signingKey.privateKey, "SHA-256", data);
    return {
      subtle: {
        signature
      }
    };
  }
}();
var webauthn = new class WebAuthn {
  extractKeys(key) {
    if (keySanityCheck(key, webAuthnProvider))
      return key.webauthn;
    throw new InvalidKey("");
  }
  async generateKey(data, user) {
    const cred = await webauthnGenerateKeyPair(data, user);
    let key = {
      webauthn: {
        signingKey: {
          rawId: cred.rawId,
          transports: cred.transports,
          publicKey: cred.publicKey
        },
        encryptionKey: void 0
      }
    };
    let signature = data !== void 0 ? {
      webauthn: {
        clientDataJSON: cred.clientDataJSON,
        attestationObject: cred.attestationObject
      }
    } : void 0;
    return [key, signature];
  }
  async publicKey(key) {
    let keys = this.extractKeys(key);
    return await exportKey(keys.signingKey.publicKey, "raw");
  }
  async sign(key, data) {
    let keys = this.extractKeys(key);
    const signature = await webauthnSign(keys.signingKey, data);
    return {
      webauthn: {
        authenticatorData: signature.authenticatorData,
        clientDataJSON: signature.clientDataJSON,
        signature: signature.signature
      }
    };
  }
}();

// src/error.js
var KeyNotFound = class extends Error {
  constructor(handle) {
    super(`${handle} not found`);
    this.name = "KeyNotFound";
  }
};
var KeyExists = class extends Error {
  constructor(handle) {
    super(`${handle} exists`);
    this.name = "KeyExists";
  }
};

// src/db.js
var dbKeyStore = "keys";
var kmcDbName = "keymaker";
var kmcCertStore = "certificates";
var kmcKeyStore = "keys";
var kmcProfileStore = "credentials";
var kmcProfileIndex = "id";
var kmcAppSettings = "appSettings";
var kmcDbVersions = [v1, v2, v3, v4, v5, v6];
var kmcDbVersion = kmcDbVersions.length;
function runMigrations(db, tx, version, oldVersion) {
  if (!db)
    throw new InvalidArg("db");
  if (!version)
    throw new InvalidArg("version");
  if (version > kmcDbVersions.length)
    throw new InvalidArg("version");
  for (; oldVersion < version; oldVersion++) {
    kmcDbVersions[oldVersion](db, tx);
  }
}
function v1(db, tx) {
  db.createObjectStore(kmcProfileStore, { keyPath: "handle" });
  db.createObjectStore(kmcCertStore);
  db.createObjectStore(kmcKeyStore);
}
function v2(db, tx) {
  db.createObjectStore(kmcAppSettings, { keyPath: "instanceId" });
}
function v3(db, tx) {
  let store = tx.objectStore(kmcProfileStore);
  let rq = store.openCursor();
  rq.onsuccess = (ev) => {
    let cursor = ev.target.result;
    if (cursor) {
      if (!cursor.value.state) {
        cursor.value.state = "Active";
        cursor.update(cursor.value);
      }
      cursor.continue();
    }
  };
}
function v4(db, tx) {
}
function v5(db, tx) {
  let store = tx.objectStore(kmcProfileStore);
  let rq = store.openCursor();
  rq.onsuccess = (ev) => {
    let cursor = ev.target.result;
    if (cursor) {
      if (!cursor.value.id) {
        cursor.value.id = generateHandle(16, "cr");
        cursor.update(cursor.value);
      }
      cursor.continue();
    }
  };
}
function v6(db, tx) {
  let store = tx.objectStore(kmcProfileStore);
  store.createIndex(kmcProfileIndex, "id", { unique: true });
}
function randomBytes2(len) {
  let buf = new Uint8Array(len);
  window.crypto.getRandomValues(buf);
  return buf;
}
function generateHandle(len, prefix) {
  return (prefix ?? "") + [...randomBytes2(len / 2)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function openDb() {
  return await idbOpenDb(kmcDbName, kmcDbVersions.length, runMigrations);
}
function closeDb(db) {
  if (db !== void 0)
    idbCloseDb(db);
}
async function resetDb() {
  await idbDeleteDb(kmcDbName);
}

// src/keyStore.js
async function loadKey(db, handle) {
  if (!validateDatabase(db))
    throw new InvalidArg("db");
  if (!validateKeyHandle(handle))
    throw new InvalidArg("handle");
  const tx = idbBeginTransaction(db, dbKeyStore, "readonly");
  idbGet(tx, dbKeyStore, handle);
  let obj = await idbFinishTransaction(tx);
  if (obj !== void 0) {
    if (validateKey === void 0)
      throw new InvalidKey("loadKey");
    return obj;
  }
  return void 0;
}
async function saveKey(db, handle, key) {
  if (!validateDatabase(db))
    throw new InvalidArg("db");
  if (!validateKeyHandle(handle))
    throw new InvalidArg("handle");
  if (validateKey(key) === void 0)
    throw new InvalidKey("saveKey");
  const tx = idbBeginTransaction(db, dbKeyStore, "readwrite");
  idbAdd(tx, dbKeyStore, key, handle);
  await idbFinishTransaction(tx);
}
async function deleteKey(db, handle) {
  if (!validateDatabase(db))
    throw new InvalidArg("db");
  if (!validateKeyHandle(handle))
    throw new InvalidArg("handle");
  const tx = idbBeginTransaction(db, dbKeyStore, "readwrite");
  idbDelete(tx, dbKeyStore, handle);
  await idbFinishTransaction(tx);
}

// src/index.js
function FfiCreateKeyP256(handle, provider, data, user) {
  return new Promise(async (resolve, reject) => {
    let db;
    try {
      db = await openDb();
      let key = await loadKey(db, handle);
      if (key)
        throw new KeyExists(handle);
      let signature;
      try {
        [key, signature] = await generateKey(provider, data, user);
      } catch (err) {
        if (provider === "webauthn" && err instanceof WebAuthnError && err.name != "NotAllowedError") {
          console.warn(err);
          [key, signature] = await generateKey("subtle", data, void 0);
        } else {
          throw err;
        }
      }
      await saveKey(db, handle, key);
      resolve(signature);
    } catch (err) {
      reject(err);
    } finally {
      closeDb(db);
    }
  });
}
function FfiQueryKeyP256(handle) {
  return new Promise(async (resolve, reject) => {
    let db;
    try {
      db = await openDb();
      const key = await loadKey(db, handle);
      if (key === void 0)
        throw new KeyNotFound(handle);
      const type = validateKey(key);
      if (type === void 0) {
        throw new InvalidKey("FfiQueryKeyP256");
      } else {
        resolve(type);
      }
    } catch (err) {
      reject(err);
    } finally {
      closeDb(db);
    }
  });
}
function FfiDeleteKeyP256(handle) {
  return new Promise(async (resolve, reject) => {
    let db;
    try {
      db = await openDb();
      const key = await loadKey(db, handle);
      if (key === void 0)
        throw new KeyNotFound(handle);
      await deleteKey(db, handle);
      resolve();
    } catch (err) {
      reject(err);
    } finally {
      closeDb(db);
    }
  });
}
function FfiVerifyExistingKeyP256(handle) {
  return new Promise(async (resolve, reject) => {
    let db;
    try {
      db = await openDb();
      const key = await loadKey(db, handle);
      if (key === void 0) {
        resolve(void 0);
      }
      if (validateKey(key) === void 0)
        throw new InvalidKey(handle);
      resolve(handle);
    } catch (err) {
      reject(err);
    } finally {
      closeDb(db);
    }
  });
}
function FfiSignWithP256(handle, data) {
  return new Promise(async (resolve, reject) => {
    let db;
    try {
      db = await openDb();
      const key = await loadKey(db, handle);
      if (key === void 0)
        throw new KeyNotFound(handle);
      const signature = await sign(key, data);
      resolve(signature);
    } catch (err) {
      reject(err);
    } finally {
      closeDb(db);
    }
  });
}
function FfiPublicBitsP256(handle) {
  return new Promise(async (resolve, reject) => {
    let db;
    try {
      db = await openDb();
      const key = await loadKey(db, handle);
      if (key === void 0)
        throw new KeyNotFound(handle);
      const bits = await publicKey(key);
      resolve(bits);
    } catch (err) {
      reject(err);
    } finally {
      closeDb(db);
    }
  });
}
export {
  FfiCreateKeyP256,
  FfiDeleteKeyP256,
  FfiPublicBitsP256,
  FfiQueryKeyP256,
  FfiSignWithP256,
  FfiVerifyExistingKeyP256,
  KeyExists,
  KeyNotFound,
  closeDb,
  deleteKey,
  generateKey,
  kmcDbVersion,
  loadKey,
  openDb,
  publicKey,
  resetDb,
  saveKey,
  sign,
  validateKey,
  validateKeyHandle
};
/*! For license information please see cbor.js.LICENSE.txt */
