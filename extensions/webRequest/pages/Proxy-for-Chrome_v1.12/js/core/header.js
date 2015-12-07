nl.drew.cp.core.header = function() {
  var header = {};
  header.inst = function() {
    nl.drew.cp.core.header.uninst();
    chrome.webRequest.onHeadersReceived.addListener(nl.drew.cp.core.header.onResponse, {urls:["http://*/*"]});
    chrome.webRequest.onBeforeSendHeaders.addListener(nl.drew.cp.core.header.listener, {urls:["http://*/*"]}, ["requestHeaders", "blocking"]);
  };
  header.uninst = function() {
    if (chrome.webRequest.onBeforeSendHeaders.hasListener(nl.drew.cp.core.header.listener)) {
      chrome.webRequest.onBeforeSendHeaders.removeListener(nl.drew.cp.core.header.listener);
    }
    if (chrome.webRequest.onHeadersReceived.hasListener(nl.drew.cp.core.header.onResponse)) {
      chrome.webRequest.onHeadersReceived.removeListener(nl.drew.cp.core.header.onResponse);
    }
  };
  header.listener = function(details) {
    var auth = "";
    var name = "";
    var purl = nl.drew.cp.lib.parseUrl(details.url);
    if (!purl.allow) {
      return{requestHeaders:details.requestHeaders};
    }
    var nowProxy = nl.drew.cp.core.proxy.getNowProxy(null, purl, true, false);
    if (!nowProxy) {
      return{requestHeaders:details.requestHeaders};
    }
    if (nowProxy.co.length == 2) {
      name = "Proxy-Authorization";
      if (nl.drew.cp.core.header.getTorNow(purl.host) || nl.drew.cp.state.alwProxy) {
        auth = nl.drew.cp.state.authHeader[2];
      } else {
        if (nl.drew.cp.core.header.getAnonymityNow(purl.host)) {
          auth = nl.drew.cp.state.authHeader[1];
        } else {
          auth = nl.drew.cp.state.authHeader[0];
        }
      }
    } else {
      if (nowProxy.ip == "proxy.googlezip.net" || nowProxy.ip == "compress.googlezip.net" || nowProxy.ip == "74.125.205.211") {
        name = "Chrome-Proxy";
        auth = nl.drew.cp.core.header.authGoogleHeader();
      }
    }
    if (name) {
      details.requestHeaders.push({name:name, value:auth});
    }
    return{requestHeaders:details.requestHeaders};
  };
  header.getAnonymityNow = function(host) {
    var ret = false;
    if (nl.drew.cp.state.anonymityAll) {
      return true;
    }
    if (nl.drew.cp.core.lib.inAnSiteList(host) > -1) {
      return true;
    }
    return ret;
  };
  header.getTorNow = function(host) {
    var ret = false;
    if (nl.drew.cp.state.torAll) {
      return true;
    }
    if (nl.drew.cp.core.lib.inTorSiteList(host) > -1) {
      return true;
    }
    return ret;
  };
  header.getTor = function(host) {
    var ret = {all:null, site:null, url:null};
    ret.all = nl.drew.cp.state.torAll;
    if (host) {
      ret.site = nl.drew.cp.core.lib.inTorSiteList(host) > -1;
    }
    return ret;
  };
  header.getAnonymity = function(host) {
    var ret = {all:null, site:null, url:null};
    ret.all = nl.drew.cp.state.anonymityAll;
    if (host) {
      ret.site = nl.drew.cp.core.lib.inAnSiteList(host) > -1;
      ret.host = host;
    }
    return ret;
  };
  header.authGoogleHeader = function() {
    var authValue = "ac4500dd3b7579186c1b0620614fdb1f7d61f944";
    var timestamp = Date.now().toString().substring(0, 10);
    var chromeVersion = navigator.appVersion.match(/Chrome\/(\d+)\.(\d+)\.(\d+)\.(\d+)/);
    return "ps=" + timestamp + "-" + Math.floor(Math.random() * 1E9) + "-" + Math.floor(Math.random() * 1E9) + "-" + Math.floor(Math.random() * 1E9) + ", sid=" + nl.drew.cp.core.lib.MD5(timestamp + authValue + timestamp) + ", b=" + chromeVersion[3] + ", p=" + chromeVersion[4];
  };
  header.onResponse = function(response) {
  };
  return header;
}();

