var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[Object.keys(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key2 of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key2) && key2 !== "default")
        __defProp(target, key2, { get: () => module2[key2], enumerable: !(desc = __getOwnPropDesc(module2, key2)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/@protobufjs/aspromise/index.js
var require_aspromise = __commonJS({
  "node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
    "use strict";
    module2.exports = asPromise;
    function asPromise(fn, ctx) {
      var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
      while (index < arguments.length)
        params[offset++] = arguments[index++];
      return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err) {
          if (pending) {
            pending = false;
            if (err)
              reject(err);
            else {
              var params2 = new Array(arguments.length - 1), offset2 = 0;
              while (offset2 < params2.length)
                params2[offset2++] = arguments[offset2];
              resolve.apply(null, params2);
            }
          }
        };
        try {
          fn.apply(ctx || null, params);
        } catch (err) {
          if (pending) {
            pending = false;
            reject(err);
          }
        }
      });
    }
  }
});

// node_modules/@protobufjs/base64/index.js
var require_base64 = __commonJS({
  "node_modules/@protobufjs/base64/index.js"(exports2) {
    "use strict";
    var base64 = exports2;
    base64.length = function length(string) {
      var p = string.length;
      if (!p)
        return 0;
      var n = 0;
      while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
      return Math.ceil(string.length * 3) / 4 - n;
    };
    var b64 = new Array(64);
    var s64 = new Array(123);
    for (i = 0; i < 64; )
      s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    var i;
    base64.encode = function encode(buffer, start, end) {
      var parts = null, chunk = [];
      var i2 = 0, j = 0, t;
      while (start < end) {
        var b = buffer[start++];
        switch (j) {
          case 0:
            chunk[i2++] = b64[b >> 2];
            t = (b & 3) << 4;
            j = 1;
            break;
          case 1:
            chunk[i2++] = b64[t | b >> 4];
            t = (b & 15) << 2;
            j = 2;
            break;
          case 2:
            chunk[i2++] = b64[t | b >> 6];
            chunk[i2++] = b64[b & 63];
            j = 0;
            break;
        }
        if (i2 > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i2 = 0;
        }
      }
      if (j) {
        chunk[i2++] = b64[t];
        chunk[i2++] = 61;
        if (j === 1)
          chunk[i2++] = 61;
      }
      if (parts) {
        if (i2)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i2));
    };
    var invalidEncoding = "invalid encoding";
    base64.decode = function decode(string, buffer, offset) {
      var start = offset;
      var j = 0, t;
      for (var i2 = 0; i2 < string.length; ) {
        var c = string.charCodeAt(i2++);
        if (c === 61 && j > 1)
          break;
        if ((c = s64[c]) === void 0)
          throw Error(invalidEncoding);
        switch (j) {
          case 0:
            t = c;
            j = 1;
            break;
          case 1:
            buffer[offset++] = t << 2 | (c & 48) >> 4;
            t = c;
            j = 2;
            break;
          case 2:
            buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
            t = c;
            j = 3;
            break;
          case 3:
            buffer[offset++] = (t & 3) << 6 | c;
            j = 0;
            break;
        }
      }
      if (j === 1)
        throw Error(invalidEncoding);
      return offset - start;
    };
    base64.test = function test(string) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
    };
  }
});

// node_modules/@protobufjs/eventemitter/index.js
var require_eventemitter = __commonJS({
  "node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
    "use strict";
    module2.exports = EventEmitter;
    function EventEmitter() {
      this._listeners = {};
    }
    EventEmitter.prototype.on = function on(evt, fn, ctx) {
      (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn,
        ctx: ctx || this
      });
      return this;
    };
    EventEmitter.prototype.off = function off(evt, fn) {
      if (evt === void 0)
        this._listeners = {};
      else {
        if (fn === void 0)
          this._listeners[evt] = [];
        else {
          var listeners = this._listeners[evt];
          for (var i = 0; i < listeners.length; )
            if (listeners[i].fn === fn)
              listeners.splice(i, 1);
            else
              ++i;
        }
      }
      return this;
    };
    EventEmitter.prototype.emit = function emit(evt) {
      var listeners = this._listeners[evt];
      if (listeners) {
        var args = [], i = 1;
        for (; i < arguments.length; )
          args.push(arguments[i++]);
        for (i = 0; i < listeners.length; )
          listeners[i].fn.apply(listeners[i++].ctx, args);
      }
      return this;
    };
  }
});

// node_modules/@protobufjs/float/index.js
var require_float = __commonJS({
  "node_modules/@protobufjs/float/index.js"(exports2, module2) {
    "use strict";
    module2.exports = factory(factory);
    function factory(exports3) {
      if (typeof Float32Array !== "undefined")
        (function() {
          var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }
          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }
          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
      else
        (function() {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0)
              writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos);
            else if (isNaN(val))
              writeUint(2143289344, buf, pos);
            else if (val > 34028234663852886e22)
              writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 11754943508222875e-54)
              writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }
          exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
      if (typeof Float64Array !== "undefined")
        (function() {
          var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }
          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }
          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
      else
        (function() {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf, pos + off0);
              writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024)
                  exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
              }
            }
          }
          exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
      return exports3;
    }
    function writeUintLE(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    function writeUintBE(val, buf, pos) {
      buf[pos] = val >>> 24;
      buf[pos + 1] = val >>> 16 & 255;
      buf[pos + 2] = val >>> 8 & 255;
      buf[pos + 3] = val & 255;
    }
    function readUintLE(buf, pos) {
      return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
    }
    function readUintBE(buf, pos) {
      return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
    }
  }
});

// node_modules/@protobufjs/inquire/index.js
var require_inquire = __commonJS({
  "node_modules/@protobufjs/inquire/index.js"(exports, module) {
    "use strict";
    module.exports = inquire;
    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length))
          return mod;
      } catch (e) {
      }
      return null;
    }
  }
});

// node_modules/@protobufjs/utf8/index.js
var require_utf8 = __commonJS({
  "node_modules/@protobufjs/utf8/index.js"(exports2) {
    "use strict";
    var utf8 = exports2;
    utf8.length = function utf8_length(string) {
      var len = 0, c = 0;
      for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
          len += 1;
        else if (c < 2048)
          len += 2;
        else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
          ++i;
          len += 4;
        } else
          len += 3;
      }
      return len;
    };
    utf8.read = function utf8_read(buffer, start, end) {
      var len = end - start;
      if (len < 1)
        return "";
      var parts = null, chunk = [], i = 0, t;
      while (start < end) {
        t = buffer[start++];
        if (t < 128)
          chunk[i++] = t;
        else if (t > 191 && t < 224)
          chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
          t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
          chunk[i++] = 55296 + (t >> 10);
          chunk[i++] = 56320 + (t & 1023);
        } else
          chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i = 0;
        }
      }
      if (parts) {
        if (i)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i));
    };
    utf8.write = function utf8_write(string, buffer, offset) {
      var start = offset, c1, c2;
      for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
          buffer[offset++] = c1;
        } else if (c1 < 2048) {
          buffer[offset++] = c1 >> 6 | 192;
          buffer[offset++] = c1 & 63 | 128;
        } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
          c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
          ++i;
          buffer[offset++] = c1 >> 18 | 240;
          buffer[offset++] = c1 >> 12 & 63 | 128;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        } else {
          buffer[offset++] = c1 >> 12 | 224;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        }
      }
      return offset - start;
    };
  }
});

// node_modules/@protobufjs/pool/index.js
var require_pool = __commonJS({
  "node_modules/@protobufjs/pool/index.js"(exports2, module2) {
    "use strict";
    module2.exports = pool;
    function pool(alloc, slice, size) {
      var SIZE = size || 8192;
      var MAX = SIZE >>> 1;
      var slab = null;
      var offset = SIZE;
      return function pool_alloc(size2) {
        if (size2 < 1 || size2 > MAX)
          return alloc(size2);
        if (offset + size2 > SIZE) {
          slab = alloc(SIZE);
          offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size2);
        if (offset & 7)
          offset = (offset | 7) + 1;
        return buf;
      };
    }
  }
});

// node_modules/protobufjs/src/util/longbits.js
var require_longbits = __commonJS({
  "node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
    "use strict";
    module2.exports = LongBits;
    var util2 = require_minimal();
    function LongBits(lo, hi) {
      this.lo = lo >>> 0;
      this.hi = hi >>> 0;
    }
    var zero = LongBits.zero = new LongBits(0, 0);
    zero.toNumber = function() {
      return 0;
    };
    zero.zzEncode = zero.zzDecode = function() {
      return this;
    };
    zero.length = function() {
      return 1;
    };
    var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
    LongBits.fromNumber = function fromNumber(value) {
      if (value === 0)
        return zero;
      var sign = value < 0;
      if (sign)
        value = -value;
      var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
      if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
          lo = 0;
          if (++hi > 4294967295)
            hi = 0;
        }
      }
      return new LongBits(lo, hi);
    };
    LongBits.from = function from(value) {
      if (typeof value === "number")
        return LongBits.fromNumber(value);
      if (util2.isString(value)) {
        if (util2.Long)
          value = util2.Long.fromString(value);
        else
          return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
    };
    LongBits.prototype.toNumber = function toNumber(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo)
          hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    };
    LongBits.prototype.toLong = function toLong(unsigned) {
      return util2.Long ? new util2.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    };
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = function fromHash(hash) {
      if (hash === zeroHash)
        return zero;
      return new LongBits((charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0, (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0);
    };
    LongBits.prototype.toHash = function toHash() {
      return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
    };
    LongBits.prototype.zzEncode = function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
      this.lo = (this.lo << 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.zzDecode = function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
      this.hi = (this.hi >>> 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.length = function length() {
      var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
      return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
    };
  }
});

// node_modules/protobufjs/src/util/minimal.js
var require_minimal = __commonJS({
  "node_modules/protobufjs/src/util/minimal.js"(exports2) {
    "use strict";
    var util2 = exports2;
    util2.asPromise = require_aspromise();
    util2.base64 = require_base64();
    util2.EventEmitter = require_eventemitter();
    util2.float = require_float();
    util2.inquire = require_inquire();
    util2.utf8 = require_utf8();
    util2.pool = require_pool();
    util2.LongBits = require_longbits();
    util2.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    util2.global = util2.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
    util2.emptyArray = Object.freeze ? Object.freeze([]) : [];
    util2.emptyObject = Object.freeze ? Object.freeze({}) : {};
    util2.isInteger = Number.isInteger || function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util2.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util2.isObject = function isObject(value) {
      return value && typeof value === "object";
    };
    util2.isset = util2.isSet = function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util2.Buffer = function() {
      try {
        var Buffer2 = util2.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : null;
      } catch (e) {
        return null;
      }
    }();
    util2._Buffer_from = null;
    util2._Buffer_allocUnsafe = null;
    util2.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util2.Buffer ? util2._Buffer_allocUnsafe(sizeOrArray) : new util2.Array(sizeOrArray) : util2.Buffer ? util2._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util2.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util2.Long = util2.global.dcodeIO && util2.global.dcodeIO.Long || util2.global.Long || util2.inquire("long");
    util2.key2Re = /^true|false|0|1$/;
    util2.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util2.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util2.longToHash = function longToHash(value) {
      return value ? util2.LongBits.from(value).toHash() : util2.LongBits.zeroHash;
    };
    util2.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util2.LongBits.fromHash(hash);
      if (util2.Long)
        return util2.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge(dst, src, ifNotSet) {
      for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src[keys[i]];
      return dst;
    }
    util2.merge = merge;
    util2.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name) {
      function CustomError(message, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message, properties);
        Object.defineProperty(this, "message", { get: function() {
          return message;
        } });
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", { value: new Error().stack || "" });
        if (properties)
          merge(this, properties);
      }
      (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;
      Object.defineProperty(CustomError.prototype, "name", { get: function() {
        return name;
      } });
      CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
      };
      return CustomError;
    }
    util2.newError = newError;
    util2.ProtocolError = newError("ProtocolError");
    util2.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    };
    util2.oneOfSetter = function setOneOf(fieldNames) {
      return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name)
            delete this[fieldNames[i]];
      };
    };
    util2.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util2._configure = function() {
      var Buffer2 = util2.Buffer;
      if (!Buffer2) {
        util2._Buffer_from = util2._Buffer_allocUnsafe = null;
        return;
      }
      util2._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      };
      util2._Buffer_allocUnsafe = Buffer2.allocUnsafe || function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      };
    };
  }
});

// node_modules/protobufjs/src/writer.js
var require_writer = __commonJS({
  "node_modules/protobufjs/src/writer.js"(exports2, module2) {
    "use strict";
    module2.exports = Writer2;
    var util2 = require_minimal();
    var BufferWriter;
    var LongBits = util2.LongBits;
    var base64 = util2.base64;
    var utf8 = util2.utf8;
    function Op(fn, len, val) {
      this.fn = fn;
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    function noop() {
    }
    function State(writer) {
      this.head = writer.head;
      this.tail = writer.tail;
      this.len = writer.len;
      this.next = writer.states;
    }
    function Writer2() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    var create = function create2() {
      return util2.Buffer ? function create_buffer_setup() {
        return (Writer2.create = function create_buffer() {
          return new BufferWriter();
        })();
      } : function create_array() {
        return new Writer2();
      };
    };
    Writer2.create = create();
    Writer2.alloc = function alloc(size) {
      return new util2.Array(size);
    };
    if (util2.Array !== Array)
      Writer2.alloc = util2.pool(Writer2.alloc, util2.Array.prototype.subarray);
    Writer2.prototype._push = function push(fn, len, val) {
      this.tail = this.tail.next = new Op(fn, len, val);
      this.len += len;
      return this;
    };
    function writeByte(val, buf, pos) {
      buf[pos] = val & 255;
    }
    function writeVarint32(val, buf, pos) {
      while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
      }
      buf[pos] = val;
    }
    function VarintOp(len, val) {
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    VarintOp.prototype = Object.create(Op.prototype);
    VarintOp.prototype.fn = writeVarint32;
    Writer2.prototype.uint32 = function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
      return this;
    };
    Writer2.prototype.int32 = function write_int32(value) {
      return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    };
    Writer2.prototype.sint32 = function write_sint32(value) {
      return this.uint32((value << 1 ^ value >> 31) >>> 0);
    };
    function writeVarint64(val, buf, pos) {
      while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
      }
      while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
      }
      buf[pos++] = val.lo;
    }
    Writer2.prototype.uint64 = function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer2.prototype.int64 = Writer2.prototype.uint64;
    Writer2.prototype.sint64 = function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer2.prototype.bool = function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    };
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    Writer2.prototype.fixed32 = function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    };
    Writer2.prototype.sfixed32 = Writer2.prototype.fixed32;
    Writer2.prototype.fixed64 = function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    };
    Writer2.prototype.sfixed64 = Writer2.prototype.fixed64;
    Writer2.prototype.float = function write_float(value) {
      return this._push(util2.float.writeFloatLE, 4, value);
    };
    Writer2.prototype.double = function write_double(value) {
      return this._push(util2.float.writeDoubleLE, 8, value);
    };
    var writeBytes = util2.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
      buf.set(val, pos);
    } : function writeBytes_for(val, buf, pos) {
      for (var i = 0; i < val.length; ++i)
        buf[pos + i] = val[i];
    };
    Writer2.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util2.isString(value)) {
        var buf = Writer2.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    };
    Writer2.prototype.string = function write_string(value) {
      var len = utf8.length(value);
      return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
    };
    Writer2.prototype.fork = function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    };
    Writer2.prototype.reset = function reset() {
      if (this.states) {
        this.head = this.states.head;
        this.tail = this.states.tail;
        this.len = this.states.len;
        this.states = this.states.next;
      } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
      }
      return this;
    };
    Writer2.prototype.ldelim = function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    };
    Writer2.prototype.finish = function finish() {
      var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
      while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
      }
      return buf;
    };
    Writer2._configure = function(BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer2.create = create();
      BufferWriter._configure();
    };
  }
});

// node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = __commonJS({
  "node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferWriter;
    var Writer2 = require_writer();
    (BufferWriter.prototype = Object.create(Writer2.prototype)).constructor = BufferWriter;
    var util2 = require_minimal();
    function BufferWriter() {
      Writer2.call(this);
    }
    BufferWriter._configure = function() {
      BufferWriter.alloc = util2._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util2.Buffer && util2.Buffer.prototype instanceof Uint8Array && util2.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy)
          val.copy(buf, pos, 0, val.length);
        else
          for (var i = 0; i < val.length; )
            buf[pos++] = val[i++];
      };
    };
    BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
      if (util2.isString(value))
        value = util2._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    };
    function writeStringBuffer(val, buf, pos) {
      if (val.length < 40)
        util2.utf8.write(val, buf, pos);
      else if (buf.utf8Write)
        buf.utf8Write(val, pos);
      else
        buf.write(val, pos);
    }
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var len = util2.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(writeStringBuffer, len, value);
      return this;
    };
    BufferWriter._configure();
  }
});

// node_modules/protobufjs/src/reader.js
var require_reader = __commonJS({
  "node_modules/protobufjs/src/reader.js"(exports2, module2) {
    "use strict";
    module2.exports = Reader2;
    var util2 = require_minimal();
    var BufferReader;
    var LongBits = util2.LongBits;
    var utf8 = util2.utf8;
    function indexOutOfRange(reader, writeLength) {
      return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
    }
    function Reader2(buffer) {
      this.buf = buffer;
      this.pos = 0;
      this.len = buffer.length;
    }
    var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
      if (buffer instanceof Uint8Array || Array.isArray(buffer))
        return new Reader2(buffer);
      throw Error("illegal buffer");
    } : function create_array2(buffer) {
      if (Array.isArray(buffer))
        return new Reader2(buffer);
      throw Error("illegal buffer");
    };
    var create = function create2() {
      return util2.Buffer ? function create_buffer_setup(buffer) {
        return (Reader2.create = function create_buffer(buffer2) {
          return util2.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
        })(buffer);
      } : create_array;
    };
    Reader2.create = create();
    Reader2.prototype._slice = util2.Array.prototype.subarray || util2.Array.prototype.slice;
    Reader2.prototype.uint32 = function read_uint32_setup() {
      var value = 4294967295;
      return function read_uint32() {
        value = (this.buf[this.pos] & 127) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        if ((this.pos += 5) > this.len) {
          this.pos = this.len;
          throw indexOutOfRange(this, 10);
        }
        return value;
      };
    }();
    Reader2.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader2.prototype.sint32 = function read_sint32() {
      var value = this.uint32();
      return value >>> 1 ^ -(value & 1) | 0;
    };
    function readLongVarint() {
      var bits = new LongBits(0, 0);
      var i = 0;
      if (this.len - this.pos > 4) {
        for (; i < 4; ++i) {
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits;
        i = 0;
      } else {
        for (; i < 3; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
      }
      if (this.len - this.pos > 4) {
        for (; i < 5; ++i) {
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      } else {
        for (; i < 5; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      }
      throw Error("invalid varint encoding");
    }
    Reader2.prototype.bool = function read_bool() {
      return this.uint32() !== 0;
    };
    function readFixed32_end(buf, end) {
      return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
    }
    Reader2.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    };
    Reader2.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    Reader2.prototype.float = function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util2.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader2.prototype.double = function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util2.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader2.prototype.bytes = function read_bytes() {
      var length = this.uint32(), start = this.pos, end = this.pos + length;
      if (end > this.len)
        throw indexOutOfRange(this, length);
      this.pos += length;
      if (Array.isArray(this.buf))
        return this.buf.slice(start, end);
      return start === end ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
    };
    Reader2.prototype.string = function read_string() {
      var bytes = this.bytes();
      return utf8.read(bytes, 0, bytes.length);
    };
    Reader2.prototype.skip = function skip(length) {
      if (typeof length === "number") {
        if (this.pos + length > this.len)
          throw indexOutOfRange(this, length);
        this.pos += length;
      } else {
        do {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
      }
      return this;
    };
    Reader2.prototype.skipType = function(wireType) {
      switch (wireType) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          while ((wireType = this.uint32() & 7) !== 4) {
            this.skipType(wireType);
          }
          break;
        case 5:
          this.skip(4);
          break;
        default:
          throw Error("invalid wire type " + wireType + " at offset " + this.pos);
      }
      return this;
    };
    Reader2._configure = function(BufferReader_) {
      BufferReader = BufferReader_;
      Reader2.create = create();
      BufferReader._configure();
      var fn = util2.Long ? "toLong" : "toNumber";
      util2.merge(Reader2.prototype, {
        int64: function read_int64() {
          return readLongVarint.call(this)[fn](false);
        },
        uint64: function read_uint64() {
          return readLongVarint.call(this)[fn](true);
        },
        sint64: function read_sint64() {
          return readLongVarint.call(this).zzDecode()[fn](false);
        },
        fixed64: function read_fixed64() {
          return readFixed64.call(this)[fn](true);
        },
        sfixed64: function read_sfixed64() {
          return readFixed64.call(this)[fn](false);
        }
      });
    };
  }
});

// node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = __commonJS({
  "node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferReader;
    var Reader2 = require_reader();
    (BufferReader.prototype = Object.create(Reader2.prototype)).constructor = BufferReader;
    var util2 = require_minimal();
    function BufferReader(buffer) {
      Reader2.call(this, buffer);
    }
    BufferReader._configure = function() {
      if (util2.Buffer)
        BufferReader.prototype._slice = util2.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    };
    BufferReader._configure();
  }
});

// node_modules/protobufjs/src/rpc/service.js
var require_service = __commonJS({
  "node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service;
    var util2 = require_minimal();
    (Service.prototype = Object.create(util2.EventEmitter.prototype)).constructor = Service;
    function Service(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");
      util2.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
      if (!request)
        throw TypeError("request must be specified");
      var self2 = this;
      if (!callback)
        return util2.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
      if (!self2.rpcImpl) {
        setTimeout(function() {
          callback(Error("already ended"));
        }, 0);
        return void 0;
      }
      try {
        return self2.rpcImpl(method, requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(), function rpcCallback(err, response) {
          if (err) {
            self2.emit("error", err, method);
            return callback(err);
          }
          if (response === null) {
            self2.end(true);
            return void 0;
          }
          if (!(response instanceof responseCtor)) {
            try {
              response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
            } catch (err2) {
              self2.emit("error", err2, method);
              return callback(err2);
            }
          }
          self2.emit("data", response, method);
          return callback(null, response);
        });
      } catch (err) {
        self2.emit("error", err, method);
        setTimeout(function() {
          callback(err);
        }, 0);
        return void 0;
      }
    };
    Service.prototype.end = function end(endedByRPC) {
      if (this.rpcImpl) {
        if (!endedByRPC)
          this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
      }
      return this;
    };
  }
});

// node_modules/protobufjs/src/rpc.js
var require_rpc = __commonJS({
  "node_modules/protobufjs/src/rpc.js"(exports2) {
    "use strict";
    var rpc = exports2;
    rpc.Service = require_service();
  }
});

// node_modules/protobufjs/src/roots.js
var require_roots = __commonJS({
  "node_modules/protobufjs/src/roots.js"(exports2, module2) {
    "use strict";
    module2.exports = {};
  }
});

// node_modules/protobufjs/src/index-minimal.js
var require_index_minimal = __commonJS({
  "node_modules/protobufjs/src/index-minimal.js"(exports2) {
    "use strict";
    var protobuf = exports2;
    protobuf.build = "minimal";
    protobuf.Writer = require_writer();
    protobuf.BufferWriter = require_writer_buffer();
    protobuf.Reader = require_reader();
    protobuf.BufferReader = require_reader_buffer();
    protobuf.util = require_minimal();
    protobuf.rpc = require_rpc();
    protobuf.roots = require_roots();
    protobuf.configure = configure;
    function configure() {
      protobuf.util._configure();
      protobuf.Writer._configure(protobuf.BufferWriter);
      protobuf.Reader._configure(protobuf.BufferReader);
    }
    configure();
  }
});

// node_modules/protobufjs/minimal.js
var require_minimal2 = __commonJS({
  "node_modules/protobufjs/minimal.js"(exports2, module2) {
    "use strict";
    module2.exports = require_index_minimal();
  }
});

