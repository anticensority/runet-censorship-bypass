'use strict';

var config = {
  mode: "pac_script",
  pacScript: {
    url: "http://antizapret.prostovpn.org/proxy.pac"
  }
};

chrome.proxy.settings.set(
  {value: config, scope: 'regular'},
  function() {}
);

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create( {url: "http://antizapret.prostovpn.org"} )
});
