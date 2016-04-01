nl.drew.cp.lang = function() {
  var lang = {};
  lang.s = {"en":{}, "ru":{}};
  lang.user = "";
  lang.chrome = "";
  lang.init = function() {
    if (nl.drew.cp.ls.isset("lang")) {
      nl.drew.cp.lang.user = nl.drew.cp.ls.get("lang", false);
    }
  };
  lang.l = function(m) {
    var nowLang = this.getLang();
    if (typeof nl.drew.cp.lang.s[nowLang] == "undefined") {
      nowLang = "en";
      if (typeof nl.drew.cp.lang.s[nowLang] == "undefined") {
        return "not found iteam";
      }
    }
    if (typeof nl.drew.cp.lang.s[nowLang][m] == "undefined") {
      nowLang = "en";
      if (typeof nl.drew.cp.lang.s[nowLang][m] == "undefined") {
        return "not found iteam";
      }
    }
    return nl.drew.cp.lang.s[nowLang][m];
  };
  lang.getLang = function() {
    if (nl.drew.cp.lang.user) {
      return nl.drew.cp.lang.user;
    }
    var chromeLang = chrome.i18n.getUILanguage();
    if (chromeLang.substr(2).toLowerCase() == "en") {
      return "en";
    } else {
      if (chromeLang.substr(2).toLowerCase() == "ru") {
        return "ru";
      }
    }
  };
  lang.setLang = function(l) {
    nl.drew.cp.lang.user = l;
    nl.drew.cp.ls.set("lang", l, false);
  };
  return lang;
}();