// node_modules/ua-parser-js/src/ua-parser.js
var require_ua_parser = __commonJS({
  "node_modules/ua-parser-js/src/ua-parser.js"(exports2, module2) {
    (function(window2, undefined2) {
      "use strict";
      var LIBVERSION = "1.0.2", EMPTY = "", UNKNOWN = "?", FUNC_TYPE = "function", UNDEF_TYPE = "undefined", OBJ_TYPE = "object", STR_TYPE = "string", MAJOR = "major", MODEL = "model", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION = "version", ARCHITECTURE = "architecture", CONSOLE = "console", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv", WEARABLE = "wearable", EMBEDDED = "embedded", UA_MAX_LENGTH = 255;
      var AMAZON = "Amazon", APPLE = "Apple", ASUS = "ASUS", BLACKBERRY = "BlackBerry", BROWSER = "Browser", CHROME = "Chrome", EDGE = "Edge", FIREFOX = "Firefox", GOOGLE = "Google", HUAWEI = "Huawei", LG = "LG", MICROSOFT = "Microsoft", MOTOROLA = "Motorola", OPERA = "Opera", SAMSUNG = "Samsung", SONY = "Sony", XIAOMI = "Xiaomi", ZEBRA = "Zebra", FACEBOOK = "Facebook";
      var extend = function(regexes2, extensions) {
        var mergedRegexes = {};
        for (var i in regexes2) {
          if (extensions[i] && extensions[i].length % 2 === 0) {
            mergedRegexes[i] = extensions[i].concat(regexes2[i]);
          } else {
            mergedRegexes[i] = regexes2[i];
          }
        }
        return mergedRegexes;
      }, enumerize = function(arr) {
        var enums = {};
        for (var i = 0; i < arr.length; i++) {
          enums[arr[i].toUpperCase()] = arr[i];
        }
        return enums;
      }, has = function(str1, str2) {
        return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
      }, lowerize = function(str) {
        return str.toLowerCase();
      }, majorize = function(version) {
        return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split(".")[0] : undefined2;
      }, trim = function(str, len) {
        if (typeof str === STR_TYPE) {
          str = str.replace(/^\s\s*/, EMPTY).replace(/\s\s*$/, EMPTY);
          return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
        }
      };
      var rgxMapper = function(ua, arrays) {
        var i = 0, j, k, p, q, matches, match;
        while (i < arrays.length && !matches) {
          var regex = arrays[i], props = arrays[i + 1];
          j = k = 0;
          while (j < regex.length && !matches) {
            matches = regex[j++].exec(ua);
            if (!!matches) {
              for (p = 0; p < props.length; p++) {
                match = matches[++k];
                q = props[p];
                if (typeof q === OBJ_TYPE && q.length > 0) {
                  if (q.length === 2) {
                    if (typeof q[1] == FUNC_TYPE) {
                      this[q[0]] = q[1].call(this, match);
                    } else {
                      this[q[0]] = q[1];
                    }
                  } else if (q.length === 3) {
                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                      this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined2;
                    } else {
                      this[q[0]] = match ? match.replace(q[1], q[2]) : undefined2;
                    }
                  } else if (q.length === 4) {
                    this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined2;
                  }
                } else {
                  this[q] = match ? match : undefined2;
                }
              }
            }
          }
          i += 2;
        }
      }, strMapper = function(str, map) {
        for (var i in map) {
          if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
            for (var j = 0; j < map[i].length; j++) {
              if (has(map[i][j], str)) {
                return i === UNKNOWN ? undefined2 : i;
              }
            }
          } else if (has(map[i], str)) {
            return i === UNKNOWN ? undefined2 : i;
          }
        }
        return str;
      };
      var oldSafariMap = {
        "1.0": "/8",
        "1.2": "/1",
        "1.3": "/3",
        "2.0": "/412",
        "2.0.2": "/416",
        "2.0.3": "/417",
        "2.0.4": "/419",
        "?": "/"
      }, windowsVersionMap = {
        "ME": "4.90",
        "NT 3.11": "NT3.51",
        "NT 4.0": "NT4.0",
        "2000": "NT 5.0",
        "XP": ["NT 5.1", "NT 5.2"],
        "Vista": "NT 6.0",
        "7": "NT 6.1",
        "8": "NT 6.2",
        "8.1": "NT 6.3",
        "10": ["NT 6.4", "NT 10.0"],
        "RT": "ARM"
      };
      var regexes = {
        browser: [
          [
            /\b(?:crmo|crios)\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Chrome"]],
          [
            /edg(?:e|ios|a)?\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Edge"]],
          [
            /(opera mini)\/([-\w\.]+)/i,
            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            /opios[\/ ]+([\w\.]+)/i
          ],
          [VERSION, [NAME, OPERA + " Mini"]],
          [
            /\bopr\/([\w\.]+)/i
          ],
          [VERSION, [NAME, OPERA]],
          [
            /(kindle)\/([\w\.]+)/i,
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
            /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
            /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
            /(?:ms|\()(ie) ([\w\.]+)/i,
            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([-\w\.]+)/i,
            /(weibo)__([\d\.]+)/i
          ],
          [NAME, VERSION],
          [
            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
          ],
          [VERSION, [NAME, "UC" + BROWSER]],
          [
            /\bqbcore\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "WeChat(Win) Desktop"]],
          [
            /micromessenger\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "WeChat"]],
          [
            /konqueror\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Konqueror"]],
          [
            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
          ],
          [VERSION, [NAME, "IE"]],
          [
            /yabrowser\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Yandex"]],
          [
            /(avast|avg)\/([\w\.]+)/i
          ],
          [[NAME, /(.+)/, "$1 Secure " + BROWSER], VERSION],
          [
            /\bfocus\/([\w\.]+)/i
          ],
          [VERSION, [NAME, FIREFOX + " Focus"]],
          [
            /\bopt\/([\w\.]+)/i
          ],
          [VERSION, [NAME, OPERA + " Touch"]],
          [
            /coc_coc\w+\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Coc Coc"]],
          [
            /dolfin\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "Dolphin"]],
          [
            /coast\/([\w\.]+)/i
          ],
          [VERSION, [NAME, OPERA + " Coast"]],
          [
            /miuibrowser\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "MIUI " + BROWSER]],
          [
            /fxios\/([-\w\.]+)/i
          ],
          [VERSION, [NAME, FIREFOX]],
          [
            /\bqihu|(qi?ho?o?|360)browser/i
          ],
          [[NAME, "360 " + BROWSER]],
          [
            /(oculus|samsung|sailfish)browser\/([\w\.]+)/i
          ],
          [[NAME, /(.+)/, "$1 " + BROWSER], VERSION],
          [
            /(comodo_dragon)\/([\w\.]+)/i
          ],
          [[NAME, /_/g, " "], VERSION],
          [
            /(electron)\/([\w\.]+) safari/i,
            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
            /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            /(metasr)[\/ ]?([\w\.]+)/i,
            /(lbbrowser)/i
          ],
          [NAME],
          [
            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
          ],
          [[NAME, FACEBOOK], VERSION],
          [
            /safari (line)\/([\w\.]+)/i,
            /\b(line)\/([\w\.]+)\/iab/i,
            /(chromium|instagram)[\/ ]([-\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            /\bgsa\/([\w\.]+) .*safari\//i
          ],
          [VERSION, [NAME, "GSA"]],
          [
            /headlesschrome(?:\/([\w\.]+)| )/i
          ],
          [VERSION, [NAME, CHROME + " Headless"]],
          [
            / wv\).+(chrome)\/([\w\.]+)/i
          ],
          [[NAME, CHROME + " WebView"], VERSION],
          [
            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
          ],
          [VERSION, [NAME, "Android " + BROWSER]],
          [
            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            /version\/([\w\.]+) .*mobile\/\w+ (safari)/i
          ],
          [VERSION, [NAME, "Mobile Safari"]],
          [
            /version\/([\w\.]+) .*(mobile ?safari|safari)/i
          ],
          [VERSION, NAME],
          [
            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
          ],
          [NAME, [VERSION, strMapper, oldSafariMap]],
          [
            /(webkit|khtml)\/([\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            /(navigator|netscape\d?)\/([-\w\.]+)/i
          ],
          [[NAME, "Netscape"], VERSION],
          [
            /mobile vr; rv:([\w\.]+)\).+firefox/i
          ],
          [VERSION, [NAME, FIREFOX + " Reality"]],
          [
            /ekiohf.+(flow)\/([\w\.]+)/i,
            /(swiftfox)/i,
            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
            /(firefox)\/([\w\.]+)/i,
            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
            /(links) \(([\w\.]+)/i
          ],
          [NAME, VERSION]
        ],
        cpu: [
          [
            /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i
          ],
          [[ARCHITECTURE, "amd64"]],
          [
            /(ia32(?=;))/i
          ],
          [[ARCHITECTURE, lowerize]],
          [
            /((?:i[346]|x)86)[;\)]/i
          ],
          [[ARCHITECTURE, "ia32"]],
          [
            /\b(aarch64|arm(v?8e?l?|_?64))\b/i
          ],
          [[ARCHITECTURE, "arm64"]],
          [
            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
          ],
          [[ARCHITECTURE, "armhf"]],
          [
            /windows (ce|mobile); ppc;/i
          ],
          [[ARCHITECTURE, "arm"]],
          [
            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
          ],
          [[ARCHITECTURE, /ower/, EMPTY, lowerize]],
          [
            /(sun4\w)[;\)]/i
          ],
          [[ARCHITECTURE, "sparc"]],
          [
            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
          ],
          [[ARCHITECTURE, lowerize]]
        ],
        device: [
          [
            /\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
          ],
          [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]],
          [
            /\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i,
            /samsung[- ]([-\w]+)/i,
            /sec-(sgh\w+)/i
          ],
          [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]],
          [
            /\((ip(?:hone|od)[\w ]*);/i
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]],
          [
            /\((ipad);[-\w\),; ]+apple/i,
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, TABLET]],
          [
            /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
          ],
          [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]],
          [
            /(?:huawei|honor)([-\w ]+)[;\)]/i,
            /\b(nexus 6p|\w{2,4}-[atu]?[ln][01259x][012359][an]?)\b(?!.+d\/s)/i
          ],
          [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]],
          [
            /\b(poco[\w ]+)(?: bui|\))/i,
            /\b; (\w+) build\/hm\1/i,
            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i
          ],
          [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, MOBILE]],
          [
            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
          ],
          [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, TABLET]],
          [
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
          ],
          [MODEL, [VENDOR, "OPPO"], [TYPE, MOBILE]],
          [
            /vivo (\w+)(?: bui|\))/i,
            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
          ],
          [MODEL, [VENDOR, "Vivo"], [TYPE, MOBILE]],
          [
            /\b(rmx[12]\d{3})(?: bui|;|\))/i
          ],
          [MODEL, [VENDOR, "Realme"], [TYPE, MOBILE]],
          [
            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
            /\bmot(?:orola)?[- ](\w*)/i,
            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
          ],
          [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]],
          [
            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
          ],
          [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]],
          [
            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
          ],
          [MODEL, [VENDOR, LG], [TYPE, TABLET]],
          [
            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
            /\blg-?([\d\w]+) bui/i
          ],
          [MODEL, [VENDOR, LG], [TYPE, MOBILE]],
          [
            /(ideatab[-\w ]+)/i,
            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
          ],
          [MODEL, [VENDOR, "Lenovo"], [TYPE, TABLET]],
          [
            /(?:maemo|nokia).*(n900|lumia \d+)/i,
            /nokia[-_ ]?([-\w\.]*)/i
          ],
          [[MODEL, /_/g, " "], [VENDOR, "Nokia"], [TYPE, MOBILE]],
          [
            /(pixel c)\b/i
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]],
          [
            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]],
          [
            /droid.+ ([c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
          ],
          [MODEL, [VENDOR, SONY], [TYPE, MOBILE]],
          [
            /sony tablet [ps]/i,
            /\b(?:sony)?sgp\w+(?: bui|\))/i
          ],
          [[MODEL, "Xperia Tablet"], [VENDOR, SONY], [TYPE, TABLET]],
          [
            / (kb2005|in20[12]5|be20[12][59])\b/i,
            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
          ],
          [MODEL, [VENDOR, "OnePlus"], [TYPE, MOBILE]],
          [
            /(alexa)webm/i,
            /(kf[a-z]{2}wi)( bui|\))/i,
            /(kf[a-z]+)( bui|\)).+silk\//i
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]],
          [
            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
          ],
          [[MODEL, /(.+)/g, "Fire Phone $1"], [VENDOR, AMAZON], [TYPE, MOBILE]],
          [
            /(playbook);[-\w\),; ]+(rim)/i
          ],
          [MODEL, VENDOR, [TYPE, TABLET]],
          [
            /\b((?:bb[a-f]|st[hv])100-\d)/i,
            /\(bb10; (\w+)/i
          ],
          [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]],
          [
            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
          ],
          [MODEL, [VENDOR, ASUS], [TYPE, TABLET]],
          [
            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
          ],
          [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]],
          [
            /(nexus 9)/i
          ],
          [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]],
          [
            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
            /(alcatel|geeksphone|nexian|panasonic|sony)[-_ ]?([-\w]*)/i
          ],
          [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]],
          [
            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
          ],
          [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]],
          [
            /droid.+; (m[1-5] note) bui/i,
            /\bmz-([-\w]{2,})/i
          ],
          [MODEL, [VENDOR, "Meizu"], [TYPE, MOBILE]],
          [
            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
          ],
          [MODEL, [VENDOR, "Sharp"], [TYPE, MOBILE]],
          [
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
            /(hp) ([\w ]+\w)/i,
            /(asus)-?(\w+)/i,
            /(microsoft); (lumia[\w ]+)/i,
            /(lenovo)[-_ ]?([-\w]+)/i,
            /(jolla)/i,
            /(oppo) ?([\w ]+) bui/i
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /(archos) (gamepad2?)/i,
            /(hp).+(touchpad(?!.+tablet)|tablet)/i,
            /(kindle)\/([\w\.]+)/i,
            /(nook)[\w ]+build\/(\w+)/i,
            /(dell) (strea[kpr\d ]*[\dko])/i,
            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
            /(trinity)[- ]*(t\d{3}) bui/i,
            /(gigaset)[- ]+(q\w{1,9}) bui/i,
            /(vodafone) ([\w ]+)(?:\)| bui)/i
          ],
          [VENDOR, MODEL, [TYPE, TABLET]],
          [
            /(surface duo)/i
          ],
          [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]],
          [
            /droid [\d\.]+; (fp\du?)(?: b|\))/i
          ],
          [MODEL, [VENDOR, "Fairphone"], [TYPE, MOBILE]],
          [
            /(u304aa)/i
          ],
          [MODEL, [VENDOR, "AT&T"], [TYPE, MOBILE]],
          [
            /\bsie-(\w*)/i
          ],
          [MODEL, [VENDOR, "Siemens"], [TYPE, MOBILE]],
          [
            /\b(rct\w+) b/i
          ],
          [MODEL, [VENDOR, "RCA"], [TYPE, TABLET]],
          [
            /\b(venue[\d ]{2,7}) b/i
          ],
          [MODEL, [VENDOR, "Dell"], [TYPE, TABLET]],
          [
            /\b(q(?:mv|ta)\w+) b/i
          ],
          [MODEL, [VENDOR, "Verizon"], [TYPE, TABLET]],
          [
            /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
          ],
          [MODEL, [VENDOR, "Barnes & Noble"], [TYPE, TABLET]],
          [
            /\b(tm\d{3}\w+) b/i
          ],
          [MODEL, [VENDOR, "NuVision"], [TYPE, TABLET]],
          [
            /\b(k88) b/i
          ],
          [MODEL, [VENDOR, "ZTE"], [TYPE, TABLET]],
          [
            /\b(nx\d{3}j) b/i
          ],
          [MODEL, [VENDOR, "ZTE"], [TYPE, MOBILE]],
          [
            /\b(gen\d{3}) b.+49h/i
          ],
          [MODEL, [VENDOR, "Swiss"], [TYPE, MOBILE]],
          [
            /\b(zur\d{3}) b/i
          ],
          [MODEL, [VENDOR, "Swiss"], [TYPE, TABLET]],
          [
            /\b((zeki)?tb.*\b) b/i
          ],
          [MODEL, [VENDOR, "Zeki"], [TYPE, TABLET]],
          [
            /\b([yr]\d{2}) b/i,
            /\b(dragon[- ]+touch |dt)(\w{5}) b/i
          ],
          [[VENDOR, "Dragon Touch"], MODEL, [TYPE, TABLET]],
          [
            /\b(ns-?\w{0,9}) b/i
          ],
          [MODEL, [VENDOR, "Insignia"], [TYPE, TABLET]],
          [
            /\b((nxa|next)-?\w{0,9}) b/i
          ],
          [MODEL, [VENDOR, "NextBook"], [TYPE, TABLET]],
          [
            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
          ],
          [[VENDOR, "Voice"], MODEL, [TYPE, MOBILE]],
          [
            /\b(lvtel\-)?(v1[12]) b/i
          ],
          [[VENDOR, "LvTel"], MODEL, [TYPE, MOBILE]],
          [
            /\b(ph-1) /i
          ],
          [MODEL, [VENDOR, "Essential"], [TYPE, MOBILE]],
          [
            /\b(v(100md|700na|7011|917g).*\b) b/i
          ],
          [MODEL, [VENDOR, "Envizen"], [TYPE, TABLET]],
          [
            /\b(trio[-\w\. ]+) b/i
          ],
          [MODEL, [VENDOR, "MachSpeed"], [TYPE, TABLET]],
          [
            /\btu_(1491) b/i
          ],
          [MODEL, [VENDOR, "Rotor"], [TYPE, TABLET]],
          [
            /(shield[\w ]+) b/i
          ],
          [MODEL, [VENDOR, "Nvidia"], [TYPE, TABLET]],
          [
            /(sprint) (\w+)/i
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /(kin\.[onetw]{3})/i
          ],
          [[MODEL, /\./g, " "], [VENDOR, MICROSOFT], [TYPE, MOBILE]],
          [
            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]],
          [
            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]],
          [
            /(ouya)/i,
            /(nintendo) ([wids3utch]+)/i
          ],
          [VENDOR, MODEL, [TYPE, CONSOLE]],
          [
            /droid.+; (shield) bui/i
          ],
          [MODEL, [VENDOR, "Nvidia"], [TYPE, CONSOLE]],
          [
            /(playstation [345portablevi]+)/i
          ],
          [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]],
          [
            /\b(xbox(?: one)?(?!; xbox))[\); ]/i
          ],
          [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]],
          [
            /smart-tv.+(samsung)/i
          ],
          [VENDOR, [TYPE, SMARTTV]],
          [
            /hbbtv.+maple;(\d+)/i
          ],
          [[MODEL, /^/, "SmartTV"], [VENDOR, SAMSUNG], [TYPE, SMARTTV]],
          [
            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
          ],
          [[VENDOR, LG], [TYPE, SMARTTV]],
          [
            /(apple) ?tv/i
          ],
          [VENDOR, [MODEL, APPLE + " TV"], [TYPE, SMARTTV]],
          [
            /crkey/i
          ],
          [[MODEL, CHROME + "cast"], [VENDOR, GOOGLE], [TYPE, SMARTTV]],
          [
            /droid.+aft(\w)( bui|\))/i
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]],
          [
            /\(dtv[\);].+(aquos)/i
          ],
          [MODEL, [VENDOR, "Sharp"], [TYPE, SMARTTV]],
          [
            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
            /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i
          ],
          [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]],
          [
            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
          ],
          [[TYPE, SMARTTV]],
          [
            /((pebble))app/i
          ],
          [VENDOR, MODEL, [TYPE, WEARABLE]],
          [
            /droid.+; (glass) \d/i
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]],
          [
            /droid.+; (wt63?0{2,3})\)/i
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]],
          [
            /(quest( 2)?)/i
          ],
          [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]],
          [
            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
          ],
          [VENDOR, [TYPE, EMBEDDED]],
          [
            /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i
          ],
          [MODEL, [TYPE, MOBILE]],
          [
            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
          ],
          [MODEL, [TYPE, TABLET]],
          [
            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
          ],
          [[TYPE, TABLET]],
          [
            /(phone|mobile(?:[;\/]| safari)|pda(?=.+windows ce))/i
          ],
          [[TYPE, MOBILE]],
          [
            /(android[-\w\. ]{0,9});.+buil/i
          ],
          [MODEL, [VENDOR, "Generic"]]
        ],
        engine: [
          [
            /windows.+ edge\/([\w\.]+)/i
          ],
          [VERSION, [NAME, EDGE + "HTML"]],
          [
            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
          ],
          [VERSION, [NAME, "Blink"]],
          [
            /(presto)\/([\w\.]+)/i,
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
            /ekioh(flow)\/([\w\.]+)/i,
            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
            /(icab)[\/ ]([23]\.[\d\.]+)/i
          ],
          [NAME, VERSION],
          [
            /rv\:([\w\.]{1,9})\b.+(gecko)/i
          ],
          [VERSION, NAME]
        ],
        os: [
          [
            /microsoft (windows) (vista|xp)/i
          ],
          [NAME, VERSION],
          [
            /(windows) nt 6\.2; (arm)/i,
            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
            /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i
          ],
          [NAME, [VERSION, strMapper, windowsVersionMap]],
          [
            /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i
          ],
          [[NAME, "Windows"], [VERSION, strMapper, windowsVersionMap]],
          [
            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
            /cfnetwork\/.+darwin/i
          ],
          [[VERSION, /_/g, "."], [NAME, "iOS"]],
          [
            /(mac os x) ?([\w\. ]*)/i,
            /(macintosh|mac_powerpc\b)(?!.+haiku)/i
          ],
          [[NAME, "Mac OS"], [VERSION, /_/g, "."]],
          [
            /droid ([\w\.]+)\b.+(android[- ]x86)/i
          ],
          [VERSION, NAME],
          [
            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
            /(blackberry)\w*\/([\w\.]*)/i,
            /(tizen|kaios)[\/ ]([\w\.]+)/i,
            /\((series40);/i
          ],
          [NAME, VERSION],
          [
            /\(bb(10);/i
          ],
          [VERSION, [NAME, BLACKBERRY]],
          [
            /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
          ],
          [VERSION, [NAME, "Symbian"]],
          [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
          ],
          [VERSION, [NAME, FIREFOX + " OS"]],
          [
            /web0s;.+rt(tv)/i,
            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
          ],
          [VERSION, [NAME, "webOS"]],
          [
            /crkey\/([\d\.]+)/i
          ],
          [VERSION, [NAME, CHROME + "cast"]],
          [
            /(cros) [\w]+ ([\w\.]+\w)/i
          ],
          [[NAME, "Chromium OS"], VERSION],
          [
            /(nintendo|playstation) ([wids345portablevuch]+)/i,
            /(xbox); +xbox ([^\);]+)/i,
            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
            /(mint)[\/\(\) ]?(\w*)/i,
            /(mageia|vectorlinux)[; ]/i,
            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
            /(hurd|linux) ?([\w\.]*)/i,
            /(gnu) ?([\w\.]*)/i,
            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
            /(haiku) (\w+)/i
          ],
          [NAME, VERSION],
          [
            /(sunos) ?([\w\.\d]*)/i
          ],
          [[NAME, "Solaris"], VERSION],
          [
            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i,
            /(unix) ?([\w\.]*)/i
          ],
          [NAME, VERSION]
        ]
      };
      var UAParser2 = function(ua, extensions) {
        if (typeof ua === OBJ_TYPE) {
          extensions = ua;
          ua = undefined2;
        }
        if (!(this instanceof UAParser2)) {
          return new UAParser2(ua, extensions).getResult();
        }
        var _ua = ua || (typeof window2 !== UNDEF_TYPE && window2.navigator && window2.navigator.userAgent ? window2.navigator.userAgent : EMPTY);
        var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
        this.getBrowser = function() {
          var _browser = {};
          _browser[NAME] = undefined2;
          _browser[VERSION] = undefined2;
          rgxMapper.call(_browser, _ua, _rgxmap.browser);
          _browser.major = majorize(_browser.version);
          return _browser;
        };
        this.getCPU = function() {
          var _cpu = {};
          _cpu[ARCHITECTURE] = undefined2;
          rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
          return _cpu;
        };
        this.getDevice = function() {
          var _device = {};
          _device[VENDOR] = undefined2;
          _device[MODEL] = undefined2;
          _device[TYPE] = undefined2;
          rgxMapper.call(_device, _ua, _rgxmap.device);
          return _device;
        };
        this.getEngine = function() {
          var _engine = {};
          _engine[NAME] = undefined2;
          _engine[VERSION] = undefined2;
          rgxMapper.call(_engine, _ua, _rgxmap.engine);
          return _engine;
        };
        this.getOS = function() {
          var _os = {};
          _os[NAME] = undefined2;
          _os[VERSION] = undefined2;
          rgxMapper.call(_os, _ua, _rgxmap.os);
          return _os;
        };
        this.getResult = function() {
          return {
            ua: this.getUA(),
            browser: this.getBrowser(),
            engine: this.getEngine(),
            os: this.getOS(),
            device: this.getDevice(),
            cpu: this.getCPU()
          };
        };
        this.getUA = function() {
          return _ua;
        };
        this.setUA = function(ua2) {
          _ua = typeof ua2 === STR_TYPE && ua2.length > UA_MAX_LENGTH ? trim(ua2, UA_MAX_LENGTH) : ua2;
          return this;
        };
        this.setUA(_ua);
        return this;
      };
      UAParser2.VERSION = LIBVERSION;
      UAParser2.BROWSER = enumerize([NAME, VERSION, MAJOR]);
      UAParser2.CPU = enumerize([ARCHITECTURE]);
      UAParser2.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
      UAParser2.ENGINE = UAParser2.OS = enumerize([NAME, VERSION]);
      if (typeof exports2 !== UNDEF_TYPE) {
        if (typeof module2 !== UNDEF_TYPE && module2.exports) {
          exports2 = module2.exports = UAParser2;
        }
        exports2.UAParser = UAParser2;
      } else {
        if (typeof define === FUNC_TYPE && define.amd) {
          define(function() {
            return UAParser2;
          });
        } else if (typeof window2 !== UNDEF_TYPE) {
          window2.UAParser = UAParser2;
        }
      }
      var $ = typeof window2 !== UNDEF_TYPE && (window2.jQuery || window2.Zepto);
      if ($ && !$.ua) {
        var parser = new UAParser2();
        $.ua = parser.getResult();
        $.ua.get = function() {
          return parser.getUA();
        };
        $.ua.set = function(ua) {
          parser.setUA(ua);
          var result = parser.getResult();
          for (var prop in result) {
            $.ua[prop] = result[prop];
          }
        };
      }
    })(typeof window === "object" ? window : exports2);
  }
});

// src/err.js
var badPlatform = new Error("Unsupported platform");
var invalidArg = new Error("Invalid argument");
var unexpected = new Error("Unexpected error");
var invalidKey = new Error("Invalid key");
var invalidSignature = new Error("Invalid signature");
var operationBlocked = new Error("Operation blocked");

