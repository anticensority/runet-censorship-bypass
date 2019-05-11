'use strict';

// Shows user browserAction icon if any part of the current site is being
// blocked and proxied.

/*
  In what moment the title of the previous icon is cleared?
  By my observations it usually takes place near tabs.onUpdate of tab status
  to "loading".
  So if you set a title earlier it may be cleared by browser.
  It pertains not only to page refesh but to newly opened pages too.
  Crazy parallel Chrome.
**/

{

  const chromified = window.utils.chromified;

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

  const setRedBadge = (opts) => {

    chrome.browserAction.setBadgeBackgroundColor({
      color: '#db4b2f',
    });
    chrome.browserAction.setBadgeText(opts);

  };

  const updateTitle = function updateTitle(requestDetails, proxyHost, cb) {

    chrome.browserAction.getTitle(
      {tabId: requestDetails.tabId},
      chromified((err, title) => {

        if (err) {
          // E.g., no tab with such id happens.
          // Because requestDetails may be stale.
          console.log('Notifier error ignored (this is normal, it happens):', err);
          return cb();
        }
        const ifTitleSetAlready = /\n/.test(title);

        const hostname = new URL( requestDetails.url ).hostname;

        let ifShouldUpdateTitle = false;
        const indent = '  ';
        const proxyTitle = 'Прокси:';

        if (!ifTitleSetAlready) {

          title = 'Разблокированы:\n' + indent + hostname + '\n'
            + proxyTitle + '\n' + indent + proxyHost;
          ifShouldUpdateTitle = true;

          setRedBadge({
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

                setRedBadge({
                  tabId: requestDetails.tabId,
                  text: (isNaN( result.charAt(0)) && result.charAt(0) || '')
                    + (hostsProxiesPair[0].split('\n').length - 1),
                });
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

      })
    );

  };

  let previousUpdateTitleFinished = Promise.resolve();

  const tryProxyAndInform = function tryProxyAndInform(requestDetails) {

    const host = window.apis.ipToHost.get( requestDetails.ip );
    if (!host) {
      return;
    }
    {
      /*
        If we fetch a resource from a proxy address it is almost never proxied and
        shouldn't be shown.
        Think about localhost as a proxy and a user working with a web site on localhost.
      */
      /*
        Host is constructed from hostname and port. Hostname never contains port,
        it is an ip or a domain name. See hostname and host
        in `new URL('https://localhost:8080')`.
      */
      const hostnameFromUrl = new URL(requestDetails.url).hostname;
      const hostnameFromProxy = new URL(`https://${host}`).hostname;
      if (hostnameFromUrl === requestDetails.ip || hostnameFromUrl === hostnameFromProxy) {
        return;
      }
    }

    const ifMainFrame = requestDetails.type === 'main_frame';

    previousUpdateTitleFinished = previousUpdateTitleFinished.then(
      () => new Promise(
        (resolve) => {
          const cb = () => updateTitle( requestDetails, host, resolve );
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

  for(const eventName of ['onResponseStarted', 'onErrorOccurred']) {
    chrome.webRequest[eventName].addListener(
      onRequest,
      {urls: ['<all_urls>']}
    );
  }

}
