if (!nl) {
  var nl = {}
}
if (!nl.drew) {
  nl.drew = {};
}
if (!nl.drew.cp) {
  nl.drew.cp = {};
}
nl.drew.cp.lib = function() {
  var lib = {};
  lib.l = function(m) {
    return chrome.i18n.getMessage(m);
  };
  lib.checkProxyUrl = function(addr) {
    var ipSplit = addr.split(/\:/g);
    if (typeof ipSplit[1] != "undefined") {
      if (ipSplit[1] < 65535 && ipSplit[1] > 0) {
        if (this.isipv4(ipSplit[0]) || this.isipv6(ipSplit[0])) {
          return{ip:ipSplit[0], port:ipSplit[1]};
        }
        var purl;
        if ((purl = this.parseUrl(ipSplit[0])) != false || (purl = this.parseUrl("http://" + ipSplit[0])) != false) {
          return{ip:purl.host, port:ipSplit[1]};
        }
      }
    }
    return false;
  };
  lib.isipv4 = function(addr) {
    if (/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(addr)) {
      return true;
    }
    return false;
  };
  lib.isipv6 = function(addr) {
    var ipSplit = addr.split(/\]:/g);
    if (typeof ipSplit[1] != "undefined") {
      if (ipSplit[1] < 65535 && ipSplit[1] > 0) {
        ipSplit = ipSplit[0].split(/\[/g);
        if (typeof ipSplit[1] != "undefined") {
          return/^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i.test(ipSplit[1]);
        }
      }
    }
    return false;
  };
  lib.ReqJson = function(url, timeout, onSuccess, onError, onTimeout, type, data) {
    if (!type) {
      type = "GET";
    }
    if (!data) {
      data = null;
    }
    var xhr = new XMLHttpRequest;
    xhr.onabort = function() {
      onError("abort");
    };
    xhr.ontimeout = function() {
      onTimeout("onTimeout");
    };
    xhr.onerror = function() {
      onError(xhr.status + " " + xhr.statusText);
    };
    xhr.onload = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError(xhr.status);
        }
      }
    };
    try {
      xhr.open(type, url, true);
    } catch (e) {
      return;
    }
    if (type == "POST") {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    xhr.timeout = timeout;
    try {
      xhr.send(data);
    } catch (e) {
      return;
    }
  };
  lib.urlvalid = new RegExp("^" + "(?:(?:https?|ftp)://)" + "(?:\\S+(?::\\S*)?@)?" + "(?:" + "(?!(?:10|127)(?:\\.\\d{1,3}){3})" + "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" + "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" + "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" + "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" + "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" + 
  "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" + ")" + "(?::\\d{2,5})?" + "(?:/\\S*)?" + "$", "i");
  lib.debug = function(mess) {
    if (nl.drew.cp.config.isDebug) {
      if (typeof mess != "number" && typeof mess != "string") {
        mess = JSON.stringify(mess);
      }
      console.log(mess);
    }
    return nl.drew.cp.config.isDebug;
  };
  lib.clone = function(obj) {
    if (obj == null || typeof obj != "object") {
      return obj;
    }
    var temp = {};
    for (var key in obj) {
      temp[key] = nl.drew.cp.lib.clone(obj[key]);
    }
    return temp;
  };
  lib.time = function() {
    return parseInt((new Date).getTime() / 1E3);
  };
  lib.timems = function() {
    return parseInt((new Date).getTime());
  };
  lib.parseUrl = function(url) {
    if (!nl.drew.cp.lib.urlvalid.test(url)) {
      return false;
    }
    try {
      var purl = new URL(url);
    } catch (e) {
      return false;
    }
    if (purl.protocol == "http:" || purl.protocol == "https:") {
      purl.allow = true;
    } else {
      purl.allow = false;
    }
    return nl.drew.cp.lib.clone(purl);
  };
  lib.generatePW = function(c) {
    var i, s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", pw = "";
    if (!c) {
      c = 16;
    }
    for (i = 0;i < c;i++) {
      pw += s.charAt(Math.random() * 61);
    }
    return pw;
  };
  lib.sIncrease = function(i, ii) {
    if (i > ii) {
      return 1;
    } else {
      if (i < ii) {
        return-1;
      } else {
        return 0;
      }
    }
  };
  lib.sDecrease = function(i, ii) {
    if (i > ii) {
      return-1;
    } else {
      if (i < ii) {
        return 1;
      } else {
        return 0;
      }
    }
  };
  lib.naturalSort = function(array, extractor) {
    var splitters = array.map(makeSplitter);
    var sorted = splitters.sort(compareSplitters);
    return sorted.map(function(splitter) {
      return splitter.item;
    });
    function makeSplitter(item) {
      return new Splitter(item);
    }
    function Splitter(item) {
      var index = 0;
      var from = 0;
      var parts = [];
      var completed = false;
      this.item = item;
      var key = typeof extractor === "function" ? extractor(item) : item;
      this.key = key;
      this.count = function() {
        return parts.length;
      };
      this.part = function(i) {
        while (parts.length <= i && !completed) {
          next();
        }
        return i < parts.length ? parts[i] : null;
      };
      function next() {
        if (index < key.length) {
          while (++index) {
            var currentIsDigit = isDigit(key.charAt(index - 1));
            var nextChar = key.charAt(index);
            var currentIsLast = index === key.length;
            var isBorder = currentIsLast || xor(currentIsDigit, isDigit(nextChar));
            if (isBorder) {
              var partStr = key.slice(from, index);
              parts.push(new Part(partStr, currentIsDigit));
              from = index;
              break;
            }
          }
        } else {
          completed = true;
        }
      }
      function Part(text, isNumber) {
        this.isNumber = isNumber;
        this.value = isNumber ? Number(text) : text;
      }
    }
    function compareSplitters(sp1, sp2) {
      var i = 0;
      do {
        var first = sp1.part(i);
        var second = sp2.part(i);
        if (null !== first && null !== second) {
          if (xor(first.isNumber, second.isNumber)) {
            return first.isNumber ? -1 : 1;
          } else {
            var comp = compare(first.value, second.value);
            if (comp != 0) {
              return comp;
            }
          }
        } else {
          return compare(sp1.count(), sp2.count());
        }
      } while (++i);
      function compare(a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
      }
    }
    function xor(a, b) {
      return a ? !b : b;
    }
    function isDigit(chr) {
      var code = charCode(chr);
      return code >= charCode("0") && code <= charCode("9");
      function charCode(ch) {
        return ch.charCodeAt(0);
      }
    }
  };
  lib.quickquickInArray = function(it, arr) {
    var i;
    while (i = arr.shift()) {
      if (i.host == it) {
        return i;
      }
    }
    return false;
  };
  lib.isNumeric = function(obj) {
    return typeof obj != "array" && obj - parseFloat(obj) + 1 >= 0;
  };
  return lib;
}();