// src/idb.js
var idb_transaction = {
  readonly: "readonly",
  readwrite: "readwrite"
};
function idb_open_db(name, version, runMigrations2) {
  if (!window.indexedDB)
    Promise.reject(badPlatform);
  return new Promise((resolve, reject) => {
    try {
      let rejected = false;
      let reject_once2 = (err) => {
        if (!rejected) {
          rejected = true;
          reject(err);
        }
      };
      let rq = window.indexedDB.open(name, version);
      rq.onupgradeneeded = (e) => {
        try {
          runMigrations2(e.target.result, e.target.transaction, e.newVersion, e.oldVersion);
        } catch (err) {
          reject_once2(err);
        }
      };
      rq.onblocked = (e) => {
        reject_once2(operationBlocked);
      };
      rq.onerror = (e) => {
        reject_once2(e.target.error);
      };
      rq.onsuccess = (e) => {
        if (!rejected) {
          let db = e.target.result;
          db.onversionchange = (e2) => {
            db.close();
          };
          resolve(db);
        }
      };
    } catch (err) {
      reject_once(err);
    }
  });
}
function idb_close_db(db) {
  db.close();
}
function idb_delete_db(name) {
  return new Promise((resolve, reject) => {
    let rq = window.indexedDB.deleteDatabase(name);
    rq.onerror = (e) => {
      reject(unexpected);
    };
    rq.onsuccess = (e) => {
      resolve();
    };
    rq.onblocked = (e) => {
      reject(operationBlocked);
    };
  });
}
function idb_begin_transaction(db, scope, mode) {
  let tx = db.transaction(scope, mode);
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
function idb_finish_transaction(tx) {
  if (tx.error) {
    return Promise.reject(tx.error);
  }
  return tx.promise;
}
function idb_get(tx, store, key2) {
  try {
    let os = tx.objectStore(store);
    let rq = os.get(key2);
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
function idb_get_now(tx, store, key2) {
  return new Promise((resolve, reject) => {
    try {
      let os = tx.objectStore(store);
      let rq = os.get(key2);
      rq.onsuccess = (e) => {
        resolve(rq.result);
      };
      rq.onerror = (e) => {
        tx.result = e.target.error;
        reject(e.error);
      };
    } catch (err) {
      tx.result = err;
      reject(err);
    }
  });
}
function idb_getall(tx, store) {
  try {
    let os = tx.objectStore(store);
    let rq = os.getAll();
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
function idb_getall_now(tx, store) {
  return new Promise((resolve, reject) => {
    try {
      let os = tx.objectStore(store);
      let rq = os.getAll();
      rq.onsuccess = (e) => {
        resolve(rq.result);
      };
      rq.onerror = (e) => {
        tx.result = e.target.error;
        reject(e.error);
      };
    } catch (err) {
      tx.result = err;
      reject(err);
    }
  });
}
function idb_put(tx, store, value, key2) {
  try {
    let os = tx.objectStore(store);
    let rq = os.put(value, key2);
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
function idb_delete(tx, store, key2) {
  try {
    let os = tx.objectStore(store);
    let rq = os.delete(key2);
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
function idb_clear(tx, store) {
  try {
    let os = tx.objectStore(store);
    let rq = os.clear();
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

// src/kmc-db.js
var kmcDbName = "keymaker";
var kmcDbVersions = [v1, v2, v3, v4, v5, v6];
var kmcCertStore = "certificates";
var kmcKeyStore = "keys";
var kmcProfileStore = "credentials";
var kmcProfileIndex = "id";
var kmcAppSettings = "appSettings";
function kmc_open_db(version) {
  return new Promise(async (resolve, reject) => {
    if (version === void 0)
      version = kmcDbVersions.length;
    try {
      let db = await idb_open_db(kmcDbName, version, runMigrations);
      resolve(db);
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_close_db(db) {
  idb_close_db(db);
  db = null;
}
function kmc_reset_db() {
  return new Promise(async (resolve, reject) => {
    try {
      await idb_delete_db(kmcDbName);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
function runMigrations(db, tx, version, oldVersion) {
  if (!db || !version)
    throw invalidArg;
  if (version > kmcDbVersions.length) {
    throw invalidArg;
  }
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
function randomBytes(len) {
  let buf = new Uint8Array(len);
  window.crypto.getRandomValues(buf);
  return buf;
}
function generateHandle(len, prefix) {
  return (prefix ?? "") + [...randomBytes(len / 2)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// src/kmc-certstore.js
function kmc_get_cert(db, handle) {
  return new Promise(async (resolve, reject) => {
    try {
      let tx = idb_begin_transaction(db, kmcCertStore, idb_transaction.readonly);
      idb_get(tx, kmcCertStore, handle);
      let data2 = await idb_finish_transaction(tx);
      resolve(new Uint8Array(data2));
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_put_cert(db, handle, bytes) {
  return new Promise(async (resolve, reject) => {
    try {
      let tx = idb_begin_transaction(db, kmcCertStore, idb_transaction.readwrite);
      idb_put(tx, kmcCertStore, bytes, handle);
      await idb_finish_transaction(tx);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_delete_cert(db, handle) {
  return new Promise(async (resolve, reject) => {
    try {
      let tx = idb_begin_transaction(db, kmcCertStore, idb_transaction.readwrite);
      idb_delete(tx, kmcCertStore, handle);
      await idb_finish_transaction(tx);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

// src/kmc-keystore.js
function kmc_save_key(db, handle, key2) {
  return new Promise(async (resolve, reject) => {
    try {
      let tx = idb_begin_transaction(db, kmcKeyStore, idb_transaction.readwrite);
      idb_put(tx, kmcKeyStore, key2, handle);
      await idb_finish_transaction(tx);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_get_key(db, handle) {
  return new Promise(async (resolve, reject) => {
    try {
      let tx = idb_begin_transaction(db, kmcKeyStore, idb_transaction.readonly);
      idb_get(tx, kmcKeyStore, handle);
      let key2 = await idb_finish_transaction(tx);
      if (key2)
        resolve(key2);
      else
        reject(invalidKey);
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_delete_key(db, handle) {
  return new Promise(async (resolve, reject) => {
    try {
      let tx = idb_begin_transaction(db, kmcKeyStore, idb_transaction.readwrite);
      idb_delete(tx, kmcKeyStore, handle);
      await idb_finish_transaction(tx);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

// src/subtle.js
function random_bytes(buffer) {
  window.crypto.getRandomValues(buffer);
}
function key_export(key2, format) {
  return new Promise((resolve, reject) => {
    window.crypto.subtle.exportKey(format, key2).then((data2) => {
      resolve(new Uint8Array(data2));
    }, (err) => {
      reject(err);
    });
  });
}
function ecdsa_generate_key_pair(curve) {
  return new Promise((resolve, reject) => {
    let params = {
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
function ecdsa_import_key(format, curve, bits, use) {
  return new Promise((resolve, reject) => {
    let params = {
      name: "ECDSA",
      namedCurve: curve
    };
    window.crypto.subtle.importKey(format, bits, params, true, [use]).then((keyPair) => {
      resolve(keyPair);
    }, (err) => {
      reject(err);
    });
  });
}
function ecdsa_sign(key2, hash, data2) {
  return new Promise((resolve, reject) => {
    let params = {
      name: "ECDSA",
      hash
    };
    window.crypto.subtle.sign(params, key2, data2).then((signature) => {
      signature = new Uint8Array(signature);
      resolve(signature);
    }, (err) => {
      reject(err);
    });
  });
}
function ecdsa_verify(key2, hash, signature, message) {
  return new Promise((resolve, reject) => {
    let params = {
      name: "ECDSA",
      hash
    };
    window.crypto.subtle.verify(params, key2, signature, message).then((ok) => {
      resolve(ok);
    }, (err) => {
      reject(err);
    });
  });
}
function aesgcm_generate_key() {
  return new Promise((resolve, reject) => {
    let params = {
      name: "AES-GCM",
      length: 256
    };
    window.crypto.subtle.generateKey(params, false, ["encrypt", "decrypt"]).then((key2) => {
      resolve(key2);
    }, (err) => {
      reject(err);
    });
  });
}
function aesgcm_encrypt(key2, iv, data2) {
  return new Promise((resolve, reject) => {
    let params = {
      name: "AES-GCM",
      iv
    };
    window.crypto.subtle.encrypt(params, key2, data2).then((signature) => {
      resolve(new Uint8Array(signature));
    }, (err) => {
      reject(err);
    });
  });
}
function aesgcm_decrypt(key2, iv, data2) {
  return new Promise((resolve, reject) => {
    let params = {
      name: "AES-GCM",
      iv
    };
    window.crypto.subtle.decrypt(params, key2, data2).then((signature) => {
      resolve(new Uint8Array(signature));
    }, (err) => {
      reject(err);
    });
  });
}

// src/kmc-crypto.js
var subtleProvider = "subtle";
function kmc_generate_key(db, handle) {
  return new Promise(async (resolve, reject) => {
    try {
      let api = await queryCryptoCapabilities();
      let key2 = await api.generateKey(handle);
      await kmc_save_key(db, handle, key2);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_is_key_webauthn_backed(db, handle) {
  return new Promise(async (resolve, reject) => {
    try {
      let key2 = await kmc_get_key(db, handle);
      let provider = keyProvider(key2);
      resolve(provider === webauthn);
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_sign(db, handle, data2) {
  return new Promise(async (resolve, reject) => {
    try {
      let key2 = await kmc_get_key(db, handle);
      let provider = keyProvider(key2);
      let signature = await provider.sign(key2, data2);
      resolve(signature);
    } catch (err) {
      reject(err);
    }
  });
}
function decode_signature(signature) {
  if (signature.subtle !== void 0) {
    signature = signature.subtle.signature;
    if (signature.length == 64)
      return signature;
    if (signature.length < 64)
      throw invalidSignature;
    if (signature[0] != 48)
      throw invalidSignature;
    let rawSignature = new Uint8Array(64);
    let pos = 2;
    if (signature[pos++] != 2)
      throw invalidSignature;
    let len = signature[pos++];
    if (len == 33)
      pos++;
    else if (len != 32)
      throw invalidSignature;
    rawSignature.set(signature.slice(pos, pos + 32), 0);
    pos += 32;
    if (signature[pos++] != 2)
      throw invalidSignature;
    len = signature[pos++];
    if (len == 33)
      pos++;
    else if (len != 32)
      throw invalidSignature;
    rawSignature.set(signature.slice(pos, pos + 32), 32);
    return rawSignature;
  } else if (signature.webauthn !== void 0) {
    throw new Error("Not implemented");
  } else {
    throw invalidSignature;
  }
}
function kmc_verify(db, handle, signature, data2) {
  return new Promise(async (resolve, reject) => {
    try {
      let bits = await kmc_public_key(db, handle);
      let key2 = await ecdsa_import_key("raw", "P-256", bits, "verify");
      signature = decode_signature(signature);
      let ok = await ecdsa_verify(key2, "SHA-256", signature, data2);
      resolve(ok);
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_public_key(db, handle) {
  return new Promise(async (resolve, reject) => {
    try {
      let key2 = await kmc_get_key(db, handle);
      let provider = keyProvider(key2);
      let pubkey = await provider.publicKey(key2);
      resolve(new Uint8Array(pubkey));
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_encrypt(db, handle, plaintext) {
  return new Promise(async (resolve, reject) => {
    try {
      let key2 = await kmc_get_key(db, handle);
      let provider = keyProvider(key2);
      let ciphertext = await provider.encrypt(key2, plaintext);
      resolve(ciphertext);
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_decrypt(db, handle, ciphertext) {
  return new Promise(async (resolve, reject) => {
    try {
      let key2 = await kmc_get_key(db, handle);
      let provider = keyProvider(key2);
      let plaintext = await provider.decrypt(key2, data);
      resolve(plaintext);
    } catch (err) {
      reject(err);
    }
  });
}
function hasSubtleCrypto() {
  return !!window.crypto.subtle;
}
async function queryCryptoCapabilities(provider) {
  if (window.localStorage.getItem("webAuthnConfig") && window.PublicKeyCredential) {
    if (await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()) {
      return webauthn;
    }
  }
  if (hasSubtleCrypto())
    return subtle;
  throw badPlatform;
}
function keySanityCheck(key2, provider) {
  return provider in key2;
}
function keyProvider(key2) {
  if ("subtle" in key2)
    return subtle;
  else if ("webauthn" in key2)
    return webauthn;
  else
    throw invalidArg;
}
var subtle = new class Subtle {
  extractKeys(key2) {
    if (keySanityCheck(key2, subtleProvider))
      return key2.subtle;
    throw invalidKey;
  }
  async generateKey(handle) {
    let signingKey = await ecdsa_generate_key_pair("P-256");
    let encryptionKey = await aesgcm_generate_key();
    return {
      subtle: {
        signingKey,
        encryptionKey
      }
    };
  }
  async publicKey(key2) {
    let keys = this.extractKeys(key2);
    return await key_export(keys.signingKey.publicKey, "raw");
  }
  async sign(key2, data2) {
    let keys = this.extractKeys(key2);
    let signature = await ecdsa_sign(keys.signingKey.privateKey, "SHA-256", data2);
    return {
      subtle: {
        signature
      }
    };
  }
  async encrypt(key2, plaintext) {
    let keys = this.extractKeys(key2);
    let iv = new Uint8Array(12);
    random_bytes(iv);
    let ciphertext = await aesgcm_encrypt(keys.encryptionKey, iv, plaintext);
    let result = new Uint8Array(iv.length + ciphertext.length);
    result.set(iv);
    result.set(ciphertext, iv.length);
    return result;
  }
  async decrypt(key2, ciphertext) {
    let keys = this.extractKeys(key2);
    let iv = ciphertext.slice(0, 12);
    ciphertext = ciphertext.slice(12);
    return await aesgcm_decrypt(keys.encryptionKey, iv, ciphertext);
  }
}();
var webauthn = new class WebAuthn {
  extractKeys(key2) {
    if (keySanityCheck(key2, webAuthnProvider))
      return key2.webauthn;
    throw invalidKey;
  }
  async generateKey(handle) {
    throw badPlatform;
  }
  async publicKey(key2) {
    let keys = this.extractKeys(key2);
    return await key_export(keys.signingKey.publicKey, "raw");
  }
  async sign(key2, data2) {
    let keys = this.extractKeys(key2);
    const publicKeyOptions = {
      challenge: data2,
      allowCredentials: [
        {
          id: keys.signingKey.rawId,
          type: "public-key",
          transports: keys.signingKey.transports
        }
      ],
      userVerification: "required",
      timeout: 6e4
    };
    let cred = await navigator.credentials.get({ publicKey: publicKeyOptions });
    if (!cred)
      return Promise.reject(invalidArg);
    let response = cred.response;
    return {
      webauthn: {
        authenticatorData: response.authenticatorData,
        clientDataJSON: response.clientDataJSON,
        signature: response.signature
      }
    };
  }
  async encrypt(key2, plaintext) {
    let keys = this.extractKeys(key2);
    let iv = new Uint8Array(12);
    random_bytes(iv);
    let ciphertext = await aesgcm_encrypt(keys.encryptionKey, iv, plaintext);
    let result = new Uint8Array(iv.length + ciphertext.length);
    result.set(iv);
    result.set(ciphertext, iv.length);
    return result;
  }
  async decrypt(key2, ciphertext) {
    let keys = this.extractKeys(key2);
    let iv = ciphertext.slice(0, 12);
    ciphertext = ciphertext.slice(12);
    return await aesgcm_decrypt(keys.encryptionKey, iv, ciphertext);
  }
}();

// node_modules/uuid/dist/esm-browser/rng.js
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}

// node_modules/uuid/dist/esm-browser/regex.js
var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

// node_modules/uuid/dist/esm-browser/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default = validate;

// node_modules/uuid/dist/esm-browser/stringify.js
var byteToHex = [];
for (i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
var i;
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate_default(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var stringify_default = stringify;

// node_modules/uuid/dist/esm-browser/v4.js
function v42(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return stringify_default(rnds);
}
var v4_default = v42;

// src/kmc-storage.js
function kmc_write_profile(db, profile) {
  return new Promise(async (resolve, reject) => {
    try {
      let tx = idb_begin_transaction(db, kmcProfileStore, idb_transaction.readwrite);
      idb_put(tx, kmcProfileStore, profile);
      await idb_finish_transaction(tx);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_write_profile_id(db, profile) {
  return new Promise(async (resolve, reject) => {
    try {
      let tx = idb_begin_transaction(db, kmcProfileStore, idb_transaction.readwrite);
      let store = tx.objectStore(kmcProfileStore);
      let index = store.index(kmcProfileIndex);
      let updated = false;
      let cursor = index.openCursor().on_success = (ev) => {
        if (cursor) {
          if (!update && cursor.value.id == profile.id) {
            cursor.update(profile);
            updated = true;
          }
          cursor.continue();
        }
      };
      if (!updated) {
        store.put(profile);
      }
      await idb_finish_transaction(tx);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_update_profile_metadata(db, handle, metadata) {
  return new Promise(async (resolve, reject) => {
    try {
      let tx = idb_begin_transaction(db, kmcProfileStore, idb_transaction.readwrite);
      let profile = await idb_get_now(tx, kmcProfileStore, handle);
      profile.name = metadata.name;
      profile.image_url = metadata.image_url;
      profile.enroll_uri = metadata.enroll_uri;
      profile.login_uri = metadata.login_uri;
      profile.desktop_login_url = metadata.desktop_login_url;
      profile.device_gateway_url = metadata.device_gateway_url;
      profile.migrate_addr = metadata.migrate_addr;
      idb_put(tx, kmcProfileStore, profile);
      await idb_finish_transaction(tx);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_has_profile(db, handle) {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(!!await kmc_get_profile(db, handle));
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_get_profile(db, handle) {
  return new Promise(async (resolve, reject) => {
    try {
      let tx = idb_begin_transaction(db, kmcProfileStore, idb_transaction.readonly);
      idb_get(tx, kmcProfileStore, handle);
      let profile = await idb_finish_transaction(tx);
      resolve(profile);
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_get_profile_by_id(db, profile_id) {
  return new Promise(async (resolve, reject) => {
    try {
      let all_profiles = await kmc_get_all_profiles(db);
      let profile = all_profiles.find((profile2) => profile2.id === profile_id);
      resolve(profile);
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_get_all_profiles(db) {
  return new Promise(async (resolve, reject) => {
    try {
      let tx = idb_begin_transaction(db, kmcProfileStore, idb_transaction.readonly);
      idb_getall(tx, kmcProfileStore);
      let profiles = await idb_finish_transaction(tx);
      resolve(profiles);
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_delete_profile(db, handle) {
  return new Promise(async (resolve, reject) => {
    try {
      let tx = idb_begin_transaction(db, kmcProfileStore, idb_transaction.readwrite);
      if (handle.startsWith("cr:"))
        idb_for_each(tx, kmcProfileStore, (cursor) => {
          if (cursor.value.id == handle) {
            cursor.delete();
          }
        });
      else {
        idb_delete(tx, kmcProfileStore, handle);
      }
      await idb_finish_transaction(tx);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_add_authenticator_client_id(db, handle, authenticator_client_id) {
  return new Promise(async (resolve, reject) => {
    try {
      let tx = idb_begin_transaction(db, kmcProfileStore, idb_transaction.readwrite);
      let profile = await idb_get_now(tx, kmcProfileStore, handle);
      profile.auth_client_ids.push(authenticator_client_id);
      idb_put(tx, kmcProfileStore, profile);
      await idb_finish_transaction(tx);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
function kmc_delete_all_authenticator_client_ids(db, handle) {
  return new Promise(async (resolve, reject) => {
    try {
      let tx = idb_begin_transaction(db, kmcProfileStore, idb_transaction.readwrite);
      let profile = await idb_get_now(tx, kmcProfileStore, handle);
      profile.auth_client_ids = [];
      idb_put(tx, kmcProfileStore, profile);
      await idb_finish_transaction(tx);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
async function kmc_get_app_settings(db) {
  return await get_update_app_settings(db, void 0);
}
async function kmc_put_app_settings(db, settings) {
  await get_update_app_settings(db, settings);
}
async function get_update_app_settings(db, appSettings) {
  let tx = idb_begin_transaction(db, kmcAppSettings, idb_transaction.readwrite);
  let settings = () => {
    if (appSettings === void 0) {
      appSettings = {
        instanceId: v4_default()
      };
    }
    return appSettings;
  };
  let allSettings = await idb_getall_now(tx, kmcAppSettings);
  if (allSettings.length === 0) {
    idb_put(tx, kmcAppSettings, settings());
  } else if (allSettings.length > 1) {
    idb_clear(tx, kmcAppSettings);
    idb_put(tx, kmcAppSettings, settings());
  } else {
    if (appSettings !== void 0) {
      if (appSettings.instanceId !== allSettings[0].instanceId) {
        idb_clear();
      }
      idb_put(tx, kmcAppSettings, settings());
    }
  }
  idb_getall(tx, kmcAppSettings);
  allSettings = await idb_finish_transaction(tx);
  if (allSettings.length !== 1) {
    throw new Error("Transaction failure");
  }
  return allSettings[0];
}

// node_modules/device/device.js
var $protobuf = __toModule(require_minimal2());
var $Reader = $protobuf.Reader;
var $Writer = $protobuf.Writer;
var $util = $protobuf.util;
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
var device = $root.device = (() => {
  const device2 = {};
  device2.Platform = function() {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNSPECIFIED"] = 0;
    values[valuesById[1] = "MACOS"] = 1;
    values[valuesById[2] = "IOS"] = 2;
    values[valuesById[3] = "ANDROID"] = 3;
    values[valuesById[4] = "WINDOWS"] = 4;
    values[valuesById[5] = "LINUX"] = 5;
    values[valuesById[6] = "WEB"] = 6;
    values[valuesById[7] = "CHROMEOS"] = 7;
    values[valuesById[8] = "CHROMEOSWEB"] = 8;
    return values;
  }();
  device2.Core = function() {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "GO"] = 0;
    values[valuesById[1] = "RUST"] = 1;
    return values;
  }();
  device2.AnswerType = function() {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNSUPPORTED"] = 0;
    values[valuesById[1] = "UNKNOWN"] = 1;
    values[valuesById[2] = "ERROR"] = 2;
    values[valuesById[3] = "VALUE"] = 3;
    return values;
  }();
  device2.Answer = function() {
    function Answer(properties) {
      if (properties) {
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null)
            this[keys[i]] = properties[keys[i]];
      }
    }
    Answer.prototype.type = 0;
    Answer.prototype.error = "";
    Answer.create = function create(properties) {
      return new Answer(properties);
    };
    Answer.encode = function encode(message, writer) {
      if (!writer)
        writer = $Writer.create();
      if (message.type != null && Object.hasOwnProperty.call(message, "type"))
        writer.uint32(8).int32(message.type);
      if (message.error != null && Object.hasOwnProperty.call(message, "error"))
        writer.uint32(18).string(message.error);
      return writer;
    };
    Answer.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };
    Answer.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader))
        reader = $Reader.create(reader);
      let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.Answer();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.type = reader.int32();
            break;
          case 2:
            message.error = reader.string();
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };
    Answer.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader))
        reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };
    Answer.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.type != null && message.hasOwnProperty("type"))
        switch (message.type) {
          default:
            return "type: enum value expected";
          case 0:
          case 1:
          case 2:
          case 3:
            break;
        }
      if (message.error != null && message.hasOwnProperty("error")) {
        if (!$util.isString(message.error))
          return "error: string expected";
      }
      return null;
    };
    Answer.fromObject = function fromObject(object) {
      if (object instanceof $root.device.Answer)
        return object;
      let message = new $root.device.Answer();
      switch (object.type) {
        case "UNSUPPORTED":
        case 0:
          message.type = 0;
          break;
        case "UNKNOWN":
        case 1:
          message.type = 1;
          break;
        case "ERROR":
        case 2:
          message.type = 2;
          break;
        case "VALUE":
        case 3:
          message.type = 3;
          break;
      }
      if (object.error != null)
        message.error = String(object.error);
      return message;
    };
    Answer.toObject = function toObject(message, options) {
      if (!options)
        options = {};
      let object = {};
      if (options.defaults) {
        object.type = options.enums === String ? "UNSUPPORTED" : 0;
        object.error = "";
      }
      if (message.type != null && message.hasOwnProperty("type"))
        object.type = options.enums === String ? $root.device.AnswerType[message.type] : message.type;
      if (message.error != null && message.hasOwnProperty("error"))
        object.error = message.error;
      return object;
    };
    Answer.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };
    return Answer;
  }();
  device2.StringMaybe = function() {
    function StringMaybe(properties) {
      if (properties) {
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null)
            this[keys[i]] = properties[keys[i]];
      }
    }
    StringMaybe.prototype.answer = null;
    StringMaybe.prototype.value = "";
    StringMaybe.create = function create(properties) {
      return new StringMaybe(properties);
    };
    StringMaybe.encode = function encode(message, writer) {
      if (!writer)
        writer = $Writer.create();
      if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
        $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
      if (message.value != null && Object.hasOwnProperty.call(message, "value"))
        writer.uint32(18).string(message.value);
      return writer;
    };
    StringMaybe.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };
    StringMaybe.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader))
        reader = $Reader.create(reader);
      let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.StringMaybe();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.answer = $root.device.Answer.decode(reader, reader.uint32());
            break;
          case 2:
            message.value = reader.string();
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };
    StringMaybe.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader))
        reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };
    StringMaybe.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.answer != null && message.hasOwnProperty("answer")) {
        let error = $root.device.Answer.verify(message.answer);
        if (error)
          return "answer." + error;
      }
      if (message.value != null && message.hasOwnProperty("value")) {
        if (!$util.isString(message.value))
          return "value: string expected";
      }
      return null;
    };
    StringMaybe.fromObject = function fromObject(object) {
      if (object instanceof $root.device.StringMaybe)
        return object;
      let message = new $root.device.StringMaybe();
      if (object.answer != null) {
        if (typeof object.answer !== "object")
          throw TypeError(".device.StringMaybe.answer: object expected");
        message.answer = $root.device.Answer.fromObject(object.answer);
      }
      if (object.value != null)
        message.value = String(object.value);
      return message;
    };
    StringMaybe.toObject = function toObject(message, options) {
      if (!options)
        options = {};
      let object = {};
      if (options.defaults) {
        object.answer = null;
        object.value = "";
      }
      if (message.answer != null && message.hasOwnProperty("answer"))
        object.answer = $root.device.Answer.toObject(message.answer, options);
      if (message.value != null && message.hasOwnProperty("value"))
        object.value = message.value;
      return object;
    };
    StringMaybe.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };
    return StringMaybe;
  }();
  device2.Int32Maybe = function() {
    function Int32Maybe(properties) {
      if (properties) {
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null)
            this[keys[i]] = properties[keys[i]];
      }
    }
    Int32Maybe.prototype.answer = null;
    Int32Maybe.prototype.value = 0;
    Int32Maybe.create = function create(properties) {
      return new Int32Maybe(properties);
    };
    Int32Maybe.encode = function encode(message, writer) {
      if (!writer)
        writer = $Writer.create();
      if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
        $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
      if (message.value != null && Object.hasOwnProperty.call(message, "value"))
        writer.uint32(16).int32(message.value);
      return writer;
    };
    Int32Maybe.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };
    Int32Maybe.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader))
        reader = $Reader.create(reader);
      let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.Int32Maybe();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.answer = $root.device.Answer.decode(reader, reader.uint32());
            break;
          case 2:
            message.value = reader.int32();
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };
    Int32Maybe.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader))
        reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };
    Int32Maybe.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.answer != null && message.hasOwnProperty("answer")) {
        let error = $root.device.Answer.verify(message.answer);
        if (error)
          return "answer." + error;
      }
      if (message.value != null && message.hasOwnProperty("value")) {
        if (!$util.isInteger(message.value))
          return "value: integer expected";
      }
      return null;
    };
    Int32Maybe.fromObject = function fromObject(object) {
      if (object instanceof $root.device.Int32Maybe)
        return object;
      let message = new $root.device.Int32Maybe();
      if (object.answer != null) {
        if (typeof object.answer !== "object")
          throw TypeError(".device.Int32Maybe.answer: object expected");
        message.answer = $root.device.Answer.fromObject(object.answer);
      }
      if (object.value != null)
        message.value = object.value | 0;
      return message;
    };
    Int32Maybe.toObject = function toObject(message, options) {
      if (!options)
        options = {};
      let object = {};
      if (options.defaults) {
        object.answer = null;
        object.value = 0;
      }
      if (message.answer != null && message.hasOwnProperty("answer"))
        object.answer = $root.device.Answer.toObject(message.answer, options);
      if (message.value != null && message.hasOwnProperty("value"))
        object.value = message.value;
      return object;
    };
    Int32Maybe.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };
    return Int32Maybe;
  }();
  device2.Int64Maybe = function() {
    function Int64Maybe(properties) {
      if (properties) {
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null)
            this[keys[i]] = properties[keys[i]];
      }
    }
    Int64Maybe.prototype.answer = null;
    Int64Maybe.prototype.value = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    Int64Maybe.create = function create(properties) {
      return new Int64Maybe(properties);
    };
    Int64Maybe.encode = function encode(message, writer) {
      if (!writer)
        writer = $Writer.create();
      if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
        $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
      if (message.value != null && Object.hasOwnProperty.call(message, "value"))
        writer.uint32(16).int64(message.value);
      return writer;
    };
    Int64Maybe.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };
    Int64Maybe.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader))
        reader = $Reader.create(reader);
      let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.Int64Maybe();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.answer = $root.device.Answer.decode(reader, reader.uint32());
            break;
          case 2:
            message.value = reader.int64();
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };
    Int64Maybe.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader))
        reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };
    Int64Maybe.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.answer != null && message.hasOwnProperty("answer")) {
        let error = $root.device.Answer.verify(message.answer);
        if (error)
          return "answer." + error;
      }
      if (message.value != null && message.hasOwnProperty("value")) {
        if (!$util.isInteger(message.value) && !(message.value && $util.isInteger(message.value.low) && $util.isInteger(message.value.high)))
          return "value: integer|Long expected";
      }
      return null;
    };
    Int64Maybe.fromObject = function fromObject(object) {
      if (object instanceof $root.device.Int64Maybe)
        return object;
      let message = new $root.device.Int64Maybe();
      if (object.answer != null) {
        if (typeof object.answer !== "object")
          throw TypeError(".device.Int64Maybe.answer: object expected");
        message.answer = $root.device.Answer.fromObject(object.answer);
      }
      if (object.value != null) {
        if ($util.Long)
          (message.value = $util.Long.fromValue(object.value)).unsigned = false;
        else if (typeof object.value === "string")
          message.value = parseInt(object.value, 10);
        else if (typeof object.value === "number")
          message.value = object.value;
        else if (typeof object.value === "object")
          message.value = new $util.LongBits(object.value.low >>> 0, object.value.high >>> 0).toNumber();
      }
      return message;
    };
    Int64Maybe.toObject = function toObject(message, options) {
      if (!options)
        options = {};
      let object = {};
      if (options.defaults) {
        object.answer = null;
        if ($util.Long) {
          let long = new $util.Long(0, 0, false);
          object.value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
        } else
          object.value = options.longs === String ? "0" : 0;
      }
      if (message.answer != null && message.hasOwnProperty("answer"))
        object.answer = $root.device.Answer.toObject(message.answer, options);
      if (message.value != null && message.hasOwnProperty("value"))
        if (typeof message.value === "number")
          object.value = options.longs === String ? String(message.value) : message.value;
        else
          object.value = options.longs === String ? $util.Long.prototype.toString.call(message.value) : options.longs === Number ? new $util.LongBits(message.value.low >>> 0, message.value.high >>> 0).toNumber() : message.value;
      return object;
    };
    Int64Maybe.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };
    return Int64Maybe;
  }();
  device2.BoolMaybe = function() {
    function BoolMaybe(properties) {
      if (properties) {
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null)
            this[keys[i]] = properties[keys[i]];
      }
    }
    BoolMaybe.prototype.answer = null;
    BoolMaybe.prototype.value = false;
    BoolMaybe.create = function create(properties) {
      return new BoolMaybe(properties);
    };
    BoolMaybe.encode = function encode(message, writer) {
      if (!writer)
        writer = $Writer.create();
      if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
        $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
      if (message.value != null && Object.hasOwnProperty.call(message, "value"))
        writer.uint32(16).bool(message.value);
      return writer;
    };
    BoolMaybe.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };
    BoolMaybe.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader))
        reader = $Reader.create(reader);
      let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.BoolMaybe();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.answer = $root.device.Answer.decode(reader, reader.uint32());
            break;
          case 2:
            message.value = reader.bool();
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };
    BoolMaybe.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader))
        reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };
    BoolMaybe.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.answer != null && message.hasOwnProperty("answer")) {
        let error = $root.device.Answer.verify(message.answer);
        if (error)
          return "answer." + error;
      }
      if (message.value != null && message.hasOwnProperty("value")) {
        if (typeof message.value !== "boolean")
          return "value: boolean expected";
      }
      return null;
    };
    BoolMaybe.fromObject = function fromObject(object) {
      if (object instanceof $root.device.BoolMaybe)
        return object;
      let message = new $root.device.BoolMaybe();
      if (object.answer != null) {
        if (typeof object.answer !== "object")
          throw TypeError(".device.BoolMaybe.answer: object expected");
        message.answer = $root.device.Answer.fromObject(object.answer);
      }
      if (object.value != null)
        message.value = Boolean(object.value);
      return message;
    };
    BoolMaybe.toObject = function toObject(message, options) {
      if (!options)
        options = {};
      let object = {};
      if (options.defaults) {
        object.answer = null;
        object.value = false;
      }
      if (message.answer != null && message.hasOwnProperty("answer"))
        object.answer = $root.device.Answer.toObject(message.answer, options);
      if (message.value != null && message.hasOwnProperty("value"))
        object.value = message.value;
      return object;
    };
    BoolMaybe.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };
    return BoolMaybe;
  }();
  device2.DeviceInfo = function() {
    function DeviceInfo(properties) {
      if (properties) {
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null)
            this[keys[i]] = properties[keys[i]];
      }
    }
    DeviceInfo.prototype.answer = null;
    DeviceInfo.prototype.platform = 0;
    DeviceInfo.prototype.appVersion = null;
    DeviceInfo.prototype.core = 0;
    DeviceInfo.prototype.osVersion = null;
    DeviceInfo.prototype.deviceType = null;
    DeviceInfo.prototype.authentication = null;
    DeviceInfo.prototype.volumes = null;
    DeviceInfo.prototype.securitySoftware = null;
    DeviceInfo.prototype.authorizationSettings = null;
    DeviceInfo.prototype.applications = null;
    DeviceInfo.prototype.appInstanceId = null;
    DeviceInfo.prototype.hardwareUuid = null;
    DeviceInfo.prototype.intuneManagedDeviceId = null;
    DeviceInfo.prototype.osDomainName = null;
    DeviceInfo.prototype.hostname = null;
    DeviceInfo.prototype.hardwareSerialNum = null;
    DeviceInfo.prototype.tpmInfo = null;
    DeviceInfo.prototype.crowdstrikeAgentId = null;
    DeviceInfo.prototype.biSdkInfo = null;
    DeviceInfo.prototype.keyProvenances = null;
    DeviceInfo.prototype.isHalEnabled = null;
    DeviceInfo.prototype.locale = null;
    DeviceInfo.prototype.intuneManagedDeviceName = null;
    DeviceInfo.prototype.intuneDeviceId = null;
    DeviceInfo.prototype.jamfProId = null;
    DeviceInfo.prototype.googleWorkspaceManagementId = null;
    DeviceInfo.create = function create(properties) {
      return new DeviceInfo(properties);
    };
    DeviceInfo.encode = function encode(message, writer) {
      if (!writer)
        writer = $Writer.create();
      if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
        $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
      if (message.platform != null && Object.hasOwnProperty.call(message, "platform"))
        writer.uint32(16).int32(message.platform);
      if (message.appVersion != null && Object.hasOwnProperty.call(message, "appVersion"))
        $root.device.StringMaybe.encode(message.appVersion, writer.uint32(26).fork()).ldelim();
      if (message.osVersion != null && Object.hasOwnProperty.call(message, "osVersion"))
        $root.device.DeviceInfo.OSVersion.encode(message.osVersion, writer.uint32(34).fork()).ldelim();
      if (message.deviceType != null && Object.hasOwnProperty.call(message, "deviceType"))
        $root.device.DeviceInfo.DeviceType.encode(message.deviceType, writer.uint32(42).fork()).ldelim();
      if (message.authentication != null && Object.hasOwnProperty.call(message, "authentication"))
        $root.device.DeviceInfo.Authentication.encode(message.authentication, writer.uint32(50).fork()).ldelim();
      if (message.volumes != null && Object.hasOwnProperty.call(message, "volumes"))
        $root.device.DeviceInfo.Volumes.encode(message.volumes, writer.uint32(58).fork()).ldelim();
      if (message.securitySoftware != null && Object.hasOwnProperty.call(message, "securitySoftware"))
        $root.device.DeviceInfo.SecuritySoftware.encode(message.securitySoftware, writer.uint32(66).fork()).ldelim();
      if (message.authorizationSettings != null && Object.hasOwnProperty.call(message, "authorizationSettings"))
        $root.device.DeviceInfo.AuthorizationSettings.encode(message.authorizationSettings, writer.uint32(74).fork()).ldelim();
      if (message.applications != null && Object.hasOwnProperty.call(message, "applications"))
        $root.device.DeviceInfo.Applications.encode(message.applications, writer.uint32(82).fork()).ldelim();
      if (message.appInstanceId != null && Object.hasOwnProperty.call(message, "appInstanceId"))
        $root.device.StringMaybe.encode(message.appInstanceId, writer.uint32(90).fork()).ldelim();
      if (message.hardwareUuid != null && Object.hasOwnProperty.call(message, "hardwareUuid"))
        $root.device.StringMaybe.encode(message.hardwareUuid, writer.uint32(98).fork()).ldelim();
      if (message.core != null && Object.hasOwnProperty.call(message, "core"))
        writer.uint32(104).int32(message.core);
      if (message.intuneManagedDeviceId != null && Object.hasOwnProperty.call(message, "intuneManagedDeviceId"))
        $root.device.StringMaybe.encode(message.intuneManagedDeviceId, writer.uint32(114).fork()).ldelim();
      if (message.osDomainName != null && Object.hasOwnProperty.call(message, "osDomainName"))
        $root.device.StringMaybe.encode(message.osDomainName, writer.uint32(122).fork()).ldelim();
      if (message.hostname != null && Object.hasOwnProperty.call(message, "hostname"))
        $root.device.StringMaybe.encode(message.hostname, writer.uint32(130).fork()).ldelim();
      if (message.hardwareSerialNum != null && Object.hasOwnProperty.call(message, "hardwareSerialNum"))
        $root.device.StringMaybe.encode(message.hardwareSerialNum, writer.uint32(138).fork()).ldelim();
      if (message.tpmInfo != null && Object.hasOwnProperty.call(message, "tpmInfo"))
        $root.device.DeviceInfo.TPMInfo.encode(message.tpmInfo, writer.uint32(146).fork()).ldelim();
      if (message.crowdstrikeAgentId != null && Object.hasOwnProperty.call(message, "crowdstrikeAgentId"))
        $root.device.StringMaybe.encode(message.crowdstrikeAgentId, writer.uint32(154).fork()).ldelim();
      if (message.biSdkInfo != null && Object.hasOwnProperty.call(message, "biSdkInfo"))
        $root.device.DeviceInfo.BiSdkInfo.encode(message.biSdkInfo, writer.uint32(162).fork()).ldelim();
      if (message.keyProvenances != null && Object.hasOwnProperty.call(message, "keyProvenances"))
        $root.device.DeviceInfo.KeyProvenances.encode(message.keyProvenances, writer.uint32(170).fork()).ldelim();
      if (message.isHalEnabled != null && Object.hasOwnProperty.call(message, "isHalEnabled"))
        $root.device.BoolMaybe.encode(message.isHalEnabled, writer.uint32(178).fork()).ldelim();
      if (message.locale != null && Object.hasOwnProperty.call(message, "locale"))
        $root.device.DeviceInfo.Locale.encode(message.locale, writer.uint32(186).fork()).ldelim();
      if (message.intuneManagedDeviceName != null && Object.hasOwnProperty.call(message, "intuneManagedDeviceName"))
        $root.device.StringMaybe.encode(message.intuneManagedDeviceName, writer.uint32(194).fork()).ldelim();
      if (message.intuneDeviceId != null && Object.hasOwnProperty.call(message, "intuneDeviceId"))
        $root.device.StringMaybe.encode(message.intuneDeviceId, writer.uint32(202).fork()).ldelim();
      if (message.jamfProId != null && Object.hasOwnProperty.call(message, "jamfProId"))
        $root.device.StringMaybe.encode(message.jamfProId, writer.uint32(210).fork()).ldelim();
      if (message.googleWorkspaceManagementId != null && Object.hasOwnProperty.call(message, "googleWorkspaceManagementId"))
        $root.device.StringMaybe.encode(message.googleWorkspaceManagementId, writer.uint32(218).fork()).ldelim();
      return writer;
    };
    DeviceInfo.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };
    DeviceInfo.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader))
        reader = $Reader.create(reader);
      let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.answer = $root.device.Answer.decode(reader, reader.uint32());
            break;
          case 2:
            message.platform = reader.int32();
            break;
          case 3:
            message.appVersion = $root.device.StringMaybe.decode(reader, reader.uint32());
            break;
          case 13:
            message.core = reader.int32();
            break;
          case 4:
            message.osVersion = $root.device.DeviceInfo.OSVersion.decode(reader, reader.uint32());
            break;
          case 5:
            message.deviceType = $root.device.DeviceInfo.DeviceType.decode(reader, reader.uint32());
            break;
          case 6:
            message.authentication = $root.device.DeviceInfo.Authentication.decode(reader, reader.uint32());
            break;
          case 7:
            message.volumes = $root.device.DeviceInfo.Volumes.decode(reader, reader.uint32());
            break;
          case 8:
            message.securitySoftware = $root.device.DeviceInfo.SecuritySoftware.decode(reader, reader.uint32());
            break;
          case 9:
            message.authorizationSettings = $root.device.DeviceInfo.AuthorizationSettings.decode(reader, reader.uint32());
            break;
          case 10:
            message.applications = $root.device.DeviceInfo.Applications.decode(reader, reader.uint32());
            break;
          case 11:
            message.appInstanceId = $root.device.StringMaybe.decode(reader, reader.uint32());
            break;
          case 12:
            message.hardwareUuid = $root.device.StringMaybe.decode(reader, reader.uint32());
            break;
          case 14:
            message.intuneManagedDeviceId = $root.device.StringMaybe.decode(reader, reader.uint32());
            break;
          case 15:
            message.osDomainName = $root.device.StringMaybe.decode(reader, reader.uint32());
            break;
          case 16:
            message.hostname = $root.device.StringMaybe.decode(reader, reader.uint32());
            break;
          case 17:
            message.hardwareSerialNum = $root.device.StringMaybe.decode(reader, reader.uint32());
            break;
          case 18:
            message.tpmInfo = $root.device.DeviceInfo.TPMInfo.decode(reader, reader.uint32());
            break;
          case 19:
            message.crowdstrikeAgentId = $root.device.StringMaybe.decode(reader, reader.uint32());
            break;
          case 20:
            message.biSdkInfo = $root.device.DeviceInfo.BiSdkInfo.decode(reader, reader.uint32());
            break;
          case 21:
            message.keyProvenances = $root.device.DeviceInfo.KeyProvenances.decode(reader, reader.uint32());
            break;
          case 22:
            message.isHalEnabled = $root.device.BoolMaybe.decode(reader, reader.uint32());
            break;
          case 23:
            message.locale = $root.device.DeviceInfo.Locale.decode(reader, reader.uint32());
            break;
          case 24:
            message.intuneManagedDeviceName = $root.device.StringMaybe.decode(reader, reader.uint32());
            break;
          case 25:
            message.intuneDeviceId = $root.device.StringMaybe.decode(reader, reader.uint32());
            break;
          case 26:
            message.jamfProId = $root.device.StringMaybe.decode(reader, reader.uint32());
            break;
          case 27:
            message.googleWorkspaceManagementId = $root.device.StringMaybe.decode(reader, reader.uint32());
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };
    DeviceInfo.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader))
        reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };
    DeviceInfo.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.answer != null && message.hasOwnProperty("answer")) {
        let error = $root.device.Answer.verify(message.answer);
        if (error)
          return "answer." + error;
      }
      if (message.platform != null && message.hasOwnProperty("platform"))
        switch (message.platform) {
          default:
            return "platform: enum value expected";
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            break;
        }
      if (message.appVersion != null && message.hasOwnProperty("appVersion")) {
        let error = $root.device.StringMaybe.verify(message.appVersion);
        if (error)
          return "appVersion." + error;
      }
      if (message.core != null && message.hasOwnProperty("core"))
        switch (message.core) {
          default:
            return "core: enum value expected";
          case 0:
          case 1:
            break;
        }
      if (message.osVersion != null && message.hasOwnProperty("osVersion")) {
        let error = $root.device.DeviceInfo.OSVersion.verify(message.osVersion);
        if (error)
          return "osVersion." + error;
      }
      if (message.deviceType != null && message.hasOwnProperty("deviceType")) {
        let error = $root.device.DeviceInfo.DeviceType.verify(message.deviceType);
        if (error)
          return "deviceType." + error;
      }
      if (message.authentication != null && message.hasOwnProperty("authentication")) {
        let error = $root.device.DeviceInfo.Authentication.verify(message.authentication);
        if (error)
          return "authentication." + error;
      }
      if (message.volumes != null && message.hasOwnProperty("volumes")) {
        let error = $root.device.DeviceInfo.Volumes.verify(message.volumes);
        if (error)
          return "volumes." + error;
      }
      if (message.securitySoftware != null && message.hasOwnProperty("securitySoftware")) {
        let error = $root.device.DeviceInfo.SecuritySoftware.verify(message.securitySoftware);
        if (error)
          return "securitySoftware." + error;
      }
      if (message.authorizationSettings != null && message.hasOwnProperty("authorizationSettings")) {
        let error = $root.device.DeviceInfo.AuthorizationSettings.verify(message.authorizationSettings);
        if (error)
          return "authorizationSettings." + error;
      }
      if (message.applications != null && message.hasOwnProperty("applications")) {
        let error = $root.device.DeviceInfo.Applications.verify(message.applications);
        if (error)
          return "applications." + error;
      }
      if (message.appInstanceId != null && message.hasOwnProperty("appInstanceId")) {
        let error = $root.device.StringMaybe.verify(message.appInstanceId);
        if (error)
          return "appInstanceId." + error;
      }
      if (message.hardwareUuid != null && message.hasOwnProperty("hardwareUuid")) {
        let error = $root.device.StringMaybe.verify(message.hardwareUuid);
        if (error)
          return "hardwareUuid." + error;
      }
      if (message.intuneManagedDeviceId != null && message.hasOwnProperty("intuneManagedDeviceId")) {
        let error = $root.device.StringMaybe.verify(message.intuneManagedDeviceId);
        if (error)
          return "intuneManagedDeviceId." + error;
      }
      if (message.osDomainName != null && message.hasOwnProperty("osDomainName")) {
        let error = $root.device.StringMaybe.verify(message.osDomainName);
        if (error)
          return "osDomainName." + error;
      }
      if (message.hostname != null && message.hasOwnProperty("hostname")) {
        let error = $root.device.StringMaybe.verify(message.hostname);
        if (error)
          return "hostname." + error;
      }
      if (message.hardwareSerialNum != null && message.hasOwnProperty("hardwareSerialNum")) {
        let error = $root.device.StringMaybe.verify(message.hardwareSerialNum);
        if (error)
          return "hardwareSerialNum." + error;
      }
      if (message.tpmInfo != null && message.hasOwnProperty("tpmInfo")) {
        let error = $root.device.DeviceInfo.TPMInfo.verify(message.tpmInfo);
        if (error)
          return "tpmInfo." + error;
      }
      if (message.crowdstrikeAgentId != null && message.hasOwnProperty("crowdstrikeAgentId")) {
        let error = $root.device.StringMaybe.verify(message.crowdstrikeAgentId);
        if (error)
          return "crowdstrikeAgentId." + error;
      }
      if (message.biSdkInfo != null && message.hasOwnProperty("biSdkInfo")) {
        let error = $root.device.DeviceInfo.BiSdkInfo.verify(message.biSdkInfo);
        if (error)
          return "biSdkInfo." + error;
      }
      if (message.keyProvenances != null && message.hasOwnProperty("keyProvenances")) {
        let error = $root.device.DeviceInfo.KeyProvenances.verify(message.keyProvenances);
        if (error)
          return "keyProvenances." + error;
      }
      if (message.isHalEnabled != null && message.hasOwnProperty("isHalEnabled")) {
        let error = $root.device.BoolMaybe.verify(message.isHalEnabled);
        if (error)
          return "isHalEnabled." + error;
      }
      if (message.locale != null && message.hasOwnProperty("locale")) {
        let error = $root.device.DeviceInfo.Locale.verify(message.locale);
        if (error)
          return "locale." + error;
      }
      if (message.intuneManagedDeviceName != null && message.hasOwnProperty("intuneManagedDeviceName")) {
        let error = $root.device.StringMaybe.verify(message.intuneManagedDeviceName);
        if (error)
          return "intuneManagedDeviceName." + error;
      }
      if (message.intuneDeviceId != null && message.hasOwnProperty("intuneDeviceId")) {
        let error = $root.device.StringMaybe.verify(message.intuneDeviceId);
        if (error)
          return "intuneDeviceId." + error;
      }
      if (message.jamfProId != null && message.hasOwnProperty("jamfProId")) {
        let error = $root.device.StringMaybe.verify(message.jamfProId);
        if (error)
          return "jamfProId." + error;
      }
      if (message.googleWorkspaceManagementId != null && message.hasOwnProperty("googleWorkspaceManagementId")) {
        let error = $root.device.StringMaybe.verify(message.googleWorkspaceManagementId);
        if (error)
          return "googleWorkspaceManagementId." + error;
      }
      return null;
    };
    DeviceInfo.fromObject = function fromObject(object) {
      if (object instanceof $root.device.DeviceInfo)
        return object;
      let message = new $root.device.DeviceInfo();
      if (object.answer != null) {
        if (typeof object.answer !== "object")
          throw TypeError(".device.DeviceInfo.answer: object expected");
        message.answer = $root.device.Answer.fromObject(object.answer);
      }
      switch (object.platform) {
        case "UNSPECIFIED":
        case 0:
          message.platform = 0;
          break;
        case "MACOS":
        case 1:
          message.platform = 1;
          break;
        case "IOS":
        case 2:
          message.platform = 2;
          break;
        case "ANDROID":
        case 3:
          message.platform = 3;
          break;
        case "WINDOWS":
        case 4:
          message.platform = 4;
          break;
        case "LINUX":
        case 5:
          message.platform = 5;
          break;
        case "WEB":
        case 6:
          message.platform = 6;
          break;
        case "CHROMEOS":
        case 7:
          message.platform = 7;
          break;
        case "CHROMEOSWEB":
        case 8:
          message.platform = 8;
          break;
      }
      if (object.appVersion != null) {
        if (typeof object.appVersion !== "object")
          throw TypeError(".device.DeviceInfo.appVersion: object expected");
        message.appVersion = $root.device.StringMaybe.fromObject(object.appVersion);
      }
      switch (object.core) {
        case "GO":
        case 0:
          message.core = 0;
          break;
        case "RUST":
        case 1:
          message.core = 1;
          break;
      }
      if (object.osVersion != null) {
        if (typeof object.osVersion !== "object")
          throw TypeError(".device.DeviceInfo.osVersion: object expected");
        message.osVersion = $root.device.DeviceInfo.OSVersion.fromObject(object.osVersion);
      }
      if (object.deviceType != null) {
        if (typeof object.deviceType !== "object")
          throw TypeError(".device.DeviceInfo.deviceType: object expected");
        message.deviceType = $root.device.DeviceInfo.DeviceType.fromObject(object.deviceType);
      }
      if (object.authentication != null) {
        if (typeof object.authentication !== "object")
          throw TypeError(".device.DeviceInfo.authentication: object expected");
        message.authentication = $root.device.DeviceInfo.Authentication.fromObject(object.authentication);
      }
      if (object.volumes != null) {
        if (typeof object.volumes !== "object")
          throw TypeError(".device.DeviceInfo.volumes: object expected");
        message.volumes = $root.device.DeviceInfo.Volumes.fromObject(object.volumes);
      }
      if (object.securitySoftware != null) {
        if (typeof object.securitySoftware !== "object")
          throw TypeError(".device.DeviceInfo.securitySoftware: object expected");
        message.securitySoftware = $root.device.DeviceInfo.SecuritySoftware.fromObject(object.securitySoftware);
      }
      if (object.authorizationSettings != null) {
        if (typeof object.authorizationSettings !== "object")
          throw TypeError(".device.DeviceInfo.authorizationSettings: object expected");
        message.authorizationSettings = $root.device.DeviceInfo.AuthorizationSettings.fromObject(object.authorizationSettings);
      }
      if (object.applications != null) {
        if (typeof object.applications !== "object")
          throw TypeError(".device.DeviceInfo.applications: object expected");
        message.applications = $root.device.DeviceInfo.Applications.fromObject(object.applications);
      }
      if (object.appInstanceId != null) {
        if (typeof object.appInstanceId !== "object")
          throw TypeError(".device.DeviceInfo.appInstanceId: object expected");
        message.appInstanceId = $root.device.StringMaybe.fromObject(object.appInstanceId);
      }
      if (object.hardwareUuid != null) {
        if (typeof object.hardwareUuid !== "object")
          throw TypeError(".device.DeviceInfo.hardwareUuid: object expected");
        message.hardwareUuid = $root.device.StringMaybe.fromObject(object.hardwareUuid);
      }
      if (object.intuneManagedDeviceId != null) {
        if (typeof object.intuneManagedDeviceId !== "object")
          throw TypeError(".device.DeviceInfo.intuneManagedDeviceId: object expected");
        message.intuneManagedDeviceId = $root.device.StringMaybe.fromObject(object.intuneManagedDeviceId);
      }
      if (object.osDomainName != null) {
        if (typeof object.osDomainName !== "object")
          throw TypeError(".device.DeviceInfo.osDomainName: object expected");
        message.osDomainName = $root.device.StringMaybe.fromObject(object.osDomainName);
      }
      if (object.hostname != null) {
        if (typeof object.hostname !== "object")
          throw TypeError(".device.DeviceInfo.hostname: object expected");
        message.hostname = $root.device.StringMaybe.fromObject(object.hostname);
      }
      if (object.hardwareSerialNum != null) {
        if (typeof object.hardwareSerialNum !== "object")
          throw TypeError(".device.DeviceInfo.hardwareSerialNum: object expected");
        message.hardwareSerialNum = $root.device.StringMaybe.fromObject(object.hardwareSerialNum);
      }
      if (object.tpmInfo != null) {
        if (typeof object.tpmInfo !== "object")
          throw TypeError(".device.DeviceInfo.tpmInfo: object expected");
        message.tpmInfo = $root.device.DeviceInfo.TPMInfo.fromObject(object.tpmInfo);
      }
      if (object.crowdstrikeAgentId != null) {
        if (typeof object.crowdstrikeAgentId !== "object")
          throw TypeError(".device.DeviceInfo.crowdstrikeAgentId: object expected");
        message.crowdstrikeAgentId = $root.device.StringMaybe.fromObject(object.crowdstrikeAgentId);
      }
      if (object.biSdkInfo != null) {
        if (typeof object.biSdkInfo !== "object")
          throw TypeError(".device.DeviceInfo.biSdkInfo: object expected");
        message.biSdkInfo = $root.device.DeviceInfo.BiSdkInfo.fromObject(object.biSdkInfo);
      }
      if (object.keyProvenances != null) {
        if (typeof object.keyProvenances !== "object")
          throw TypeError(".device.DeviceInfo.keyProvenances: object expected");
        message.keyProvenances = $root.device.DeviceInfo.KeyProvenances.fromObject(object.keyProvenances);
      }
      if (object.isHalEnabled != null) {
        if (typeof object.isHalEnabled !== "object")
          throw TypeError(".device.DeviceInfo.isHalEnabled: object expected");
        message.isHalEnabled = $root.device.BoolMaybe.fromObject(object.isHalEnabled);
      }
      if (object.locale != null) {
        if (typeof object.locale !== "object")
          throw TypeError(".device.DeviceInfo.locale: object expected");
        message.locale = $root.device.DeviceInfo.Locale.fromObject(object.locale);
      }
      if (object.intuneManagedDeviceName != null) {
        if (typeof object.intuneManagedDeviceName !== "object")
          throw TypeError(".device.DeviceInfo.intuneManagedDeviceName: object expected");
        message.intuneManagedDeviceName = $root.device.StringMaybe.fromObject(object.intuneManagedDeviceName);
      }
      if (object.intuneDeviceId != null) {
        if (typeof object.intuneDeviceId !== "object")
          throw TypeError(".device.DeviceInfo.intuneDeviceId: object expected");
        message.intuneDeviceId = $root.device.StringMaybe.fromObject(object.intuneDeviceId);
      }
      if (object.jamfProId != null) {
        if (typeof object.jamfProId !== "object")
          throw TypeError(".device.DeviceInfo.jamfProId: object expected");
        message.jamfProId = $root.device.StringMaybe.fromObject(object.jamfProId);
      }
      if (object.googleWorkspaceManagementId != null) {
        if (typeof object.googleWorkspaceManagementId !== "object")
          throw TypeError(".device.DeviceInfo.googleWorkspaceManagementId: object expected");
        message.googleWorkspaceManagementId = $root.device.StringMaybe.fromObject(object.googleWorkspaceManagementId);
      }
      return message;
    };
    DeviceInfo.toObject = function toObject(message, options) {
      if (!options)
        options = {};
      let object = {};
      if (options.defaults) {
        object.answer = null;
        object.platform = options.enums === String ? "UNSPECIFIED" : 0;
        object.appVersion = null;
        object.osVersion = null;
        object.deviceType = null;
        object.authentication = null;
        object.volumes = null;
        object.securitySoftware = null;
        object.authorizationSettings = null;
        object.applications = null;
        object.appInstanceId = null;
        object.hardwareUuid = null;
        object.core = options.enums === String ? "GO" : 0;
        object.intuneManagedDeviceId = null;
        object.osDomainName = null;
        object.hostname = null;
        object.hardwareSerialNum = null;
        object.tpmInfo = null;
        object.crowdstrikeAgentId = null;
        object.biSdkInfo = null;
        object.keyProvenances = null;
        object.isHalEnabled = null;
        object.locale = null;
        object.intuneManagedDeviceName = null;
        object.intuneDeviceId = null;
        object.jamfProId = null;
        object.googleWorkspaceManagementId = null;
      }
      if (message.answer != null && message.hasOwnProperty("answer"))
        object.answer = $root.device.Answer.toObject(message.answer, options);
      if (message.platform != null && message.hasOwnProperty("platform"))
        object.platform = options.enums === String ? $root.device.Platform[message.platform] : message.platform;
      if (message.appVersion != null && message.hasOwnProperty("appVersion"))
        object.appVersion = $root.device.StringMaybe.toObject(message.appVersion, options);
      if (message.osVersion != null && message.hasOwnProperty("osVersion"))
        object.osVersion = $root.device.DeviceInfo.OSVersion.toObject(message.osVersion, options);
      if (message.deviceType != null && message.hasOwnProperty("deviceType"))
        object.deviceType = $root.device.DeviceInfo.DeviceType.toObject(message.deviceType, options);
      if (message.authentication != null && message.hasOwnProperty("authentication"))
        object.authentication = $root.device.DeviceInfo.Authentication.toObject(message.authentication, options);
      if (message.volumes != null && message.hasOwnProperty("volumes"))
        object.volumes = $root.device.DeviceInfo.Volumes.toObject(message.volumes, options);
      if (message.securitySoftware != null && message.hasOwnProperty("securitySoftware"))
        object.securitySoftware = $root.device.DeviceInfo.SecuritySoftware.toObject(message.securitySoftware, options);
      if (message.authorizationSettings != null && message.hasOwnProperty("authorizationSettings"))
        object.authorizationSettings = $root.device.DeviceInfo.AuthorizationSettings.toObject(message.authorizationSettings, options);
      if (message.applications != null && message.hasOwnProperty("applications"))
        object.applications = $root.device.DeviceInfo.Applications.toObject(message.applications, options);
      if (message.appInstanceId != null && message.hasOwnProperty("appInstanceId"))
        object.appInstanceId = $root.device.StringMaybe.toObject(message.appInstanceId, options);
      if (message.hardwareUuid != null && message.hasOwnProperty("hardwareUuid"))
        object.hardwareUuid = $root.device.StringMaybe.toObject(message.hardwareUuid, options);
      if (message.core != null && message.hasOwnProperty("core"))
        object.core = options.enums === String ? $root.device.Core[message.core] : message.core;
      if (message.intuneManagedDeviceId != null && message.hasOwnProperty("intuneManagedDeviceId"))
        object.intuneManagedDeviceId = $root.device.StringMaybe.toObject(message.intuneManagedDeviceId, options);
      if (message.osDomainName != null && message.hasOwnProperty("osDomainName"))
        object.osDomainName = $root.device.StringMaybe.toObject(message.osDomainName, options);
      if (message.hostname != null && message.hasOwnProperty("hostname"))
        object.hostname = $root.device.StringMaybe.toObject(message.hostname, options);
      if (message.hardwareSerialNum != null && message.hasOwnProperty("hardwareSerialNum"))
        object.hardwareSerialNum = $root.device.StringMaybe.toObject(message.hardwareSerialNum, options);
      if (message.tpmInfo != null && message.hasOwnProperty("tpmInfo"))
        object.tpmInfo = $root.device.DeviceInfo.TPMInfo.toObject(message.tpmInfo, options);
      if (message.crowdstrikeAgentId != null && message.hasOwnProperty("crowdstrikeAgentId"))
        object.crowdstrikeAgentId = $root.device.StringMaybe.toObject(message.crowdstrikeAgentId, options);
      if (message.biSdkInfo != null && message.hasOwnProperty("biSdkInfo"))
        object.biSdkInfo = $root.device.DeviceInfo.BiSdkInfo.toObject(message.biSdkInfo, options);
      if (message.keyProvenances != null && message.hasOwnProperty("keyProvenances"))
        object.keyProvenances = $root.device.DeviceInfo.KeyProvenances.toObject(message.keyProvenances, options);
      if (message.isHalEnabled != null && message.hasOwnProperty("isHalEnabled"))
        object.isHalEnabled = $root.device.BoolMaybe.toObject(message.isHalEnabled, options);
      if (message.locale != null && message.hasOwnProperty("locale"))
        object.locale = $root.device.DeviceInfo.Locale.toObject(message.locale, options);
      if (message.intuneManagedDeviceName != null && message.hasOwnProperty("intuneManagedDeviceName"))
        object.intuneManagedDeviceName = $root.device.StringMaybe.toObject(message.intuneManagedDeviceName, options);
      if (message.intuneDeviceId != null && message.hasOwnProperty("intuneDeviceId"))
        object.intuneDeviceId = $root.device.StringMaybe.toObject(message.intuneDeviceId, options);
      if (message.jamfProId != null && message.hasOwnProperty("jamfProId"))
        object.jamfProId = $root.device.StringMaybe.toObject(message.jamfProId, options);
      if (message.googleWorkspaceManagementId != null && message.hasOwnProperty("googleWorkspaceManagementId"))
        object.googleWorkspaceManagementId = $root.device.StringMaybe.toObject(message.googleWorkspaceManagementId, options);
      return object;
    };
    DeviceInfo.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };
    DeviceInfo.Applications = function() {
      function Applications(properties) {
        this.software = [];
        if (properties) {
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
        }
      }
      Applications.prototype.answer = null;
      Applications.prototype.software = $util.emptyArray;
      Applications.create = function create(properties) {
        return new Applications(properties);
      };
      Applications.encode = function encode(message, writer) {
        if (!writer)
          writer = $Writer.create();
        if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
          $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
        if (message.software != null && message.software.length)
          for (let i = 0; i < message.software.length; ++i)
            $root.device.DeviceInfo.Applications.Software.encode(message.software[i], writer.uint32(18).fork()).ldelim();
        return writer;
      };
      Applications.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      Applications.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
          reader = $Reader.create(reader);
        let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.Applications();
        while (reader.pos < end) {
          let tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              message.answer = $root.device.Answer.decode(reader, reader.uint32());
              break;
            case 2:
              if (!(message.software && message.software.length))
                message.software = [];
              message.software.push($root.device.DeviceInfo.Applications.Software.decode(reader, reader.uint32()));
              break;
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return message;
      };
      Applications.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
          reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      Applications.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        if (message.answer != null && message.hasOwnProperty("answer")) {
          let error = $root.device.Answer.verify(message.answer);
          if (error)
            return "answer." + error;
        }
        if (message.software != null && message.hasOwnProperty("software")) {
          if (!Array.isArray(message.software))
            return "software: array expected";
          for (let i = 0; i < message.software.length; ++i) {
            let error = $root.device.DeviceInfo.Applications.Software.verify(message.software[i]);
            if (error)
              return "software." + error;
          }
        }
        return null;
      };
      Applications.fromObject = function fromObject(object) {
        if (object instanceof $root.device.DeviceInfo.Applications)
          return object;
        let message = new $root.device.DeviceInfo.Applications();
        if (object.answer != null) {
          if (typeof object.answer !== "object")
            throw TypeError(".device.DeviceInfo.Applications.answer: object expected");
          message.answer = $root.device.Answer.fromObject(object.answer);
        }
        if (object.software) {
          if (!Array.isArray(object.software))
            throw TypeError(".device.DeviceInfo.Applications.software: array expected");
          message.software = [];
          for (let i = 0; i < object.software.length; ++i) {
            if (typeof object.software[i] !== "object")
              throw TypeError(".device.DeviceInfo.Applications.software: object expected");
            message.software[i] = $root.device.DeviceInfo.Applications.Software.fromObject(object.software[i]);
          }
        }
        return message;
      };
      Applications.toObject = function toObject(message, options) {
        if (!options)
          options = {};
        let object = {};
        if (options.arrays || options.defaults)
          object.software = [];
        if (options.defaults)
          object.answer = null;
        if (message.answer != null && message.hasOwnProperty("answer"))
          object.answer = $root.device.Answer.toObject(message.answer, options);
        if (message.software && message.software.length) {
          object.software = [];
          for (let j = 0; j < message.software.length; ++j)
            object.software[j] = $root.device.DeviceInfo.Applications.Software.toObject(message.software[j], options);
        }
        return object;
      };
      Applications.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };
      Applications.Software = function() {
        function Software(properties) {
          if (properties) {
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
          }
        }
        Software.prototype.answer = null;
        Software.prototype.architecture = 0;
        Software.prototype.installDomain = 0;
        Software.prototype.identifier = null;
        Software.prototype.name = null;
        Software.prototype.version = null;
        Software.prototype.publisher = null;
        Software.prototype.installLocation = null;
        Software.prototype.installDate = null;
        Software.prototype.language = null;
        Software.create = function create(properties) {
          return new Software(properties);
        };
        Software.encode = function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
            $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
          if (message.architecture != null && Object.hasOwnProperty.call(message, "architecture"))
            writer.uint32(16).int32(message.architecture);
          if (message.installDomain != null && Object.hasOwnProperty.call(message, "installDomain"))
            writer.uint32(24).int32(message.installDomain);
          if (message.identifier != null && Object.hasOwnProperty.call(message, "identifier"))
            $root.device.StringMaybe.encode(message.identifier, writer.uint32(34).fork()).ldelim();
          if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            $root.device.StringMaybe.encode(message.name, writer.uint32(42).fork()).ldelim();
          if (message.version != null && Object.hasOwnProperty.call(message, "version"))
            $root.device.StringMaybe.encode(message.version, writer.uint32(50).fork()).ldelim();
          if (message.publisher != null && Object.hasOwnProperty.call(message, "publisher"))
            $root.device.StringMaybe.encode(message.publisher, writer.uint32(58).fork()).ldelim();
          if (message.installLocation != null && Object.hasOwnProperty.call(message, "installLocation"))
            $root.device.StringMaybe.encode(message.installLocation, writer.uint32(66).fork()).ldelim();
          if (message.installDate != null && Object.hasOwnProperty.call(message, "installDate"))
            $root.device.StringMaybe.encode(message.installDate, writer.uint32(74).fork()).ldelim();
          if (message.language != null && Object.hasOwnProperty.call(message, "language"))
            $root.device.StringMaybe.encode(message.language, writer.uint32(82).fork()).ldelim();
          return writer;
        };
        Software.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        Software.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.Applications.Software();
          while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.answer = $root.device.Answer.decode(reader, reader.uint32());
                break;
              case 2:
                message.architecture = reader.int32();
                break;
              case 3:
                message.installDomain = reader.int32();
                break;
              case 4:
                message.identifier = $root.device.StringMaybe.decode(reader, reader.uint32());
                break;
              case 5:
                message.name = $root.device.StringMaybe.decode(reader, reader.uint32());
                break;
              case 6:
                message.version = $root.device.StringMaybe.decode(reader, reader.uint32());
                break;
              case 7:
                message.publisher = $root.device.StringMaybe.decode(reader, reader.uint32());
                break;
              case 8:
                message.installLocation = $root.device.StringMaybe.decode(reader, reader.uint32());
                break;
              case 9:
                message.installDate = $root.device.StringMaybe.decode(reader, reader.uint32());
                break;
              case 10:
                message.language = $root.device.StringMaybe.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };
        Software.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };
        Software.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.answer != null && message.hasOwnProperty("answer")) {
            let error = $root.device.Answer.verify(message.answer);
            if (error)
              return "answer." + error;
          }
          if (message.architecture != null && message.hasOwnProperty("architecture"))
            switch (message.architecture) {
              default:
                return "architecture: enum value expected";
              case 0:
              case 1:
              case 2:
              case 3:
                break;
            }
          if (message.installDomain != null && message.hasOwnProperty("installDomain"))
            switch (message.installDomain) {
              default:
                return "installDomain: enum value expected";
              case 0:
              case 1:
              case 2:
              case 3:
                break;
            }
          if (message.identifier != null && message.hasOwnProperty("identifier")) {
            let error = $root.device.StringMaybe.verify(message.identifier);
            if (error)
              return "identifier." + error;
          }
          if (message.name != null && message.hasOwnProperty("name")) {
            let error = $root.device.StringMaybe.verify(message.name);
            if (error)
              return "name." + error;
          }
          if (message.version != null && message.hasOwnProperty("version")) {
            let error = $root.device.StringMaybe.verify(message.version);
            if (error)
              return "version." + error;
          }
          if (message.publisher != null && message.hasOwnProperty("publisher")) {
            let error = $root.device.StringMaybe.verify(message.publisher);
            if (error)
              return "publisher." + error;
          }
          if (message.installLocation != null && message.hasOwnProperty("installLocation")) {
            let error = $root.device.StringMaybe.verify(message.installLocation);
            if (error)
              return "installLocation." + error;
          }
          if (message.installDate != null && message.hasOwnProperty("installDate")) {
            let error = $root.device.StringMaybe.verify(message.installDate);
            if (error)
              return "installDate." + error;
          }
          if (message.language != null && message.hasOwnProperty("language")) {
            let error = $root.device.StringMaybe.verify(message.language);
            if (error)
              return "language." + error;
          }
          return null;
        };
        Software.fromObject = function fromObject(object) {
          if (object instanceof $root.device.DeviceInfo.Applications.Software)
            return object;
          let message = new $root.device.DeviceInfo.Applications.Software();
          if (object.answer != null) {
            if (typeof object.answer !== "object")
              throw TypeError(".device.DeviceInfo.Applications.Software.answer: object expected");
            message.answer = $root.device.Answer.fromObject(object.answer);
          }
          switch (object.architecture) {
            case "ARCH_UNSUPPORTED":
            case 0:
              message.architecture = 0;
              break;
            case "ARCH_UNKNOWN":
            case 1:
              message.architecture = 1;
              break;
            case "ARCH_BIT32":
            case 2:
              message.architecture = 2;
              break;
            case "ARCH_BIT64":
            case 3:
              message.architecture = 3;
              break;
          }
          switch (object.installDomain) {
            case "DOMAIN_UNSUPPORTED":
            case 0:
              message.installDomain = 0;
              break;
            case "DOMAIN_UNKNOWN":
            case 1:
              message.installDomain = 1;
              break;
            case "DOMAIN_USER":
            case 2:
              message.installDomain = 2;
              break;
            case "DOMAIN_MACHINE":
            case 3:
              message.installDomain = 3;
              break;
          }
          if (object.identifier != null) {
            if (typeof object.identifier !== "object")
              throw TypeError(".device.DeviceInfo.Applications.Software.identifier: object expected");
            message.identifier = $root.device.StringMaybe.fromObject(object.identifier);
          }
          if (object.name != null) {
            if (typeof object.name !== "object")
              throw TypeError(".device.DeviceInfo.Applications.Software.name: object expected");
            message.name = $root.device.StringMaybe.fromObject(object.name);
          }
          if (object.version != null) {
            if (typeof object.version !== "object")
              throw TypeError(".device.DeviceInfo.Applications.Software.version: object expected");
            message.version = $root.device.StringMaybe.fromObject(object.version);
          }
          if (object.publisher != null) {
            if (typeof object.publisher !== "object")
              throw TypeError(".device.DeviceInfo.Applications.Software.publisher: object expected");
            message.publisher = $root.device.StringMaybe.fromObject(object.publisher);
          }
          if (object.installLocation != null) {
            if (typeof object.installLocation !== "object")
              throw TypeError(".device.DeviceInfo.Applications.Software.installLocation: object expected");
            message.installLocation = $root.device.StringMaybe.fromObject(object.installLocation);
          }
          if (object.installDate != null) {
            if (typeof object.installDate !== "object")
              throw TypeError(".device.DeviceInfo.Applications.Software.installDate: object expected");
            message.installDate = $root.device.StringMaybe.fromObject(object.installDate);
          }
          if (object.language != null) {
            if (typeof object.language !== "object")
              throw TypeError(".device.DeviceInfo.Applications.Software.language: object expected");
            message.language = $root.device.StringMaybe.fromObject(object.language);
          }
          return message;
        };
        Software.toObject = function toObject(message, options) {
          if (!options)
            options = {};
          let object = {};
          if (options.defaults) {
            object.answer = null;
            object.architecture = options.enums === String ? "ARCH_UNSUPPORTED" : 0;
            object.installDomain = options.enums === String ? "DOMAIN_UNSUPPORTED" : 0;
            object.identifier = null;
            object.name = null;
            object.version = null;
            object.publisher = null;
            object.installLocation = null;
            object.installDate = null;
            object.language = null;
          }
          if (message.answer != null && message.hasOwnProperty("answer"))
            object.answer = $root.device.Answer.toObject(message.answer, options);
          if (message.architecture != null && message.hasOwnProperty("architecture"))
            object.architecture = options.enums === String ? $root.device.DeviceInfo.Applications.Arch[message.architecture] : message.architecture;
          if (message.installDomain != null && message.hasOwnProperty("installDomain"))
            object.installDomain = options.enums === String ? $root.device.DeviceInfo.Applications.InstallDomain[message.installDomain] : message.installDomain;
          if (message.identifier != null && message.hasOwnProperty("identifier"))
            object.identifier = $root.device.StringMaybe.toObject(message.identifier, options);
          if (message.name != null && message.hasOwnProperty("name"))
            object.name = $root.device.StringMaybe.toObject(message.name, options);
          if (message.version != null && message.hasOwnProperty("version"))
            object.version = $root.device.StringMaybe.toObject(message.version, options);
          if (message.publisher != null && message.hasOwnProperty("publisher"))
            object.publisher = $root.device.StringMaybe.toObject(message.publisher, options);
          if (message.installLocation != null && message.hasOwnProperty("installLocation"))
            object.installLocation = $root.device.StringMaybe.toObject(message.installLocation, options);
          if (message.installDate != null && message.hasOwnProperty("installDate"))
            object.installDate = $root.device.StringMaybe.toObject(message.installDate, options);
          if (message.language != null && message.hasOwnProperty("language"))
            object.language = $root.device.StringMaybe.toObject(message.language, options);
          return object;
        };
        Software.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return Software;
      }();
      Applications.InstallDomain = function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "DOMAIN_UNSUPPORTED"] = 0;
        values[valuesById[1] = "DOMAIN_UNKNOWN"] = 1;
        values[valuesById[2] = "DOMAIN_USER"] = 2;
        values[valuesById[3] = "DOMAIN_MACHINE"] = 3;
        return values;
      }();
      Applications.Arch = function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ARCH_UNSUPPORTED"] = 0;
        values[valuesById[1] = "ARCH_UNKNOWN"] = 1;
        values[valuesById[2] = "ARCH_BIT32"] = 2;
        values[valuesById[3] = "ARCH_BIT64"] = 3;
        return values;
      }();
      return Applications;
    }();
    DeviceInfo.OSVersion = function() {
      function OSVersion(properties) {
        if (properties) {
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
        }
      }
      OSVersion.prototype.answer = null;
      OSVersion.prototype.major = null;
      OSVersion.prototype.minor = null;
      OSVersion.prototype.build = null;
      OSVersion.prototype.patch = null;
      OSVersion.prototype.rsrPatch = null;
      OSVersion.prototype.versionExtra = null;
      OSVersion.prototype.revision = null;
      OSVersion.prototype.servicePack = null;
      OSVersion.prototype.isServer = null;
      OSVersion.prototype.sdk = null;
      OSVersion.prototype.previewSdk = null;
      OSVersion.prototype.incremental = null;
      OSVersion.prototype.securityPatch = null;
      OSVersion.prototype.userAgent = null;
      OSVersion.prototype.userAgentData = null;
      OSVersion.create = function create(properties) {
        return new OSVersion(properties);
      };
      OSVersion.encode = function encode(message, writer) {
        if (!writer)
          writer = $Writer.create();
        if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
          $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
        if (message.major != null && Object.hasOwnProperty.call(message, "major"))
          $root.device.Int32Maybe.encode(message.major, writer.uint32(18).fork()).ldelim();
        if (message.minor != null && Object.hasOwnProperty.call(message, "minor"))
          $root.device.Int32Maybe.encode(message.minor, writer.uint32(26).fork()).ldelim();
        if (message.build != null && Object.hasOwnProperty.call(message, "build"))
          $root.device.StringMaybe.encode(message.build, writer.uint32(34).fork()).ldelim();
        if (message.patch != null && Object.hasOwnProperty.call(message, "patch"))
          $root.device.Int32Maybe.encode(message.patch, writer.uint32(42).fork()).ldelim();
        if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
          $root.device.Int32Maybe.encode(message.revision, writer.uint32(50).fork()).ldelim();
        if (message.servicePack != null && Object.hasOwnProperty.call(message, "servicePack"))
          $root.device.StringMaybe.encode(message.servicePack, writer.uint32(58).fork()).ldelim();
        if (message.isServer != null && Object.hasOwnProperty.call(message, "isServer"))
          $root.device.BoolMaybe.encode(message.isServer, writer.uint32(66).fork()).ldelim();
        if (message.sdk != null && Object.hasOwnProperty.call(message, "sdk"))
          $root.device.Int32Maybe.encode(message.sdk, writer.uint32(74).fork()).ldelim();
        if (message.previewSdk != null && Object.hasOwnProperty.call(message, "previewSdk"))
          $root.device.Int32Maybe.encode(message.previewSdk, writer.uint32(82).fork()).ldelim();
        if (message.incremental != null && Object.hasOwnProperty.call(message, "incremental"))
          $root.device.StringMaybe.encode(message.incremental, writer.uint32(90).fork()).ldelim();
        if (message.securityPatch != null && Object.hasOwnProperty.call(message, "securityPatch"))
          $root.device.StringMaybe.encode(message.securityPatch, writer.uint32(98).fork()).ldelim();
        if (message.userAgent != null && Object.hasOwnProperty.call(message, "userAgent"))
          $root.device.StringMaybe.encode(message.userAgent, writer.uint32(106).fork()).ldelim();
        if (message.userAgentData != null && Object.hasOwnProperty.call(message, "userAgentData"))
          $root.device.DeviceInfo.OSVersion.UserAgentData.encode(message.userAgentData, writer.uint32(114).fork()).ldelim();
        if (message.rsrPatch != null && Object.hasOwnProperty.call(message, "rsrPatch"))
          $root.device.StringMaybe.encode(message.rsrPatch, writer.uint32(122).fork()).ldelim();
        if (message.versionExtra != null && Object.hasOwnProperty.call(message, "versionExtra"))
          $root.device.StringMaybe.encode(message.versionExtra, writer.uint32(130).fork()).ldelim();
        return writer;
      };
      OSVersion.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      OSVersion.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
          reader = $Reader.create(reader);
        let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.OSVersion();
        while (reader.pos < end) {
          let tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              message.answer = $root.device.Answer.decode(reader, reader.uint32());
              break;
            case 2:
              message.major = $root.device.Int32Maybe.decode(reader, reader.uint32());
              break;
            case 3:
              message.minor = $root.device.Int32Maybe.decode(reader, reader.uint32());
              break;
            case 4:
              message.build = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            case 5:
              message.patch = $root.device.Int32Maybe.decode(reader, reader.uint32());
              break;
            case 15:
              message.rsrPatch = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            case 16:
              message.versionExtra = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            case 6:
              message.revision = $root.device.Int32Maybe.decode(reader, reader.uint32());
              break;
            case 7:
              message.servicePack = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            case 8:
              message.isServer = $root.device.BoolMaybe.decode(reader, reader.uint32());
              break;
            case 9:
              message.sdk = $root.device.Int32Maybe.decode(reader, reader.uint32());
              break;
            case 10:
              message.previewSdk = $root.device.Int32Maybe.decode(reader, reader.uint32());
              break;
            case 11:
              message.incremental = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            case 12:
              message.securityPatch = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            case 13:
              message.userAgent = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            case 14:
              message.userAgentData = $root.device.DeviceInfo.OSVersion.UserAgentData.decode(reader, reader.uint32());
              break;
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return message;
      };
      OSVersion.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
          reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      OSVersion.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        if (message.answer != null && message.hasOwnProperty("answer")) {
          let error = $root.device.Answer.verify(message.answer);
          if (error)
            return "answer." + error;
        }
        if (message.major != null && message.hasOwnProperty("major")) {
          let error = $root.device.Int32Maybe.verify(message.major);
          if (error)
            return "major." + error;
        }
        if (message.minor != null && message.hasOwnProperty("minor")) {
          let error = $root.device.Int32Maybe.verify(message.minor);
          if (error)
            return "minor." + error;
        }
        if (message.build != null && message.hasOwnProperty("build")) {
          let error = $root.device.StringMaybe.verify(message.build);
          if (error)
            return "build." + error;
        }
        if (message.patch != null && message.hasOwnProperty("patch")) {
          let error = $root.device.Int32Maybe.verify(message.patch);
          if (error)
            return "patch." + error;
        }
        if (message.rsrPatch != null && message.hasOwnProperty("rsrPatch")) {
          let error = $root.device.StringMaybe.verify(message.rsrPatch);
          if (error)
            return "rsrPatch." + error;
        }
        if (message.versionExtra != null && message.hasOwnProperty("versionExtra")) {
          let error = $root.device.StringMaybe.verify(message.versionExtra);
          if (error)
            return "versionExtra." + error;
        }
        if (message.revision != null && message.hasOwnProperty("revision")) {
          let error = $root.device.Int32Maybe.verify(message.revision);
          if (error)
            return "revision." + error;
        }
        if (message.servicePack != null && message.hasOwnProperty("servicePack")) {
          let error = $root.device.StringMaybe.verify(message.servicePack);
          if (error)
            return "servicePack." + error;
        }
        if (message.isServer != null && message.hasOwnProperty("isServer")) {
          let error = $root.device.BoolMaybe.verify(message.isServer);
          if (error)
            return "isServer." + error;
        }
        if (message.sdk != null && message.hasOwnProperty("sdk")) {
          let error = $root.device.Int32Maybe.verify(message.sdk);
          if (error)
            return "sdk." + error;
        }
        if (message.previewSdk != null && message.hasOwnProperty("previewSdk")) {
          let error = $root.device.Int32Maybe.verify(message.previewSdk);
          if (error)
            return "previewSdk." + error;
        }
        if (message.incremental != null && message.hasOwnProperty("incremental")) {
          let error = $root.device.StringMaybe.verify(message.incremental);
          if (error)
            return "incremental." + error;
        }
        if (message.securityPatch != null && message.hasOwnProperty("securityPatch")) {
          let error = $root.device.StringMaybe.verify(message.securityPatch);
          if (error)
            return "securityPatch." + error;
        }
        if (message.userAgent != null && message.hasOwnProperty("userAgent")) {
          let error = $root.device.StringMaybe.verify(message.userAgent);
          if (error)
            return "userAgent." + error;
        }
        if (message.userAgentData != null && message.hasOwnProperty("userAgentData")) {
          let error = $root.device.DeviceInfo.OSVersion.UserAgentData.verify(message.userAgentData);
          if (error)
            return "userAgentData." + error;
        }
        return null;
      };
      OSVersion.fromObject = function fromObject(object) {
        if (object instanceof $root.device.DeviceInfo.OSVersion)
          return object;
        let message = new $root.device.DeviceInfo.OSVersion();
        if (object.answer != null) {
          if (typeof object.answer !== "object")
            throw TypeError(".device.DeviceInfo.OSVersion.answer: object expected");
          message.answer = $root.device.Answer.fromObject(object.answer);
        }
        if (object.major != null) {
          if (typeof object.major !== "object")
            throw TypeError(".device.DeviceInfo.OSVersion.major: object expected");
          message.major = $root.device.Int32Maybe.fromObject(object.major);
        }
        if (object.minor != null) {
          if (typeof object.minor !== "object")
            throw TypeError(".device.DeviceInfo.OSVersion.minor: object expected");
          message.minor = $root.device.Int32Maybe.fromObject(object.minor);
        }
        if (object.build != null) {
          if (typeof object.build !== "object")
            throw TypeError(".device.DeviceInfo.OSVersion.build: object expected");
          message.build = $root.device.StringMaybe.fromObject(object.build);
        }
        if (object.patch != null) {
          if (typeof object.patch !== "object")
            throw TypeError(".device.DeviceInfo.OSVersion.patch: object expected");
          message.patch = $root.device.Int32Maybe.fromObject(object.patch);
        }
        if (object.rsrPatch != null) {
          if (typeof object.rsrPatch !== "object")
            throw TypeError(".device.DeviceInfo.OSVersion.rsrPatch: object expected");
          message.rsrPatch = $root.device.StringMaybe.fromObject(object.rsrPatch);
        }
        if (object.versionExtra != null) {
          if (typeof object.versionExtra !== "object")
            throw TypeError(".device.DeviceInfo.OSVersion.versionExtra: object expected");
          message.versionExtra = $root.device.StringMaybe.fromObject(object.versionExtra);
        }
        if (object.revision != null) {
          if (typeof object.revision !== "object")
            throw TypeError(".device.DeviceInfo.OSVersion.revision: object expected");
          message.revision = $root.device.Int32Maybe.fromObject(object.revision);
        }
        if (object.servicePack != null) {
          if (typeof object.servicePack !== "object")
            throw TypeError(".device.DeviceInfo.OSVersion.servicePack: object expected");
          message.servicePack = $root.device.StringMaybe.fromObject(object.servicePack);
        }
        if (object.isServer != null) {
          if (typeof object.isServer !== "object")
            throw TypeError(".device.DeviceInfo.OSVersion.isServer: object expected");
          message.isServer = $root.device.BoolMaybe.fromObject(object.isServer);
        }
        if (object.sdk != null) {
          if (typeof object.sdk !== "object")
            throw TypeError(".device.DeviceInfo.OSVersion.sdk: object expected");
          message.sdk = $root.device.Int32Maybe.fromObject(object.sdk);
        }
        if (object.previewSdk != null) {
          if (typeof object.previewSdk !== "object")
            throw TypeError(".device.DeviceInfo.OSVersion.previewSdk: object expected");
          message.previewSdk = $root.device.Int32Maybe.fromObject(object.previewSdk);
        }
        if (object.incremental != null) {
          if (typeof object.incremental !== "object")
            throw TypeError(".device.DeviceInfo.OSVersion.incremental: object expected");
          message.incremental = $root.device.StringMaybe.fromObject(object.incremental);
        }
        if (object.securityPatch != null) {
          if (typeof object.securityPatch !== "object")
            throw TypeError(".device.DeviceInfo.OSVersion.securityPatch: object expected");
          message.securityPatch = $root.device.StringMaybe.fromObject(object.securityPatch);
        }
        if (object.userAgent != null) {
          if (typeof object.userAgent !== "object")
            throw TypeError(".device.DeviceInfo.OSVersion.userAgent: object expected");
          message.userAgent = $root.device.StringMaybe.fromObject(object.userAgent);
        }
        if (object.userAgentData != null) {
          if (typeof object.userAgentData !== "object")
            throw TypeError(".device.DeviceInfo.OSVersion.userAgentData: object expected");
          message.userAgentData = $root.device.DeviceInfo.OSVersion.UserAgentData.fromObject(object.userAgentData);
        }
        return message;
      };
      OSVersion.toObject = function toObject(message, options) {
        if (!options)
          options = {};
        let object = {};
        if (options.defaults) {
          object.answer = null;
          object.major = null;
          object.minor = null;
          object.build = null;
          object.patch = null;
          object.revision = null;
          object.servicePack = null;
          object.isServer = null;
          object.sdk = null;
          object.previewSdk = null;
          object.incremental = null;
          object.securityPatch = null;
          object.userAgent = null;
          object.userAgentData = null;
          object.rsrPatch = null;
          object.versionExtra = null;
        }
        if (message.answer != null && message.hasOwnProperty("answer"))
          object.answer = $root.device.Answer.toObject(message.answer, options);
        if (message.major != null && message.hasOwnProperty("major"))
          object.major = $root.device.Int32Maybe.toObject(message.major, options);
        if (message.minor != null && message.hasOwnProperty("minor"))
          object.minor = $root.device.Int32Maybe.toObject(message.minor, options);
        if (message.build != null && message.hasOwnProperty("build"))
          object.build = $root.device.StringMaybe.toObject(message.build, options);
        if (message.patch != null && message.hasOwnProperty("patch"))
          object.patch = $root.device.Int32Maybe.toObject(message.patch, options);
        if (message.revision != null && message.hasOwnProperty("revision"))
          object.revision = $root.device.Int32Maybe.toObject(message.revision, options);
        if (message.servicePack != null && message.hasOwnProperty("servicePack"))
          object.servicePack = $root.device.StringMaybe.toObject(message.servicePack, options);
        if (message.isServer != null && message.hasOwnProperty("isServer"))
          object.isServer = $root.device.BoolMaybe.toObject(message.isServer, options);
        if (message.sdk != null && message.hasOwnProperty("sdk"))
          object.sdk = $root.device.Int32Maybe.toObject(message.sdk, options);
        if (message.previewSdk != null && message.hasOwnProperty("previewSdk"))
          object.previewSdk = $root.device.Int32Maybe.toObject(message.previewSdk, options);
        if (message.incremental != null && message.hasOwnProperty("incremental"))
          object.incremental = $root.device.StringMaybe.toObject(message.incremental, options);
        if (message.securityPatch != null && message.hasOwnProperty("securityPatch"))
          object.securityPatch = $root.device.StringMaybe.toObject(message.securityPatch, options);
        if (message.userAgent != null && message.hasOwnProperty("userAgent"))
          object.userAgent = $root.device.StringMaybe.toObject(message.userAgent, options);
        if (message.userAgentData != null && message.hasOwnProperty("userAgentData"))
          object.userAgentData = $root.device.DeviceInfo.OSVersion.UserAgentData.toObject(message.userAgentData, options);
        if (message.rsrPatch != null && message.hasOwnProperty("rsrPatch"))
          object.rsrPatch = $root.device.StringMaybe.toObject(message.rsrPatch, options);
        if (message.versionExtra != null && message.hasOwnProperty("versionExtra"))
          object.versionExtra = $root.device.StringMaybe.toObject(message.versionExtra, options);
        return object;
      };
      OSVersion.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };
      OSVersion.UserAgentData = function() {
        function UserAgentData(properties) {
          if (properties) {
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
          }
        }
        UserAgentData.prototype.answer = null;
        UserAgentData.prototype.browser = null;
        UserAgentData.prototype.platform = null;
        UserAgentData.prototype.hostPlatform = null;
        UserAgentData.prototype.device = null;
        UserAgentData.prototype.clientData = null;
        UserAgentData.create = function create(properties) {
          return new UserAgentData(properties);
        };
        UserAgentData.encode = function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
            $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
          if (message.browser != null && Object.hasOwnProperty.call(message, "browser"))
            $root.device.DeviceInfo.OSVersion.UserAgentData.Browser.encode(message.browser, writer.uint32(18).fork()).ldelim();
          if (message.platform != null && Object.hasOwnProperty.call(message, "platform"))
            $root.device.DeviceInfo.OSVersion.UserAgentData.HostPlatform.encode(message.platform, writer.uint32(26).fork()).ldelim();
          if (message.device != null && Object.hasOwnProperty.call(message, "device"))
            $root.device.DeviceInfo.OSVersion.UserAgentData.Device.encode(message.device, writer.uint32(34).fork()).ldelim();
          if (message.clientData != null && Object.hasOwnProperty.call(message, "clientData"))
            $root.device.DeviceInfo.OSVersion.UserAgentData.ClientData.encode(message.clientData, writer.uint32(42).fork()).ldelim();
          if (message.hostPlatform != null && Object.hasOwnProperty.call(message, "hostPlatform"))
            $root.device.DeviceInfo.OSVersion.UserAgentData.HostPlatform.encode(message.hostPlatform, writer.uint32(50).fork()).ldelim();
          return writer;
        };
        UserAgentData.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        UserAgentData.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.OSVersion.UserAgentData();
          while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.answer = $root.device.Answer.decode(reader, reader.uint32());
                break;
              case 2:
                message.browser = $root.device.DeviceInfo.OSVersion.UserAgentData.Browser.decode(reader, reader.uint32());
                break;
              case 3:
                message.platform = $root.device.DeviceInfo.OSVersion.UserAgentData.HostPlatform.decode(reader, reader.uint32());
                break;
              case 6:
                message.hostPlatform = $root.device.DeviceInfo.OSVersion.UserAgentData.HostPlatform.decode(reader, reader.uint32());
                break;
              case 4:
                message.device = $root.device.DeviceInfo.OSVersion.UserAgentData.Device.decode(reader, reader.uint32());
                break;
              case 5:
                message.clientData = $root.device.DeviceInfo.OSVersion.UserAgentData.ClientData.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };
        UserAgentData.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };
        UserAgentData.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.answer != null && message.hasOwnProperty("answer")) {
            let error = $root.device.Answer.verify(message.answer);
            if (error)
              return "answer." + error;
          }
          if (message.browser != null && message.hasOwnProperty("browser")) {
            let error = $root.device.DeviceInfo.OSVersion.UserAgentData.Browser.verify(message.browser);
            if (error)
              return "browser." + error;
          }
          if (message.platform != null && message.hasOwnProperty("platform")) {
            let error = $root.device.DeviceInfo.OSVersion.UserAgentData.HostPlatform.verify(message.platform);
            if (error)
              return "platform." + error;
          }
          if (message.hostPlatform != null && message.hasOwnProperty("hostPlatform")) {
            let error = $root.device.DeviceInfo.OSVersion.UserAgentData.HostPlatform.verify(message.hostPlatform);
            if (error)
              return "hostPlatform." + error;
          }
          if (message.device != null && message.hasOwnProperty("device")) {
            let error = $root.device.DeviceInfo.OSVersion.UserAgentData.Device.verify(message.device);
            if (error)
              return "device." + error;
          }
          if (message.clientData != null && message.hasOwnProperty("clientData")) {
            let error = $root.device.DeviceInfo.OSVersion.UserAgentData.ClientData.verify(message.clientData);
            if (error)
              return "clientData." + error;
          }
          return null;
        };
        UserAgentData.fromObject = function fromObject(object) {
          if (object instanceof $root.device.DeviceInfo.OSVersion.UserAgentData)
            return object;
          let message = new $root.device.DeviceInfo.OSVersion.UserAgentData();
          if (object.answer != null) {
            if (typeof object.answer !== "object")
              throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.answer: object expected");
            message.answer = $root.device.Answer.fromObject(object.answer);
          }
          if (object.browser != null) {
            if (typeof object.browser !== "object")
              throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.browser: object expected");
            message.browser = $root.device.DeviceInfo.OSVersion.UserAgentData.Browser.fromObject(object.browser);
          }
          if (object.platform != null) {
            if (typeof object.platform !== "object")
              throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.platform: object expected");
            message.platform = $root.device.DeviceInfo.OSVersion.UserAgentData.HostPlatform.fromObject(object.platform);
          }
          if (object.hostPlatform != null) {
            if (typeof object.hostPlatform !== "object")
              throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.hostPlatform: object expected");
            message.hostPlatform = $root.device.DeviceInfo.OSVersion.UserAgentData.HostPlatform.fromObject(object.hostPlatform);
          }
          if (object.device != null) {
            if (typeof object.device !== "object")
              throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.device: object expected");
            message.device = $root.device.DeviceInfo.OSVersion.UserAgentData.Device.fromObject(object.device);
          }
          if (object.clientData != null) {
            if (typeof object.clientData !== "object")
              throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.clientData: object expected");
            message.clientData = $root.device.DeviceInfo.OSVersion.UserAgentData.ClientData.fromObject(object.clientData);
          }
          return message;
        };
        UserAgentData.toObject = function toObject(message, options) {
          if (!options)
            options = {};
          let object = {};
          if (options.defaults) {
            object.answer = null;
            object.browser = null;
            object.platform = null;
            object.device = null;
            object.clientData = null;
            object.hostPlatform = null;
          }
          if (message.answer != null && message.hasOwnProperty("answer"))
            object.answer = $root.device.Answer.toObject(message.answer, options);
          if (message.browser != null && message.hasOwnProperty("browser"))
            object.browser = $root.device.DeviceInfo.OSVersion.UserAgentData.Browser.toObject(message.browser, options);
          if (message.platform != null && message.hasOwnProperty("platform"))
            object.platform = $root.device.DeviceInfo.OSVersion.UserAgentData.HostPlatform.toObject(message.platform, options);
          if (message.device != null && message.hasOwnProperty("device"))
            object.device = $root.device.DeviceInfo.OSVersion.UserAgentData.Device.toObject(message.device, options);
          if (message.clientData != null && message.hasOwnProperty("clientData"))
            object.clientData = $root.device.DeviceInfo.OSVersion.UserAgentData.ClientData.toObject(message.clientData, options);
          if (message.hostPlatform != null && message.hasOwnProperty("hostPlatform"))
            object.hostPlatform = $root.device.DeviceInfo.OSVersion.UserAgentData.HostPlatform.toObject(message.hostPlatform, options);
          return object;
        };
        UserAgentData.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        UserAgentData.Browser = function() {
          function Browser(properties) {
            if (properties) {
              for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                  this[keys[i]] = properties[keys[i]];
            }
          }
          Browser.prototype.answer = null;
          Browser.prototype.name = null;
          Browser.prototype.version = null;
          Browser.prototype.engineName = null;
          Browser.prototype.engineVersion = null;
          Browser.create = function create(properties) {
            return new Browser(properties);
          };
          Browser.encode = function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
              $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
              $root.device.StringMaybe.encode(message.name, writer.uint32(18).fork()).ldelim();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
              $root.device.StringMaybe.encode(message.version, writer.uint32(26).fork()).ldelim();
            if (message.engineName != null && Object.hasOwnProperty.call(message, "engineName"))
              $root.device.StringMaybe.encode(message.engineName, writer.uint32(34).fork()).ldelim();
            if (message.engineVersion != null && Object.hasOwnProperty.call(message, "engineVersion"))
              $root.device.StringMaybe.encode(message.engineVersion, writer.uint32(42).fork()).ldelim();
            return writer;
          };
          Browser.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          };
          Browser.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.OSVersion.UserAgentData.Browser();
            while (reader.pos < end) {
              let tag = reader.uint32();
              switch (tag >>> 3) {
                case 1:
                  message.answer = $root.device.Answer.decode(reader, reader.uint32());
                  break;
                case 2:
                  message.name = $root.device.StringMaybe.decode(reader, reader.uint32());
                  break;
                case 3:
                  message.version = $root.device.StringMaybe.decode(reader, reader.uint32());
                  break;
                case 4:
                  message.engineName = $root.device.StringMaybe.decode(reader, reader.uint32());
                  break;
                case 5:
                  message.engineVersion = $root.device.StringMaybe.decode(reader, reader.uint32());
                  break;
                default:
                  reader.skipType(tag & 7);
                  break;
              }
            }
            return message;
          };
          Browser.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };
          Browser.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (message.answer != null && message.hasOwnProperty("answer")) {
              let error = $root.device.Answer.verify(message.answer);
              if (error)
                return "answer." + error;
            }
            if (message.name != null && message.hasOwnProperty("name")) {
              let error = $root.device.StringMaybe.verify(message.name);
              if (error)
                return "name." + error;
            }
            if (message.version != null && message.hasOwnProperty("version")) {
              let error = $root.device.StringMaybe.verify(message.version);
              if (error)
                return "version." + error;
            }
            if (message.engineName != null && message.hasOwnProperty("engineName")) {
              let error = $root.device.StringMaybe.verify(message.engineName);
              if (error)
                return "engineName." + error;
            }
            if (message.engineVersion != null && message.hasOwnProperty("engineVersion")) {
              let error = $root.device.StringMaybe.verify(message.engineVersion);
              if (error)
                return "engineVersion." + error;
            }
            return null;
          };
          Browser.fromObject = function fromObject(object) {
            if (object instanceof $root.device.DeviceInfo.OSVersion.UserAgentData.Browser)
              return object;
            let message = new $root.device.DeviceInfo.OSVersion.UserAgentData.Browser();
            if (object.answer != null) {
              if (typeof object.answer !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.Browser.answer: object expected");
              message.answer = $root.device.Answer.fromObject(object.answer);
            }
            if (object.name != null) {
              if (typeof object.name !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.Browser.name: object expected");
              message.name = $root.device.StringMaybe.fromObject(object.name);
            }
            if (object.version != null) {
              if (typeof object.version !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.Browser.version: object expected");
              message.version = $root.device.StringMaybe.fromObject(object.version);
            }
            if (object.engineName != null) {
              if (typeof object.engineName !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.Browser.engineName: object expected");
              message.engineName = $root.device.StringMaybe.fromObject(object.engineName);
            }
            if (object.engineVersion != null) {
              if (typeof object.engineVersion !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.Browser.engineVersion: object expected");
              message.engineVersion = $root.device.StringMaybe.fromObject(object.engineVersion);
            }
            return message;
          };
          Browser.toObject = function toObject(message, options) {
            if (!options)
              options = {};
            let object = {};
            if (options.defaults) {
              object.answer = null;
              object.name = null;
              object.version = null;
              object.engineName = null;
              object.engineVersion = null;
            }
            if (message.answer != null && message.hasOwnProperty("answer"))
              object.answer = $root.device.Answer.toObject(message.answer, options);
            if (message.name != null && message.hasOwnProperty("name"))
              object.name = $root.device.StringMaybe.toObject(message.name, options);
            if (message.version != null && message.hasOwnProperty("version"))
              object.version = $root.device.StringMaybe.toObject(message.version, options);
            if (message.engineName != null && message.hasOwnProperty("engineName"))
              object.engineName = $root.device.StringMaybe.toObject(message.engineName, options);
            if (message.engineVersion != null && message.hasOwnProperty("engineVersion"))
              object.engineVersion = $root.device.StringMaybe.toObject(message.engineVersion, options);
            return object;
          };
          Browser.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          };
          return Browser;
        }();
        UserAgentData.HostPlatform = function() {
          function HostPlatform(properties) {
            if (properties) {
              for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                  this[keys[i]] = properties[keys[i]];
            }
          }
          HostPlatform.prototype.answer = null;
          HostPlatform.prototype.name = null;
          HostPlatform.prototype.version = null;
          HostPlatform.create = function create(properties) {
            return new HostPlatform(properties);
          };
          HostPlatform.encode = function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
              $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
              $root.device.StringMaybe.encode(message.name, writer.uint32(18).fork()).ldelim();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
              $root.device.StringMaybe.encode(message.version, writer.uint32(26).fork()).ldelim();
            return writer;
          };
          HostPlatform.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          };
          HostPlatform.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.OSVersion.UserAgentData.HostPlatform();
            while (reader.pos < end) {
              let tag = reader.uint32();
              switch (tag >>> 3) {
                case 1:
                  message.answer = $root.device.Answer.decode(reader, reader.uint32());
                  break;
                case 2:
                  message.name = $root.device.StringMaybe.decode(reader, reader.uint32());
                  break;
                case 3:
                  message.version = $root.device.StringMaybe.decode(reader, reader.uint32());
                  break;
                default:
                  reader.skipType(tag & 7);
                  break;
              }
            }
            return message;
          };
          HostPlatform.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };
          HostPlatform.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (message.answer != null && message.hasOwnProperty("answer")) {
              let error = $root.device.Answer.verify(message.answer);
              if (error)
                return "answer." + error;
            }
            if (message.name != null && message.hasOwnProperty("name")) {
              let error = $root.device.StringMaybe.verify(message.name);
              if (error)
                return "name." + error;
            }
            if (message.version != null && message.hasOwnProperty("version")) {
              let error = $root.device.StringMaybe.verify(message.version);
              if (error)
                return "version." + error;
            }
            return null;
          };
          HostPlatform.fromObject = function fromObject(object) {
            if (object instanceof $root.device.DeviceInfo.OSVersion.UserAgentData.HostPlatform)
              return object;
            let message = new $root.device.DeviceInfo.OSVersion.UserAgentData.HostPlatform();
            if (object.answer != null) {
              if (typeof object.answer !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.HostPlatform.answer: object expected");
              message.answer = $root.device.Answer.fromObject(object.answer);
            }
            if (object.name != null) {
              if (typeof object.name !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.HostPlatform.name: object expected");
              message.name = $root.device.StringMaybe.fromObject(object.name);
            }
            if (object.version != null) {
              if (typeof object.version !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.HostPlatform.version: object expected");
              message.version = $root.device.StringMaybe.fromObject(object.version);
            }
            return message;
          };
          HostPlatform.toObject = function toObject(message, options) {
            if (!options)
              options = {};
            let object = {};
            if (options.defaults) {
              object.answer = null;
              object.name = null;
              object.version = null;
            }
            if (message.answer != null && message.hasOwnProperty("answer"))
              object.answer = $root.device.Answer.toObject(message.answer, options);
            if (message.name != null && message.hasOwnProperty("name"))
              object.name = $root.device.StringMaybe.toObject(message.name, options);
            if (message.version != null && message.hasOwnProperty("version"))
              object.version = $root.device.StringMaybe.toObject(message.version, options);
            return object;
          };
          HostPlatform.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          };
          return HostPlatform;
        }();
        UserAgentData.Device = function() {
          function Device(properties) {
            if (properties) {
              for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                  this[keys[i]] = properties[keys[i]];
            }
          }
          Device.prototype.answer = null;
          Device.prototype.architecture = null;
          Device.prototype.model = null;
          Device.prototype.type = null;
          Device.prototype.vendor = null;
          Device.create = function create(properties) {
            return new Device(properties);
          };
          Device.encode = function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
              $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
            if (message.architecture != null && Object.hasOwnProperty.call(message, "architecture"))
              $root.device.StringMaybe.encode(message.architecture, writer.uint32(18).fork()).ldelim();
            if (message.model != null && Object.hasOwnProperty.call(message, "model"))
              $root.device.StringMaybe.encode(message.model, writer.uint32(26).fork()).ldelim();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
              $root.device.StringMaybe.encode(message.type, writer.uint32(34).fork()).ldelim();
            if (message.vendor != null && Object.hasOwnProperty.call(message, "vendor"))
              $root.device.StringMaybe.encode(message.vendor, writer.uint32(42).fork()).ldelim();
            return writer;
          };
          Device.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          };
          Device.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.OSVersion.UserAgentData.Device();
            while (reader.pos < end) {
              let tag = reader.uint32();
              switch (tag >>> 3) {
                case 1:
                  message.answer = $root.device.Answer.decode(reader, reader.uint32());
                  break;
                case 2:
                  message.architecture = $root.device.StringMaybe.decode(reader, reader.uint32());
                  break;
                case 3:
                  message.model = $root.device.StringMaybe.decode(reader, reader.uint32());
                  break;
                case 4:
                  message.type = $root.device.StringMaybe.decode(reader, reader.uint32());
                  break;
                case 5:
                  message.vendor = $root.device.StringMaybe.decode(reader, reader.uint32());
                  break;
                default:
                  reader.skipType(tag & 7);
                  break;
              }
            }
            return message;
          };
          Device.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };
          Device.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (message.answer != null && message.hasOwnProperty("answer")) {
              let error = $root.device.Answer.verify(message.answer);
              if (error)
                return "answer." + error;
            }
            if (message.architecture != null && message.hasOwnProperty("architecture")) {
              let error = $root.device.StringMaybe.verify(message.architecture);
              if (error)
                return "architecture." + error;
            }
            if (message.model != null && message.hasOwnProperty("model")) {
              let error = $root.device.StringMaybe.verify(message.model);
              if (error)
                return "model." + error;
            }
            if (message.type != null && message.hasOwnProperty("type")) {
              let error = $root.device.StringMaybe.verify(message.type);
              if (error)
                return "type." + error;
            }
            if (message.vendor != null && message.hasOwnProperty("vendor")) {
              let error = $root.device.StringMaybe.verify(message.vendor);
              if (error)
                return "vendor." + error;
            }
            return null;
          };
          Device.fromObject = function fromObject(object) {
            if (object instanceof $root.device.DeviceInfo.OSVersion.UserAgentData.Device)
              return object;
            let message = new $root.device.DeviceInfo.OSVersion.UserAgentData.Device();
            if (object.answer != null) {
              if (typeof object.answer !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.Device.answer: object expected");
              message.answer = $root.device.Answer.fromObject(object.answer);
            }
            if (object.architecture != null) {
              if (typeof object.architecture !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.Device.architecture: object expected");
              message.architecture = $root.device.StringMaybe.fromObject(object.architecture);
            }
            if (object.model != null) {
              if (typeof object.model !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.Device.model: object expected");
              message.model = $root.device.StringMaybe.fromObject(object.model);
            }
            if (object.type != null) {
              if (typeof object.type !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.Device.type: object expected");
              message.type = $root.device.StringMaybe.fromObject(object.type);
            }
            if (object.vendor != null) {
              if (typeof object.vendor !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.Device.vendor: object expected");
              message.vendor = $root.device.StringMaybe.fromObject(object.vendor);
            }
            return message;
          };
          Device.toObject = function toObject(message, options) {
            if (!options)
              options = {};
            let object = {};
            if (options.defaults) {
              object.answer = null;
              object.architecture = null;
              object.model = null;
              object.type = null;
              object.vendor = null;
            }
            if (message.answer != null && message.hasOwnProperty("answer"))
              object.answer = $root.device.Answer.toObject(message.answer, options);
            if (message.architecture != null && message.hasOwnProperty("architecture"))
              object.architecture = $root.device.StringMaybe.toObject(message.architecture, options);
            if (message.model != null && message.hasOwnProperty("model"))
              object.model = $root.device.StringMaybe.toObject(message.model, options);
            if (message.type != null && message.hasOwnProperty("type"))
              object.type = $root.device.StringMaybe.toObject(message.type, options);
            if (message.vendor != null && message.hasOwnProperty("vendor"))
              object.vendor = $root.device.StringMaybe.toObject(message.vendor, options);
            return object;
          };
          Device.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          };
          return Device;
        }();
        UserAgentData.ClientData = function() {
          function ClientData(properties) {
            if (properties) {
              for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                  this[keys[i]] = properties[keys[i]];
            }
          }
          ClientData.prototype.answer = null;
          ClientData.prototype.platform = null;
          ClientData.prototype.mobile = null;
          ClientData.prototype.architecture = null;
          ClientData.prototype.bitness = null;
          ClientData.prototype.model = null;
          ClientData.prototype.platformVersion = null;
          ClientData.prototype.uaFullVerson = null;
          ClientData.create = function create(properties) {
            return new ClientData(properties);
          };
          ClientData.encode = function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
              $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
            if (message.platform != null && Object.hasOwnProperty.call(message, "platform"))
              $root.device.StringMaybe.encode(message.platform, writer.uint32(18).fork()).ldelim();
            if (message.mobile != null && Object.hasOwnProperty.call(message, "mobile"))
              $root.device.BoolMaybe.encode(message.mobile, writer.uint32(26).fork()).ldelim();
            if (message.architecture != null && Object.hasOwnProperty.call(message, "architecture"))
              $root.device.StringMaybe.encode(message.architecture, writer.uint32(34).fork()).ldelim();
            if (message.bitness != null && Object.hasOwnProperty.call(message, "bitness"))
              $root.device.StringMaybe.encode(message.bitness, writer.uint32(42).fork()).ldelim();
            if (message.model != null && Object.hasOwnProperty.call(message, "model"))
              $root.device.StringMaybe.encode(message.model, writer.uint32(50).fork()).ldelim();
            if (message.platformVersion != null && Object.hasOwnProperty.call(message, "platformVersion"))
              $root.device.StringMaybe.encode(message.platformVersion, writer.uint32(58).fork()).ldelim();
            if (message.uaFullVerson != null && Object.hasOwnProperty.call(message, "uaFullVerson"))
              $root.device.StringMaybe.encode(message.uaFullVerson, writer.uint32(66).fork()).ldelim();
            return writer;
          };
          ClientData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          };
          ClientData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.OSVersion.UserAgentData.ClientData();
            while (reader.pos < end) {
              let tag = reader.uint32();
              switch (tag >>> 3) {
                case 1:
                  message.answer = $root.device.Answer.decode(reader, reader.uint32());
                  break;
                case 2:
                  message.platform = $root.device.StringMaybe.decode(reader, reader.uint32());
                  break;
                case 3:
                  message.mobile = $root.device.BoolMaybe.decode(reader, reader.uint32());
                  break;
                case 4:
                  message.architecture = $root.device.StringMaybe.decode(reader, reader.uint32());
                  break;
                case 5:
                  message.bitness = $root.device.StringMaybe.decode(reader, reader.uint32());
                  break;
                case 6:
                  message.model = $root.device.StringMaybe.decode(reader, reader.uint32());
                  break;
                case 7:
                  message.platformVersion = $root.device.StringMaybe.decode(reader, reader.uint32());
                  break;
                case 8:
                  message.uaFullVerson = $root.device.StringMaybe.decode(reader, reader.uint32());
                  break;
                default:
                  reader.skipType(tag & 7);
                  break;
              }
            }
            return message;
          };
          ClientData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };
          ClientData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (message.answer != null && message.hasOwnProperty("answer")) {
              let error = $root.device.Answer.verify(message.answer);
              if (error)
                return "answer." + error;
            }
            if (message.platform != null && message.hasOwnProperty("platform")) {
              let error = $root.device.StringMaybe.verify(message.platform);
              if (error)
                return "platform." + error;
            }
            if (message.mobile != null && message.hasOwnProperty("mobile")) {
              let error = $root.device.BoolMaybe.verify(message.mobile);
              if (error)
                return "mobile." + error;
            }
            if (message.architecture != null && message.hasOwnProperty("architecture")) {
              let error = $root.device.StringMaybe.verify(message.architecture);
              if (error)
                return "architecture." + error;
            }
            if (message.bitness != null && message.hasOwnProperty("bitness")) {
              let error = $root.device.StringMaybe.verify(message.bitness);
              if (error)
                return "bitness." + error;
            }
            if (message.model != null && message.hasOwnProperty("model")) {
              let error = $root.device.StringMaybe.verify(message.model);
              if (error)
                return "model." + error;
            }
            if (message.platformVersion != null && message.hasOwnProperty("platformVersion")) {
              let error = $root.device.StringMaybe.verify(message.platformVersion);
              if (error)
                return "platformVersion." + error;
            }
            if (message.uaFullVerson != null && message.hasOwnProperty("uaFullVerson")) {
              let error = $root.device.StringMaybe.verify(message.uaFullVerson);
              if (error)
                return "uaFullVerson." + error;
            }
            return null;
          };
          ClientData.fromObject = function fromObject(object) {
            if (object instanceof $root.device.DeviceInfo.OSVersion.UserAgentData.ClientData)
              return object;
            let message = new $root.device.DeviceInfo.OSVersion.UserAgentData.ClientData();
            if (object.answer != null) {
              if (typeof object.answer !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.ClientData.answer: object expected");
              message.answer = $root.device.Answer.fromObject(object.answer);
            }
            if (object.platform != null) {
              if (typeof object.platform !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.ClientData.platform: object expected");
              message.platform = $root.device.StringMaybe.fromObject(object.platform);
            }
            if (object.mobile != null) {
              if (typeof object.mobile !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.ClientData.mobile: object expected");
              message.mobile = $root.device.BoolMaybe.fromObject(object.mobile);
            }
            if (object.architecture != null) {
              if (typeof object.architecture !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.ClientData.architecture: object expected");
              message.architecture = $root.device.StringMaybe.fromObject(object.architecture);
            }
            if (object.bitness != null) {
              if (typeof object.bitness !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.ClientData.bitness: object expected");
              message.bitness = $root.device.StringMaybe.fromObject(object.bitness);
            }
            if (object.model != null) {
              if (typeof object.model !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.ClientData.model: object expected");
              message.model = $root.device.StringMaybe.fromObject(object.model);
            }
            if (object.platformVersion != null) {
              if (typeof object.platformVersion !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.ClientData.platformVersion: object expected");
              message.platformVersion = $root.device.StringMaybe.fromObject(object.platformVersion);
            }
            if (object.uaFullVerson != null) {
              if (typeof object.uaFullVerson !== "object")
                throw TypeError(".device.DeviceInfo.OSVersion.UserAgentData.ClientData.uaFullVerson: object expected");
              message.uaFullVerson = $root.device.StringMaybe.fromObject(object.uaFullVerson);
            }
            return message;
          };
          ClientData.toObject = function toObject(message, options) {
            if (!options)
              options = {};
            let object = {};
            if (options.defaults) {
              object.answer = null;
              object.platform = null;
              object.mobile = null;
              object.architecture = null;
              object.bitness = null;
              object.model = null;
              object.platformVersion = null;
              object.uaFullVerson = null;
            }
            if (message.answer != null && message.hasOwnProperty("answer"))
              object.answer = $root.device.Answer.toObject(message.answer, options);
            if (message.platform != null && message.hasOwnProperty("platform"))
              object.platform = $root.device.StringMaybe.toObject(message.platform, options);
            if (message.mobile != null && message.hasOwnProperty("mobile"))
              object.mobile = $root.device.BoolMaybe.toObject(message.mobile, options);
            if (message.architecture != null && message.hasOwnProperty("architecture"))
              object.architecture = $root.device.StringMaybe.toObject(message.architecture, options);
            if (message.bitness != null && message.hasOwnProperty("bitness"))
              object.bitness = $root.device.StringMaybe.toObject(message.bitness, options);
            if (message.model != null && message.hasOwnProperty("model"))
              object.model = $root.device.StringMaybe.toObject(message.model, options);
            if (message.platformVersion != null && message.hasOwnProperty("platformVersion"))
              object.platformVersion = $root.device.StringMaybe.toObject(message.platformVersion, options);
            if (message.uaFullVerson != null && message.hasOwnProperty("uaFullVerson"))
              object.uaFullVerson = $root.device.StringMaybe.toObject(message.uaFullVerson, options);
            return object;
          };
          ClientData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          };
          return ClientData;
        }();
        return UserAgentData;
      }();
      return OSVersion;
    }();
    DeviceInfo.BiSdkInfo = function() {
      function BiSdkInfo(properties) {
        if (properties) {
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
        }
      }
      BiSdkInfo.prototype.answer = null;
      BiSdkInfo.prototype.sdkVersion = null;
      BiSdkInfo.prototype.appVersion = null;
      BiSdkInfo.prototype.clientId = null;
      BiSdkInfo.create = function create(properties) {
        return new BiSdkInfo(properties);
      };
      BiSdkInfo.encode = function encode(message, writer) {
        if (!writer)
          writer = $Writer.create();
        if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
          $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
        if (message.sdkVersion != null && Object.hasOwnProperty.call(message, "sdkVersion"))
          $root.device.StringMaybe.encode(message.sdkVersion, writer.uint32(18).fork()).ldelim();
        if (message.appVersion != null && Object.hasOwnProperty.call(message, "appVersion"))
          $root.device.StringMaybe.encode(message.appVersion, writer.uint32(26).fork()).ldelim();
        if (message.clientId != null && Object.hasOwnProperty.call(message, "clientId"))
          $root.device.StringMaybe.encode(message.clientId, writer.uint32(34).fork()).ldelim();
        return writer;
      };
      BiSdkInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      BiSdkInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
          reader = $Reader.create(reader);
        let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.BiSdkInfo();
        while (reader.pos < end) {
          let tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              message.answer = $root.device.Answer.decode(reader, reader.uint32());
              break;
            case 2:
              message.sdkVersion = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            case 3:
              message.appVersion = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            case 4:
              message.clientId = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return message;
      };
      BiSdkInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
          reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      BiSdkInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        if (message.answer != null && message.hasOwnProperty("answer")) {
          let error = $root.device.Answer.verify(message.answer);
          if (error)
            return "answer." + error;
        }
        if (message.sdkVersion != null && message.hasOwnProperty("sdkVersion")) {
          let error = $root.device.StringMaybe.verify(message.sdkVersion);
          if (error)
            return "sdkVersion." + error;
        }
        if (message.appVersion != null && message.hasOwnProperty("appVersion")) {
          let error = $root.device.StringMaybe.verify(message.appVersion);
          if (error)
            return "appVersion." + error;
        }
        if (message.clientId != null && message.hasOwnProperty("clientId")) {
          let error = $root.device.StringMaybe.verify(message.clientId);
          if (error)
            return "clientId." + error;
        }
        return null;
      };
      BiSdkInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.device.DeviceInfo.BiSdkInfo)
          return object;
        let message = new $root.device.DeviceInfo.BiSdkInfo();
        if (object.answer != null) {
          if (typeof object.answer !== "object")
            throw TypeError(".device.DeviceInfo.BiSdkInfo.answer: object expected");
          message.answer = $root.device.Answer.fromObject(object.answer);
        }
        if (object.sdkVersion != null) {
          if (typeof object.sdkVersion !== "object")
            throw TypeError(".device.DeviceInfo.BiSdkInfo.sdkVersion: object expected");
          message.sdkVersion = $root.device.StringMaybe.fromObject(object.sdkVersion);
        }
        if (object.appVersion != null) {
          if (typeof object.appVersion !== "object")
            throw TypeError(".device.DeviceInfo.BiSdkInfo.appVersion: object expected");
          message.appVersion = $root.device.StringMaybe.fromObject(object.appVersion);
        }
        if (object.clientId != null) {
          if (typeof object.clientId !== "object")
            throw TypeError(".device.DeviceInfo.BiSdkInfo.clientId: object expected");
          message.clientId = $root.device.StringMaybe.fromObject(object.clientId);
        }
        return message;
      };
      BiSdkInfo.toObject = function toObject(message, options) {
        if (!options)
          options = {};
        let object = {};
        if (options.defaults) {
          object.answer = null;
          object.sdkVersion = null;
          object.appVersion = null;
          object.clientId = null;
        }
        if (message.answer != null && message.hasOwnProperty("answer"))
          object.answer = $root.device.Answer.toObject(message.answer, options);
        if (message.sdkVersion != null && message.hasOwnProperty("sdkVersion"))
          object.sdkVersion = $root.device.StringMaybe.toObject(message.sdkVersion, options);
        if (message.appVersion != null && message.hasOwnProperty("appVersion"))
          object.appVersion = $root.device.StringMaybe.toObject(message.appVersion, options);
        if (message.clientId != null && message.hasOwnProperty("clientId"))
          object.clientId = $root.device.StringMaybe.toObject(message.clientId, options);
        return object;
      };
      BiSdkInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };
      return BiSdkInfo;
    }();
    DeviceInfo.DeviceType = function() {
      function DeviceType(properties) {
        if (properties) {
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
        }
      }
      DeviceType.prototype.answer = null;
      DeviceType.prototype.model = null;
      DeviceType.prototype.isJailbroken = null;
      DeviceType.prototype.manufacturer = null;
      DeviceType.prototype.isRooted = null;
      DeviceType.create = function create(properties) {
        return new DeviceType(properties);
      };
      DeviceType.encode = function encode(message, writer) {
        if (!writer)
          writer = $Writer.create();
        if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
          $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
        if (message.model != null && Object.hasOwnProperty.call(message, "model"))
          $root.device.StringMaybe.encode(message.model, writer.uint32(18).fork()).ldelim();
        if (message.isJailbroken != null && Object.hasOwnProperty.call(message, "isJailbroken"))
          $root.device.BoolMaybe.encode(message.isJailbroken, writer.uint32(26).fork()).ldelim();
        if (message.manufacturer != null && Object.hasOwnProperty.call(message, "manufacturer"))
          $root.device.StringMaybe.encode(message.manufacturer, writer.uint32(34).fork()).ldelim();
        if (message.isRooted != null && Object.hasOwnProperty.call(message, "isRooted"))
          $root.device.BoolMaybe.encode(message.isRooted, writer.uint32(42).fork()).ldelim();
        return writer;
      };
      DeviceType.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      DeviceType.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
          reader = $Reader.create(reader);
        let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.DeviceType();
        while (reader.pos < end) {
          let tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              message.answer = $root.device.Answer.decode(reader, reader.uint32());
              break;
            case 2:
              message.model = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            case 3:
              message.isJailbroken = $root.device.BoolMaybe.decode(reader, reader.uint32());
              break;
            case 4:
              message.manufacturer = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            case 5:
              message.isRooted = $root.device.BoolMaybe.decode(reader, reader.uint32());
              break;
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return message;
      };
      DeviceType.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
          reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      DeviceType.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        if (message.answer != null && message.hasOwnProperty("answer")) {
          let error = $root.device.Answer.verify(message.answer);
          if (error)
            return "answer." + error;
        }
        if (message.model != null && message.hasOwnProperty("model")) {
          let error = $root.device.StringMaybe.verify(message.model);
          if (error)
            return "model." + error;
        }
        if (message.isJailbroken != null && message.hasOwnProperty("isJailbroken")) {
          let error = $root.device.BoolMaybe.verify(message.isJailbroken);
          if (error)
            return "isJailbroken." + error;
        }
        if (message.manufacturer != null && message.hasOwnProperty("manufacturer")) {
          let error = $root.device.StringMaybe.verify(message.manufacturer);
          if (error)
            return "manufacturer." + error;
        }
        if (message.isRooted != null && message.hasOwnProperty("isRooted")) {
          let error = $root.device.BoolMaybe.verify(message.isRooted);
          if (error)
            return "isRooted." + error;
        }
        return null;
      };
      DeviceType.fromObject = function fromObject(object) {
        if (object instanceof $root.device.DeviceInfo.DeviceType)
          return object;
        let message = new $root.device.DeviceInfo.DeviceType();
        if (object.answer != null) {
          if (typeof object.answer !== "object")
            throw TypeError(".device.DeviceInfo.DeviceType.answer: object expected");
          message.answer = $root.device.Answer.fromObject(object.answer);
        }
        if (object.model != null) {
          if (typeof object.model !== "object")
            throw TypeError(".device.DeviceInfo.DeviceType.model: object expected");
          message.model = $root.device.StringMaybe.fromObject(object.model);
        }
        if (object.isJailbroken != null) {
          if (typeof object.isJailbroken !== "object")
            throw TypeError(".device.DeviceInfo.DeviceType.isJailbroken: object expected");
          message.isJailbroken = $root.device.BoolMaybe.fromObject(object.isJailbroken);
        }
        if (object.manufacturer != null) {
          if (typeof object.manufacturer !== "object")
            throw TypeError(".device.DeviceInfo.DeviceType.manufacturer: object expected");
          message.manufacturer = $root.device.StringMaybe.fromObject(object.manufacturer);
        }
        if (object.isRooted != null) {
          if (typeof object.isRooted !== "object")
            throw TypeError(".device.DeviceInfo.DeviceType.isRooted: object expected");
          message.isRooted = $root.device.BoolMaybe.fromObject(object.isRooted);
        }
        return message;
      };
      DeviceType.toObject = function toObject(message, options) {
        if (!options)
          options = {};
        let object = {};
        if (options.defaults) {
          object.answer = null;
          object.model = null;
          object.isJailbroken = null;
          object.manufacturer = null;
          object.isRooted = null;
        }
        if (message.answer != null && message.hasOwnProperty("answer"))
          object.answer = $root.device.Answer.toObject(message.answer, options);
        if (message.model != null && message.hasOwnProperty("model"))
          object.model = $root.device.StringMaybe.toObject(message.model, options);
        if (message.isJailbroken != null && message.hasOwnProperty("isJailbroken"))
          object.isJailbroken = $root.device.BoolMaybe.toObject(message.isJailbroken, options);
        if (message.manufacturer != null && message.hasOwnProperty("manufacturer"))
          object.manufacturer = $root.device.StringMaybe.toObject(message.manufacturer, options);
        if (message.isRooted != null && message.hasOwnProperty("isRooted"))
          object.isRooted = $root.device.BoolMaybe.toObject(message.isRooted, options);
        return object;
      };
      DeviceType.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };
      return DeviceType;
    }();
    DeviceInfo.Authentication = function() {
      function Authentication(properties) {
        if (properties) {
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
        }
      }
      Authentication.prototype.answer = null;
      Authentication.prototype.loginProviderName = null;
      Authentication.prototype.loginProviderGuid = null;
      Authentication.prototype.isTpmAvailable = null;
      Authentication.prototype.isPasswordSet = null;
      Authentication.prototype.isBiometricsSet = null;
      Authentication.prototype.isWatchAuthenticationEnabled = null;
      Authentication.prototype.watchDeviceState = 0;
      Authentication.prototype.isSecureEnclaveAvailable = null;
      Authentication.prototype.isWebauthnAvailable = null;
      Authentication.prototype.isPlatformAuthenticatorAvailable = null;
      Authentication.create = function create(properties) {
        return new Authentication(properties);
      };
      Authentication.encode = function encode(message, writer) {
        if (!writer)
          writer = $Writer.create();
        if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
          $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
        if (message.loginProviderName != null && Object.hasOwnProperty.call(message, "loginProviderName"))
          $root.device.StringMaybe.encode(message.loginProviderName, writer.uint32(18).fork()).ldelim();
        if (message.loginProviderGuid != null && Object.hasOwnProperty.call(message, "loginProviderGuid"))
          $root.device.StringMaybe.encode(message.loginProviderGuid, writer.uint32(26).fork()).ldelim();
        if (message.isTpmAvailable != null && Object.hasOwnProperty.call(message, "isTpmAvailable"))
          $root.device.BoolMaybe.encode(message.isTpmAvailable, writer.uint32(34).fork()).ldelim();
        if (message.isPasswordSet != null && Object.hasOwnProperty.call(message, "isPasswordSet"))
          $root.device.BoolMaybe.encode(message.isPasswordSet, writer.uint32(42).fork()).ldelim();
        if (message.isBiometricsSet != null && Object.hasOwnProperty.call(message, "isBiometricsSet"))
          $root.device.BoolMaybe.encode(message.isBiometricsSet, writer.uint32(50).fork()).ldelim();
        if (message.isWatchAuthenticationEnabled != null && Object.hasOwnProperty.call(message, "isWatchAuthenticationEnabled"))
          $root.device.BoolMaybe.encode(message.isWatchAuthenticationEnabled, writer.uint32(58).fork()).ldelim();
        if (message.isSecureEnclaveAvailable != null && Object.hasOwnProperty.call(message, "isSecureEnclaveAvailable"))
          $root.device.BoolMaybe.encode(message.isSecureEnclaveAvailable, writer.uint32(66).fork()).ldelim();
        if (message.isWebauthnAvailable != null && Object.hasOwnProperty.call(message, "isWebauthnAvailable"))
          $root.device.BoolMaybe.encode(message.isWebauthnAvailable, writer.uint32(74).fork()).ldelim();
        if (message.isPlatformAuthenticatorAvailable != null && Object.hasOwnProperty.call(message, "isPlatformAuthenticatorAvailable"))
          $root.device.BoolMaybe.encode(message.isPlatformAuthenticatorAvailable, writer.uint32(82).fork()).ldelim();
        if (message.watchDeviceState != null && Object.hasOwnProperty.call(message, "watchDeviceState"))
          writer.uint32(88).int32(message.watchDeviceState);
        return writer;
      };
      Authentication.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      Authentication.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
          reader = $Reader.create(reader);
        let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.Authentication();
        while (reader.pos < end) {
          let tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              message.answer = $root.device.Answer.decode(reader, reader.uint32());
              break;
            case 2:
              message.loginProviderName = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            case 3:
              message.loginProviderGuid = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            case 4:
              message.isTpmAvailable = $root.device.BoolMaybe.decode(reader, reader.uint32());
              break;
            case 5:
              message.isPasswordSet = $root.device.BoolMaybe.decode(reader, reader.uint32());
              break;
            case 6:
              message.isBiometricsSet = $root.device.BoolMaybe.decode(reader, reader.uint32());
              break;
            case 7:
              message.isWatchAuthenticationEnabled = $root.device.BoolMaybe.decode(reader, reader.uint32());
              break;
            case 11:
              message.watchDeviceState = reader.int32();
              break;
            case 8:
              message.isSecureEnclaveAvailable = $root.device.BoolMaybe.decode(reader, reader.uint32());
              break;
            case 9:
              message.isWebauthnAvailable = $root.device.BoolMaybe.decode(reader, reader.uint32());
              break;
            case 10:
              message.isPlatformAuthenticatorAvailable = $root.device.BoolMaybe.decode(reader, reader.uint32());
              break;
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return message;
      };
      Authentication.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
          reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      Authentication.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        if (message.answer != null && message.hasOwnProperty("answer")) {
          let error = $root.device.Answer.verify(message.answer);
          if (error)
            return "answer." + error;
        }
        if (message.loginProviderName != null && message.hasOwnProperty("loginProviderName")) {
          let error = $root.device.StringMaybe.verify(message.loginProviderName);
          if (error)
            return "loginProviderName." + error;
        }
        if (message.loginProviderGuid != null && message.hasOwnProperty("loginProviderGuid")) {
          let error = $root.device.StringMaybe.verify(message.loginProviderGuid);
          if (error)
            return "loginProviderGuid." + error;
        }
        if (message.isTpmAvailable != null && message.hasOwnProperty("isTpmAvailable")) {
          let error = $root.device.BoolMaybe.verify(message.isTpmAvailable);
          if (error)
            return "isTpmAvailable." + error;
        }
        if (message.isPasswordSet != null && message.hasOwnProperty("isPasswordSet")) {
          let error = $root.device.BoolMaybe.verify(message.isPasswordSet);
          if (error)
            return "isPasswordSet." + error;
        }
        if (message.isBiometricsSet != null && message.hasOwnProperty("isBiometricsSet")) {
          let error = $root.device.BoolMaybe.verify(message.isBiometricsSet);
          if (error)
            return "isBiometricsSet." + error;
        }
        if (message.isWatchAuthenticationEnabled != null && message.hasOwnProperty("isWatchAuthenticationEnabled")) {
          let error = $root.device.BoolMaybe.verify(message.isWatchAuthenticationEnabled);
          if (error)
            return "isWatchAuthenticationEnabled." + error;
        }
        if (message.watchDeviceState != null && message.hasOwnProperty("watchDeviceState"))
          switch (message.watchDeviceState) {
            default:
              return "watchDeviceState: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
              break;
          }
        if (message.isSecureEnclaveAvailable != null && message.hasOwnProperty("isSecureEnclaveAvailable")) {
          let error = $root.device.BoolMaybe.verify(message.isSecureEnclaveAvailable);
          if (error)
            return "isSecureEnclaveAvailable." + error;
        }
        if (message.isWebauthnAvailable != null && message.hasOwnProperty("isWebauthnAvailable")) {
          let error = $root.device.BoolMaybe.verify(message.isWebauthnAvailable);
          if (error)
            return "isWebauthnAvailable." + error;
        }
        if (message.isPlatformAuthenticatorAvailable != null && message.hasOwnProperty("isPlatformAuthenticatorAvailable")) {
          let error = $root.device.BoolMaybe.verify(message.isPlatformAuthenticatorAvailable);
          if (error)
            return "isPlatformAuthenticatorAvailable." + error;
        }
        return null;
      };
      Authentication.fromObject = function fromObject(object) {
        if (object instanceof $root.device.DeviceInfo.Authentication)
          return object;
        let message = new $root.device.DeviceInfo.Authentication();
        if (object.answer != null) {
          if (typeof object.answer !== "object")
            throw TypeError(".device.DeviceInfo.Authentication.answer: object expected");
          message.answer = $root.device.Answer.fromObject(object.answer);
        }
        if (object.loginProviderName != null) {
          if (typeof object.loginProviderName !== "object")
            throw TypeError(".device.DeviceInfo.Authentication.loginProviderName: object expected");
          message.loginProviderName = $root.device.StringMaybe.fromObject(object.loginProviderName);
        }
        if (object.loginProviderGuid != null) {
          if (typeof object.loginProviderGuid !== "object")
            throw TypeError(".device.DeviceInfo.Authentication.loginProviderGuid: object expected");
          message.loginProviderGuid = $root.device.StringMaybe.fromObject(object.loginProviderGuid);
        }
        if (object.isTpmAvailable != null) {
          if (typeof object.isTpmAvailable !== "object")
            throw TypeError(".device.DeviceInfo.Authentication.isTpmAvailable: object expected");
          message.isTpmAvailable = $root.device.BoolMaybe.fromObject(object.isTpmAvailable);
        }
        if (object.isPasswordSet != null) {
          if (typeof object.isPasswordSet !== "object")
            throw TypeError(".device.DeviceInfo.Authentication.isPasswordSet: object expected");
          message.isPasswordSet = $root.device.BoolMaybe.fromObject(object.isPasswordSet);
        }
        if (object.isBiometricsSet != null) {
          if (typeof object.isBiometricsSet !== "object")
            throw TypeError(".device.DeviceInfo.Authentication.isBiometricsSet: object expected");
          message.isBiometricsSet = $root.device.BoolMaybe.fromObject(object.isBiometricsSet);
        }
        if (object.isWatchAuthenticationEnabled != null) {
          if (typeof object.isWatchAuthenticationEnabled !== "object")
            throw TypeError(".device.DeviceInfo.Authentication.isWatchAuthenticationEnabled: object expected");
          message.isWatchAuthenticationEnabled = $root.device.BoolMaybe.fromObject(object.isWatchAuthenticationEnabled);
        }
        switch (object.watchDeviceState) {
          case "UNKNOWN":
          case 0:
            message.watchDeviceState = 0;
            break;
          case "AVAILABLE":
          case 1:
            message.watchDeviceState = 1;
            break;
          case "UNSUPPORTED":
          case 2:
            message.watchDeviceState = 2;
            break;
          case "NOTENROLLED":
          case 3:
            message.watchDeviceState = 3;
            break;
          case "NOTAVAILABLE":
          case 4:
            message.watchDeviceState = 4;
            break;
          case "NOTPAIRED":
          case 5:
            message.watchDeviceState = 5;
            break;
          case "DISCONNECTED":
          case 6:
            message.watchDeviceState = 6;
            break;
        }
        if (object.isSecureEnclaveAvailable != null) {
          if (typeof object.isSecureEnclaveAvailable !== "object")
            throw TypeError(".device.DeviceInfo.Authentication.isSecureEnclaveAvailable: object expected");
          message.isSecureEnclaveAvailable = $root.device.BoolMaybe.fromObject(object.isSecureEnclaveAvailable);
        }
        if (object.isWebauthnAvailable != null) {
          if (typeof object.isWebauthnAvailable !== "object")
            throw TypeError(".device.DeviceInfo.Authentication.isWebauthnAvailable: object expected");
          message.isWebauthnAvailable = $root.device.BoolMaybe.fromObject(object.isWebauthnAvailable);
        }
        if (object.isPlatformAuthenticatorAvailable != null) {
          if (typeof object.isPlatformAuthenticatorAvailable !== "object")
            throw TypeError(".device.DeviceInfo.Authentication.isPlatformAuthenticatorAvailable: object expected");
          message.isPlatformAuthenticatorAvailable = $root.device.BoolMaybe.fromObject(object.isPlatformAuthenticatorAvailable);
        }
        return message;
      };
      Authentication.toObject = function toObject(message, options) {
        if (!options)
          options = {};
        let object = {};
        if (options.defaults) {
          object.answer = null;
          object.loginProviderName = null;
          object.loginProviderGuid = null;
          object.isTpmAvailable = null;
          object.isPasswordSet = null;
          object.isBiometricsSet = null;
          object.isWatchAuthenticationEnabled = null;
          object.isSecureEnclaveAvailable = null;
          object.isWebauthnAvailable = null;
          object.isPlatformAuthenticatorAvailable = null;
          object.watchDeviceState = options.enums === String ? "UNKNOWN" : 0;
        }
        if (message.answer != null && message.hasOwnProperty("answer"))
          object.answer = $root.device.Answer.toObject(message.answer, options);
        if (message.loginProviderName != null && message.hasOwnProperty("loginProviderName"))
          object.loginProviderName = $root.device.StringMaybe.toObject(message.loginProviderName, options);
        if (message.loginProviderGuid != null && message.hasOwnProperty("loginProviderGuid"))
          object.loginProviderGuid = $root.device.StringMaybe.toObject(message.loginProviderGuid, options);
        if (message.isTpmAvailable != null && message.hasOwnProperty("isTpmAvailable"))
          object.isTpmAvailable = $root.device.BoolMaybe.toObject(message.isTpmAvailable, options);
        if (message.isPasswordSet != null && message.hasOwnProperty("isPasswordSet"))
          object.isPasswordSet = $root.device.BoolMaybe.toObject(message.isPasswordSet, options);
        if (message.isBiometricsSet != null && message.hasOwnProperty("isBiometricsSet"))
          object.isBiometricsSet = $root.device.BoolMaybe.toObject(message.isBiometricsSet, options);
        if (message.isWatchAuthenticationEnabled != null && message.hasOwnProperty("isWatchAuthenticationEnabled"))
          object.isWatchAuthenticationEnabled = $root.device.BoolMaybe.toObject(message.isWatchAuthenticationEnabled, options);
        if (message.isSecureEnclaveAvailable != null && message.hasOwnProperty("isSecureEnclaveAvailable"))
          object.isSecureEnclaveAvailable = $root.device.BoolMaybe.toObject(message.isSecureEnclaveAvailable, options);
        if (message.isWebauthnAvailable != null && message.hasOwnProperty("isWebauthnAvailable"))
          object.isWebauthnAvailable = $root.device.BoolMaybe.toObject(message.isWebauthnAvailable, options);
        if (message.isPlatformAuthenticatorAvailable != null && message.hasOwnProperty("isPlatformAuthenticatorAvailable"))
          object.isPlatformAuthenticatorAvailable = $root.device.BoolMaybe.toObject(message.isPlatformAuthenticatorAvailable, options);
        if (message.watchDeviceState != null && message.hasOwnProperty("watchDeviceState"))
          object.watchDeviceState = options.enums === String ? $root.device.DeviceInfo.Authentication.WatchState[message.watchDeviceState] : message.watchDeviceState;
        return object;
      };
      Authentication.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };
      Authentication.WatchState = function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "AVAILABLE"] = 1;
        values[valuesById[2] = "UNSUPPORTED"] = 2;
        values[valuesById[3] = "NOTENROLLED"] = 3;
        values[valuesById[4] = "NOTAVAILABLE"] = 4;
        values[valuesById[5] = "NOTPAIRED"] = 5;
        values[valuesById[6] = "DISCONNECTED"] = 6;
        return values;
      }();
      return Authentication;
    }();
    DeviceInfo.SecuritySoftware = function() {
      function SecuritySoftware(properties) {
        this.software = [];
        if (properties) {
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
        }
      }
      SecuritySoftware.prototype.answer = null;
      SecuritySoftware.prototype.software = $util.emptyArray;
      SecuritySoftware.create = function create(properties) {
        return new SecuritySoftware(properties);
      };
      SecuritySoftware.encode = function encode(message, writer) {
        if (!writer)
          writer = $Writer.create();
        if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
          $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
        if (message.software != null && message.software.length)
          for (let i = 0; i < message.software.length; ++i)
            $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.encode(message.software[i], writer.uint32(18).fork()).ldelim();
        return writer;
      };
      SecuritySoftware.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      SecuritySoftware.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
          reader = $Reader.create(reader);
        let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.SecuritySoftware();
        while (reader.pos < end) {
          let tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              message.answer = $root.device.Answer.decode(reader, reader.uint32());
              break;
            case 2:
              if (!(message.software && message.software.length))
                message.software = [];
              message.software.push($root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.decode(reader, reader.uint32()));
              break;
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return message;
      };
      SecuritySoftware.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
          reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      SecuritySoftware.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        if (message.answer != null && message.hasOwnProperty("answer")) {
          let error = $root.device.Answer.verify(message.answer);
          if (error)
            return "answer." + error;
        }
        if (message.software != null && message.hasOwnProperty("software")) {
          if (!Array.isArray(message.software))
            return "software: array expected";
          for (let i = 0; i < message.software.length; ++i) {
            let error = $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.verify(message.software[i]);
            if (error)
              return "software." + error;
          }
        }
        return null;
      };
      SecuritySoftware.fromObject = function fromObject(object) {
        if (object instanceof $root.device.DeviceInfo.SecuritySoftware)
          return object;
        let message = new $root.device.DeviceInfo.SecuritySoftware();
        if (object.answer != null) {
          if (typeof object.answer !== "object")
            throw TypeError(".device.DeviceInfo.SecuritySoftware.answer: object expected");
          message.answer = $root.device.Answer.fromObject(object.answer);
        }
        if (object.software) {
          if (!Array.isArray(object.software))
            throw TypeError(".device.DeviceInfo.SecuritySoftware.software: array expected");
          message.software = [];
          for (let i = 0; i < object.software.length; ++i) {
            if (typeof object.software[i] !== "object")
              throw TypeError(".device.DeviceInfo.SecuritySoftware.software: object expected");
            message.software[i] = $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.fromObject(object.software[i]);
          }
        }
        return message;
      };
      SecuritySoftware.toObject = function toObject(message, options) {
        if (!options)
          options = {};
        let object = {};
        if (options.arrays || options.defaults)
          object.software = [];
        if (options.defaults)
          object.answer = null;
        if (message.answer != null && message.hasOwnProperty("answer"))
          object.answer = $root.device.Answer.toObject(message.answer, options);
        if (message.software && message.software.length) {
          object.software = [];
          for (let j = 0; j < message.software.length; ++j)
            object.software[j] = $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.toObject(message.software[j], options);
        }
        return object;
      };
      SecuritySoftware.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };
      SecuritySoftware.SoftwareInfo = function() {
        function SoftwareInfo(properties) {
          if (properties) {
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
          }
        }
        SoftwareInfo.prototype.answer = null;
        SoftwareInfo.prototype.category = null;
        SoftwareInfo.prototype.name = null;
        SoftwareInfo.prototype.version = null;
        SoftwareInfo.prototype.enabled = null;
        SoftwareInfo.prototype.status = null;
        SoftwareInfo.create = function create(properties) {
          return new SoftwareInfo(properties);
        };
        SoftwareInfo.encode = function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
            $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
          if (message.category != null && Object.hasOwnProperty.call(message, "category"))
            $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.CategoryMaybe.encode(message.category, writer.uint32(18).fork()).ldelim();
          if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            $root.device.StringMaybe.encode(message.name, writer.uint32(26).fork()).ldelim();
          if (message.version != null && Object.hasOwnProperty.call(message, "version"))
            $root.device.StringMaybe.encode(message.version, writer.uint32(34).fork()).ldelim();
          if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
            $root.device.BoolMaybe.encode(message.enabled, writer.uint32(42).fork()).ldelim();
          if (message.status != null && Object.hasOwnProperty.call(message, "status"))
            $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.StatusMaybe.encode(message.status, writer.uint32(50).fork()).ldelim();
          return writer;
        };
        SoftwareInfo.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        SoftwareInfo.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo();
          while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.answer = $root.device.Answer.decode(reader, reader.uint32());
                break;
              case 2:
                message.category = $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.CategoryMaybe.decode(reader, reader.uint32());
                break;
              case 3:
                message.name = $root.device.StringMaybe.decode(reader, reader.uint32());
                break;
              case 4:
                message.version = $root.device.StringMaybe.decode(reader, reader.uint32());
                break;
              case 5:
                message.enabled = $root.device.BoolMaybe.decode(reader, reader.uint32());
                break;
              case 6:
                message.status = $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.StatusMaybe.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };
        SoftwareInfo.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };
        SoftwareInfo.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.answer != null && message.hasOwnProperty("answer")) {
            let error = $root.device.Answer.verify(message.answer);
            if (error)
              return "answer." + error;
          }
          if (message.category != null && message.hasOwnProperty("category")) {
            let error = $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.CategoryMaybe.verify(message.category);
            if (error)
              return "category." + error;
          }
          if (message.name != null && message.hasOwnProperty("name")) {
            let error = $root.device.StringMaybe.verify(message.name);
            if (error)
              return "name." + error;
          }
          if (message.version != null && message.hasOwnProperty("version")) {
            let error = $root.device.StringMaybe.verify(message.version);
            if (error)
              return "version." + error;
          }
          if (message.enabled != null && message.hasOwnProperty("enabled")) {
            let error = $root.device.BoolMaybe.verify(message.enabled);
            if (error)
              return "enabled." + error;
          }
          if (message.status != null && message.hasOwnProperty("status")) {
            let error = $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.StatusMaybe.verify(message.status);
            if (error)
              return "status." + error;
          }
          return null;
        };
        SoftwareInfo.fromObject = function fromObject(object) {
          if (object instanceof $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo)
            return object;
          let message = new $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo();
          if (object.answer != null) {
            if (typeof object.answer !== "object")
              throw TypeError(".device.DeviceInfo.SecuritySoftware.SoftwareInfo.answer: object expected");
            message.answer = $root.device.Answer.fromObject(object.answer);
          }
          if (object.category != null) {
            if (typeof object.category !== "object")
              throw TypeError(".device.DeviceInfo.SecuritySoftware.SoftwareInfo.category: object expected");
            message.category = $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.CategoryMaybe.fromObject(object.category);
          }
          if (object.name != null) {
            if (typeof object.name !== "object")
              throw TypeError(".device.DeviceInfo.SecuritySoftware.SoftwareInfo.name: object expected");
            message.name = $root.device.StringMaybe.fromObject(object.name);
          }
          if (object.version != null) {
            if (typeof object.version !== "object")
              throw TypeError(".device.DeviceInfo.SecuritySoftware.SoftwareInfo.version: object expected");
            message.version = $root.device.StringMaybe.fromObject(object.version);
          }
          if (object.enabled != null) {
            if (typeof object.enabled !== "object")
              throw TypeError(".device.DeviceInfo.SecuritySoftware.SoftwareInfo.enabled: object expected");
            message.enabled = $root.device.BoolMaybe.fromObject(object.enabled);
          }
          if (object.status != null) {
            if (typeof object.status !== "object")
              throw TypeError(".device.DeviceInfo.SecuritySoftware.SoftwareInfo.status: object expected");
            message.status = $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.StatusMaybe.fromObject(object.status);
          }
          return message;
        };
        SoftwareInfo.toObject = function toObject(message, options) {
          if (!options)
            options = {};
          let object = {};
          if (options.defaults) {
            object.answer = null;
            object.category = null;
            object.name = null;
            object.version = null;
            object.enabled = null;
            object.status = null;
          }
          if (message.answer != null && message.hasOwnProperty("answer"))
            object.answer = $root.device.Answer.toObject(message.answer, options);
          if (message.category != null && message.hasOwnProperty("category"))
            object.category = $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.CategoryMaybe.toObject(message.category, options);
          if (message.name != null && message.hasOwnProperty("name"))
            object.name = $root.device.StringMaybe.toObject(message.name, options);
          if (message.version != null && message.hasOwnProperty("version"))
            object.version = $root.device.StringMaybe.toObject(message.version, options);
          if (message.enabled != null && message.hasOwnProperty("enabled"))
            object.enabled = $root.device.BoolMaybe.toObject(message.enabled, options);
          if (message.status != null && message.hasOwnProperty("status"))
            object.status = $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.StatusMaybe.toObject(message.status, options);
          return object;
        };
        SoftwareInfo.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        SoftwareInfo.Category = function() {
          const valuesById = {}, values = Object.create(valuesById);
          values[valuesById[0] = "FIREWALL"] = 0;
          values[valuesById[1] = "ANTIMALWARE"] = 1;
          values[valuesById[2] = "ANTISPYWARE"] = 2;
          values[valuesById[3] = "ANTIVIRUS"] = 3;
          return values;
        }();
        SoftwareInfo.CategoryMaybe = function() {
          function CategoryMaybe(properties) {
            if (properties) {
              for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                  this[keys[i]] = properties[keys[i]];
            }
          }
          CategoryMaybe.prototype.answer = null;
          CategoryMaybe.prototype.value = 0;
          CategoryMaybe.create = function create(properties) {
            return new CategoryMaybe(properties);
          };
          CategoryMaybe.encode = function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
              $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
              writer.uint32(16).int32(message.value);
            return writer;
          };
          CategoryMaybe.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          };
          CategoryMaybe.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.CategoryMaybe();
            while (reader.pos < end) {
              let tag = reader.uint32();
              switch (tag >>> 3) {
                case 1:
                  message.answer = $root.device.Answer.decode(reader, reader.uint32());
                  break;
                case 2:
                  message.value = reader.int32();
                  break;
                default:
                  reader.skipType(tag & 7);
                  break;
              }
            }
            return message;
          };
          CategoryMaybe.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };
          CategoryMaybe.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (message.answer != null && message.hasOwnProperty("answer")) {
              let error = $root.device.Answer.verify(message.answer);
              if (error)
                return "answer." + error;
            }
            if (message.value != null && message.hasOwnProperty("value"))
              switch (message.value) {
                default:
                  return "value: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                  break;
              }
            return null;
          };
          CategoryMaybe.fromObject = function fromObject(object) {
            if (object instanceof $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.CategoryMaybe)
              return object;
            let message = new $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.CategoryMaybe();
            if (object.answer != null) {
              if (typeof object.answer !== "object")
                throw TypeError(".device.DeviceInfo.SecuritySoftware.SoftwareInfo.CategoryMaybe.answer: object expected");
              message.answer = $root.device.Answer.fromObject(object.answer);
            }
            switch (object.value) {
              case "FIREWALL":
              case 0:
                message.value = 0;
                break;
              case "ANTIMALWARE":
              case 1:
                message.value = 1;
                break;
              case "ANTISPYWARE":
              case 2:
                message.value = 2;
                break;
              case "ANTIVIRUS":
              case 3:
                message.value = 3;
                break;
            }
            return message;
          };
          CategoryMaybe.toObject = function toObject(message, options) {
            if (!options)
              options = {};
            let object = {};
            if (options.defaults) {
              object.answer = null;
              object.value = options.enums === String ? "FIREWALL" : 0;
            }
            if (message.answer != null && message.hasOwnProperty("answer"))
              object.answer = $root.device.Answer.toObject(message.answer, options);
            if (message.value != null && message.hasOwnProperty("value"))
              object.value = options.enums === String ? $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.Category[message.value] : message.value;
            return object;
          };
          CategoryMaybe.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          };
          return CategoryMaybe;
        }();
        SoftwareInfo.Status = function() {
          const valuesById = {}, values = Object.create(valuesById);
          values[valuesById[0] = "OFF"] = 0;
          values[valuesById[1] = "ON"] = 1;
          values[valuesById[2] = "SNOOZED"] = 2;
          values[valuesById[3] = "EXPIRED"] = 3;
          return values;
        }();
        SoftwareInfo.StatusMaybe = function() {
          function StatusMaybe(properties) {
            if (properties) {
              for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                  this[keys[i]] = properties[keys[i]];
            }
          }
          StatusMaybe.prototype.answer = null;
          StatusMaybe.prototype.value = 0;
          StatusMaybe.create = function create(properties) {
            return new StatusMaybe(properties);
          };
          StatusMaybe.encode = function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
              $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
              writer.uint32(16).int32(message.value);
            return writer;
          };
          StatusMaybe.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          };
          StatusMaybe.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.StatusMaybe();
            while (reader.pos < end) {
              let tag = reader.uint32();
              switch (tag >>> 3) {
                case 1:
                  message.answer = $root.device.Answer.decode(reader, reader.uint32());
                  break;
                case 2:
                  message.value = reader.int32();
                  break;
                default:
                  reader.skipType(tag & 7);
                  break;
              }
            }
            return message;
          };
          StatusMaybe.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };
          StatusMaybe.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (message.answer != null && message.hasOwnProperty("answer")) {
              let error = $root.device.Answer.verify(message.answer);
              if (error)
                return "answer." + error;
            }
            if (message.value != null && message.hasOwnProperty("value"))
              switch (message.value) {
                default:
                  return "value: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                  break;
              }
            return null;
          };
          StatusMaybe.fromObject = function fromObject(object) {
            if (object instanceof $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.StatusMaybe)
              return object;
            let message = new $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.StatusMaybe();
            if (object.answer != null) {
              if (typeof object.answer !== "object")
                throw TypeError(".device.DeviceInfo.SecuritySoftware.SoftwareInfo.StatusMaybe.answer: object expected");
              message.answer = $root.device.Answer.fromObject(object.answer);
            }
            switch (object.value) {
              case "OFF":
              case 0:
                message.value = 0;
                break;
              case "ON":
              case 1:
                message.value = 1;
                break;
              case "SNOOZED":
              case 2:
                message.value = 2;
                break;
              case "EXPIRED":
              case 3:
                message.value = 3;
                break;
            }
            return message;
          };
          StatusMaybe.toObject = function toObject(message, options) {
            if (!options)
              options = {};
            let object = {};
            if (options.defaults) {
              object.answer = null;
              object.value = options.enums === String ? "OFF" : 0;
            }
            if (message.answer != null && message.hasOwnProperty("answer"))
              object.answer = $root.device.Answer.toObject(message.answer, options);
            if (message.value != null && message.hasOwnProperty("value"))
              object.value = options.enums === String ? $root.device.DeviceInfo.SecuritySoftware.SoftwareInfo.Status[message.value] : message.value;
            return object;
          };
          StatusMaybe.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          };
          return StatusMaybe;
        }();
        return SoftwareInfo;
      }();
      return SecuritySoftware;
    }();
    DeviceInfo.Volumes = function() {
      function Volumes(properties) {
        this.volumes = [];
        if (properties) {
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
        }
      }
      Volumes.prototype.answer = null;
      Volumes.prototype.volumes = $util.emptyArray;
      Volumes.prototype.filevault = null;
      Volumes.create = function create(properties) {
        return new Volumes(properties);
      };
      Volumes.encode = function encode(message, writer) {
        if (!writer)
          writer = $Writer.create();
        if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
          $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
        if (message.volumes != null && message.volumes.length)
          for (let i = 0; i < message.volumes.length; ++i)
            $root.device.DeviceInfo.Volumes.VolumeInfo.encode(message.volumes[i], writer.uint32(18).fork()).ldelim();
        if (message.filevault != null && Object.hasOwnProperty.call(message, "filevault"))
          $root.device.DeviceInfo.Volumes.FileVaultStatusMaybe.encode(message.filevault, writer.uint32(26).fork()).ldelim();
        return writer;
      };
      Volumes.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      Volumes.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
          reader = $Reader.create(reader);
        let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.Volumes();
        while (reader.pos < end) {
          let tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              message.answer = $root.device.Answer.decode(reader, reader.uint32());
              break;
            case 2:
              if (!(message.volumes && message.volumes.length))
                message.volumes = [];
              message.volumes.push($root.device.DeviceInfo.Volumes.VolumeInfo.decode(reader, reader.uint32()));
              break;
            case 3:
              message.filevault = $root.device.DeviceInfo.Volumes.FileVaultStatusMaybe.decode(reader, reader.uint32());
              break;
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return message;
      };
      Volumes.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
          reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      Volumes.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        if (message.answer != null && message.hasOwnProperty("answer")) {
          let error = $root.device.Answer.verify(message.answer);
          if (error)
            return "answer." + error;
        }
        if (message.volumes != null && message.hasOwnProperty("volumes")) {
          if (!Array.isArray(message.volumes))
            return "volumes: array expected";
          for (let i = 0; i < message.volumes.length; ++i) {
            let error = $root.device.DeviceInfo.Volumes.VolumeInfo.verify(message.volumes[i]);
            if (error)
              return "volumes." + error;
          }
        }
        if (message.filevault != null && message.hasOwnProperty("filevault")) {
          let error = $root.device.DeviceInfo.Volumes.FileVaultStatusMaybe.verify(message.filevault);
          if (error)
            return "filevault." + error;
        }
        return null;
      };
      Volumes.fromObject = function fromObject(object) {
        if (object instanceof $root.device.DeviceInfo.Volumes)
          return object;
        let message = new $root.device.DeviceInfo.Volumes();
        if (object.answer != null) {
          if (typeof object.answer !== "object")
            throw TypeError(".device.DeviceInfo.Volumes.answer: object expected");
          message.answer = $root.device.Answer.fromObject(object.answer);
        }
        if (object.volumes) {
          if (!Array.isArray(object.volumes))
            throw TypeError(".device.DeviceInfo.Volumes.volumes: array expected");
          message.volumes = [];
          for (let i = 0; i < object.volumes.length; ++i) {
            if (typeof object.volumes[i] !== "object")
              throw TypeError(".device.DeviceInfo.Volumes.volumes: object expected");
            message.volumes[i] = $root.device.DeviceInfo.Volumes.VolumeInfo.fromObject(object.volumes[i]);
          }
        }
        if (object.filevault != null) {
          if (typeof object.filevault !== "object")
            throw TypeError(".device.DeviceInfo.Volumes.filevault: object expected");
          message.filevault = $root.device.DeviceInfo.Volumes.FileVaultStatusMaybe.fromObject(object.filevault);
        }
        return message;
      };
      Volumes.toObject = function toObject(message, options) {
        if (!options)
          options = {};
        let object = {};
        if (options.arrays || options.defaults)
          object.volumes = [];
        if (options.defaults) {
          object.answer = null;
          object.filevault = null;
        }
        if (message.answer != null && message.hasOwnProperty("answer"))
          object.answer = $root.device.Answer.toObject(message.answer, options);
        if (message.volumes && message.volumes.length) {
          object.volumes = [];
          for (let j = 0; j < message.volumes.length; ++j)
            object.volumes[j] = $root.device.DeviceInfo.Volumes.VolumeInfo.toObject(message.volumes[j], options);
        }
        if (message.filevault != null && message.hasOwnProperty("filevault"))
          object.filevault = $root.device.DeviceInfo.Volumes.FileVaultStatusMaybe.toObject(message.filevault, options);
        return object;
      };
      Volumes.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };
      Volumes.VolumeInfo = function() {
        function VolumeInfo(properties) {
          if (properties) {
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
          }
        }
        VolumeInfo.prototype.answer = null;
        VolumeInfo.prototype.name = null;
        VolumeInfo.prototype.isBitlockerEnabled = null;
        VolumeInfo.prototype.isSystemDrive = null;
        VolumeInfo.prototype.isEncrypted = null;
        VolumeInfo.prototype.isRemovable = null;
        VolumeInfo.create = function create(properties) {
          return new VolumeInfo(properties);
        };
        VolumeInfo.encode = function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
            $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
          if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            $root.device.StringMaybe.encode(message.name, writer.uint32(18).fork()).ldelim();
          if (message.isBitlockerEnabled != null && Object.hasOwnProperty.call(message, "isBitlockerEnabled"))
            $root.device.BoolMaybe.encode(message.isBitlockerEnabled, writer.uint32(26).fork()).ldelim();
          if (message.isSystemDrive != null && Object.hasOwnProperty.call(message, "isSystemDrive"))
            $root.device.BoolMaybe.encode(message.isSystemDrive, writer.uint32(34).fork()).ldelim();
          if (message.isEncrypted != null && Object.hasOwnProperty.call(message, "isEncrypted"))
            $root.device.BoolMaybe.encode(message.isEncrypted, writer.uint32(42).fork()).ldelim();
          if (message.isRemovable != null && Object.hasOwnProperty.call(message, "isRemovable"))
            $root.device.BoolMaybe.encode(message.isRemovable, writer.uint32(50).fork()).ldelim();
          return writer;
        };
        VolumeInfo.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        VolumeInfo.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.Volumes.VolumeInfo();
          while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.answer = $root.device.Answer.decode(reader, reader.uint32());
                break;
              case 2:
                message.name = $root.device.StringMaybe.decode(reader, reader.uint32());
                break;
              case 3:
                message.isBitlockerEnabled = $root.device.BoolMaybe.decode(reader, reader.uint32());
                break;
              case 4:
                message.isSystemDrive = $root.device.BoolMaybe.decode(reader, reader.uint32());
                break;
              case 5:
                message.isEncrypted = $root.device.BoolMaybe.decode(reader, reader.uint32());
                break;
              case 6:
                message.isRemovable = $root.device.BoolMaybe.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };
        VolumeInfo.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };
        VolumeInfo.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.answer != null && message.hasOwnProperty("answer")) {
            let error = $root.device.Answer.verify(message.answer);
            if (error)
              return "answer." + error;
          }
          if (message.name != null && message.hasOwnProperty("name")) {
            let error = $root.device.StringMaybe.verify(message.name);
            if (error)
              return "name." + error;
          }
          if (message.isBitlockerEnabled != null && message.hasOwnProperty("isBitlockerEnabled")) {
            let error = $root.device.BoolMaybe.verify(message.isBitlockerEnabled);
            if (error)
              return "isBitlockerEnabled." + error;
          }
          if (message.isSystemDrive != null && message.hasOwnProperty("isSystemDrive")) {
            let error = $root.device.BoolMaybe.verify(message.isSystemDrive);
            if (error)
              return "isSystemDrive." + error;
          }
          if (message.isEncrypted != null && message.hasOwnProperty("isEncrypted")) {
            let error = $root.device.BoolMaybe.verify(message.isEncrypted);
            if (error)
              return "isEncrypted." + error;
          }
          if (message.isRemovable != null && message.hasOwnProperty("isRemovable")) {
            let error = $root.device.BoolMaybe.verify(message.isRemovable);
            if (error)
              return "isRemovable." + error;
          }
          return null;
        };
        VolumeInfo.fromObject = function fromObject(object) {
          if (object instanceof $root.device.DeviceInfo.Volumes.VolumeInfo)
            return object;
          let message = new $root.device.DeviceInfo.Volumes.VolumeInfo();
          if (object.answer != null) {
            if (typeof object.answer !== "object")
              throw TypeError(".device.DeviceInfo.Volumes.VolumeInfo.answer: object expected");
            message.answer = $root.device.Answer.fromObject(object.answer);
          }
          if (object.name != null) {
            if (typeof object.name !== "object")
              throw TypeError(".device.DeviceInfo.Volumes.VolumeInfo.name: object expected");
            message.name = $root.device.StringMaybe.fromObject(object.name);
          }
          if (object.isBitlockerEnabled != null) {
            if (typeof object.isBitlockerEnabled !== "object")
              throw TypeError(".device.DeviceInfo.Volumes.VolumeInfo.isBitlockerEnabled: object expected");
            message.isBitlockerEnabled = $root.device.BoolMaybe.fromObject(object.isBitlockerEnabled);
          }
          if (object.isSystemDrive != null) {
            if (typeof object.isSystemDrive !== "object")
              throw TypeError(".device.DeviceInfo.Volumes.VolumeInfo.isSystemDrive: object expected");
            message.isSystemDrive = $root.device.BoolMaybe.fromObject(object.isSystemDrive);
          }
          if (object.isEncrypted != null) {
            if (typeof object.isEncrypted !== "object")
              throw TypeError(".device.DeviceInfo.Volumes.VolumeInfo.isEncrypted: object expected");
            message.isEncrypted = $root.device.BoolMaybe.fromObject(object.isEncrypted);
          }
          if (object.isRemovable != null) {
            if (typeof object.isRemovable !== "object")
              throw TypeError(".device.DeviceInfo.Volumes.VolumeInfo.isRemovable: object expected");
            message.isRemovable = $root.device.BoolMaybe.fromObject(object.isRemovable);
          }
          return message;
        };
        VolumeInfo.toObject = function toObject(message, options) {
          if (!options)
            options = {};
          let object = {};
          if (options.defaults) {
            object.answer = null;
            object.name = null;
            object.isBitlockerEnabled = null;
            object.isSystemDrive = null;
            object.isEncrypted = null;
            object.isRemovable = null;
          }
          if (message.answer != null && message.hasOwnProperty("answer"))
            object.answer = $root.device.Answer.toObject(message.answer, options);
          if (message.name != null && message.hasOwnProperty("name"))
            object.name = $root.device.StringMaybe.toObject(message.name, options);
          if (message.isBitlockerEnabled != null && message.hasOwnProperty("isBitlockerEnabled"))
            object.isBitlockerEnabled = $root.device.BoolMaybe.toObject(message.isBitlockerEnabled, options);
          if (message.isSystemDrive != null && message.hasOwnProperty("isSystemDrive"))
            object.isSystemDrive = $root.device.BoolMaybe.toObject(message.isSystemDrive, options);
          if (message.isEncrypted != null && message.hasOwnProperty("isEncrypted"))
            object.isEncrypted = $root.device.BoolMaybe.toObject(message.isEncrypted, options);
          if (message.isRemovable != null && message.hasOwnProperty("isRemovable"))
            object.isRemovable = $root.device.BoolMaybe.toObject(message.isRemovable, options);
          return object;
        };
        VolumeInfo.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return VolumeInfo;
      }();
      Volumes.FileVaultStatus = function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "FILE_VAULT_ON"] = 0;
        values[valuesById[1] = "FILE_VAULT_OFF"] = 1;
        return values;
      }();
      Volumes.FileVaultStatusMaybe = function() {
        function FileVaultStatusMaybe(properties) {
          if (properties) {
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
          }
        }
        FileVaultStatusMaybe.prototype.answer = null;
        FileVaultStatusMaybe.prototype.value = 0;
        FileVaultStatusMaybe.create = function create(properties) {
          return new FileVaultStatusMaybe(properties);
        };
        FileVaultStatusMaybe.encode = function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
            $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
          if (message.value != null && Object.hasOwnProperty.call(message, "value"))
            writer.uint32(16).int32(message.value);
          return writer;
        };
        FileVaultStatusMaybe.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        FileVaultStatusMaybe.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.Volumes.FileVaultStatusMaybe();
          while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.answer = $root.device.Answer.decode(reader, reader.uint32());
                break;
              case 2:
                message.value = reader.int32();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };
        FileVaultStatusMaybe.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };
        FileVaultStatusMaybe.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.answer != null && message.hasOwnProperty("answer")) {
            let error = $root.device.Answer.verify(message.answer);
            if (error)
              return "answer." + error;
          }
          if (message.value != null && message.hasOwnProperty("value"))
            switch (message.value) {
              default:
                return "value: enum value expected";
              case 0:
              case 1:
                break;
            }
          return null;
        };
        FileVaultStatusMaybe.fromObject = function fromObject(object) {
          if (object instanceof $root.device.DeviceInfo.Volumes.FileVaultStatusMaybe)
            return object;
          let message = new $root.device.DeviceInfo.Volumes.FileVaultStatusMaybe();
          if (object.answer != null) {
            if (typeof object.answer !== "object")
              throw TypeError(".device.DeviceInfo.Volumes.FileVaultStatusMaybe.answer: object expected");
            message.answer = $root.device.Answer.fromObject(object.answer);
          }
          switch (object.value) {
            case "FILE_VAULT_ON":
            case 0:
              message.value = 0;
              break;
            case "FILE_VAULT_OFF":
            case 1:
              message.value = 1;
              break;
          }
          return message;
        };
        FileVaultStatusMaybe.toObject = function toObject(message, options) {
          if (!options)
            options = {};
          let object = {};
          if (options.defaults) {
            object.answer = null;
            object.value = options.enums === String ? "FILE_VAULT_ON" : 0;
          }
          if (message.answer != null && message.hasOwnProperty("answer"))
            object.answer = $root.device.Answer.toObject(message.answer, options);
          if (message.value != null && message.hasOwnProperty("value"))
            object.value = options.enums === String ? $root.device.DeviceInfo.Volumes.FileVaultStatus[message.value] : message.value;
          return object;
        };
        FileVaultStatusMaybe.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return FileVaultStatusMaybe;
      }();
      return Volumes;
    }();
    DeviceInfo.AuthorizationSettings = function() {
      function AuthorizationSettings(properties) {
        if (properties) {
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
        }
      }
      AuthorizationSettings.prototype.answer = null;
      AuthorizationSettings.prototype.isLocalhostServiceEnabled = null;
      AuthorizationSettings.prototype.isAccessibilityServiceEnabled = null;
      AuthorizationSettings.create = function create(properties) {
        return new AuthorizationSettings(properties);
      };
      AuthorizationSettings.encode = function encode(message, writer) {
        if (!writer)
          writer = $Writer.create();
        if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
          $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
        if (message.isLocalhostServiceEnabled != null && Object.hasOwnProperty.call(message, "isLocalhostServiceEnabled"))
          $root.device.BoolMaybe.encode(message.isLocalhostServiceEnabled, writer.uint32(18).fork()).ldelim();
        if (message.isAccessibilityServiceEnabled != null && Object.hasOwnProperty.call(message, "isAccessibilityServiceEnabled"))
          $root.device.BoolMaybe.encode(message.isAccessibilityServiceEnabled, writer.uint32(26).fork()).ldelim();
        return writer;
      };
      AuthorizationSettings.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      AuthorizationSettings.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
          reader = $Reader.create(reader);
        let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.AuthorizationSettings();
        while (reader.pos < end) {
          let tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              message.answer = $root.device.Answer.decode(reader, reader.uint32());
              break;
            case 2:
              message.isLocalhostServiceEnabled = $root.device.BoolMaybe.decode(reader, reader.uint32());
              break;
            case 3:
              message.isAccessibilityServiceEnabled = $root.device.BoolMaybe.decode(reader, reader.uint32());
              break;
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return message;
      };
      AuthorizationSettings.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
          reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      AuthorizationSettings.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        if (message.answer != null && message.hasOwnProperty("answer")) {
          let error = $root.device.Answer.verify(message.answer);
          if (error)
            return "answer." + error;
        }
        if (message.isLocalhostServiceEnabled != null && message.hasOwnProperty("isLocalhostServiceEnabled")) {
          let error = $root.device.BoolMaybe.verify(message.isLocalhostServiceEnabled);
          if (error)
            return "isLocalhostServiceEnabled." + error;
        }
        if (message.isAccessibilityServiceEnabled != null && message.hasOwnProperty("isAccessibilityServiceEnabled")) {
          let error = $root.device.BoolMaybe.verify(message.isAccessibilityServiceEnabled);
          if (error)
            return "isAccessibilityServiceEnabled." + error;
        }
        return null;
      };
      AuthorizationSettings.fromObject = function fromObject(object) {
        if (object instanceof $root.device.DeviceInfo.AuthorizationSettings)
          return object;
        let message = new $root.device.DeviceInfo.AuthorizationSettings();
        if (object.answer != null) {
          if (typeof object.answer !== "object")
            throw TypeError(".device.DeviceInfo.AuthorizationSettings.answer: object expected");
          message.answer = $root.device.Answer.fromObject(object.answer);
        }
        if (object.isLocalhostServiceEnabled != null) {
          if (typeof object.isLocalhostServiceEnabled !== "object")
            throw TypeError(".device.DeviceInfo.AuthorizationSettings.isLocalhostServiceEnabled: object expected");
          message.isLocalhostServiceEnabled = $root.device.BoolMaybe.fromObject(object.isLocalhostServiceEnabled);
        }
        if (object.isAccessibilityServiceEnabled != null) {
          if (typeof object.isAccessibilityServiceEnabled !== "object")
            throw TypeError(".device.DeviceInfo.AuthorizationSettings.isAccessibilityServiceEnabled: object expected");
          message.isAccessibilityServiceEnabled = $root.device.BoolMaybe.fromObject(object.isAccessibilityServiceEnabled);
        }
        return message;
      };
      AuthorizationSettings.toObject = function toObject(message, options) {
        if (!options)
          options = {};
        let object = {};
        if (options.defaults) {
          object.answer = null;
          object.isLocalhostServiceEnabled = null;
          object.isAccessibilityServiceEnabled = null;
        }
        if (message.answer != null && message.hasOwnProperty("answer"))
          object.answer = $root.device.Answer.toObject(message.answer, options);
        if (message.isLocalhostServiceEnabled != null && message.hasOwnProperty("isLocalhostServiceEnabled"))
          object.isLocalhostServiceEnabled = $root.device.BoolMaybe.toObject(message.isLocalhostServiceEnabled, options);
        if (message.isAccessibilityServiceEnabled != null && message.hasOwnProperty("isAccessibilityServiceEnabled"))
          object.isAccessibilityServiceEnabled = $root.device.BoolMaybe.toObject(message.isAccessibilityServiceEnabled, options);
        return object;
      };
      AuthorizationSettings.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };
      return AuthorizationSettings;
    }();
    DeviceInfo.TPMInfo = function() {
      function TPMInfo(properties) {
        if (properties) {
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
        }
      }
      TPMInfo.prototype.answer = null;
      TPMInfo.prototype.Version = null;
      TPMInfo.prototype.Level = null;
      TPMInfo.prototype.Revision = null;
      TPMInfo.prototype.VendorID = null;
      TPMInfo.prototype.Firmware = null;
      TPMInfo.create = function create(properties) {
        return new TPMInfo(properties);
      };
      TPMInfo.encode = function encode(message, writer) {
        if (!writer)
          writer = $Writer.create();
        if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
          $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
        if (message.Version != null && Object.hasOwnProperty.call(message, "Version"))
          $root.device.StringMaybe.encode(message.Version, writer.uint32(18).fork()).ldelim();
        if (message.Level != null && Object.hasOwnProperty.call(message, "Level"))
          $root.device.StringMaybe.encode(message.Level, writer.uint32(26).fork()).ldelim();
        if (message.Revision != null && Object.hasOwnProperty.call(message, "Revision"))
          $root.device.StringMaybe.encode(message.Revision, writer.uint32(34).fork()).ldelim();
        if (message.VendorID != null && Object.hasOwnProperty.call(message, "VendorID"))
          $root.device.StringMaybe.encode(message.VendorID, writer.uint32(42).fork()).ldelim();
        if (message.Firmware != null && Object.hasOwnProperty.call(message, "Firmware"))
          $root.device.StringMaybe.encode(message.Firmware, writer.uint32(50).fork()).ldelim();
        return writer;
      };
      TPMInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      TPMInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
          reader = $Reader.create(reader);
        let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.TPMInfo();
        while (reader.pos < end) {
          let tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              message.answer = $root.device.Answer.decode(reader, reader.uint32());
              break;
            case 2:
              message.Version = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            case 3:
              message.Level = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            case 4:
              message.Revision = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            case 5:
              message.VendorID = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            case 6:
              message.Firmware = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return message;
      };
      TPMInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
          reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      TPMInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        if (message.answer != null && message.hasOwnProperty("answer")) {
          let error = $root.device.Answer.verify(message.answer);
          if (error)
            return "answer." + error;
        }
        if (message.Version != null && message.hasOwnProperty("Version")) {
          let error = $root.device.StringMaybe.verify(message.Version);
          if (error)
            return "Version." + error;
        }
        if (message.Level != null && message.hasOwnProperty("Level")) {
          let error = $root.device.StringMaybe.verify(message.Level);
          if (error)
            return "Level." + error;
        }
        if (message.Revision != null && message.hasOwnProperty("Revision")) {
          let error = $root.device.StringMaybe.verify(message.Revision);
          if (error)
            return "Revision." + error;
        }
        if (message.VendorID != null && message.hasOwnProperty("VendorID")) {
          let error = $root.device.StringMaybe.verify(message.VendorID);
          if (error)
            return "VendorID." + error;
        }
        if (message.Firmware != null && message.hasOwnProperty("Firmware")) {
          let error = $root.device.StringMaybe.verify(message.Firmware);
          if (error)
            return "Firmware." + error;
        }
        return null;
      };
      TPMInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.device.DeviceInfo.TPMInfo)
          return object;
        let message = new $root.device.DeviceInfo.TPMInfo();
        if (object.answer != null) {
          if (typeof object.answer !== "object")
            throw TypeError(".device.DeviceInfo.TPMInfo.answer: object expected");
          message.answer = $root.device.Answer.fromObject(object.answer);
        }
        if (object.Version != null) {
          if (typeof object.Version !== "object")
            throw TypeError(".device.DeviceInfo.TPMInfo.Version: object expected");
          message.Version = $root.device.StringMaybe.fromObject(object.Version);
        }
        if (object.Level != null) {
          if (typeof object.Level !== "object")
            throw TypeError(".device.DeviceInfo.TPMInfo.Level: object expected");
          message.Level = $root.device.StringMaybe.fromObject(object.Level);
        }
        if (object.Revision != null) {
          if (typeof object.Revision !== "object")
            throw TypeError(".device.DeviceInfo.TPMInfo.Revision: object expected");
          message.Revision = $root.device.StringMaybe.fromObject(object.Revision);
        }
        if (object.VendorID != null) {
          if (typeof object.VendorID !== "object")
            throw TypeError(".device.DeviceInfo.TPMInfo.VendorID: object expected");
          message.VendorID = $root.device.StringMaybe.fromObject(object.VendorID);
        }
        if (object.Firmware != null) {
          if (typeof object.Firmware !== "object")
            throw TypeError(".device.DeviceInfo.TPMInfo.Firmware: object expected");
          message.Firmware = $root.device.StringMaybe.fromObject(object.Firmware);
        }
        return message;
      };
      TPMInfo.toObject = function toObject(message, options) {
        if (!options)
          options = {};
        let object = {};
        if (options.defaults) {
          object.answer = null;
          object.Version = null;
          object.Level = null;
          object.Revision = null;
          object.VendorID = null;
          object.Firmware = null;
        }
        if (message.answer != null && message.hasOwnProperty("answer"))
          object.answer = $root.device.Answer.toObject(message.answer, options);
        if (message.Version != null && message.hasOwnProperty("Version"))
          object.Version = $root.device.StringMaybe.toObject(message.Version, options);
        if (message.Level != null && message.hasOwnProperty("Level"))
          object.Level = $root.device.StringMaybe.toObject(message.Level, options);
        if (message.Revision != null && message.hasOwnProperty("Revision"))
          object.Revision = $root.device.StringMaybe.toObject(message.Revision, options);
        if (message.VendorID != null && message.hasOwnProperty("VendorID"))
          object.VendorID = $root.device.StringMaybe.toObject(message.VendorID, options);
        if (message.Firmware != null && message.hasOwnProperty("Firmware"))
          object.Firmware = $root.device.StringMaybe.toObject(message.Firmware, options);
        return object;
      };
      TPMInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };
      return TPMInfo;
    }();
    DeviceInfo.KeyProvenances = function() {
      function KeyProvenances(properties) {
        this.info = [];
        if (properties) {
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
        }
      }
      KeyProvenances.prototype.answer = null;
      KeyProvenances.prototype.info = $util.emptyArray;
      KeyProvenances.create = function create(properties) {
        return new KeyProvenances(properties);
      };
      KeyProvenances.encode = function encode(message, writer) {
        if (!writer)
          writer = $Writer.create();
        if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
          $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
        if (message.info != null && message.info.length)
          for (let i = 0; i < message.info.length; ++i)
            $root.device.DeviceInfo.KeyProvenances.Info.encode(message.info[i], writer.uint32(18).fork()).ldelim();
        return writer;
      };
      KeyProvenances.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      KeyProvenances.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
          reader = $Reader.create(reader);
        let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.KeyProvenances();
        while (reader.pos < end) {
          let tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              message.answer = $root.device.Answer.decode(reader, reader.uint32());
              break;
            case 2:
              if (!(message.info && message.info.length))
                message.info = [];
              message.info.push($root.device.DeviceInfo.KeyProvenances.Info.decode(reader, reader.uint32()));
              break;
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return message;
      };
      KeyProvenances.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
          reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      KeyProvenances.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        if (message.answer != null && message.hasOwnProperty("answer")) {
          let error = $root.device.Answer.verify(message.answer);
          if (error)
            return "answer." + error;
        }
        if (message.info != null && message.hasOwnProperty("info")) {
          if (!Array.isArray(message.info))
            return "info: array expected";
          for (let i = 0; i < message.info.length; ++i) {
            let error = $root.device.DeviceInfo.KeyProvenances.Info.verify(message.info[i]);
            if (error)
              return "info." + error;
          }
        }
        return null;
      };
      KeyProvenances.fromObject = function fromObject(object) {
        if (object instanceof $root.device.DeviceInfo.KeyProvenances)
          return object;
        let message = new $root.device.DeviceInfo.KeyProvenances();
        if (object.answer != null) {
          if (typeof object.answer !== "object")
            throw TypeError(".device.DeviceInfo.KeyProvenances.answer: object expected");
          message.answer = $root.device.Answer.fromObject(object.answer);
        }
        if (object.info) {
          if (!Array.isArray(object.info))
            throw TypeError(".device.DeviceInfo.KeyProvenances.info: array expected");
          message.info = [];
          for (let i = 0; i < object.info.length; ++i) {
            if (typeof object.info[i] !== "object")
              throw TypeError(".device.DeviceInfo.KeyProvenances.info: object expected");
            message.info[i] = $root.device.DeviceInfo.KeyProvenances.Info.fromObject(object.info[i]);
          }
        }
        return message;
      };
      KeyProvenances.toObject = function toObject(message, options) {
        if (!options)
          options = {};
        let object = {};
        if (options.arrays || options.defaults)
          object.info = [];
        if (options.defaults)
          object.answer = null;
        if (message.answer != null && message.hasOwnProperty("answer"))
          object.answer = $root.device.Answer.toObject(message.answer, options);
        if (message.info && message.info.length) {
          object.info = [];
          for (let j = 0; j < message.info.length; ++j)
            object.info[j] = $root.device.DeviceInfo.KeyProvenances.Info.toObject(message.info[j], options);
        }
        return object;
      };
      KeyProvenances.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };
      KeyProvenances.KeyProvenance = function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "TEE"] = 1;
        values[valuesById[2] = "FILE"] = 2;
        return values;
      }();
      KeyProvenances.KeyProvenanceMaybe = function() {
        function KeyProvenanceMaybe(properties) {
          if (properties) {
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
          }
        }
        KeyProvenanceMaybe.prototype.answer = null;
        KeyProvenanceMaybe.prototype.value = 0;
        KeyProvenanceMaybe.create = function create(properties) {
          return new KeyProvenanceMaybe(properties);
        };
        KeyProvenanceMaybe.encode = function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
            $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
          if (message.value != null && Object.hasOwnProperty.call(message, "value"))
            writer.uint32(16).int32(message.value);
          return writer;
        };
        KeyProvenanceMaybe.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        KeyProvenanceMaybe.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.KeyProvenances.KeyProvenanceMaybe();
          while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.answer = $root.device.Answer.decode(reader, reader.uint32());
                break;
              case 2:
                message.value = reader.int32();
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };
        KeyProvenanceMaybe.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };
        KeyProvenanceMaybe.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.answer != null && message.hasOwnProperty("answer")) {
            let error = $root.device.Answer.verify(message.answer);
            if (error)
              return "answer." + error;
          }
          if (message.value != null && message.hasOwnProperty("value"))
            switch (message.value) {
              default:
                return "value: enum value expected";
              case 0:
              case 1:
              case 2:
                break;
            }
          return null;
        };
        KeyProvenanceMaybe.fromObject = function fromObject(object) {
          if (object instanceof $root.device.DeviceInfo.KeyProvenances.KeyProvenanceMaybe)
            return object;
          let message = new $root.device.DeviceInfo.KeyProvenances.KeyProvenanceMaybe();
          if (object.answer != null) {
            if (typeof object.answer !== "object")
              throw TypeError(".device.DeviceInfo.KeyProvenances.KeyProvenanceMaybe.answer: object expected");
            message.answer = $root.device.Answer.fromObject(object.answer);
          }
          switch (object.value) {
            case "UNKNOWN":
            case 0:
              message.value = 0;
              break;
            case "TEE":
            case 1:
              message.value = 1;
              break;
            case "FILE":
            case 2:
              message.value = 2;
              break;
          }
          return message;
        };
        KeyProvenanceMaybe.toObject = function toObject(message, options) {
          if (!options)
            options = {};
          let object = {};
          if (options.defaults) {
            object.answer = null;
            object.value = options.enums === String ? "UNKNOWN" : 0;
          }
          if (message.answer != null && message.hasOwnProperty("answer"))
            object.answer = $root.device.Answer.toObject(message.answer, options);
          if (message.value != null && message.hasOwnProperty("value"))
            object.value = options.enums === String ? $root.device.DeviceInfo.KeyProvenances.KeyProvenance[message.value] : message.value;
          return object;
        };
        KeyProvenanceMaybe.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return KeyProvenanceMaybe;
      }();
      KeyProvenances.Info = function() {
        function Info(properties) {
          if (properties) {
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]];
          }
        }
        Info.prototype.profileHandle = null;
        Info.prototype.keyHandle = null;
        Info.prototype.keyProvenance = null;
        Info.create = function create(properties) {
          return new Info(properties);
        };
        Info.encode = function encode(message, writer) {
          if (!writer)
            writer = $Writer.create();
          if (message.profileHandle != null && Object.hasOwnProperty.call(message, "profileHandle"))
            $root.device.StringMaybe.encode(message.profileHandle, writer.uint32(10).fork()).ldelim();
          if (message.keyHandle != null && Object.hasOwnProperty.call(message, "keyHandle"))
            $root.device.StringMaybe.encode(message.keyHandle, writer.uint32(18).fork()).ldelim();
          if (message.keyProvenance != null && Object.hasOwnProperty.call(message, "keyProvenance"))
            $root.device.DeviceInfo.KeyProvenances.KeyProvenanceMaybe.encode(message.keyProvenance, writer.uint32(26).fork()).ldelim();
          return writer;
        };
        Info.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        Info.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
          let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.KeyProvenances.Info();
          while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                message.profileHandle = $root.device.StringMaybe.decode(reader, reader.uint32());
                break;
              case 2:
                message.keyHandle = $root.device.StringMaybe.decode(reader, reader.uint32());
                break;
              case 3:
                message.keyProvenance = $root.device.DeviceInfo.KeyProvenances.KeyProvenanceMaybe.decode(reader, reader.uint32());
                break;
              default:
                reader.skipType(tag & 7);
                break;
            }
          }
          return message;
        };
        Info.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };
        Info.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected";
          if (message.profileHandle != null && message.hasOwnProperty("profileHandle")) {
            let error = $root.device.StringMaybe.verify(message.profileHandle);
            if (error)
              return "profileHandle." + error;
          }
          if (message.keyHandle != null && message.hasOwnProperty("keyHandle")) {
            let error = $root.device.StringMaybe.verify(message.keyHandle);
            if (error)
              return "keyHandle." + error;
          }
          if (message.keyProvenance != null && message.hasOwnProperty("keyProvenance")) {
            let error = $root.device.DeviceInfo.KeyProvenances.KeyProvenanceMaybe.verify(message.keyProvenance);
            if (error)
              return "keyProvenance." + error;
          }
          return null;
        };
        Info.fromObject = function fromObject(object) {
          if (object instanceof $root.device.DeviceInfo.KeyProvenances.Info)
            return object;
          let message = new $root.device.DeviceInfo.KeyProvenances.Info();
          if (object.profileHandle != null) {
            if (typeof object.profileHandle !== "object")
              throw TypeError(".device.DeviceInfo.KeyProvenances.Info.profileHandle: object expected");
            message.profileHandle = $root.device.StringMaybe.fromObject(object.profileHandle);
          }
          if (object.keyHandle != null) {
            if (typeof object.keyHandle !== "object")
              throw TypeError(".device.DeviceInfo.KeyProvenances.Info.keyHandle: object expected");
            message.keyHandle = $root.device.StringMaybe.fromObject(object.keyHandle);
          }
          if (object.keyProvenance != null) {
            if (typeof object.keyProvenance !== "object")
              throw TypeError(".device.DeviceInfo.KeyProvenances.Info.keyProvenance: object expected");
            message.keyProvenance = $root.device.DeviceInfo.KeyProvenances.KeyProvenanceMaybe.fromObject(object.keyProvenance);
          }
          return message;
        };
        Info.toObject = function toObject(message, options) {
          if (!options)
            options = {};
          let object = {};
          if (options.defaults) {
            object.profileHandle = null;
            object.keyHandle = null;
            object.keyProvenance = null;
          }
          if (message.profileHandle != null && message.hasOwnProperty("profileHandle"))
            object.profileHandle = $root.device.StringMaybe.toObject(message.profileHandle, options);
          if (message.keyHandle != null && message.hasOwnProperty("keyHandle"))
            object.keyHandle = $root.device.StringMaybe.toObject(message.keyHandle, options);
          if (message.keyProvenance != null && message.hasOwnProperty("keyProvenance"))
            object.keyProvenance = $root.device.DeviceInfo.KeyProvenances.KeyProvenanceMaybe.toObject(message.keyProvenance, options);
          return object;
        };
        Info.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return Info;
      }();
      return KeyProvenances;
    }();
    DeviceInfo.Locale = function() {
      function Locale(properties) {
        if (properties) {
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
        }
      }
      Locale.prototype.answer = null;
      Locale.prototype.current = null;
      Locale.create = function create(properties) {
        return new Locale(properties);
      };
      Locale.encode = function encode(message, writer) {
        if (!writer)
          writer = $Writer.create();
        if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
          $root.device.Answer.encode(message.answer, writer.uint32(10).fork()).ldelim();
        if (message.current != null && Object.hasOwnProperty.call(message, "current"))
          $root.device.StringMaybe.encode(message.current, writer.uint32(18).fork()).ldelim();
        return writer;
      };
      Locale.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };
      Locale.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
          reader = $Reader.create(reader);
        let end = length === void 0 ? reader.len : reader.pos + length, message = new $root.device.DeviceInfo.Locale();
        while (reader.pos < end) {
          let tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              message.answer = $root.device.Answer.decode(reader, reader.uint32());
              break;
            case 2:
              message.current = $root.device.StringMaybe.decode(reader, reader.uint32());
              break;
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return message;
      };
      Locale.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
          reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };
      Locale.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        if (message.answer != null && message.hasOwnProperty("answer")) {
          let error = $root.device.Answer.verify(message.answer);
          if (error)
            return "answer." + error;
        }
        if (message.current != null && message.hasOwnProperty("current")) {
          let error = $root.device.StringMaybe.verify(message.current);
          if (error)
            return "current." + error;
        }
        return null;
      };
      Locale.fromObject = function fromObject(object) {
        if (object instanceof $root.device.DeviceInfo.Locale)
          return object;
        let message = new $root.device.DeviceInfo.Locale();
        if (object.answer != null) {
          if (typeof object.answer !== "object")
            throw TypeError(".device.DeviceInfo.Locale.answer: object expected");
          message.answer = $root.device.Answer.fromObject(object.answer);
        }
        if (object.current != null) {
          if (typeof object.current !== "object")
            throw TypeError(".device.DeviceInfo.Locale.current: object expected");
          message.current = $root.device.StringMaybe.fromObject(object.current);
        }
        return message;
      };
      Locale.toObject = function toObject(message, options) {
        if (!options)
          options = {};
        let object = {};
        if (options.defaults) {
          object.answer = null;
          object.current = null;
        }
        if (message.answer != null && message.hasOwnProperty("answer"))
          object.answer = $root.device.Answer.toObject(message.answer, options);
        if (message.current != null && message.hasOwnProperty("current"))
          object.current = $root.device.StringMaybe.toObject(message.current, options);
        return object;
      };
      Locale.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };
      return Locale;
    }();
    return DeviceInfo;
  }();
  return device2;
})();

