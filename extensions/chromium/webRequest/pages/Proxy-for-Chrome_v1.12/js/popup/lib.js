nl.drew.cp.popup.lib = function() {
  var lib = {};
  lib.lang = function(msg) {
    return chrome.i18n.getMessage(msg);
  };
  lib.blinkStart = function(obj, nofirst) {
    if (!nofirst) {
      obj.prop("blink", "true");
    }
    obj.fadeOut("slow", function() {
      obj.fadeIn("slow", function() {
        if (obj.prop("blink") == "true") {
          nl.drew.cp.popup.lib.blinkStart(obj, true);
        }
      });
    });
  };
  lib.blinkStop = function(obj) {
    obj.prop("blink", "");
  };
  lib.buildFlags = function(selector, contrys, uproxys, sel, host) {
    var i, key, isactive;
    var selact = false;
    var obj = $("#" + selector);
    obj.empty();
    if (!host) {
      host = "";
    }
    for (i in contrys) {
      if (!contrys.hasOwnProperty(i)) {
        continue;
      }
      key = contrys[i];
      isactive = "";
      if (sel == key) {
        isactive = " is-active";
        nl.drew.cp.popup.contrymainSelected = key;
      }
      obj.append(' <div class="cp-flag' + isactive + '" host="' + host + '" co="' + key + '" ty="' + selector + '"><img title="' + key + '" src="im/co/' + key + '.png"/></div> ');
    }
    if (uproxys && uproxys.length > 0) {
      uproxysOptions = '<option value="-1">' + "no user proxy" + "</option>";
      var i = uproxys.length;
      while (i--) {
        if (typeof uproxys[i] == "undefined") {
          continue;
        }
        isactive = "";
        if (sel == uproxys[i].co) {
          isactive = ' selected="selected"';
          selact = true;
        }
        uproxysOptions = uproxysOptions + "<option" + isactive + ' value="' + uproxys[i].co + '">' + uproxys[i].co + "</option>";
      }
      var uproxywrap = $("<div></div>").addClass("cp-uproxy uk-form");
      if (selact) {
        uproxywrap.addClass("is-active");
        if (selector == "flags-all") {
          $("#alldopsetting2").hide();
        } else {
          if (selector == "flags-site") {
            $("#sitedopsetting2").hide();
          }
        }
      }
      var uproxy = $('<select host="' + host + '" ty="' + selector + '">' + uproxysOptions + "</select>");
      uproxy.change(this.uproxAct);
      uproxy.appendTo(uproxywrap);
      uproxywrap.appendTo(obj);
    }
    obj.children("div.cp-flag").on("click", nl.drew.cp.popup.lib.flagsAct);
  };
  lib.uproxAct = function() {
    var wrap = $(this).parent().parent();
    var allFlags = wrap.children("div.cp-flag");
    allFlags.each(function() {
      $(this).removeClass("is-active");
    });
    $(this).parent().removeClass("is-active");
    if (nl.drew.cp.popup.portToExt != null) {
      if ($(this).prop("value") != -1) {
        $(this).parent().addClass("is-active");
      }
      if ($(this).attr("ty") == "flags-all") {
        if ($(this).prop("value") != -1) {
          $("#alldopsetting2").hide();
        } else {
          $("#alldopsetting2").show();
        }
        nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"contrymain", val:$(this).prop("value")});
      } else {
        if ($(this).attr("ty") == "flags-site") {
          if ($(this).prop("value") != -1) {
            $("#sitedopsetting2").hide();
          } else {
            $("#sitedopsetting2").show();
          }
          nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"contrysite", val:{host:$(this).attr("host"), val:$(this).prop("value")}});
        }
      }
    }
  };
  lib.flagsAct = function() {
    var wrap = $(this).parent();
    var allFlags = wrap.children("div.cp-flag");
    var uproxysel = wrap.find("select");
    var hasClass = $(this).hasClass("is-active");
    allFlags.each(function() {
      $(this).removeClass("is-active");
    });
    uproxysel.parent().removeClass("is-active");
    uproxysel.val("-1");
    var co = $(this).attr("co");
    if (!hasClass) {
      $(this).addClass("is-active");
    } else {
      co = "main";
    }
    if (nl.drew.cp.popup.portToExt != null) {
      if ($(this).attr("ty") == "flags-all") {
        $("#alldopsetting2").show();
        nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"contrymain", val:co});
      } else {
        if ($(this).attr("ty") == "flags-site") {
          $("#sitedopsetting2").show();
          nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"contrysite", val:{host:$(this).attr("host"), val:co}});
        }
      }
    }
  };
  return lib;
}();

