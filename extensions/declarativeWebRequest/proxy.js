'use strict';

var clearProxy = () => chrome.proxy.settings.clear( {} );
chrome.webRequest.onCompleted.addListener( clearProxy, { urls: ['<all_urls>'] } );
chrome.webRequest.onErrorOccurred.addListener( clearProxy, { urls: ['<all_urls>'] } );

chrome.storage.local.get(
  null,
  storage => {
    var IF_BLOCKED = eval(JSON.parse(storage['ifBlockedFunAsStr']))
    chrome.webRequest.onBeforeRequest.addListener(
      details => {
        var parser = document.createElement('a');
        parser.href = details.url;
        var host = parser.hostname;

        if (IF_BLOCKED(host)) {

          var config = {
            mode: 'pac_script',
            pacScript: {
            mandatory: true,
            data: 'function FindProxyForURL(url, host) { return dnsDomainIs(host, "'+host+'") ? "HTTPS proxy.antizapret.prostovpn.org:3143; PROXY proxy.antizapret.prostovpn.org:3128; DIRECT" : "DIRECT"; }'
            }
          };

          chrome.proxy.settings.set( {value: config} );

        }
      },
      { urls: ['<all_urls>'] },
      ['blocking']
    );
  };
);

chrome.runtime.onInstalled.addListener( details => {
  switch(details.reason) {
    case 'install':
    case 'update':
      installRkn();
  }
});
