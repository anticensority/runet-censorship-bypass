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
window.onTabUpdated = {};

chrome.tabs.onRemoved.addListener( tabId => delete window.onTabUpdated[tabId] );

function afterTabUpdated(tabId, cb) {
  if (window.onTabUpdated[tabId])
    window.onTabUpdated[tabId].push(cb);
  else window.onTabUpdated[tabId] = [cb];
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (window.onTabUpdated[tabId]) {
    window.onTabUpdated[tabId].map( f => f() );
    delete window.onTabUpdated[tabId];
  }
});

var previousUpdateTitleFinished = Promise.resolve();

function blockInform(requestDetails) {
  if (requestDetails.tabId !== -1 && window.antiCensorRu.pacProvider && window.antiCensorRu.pacProvider.proxyIps && window.antiCensorRu.pacProvider.proxyIps[ requestDetails.ip ]) {

    previousUpdateTitleFinished = previousUpdateTitleFinished.then(
      () => new Promise(
        resolve => {
          var cb = () => updateTitle( requestDetails, resolve );
          return requestDetails.type === 'main_frame' ? afterTabUpdated(requestDetails.tabId, cb) : cb();
        }
      )
    );

    function updateTitle(requestDetails, cb) {

      chrome.browserAction.getTitle(
        { tabId: requestDetails.tabId },
        title => {
          var ifTitleSetAlready = /\n/.test(title);
          var proxyHost = window.antiCensorRu.pacProvider.proxyIps[ requestDetails.ip ];
          
          var a = document.createElement('a');
          a.href = requestDetails.url;
          var hostname = a.hostname;

          var ifShouldUpdateTitle = false;
          var indent = '  ';
          var proxyTitle = 'Прокси:';
          
          if (!ifTitleSetAlready) {
            title = 'Разблокированы:\n'+ indent + hostname +'\n'+ proxyTitle +'\n'+ indent + proxyHost;
            ifShouldUpdateTitle = true;

            chrome.browserAction.setBadgeText({
              tabId: requestDetails.tabId,
              text: requestDetails.type === 'main_frame' ? '1' : '%1'
            });

          } else {
            var hostsProxiesPair = title.split(proxyTitle);

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
}

chrome.webRequest.onResponseStarted.addListener(
  blockInform,
  { urls: ['<all_urls>'] }
);

chrome.webRequest.onErrorOccurred.addListener(
  blockInform,
  { urls: ['<all_urls>'] }
);