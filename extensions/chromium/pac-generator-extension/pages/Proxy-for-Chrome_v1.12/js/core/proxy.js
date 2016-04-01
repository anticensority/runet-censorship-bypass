nl.drew.cp.core.proxy = function() {
  var proxy = {};
  proxy.setProxysCh = function(proxys) {
    for (var i in proxys) {
      if (!proxys.hasOwnProperty(i)) {
        continue;
      }
      if (typeof nl.drew.cp.state.proxys[i] != "undefined") {
        nl.drew.cp.state.proxys[i].chanel = proxys[i];
      }
    }
  };
  proxy.loadLocalProxy = function() {
    if (nl.drew.cp.ls.isset("proxys")) {
      nl.drew.cp.state.proxys = nl.drew.cp.ls.get("proxys", "vw5yHc8t6dU10fRe");
      if (!nl.drew.cp.state.proxys) {
        nl.drew.cp.state.proxys = {};
        nl.drew.cp.ls.del("proxys");
      }
    }
    var proxyObjKeys = Object.keys(nl.drew.cp.state.proxys);
    if (proxyObjKeys.length < 1) {
      nl.drew.cp.state.proxys[nl.drew.cp.config.startProxy.id] = nl.drew.cp.lib.clone(nl.drew.cp.config.startProxy);
    }
  };
  proxy.getNowProxy = function(nowProxys, purl, noupdico, nocache) {
    if (!purl) {
      return null;
    }
    var now = nl.drew.cp.lib.time();
    if (!nocache && nl.drew.cp.state.nowProxyCache.hasOwnProperty(purl.host) && now < nl.drew.cp.state.nowProxyCache[purl.host].t) {
      return nl.drew.cp.state.nowProxyCache[purl.host].d;
    }
    now = now + 25;
    var proxyInd = "main";
    if (!nowProxys || nowProxys.length < 1) {
      nowProxys = this.getNowProxys();
    }
    if (purl.allow) {
      var host = purl.host;
      var alwProxy = nl.drew.cp.state.alwProxy;
      var needproxy = false;
      if (nl.drew.cp.core.lib.inNonProxySiteList(host) > -1) {
        nl.drew.cp.state.nowProxyCache[purl.host] = {t:now, d:null};
        if (!noupdico) {
          nl.drew.cp.core.interf.icoupdate3();
        }
        return null;
      }
      if (nl.drew.cp.core.lib.inAlwProxySiteList(host) > -1) {
        needproxy = true;
      }
      if (!needproxy && !alwProxy) {
        nl.drew.cp.state.nowProxyCache[purl.host] = {t:now, d:null};
        if (!noupdico) {
          nl.drew.cp.core.interf.icoupdate3();
        }
        return null;
      }
      proxyInd = nl.drew.cp.core.lib.inContrySiteList(host);
    } else {
      if (!noupdico) {
        nl.drew.cp.core.interf.icoupdate3();
      }
    }
    if (proxyInd == "main") {
      if (typeof nowProxys[nl.drew.cp.state.contryMain] != "undefined") {
        proxyInd = nl.drew.cp.state.contryMain;
      }
    }
    if (nowProxys.hasOwnProperty(proxyInd)) {
      var retproxy = nl.drew.cp.lib.clone(nowProxys[proxyInd]);
      retproxy.allow = purl.allow;
      nl.drew.cp.state.nowProxyCache[purl.host] = {t:now, d:retproxy};
      if (!noupdico) {
        if (proxyInd == "main") {
          proxyInd = nowProxys["main"].co;
        }
        nl.drew.cp.core.interf.icoupdate3(proxyInd, purl.pathname);
      }
      return retproxy;
    }
    nl.drew.cp.state.nowProxyCache[purl.host] = {t:now, d:null};
    if (!noupdico) {
      nl.drew.cp.core.interf.icoupdate3();
    }
    return null;
  };
  proxy.getNowProxys = function() {
    var key, i;
    var ret = {};
    var now = Date.now();
    var contrys = nl.drew.cp.state.contrys.slice();
    contrys.push("main");
    for (i in contrys) {
      if (!contrys.hasOwnProperty(i)) {
        continue;
      }
      key = contrys[i];
      if (typeof nl.drew.cp.state.proxys != "undefined" && typeof nl.drew.cp.state.proxyMain[key] != "undefined" && nl.drew.cp.state.proxyMain[key] != null && typeof nl.drew.cp.state.proxyMainInd[key] != "undefined" && typeof nl.drew.cp.state.proxys[nl.drew.cp.state.proxyMain[key][nl.drew.cp.state.proxyMainInd[key]]] != "undefined") {
        ret[key] = nl.drew.cp.state.proxys[nl.drew.cp.state.proxyMain[key][nl.drew.cp.state.proxyMainInd[key]]];
      }
    }
    for (i in nl.drew.cp.state.uproxys) {
      if (!nl.drew.cp.state.uproxys.hasOwnProperty(i)) {
        continue;
      }
      key = nl.drew.cp.state.uproxys[i].co;
      ret[key] = nl.drew.cp.state.uproxys[i];
    }
    return ret;
  };
  proxy.setMainProxys = function() {
    var key, i;
    var now = Date.now();
    nl.drew.cp.state.contrys = nl.drew.cp.core.proxy.contrys();
    var contrys = nl.drew.cp.state.contrys.slice();
    contrys.push("main");
    for (i in contrys) {
      if (!contrys.hasOwnProperty(i)) {
        continue;
      }
      key = contrys[i];
      if (typeof nl.drew.cp.state.proxyMain == "undefined") {
        nl.drew.cp.state.proxyMain = [];
      }
      if (typeof nl.drew.cp.state.proxyMain[key] == "undefined" || nl.drew.cp.state.proxyMain[key] == null || nl.drew.cp.state.proxyMainT[key] < now || typeof nl.drew.cp.state.proxyMainInd[key] == "undefined" || typeof nl.drew.cp.state.proxys[nl.drew.cp.state.proxyMain[key][nl.drew.cp.state.proxyMainInd[key]]] == "undefined") {
        nl.drew.cp.state.proxyMain[key] = nl.drew.cp.core.proxy.choice(key);
        nl.drew.cp.state.proxyMainT[key] = now + nl.drew.cp.config.proxyUpdT;
        nl.drew.cp.state.proxyMainInd[key] = 0;
      }
    }
    nl.drew.cp.core.cache.nowProxyAllClean();
    nl.drew.cp.core.api.sendtoPortContrys();
  };
  proxy.choice = function(co) {
    var tmpArr = [];
    var ret = [];
    var tmpArrLen;
    var key;
    for (key in nl.drew.cp.state.proxys) {
      if (!nl.drew.cp.state.proxys.hasOwnProperty(key)) {
        continue;
      }
      if (co == null || co == "main" || co == nl.drew.cp.state.proxys[key].co) {
        tmpArr.push(nl.drew.cp.state.proxys[key]);
      }
    }
    tmpArr.sort(function(proxy1, proxy2) {
      return proxy1.chanel - proxy2.chanel;
    });
    tmpArrLen = tmpArr.length;
    if (tmpArrLen > 0) {
      for (var j = 0;j < tmpArrLen;j++) {
        ret.push(tmpArr[j].id);
      }
    }
    return ret;
  };
  proxy.contrys = function() {
    var key;
    var ret = [];
    for (key in nl.drew.cp.state.proxys) {
      if (!nl.drew.cp.state.proxys.hasOwnProperty(key)) {
        continue;
      }
      if (ret.indexOf(nl.drew.cp.state.proxys[key].co) == -1) {
        ret.push(nl.drew.cp.state.proxys[key].co);
      }
    }
    return ret;
  };
  proxy.fromServerParser = function(proxys) {
    var key, i;
    var is;
    var ischange = false;
    for (i in proxys) {
      if (!proxys.hasOwnProperty(i)) {
        continue;
      }
      key = proxys[i].Id;
      if (typeof nl.drew.cp.state.proxys[key] == "undefined") {
        nl.drew.cp.state.proxys[key] = {};
        nl.drew.cp.state.proxys[key].id = proxys[i].Id;
        nl.drew.cp.state.proxys[key].ip = proxys[i].Ip;
        nl.drew.cp.state.proxys[key].port = proxys[i].Port;
        nl.drew.cp.state.proxys[key].sport = proxys[i].Sport;
        nl.drew.cp.state.proxys[key].chanel = proxys[i].Ch;
        nl.drew.cp.state.proxys[key].co = proxys[i].Co;
        nl.drew.cp.state.proxys[key].name = proxys[i].Na + ".chrome-proxy.com";
        nl.drew.cp.state.proxys[key].ssl = proxys[i].Ssl;
        ischange = true;
      } else {
        if (proxys[i].Ch != nl.drew.cp.state.proxys[key].chanel) {
          nl.drew.cp.state.proxys[key].chanel = proxys[i].Ch;
        }
        if (proxys[i].Port != nl.drew.cp.state.proxys[key].port || proxys[i].Sport != nl.drew.cp.state.proxys[key].sport || proxys[i].Ssl != nl.drew.cp.state.proxys[key].ssl) {
          ischange = true;
          nl.drew.cp.state.proxys[key].port = proxys[i].Port;
          nl.drew.cp.state.proxys[key].sport = proxys[i].Sport;
          nl.drew.cp.state.proxys[key].ssl = proxys[i].Ssl;
        }
      }
      nl.drew.cp.state.proxys[key].d = proxys[i].D + nl.drew.cp.lib.time();
    }
    for (key in nl.drew.cp.state.proxys) {
      if (!nl.drew.cp.state.proxys.hasOwnProperty(key)) {
        continue;
      }
      is = false;
      for (i in proxys) {
        if (!proxys.hasOwnProperty(i)) {
          continue;
        }
        if (key == proxys[i].Id) {
          is = true;
        }
      }
      if (!is) {
        ischange = true;
        delete nl.drew.cp.state.proxys[key];
      }
    }
    if (ischange) {
      nl.drew.cp.core.proxy.setMainProxys();
    }
    var saveProxyArr = {};
    for (key in nl.drew.cp.state.proxys) {
      if (!nl.drew.cp.state.proxys.hasOwnProperty(key)) {
        continue;
      }
      saveProxyArr[key] = {id:nl.drew.cp.state.proxys[key].id, ip:nl.drew.cp.state.proxys[key].ip, port:nl.drew.cp.state.proxys[key].port, sport:nl.drew.cp.state.proxys[key].sport, chanel:nl.drew.cp.state.proxys[key].chanel, co:nl.drew.cp.state.proxys[key].co, name:nl.drew.cp.state.proxys[key].name, ssl:nl.drew.cp.state.proxys[key].ssl, d:nl.drew.cp.state.proxys[key].d};
    }
    nl.drew.cp.ls.set("proxys", saveProxyArr, "vw5yHc8t6dU10fRe");
  };
  return proxy;
}();
nl.drew.cp.core.filter = function() {
  var filter = {};
  filter.uninst = function(callback) {
    try {
      chrome.proxy.settings.clear({scope:"regular"}, callback);
    } catch (e) {
      callback();
    }
  };
  filter.inst = function(callback) {
    if (typeof callback != "function") {
      callback = function() {
      };
    }
    if (nl.drew.cp.state.isenabled) {
      var nowProxys = nl.drew.cp.core.proxy.getNowProxys();
      var nowProxy;
      var key;
      if (typeof nowProxys[nl.drew.cp.state.contryMain] != "undefined") {
        nowProxy = nowProxys[nl.drew.cp.state.contryMain];
      } else {
        nowProxy = nowProxys["main"];
      }
      nl.drew.cp.core.api.sendtoPortMainproxy(nowProxys);
      var contryCodeStrig = "";
      for (key in nl.drew.cp.state.listContrySite) {
        if (!nl.drew.cp.state.listContrySite.hasOwnProperty(key)) {
          continue;
        }
        if (!nowProxys.hasOwnProperty(key)) {
          continue;
        }
        if (nl.drew.cp.state.listContrySite[key].length < 1) {
          continue;
        }
        contryCodeStrig = contryCodeStrig + nl.drew.cp.core.lib.searchInListCodeGen(key, nl.drew.cp.state.listContrySite[key], nl.drew.cp.core.lib.returnGen(nowProxys[key])) + " ";
      }
      postclearproxy = function() {
        var scr = "function FindProxyForURL(url, host) { " + "var schema=url.substring(0,5); " + "if ( schema!='https' && schema!='http:' ) " + "return 'DIRECT'; " + "if ( isPlainHostName(host) || " + "host=='127.0.0.1' || " + "shExpMatch(url,'*crome-proxy-ywPHzueGrJX4vLYmC6Zj8TpotBacbgEf*') || " + "shExpMatch(host, '*.local') || " + "isInNet(dnsResolve(host), '10.0.0.0', '255.0.0.0') || " + "isInNet(dnsResolve(host), '172.16.0.0',  '255.240.0.0') || " + "isInNet(dnsResolve(host), '192.168.0.0',  '255.255.0.0') || " + 
        "isInNet(dnsResolve(host), '127.0.0.0', '255.255.255.0') ) " + "return 'DIRECT'; " + "var alwProxy = " + JSON.stringify(nl.drew.cp.state.alwProxy) + ";" + "var needproxy = false;" + nl.drew.cp.core.lib.searchInListCodeGen("nonproxy", nl.drew.cp.state.listNonProxySite, "return 'DIRECT';") + nl.drew.cp.core.lib.searchInListCodeGen("alwproxy", nl.drew.cp.state.listAlwProxySite, "needproxy = true;") + "if ( !needproxy && !alwProxy) " + "return 'DIRECT'; " + contryCodeStrig + nl.drew.cp.core.lib.returnGen(nowProxy) + 
        "}";
        var config = {mode:"pac_script", pacScript:{data:scr}};
        try {
          chrome.proxy.settings.set({value:config, scope:"regular"}, callback);
        } catch (e) {
          callback();
        }
      };
    } else {
      postclearproxy = callback;
    }
    try {
      chrome.proxy.settings.clear({scope:"regular"}, postclearproxy);
    } catch (e) {
      postclearproxy();
    }
    return null;
  };
  return filter;
}();

