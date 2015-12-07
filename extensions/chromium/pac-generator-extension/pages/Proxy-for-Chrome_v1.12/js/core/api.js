nl.drew.cp.core.api = function() {
  var api = {port:null};
  api.handling = function(port, msg) {
    var lid;
    nl.drew.cp.core.api.port = port;
    if (msg.msg == "log") {
      nl.drew.cp.lib.debug(msg.param);
    } else {
      if (msg.msg == "on") {
        nl.drew.cp.core.main.start(true);
        nl.drew.cp.core.cache.nowProxyAllClean();
      } else {
        if (msg.msg == "off") {
          nl.drew.cp.core.main.stop();
          nl.drew.cp.core.cache.nowProxyAllClean();
        } else {
          if (msg.msg == "icoupd") {
            nl.drew.cp.core.interf.icoupdate2();
          } else {
            if (msg.msg == "set") {
              if (msg.param == "https") {
                if (typeof msg.val != "undefined") {
                  nl.drew.cp.state.https = msg.val;
                  nl.drew.cp.ls.set("https", nl.drew.cp.state.https, false);
                }
              } else {
                if (msg.param == "uproxyremove") {
                  if (typeof msg.val != "undefined" && typeof msg.val.co != "undefined" && msg.val.co) {
                    var delUproxyList = nl.drew.cp.core.lib.inUproxyList(msg.val.co);
                    if (delUproxyList > -1) {
                      nl.drew.cp.state.uproxys.splice(delUproxyList, 1);
                      nl.drew.cp.ls.set("uproxys", nl.drew.cp.state.uproxys, false);
                      nl.drew.cp.core.cache.nowProxyAllClean();
                      nl.drew.cp.core.filter.inst();
                    }
                  }
                } else {
                  if (msg.param == "uproxy") {
                    if (typeof msg.val != "undefined" && typeof msg.val.oldname != "undefined" && msg.val.oldname) {
                      var i = nl.drew.cp.core.lib.inUproxyList(msg.val.oldname);
                      var newname = msg.val.proto.toUpperCase() + " " + msg.val.ip + ":" + msg.val.port;
                      if (i > -1) {
                        nl.drew.cp.state.uproxys[i].co = msg.val.co;
                        nl.drew.cp.state.uproxys[i].proto = msg.val.proto;
                        nl.drew.cp.state.uproxys[i].ip = msg.val.ip;
                        nl.drew.cp.state.uproxys[i].port = msg.val.port;
                        nl.drew.cp.state.uproxys[i].name = newname;
                        nl.drew.cp.state.uproxys[i].off = msg.val.hasOwnProperty("off") ? msg.val.off : nl.drew.cp.state.uproxys[i].off;
                        if (nl.drew.cp.state.listContrySite.hasOwnProperty(msg.val.oldname)) {
                          nl.drew.cp.state.listContrySite[msg.val.co] = nl.drew.cp.lib.clone(nl.drew.cp.state.listContrySite[msg.val.oldname]);
                          delete nl.drew.cp.state.listContrySite[msg.val.oldname];
                        }
                      } else {
                        nl.drew.cp.state.uproxys.push({ip:msg.val.ip, port:msg.val.port, sport:"", proto:msg.val.proto, co:msg.val.co, name:newname, off:msg.val.hasOwnProperty("off") ? msg.val.off : false});
                      }
                      nl.drew.cp.core.cache.nowProxyAllClean();
                      nl.drew.cp.ls.set("uproxys", nl.drew.cp.state.uproxys, false);
                      nl.drew.cp.core.filter.inst();
                    }
                  } else {
                    if (msg.param == "liston") {
                      if (typeof msg.val != "undefined") {
                        nl.drew.cp.core.lib.liston(msg.val);
                        nl.drew.cp.core.api.postMessage({param:"lists", val:nl.drew.cp.core.lib.globalListGen()});
                      }
                    } else {
                      if (msg.param == "listoff") {
                        if (typeof msg.val != "undefined") {
                          nl.drew.cp.core.lib.listoff(msg.val);
                        }
                      } else {
                        if (msg.param == "listonrest") {
                          if (typeof msg.val != "undefined") {
                            nl.drew.cp.core.lib.liston(msg.val, true);
                          }
                        } else {
                          if (msg.param == "listonremove") {
                            if (typeof msg.val != "undefined") {
                              var nosend = false;
                              if (typeof msg.val.nosend != "undefined") {
                                nosend = msg.val.nosend;
                              }
                              nl.drew.cp.core.lib.listoff(msg.val.host, true, nosend);
                            }
                          } else {
                            if (msg.param == "listoffrest") {
                              if (typeof msg.val != "undefined") {
                                if (nl.drew.cp.core.lib.inOffSiteListAllParam(msg.val) == -1) {
                                  nl.drew.cp.state.offlist.push(msg.val);
                                }
                              }
                              nl.drew.cp.core.cache.nowProxyClean({host:msg.val});
                            } else {
                              if (msg.param == "listoffremove") {
                                if (typeof msg.val != "undefined") {
                                  lid = nl.drew.cp.core.lib.inOffSiteListAllParam(msg.val);
                                  if (lid == -1) {
                                    return;
                                  }
                                  nl.drew.cp.state.offlist.splice(lid, 1);
                                  nl.drew.cp.ls.set("offlist", nl.drew.cp.state.offlist, false);
                                  nl.drew.cp.core.cache.nowProxyClean({host:msg.val});
                                }
                              } else {
                                if (msg.param == "globalalwproxy") {
                                  if (typeof msg.val != "undefined") {
                                    nl.drew.cp.state.alwProxy = msg.val;
                                    nl.drew.cp.ls.set("globalalwproxy", nl.drew.cp.state.alwProxy, false);
                                    nl.drew.cp.core.cache.nowProxyAllClean();
                                    nl.drew.cp.core.filter.inst();
                                  }
                                } else {
                                  if (msg.param == "contrymain") {
                                    if (typeof msg.val != "undefined" && msg.val) {
                                      nl.drew.cp.state.contryMain = msg.val;
                                      nl.drew.cp.ls.set("contrymain", nl.drew.cp.state.contryMain, false);
                                      nl.drew.cp.core.cache.nowProxyAllClean();
                                      nl.drew.cp.core.filter.inst();
                                    }
                                  } else {
                                    if (msg.param == "tor") {
                                      if (typeof msg.val != "undefined") {
                                        if (typeof msg.val.all != "undefined") {
                                          nl.drew.cp.state.torAll = msg.val.all;
                                          nl.drew.cp.ls.set("torall", nl.drew.cp.state.torAll, false);
                                        }
                                        nl.drew.cp.core.api.sendtoPortAnonymitynow();
                                      }
                                    } else {
                                      if (msg.param == "torsite") {
                                        if (typeof msg.val != "undefined" && typeof msg.val.host != "undefined" && msg.val.host) {
                                          chrome.tabs.getSelected(null, function(tab) {
                                            var purl = nl.drew.cp.lib.parseUrl(tab.url);
                                            if ((typeof msg.val.list == "undefined" || !msg.val.list) && (!purl.allow || msg.val.host != purl.host)) {
                                              return;
                                            }
                                            if (msg.val.val) {
                                              if (nl.drew.cp.core.lib.inTorSiteList(msg.val.host) > -1) {
                                                return;
                                              }
                                              nl.drew.cp.state.listTorSite.push(msg.val.host);
                                            } else {
                                              var ind = nl.drew.cp.core.lib.inTorSiteList(msg.val.host);
                                              if (ind == -1) {
                                                return;
                                              }
                                              nl.drew.cp.state.listTorSite.splice(ind, 1);
                                            }
                                            nl.drew.cp.ls.set("torSite", nl.drew.cp.state.listTorSite, false);
                                            nl.drew.cp.core.interf.icoupdate7(tab.url);
                                            nl.drew.cp.core.api.sendtoPortAnonymitynow(msg.val);
                                          });
                                        }
                                      } else {
                                        if (msg.param == "anonymity") {
                                          if (typeof msg.val != "undefined") {
                                            if (typeof msg.val.all != "undefined") {
                                              nl.drew.cp.state.anonymityAll = msg.val.all;
                                              nl.drew.cp.ls.set("anonymityall", nl.drew.cp.state.anonymityAll, false);
                                            }
                                            nl.drew.cp.core.api.sendtoPortAnonymitynow();
                                          }
                                        } else {
                                          if (msg.param == "anonymitysite") {
                                            if (typeof msg.val != "undefined" && typeof msg.val.host != "undefined" && msg.val.host) {
                                              chrome.tabs.getSelected(null, function(tab) {
                                                var purl = nl.drew.cp.lib.parseUrl(tab.url);
                                                if ((typeof msg.val.list == "undefined" || !msg.val.list) && (!purl.allow || msg.val.host != purl.host)) {
                                                  return;
                                                }
                                                if (msg.val.val) {
                                                  if (nl.drew.cp.core.lib.inAnSiteList(msg.val.host) > -1) {
                                                    return;
                                                  }
                                                  nl.drew.cp.state.listAnSite.push(msg.val.host);
                                                } else {
                                                  var ind = nl.drew.cp.core.lib.inAnSiteList(msg.val.host);
                                                  if (ind == -1) {
                                                    return;
                                                  }
                                                  nl.drew.cp.state.listAnSite.splice(ind, 1);
                                                }
                                                lid = nl.drew.cp.core.lib.checkListOnOff(msg.val.host);
                                                if (lid > -1) {
                                                  nl.drew.cp.state.offlist.splice(lid, 1);
                                                }
                                                nl.drew.cp.ls.set("anSite", nl.drew.cp.state.listAnSite, false);
                                                var nosend = false;
                                                if (typeof msg.val.nosend != "undefined") {
                                                  nosend = msg.val.nosend;
                                                }
                                                if (!nosend) {
                                                  nl.drew.cp.core.api.sendtoPortAnonymitynow(msg.val);
                                                }
                                                nl.drew.cp.core.api.sendList(msg.val.listRequest, msg.val.host);
                                              });
                                            }
                                          } else {
                                            if (msg.param == "nonproxy") {
                                              if (typeof msg.val != "undefined" && typeof msg.val.host != "undefined" && msg.val.host) {
                                                chrome.tabs.getSelected(null, function(tab) {
                                                  var purl = nl.drew.cp.lib.parseUrl(tab.url);
                                                  nl.drew.cp.core.cache.nowProxyClean(purl);
                                                  if ((typeof msg.val.list == "undefined" || !msg.val.list) && (!purl.allow || msg.val.host != purl.host)) {
                                                    return;
                                                  }
                                                  if (msg.val.val) {
                                                    if (nl.drew.cp.core.lib.inNonProxySiteList(msg.val.host) > -1) {
                                                      return;
                                                    }
                                                    nl.drew.cp.state.listNonProxySite.push(msg.val.host);
                                                    var ind = nl.drew.cp.core.lib.inAlwProxySiteList(msg.val.host);
                                                    if (ind > -1) {
                                                      nl.drew.cp.state.listAlwProxySite.splice(ind, 1);
                                                    }
                                                  } else {
                                                    var ind = nl.drew.cp.core.lib.inNonProxySiteList(msg.val.host);
                                                    if (ind == -1) {
                                                      return;
                                                    }
                                                    nl.drew.cp.state.listNonProxySite.splice(ind, 1);
                                                  }
                                                  lid = nl.drew.cp.core.lib.checkListOnOff(msg.val.host);
                                                  if (lid > -1) {
                                                    nl.drew.cp.state.offlist.splice(lid, 1);
                                                  }
                                                  nl.drew.cp.ls.set("alwProxySite", nl.drew.cp.state.listAlwProxySite, false);
                                                  nl.drew.cp.ls.set("nonProxySite", nl.drew.cp.state.listNonProxySite, false);
                                                  nl.drew.cp.core.filter.inst();
                                                  var nosend = false;
                                                  if (typeof msg.val.nosend != "undefined") {
                                                    nosend = msg.val.nosend;
                                                  }
                                                  if (!nosend) {
                                                    nl.drew.cp.core.api.sendtoPortInProxyList(msg.val);
                                                  }
                                                  nl.drew.cp.core.api.sendList(msg.val.listRequest, msg.val.host);
                                                });
                                              }
                                            } else {
                                              if (msg.param == "alwproxy") {
                                                if (typeof msg.val != "undefined" && typeof msg.val.host != "undefined" && msg.val.host) {
                                                  chrome.tabs.getSelected(null, function(tab) {
                                                    var purl = nl.drew.cp.lib.parseUrl(tab.url);
                                                    nl.drew.cp.core.cache.nowProxyClean(purl);
                                                    if ((typeof msg.val.list == "undefined" || !msg.val.list) && (!purl.allow || msg.val.host != purl.host)) {
                                                      return;
                                                    }
                                                    if (msg.val.val) {
                                                      if (nl.drew.cp.core.lib.inAlwProxySiteListEqually(msg.val.host) > -1) {
                                                        return;
                                                      }
                                                      nl.drew.cp.state.listAlwProxySite.push(msg.val.host);
                                                      var ind = nl.drew.cp.core.lib.inNonProxySiteList(msg.val.host);
                                                      if (ind > -1) {
                                                        nl.drew.cp.state.listNonProxySite.splice(ind, 1);
                                                      }
                                                    } else {
                                                      var ind = nl.drew.cp.core.lib.inAlwProxySiteListEqually(msg.val.host);
                                                      if (ind == -1) {
                                                        return;
                                                      }
                                                      nl.drew.cp.state.listAlwProxySite.splice(ind, 1);
                                                    }
                                                    lid = nl.drew.cp.core.lib.checkListOnOff(msg.val.host);
                                                    if (lid > -1) {
                                                      nl.drew.cp.state.offlist.splice(lid, 1);
                                                    }
                                                    nl.drew.cp.ls.set("alwProxySite", nl.drew.cp.state.listAlwProxySite, false);
                                                    nl.drew.cp.ls.set("nonProxySite", nl.drew.cp.state.listNonProxySite, false);
                                                    nl.drew.cp.core.filter.inst();
                                                    var nosend = false;
                                                    if (typeof msg.val.nosend != "undefined") {
                                                      nosend = msg.val.nosend;
                                                    }
                                                    if (!nosend) {
                                                      nl.drew.cp.core.api.sendtoPortInProxyList(msg.val);
                                                    }
                                                    nl.drew.cp.core.api.sendList(msg.val.listRequest, msg.val.host);
                                                  });
                                                }
                                              } else {
                                                if (msg.param == "contrysite") {
                                                  if (typeof msg.val != "undefined" && typeof msg.val.host != "undefined" && msg.val.host) {
                                                    chrome.tabs.getSelected(null, function(tab) {
                                                      var purl = nl.drew.cp.lib.parseUrl(tab.url);
                                                      nl.drew.cp.core.cache.nowProxyClean(purl);
                                                      if ((typeof msg.val.list == "undefined" || !msg.val.list) && (!purl.allow || msg.val.host != purl.host)) {
                                                        return;
                                                      }
                                                      var key = msg.val.val;
                                                      if (key != "main") {
                                                        nl.drew.cp.core.lib.delContrySiteList(msg.val.host);
                                                        if (typeof nl.drew.cp.state.listContrySite[key] == "undefined") {
                                                          nl.drew.cp.state.listContrySite[key] = [];
                                                        }
                                                        nl.drew.cp.state.listContrySite[key].push(msg.val.host);
                                                      } else {
                                                        nl.drew.cp.core.lib.delContrySiteList(msg.val.host);
                                                      }
                                                      lid = nl.drew.cp.core.lib.checkListOnOff(msg.val.host);
                                                      if (lid > -1) {
                                                        nl.drew.cp.state.offlist.splice(lid, 1);
                                                      }
                                                      nl.drew.cp.ls.set("contrySiteList", nl.drew.cp.state.listContrySite, false);
                                                      nl.drew.cp.core.proxy.getNowProxy(null, purl, true, true);
                                                      nl.drew.cp.core.filter.inst();
                                                      var nosend = false;
                                                      if (typeof msg.val.nosend != "undefined") {
                                                        nosend = msg.val.nosend;
                                                      }
                                                      if (!nosend) {
                                                        nl.drew.cp.core.api.sendtoPortInProxyList(msg.val);
                                                        if (typeof msg.val.list != "undefined" && msg.val.list) {
                                                          nl.drew.cp.core.api.sendtoPortContrys(msg.val);
                                                        }
                                                        nl.drew.cp.core.api.sendtoPortAnonymitynow(msg.val);
                                                      }
                                                      nl.drew.cp.core.api.sendList(msg.val.listRequest, msg.val.host);
                                                    });
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
                      }
                    }
                  }
                }
              }
            } else {
              if (msg.msg == "get") {
                if (msg.param == "https") {
                  port.postMessage({param:"https", val:nl.drew.cp.state.https});
                } else {
                  if (msg.param == "globalalwproxy") {
                    port.postMessage({param:"globalalwproxy", val:nl.drew.cp.state.alwProxy});
                  } else {
                    if (msg.param == "isenabled") {
                      port.postMessage({param:"isenabled", val:nl.drew.cp.state.isenabled});
                    } else {
                      if (msg.param == "state") {
                        port.postMessage({param:"state", val:nl.drew.cp.state.state});
                      } else {
                        if (msg.param == "uproxy") {
                          port.postMessage({param:"uproxy", val:{uproxy:nl.drew.cp.state.uproxys, template:nl.drew.cp.config.proxyTemplate}});
                        } else {
                          if (msg.param == "mainproxy") {
                            nl.drew.cp.core.api.sendtoPortMainproxy();
                          } else {
                            if (msg.param == "contrys") {
                              nl.drew.cp.core.api.sendtoPortContrys(msg.val);
                            } else {
                              if (msg.param == "anonymity") {
                                nl.drew.cp.core.api.sendtoPortAnonymity(msg.val);
                              } else {
                                if (msg.param == "anonymitynow") {
                                  nl.drew.cp.core.api.sendtoPortAnonymitynow(msg.val);
                                } else {
                                  if (msg.param == "tor") {
                                    nl.drew.cp.core.api.sendtoPortTor(msg.val);
                                  } else {
                                    if (msg.param == "nonproxyalwproxy") {
                                      nl.drew.cp.core.api.sendtoPortInProxyList(msg.val);
                                    } else {
                                      if (msg.param == "lists") {
                                        nl.drew.cp.core.api.sendList(true);
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
          }
        }
      }
    }
  };
  api.sendList = function(isSend, host) {
    if (!isSend) {
      return;
    }
    nl.drew.cp.core.api.postMessage({param:"lists", val:nl.drew.cp.core.lib.globalListGen(), host:host});
  };
  api.sendtoPortInProxyList = function(val) {
    if (nl.drew.cp.core.api.port) {
      chrome.tabs.getSelected(null, function(tab) {
        var purl = nl.drew.cp.lib.parseUrl(tab.url);
        purl.host = nl.drew.cp.core.api.preSendtoPort(val, purl);
        nl.drew.cp.core.api.postMessage({param:"nonproxyalwproxy", val:{host:purl.host, nonproxy:nl.drew.cp.core.lib.inNonProxySiteList(purl.host), alwproxy:nl.drew.cp.core.lib.inAlwProxySiteList(purl.host)}});
      });
    }
  };
  api.sendtoPortAnonymitynow = function(val) {
    if (nl.drew.cp.core.api.port) {
      chrome.tabs.getSelected(null, function(tab) {
        var purl = nl.drew.cp.lib.parseUrl(tab.url);
        purl.host = nl.drew.cp.core.api.preSendtoPort(val, purl);
        var nowProxy = nl.drew.cp.core.proxy.getNowProxy(null, purl, true, true);
        if (nowProxy && nowProxy.co.length > 2) {
          nl.drew.cp.core.api.postMessage({param:"anonymitynow", val:[false, false]});
        } else {
          nl.drew.cp.core.api.postMessage({param:"anonymitynow", val:[nl.drew.cp.core.header.getAnonymityNow(purl.host), nl.drew.cp.core.header.getTorNow(purl.host)]});
        }
        nl.drew.cp.core.interf.icoupdate7(tab.url);
      });
    }
  };
  api.sendtoPortAnonymity = function(val) {
    if (nl.drew.cp.core.api.port) {
      chrome.tabs.getSelected(null, function(tab) {
        var purl = nl.drew.cp.lib.parseUrl(tab.url);
        purl.host = nl.drew.cp.core.api.preSendtoPort(val, purl);
        nl.drew.cp.core.api.postMessage({param:"anonymity", val:nl.drew.cp.core.header.getAnonymity(purl.host)});
      });
    }
  };
  api.sendtoPortTor = function(val) {
    if (nl.drew.cp.core.api.port) {
      chrome.tabs.getSelected(null, function(tab) {
        var purl = nl.drew.cp.lib.parseUrl(tab.url);
        purl.host = nl.drew.cp.core.api.preSendtoPort(val, purl);
        nl.drew.cp.core.api.postMessage({param:"tor", val:nl.drew.cp.core.header.getTor(purl.host)});
      });
    }
  };
  api.sendtoPortState = function() {
    nl.drew.cp.core.api.postMessage({param:"state", val:nl.drew.cp.state.state});
  };
  api.sendtoPortMainproxy = function(nowProxys) {
    if (nl.drew.cp.core.api.port) {
      chrome.tabs.getSelected(null, function(tab) {
        if (nl.drew.cp.state.started) {
          var purl = nl.drew.cp.lib.parseUrl(tab.url);
          var nowProxy = {};
          if (nl.drew.cp.state.alwProxy) {
            nowProxy = {name:"&nbsp; proxy server", co:"public", allow:true};
          } else {
            nowProxy = nl.drew.cp.core.proxy.getNowProxy(nowProxys, purl, true, true);
          }
          if (purl.allow && nowProxy == null) {
            nowProxy = {host:purl.host};
          }
          nl.drew.cp.core.interf.icoupdate7(tab.url);
          nl.drew.cp.core.api.sendtoPort({param:"mainproxy", val:nowProxy});
        } else {
          nl.drew.cp.core.api.postMessage({param:"mainproxy", val:false});
        }
      });
    }
  };
  api.sendtoPortContrys = function(val) {
    if (nl.drew.cp.core.api.port) {
      chrome.tabs.getSelected(null, function(tab) {
        var purl = nl.drew.cp.lib.parseUrl(tab.url);
        purl.host = nl.drew.cp.core.api.preSendtoPort(val, purl);
        nl.drew.cp.core.api.postMessage({param:"contrys", val:{contrys:nl.drew.cp.state.contrys, uproxys:nl.drew.cp.state.uproxys, contrymain:nl.drew.cp.state.contryMain, contrysite:nl.drew.cp.core.lib.inContrySiteList(purl.host), host:purl.host}});
      });
    }
  };
  api.preSendtoPort = function(val, purl) {
    if ((!val || typeof val.list == "undefined" || !val.list) && !purl.allow) {
      return "";
    } else {
      if (val && typeof val.list != "undefined" && val.list) {
        return val.host;
      } else {
        if (!val || typeof val.host == "undefined" || !val.host) {
          return purl.host;
        } else {
          if (val.host != purl.host) {
            return "";
          }
        }
      }
    }
    return purl.host;
  };
  api.sendtoPort = function(msg) {
    nl.drew.cp.core.api.postMessage(msg);
  };
  api.postMessage = function(msg) {
    if (nl.drew.cp.core.api.port) {
      try {
        nl.drew.cp.core.api.port.postMessage(msg);
      } catch (err) {
      }
    }
  };
  return api;
}();

