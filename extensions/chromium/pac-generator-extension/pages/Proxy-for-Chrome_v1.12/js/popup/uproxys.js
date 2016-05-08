nl.drew.cp.popup.uproxys = function() {
  var uproxys = {};
  uproxys.isedit = false;
  uproxys.tableStr = function(list, i) {
    var dispedit;
    var onoffico, off, ret;
    if (list[i].off) {
      dispedit = ' style="display: none;"';
      onoffico = "uk-icon-toggle-off";
      off = ' style="opacity: 0.7;"';
    } else {
      dispedit = "";
      onoffico = "uk-icon-toggle-on";
      off = "";
    }
    var proto = "";
    switch(list[i].proto.toUpperCase()) {
      case "PROXY":
        proto = "http";
        break;
      case "HTTPS":
        proto = "https";
        break;
      case "SOCKS":
        proto = "socks4";
        break;
      case "SOCKS5":
        proto = "socks5";
        break;
    }
    ret = '<tr rel="' + i + '"' + off + '><td class="cp-pname">' + list[i].co + '</td><td class="cp-uppercase cp-pproto">' + proto + '</td><td class="cp-pip uk-text-bold">' + list[i].ip + ":" + list[i].port + "</td>";
    ret = ret + '<td class="uk-text-right cp-act"><div class="cp-unvis"><a href="#" class="cp-edit"' + dispedit + '><i class="uk-icon-pencil"></i></a> <a href="#" class="cp-off"><i class="' + onoffico + '"></i></a> <a href="#" class="cp-del"><i class="uk-icon-trash-o"></i></a></div></td></tr>';
    return ret;
  };
  uproxys.listShow = function(list, template, page, len) {
    var listtable = $("#proxytable");
    var proxytemplate = $("#proxytemplate");
    var count = 0;
    listtable.empty();
    proxytemplate.empty();
    var i = list.length - page * nl.drew.cp.popup.listOnPage;
    var tr;
    while (i--) {
      if (typeof list[i] == "undefined") {
        continue;
      }
      tr = listtable.append(this.tableStr(list, i));
      count++;
      if (count >= nl.drew.cp.popup.listOnPage) {
        break;
      }
    }
    var dropdown = $.UIkit.dropdown("#proxydropdown", {"boundary":"#userprotabcontent"});
    var i = template.length;
    while (i--) {
      if (typeof template[i] == "undefined") {
        continue;
      }
      proxytemplate.append('<li><a class="cp-pr-templ" rel="' + i + '"><b>' + template[i].co + "</b><br/> " + template[i].ip + ":" + template[i].port + "</a></li>");
    }
    this.setEvents(list, template, dropdown);
  };
  uproxys.setEvents = function(list, template, dropdown) {
    $("#proxytable tr").unbind().bind({mouseenter:function() {
      if (!nl.drew.cp.popup.uproxys.isedit) {
        $(this).find(".cp-act div").removeClass("cp-unvis");
      }
    }, mouseleave:function() {
      $(this).find(".cp-act div").addClass("cp-unvis");
    }});
    $(".cp-off").unbind().on("click", function(e) {
      cpoff(e, $(this));
    });
    var cpoff = function(e, thiss) {
      e.stopPropagation();
      var linkblock = thiss.parent();
      var td = linkblock.parent();
      var tr = td.parent("tr");
      var icon = thiss.children();
      var id = tr.attr("rel");
      if (icon.hasClass("uk-icon-toggle-on")) {
        linkblock.children(".cp-edit").hide();
        tr.fadeTo("fast", .7, function() {
          icon.removeClass("uk-icon-toggle-on").addClass("uk-icon-toggle-off");
          list[id].off = true;
          nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"uproxyoff", val:list[id].host});
        });
      } else {
        linkblock.children(".cp-edit").show();
        tr.fadeTo("fast", 1, function() {
          icon.removeClass("uk-icon-toggle-off").addClass("uk-icon-toggle-on");
          list[id].off = false;
          nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"uproxyon", val:list[id]});
        });
      }
    };
    $(".cp-del").unbind().on("click", function(e) {
      cpdel(e, $(this));
    });
    var cpdel = function(e, thiss) {
      e.stopPropagation();
      var linkblock = thiss.parent();
      var td = linkblock.parent();
      var tr = td.parent("tr");
      var id = tr.attr("rel");
      nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"uproxyremove", val:list[id]});
      tr.fadeTo("fast", .4, function() {
        linkblock.hide();
        $('<a class="uk-text-small"></a>').text("restore").on({click:function(event) {
          event.stopPropagation();
          var opt;
          $(this).remove();
          if (list[id].off) {
            opt = .7;
            nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"uproxy", val:list[id]});
          } else {
            opt = 1;
            nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"uproxy", val:list[id]});
          }
          tr.fadeTo("fast", opt, function() {
            linkblock.show();
          });
        }}).appendTo(td);
      });
    };
    $(".cp-edit").unbind().on("click", function(e) {
      e.stopImmediatePropagation();
      cpedit(e, $(this));
      return false;
    });
    $("#addproxy").unbind().on("click", function(e) {
      e.stopImmediatePropagation();
      var listtable = $("#proxytable");
      var id = list.push({ip:"", port:"", sport:"", proto:"", co:"", name:"", off:false});
      id--;
      listtable.prepend(nl.drew.cp.popup.uproxys.tableStr(list, id));
      cpedit(e, $("[rel=" + id + "]").find(".cp-edit"), true);
      return false;
    });
    $(".cp-pr-templ").unbind().on("click", function(e) {
      e.stopPropagation();
      dropdown.hide();
      var listtable = $("#proxytable");
      var templateid = $(this).attr("rel");
      var id = list.push({ip:template[templateid].ip, port:template[templateid].port, sport:"", proto:template[templateid].proto, co:template[templateid].co, name:"", off:false});
      id--;
      listtable.prepend(nl.drew.cp.popup.uproxys.tableStr(list, id));
      cpedit(e, $("[rel=" + id + "]").find(".cp-edit"), true);
    });
    var cpedit = function(e, thiss, isnew) {
      nl.drew.cp.popup.uproxys.isedit = true;
      var linkblock = thiss.parent();
      var td = linkblock.parent();
      var tr = td.parent("tr");
      var id = tr.attr("rel");
      var newval = {pname:"", pproto:"", pip:""};
      linkblock.hide();
      var save = $("<a></a>").html('<i class="uk-icon-save"></i>').on({click:function(event) {
        event.stopPropagation();
        var ischange = false;
        var checkProxy = false;
        var newpnameInp = $("#newpname").removeClass("uk-form-danger");
        var newpname = newpnameInp.prop("value");
        var ret = list[id];
        if (isnew || newpname != list[id].co) {
          if (!newpname || /[^\u0400-\u04FF_\-a-z0-9]/ig.test(newpname) || newpname.length < 3 || newpname.length > 15) {
            newpnameInp.addClass("uk-form-danger");
            $.UIkit.notify(nl.drew.cp.lang.l("errUProxyNameFormat"));
            return;
          }
          var i = list.length;
          while (i--) {
            if (typeof list[i] == "undefined") {
              continue;
            }
            if (i == id) {
              continue;
            }
            if (list[i].co == newpname) {
              newpnameInp.addClass("uk-form-danger");
              $.UIkit.notify(nl.drew.cp.lang.l("errUProxyNameAlreadyHave") + "<b>" + newpname + "</b>");
              return;
            }
          }
          ret.co = newpname;
          ischange = true;
        }
        ret.oldname = list[id].co;
        var newpprotoInp = $("#newpproto").removeClass("uk-form-danger");
        var newpproto = newpprotoInp.prop("value");
        if (isnew || newpproto != list[id].proto) {
          ret.proto = newpproto.toUpperCase();
          ischange = true;
        }
        var newpipInp = $("#newpip").removeClass("uk-form-danger");
        var newpip = newpipInp.prop("value");
        if (isnew || newpip != list[id].ip + ":" + list[id].port) {
          checkProxy = nl.drew.cp.lib.checkProxyUrl(newpip);
          if (checkProxy == false) {
            newpipInp.addClass("uk-form-danger");
            $.UIkit.notify(nl.drew.cp.lang.l("errUproxyIpFormat"));
            return;
          }
          ret.ip = checkProxy.ip;
          ret.port = checkProxy.port;
          ischange = true;
        }
        if (ischange) {
          nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"uproxy", val:ret});
        }
        cancel.remove();
        space.remove();
        save.remove();
        linkblock.show();
        if (isnew) {
          linkblock.children(".cp-edit").unbind().on("click", function(e) {
            e.stopImmediatePropagation();
            cpedit(e, $(this));
            return false;
          });
          linkblock.children(".cp-off").unbind().on("click", function(e) {
            cpoff(e, $(this));
            return false;
          });
          linkblock.children(".cp-del").unbind().on("click", function(e) {
            cpdel(e, $(this));
            return false;
          });
        }
        pname.removeClass("uk-form").empty().text(list[id].co);
        pip.removeClass("uk-form").empty().text(list[id].ip + ":" + list[id].port);
        pproto.removeClass("uk-form").empty().text(list[id].proto);
        nl.drew.cp.popup.uproxys.isedit = false;
      }}).appendTo(td);
      var space = $("<span>&nbsp;</span>").appendTo(td);
      var cancel = $("<a></a>").html('<i class="uk-icon-times-circle"></i>').on({click:function(event) {
        event.stopPropagation();
        if (isnew) {
          tr.remove();
          list.splice(id, 1);
        } else {
          cancel.remove();
          space.remove();
          save.remove();
          linkblock.show();
          pname.removeClass("uk-form").empty().text(list[id].co);
          pip.removeClass("uk-form").empty().text(list[id].ip + ":" + list[id].port);
          pproto.removeClass("uk-form").empty().text(list[id].proto);
        }
        nl.drew.cp.popup.uproxys.isedit = false;
      }}).appendTo(td);
      var pname = tr.children(".cp-pname");
      var pproto = tr.children(".cp-pproto");
      var pip = tr.children(".cp-pip");
      pname.empty();
      pname.addClass("uk-form");
      $('<input id="newpname" size="10" value="' + list[id].co + '" type="text" />').appendTo(pname);
      pip.empty();
      pip.addClass("uk-form");
      $('<input id="newpip" size="15" value="' + list[id].ip + ":" + list[id].port + '" type="text" />').appendTo(pip);
      pproto.empty();
      pproto.addClass("uk-form");
      $('<select id="newpproto">' + '<option value="proxy"' + (list[id].proto == "proxy" ? " selected" : "") + ">http</option>" + '<option value="https"' + (list[id].proto == "https" ? "selected" : "") + ">https</option>" + '<option value="socks"' + (list[id].proto == "socks" ? "selected" : "") + ">socks4</option>" + '<option value="socks5"' + (list[id].proto == "socks5" ? "selected" : "") + ">socks5</option>" + "</select>").appendTo(pproto);
    };
  };
  return uproxys;
}();

