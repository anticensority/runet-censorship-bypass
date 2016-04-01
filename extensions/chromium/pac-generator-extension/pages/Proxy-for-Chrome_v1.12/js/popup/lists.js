nl.drew.cp.popup.lists = function() {
  var lists = {};
  lists.isedit = false;
  lists.incData = function(list) {
    var an = '<i class="uk-icon-eye-slash uk-invisible"></i>';
    var loc = "";
    var alwproxy = "";
    if (list.alwproxy) {
      alwproxy = '<i class="uk-icon-cloud-upload"></i>';
    } else {
      if (list.nonproxy) {
        alwproxy = '<i class="uk-icon-arrows-h"></i>';
      }
    }
    if (!list.nonproxy) {
      if (list.an) {
        an = '<i class="uk-icon-eye-slash"></i>';
      }
      if (list.loc) {
        if (list.loc.length > 2) {
          loc = '<img src="im/co/unknown' + '.png">';
        } else {
          loc = '<img src="im/co/' + list.loc + '.png">';
        }
      }
    }
    return'<td class="cp-proxy"><div>' + alwproxy + '</div></td><td class="cp-an"><div>' + an + '</div></td><td class="cp-loc"><div>' + loc + "<div></td>";
  };
  lists.listShow = function(list, page, hostScroll) {
    var listtable = $("#listtable");
    listtable.empty();
    this.listShowFolder(listtable, list, -1, 0, page);
    this.setEvents(list);
    setTimeout(function() {
      if (hostScroll) {
        $("#listWrap").scrollTo($("[ref='" + hostScroll + "']"));
      }
    }, 500);
  };
  lists.listShowFolder = function(listtable, alllist, parent, lavel, page) {
    var count = 0;
    var list = [];
    var i = alllist.length;
    while (i--) {
      alllist[i].id = i;
      if (alllist[i].par != -1) {
        alllist[alllist[i].par].ischild = alllist[i].par;
      }
    }
    var i = alllist.length;
    while (i--) {
      if (alllist[i].par != parent) {
        continue;
      }
      list.push(alllist[i]);
    }
    list.sort(function(i, ii) {
      if (i.host > ii.host) {
        return-1;
      } else {
        if (i.host < ii.host) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    var i = list.length;
    var tr;
    var dispedit;
    var onoffico, off, trstyle, tdstyle;
    while (i--) {
      an = '<i class="uk-icon-eye-slash uk-invisible"></i>';
      loc = "";
      alwproxy = "";
      trstyle = "";
      tdstyle = "";
      if (list[i].alwproxy) {
        alwproxy = '<i class="uk-icon-cloud-upload"></i>';
      } else {
        if (list[i].nonproxy) {
          alwproxy = '<i class="uk-icon-arrows-h"></i>';
        }
      }
      if (!list[i].nonproxy) {
        if (list[i].an) {
          an = '<i class="uk-icon-eye-slash"></i>';
        }
        if (list[i].loc) {
          loc = '<img src="im/co/' + list[i].loc + '.png">';
        }
      }
      if (list[i].off) {
        dispedit = ' style="display: none;"';
        onoffico = "uk-icon-toggle-off";
        trstyle = "opacity: 0.5;";
      } else {
        dispedit = "";
        onoffico = "uk-icon-toggle-on";
      }
      if (lavel > 0) {
        trstyle = trstyle + " font-size:" + (14 - lavel) + "px;";
        tdstyle = "padding-left:" + (lavel * 10 + 10) + "px";
      }
      if (trstyle) {
        trstyle = ' style="' + trstyle + '"';
      }
      if (tdstyle) {
        tdstyle = ' style="' + tdstyle + '"';
      }
      tr = listtable.append("<tr" + trstyle + ' rel="' + list[i].id + '" ref="' + list[i].host + '"><td' + tdstyle + ' class="cp-hname">' + "" + list[i].host + "</td>" + this.incData(list[i]) + '<td class="uk-text-right cp-act"><div class="cp-unvis"><a href="#" class="cp-edit"' + dispedit + '><i class="uk-icon-pencil"></i></a> <a href="#" class="cp-off"><i class="' + onoffico + '"></i></a> <a href="#" class="cp-del"><i class="uk-icon-trash-o"></i></a></div></td></tr>');
      if (list[i].ischild > -1) {
        this.listShowFolder(listtable, alllist, list[i].ischild, lavel + 1, 0);
      }
      count++;
    }
  };
  lists.setEvents = function(list) {
    $("#listtable tr").unbind().bind({mouseenter:function() {
      if (!nl.drew.cp.popup.lists.isedit) {
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
        tr.fadeTo("fast", .5, function() {
          icon.removeClass("uk-icon-toggle-on").addClass("uk-icon-toggle-off");
          list[id].off = true;
          nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"listoff", val:list[id].host});
        });
      } else {
        linkblock.children(".cp-edit").show();
        tr.fadeTo("fast", 1, function() {
          icon.removeClass("uk-icon-toggle-off").addClass("uk-icon-toggle-on");
          list[id].off = false;
          nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"liston", val:list[id]});
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
      if (list[id].off) {
        nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"listoffremove", val:list[id]});
      } else {
        nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"listonremove", val:list[id]});
      }
      tr.fadeTo("fast", .4, function() {
        linkblock.hide();
        $('<a class="uk-text-small"></a>').text("restore").on({click:function(event) {
          event.stopPropagation();
          var opt;
          $(this).remove();
          if (list[id].off) {
            opt = .7;
            nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"listoffrest", val:list[id]});
          } else {
            opt = 1;
            nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"listonrest", val:list[id]});
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
    $("#addhost").unbind().on("click", function(e) {
      e.stopImmediatePropagation();
      var table = $("#listtable");
      var id = list.length;
      table.prepend('<tr rel="' + id + '"><td class="uk-form cp-newhost"><input id="newhost" placeholder="URL" type="text" /></td><td class="cp-proxy"><div></div></td><td class="cp-an"><div></div></td><td class="cp-loc"><div><div></td><td class="uk-text-right cp-act"><div><a href="#" class="cp-edit"><i class="uk-icon-pencil"></i></a> <a href="#" class="cp-off"><i class="uk-icon-toggle-on"></i></a> <a href="#" class="cp-del"><i class="uk-icon-trash-o"></i></a></div></td></tr>');
      list.push({host:"", nonproxy:false, alwproxy:false, an:false, loc:"", del:false});
      cpedit(e, $("[rel=" + id + "]").find(".cp-edit"), true);
      return false;
    });
    var cpedit = function(e, thiss, isnew) {
      nl.drew.cp.popup.lists.isedit = true;
      var linkblock = thiss.parent();
      var td = linkblock.parent();
      var tr = td.parent("tr");
      var id = tr.attr("rel");
      var newval = {host:"", nonproxy:false, alwproxy:false, an:false, loc:"", del:false, off:false};
      linkblock.hide();
      var save = $("<a></a>").html('<i class="uk-icon-save"></i>').on({click:function(event) {
        event.stopPropagation();
        var hostinput = $("#newhost");
        hostinput.removeClass("uk-form-danger");
        var host = $.trim(hostinput.prop("value"));
        if (!host) {
          hostinput.addClass("uk-form-danger");
          $.UIkit.notify(nl.drew.cp.lang.l("EmptyURL"));
          return;
        }
        var isproto = host.indexOf("://");
        if (isproto != -1) {
          host = host.substr(isproto + 3);
        }
        if (host != list[id].host) {
          var isast = false;
          if (host[0] == "*" && host[1] == ".") {
            isast = true;
            host = host.substr(2);
          }
          host = "http://" + host;
          var purl = nl.drew.cp.lib.parseUrl(host);
          if (purl == false) {
            hostinput.addClass("uk-form-danger");
            $.UIkit.notify(nl.drew.cp.lang.l("WrongURLformat"));
            return;
          }
          if (!purl.allow) {
            hostinput.addClass("uk-form-danger");
            $.UIkit.notify(nl.drew.cp.lang.l("WrongURLprotocol"));
            return;
          }
          host = purl.host;
          if (isast) {
            host = "*." + purl.host;
          }
          if (nl.drew.cp.lib.quickquickInArray(host, list.slice()) != false) {
            hostinput.addClass("uk-form-danger");
            $.UIkit.notify(nl.drew.cp.lang.l("ThisURLalreadyadded"));
            return;
          }
          if (isnew && newval.loc == list[id].loc && newval.an == list[id].an && newval.nonproxy == list[id].nonproxy && newval.alwproxy == list[id].alwproxy) {
            $.UIkit.notify(nl.drew.cp.lang.l("Nooptionschanged"));
            return;
          }
          if (!isnew) {
            nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"listonremove", val:{host:list[id].host, nosend:true}});
            list[id].loc = "";
            list[id].an = false;
            list[id].nonproxy = false;
            list[id].alwproxy = false;
          }
          list[id].host = host;
        }
        $(this).remove();
        space.remove();
        cancel.remove();
        linkblock.show();
        proxysave.remove();
        ansave.remove();
        locsave.remove();
        tr.children(".cp-hname").empty().removeClass("uk-form").text(list[id].host);
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
        var step = 0;
        if (newval.loc != list[id].loc) {
          list[id].loc = newval.loc;
          newval.loc = true;
          step = 1;
        } else {
          newval.loc = false;
        }
        if (newval.an != list[id].an) {
          list[id].an = newval.an;
          newval.an = true;
          step = 2;
        } else {
          newval.an = false;
        }
        if (newval.nonproxy != list[id].nonproxy) {
          if (!list[id].nonproxy || newval.nonproxy && !list[id].nonproxy && !list[id].alwproxy || list[id].nonproxy && !newval.nonproxy && !newval.alwproxy) {
            list[id].nonproxy = newval.nonproxy;
            newval.nonproxy = true;
            step = 3;
          }
        } else {
          newval.nonproxy = false;
        }
        if (newval.alwproxy != list[id].alwproxy) {
          if (!list[id].alwproxy || newval.alwproxy && !list[id].alwproxy && !list[id].nonproxy || list[id].alwproxy && !newval.alwproxy && !newval.nonproxy) {
            list[id].alwproxy = newval.alwproxy;
            newval.alwproxy = true;
            step = 4;
          }
        } else {
          newval.alwproxy = false;
        }
        if (newval.loc) {
          nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"contrysite", val:{host:list[id].host, val:list[id].loc, list:true, nosend:true, listRequest:step == 1}});
        }
        if (newval.an) {
          nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"anonymitysite", val:{host:list[id].host, val:list[id].an, list:true, nosend:true, listRequest:step == 2}});
        }
        if (newval.nonproxy) {
          nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"nonproxy", val:{host:list[id].host, val:list[id].nonproxy, list:true, nosend:true, listRequest:step == 3}});
        }
        if (newval.alwproxy) {
          nl.drew.cp.popup.portToExt.postMessage({msg:"set", param:"alwproxy", val:{host:list[id].host, val:list[id].alwproxy, list:true, nosend:true, listRequest:step == 4}});
        }
        tr.children(".cp-loc").remove();
        tr.children(".cp-an").remove();
        tr.children(".cp-proxy").remove();
        nl.drew.cp.popup.portToExt.postMessage({msg:"get", param:"anonymitynow", val:{host:list[id].host}});
        nl.drew.cp.popup.lists.isedit = false;
      }}).appendTo(td);
      var space = $("<span>&nbsp;</span>").appendTo(td);
      var cancel = $("<a></a>").html('<i class="uk-icon-times-circle"></i>').on({click:function(event) {
        event.stopPropagation();
        if (isnew) {
          tr.remove();
          list.splice(id, 1);
        } else {
          $(this).remove();
          space.remove();
          save.remove();
          linkblock.show();
          proxy.remove();
          tr.children(".cp-hname").removeClass("uk-form").text(list[id].host);
          tr.children(".cp-proxy").html(proxysave);
          an.remove();
          tr.children(".cp-an").html(ansave);
          loc.remove();
          tr.children(".cp-loc").html(locsave);
        }
        nl.drew.cp.popup.lists.isedit = false;
      }}).appendTo(td);
      var hname = tr.children(".cp-hname");
      var loc = tr.children(".cp-loc").children();
      var an = tr.children(".cp-an").children();
      var proxy = tr.children(".cp-proxy").children();
      hname.empty();
      hname.addClass("uk-form");
      $('<input id="newhost" size="20" value="' + list[id].host + '" type="text" />').appendTo(hname);
      var ddData = [{text:"NO", value:"", selected:!list[id].loc, description:""}];
      var i = nl.drew.cp.popup.contrys.length;
      while (i--) {
        if (typeof nl.drew.cp.popup.contrys[i] == "undefined") {
          continue;
        }
        ddData.push({text:"", value:nl.drew.cp.popup.contrys[i], selected:list[id].loc == nl.drew.cp.popup.contrys[i], imageSrc:"im/co/" + nl.drew.cp.popup.contrys[i] + ".png"});
      }
      locsave = loc.clone();
      loc.empty();
      loc.ddslick({data:ddData, width:45, imagePosition:"left", selectText:"", onSelected:function(data) {
        newval.loc = data.selectedData.value;
      }});
      var anData = [{text:"", value:1, selected:list[id].an, description:"", ico:"eye-slash"}, {text:"", value:0, selected:!list[id].an, description:"", ico:"eye"}];
      ansave = an.clone();
      an.empty();
      an.ddslick({data:anData, width:40, imagePosition:"left", selectText:"", onSelected:function(data) {
        newval.an = data.selectedData.value == 1;
      }});
      var proxyData = [{text:"NO", value:"", selected:!list[id].alwproxy && !list[id].nonproxy}, {text:"", value:"alw", selected:list[id].alwproxy, ico:"cloud-upload"}, {text:"", value:"non", selected:list[id].nonproxy, ico:"arrows-h"}];
      proxysave = proxy.clone();
      proxy.empty();
      proxy.ddslick({data:proxyData, width:45, imagePosition:"left", selectText:"", onSelected:function(data) {
        if (data.selectedData.value == "alw") {
          newval.alwproxy = true;
          newval.nonproxy = false;
        } else {
          if (data.selectedData.value == "non") {
            newval.alwproxy = false;
            newval.nonproxy = true;
          } else {
            newval.alwproxy = false;
            newval.nonproxy = false;
          }
        }
      }});
    };
  };
  return lists;
}();

