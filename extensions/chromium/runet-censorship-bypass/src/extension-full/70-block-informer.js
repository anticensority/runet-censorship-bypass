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

  const privates = {};

  privates.tabCallbacks = {};

  const afterTabUpdated = function afterTabUpdated(tabId, cb) {

    if (privates.tabCallbacks[tabId]) {
      privates.tabCallbacks[tabId].push(cb);
    } else {
      privates.tabCallbacks[tabId] = [cb];
    }

  };

  const onTabUpdate = function onTabUpdate(tabId) {

    if (privates.tabCallbacks[tabId]) {
      privates.tabCallbacks[tabId].map((f) => f());
      delete privates.tabCallbacks[tabId];
    }

  };

  chrome.tabs.onUpdated.addListener(onTabUpdate);

  const updateTitle = function updateTitle(requestDetails, proxyHost, cb) {

    chrome.browserAction.getTitle(
      { tabId: requestDetails.tabId },
      (title) => {

        const ifTitleSetAlready = /\n/.test(title);

        const hostname = new URL(requestDetails.url).hostname;

        let ifShouldUpdateTitle = false;
        const indent = '  ';
        const proxyTitle = 'Прокси:';

        let theLatestCb = cb;
        let newTitle = title;

        if (!ifTitleSetAlready) {

          newTitle = `Разблокированы:\n${indent}${hostname}\n${proxyTitle}\n`
            + `${indent}${proxyHost}`;
          ifShouldUpdateTitle = true;

          chrome.browserAction.setBadgeText({
            tabId: requestDetails.tabId,
            text: requestDetails.type === 'main_frame' ? '1' : '%1',
          });

        } else {

          const hostsProxiesPair = newTitle.split(proxyTitle);

          if (hostsProxiesPair[1].indexOf(proxyHost) === -1) {
            newTitle = newTitle.replace(
              hostsProxiesPair[1],
              `${hostsProxiesPair[1]}\n${indent}${proxyHost}`
            );
            ifShouldUpdateTitle = true;
          }

          if (hostsProxiesPair[0].indexOf(hostname) === -1) {

            newTitle = newTitle.replace(
              proxyTitle,
              `${indent}${hostname}\n${proxyTitle}`
            );
            ifShouldUpdateTitle = true;

            theLatestCb = () => chrome.browserAction.getBadgeText(
              { tabId: requestDetails.tabId },
              (result) => {

                const charPrefix = isNaN(result.charAt(0)) ? result.charAt(0) : '';
                chrome.browserAction.setBadgeText(
                  {
                    tabId: requestDetails.tabId,
                    text: charPrefix + (hostsProxiesPair[0].split('\n').length - 1),
                  }
                );
                return cb();

              }
            );

          }

        }

        if (ifShouldUpdateTitle) {
          chrome.browserAction.setTitle({
            title: newTitle,
            tabId: requestDetails.tabId,
          });
        }

        return theLatestCb();

      }
    );

  };

  let previousUpdateTitleFinished = Promise.resolve();

  const tryProxyAndInform = function tryProxyAndInform(requestDetails) {

    const host = window.apis.ipToHost.get(requestDetails.ip);
    if (!host) {
      return;
    }

    const ifMainFrame = requestDetails.type === 'main_frame';

    previousUpdateTitleFinished = previousUpdateTitleFinished.then(
      () => new Promise(
        (resolve) => {
          const cb = () => updateTitle(requestDetails, host, resolve);
          return ifMainFrame
            ? afterTabUpdated(requestDetails.tabId, cb) : cb();
        }
      )
    );

  };

  const onRequest = function onRequest(requestDetails) {

    const ifInsideTabWithIp = requestDetails.tabId !== -1 && requestDetails.ip;
    if (ifInsideTabWithIp) {
      tryProxyAndInform(requestDetails);
    }

  };

  ['onResponseStarted', 'onErrorOccurred'].forEach((eventName) =>
    chrome.webRequest[eventName].addListener(
      onRequest,
      { urls: ['<all_urls>'] }
    )
  );

}
