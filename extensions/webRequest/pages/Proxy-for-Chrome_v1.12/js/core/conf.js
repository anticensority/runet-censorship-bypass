nl.drew.cp.core.conf = function() {
  var conf = {};
  conf.getApiUrl = function() {
    if (nl.drew.cp.ls.isset("conf")) {
      var conf = nl.drew.cp.ls.get("conf");
      if (conf) {
        if (typeof conf.Apiurl != "undefined" && conf.Apiurl.length > 0) {
          nl.drew.cp.config.apiurl = conf.Apiurl;
        }
        if (typeof conf.Apiext != "undefined" && conf.Apiext.length > 0) {
          nl.drew.cp.config.apiext = conf.Apiext;
        }
        if (typeof conf.Apiind != "undefined" && conf.Apiind.length > 0) {
          nl.drew.cp.config.apiind = conf.Apiind;
        }
        if (typeof conf.Apidop != "undefined" && conf.Apidop.length > 0) {
          nl.drew.cp.config.apidop = conf.Apidop;
        }
      }
    }
    var ret = new Array;
    var uriapi;
    for (var i in nl.drew.cp.config.apiurl) {
      for (var j in nl.drew.cp.config.apiext) {
        for (var k in nl.drew.cp.config.apiind) {
          uriapi = nl.drew.cp.config.apiurl[i] + nl.drew.cp.config.apiind[k] + "." + nl.drew.cp.config.apiext[j];
          ret.push("https://" + uriapi + "/");
        }
      }
    }
    nl.drew.cp.state.allApiUrls = ret;
    nl.drew.cp.state.allApiUrls = nl.drew.cp.state.allApiUrls.concat(nl.drew.cp.config.apidop);
  };
  conf.preLoadConfigFromServer = function(callback) {
    if (!nl.drew.cp.state.isenabled) {
      if (callback != null) {
        callback();
      }
      return;
    }
    nl.drew.cp.state.loadConfigFailCount = 0;
    var allapiurlsLen = nl.drew.cp.state.allApiUrls.length;
    if (allapiurlsLen < 1) {
      nl.drew.cp.lib.debug("+++++++ crome-proxy +++++++ no api urls");
      return null;
    }
    var ind = Math.random() * allapiurlsLen;
    ind = ind ^ 0;
    nl.drew.cp.state.apiUrl = nl.drew.cp.state.allApiUrls[ind];
    conf.loadConfigFromServer(callback, ind);
  };
  conf.loadLocalConfig = function() {
    if (nl.drew.cp.ls.isset("isenabled")) {
      nl.drew.cp.state.isenabled = nl.drew.cp.ls.get("isenabled", false);
    } else {
      nl.drew.cp.state.isenabled = nl.drew.cp.config.isenabled;
    }
    if (nl.drew.cp.state.isenabled) {
      if (nl.drew.cp.ls.isset("authHeader") && nl.drew.cp.ls.isset("authHeaderEnd")) {
        nl.drew.cp.state.authHeader = nl.drew.cp.ls.get("authHeader", "96W3tAJeY40DufpX");
        nl.drew.cp.state.authHeaderEnd = nl.drew.cp.ls.get("authHeaderEnd", false);
      }
      if (nl.drew.cp.ls.isset("contrymain")) {
        var contrymain = nl.drew.cp.ls.get("contrymain", false);
        if (contrymain) {
          nl.drew.cp.state.contryMain = contrymain;
        }
      }
      if (nl.drew.cp.ls.isset("globalalwproxy")) {
        nl.drew.cp.state.alwProxy = nl.drew.cp.ls.get("globalalwproxy", false);
      }
      if (nl.drew.cp.ls.isset("anonymityall")) {
        nl.drew.cp.state.anonymityAll = nl.drew.cp.ls.get("anonymityall", false);
      }
      if (nl.drew.cp.ls.isset("contrySiteList")) {
        nl.drew.cp.state.listContrySite = nl.drew.cp.ls.get("contrySiteList", false);
      }
      if (nl.drew.cp.ls.isset("alwProxySite")) {
        nl.drew.cp.state.listAlwProxySite = nl.drew.cp.ls.get("alwProxySite", false);
      }
      if (nl.drew.cp.ls.isset("nonProxySite")) {
        nl.drew.cp.state.listNonProxySite = nl.drew.cp.ls.get("nonProxySite", false);
      }
      if (nl.drew.cp.ls.isset("anSite")) {
        nl.drew.cp.state.listAnSite = nl.drew.cp.ls.get("anSite", false);
      }
      if (nl.drew.cp.ls.isset("torSite")) {
        nl.drew.cp.state.listTorSite = nl.drew.cp.ls.get("torSite", false);
      }
      if (nl.drew.cp.ls.isset("offlist")) {
        nl.drew.cp.state.offlist = nl.drew.cp.ls.get("offlist", false);
      }
      if (nl.drew.cp.ls.isset("uproxys")) {
        nl.drew.cp.state.uproxys = nl.drew.cp.ls.get("uproxys", false);
      }
      nl.drew.cp.core.proxy.loadLocalProxy();
    }
  };
  conf.clearConfigTimer = function() {
    if (nl.drew.cp.state.loadConfigUpdTimer) {
      clearTimeout(nl.drew.cp.state.loadConfigUpdTimer);
      nl.drew.cp.state.loadConfigUpdTimer = null;
    }
  };
  conf.startConfigTimer = function(callback) {
    nl.drew.cp.state.loadConfigUpdTimer = setTimeout(function startLoadConfig() {
      nl.drew.cp.core.conf.preLoadConfigFromServer(callback);
    }, nl.drew.cp.config.loadConfigUpdT);
  };
  conf.startConfigTimer3 = function() {
    nl.drew.cp.state.loadConfigUpdTimer = setTimeout(function startLoadConfig() {
      nl.drew.cp.core.conf.loadConfigFromServer();
    }, nl.drew.cp.config.loadConfigUpdT3);
  };
  conf.loadConfigFromServer = function(callback, ind) {
    var apiUrl = nl.drew.cp.state.apiUrl;
    if (!apiUrl) {
      nl.drew.cp.lib.debug("+++++++ crome-proxy +++++++ no api url");
      return null;
    }
    var onFail = function() {
      var allapiurlsLen = nl.drew.cp.state.allApiUrls.length;
      nl.drew.cp.state.loadConfigFailCount++;
      if (ind !== null) {
        ind++;
        if (ind >= allapiurlsLen) {
          ind = 0;
        }
        nl.drew.cp.state.apiUrl = nl.drew.cp.state.allApiUrls[ind];
        if (nl.drew.cp.state.loadConfigFailCount >= allapiurlsLen) {
          nl.drew.cp.state.loadConfigFailCountt = 0;
          conf.loadConfigFromServer(callback, null);
          nl.drew.cp.core.interf.icoupdate();
        } else {
          conf.loadConfigFromServer(callback, ind);
        }
        return null;
      } else {
        nl.drew.cp.core.conf.clearConfigTimer();
        nl.drew.cp.core.conf.startConfigTimer(callback);
      }
    };
    nl.drew.cp.lib.ReqJson(apiUrl + nl.drew.cp.config.api + "?crome-proxy-ywPHzueGrJX4vLYmC6Zj8TpotBacbgEf", 1E4, function(response) {
      nl.drew.cp.core.conf.serverRespParse(response);
      if (callback != null) {
        callback();
      }
      nl.drew.cp.core.conf.clearConfigTimer();
      nl.drew.cp.core.conf.startConfigTimer3();
    }, onFail, onFail, "POST", "ip=" + encodeURIComponent(nl.drew.cp.state.ip) + "&s=" + encodeURIComponent(nl.drew.cp.state.lastUpdate) + "&sk=" + encodeURIComponent(nl.drew.cp.state.lastUpdateKey));
  };
  conf.serverRespParse = function(response) {
    var responseJSON = {};
    try {
      responseJSON = JSON.parse(response);
    } catch (e) {
      nl.drew.cp.lib.debug("+++++++ crome-proxy +++++++ can't parse");
      return null;
    }
    if (typeof responseJSON.Key != "undefined" && responseJSON.Key && typeof responseJSON.KeyD != "undefined" && typeof responseJSON.Now != "undefined") {
      nl.drew.cp.state.authHeader = responseJSON.Key;
      nl.drew.cp.state.authHeaderEnd = responseJSON.KeyD + (nl.drew.cp.lib.time() - responseJSON.Now);
      nl.drew.cp.ls.set("authHeader", nl.drew.cp.state.authHeader, "96W3tAJeY40DufpX");
      nl.drew.cp.ls.set("authHeaderEnd", nl.drew.cp.state.authHeaderEnd, false);
    }
    if (typeof responseJSON.Proxy != "undefined" && Object.prototype.toString.call(responseJSON.Proxy) === "[object Array]") {
      nl.drew.cp.core.proxy.fromServerParser(responseJSON.Proxy);
    } else {
      if (typeof responseJSON.ProxyStat != "undefined") {
        nl.drew.cp.core.proxy.setProxysCh(responseJSON.ProxyStat);
        nl.drew.cp.core.proxy.setMainProxys();
      }
    }
    if (typeof responseJSON.Conf != "undefined" && responseJSON.Conf) {
    }
    if (typeof responseJSON.S != "undefined" && responseJSON.S) {
      nl.drew.cp.state.lastUpdate = responseJSON.S;
    }
    if (typeof responseJSON.KeyD != "undefined" && responseJSON.KeyD) {
      nl.drew.cp.state.lastUpdateKey = responseJSON.KeyD;
    }
  };
  return conf;
}();

