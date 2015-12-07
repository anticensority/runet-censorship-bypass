nl.drew.cp.core.interf = function() {
  var interf = {};
  interf.icoupdate71 = function(tabid) {
    var icoupd = function(tab) {
      var url;
      if (typeof tab.url != "undefined") {
        url = tab.url;
        nl.drew.cp.core.interf.icoupdate7(url);
      }
    };
    if (tabid) {
      chrome.tabs.get(tabid, function(tab) {
        icoupd(tab);
      });
    } else {
      chrome.tabs.getSelected(null, function(tab) {
        icoupd(tab);
      });
    }
  };
  interf.icoupdate7 = function(url) {
    var purl = nl.drew.cp.lib.parseUrl(url);
    var nowproxy = nl.drew.cp.core.proxy.getNowProxy(null, purl, true, false);
    if (nowproxy) {
      var co = nowproxy.co;
      if (purl.allow && co.length < 3 && nl.drew.cp.core.header.getTorNow(purl.host)) {
        co = "tor";
      }
      nl.drew.cp.core.interf.icoupdate3(co, purl.pathname);
    } else {
      nl.drew.cp.core.interf.icoupdate3();
    }
  };
  interf.icoupdate3 = function(co, url) {
    if (url) {
      if (url.indexOf("_/chrome/newtab") != -1) {
        co = false;
      }
    }
    if (nl.drew.cp.lib.isNumeric(co)) {
      co = false;
    }
    if (nl.drew.cp.state.isenabled && nl.drew.cp.state.started) {
      if (co) {
        if (nl.drew.cp.state.alwProxy) {
          co = "public";
        }
        nl.drew.cp.state.icon.setCo(co);
      } else {
        nl.drew.cp.state.icon.set();
      }
    } else {
      if (nl.drew.cp.state.started == null) {
        nl.drew.cp.state.iconoff.setErr();
      } else {
        nl.drew.cp.state.iconoff.set();
      }
    }
  };
  interf.icoupdate = function() {
    if (nl.drew.cp.state.isenabled && nl.drew.cp.state.started) {
      nl.drew.cp.state.icon.set();
      nl.drew.cp.state.icon.rotate();
    } else {
      if (nl.drew.cp.state.started == null) {
        nl.drew.cp.state.iconoff.setErr();
      } else {
        nl.drew.cp.state.iconoff.set();
        nl.drew.cp.state.iconoff.rotate();
      }
    }
  };
  interf.icoupdate2 = function() {
    if (nl.drew.cp.state.isenabled && nl.drew.cp.state.started) {
      nl.drew.cp.state.icon.set();
      nl.drew.cp.state.icon.pulse2();
    } else {
      nl.drew.cp.state.iconoff.set();
      nl.drew.cp.state.iconoff.pulse2();
    }
  };
  return interf;
}();

