nl.drew.cp.popup.main = function() {
  var main = {};
  main.tips = true;
  main.lang = function() {
    $("#allsitestab a").text(nl.drew.cp.lang.l("allSites"));
    $("#sitetab a").text(nl.drew.cp.lang.l("thisSite"));
    $("#liststab a").text(nl.drew.cp.lang.l("listsTab"));
    $("#userprotab a").text(nl.drew.cp.lang.l("userProTab"));
    $("#langProxyEn").text(nl.drew.cp.lang.l("proxyEnabled"));
    $("#langAnonEn").text(nl.drew.cp.lang.l("anonymityEnabled"));
    $("#langLocAll").text(nl.drew.cp.lang.l("locationForAll"));
    $("#langTorAll").text(nl.drew.cp.lang.l("torForAll"));
    $("#langNotUseProxy").text(nl.drew.cp.lang.l("notUseProxy"));
    $("#langAlwUseProxy").text(nl.drew.cp.lang.l("alwUseProxy"));
    $("#langAnonForSite").text(nl.drew.cp.lang.l("anonForSite"));
    $("#langLocSite").text(nl.drew.cp.lang.l("locSite"));
    $("#langTorSite").text(nl.drew.cp.lang.l("torForSite"));
    $("#setHttp").text(nl.drew.cp.lang.l("setHttp"));
    $("#setHelp").text(nl.drew.cp.lang.l("setHelp"));
    if (nl.drew.cp.popup.main.tips) {
      $("#langProxyEnHelp").text(nl.drew.cp.lang.l("proxyEnabledHelp"));
      $("#langAnonEnHelp").text(nl.drew.cp.lang.l("anonymityEnabledHelp"));
      $("#langLocAllHelp").text(nl.drew.cp.lang.l("locationForAllHelp"));
      $("#langNotUseProxyHelp").text(nl.drew.cp.lang.l("notUseProxyHelp"));
      $("#langAlwUseProxyHelp").text(nl.drew.cp.lang.l("alwUseProxyHelp"));
      $("#langAnonForSiteHelp").text(nl.drew.cp.lang.l("anonForSiteHelp"));
      $("#langLocSiteHelp").text(nl.drew.cp.lang.l("locSiteHelp"));
      $("#langTorAllHelp").text(nl.drew.cp.lang.l("torAllHelp"));
      $("#langTorSiteHelp").text(nl.drew.cp.lang.l("torSiteHelp"));
    } else {
      $("#langProxyEnHelp").text("");
      $("#langAnonEnHelp").text("");
      $("#langLocAllHelp").text("");
      $("#langNotUseProxyHelp").text("");
      $("#langAlwUseProxyHelp").text("");
      $("#langAnonForSiteHelp").text("");
      $("#langLocSiteHelp").text("");
      $("#langTorAllHelp").text("");
      $("#langTorSiteHelp").text("");
    }
    $("#interfaceLanguage").text(nl.drew.cp.lang.l("interfaceLanguage"));
  };
  main.start = function() {
    if (nl.drew.cp.ls.isset("tips")) {
      nl.drew.cp.popup.main.tips = nl.drew.cp.ls.get("tips", false);
    }
    nl.drew.cp.lang.init();
    this.lang();
    nl.drew.cp.popup.api.setapi();
    nl.drew.cp.popup.onoffUI = $("[name=switchName]");
    if (nl.drew.cp.popup.portToExt != null) {
      nl.drew.cp.popup.portToExt.postMessage({msg:"get", param:"isenabled"});
    }
    $("#close").on("click", function() {
      window.close();
    });
    if (nl.drew.cp.popup.portToExt != null) {
      nl.drew.cp.popup.portToExt.postMessage({msg:"get", param:"state"});
      nl.drew.cp.popup.portToExt.postMessage({msg:"get", param:"globalalwproxy"});
      nl.drew.cp.popup.portToExt.postMessage({msg:"get", param:"mainproxy"});
    }
    chrome.tabs.getSelected(null, function(tab) {
      var purl = nl.drew.cp.lib.parseUrl(tab.url);
      var sitename = $("#sitename");
      if (purl.allow) {
        sitename.append('<i class="uk-icon-check-circle uk-text-success"></i>');
        $("#torsite").prop("value", purl.host);
        $("#anonymitysite").prop("value", purl.host);
        $("#nonproxy").prop("value", purl.host);
        $("#alwproxy").prop("value", purl.host);
        $("#sitesettingMsg").hide();
        $("#sitesetting").show();
        nl.drew.cp.popup.portToExt.postMessage({msg:"get", param:"nonproxyalwproxy", val:{host:purl.host}});
        nl.drew.cp.popup.host = purl.host;
      } else {
        purl.host = "";
        sitename.append('<i class="uk-icon-times-circle uk-text-danger"></i>');
        $("#sitesetting").hide();
        $("#sitesettingMsg").show();
      }
      nl.drew.cp.popup.portToExt.postMessage({msg:"get", param:"anonymity", val:{host:purl.host}});
      nl.drew.cp.popup.portToExt.postMessage({msg:"get", param:"tor", val:{host:purl.host}});
      nl.drew.cp.popup.portToExt.postMessage({msg:"get", param:"anonymitynow", val:{host:purl.host}});
      nl.drew.cp.popup.portToExt.postMessage({msg:"get", param:"contrys", val:{host:purl.host}});
      sitename.append(purl.host);
    });
    var https = true;
    if (nl.drew.cp.ls.isset("https")) {
      https = nl.drew.cp.ls.get("https", false);
    }
    $("#httpsproxy").switcher({style:"short", selected:https, disabled:false});
    $("#httpsproxy").on("change", function() {
      if ($(this).prop("checked")) {
        nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"https", val:true});
      } else {
        nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"https", val:false});
      }
    });
    $("#onhelp").switcher({style:"short", selected:nl.drew.cp.popup.main.tips, disabled:false});
    $("#onhelp").on("change", function() {
      var tips;
      if ($("#onhelp").prop("checked")) {
        tips = true;
      } else {
        tips = false;
      }
      nl.drew.cp.ls.set("tips", tips, false);
      nl.drew.cp.popup.main.tips = tips;
      nl.drew.cp.popup.main.lang();
    });
    var langUI = $("[name=lang]");
    var langSwither = langUI.switcher({style:"short", disabled:false});
    var thisLang = nl.drew.cp.lang.getLang();
    if (thisLang == "ru") {
      langSwither.eq(1).switcher("setValue", true);
    } else {
      langSwither.eq(0).switcher("setValue", true);
    }
    langUI.on("change", function() {
      nl.drew.cp.lang.setLang(this.value);
      nl.drew.cp.popup.main.lang();
    });
  };
  main.alwproxychangeset = function(obj) {
    nl.drew.cp.popup.main.uniChangeset(obj, "alwproxy");
  };
  main.nonproxychangeset = function(obj) {
    nl.drew.cp.popup.main.uniChangeset(obj, "nonproxy");
  };
  main.anonymitysitechangeset = function(obj) {
    nl.drew.cp.popup.main.uniChangeset(obj, "anonymitysite");
  };
  main.torsitechangeset = function(obj) {
    nl.drew.cp.popup.main.uniChangeset(obj, "torsite");
  };
  main.uniChangeset = function(obj, param) {
    obj.on("change", function() {
      var host = $(this).prop("value");
      var checked = false;
      if ($(this).prop("checked")) {
        checked = true;
      }
      nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:param, val:{host:host, val:checked}});
    });
  };
  main.globalalwproxychangeset = function(obj) {
    obj.on("change", function() {
      if ($(this).prop("checked")) {
        nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"globalalwproxy", val:true});
      } else {
        nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"globalalwproxy", val:false});
      }
    });
  };
  main.anonymitychangeset = function(obj) {
    obj.on("change", function() {
      if ($(this).prop("checked")) {
        nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"anonymity", val:{all:true}});
      } else {
        nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"anonymity", val:{all:false}});
      }
    });
  };
  main.torchangeset = function(obj) {
    obj.on("change", function() {
      if ($(this).prop("checked")) {
        nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"tor", val:{all:true}});
      } else {
        nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"tor", val:{all:false}});
      }
    });
  };
  main.changeset = function() {
    nl.drew.cp.popup.onoffUI.on("change", function() {
      if (nl.drew.cp.popup.onoffUI.prop("checked")) {
        nl.drew.cp.popup.portToExt.postMessage({msg:"on"});
      } else {
        nl.drew.cp.popup.portToExt.postMessage({msg:"off"});
      }
    });
  };
  return main;
}();
jQuery(document).ready(function() {
  nl.drew.cp.popup.main.start();
});