// src/kmc-device.js
var import_ua_parser_js = __toModule(require_ua_parser());
var Data = class {
  constructor(ua, ch, appSettings) {
    this.ua = ua;
    this.ch = ch;
    this.appSettings = appSettings;
  }
  static async collect(db) {
    let ua = new import_ua_parser_js.UAParser().getResult();
    let ch = {};
    if (navigator.userAgentData) {
      const le = {
        brands: navigator.userAgentData.brands,
        mobile: navigator.userAgentData.mobile,
        platform: navigator.userAgentData.platform
      };
      const he = await navigator.userAgentData.getHighEntropyValues([
        "architecture",
        "bitness",
        "model",
        "platformVersion",
        "uaFullVersion"
      ]);
      ch = { ...le, ...he };
    }
    let appSettings = {};
    if (db)
      appSettings = await kmc_get_app_settings(db);
    return new Data(ua, ch, appSettings);
  }
  getUserAgent() {
    return {
      browser: {
        name: this.ua.browser.name,
        version: this.ua.browser.version,
        engineName: this.ua.engine.name,
        engineVersion: this.ua.engine.version
      },
      platform: {
        name: this.ua.os.name,
        version: this.ua.os.version
      },
      device: {
        architecture: this.ua.cpu.architecture,
        model: this.ua.device.model,
        type: this.ua.device.type,
        vendor: this.ua.device.vendor
      },
      clientData: {
        ...this.ch
      }
    };
  }
  getClientHints() {
    return this.ch;
  }
  async getAppInstanceId() {
    return this.appSettings ? {
      answer: { type: device.AnswerType.VALUE },
      value: this.appSettings.instanceId
    } : void 0;
  }
  getOsVersion() {
    let ua = this.getUserAgent();
    let ch = {};
    if (ua.clientData) {
      ch.answer = { type: device.AnswerType.VALUE };
      for (const key2 in ua.clientData) {
        if (key2 === "brands")
          continue;
        ch[key2] = { value: ua.clientData[key2] };
      }
    } else {
      ch.answer = { type: device.AnswerType.UNSUPPORTED };
    }
    return {
      answer: { type: device.AnswerType.VALUE },
      userAgent: {
        type: device.AnswerType.VALUE,
        value: navigator.userAgent
      },
      userAgentData: {
        answer: { type: device.AnswerType.VALUE },
        browser: {
          answer: { type: device.AnswerType.VALUE },
          name: {
            answer: { type: device.AnswerType.VALUE },
            value: this.ua.browser.name
          },
          version: {
            answer: { type: device.AnswerType.VALUE },
            value: this.ua.browser.version
          },
          engineName: {
            answer: { type: device.AnswerType.VALUE },
            value: this.ua.engine.name
          },
          engineVersion: {
            answer: { type: device.AnswerType.VALUE },
            value: this.ua.engine.version
          }
        },
        platform: {
          answer: { type: device.AnswerType.VALUE },
          name: {
            answer: { type: device.AnswerType.VALUE },
            value: this.ua.os.name
          },
          version: {
            answer: { type: device.AnswerType.VALUE },
            value: this.ua.os.version
          }
        },
        hostPlatform: {
          answer: { type: device.AnswerType.VALUE },
          name: {
            answer: { type: device.AnswerType.VALUE },
            value: this.ua.os.name
          },
          version: {
            answer: { type: device.AnswerType.VALUE },
            value: this.ua.os.version
          }
        },
        device: {
          answer: { type: device.AnswerType.VALUE },
          architecture: {
            answer: { type: device.AnswerType.VALUE },
            value: this.ua.cpu.architecture
          },
          model: {
            answer: { type: device.AnswerType.VALUE },
            value: this.ua.device.model
          },
          type: {
            answer: { type: device.AnswerType.VALUE },
            value: this.ua.device.type
          },
          vendor: {
            answer: { type: device.AnswerType.VALUE },
            value: this.ua.device.vendor
          }
        },
        clientData: ch
      }
    };
  }
  async getAuthentication() {
    const webAuthn = !!window.PublicKeyCredential;
    const platformAuthn = webAuthn && await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    return {
      answer: { type: device.AnswerType.VALUE },
      isWebauthnAvailable: {
        answer: { type: device.AnswerType.VALUE },
        value: webAuthn
      },
      isPlatformAuthenticatorAvailable: {
        answer: { type: device.AnswerType.VALUE },
        value: platformAuthn
      }
    };
  }
};
async function kmc_get_user_agent() {
  const data2 = await Data.collect();
  return data2.getUserAgent();
}
async function kmc_get_device_info(db) {
  const deviceInfo = new device.DeviceInfo();
  const data2 = await Data.collect(db);
  const osVersion = data2.getOsVersion();
  deviceInfo.answer = { type: device.AnswerType.VALUE };
  deviceInfo.platform = osVersion.userAgentData.platform.name === "Chrome OS" ? device.Platform.CHROMEOSWEB : device.Platform.WEB;
  deviceInfo.osVersion = osVersion;
  deviceInfo.core = device.Core.RUST;
  const appVersion = "1.0.0";
  deviceInfo.appVersion = {
    answer: { type: device.AnswerType.VALUE },
    value: appVersion
  };
  deviceInfo.appInstanceId = await data2.getAppInstanceId();
  deviceInfo.authentication = await data2.getAuthentication();
  return kmc_encode_device_info(deviceInfo);
}
function kmc_encode_device_info(info) {
  return device.DeviceInfo.encode(info).finish();
}
function kmc_decode_device_info(buf) {
  return device.DeviceInfo.decode(buf);
}
export {
  kmc_add_authenticator_client_id,
  kmc_close_db,
  kmc_decode_device_info,
  kmc_decrypt,
  kmc_delete_all_authenticator_client_ids,
  kmc_delete_cert,
  kmc_delete_key,
  kmc_delete_profile,
  kmc_encode_device_info,
  kmc_encrypt,
  kmc_generate_key,
  kmc_get_all_profiles,
  kmc_get_app_settings,
  kmc_get_cert,
  kmc_get_device_info,
  kmc_get_key,
  kmc_get_profile,
  kmc_get_profile_by_id,
  kmc_get_user_agent,
  kmc_has_profile,
  kmc_is_key_webauthn_backed,
  kmc_open_db,
  kmc_public_key,
  kmc_put_app_settings,
  kmc_put_cert,
  kmc_reset_db,
  kmc_save_key,
  kmc_sign,
  kmc_update_profile_metadata,
  kmc_verify,
  kmc_write_profile,
  kmc_write_profile_id
};
