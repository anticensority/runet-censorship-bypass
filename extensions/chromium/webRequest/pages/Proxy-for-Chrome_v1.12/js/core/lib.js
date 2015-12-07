nl.drew.cp.core.lib = function() {
  var lib = {};
  lib.inTorSiteList = function(host) {
    return this.isUriInAnyList(host, nl.drew.cp.state.listTorSite);
  };
  lib.inAnSiteList = function(host) {
    return this.isUriInAnyList(host, nl.drew.cp.state.listAnSite);
  };
  lib.inAnSiteListEqually = function(host) {
    return this.quickInArray2(host, nl.drew.cp.state.listAnSite);
  };
  lib.inAlwProxySiteList = function(host) {
    return this.isUriInAnyList(host, nl.drew.cp.state.listAlwProxySite);
  };
  lib.inAlwProxySiteListEqually = function(host) {
    return this.quickInArray2(host, nl.drew.cp.state.listAlwProxySite);
  };
  lib.inNonProxySiteList = function(host) {
    return this.isUriInAnyList(host, nl.drew.cp.state.listNonProxySite);
  };
  lib.inNonProxySiteListEqually = function(host) {
    return this.quickInArray2(host, nl.drew.cp.state.listNonProxySite);
  };
  lib.inOffSiteList = function(host) {
    return this.quickInArray(host, nl.drew.cp.state.offlist);
  };
  lib.inUproxyList = function(co) {
    var i = nl.drew.cp.state.uproxys.length;
    while (i--) {
      if (typeof nl.drew.cp.state.uproxys[i] == "undefined") {
        continue;
      }
      if (nl.drew.cp.state.uproxys[i].co == co) {
        return i;
      }
    }
    return-1;
  };
  lib.inOffSiteListAllParam = function(obj) {
    var i = nl.drew.cp.state.offlist.length;
    while (i--) {
      if (typeof nl.drew.cp.state.offlist[i] == "undefined") {
        continue;
      }
      if (nl.drew.cp.state.offlist[i].host == obj.host && nl.drew.cp.state.offlist[i].an == obj.an && nl.drew.cp.state.offlist[i].nonproxy == obj.nonproxy && nl.drew.cp.state.offlist[i].alwproxy == obj.alwproxy && nl.drew.cp.state.offlist[i].loc == obj.loc) {
        return i;
      }
    }
    return-1;
  };
  lib.isUriInAnyList = function(host, list) {
    var i, lenHost;
    if (!host) {
      return-1;
    }
    i = list.length;
    while (i--) {
      if (typeof list[i] == "undefined") {
        continue;
      }
      if (list[i] == host) {
        return i;
      } else {
        if (list[i][0] == "*") {
          lenHost = -1 * (list[i].length - 2);
          if (list[i].substr(lenHost) == host.substr(lenHost)) {
            return i;
          }
        }
      }
    }
    return-1;
  };
  lib.delContrySiteList = function(host) {
    if (host) {
      var key;
      var ind;
      for (key in nl.drew.cp.state.listContrySite) {
        if (!nl.drew.cp.state.listContrySite.hasOwnProperty(key)) {
          continue;
        }
        if (nl.drew.cp.state.listContrySite[key].length < 1) {
          continue;
        }
        ind = this.isUriInAnyList(host, nl.drew.cp.state.listContrySite[key]);
        if (ind > -1) {
          nl.drew.cp.state.listContrySite[key].splice(ind, 1);
        }
      }
    }
  };
  lib.inContrySiteList = function(host) {
    if (host) {
      var key;
      var nowProxys = nl.drew.cp.core.proxy.getNowProxys();
      for (key in nl.drew.cp.state.listContrySite) {
        if (!nl.drew.cp.state.listContrySite.hasOwnProperty(key)) {
          continue;
        }
        if (nl.drew.cp.state.listContrySite[key].length < 1) {
          continue;
        }
        if (this.isUriInAnyList(host, nl.drew.cp.state.listContrySite[key]) > -1) {
          if (nowProxys.hasOwnProperty(key)) {
            return key;
          }
        }
      }
    }
    return "main";
  };
  lib.inContrySiteListEqually = function(host) {
    if (host) {
      var key;
      for (key in nl.drew.cp.state.listContrySite) {
        if (!nl.drew.cp.state.listContrySite.hasOwnProperty(key)) {
          continue;
        }
        if (nl.drew.cp.state.listContrySite[key].length < 1) {
          continue;
        }
        if (this.quickInArray2(host, nl.drew.cp.state.listContrySite[key]) > -1) {
          return key;
        }
      }
    }
    return "main";
  };
  lib.quickInArray = function(it, arr) {
    var i = arr.length;
    while (i--) {
      if (arr[i].host == it) {
        return i;
      }
    }
    return-1;
  };
  lib.quickInArray2 = function(it, arr) {
    var i = arr.length;
    while (i--) {
      if (typeof arr[i] == "undefined") {
        continue;
      }
      if (arr[i] == it) {
        return i;
      }
    }
    return-1;
  };
  lib.globalListGen = function() {
    var retGlobal = [];
    var i, findkey;
    var listNonProxySite = nl.drew.cp.state.listNonProxySite.slice();
    var listAlwProxySite = nl.drew.cp.state.listAlwProxySite.slice();
    var offlist = nl.drew.cp.state.offlist.slice();
    while (i = offlist.shift()) {
      retGlobal.push(i);
    }
    while (i = listNonProxySite.shift()) {
      retGlobal.push({host:i, nonproxy:true, alwproxy:false, an:false, loc:"", del:false, off:false});
    }
    while (i = listAlwProxySite.shift()) {
      retGlobal.push({host:i, alwproxy:true, nonproxy:false, an:false, loc:"", del:false, off:false});
    }
    var j = nl.drew.cp.state.listAnSite.length;
    while (j--) {
      if (typeof nl.drew.cp.state.listAnSite[j] == "undefined") {
        continue;
      }
      if ((findkey = this.quickInArray(nl.drew.cp.state.listAnSite[j], retGlobal)) != -1) {
        retGlobal[findkey].an = true;
      } else {
        retGlobal.push({host:nl.drew.cp.state.listAnSite[j], an:true, nonproxy:false, alwproxy:false, loc:"", del:false, off:false});
      }
    }
    var key;
    for (key in nl.drew.cp.state.listContrySite) {
      if (!nl.drew.cp.state.listContrySite.hasOwnProperty(key)) {
        continue;
      }
      j = nl.drew.cp.state.listContrySite[key].length;
      if (j < 1) {
        continue;
      }
      while (j--) {
        if (typeof nl.drew.cp.state.listContrySite[key][j] == "undefined") {
          continue;
        }
        if ((findkey = this.quickInArray(nl.drew.cp.state.listContrySite[key][j], retGlobal)) != -1) {
          retGlobal[findkey].loc = key;
        } else {
          retGlobal.push({host:nl.drew.cp.state.listContrySite[key][j], loc:key, nonproxy:false, alwproxy:false, an:false, del:false, off:false});
        }
      }
    }
    var i = retGlobal.length;
    while (i--) {
      if (typeof retGlobal[i].par == "undefined") {
        retGlobal[i].par = -1;
      }
      if (retGlobal[i].host[0] == "*") {
        var lenHost = -1 * (retGlobal[i].host.length - 2);
        var j = retGlobal.length;
        while (j--) {
          if (i != j) {
            if (retGlobal[i].host.substr(lenHost) == retGlobal[j].host.substr(lenHost)) {
              if (typeof retGlobal[j].par != "undefined" && retGlobal[j].par > -1) {
                if (retGlobal[i].host.length > retGlobal[retGlobal[j].par].host.length) {
                  retGlobal[j].par = i;
                }
              } else {
                retGlobal[j].par = i;
              }
            }
          }
        }
      }
    }
    return retGlobal;
  };
  lib.returnGen = function(nowProxy) {
    var ret = "return 'DIRECT'";
    if (nowProxy) {
      if (nowProxy.co.length == 2) {
        ret = "if ( schema=='https' ) " + "return 'SOCKS5 " + nowProxy.ip + ":" + nowProxy.sport + "'; " + "else " + "return 'HTTPS " + nowProxy.ip + ":" + nowProxy.port + "'; ";
      } else {
        nowProxy.proto = nowProxy.proto.toUpperCase();
        ret = "return '" + nowProxy.proto + " " + nowProxy.ip + ":" + nowProxy.port + "'; ";
        if (nowProxy.proto != "SOCKS5" && nowProxy.proto != "SOCKS") {
          ret = "if ( schema=='http:' ) " + ret;
        }
      }
    }
    return ret;
  };
  lib.searchInListCodeGen = function(listName, list, action) {
    var ret;
    if (list.length < 1) {
      return " ";
    }
    var listJson = JSON.stringify(list);
    ret = " var " + listName + " = " + listJson + "; " + "for (var i = 0, length = " + listName + ".length; i < length; i++) if (" + listName + ".hasOwnProperty(i)) {" + "if (" + listName + "[i]==host) {" + action + "break; } else {" + "if (" + listName + "[i][0] == '*') { " + "var lenHost = -1 * (" + listName + "[i].length - 2);" + "if (" + listName + "[i].substr(lenHost) == host.substr(lenHost)) {" + action + "break; }}}}";
    return ret;
  };
  lib.checkListOnOff = function(host) {
    var offiteam = {host:"", nonproxy:false, alwproxy:false, an:false, loc:"", del:false, off:true};
    var ch = false;
    if (nl.drew.cp.core.lib.inAnSiteListEqually(host) > -1) {
      ch = true;
      offiteam.an = true;
    }
    var co = nl.drew.cp.core.lib.inContrySiteListEqually(host);
    if (co != "main") {
      offiteam.loc = co;
      ch = true;
    }
    if (nl.drew.cp.core.lib.inAlwProxySiteListEqually(host) > -1) {
      ch = true;
      offiteam.alwproxy = true;
    }
    if (nl.drew.cp.core.lib.inNonProxySiteListEqually(host) > -1) {
      ch = true;
      offiteam.nonproxy = true;
    }
    if (ch) {
      offiteam.host = host;
      return nl.drew.cp.core.lib.inOffSiteListAllParam(offiteam);
    }
    return-1;
  };
  lib.liston = function(val, onlsave) {
    nl.drew.cp.core.cache.nowProxyClean(val);
    if (!onlsave) {
      var lid = nl.drew.cp.core.lib.inOffSiteListAllParam(val);
      if (lid == -1) {
        return;
      }
    }
    var host = val.host;
    this.listoff(host);
    var ind;
    if (val.an) {
      if (nl.drew.cp.core.lib.inAnSiteListEqually(host) == -1) {
        nl.drew.cp.state.listAnSite.push(host);
        nl.drew.cp.ls.set("anSite", nl.drew.cp.state.listAnSite, false);
        nl.drew.cp.core.api.sendtoPortAnonymitynow({host:host, list:true});
        nl.drew.cp.core.api.sendtoPortAnonymity({host:host, list:true});
      }
    }
    if (val.nonproxy) {
      if (nl.drew.cp.core.lib.inNonProxySiteListEqually(host) == -1) {
        nl.drew.cp.state.listNonProxySite.push(host);
      }
      ind = nl.drew.cp.core.lib.inAlwProxySiteListEqually(host);
      if (ind > -1) {
        nl.drew.cp.state.listAlwProxySite.splice(ind, 1);
      }
      nl.drew.cp.ls.set("alwProxySite", nl.drew.cp.state.listAlwProxySite, false);
      nl.drew.cp.ls.set("nonProxySite", nl.drew.cp.state.listNonProxySite, false);
    } else {
      if (val.alwproxy) {
        if (nl.drew.cp.core.lib.inAlwProxySiteListEqually(host) == -1) {
          nl.drew.cp.state.listAlwProxySite.push(host);
        }
        ind = nl.drew.cp.core.lib.inNonProxySiteListEqually(host);
        if (ind > -1) {
          nl.drew.cp.state.listNonProxySite.splice(ind, 1);
        }
        nl.drew.cp.ls.set("alwProxySite", nl.drew.cp.state.listAlwProxySite, false);
        nl.drew.cp.ls.set("nonProxySite", nl.drew.cp.state.listNonProxySite, false);
      }
    }
    if (val.loc) {
      if (val.loc != "main") {
        nl.drew.cp.core.lib.delContrySiteList(host);
        if (typeof nl.drew.cp.state.listContrySite[val.loc] == "undefined") {
          nl.drew.cp.state.listContrySite[val.loc] = [];
        }
        nl.drew.cp.state.listContrySite[val.loc].push(host);
        nl.drew.cp.ls.set("contrySiteList", nl.drew.cp.state.listContrySite, false);
        nl.drew.cp.core.api.sendtoPortContrys({host:host, list:true});
      }
    }
    nl.drew.cp.core.filter.inst();
    nl.drew.cp.core.api.sendtoPortInProxyList({host:host, list:true});
    if (!onlsave) {
      nl.drew.cp.state.offlist.splice(lid, 1);
      nl.drew.cp.ls.set("offlist", nl.drew.cp.state.offlist, false);
    }
  };
  lib.listoff = function(host, onlremove, nosendtoport) {
    nl.drew.cp.lib.debug(host);
    nl.drew.cp.core.cache.nowProxyClean({host:host});
    var offiteam = {host:"", nonproxy:false, alwproxy:false, an:false, loc:"", del:false, off:true};
    var an, nonproxy, alwproxy;
    var ch = false;
    if ((an = nl.drew.cp.core.lib.inAnSiteListEqually(host)) > -1) {
      ch = true;
      offiteam.an = true;
    }
    var co = nl.drew.cp.core.lib.inContrySiteListEqually(host);
    if (co != "main") {
      offiteam.loc = co;
      ch = true;
    }
    if ((alwproxy = nl.drew.cp.core.lib.inAlwProxySiteListEqually(host)) > -1) {
      ch = true;
      offiteam.alwproxy = true;
    }
    if ((nonproxy = nl.drew.cp.core.lib.inNonProxySiteListEqually(host)) > -1) {
      ch = true;
      offiteam.nonproxy = true;
    }
    if (ch) {
      nl.drew.cp.lib.debug(offiteam);
      offiteam.host = host;
      if (offiteam.an) {
        nl.drew.cp.state.listAnSite.splice(an, 1);
        nl.drew.cp.ls.set("anSite", nl.drew.cp.state.listAnSite, false);
        if (!nosendtoport) {
          nl.drew.cp.core.api.sendtoPortAnonymitynow({host:host, list:true});
          nl.drew.cp.core.api.sendtoPortAnonymity({host:host, list:true});
        }
      }
      if (offiteam.alwproxy) {
        nl.drew.cp.state.listAlwProxySite.splice(alwproxy, 1);
        nl.drew.cp.ls.set("alwProxySite", nl.drew.cp.state.listAlwProxySite, false);
      } else {
        if (offiteam.nonproxy) {
          nl.drew.cp.state.listNonProxySite.splice(nonproxy, 1);
          nl.drew.cp.ls.set("nonProxySite", nl.drew.cp.state.listNonProxySite, false);
        }
      }
      if (co) {
        nl.drew.cp.core.lib.delContrySiteList(host);
        nl.drew.cp.ls.set("contrySiteList", nl.drew.cp.state.listContrySite, false);
        if (!nosendtoport) {
          nl.drew.cp.core.api.sendtoPortContrys({host:host, list:true});
        }
      }
      nl.drew.cp.core.filter.inst();
      if (!nosendtoport) {
        nl.drew.cp.core.api.sendtoPortInProxyList({host:host, list:true});
      }
      if (!onlremove) {
        if (this.inOffSiteListAllParam(offiteam) == -1) {
          nl.drew.cp.state.offlist.push(offiteam);
        }
        nl.drew.cp.ls.set("offlist", nl.drew.cp.state.offlist, false);
      }
    }
  };
  lib.MD5 = function(e) {
    function h(a, b) {
      var c, d, e, f, g;
      e = a & 2147483648;
      f = b & 2147483648;
      c = a & 1073741824;
      d = b & 1073741824;
      g = (a & 1073741823) + (b & 1073741823);
      return c & d ? g ^ 2147483648 ^ e ^ f : c | d ? g & 1073741824 ? g ^ 3221225472 ^ e ^ f : g ^ 1073741824 ^ e ^ f : g ^ e ^ f;
    }
    function k(a, b, c, d, e, f, g) {
      a = h(a, h(h(b & c | ~b & d, e), g));
      return h(a << f | a >>> 32 - f, b);
    }
    function l(a, b, c, d, e, f, g) {
      a = h(a, h(h(b & d | c & ~d, e), g));
      return h(a << f | a >>> 32 - f, b);
    }
    function m(a, b, d, c, e, f, g) {
      a = h(a, h(h(b ^ d ^ c, e), g));
      return h(a << f | a >>> 32 - f, b);
    }
    function n(a, b, d, c, e, f, g) {
      a = h(a, h(h(d ^ (b | ~c), e), g));
      return h(a << f | a >>> 32 - f, b);
    }
    function p(a) {
      var b = "", d = "", c;
      for (c = 0;3 >= c;c++) {
        d = a >>> 8 * c & 255, d = "0" + d.toString(16), b += d.substr(d.length - 2, 2);
      }
      return b;
    }
    var f = [], q, r, s, t, a, b, c, d;
    e = function(a) {
      a = a.replace(/\r\n/g, "\n");
      for (var b = "", d = 0;d < a.length;d++) {
        var c = a.charCodeAt(d);
        128 > c ? b += String.fromCharCode(c) : (127 < c && 2048 > c ? b += String.fromCharCode(c >> 6 | 192) : (b += String.fromCharCode(c >> 12 | 224), b += String.fromCharCode(c >> 6 & 63 | 128)), b += String.fromCharCode(c & 63 | 128));
      }
      return b;
    }(e);
    f = function(b) {
      var a, c = b.length;
      a = c + 8;
      for (var d = 16 * ((a - a % 64) / 64 + 1), e = Array(d - 1), f = 0, g = 0;g < c;) {
        a = (g - g % 4) / 4, f = g % 4 * 8, e[a] |= b.charCodeAt(g) << f, g++;
      }
      a = (g - g % 4) / 4;
      e[a] |= 128 << g % 4 * 8;
      e[d - 2] = c << 3;
      e[d - 1] = c >>> 29;
      return e;
    }(e);
    a = 1732584193;
    b = 4023233417;
    c = 2562383102;
    d = 271733878;
    for (e = 0;e < f.length;e += 16) {
      q = a, r = b, s = c, t = d, a = k(a, b, c, d, f[e + 0], 7, 3614090360), d = k(d, a, b, c, f[e + 1], 12, 3905402710), c = k(c, d, a, b, f[e + 2], 17, 606105819), b = k(b, c, d, a, f[e + 3], 22, 3250441966), a = k(a, b, c, d, f[e + 4], 7, 4118548399), d = k(d, a, b, c, f[e + 5], 12, 1200080426), c = k(c, d, a, b, f[e + 6], 17, 2821735955), b = k(b, c, d, a, f[e + 7], 22, 4249261313), a = k(a, b, c, d, f[e + 8], 7, 1770035416), d = k(d, a, b, c, f[e + 9], 12, 2336552879), c = k(c, d, a, b, f[e + 
      10], 17, 4294925233), b = k(b, c, d, a, f[e + 11], 22, 2304563134), a = k(a, b, c, d, f[e + 12], 7, 1804603682), d = k(d, a, b, c, f[e + 13], 12, 4254626195), c = k(c, d, a, b, f[e + 14], 17, 2792965006), b = k(b, c, d, a, f[e + 15], 22, 1236535329), a = l(a, b, c, d, f[e + 1], 5, 4129170786), d = l(d, a, b, c, f[e + 6], 9, 3225465664), c = l(c, d, a, b, f[e + 11], 14, 643717713), b = l(b, c, d, a, f[e + 0], 20, 3921069994), a = l(a, b, c, d, f[e + 5], 5, 3593408605), d = l(d, a, b, c, f[e + 
      10], 9, 38016083), c = l(c, d, a, b, f[e + 15], 14, 3634488961), b = l(b, c, d, a, f[e + 4], 20, 3889429448), a = l(a, b, c, d, f[e + 9], 5, 568446438), d = l(d, a, b, c, f[e + 14], 9, 3275163606), c = l(c, d, a, b, f[e + 3], 14, 4107603335), b = l(b, c, d, a, f[e + 8], 20, 1163531501), a = l(a, b, c, d, f[e + 13], 5, 2850285829), d = l(d, a, b, c, f[e + 2], 9, 4243563512), c = l(c, d, a, b, f[e + 7], 14, 1735328473), b = l(b, c, d, a, f[e + 12], 20, 2368359562), a = m(a, b, c, d, f[e + 5], 
      4, 4294588738), d = m(d, a, b, c, f[e + 8], 11, 2272392833), c = m(c, d, a, b, f[e + 11], 16, 1839030562), b = m(b, c, d, a, f[e + 14], 23, 4259657740), a = m(a, b, c, d, f[e + 1], 4, 2763975236), d = m(d, a, b, c, f[e + 4], 11, 1272893353), c = m(c, d, a, b, f[e + 7], 16, 4139469664), b = m(b, c, d, a, f[e + 10], 23, 3200236656), a = m(a, b, c, d, f[e + 13], 4, 681279174), d = m(d, a, b, c, f[e + 0], 11, 3936430074), c = m(c, d, a, b, f[e + 3], 16, 3572445317), b = m(b, c, d, a, f[e + 6], 
      23, 76029189), a = m(a, b, c, d, f[e + 9], 4, 3654602809), d = m(d, a, b, c, f[e + 12], 11, 3873151461), c = m(c, d, a, b, f[e + 15], 16, 530742520), b = m(b, c, d, a, f[e + 2], 23, 3299628645), a = n(a, b, c, d, f[e + 0], 6, 4096336452), d = n(d, a, b, c, f[e + 7], 10, 1126891415), c = n(c, d, a, b, f[e + 14], 15, 2878612391), b = n(b, c, d, a, f[e + 5], 21, 4237533241), a = n(a, b, c, d, f[e + 12], 6, 1700485571), d = n(d, a, b, c, f[e + 3], 10, 2399980690), c = n(c, d, a, b, f[e + 10], 15, 
      4293915773), b = n(b, c, d, a, f[e + 1], 21, 2240044497), a = n(a, b, c, d, f[e + 8], 6, 1873313359), d = n(d, a, b, c, f[e + 15], 10, 4264355552), c = n(c, d, a, b, f[e + 6], 15, 2734768916), b = n(b, c, d, a, f[e + 13], 21, 1309151649), a = n(a, b, c, d, f[e + 4], 6, 4149444226), d = n(d, a, b, c, f[e + 11], 10, 3174756917), c = n(c, d, a, b, f[e + 2], 15, 718787259), b = n(b, c, d, a, f[e + 9], 21, 3951481745), a = h(a, q), b = h(b, r), c = h(c, s), d = h(d, t);
    }
    return(p(a) + p(b) + p(c) + p(d)).toLowerCase();
  };
  return lib;
}();

