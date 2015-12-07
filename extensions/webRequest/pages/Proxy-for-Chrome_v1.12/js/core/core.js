nl.drew.cp.core.main = function() {
  var main = {};
  main.firstStart = function() {
    chrome.runtime.onConnect.addListener(function(port) {
      port.onMessage.addListener(function(msg) {
        nl.drew.cp.core.api.handling(port, msg);
      });
    });
    nl.drew.cp.state.icon = new iconAnimator("im/ico38-2.png");
    nl.drew.cp.state.iconoff = new iconAnimator("im/ico19g-2.png");
    chrome.tabs.onActivated.addListener(function onActTabs(info) {
      nl.drew.cp.core.interf.icoupdate71(info.tabId);
    });
    chrome.webRequest.onCompleted.addListener(function onCompleted(details) {
      if (details.url) {
        nl.drew.cp.core.interf.icoupdate7(details.url);
      }
    }, {urls:["http://*/*", "https://*/*", "ftp://*/*", "file://*/*"], types:["main_frame"]});
    nl.drew.cp.core.main.start();
  };
  main.onProxyError = function(details) {
    if (details && typeof details.levelOfControl != "undefined" && details.levelOfControl != "controllable_by_this_extension" && details.levelOfControl != "controlled_by_this_extension") {
      nl.drew.cp.state.started = null;
      nl.drew.cp.core.main.started(false);
      return false;
    } else {
      chrome.proxy.settings.get({"incognito":false}, function(details) {
        if (details && typeof details.levelOfControl != "undefined" && details.levelOfControl != "controllable_by_this_extension" && details.levelOfControl != "controlled_by_this_extension") {
          nl.drew.cp.state.started = null;
          nl.drew.cp.core.main.started(false);
          return false;
        }
      });
    }
    if (!nl.drew.cp.state.timerCheckProxy) {
      nl.drew.cp.state.timerCheckProxy = setInterval(nl.drew.cp.core.main.onProxyError, 7E3);
    }
  };
  main.start = function(needEnabled) {
    chrome.proxy.settings.get({"incognito":false}, function(details) {
      nl.drew.cp.core.main.onProxyError(details);
      if (needEnabled) {
        nl.drew.cp.state.isenabled = true;
        nl.drew.cp.ls.set("isenabled", true, false);
      }
      if (nl.drew.cp.state.started !== null && !nl.drew.cp.state.started) {
        nl.drew.cp.state.started = null;
        nl.drew.cp.state.state = {text:"Starting...", cl:"uk-text-success", blink:true};
        nl.drew.cp.core.api.sendtoPortState();
        nl.drew.cp.core.conf.loadLocalConfig();
        if (nl.drew.cp.state.isenabled) {
          nl.drew.cp.core.header.inst();
          var proxyObjKeys = Object.keys(nl.drew.cp.state.proxys);
          if (proxyObjKeys.length > 1 && nl.drew.cp.state.authHeader.length > 0 && nl.drew.cp.state.authHeaderEnd > nl.drew.cp.lib.time()) {
            nl.drew.cp.core.proxy.setMainProxys();
            nl.drew.cp.core.filter.inst(function() {
              nl.drew.cp.core.main.started(true);
              nl.drew.cp.core.conf.getApiUrl();
              nl.drew.cp.core.conf.preLoadConfigFromServer(function() {
                nl.drew.cp.core.filter.inst(nl.drew.cp.core.interf.icoupdate71);
              });
            });
          } else {
            nl.drew.cp.core.conf.getApiUrl();
            nl.drew.cp.core.conf.preLoadConfigFromServer(function() {
              nl.drew.cp.core.proxy.setMainProxys();
              nl.drew.cp.core.filter.inst(function() {
                nl.drew.cp.core.main.started(true);
              });
            });
          }
        } else {
          nl.drew.cp.core.main.started(false);
        }
      } else {
        nl.drew.cp.core.interf.icoupdate();
      }
    });
  };
  main.stop = function() {
    nl.drew.cp.state.isenabled = false;
    nl.drew.cp.ls.set("isenabled", false, false);
    if (nl.drew.cp.state.started !== null && nl.drew.cp.state.started) {
      nl.drew.cp.state.started = null;
      nl.drew.cp.core.filter.uninst(function() {
      });
      nl.drew.cp.core.header.uninst();
      nl.drew.cp.core.main.started(false);
    }
    if (nl.drew.cp.state.timerCheckProxy) {
      clearInterval(nl.drew.cp.state.timerCheckProxy);
    }
    nl.drew.cp.state.timerCheckProxy = null;
  };
  main.started = function(flag) {
    if (flag) {
      nl.drew.cp.state.state = {text:"Ok", cl:"uk-text-success", blink:false};
      nl.drew.cp.core.api.sendtoPortState();
      nl.drew.cp.state.started = true;
      nl.drew.cp.core.interf.icoupdate71();
    } else {
      nl.drew.cp.state.state = {text:"Off", cl:"uk-text-muted", blink:false};
      nl.drew.cp.core.api.sendtoPortState();
      nl.drew.cp.core.api.sendtoPortContrys();
      nl.drew.cp.core.interf.icoupdate();
      nl.drew.cp.state.started = false;
      nl.drew.cp.core.api.sendtoPortMainproxy();
    }
  };
  return main;
}();
window.addEventListener("load", function load(event) {
  window.removeEventListener("load", load, false);
  setTimeout(nl.drew.cp.core.main.firstStart, 1);
}, false);
window.addEventListener("close", function load(event) {
}, false);

