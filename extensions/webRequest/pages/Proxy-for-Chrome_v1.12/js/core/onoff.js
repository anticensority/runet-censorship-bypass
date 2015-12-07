nl.drew.cp.core.onoff = function() {
  var onoff = {};
  onoff.on = function() {
    nl.drew.cp.state.isenabled = true;
    nl.drew.cp.ls.set("isenabled", true, false);
    console.log("onoff.on");
    nl.drew.cp.core.interf.icoupdate();
    nl.drew.cp.core.proxy.loadLocalProxy();
  };
  onoff.off = function() {
    nl.drew.cp.state.isenabled = false;
    nl.drew.cp.ls.set("isenabled", false, false);
    console.log("onoff.off");
    nl.drew.cp.core.interf.icoupdate();
  };
  return onoff;
}();

