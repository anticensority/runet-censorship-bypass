nl.drew.cp.popup.api = function() {
  var api = {};
  api.setapi = function() {
    nl.drew.cp.popup.portToExt = chrome.runtime.connect({name:"popup"});
    nl.drew.cp.popup.portToExt.onMessage.addListener(function(msg) {
      if (typeof msg.param != "undefined") {
        if (msg.param == "https") {
        } else {
          if (msg.param == "uproxy") {
            if (typeof msg.val == "undefined" && typeof msg.val.uproxy == "undefined") {
              return null;
            }
            var list = msg.val.uproxy;
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
            var len = list.length;
            nl.drew.cp.popup.uproxys.listShow(list, msg.val.template, nl.drew.cp.popup.pagenumuproxy, len);
            if (len > 10) {
              var pagination = $.UIkit.pagination("#proxytable2", {items:len, itemsOnPage:nl.drew.cp.popup.listOnPage, displayedPages:3, edges:2});
              pagination.on("uk.pagination.select", function(e, pageIndex) {
                nl.drew.cp.popup.pagenumuproxy = pageIndex;
                nl.drew.cp.popup.uproxys.listShow(list, pageIndex, len);
              });
            }
          } else {
            if (msg.param == "lists") {
              if (typeof msg.val == "undefined") {
                return null;
              }
              var list = msg.val;
              var hostScroll = msg.host;
              nl.drew.cp.popup.lists.listShow(list, nl.drew.cp.popup.pagenum, hostScroll);
            } else {
              if (msg.param == "globalalwproxy") {
                if (typeof msg.val == "undefined") {
                  return null;
                }
                if (!nl.drew.cp.popup.globalalwproxySW) {
                  nl.drew.cp.popup.globalalwproxySW = $("#globalalwproxy").switcher({style:"short", selected:msg.val, disabled:false});
                  nl.drew.cp.popup.main.globalalwproxychangeset(nl.drew.cp.popup.globalalwproxySW);
                } else {
                  if ($("#globalalwproxy").prop("checked") != msg.val) {
                    nl.drew.cp.popup.globalalwproxySW.switcher("setValue", msg.val);
                  }
                }
              } else {
                if (msg.param == "tor") {
                  if (msg.val.all != null) {
                    if (!nl.drew.cp.popup.torAllSW) {
                      nl.drew.cp.popup.torAllSW = $("#torall").switcher({style:"short", selected:msg.val.all, disabled:false});
                      nl.drew.cp.popup.main.torchangeset(nl.drew.cp.popup.torAllSW);
                    } else {
                      if (typeof msg.val.all != "undefined") {
                        if ($("#torall").prop("checked") != msg.val.all) {
                          nl.drew.cp.popup.torAllSW.switcher("setValue", msg.val.all);
                        }
                      }
                    }
                  }
                  if (msg.val.site != null) {
                    if (!nl.drew.cp.popup.torSiteSW) {
                      nl.drew.cp.popup.torSiteSW = $("#torsite").switcher({style:"short", selected:msg.val.site, disabled:false});
                      nl.drew.cp.popup.main.torsitechangeset(nl.drew.cp.popup.torSiteSW);
                    } else {
                      if (typeof msg.val.site != "undefined") {
                        if ($("#torsite").prop("checked") != msg.val.site) {
                          nl.drew.cp.popup.torSiteSW.switcher("setValue", msg.val.site);
                        }
                      }
                    }
                  }
                } else {
                  if (msg.param == "anonymity") {
                    if (msg.val.all != null) {
                      if (!nl.drew.cp.popup.anonymityallSW) {
                        nl.drew.cp.popup.anonymityallSW = $("#anonymityall").switcher({style:"short", selected:msg.val.all, disabled:false});
                        nl.drew.cp.popup.main.anonymitychangeset(nl.drew.cp.popup.anonymityallSW);
                      } else {
                        if (typeof msg.val.all != "undefined") {
                          if ($("#anonymityall").prop("checked") != msg.val.all) {
                            nl.drew.cp.popup.anonymityallSW.switcher("setValue", msg.val.all);
                          }
                        }
                      }
                    }
                    if (msg.val.site != null) {
                      if (nl.drew.cp.popup.host != msg.val.host) {
                        return;
                      }
                      if (!nl.drew.cp.popup.anonymitysiteSW) {
                        nl.drew.cp.popup.anonymitysiteSW = $("#anonymitysite").switcher({style:"short", selected:msg.val.site, disabled:false});
                        nl.drew.cp.popup.main.anonymitysitechangeset(nl.drew.cp.popup.anonymitysiteSW);
                      } else {
                        if (typeof msg.val.site != "undefined") {
                          if ($("#anonymitysite").prop("checked") != msg.val.site) {
                            nl.drew.cp.popup.anonymitysiteSW.switcher("setValue", msg.val.site);
                          }
                        }
                      }
                    }
                  } else {
                    if (msg.param == "isenabled") {
                      if (!nl.drew.cp.popup.onoffSW) {
                        nl.drew.cp.popup.onoffSW = nl.drew.cp.popup.onoffUI.switcher({style:"default", selected:msg.val, language:"en", disabled:false, copy:{en:{yes:nl.drew.cp.lang.l("msgOn"), no:nl.drew.cp.lang.l("msgOff")}}});
                        nl.drew.cp.popup.main.changeset();
                      } else {
                        if (typeof msg.val != "undefined") {
                          if (nl.drew.cp.popup.onoffUI.prop("checked") != msg.val) {
                            nl.drew.cp.popup.onoffSW.switcher("setValue", msg.val);
                          }
                        }
                      }
                    } else {
                      if (msg.param == "state") {
                        var state = $("#state");
                        nl.drew.cp.popup.lib.blinkStop(state);
                        if (typeof msg.val != "undefined" && msg.val.text) {
                          state.removeClass("uk-text-muted uk-text-danger uk-text-success uk-text-warning");
                          state.text(msg.val.text);
                          if (typeof msg.val.cl != "undefined" && msg.val.cl) {
                            state.addClass(msg.val.cl);
                          }
                          if (typeof msg.val.blink != "undefined" && msg.val.blink) {
                            nl.drew.cp.popup.lib.blinkStart(state);
                          }
                          $("#state-wrap").css("visibility", "visible");
                        }
                      } else {
                        if (msg.param == "mainproxy") {
                          var mainproxy = $("#mainproxy");
                          var mainproxyco = $("#mainproxyco");
                          var mainproxycotext = $("#mainproxycotext div");
                          var enc = "";
                          var activetab = 0;
                          mainproxy.empty();
                          mainproxyco.empty();
                          mainproxycotext.empty();
                          mainproxy.html(nl.drew.cp.lang.l("proxyOff"));
                          if (typeof msg.val != "undefined" && msg.val && typeof msg.val.name != "undefined" && msg.val.name) {
                            if (typeof msg.val.ssl != "undefined" && msg.val.ssl) {
                              enc = '<div class="uk-text-small cp-os-light"><span class="cp-os"><i class="uk-icon-check-circle uk-text-success"></i> spdy</span> over ssl/tls encryption</div>';
                            }
                            if (msg.val.co != "unknown" || !msg.val.allow) {
                              mainproxy.html("<b>" + msg.val.name + "</b>" + enc);
                            } else {
                              mainproxy.append('<div class="uk-text-small cp-os-light">' + msg.val.name + "</div>");
                            }
                            if (msg.val.co != "unknown" && msg.val.allow) {
                              activetab = 1;
                            } else {
                              $("#sitetab").addClass("uk-disabled");
                              activetab = 0;
                            }
                            if (msg.val.co.length == 2) {
                              mainproxyco.html('<img src="im/co/' + msg.val.co + '.png">');
                            } else {
                              if (msg.val.co == "public") {
                                mainproxyco.html('<img src="im/co/p.png">');
                              } else {
                                mainproxyco.html('<img src="im/co/unknown.png">');
                              }
                            }
                            if (msg.val.co != "unknown") {
                              mainproxycotext.text(msg.val.co);
                            }
                          }
                          if (typeof msg.val != "undefined" && msg.val && typeof msg.val.host != "undefined" && msg.val.host) {
                            activetab = 1;
                          }
                          if (!nl.drew.cp.popup.switcher) {
                            nl.drew.cp.popup.switcher = $.UIkit.switcher("#maintabs", {connect:"#configproxy", animation:"fade", active:activetab});
                            nl.drew.cp.popup.switcher.on("uk.switcher.show", function(event, area) {
                              if (area[0].id == "liststab") {
                                $("#listtable").html('<tr><td><i class="uk-icon-spinner uk-icon-spin"></i></td></tr>');
                                nl.drew.cp.popup.portToExt.postMessage({msg:"get", param:"lists"});
                              } else {
                                if (area[0].id == "userprotab") {
                                  $("#proxytable").html('<tr><td><i class="uk-icon-spinner uk-icon-spin"></i></td></tr>');
                                  nl.drew.cp.popup.portToExt.postMessage({msg:"get", param:"uproxy"});
                                } else {
                                  nl.drew.cp.popup.portToExt.postMessage({msg:"get", param:"contrys", val:{}});
                                }
                              }
                            });
                          }
                        } else {
                          if (msg.param == "contrys") {
                            var flags = $(".cp-flags");
                            if (typeof msg.val != "undefined" && msg.val.contrys.length > 0) {
                              nl.drew.cp.popup.contrys = msg.val.contrys.slice();
                              flags.show();
                              nl.drew.cp.popup.lib.buildFlags("flags-all", msg.val.contrys, msg.val.uproxys, msg.val.contrymain);
                              if (nl.drew.cp.popup.host == msg.val.host) {
                                nl.drew.cp.popup.lib.buildFlags("flags-site", msg.val.contrys, msg.val.uproxys, msg.val.contrysite, msg.val.host);
                              }
                            } else {
                              flags.children(".cp-flags-content").empty();
                              flags.hide();
                            }
                            $(".uk-icon-spinner").remove();
                            $("body").css("min-width", "500px").css("min-height", "330px");
                            $("#main").css("display", "block");
                          } else {
                            if (msg.param == "anonymitynow") {
                              var anonymitynow, tornow;
                              if (typeof msg.val == "undefined") {
                                anonymitynow = false;
                                tornow = false;
                              } else {
                                anonymitynow = msg.val[0];
                                tornow = msg.val[1];
                              }
                              var hideip = $("#hideip");
                              var hideiptext = $("#hideiptext div");
                              hideip.empty();
                              hideiptext.empty();
                              if (tornow) {
                                hideip.html('<img src="im/onion.png" />');
                                hideiptext.text("TOR");
                              } else {
                                if (anonymitynow) {
                                  hideip.html('<img src="im/hide.png" />');
                                  hideiptext.text("hide ip");
                                }
                              }
                            } else {
                              if (msg.param == "nonproxyalwproxy") {
                                if (nl.drew.cp.popup.host != msg.val.host) {
                                  return;
                                }
                                var nonproxy;
                                var alwproxy;
                                if (typeof msg.val.nonproxy == "undefined") {
                                  nonproxy = false;
                                } else {
                                  nonproxy = msg.val.nonproxy > -1;
                                }
                                if (typeof msg.val.alwproxy == "undefined") {
                                  alwproxy = false;
                                } else {
                                  alwproxy = msg.val.alwproxy > -1;
                                }
                                if (!nl.drew.cp.popup.nonproxySW) {
                                  nl.drew.cp.popup.nonproxySW = $("#nonproxy").switcher({style:"short", selected:nonproxy});
                                  nl.drew.cp.popup.main.nonproxychangeset(nl.drew.cp.popup.nonproxySW);
                                } else {
                                  if ($("#nonproxy").prop("checked") != nonproxy) {
                                    nl.drew.cp.popup.nonproxySW.switcher("setValue", nonproxy);
                                  }
                                }
                                if (!nl.drew.cp.popup.alwproxySW) {
                                  nl.drew.cp.popup.alwproxySW = $("#alwproxy").switcher({style:"short", selected:alwproxy});
                                  nl.drew.cp.popup.main.alwproxychangeset(nl.drew.cp.popup.alwproxySW);
                                } else {
                                  if ($("#alwproxy").prop("checked") != alwproxy) {
                                    nl.drew.cp.popup.alwproxySW.switcher("setValue", alwproxy);
                                  }
                                }
                                if (nonproxy && !alwproxy) {
                                  $("#sitedopsetting").hide();
                                } else {
                                  $("#sitedopsetting").show();
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  };
  return api;
}();

