'use strict';

// Shows user browserAction icon if any part of the current site is being blocked and proxied.

/*
  In what moment the title of the previous icon is cleared?
  By my observations it usually takes place near tabs.onUpdate of tab status to "loading".
  So if you set a title earlier it may be cleared by browser.
  It pertains not only to page refesh but to newly opened pages too.
  Also on loosing title see:
    https://github.com/ilyaigpetrov/repository-for-chrome-bugs/blob/master/browserAction-title-lost-after-setting/background.js
  Crazy parallel Chrome.
**/

window.chrome.browserAction.setBadgeBackgroundColor({
  color: '#db4b2f'
});

window.tabWithError2ip = {}; // For errors only: Error? -> Check this IP!

+function() {

  var _tabCallbacks = {};

  function afterTabUpdated(tabId, cb) {
    if (_tabCallbacks[tabId])
      _tabCallbacks[tabId].push(cb);
    else _tabCallbacks[tabId] = [cb];
  }

  function onTabUpdate(tabId) {
    if (_tabCallbacks[tabId]) {
      _tabCallbacks[tabId].map( f => f() );
      delete _tabCallbacks[tabId];
    }
  }

  chrome.tabs.onUpdated.addListener( onTabUpdate );

  function isInsideTabWithIp(requestDetails) {
    return requestDetails.tabId !== -1 && requestDetails.ip
  }

  chrome.webRequest.onErrorOccurred.addListener(
    requestDetails =>
      isInsideTabWithIp(requestDetails) &&
      (
        isProxiedAndInformed(requestDetails) || requestDetails.type === 'main_frame' && ( window.tabWithError2ip[requestDetails.tabId] = requestDetails.ip )
      ),
    { urls: ['<all_urls>'] }
  );

  chrome.tabs.onRemoved.addListener( tabId => { onTabUpdate(tabId); delete window.tabWithError2ip[tabId] } );

  var previousUpdateTitleFinished = Promise.resolve();

  function isProxiedAndInformed(requestDetails) {

    if (
      !( window.antiCensorRu.pacProvider && window.antiCensorRu.pacProvider.proxyIps && window.antiCensorRu.pacProvider.proxyIps[ requestDetails.ip ] )
    ) {
      return false;
    }

    var ifMainFrame = requestDetails.type === 'main_frame';

    previousUpdateTitleFinished = previousUpdateTitleFinished.then(
      () => new Promise(
        resolve => {
          var cb = () => updateTitle( requestDetails, resolve );
          return ifMainFrame ? afterTabUpdated(requestDetails.tabId, cb) : cb();
        }
      )
    );

    return true;

    function updateTitle(requestDetails, cb) {

      chrome.browserAction.getTitle(
        { tabId: requestDetails.tabId },
        title => {
          var ifTitleSetAlready = /\n/.test(title);
          var proxyHost = window.antiCensorRu.pacProvider.proxyIps[ requestDetails.ip ];

          var hostname = new URL( requestDetails.url ).hostname;

          var ifShouldUpdateTitle = false;
          var indent = '  ';
          var proxyTitle = 'Прокси:';

          if (!ifTitleSetAlready) {
            title = 'Разблокированы:\n'+ indent + hostname +'\n'+ proxyTitle +'\n'+ indent + proxyHost;
            ifShouldUpdateTitle = true;

            chrome.browserAction.setBadgeText({
              tabId: requestDetails.tabId,
              text: ifMainFrame ? '1' : '%1'
            });

          } else {
            const hostsProxiesPair = title.split(proxyTitle);

            if (hostsProxiesPair[1].indexOf(proxyHost) === -1) {
              title = title.replace(hostsProxiesPair[1], hostsProxiesPair[1] +'\n'+ indent + proxyHost);
              ifShouldUpdateTitle = true;
            }

            if (hostsProxiesPair[0].indexOf(hostname) === -1) {
              title = title.replace(proxyTitle, indent + hostname +'\n'+ proxyTitle);
              ifShouldUpdateTitle = true;

              var _cb = cb;
              cb = () => chrome.browserAction.getBadgeText(
                {tabId: requestDetails.tabId},
                result => {
                  chrome.browserAction.setBadgeText(
                    {
                      tabId: requestDetails.tabId,
                      text: ( isNaN( result.charAt(0) ) && result.charAt(0) || '' ) + (hostsProxiesPair[0].split('\n').length - 1)
                    }
                  );
                  return _cb();
                }
              );

            }
          }

          if (ifShouldUpdateTitle)
            chrome.browserAction.setTitle({
              title: title,
              tabId: requestDetails.tabId
            });

          return cb();
        }
      );
    }
  }

  chrome.webRequest.onResponseStarted.addListener(
    requestDetails => isInsideTabWithIp(requestDetails) && isProxiedAndInformed(requestDetails),
    { urls: ['<all_urls>'] }
  );

}();
