'use strict';

// Shows user browserAction icon if any part of the current site is being
// blocked and proxied.

/*
  In what moment the title of the previous icon is cleared?
  By my observations it usually takes place near tabs.onUpdate of tab status
  to "loading".
  So if you set a title earlier it may be cleared by browser.
  It pertains not only to page refesh but to newly opened pages too.
  Also on loosing title see:
    https://github.com/ilyaigpetrov/repository-for-chrome-bugs/blob/master/browserAction-title-lost-after-setting/background.js
  Crazy parallel Chrome.
**/

{

  window.chrome.browserAction.setBadgeBackgroundColor({
    color: '#db4b2f',
  });

  const _tabCallbacks = {};

  const afterTabUpdated = function afterTabUpdated(tabId, cb) {

    if (_tabCallbacks[tabId]) {
      _tabCallbacks[tabId].push(cb);
    } else {
      _tabCallbacks[tabId] = [cb];
    }

  };

  const onTabUpdate = function onTabUpdate(tabId) {

    if (_tabCallbacks[tabId]) {
      _tabCallbacks[tabId].map( (f) => f() );
      delete _tabCallbacks[tabId];
    }

  };

  chrome.tabs.onUpdated.addListener( onTabUpdate );

  const antiCensorRu = window.apis.antiCensorRu;

  const updateTitle = function updateTitle(requestDetails, cb) {

    chrome.browserAction.getTitle(
      {tabId: requestDetails.tabId},
      (title) => {

        const ifTitleSetAlready = /\n/.test(title);
        const proxyHost = antiCensorRu.getPacProvider()
          .proxyIps[requestDetails.ip];

        const hostname = new URL( requestDetails.url ).hostname;

        let ifShouldUpdateTitle = false;
        const indent = '  ';
        const proxyTitle = 'Прокси:';

        if (!ifTitleSetAlready) {

          title = 'Разблокированы:\n' + indent + hostname + '\n'
            + proxyTitle + '\n' + indent + proxyHost;
          ifShouldUpdateTitle = true;

          chrome.browserAction.setBadgeText({
            tabId: requestDetails.tabId,
            text: requestDetails.type === 'main_frame' ? '1' : '%1',
          });

        } else {

          const hostsProxiesPair = title.split(proxyTitle);

          if (hostsProxiesPair[1].indexOf(proxyHost) === -1) {
            title = title.replace(
              hostsProxiesPair[1],
              hostsProxiesPair[1] + '\n' + indent + proxyHost
            );
            ifShouldUpdateTitle = true;
          }

          if (hostsProxiesPair[0].indexOf(hostname) === -1) {

            title = title.replace(
              proxyTitle,
              indent + hostname + '\n' + proxyTitle
            );
            ifShouldUpdateTitle = true;

            const _cb = cb;
            cb = () => chrome.browserAction.getBadgeText(
              {tabId: requestDetails.tabId},
              (result) => {

                chrome.browserAction.setBadgeText(
                  {
                    tabId: requestDetails.tabId,
                    text: (isNaN( result.charAt(0)) && result.charAt(0) || '')
                      + (hostsProxiesPair[0].split('\n').length - 1),
                  }
                );
                return _cb();

              }
            );

          }

        }

        if (ifShouldUpdateTitle) {
          chrome.browserAction.setTitle({
            title: title,
            tabId: requestDetails.tabId,
          });
        }

        return cb();

      }
    );

  };

  let previousUpdateTitleFinished = Promise.resolve();

  const isProxiedAndInformed = function isProxiedAndInformed(requestDetails) {

    if ( !(requestDetails.ip
             && antiCensorRu.isProxied( requestDetails.ip )) ) {
      return false;
    }

    const ifMainFrame = requestDetails.type === 'main_frame';

    previousUpdateTitleFinished = previousUpdateTitleFinished.then(
      () => new Promise(
        (resolve) => {
          const cb = () => updateTitle( requestDetails, resolve );
          return ifMainFrame
            ? afterTabUpdated(requestDetails.tabId, cb) : cb();
        }
      )
    );

    return true;

  };

  const isInsideTabWithIp = function isInsideTabWithIp(requestDetails) {

    return requestDetails.tabId !== -1 && requestDetails.ip;

  };

  chrome.webRequest.onResponseStarted.addListener(
    (requestDetails) => isInsideTabWithIp(requestDetails)
      && isProxiedAndInformed(requestDetails),
      {urls: ['<all_urls>']}
  );

  chrome.webRequest.onErrorOccurred.addListener(
    (requestDetails) =>
      isInsideTabWithIp(requestDetails)
        && isProxiedAndInformed(requestDetails),
    {urls: ['<all_urls>']}
  );

}