'use strict';

// Shows user PageAction icon if any part of the current site is being blocked and proxied.

function getHostname(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.hostname;
}

function blockInform(details) {
  if (details.tabId !== -1 && window.antiCensorRu.pacProvider && window.antiCensorRu.pacProvider.proxyIps && window.antiCensorRu.pacProvider.proxyIps[ details.ip ]) {

    chrome.pageAction.setIcon({
      path: '/icons/rkn-empty.png',
      tabId: details.tabId
    });

    chrome.pageAction.getTitle(
      { tabId: details.tabId },
      result => {

        if (!/\n/.test(result))
          result = 'Разблокированы:';

        var hostname = getHostname(details.url).trim();

        var ifListed = result.split(/\r?\n/g).some(
          line => line.trim() === hostname
        );

        if (!ifListed)
          chrome.pageAction.setTitle({
            title: result +'\n'+ hostname,
            tabId: details.tabId
          });
      }
    );

    chrome.pageAction.show(details.tabId);

  }
}

chrome.webRequest.onCompleted.addListener(
  blockInform,
  { urls: ['<all_urls>'] }
);

chrome.webRequest.onErrorOccurred.addListener(
  blockInform,
  { urls: ['<all_urls>'] }
);
