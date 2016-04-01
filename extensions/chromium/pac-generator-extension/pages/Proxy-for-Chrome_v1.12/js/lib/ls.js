if (!nl) {
  var nl = {}
}
if (!nl.drew) {
  nl.drew = {};
}
if (!nl.drew.cp) {
  nl.drew.cp = {};
}
nl.drew.cp.ls = function() {
  var ls = {};
  ls.isset = function(key) {
    if (typeof localStorage[key] != "undefined") {
      return true;
    } else {
      return false;
    }
  };
  ls.get = function(key, enc) {
    if (localStorage.getItem(key) !== null) {
      if (enc) {
        var denc = XXTEA.decrypt(localStorage.getItem(key), enc);
        if (denc) {
          return JSON.parse(Utf8.decode(denc));
        } else {
          return "";
        }
      } else {
        return JSON.parse(localStorage.getItem(key));
      }
    } else {
      return null;
    }
  };
  ls.set = function(key, val, enc) {
    val = JSON.stringify(val);
    if (enc) {
      val = XXTEA.encrypt(Utf8.encode(val), enc);
    }
    localStorage.setItem(key, val);
  };
  ls.del = function(key) {
    localStorage.removeItem(key);
  };
  ls.getAll = function() {
    ret = {};
    Object.each(localStorage, function(value, host) {
      try {
        ret[host] = JSON.parse(value);
      } catch (e) {
      }
    });
    return ret;
  };
  return ls;
}();
var delta = 2654435769;
function longArrayToString(data, includeLength) {
  var length = data.length, n = length - 1 << 2;
  if (includeLength) {
    var m = data[length - 1];
    if (m < n - 3 || m > n) {
      return null;
    }
    n = m;
  }
  for (var i = 0;i < length;++i) {
    data[i] = String.fromCharCode(data[i] & 255, data[i] >>> 8 & 255, data[i] >>> 16 & 255, data[i] >>> 24 & 255);
  }
  if (includeLength) {
    return data.join("").substring(0, n);
  } else {
    return data.join("");
  }
}
function stringToLongArray(string, includeLength) {
  var length = string.length;
  var result = [];
  for (var i = 0;i < length;i += 4) {
    result[i >> 2] = string.charCodeAt(i) | string.charCodeAt(i + 1) << 8 | string.charCodeAt(i + 2) << 16 | string.charCodeAt(i + 3) << 24;
  }
  if (includeLength) {
    result[result.length] = length;
  }
  return result;
}
var XXTEA = {encrypt:function(string, key) {
  if (string == "") {
    return "";
  }
  var v = stringToLongArray(string, true), k = stringToLongArray(key, false), n = v.length - 1, z = v[n], y = v[0], mx, e, p, q = Math.floor(6 + 52 / (n + 1)), sum = 0;
  if (k.length < 4) {
    k.length = 4;
  }
  while (0 <= --q) {
    sum = sum + delta & 4294967295;
    e = sum >>> 2 & 3;
    for (p = 0;p < n;++p) {
      y = v[p + 1];
      mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
      z = v[p] = v[p] + mx & 4294967295;
    }
    y = v[0];
    mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
    z = v[n] = v[n] + mx & 4294967295;
  }
  return longArrayToString(v, false);
}, decrypt:function(string, key) {
  if (string == "") {
    return "";
  }
  var v = stringToLongArray(string, false);
  var k = stringToLongArray(key, false);
  if (k.length < 4) {
    k.length = 4;
  }
  var n = v.length - 1;
  var z = v[n - 1], y = v[0];
  var mx, e, p, q = Math.floor(6 + 52 / (n + 1)), sum = q * delta & 4294967295;
  while (sum != 0) {
    e = sum >>> 2 & 3;
    for (p = n;p > 0;--p) {
      z = v[p - 1];
      mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
      y = v[p] = v[p] - mx & 4294967295;
    }
    z = v[n];
    mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
    y = v[0] = v[0] - mx & 4294967295;
    sum = sum - delta & 4294967295;
  }
  return longArrayToString(v, true);
}};
var Base64 = {};
Base64.code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
Base64.encode = function(str, utf8encode) {
  utf8encode = typeof utf8encode == "undefined" ? false : utf8encode;
  var o1, o2, o3, bits, h1, h2, h3, h4, e = [], pad = "", c, plain, coded;
  var b64 = Base64.code;
  plain = utf8encode ? Utf8.encode(str) : str;
  c = plain.length % 3;
  if (c > 0) {
    while (c++ < 3) {
      pad += "=";
      plain += "\x00";
    }
  }
  for (c = 0;c < plain.length;c += 3) {
    o1 = plain.charCodeAt(c);
    o2 = plain.charCodeAt(c + 1);
    o3 = plain.charCodeAt(c + 2);
    bits = o1 << 16 | o2 << 8 | o3;
    h1 = bits >> 18 & 63;
    h2 = bits >> 12 & 63;
    h3 = bits >> 6 & 63;
    h4 = bits & 63;
    e[c / 3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  }
  coded = e.join("");
  coded = coded.slice(0, coded.length - pad.length) + pad;
  return coded;
};
Base64.decode = function(str, utf8decode) {
  str = str.replace(/\n/gm, "");
  utf8decode = typeof utf8decode == "undefined" ? false : utf8decode;
  var o1, o2, o3, h1, h2, h3, h4, bits, d = [], plain, coded;
  var b64 = Base64.code;
  coded = utf8decode ? Utf8.decode(str) : str;
  for (var c = 0;c < coded.length;c += 4) {
    h1 = b64.indexOf(coded.charAt(c));
    h2 = b64.indexOf(coded.charAt(c + 1));
    h3 = b64.indexOf(coded.charAt(c + 2));
    h4 = b64.indexOf(coded.charAt(c + 3));
    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
    o1 = bits >>> 16 & 255;
    o2 = bits >>> 8 & 255;
    o3 = bits & 255;
    d[c / 4] = String.fromCharCode(o1, o2, o3);
    if (h4 == 64) {
      d[c / 4] = String.fromCharCode(o1, o2);
    }
    if (h3 == 64) {
      d[c / 4] = String.fromCharCode(o1);
    }
  }
  plain = d.join("");
  return utf8decode ? Utf8.decode(plain) : plain;
};
var Utf8 = {};
Utf8.encode = function(strUni) {
  var strUtf = strUni.replace(/[\u0080-\u07ff]/g, function(c) {
    var cc = c.charCodeAt(0);
    return String.fromCharCode(192 | cc >> 6, 128 | cc & 63);
  });
  strUtf = strUtf.replace(/[\u0800-\uffff]/g, function(c) {
    var cc = c.charCodeAt(0);
    return String.fromCharCode(224 | cc >> 12, 128 | cc >> 6 & 63, 128 | cc & 63);
  });
  return strUtf;
};
Utf8.decode = function(strUtf) {
  var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function(c) {
    var cc = (c.charCodeAt(0) & 15) << 12 | (c.charCodeAt(1) & 63) << 6 | c.charCodeAt(2) & 63;
    return String.fromCharCode(cc);
  });
  strUni = strUni.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function(c) {
    var cc = (c.charCodeAt(0) & 31) << 6 | c.charCodeAt(1) & 63;
    return String.fromCharCode(cc);
  });
  return strUni;
};

