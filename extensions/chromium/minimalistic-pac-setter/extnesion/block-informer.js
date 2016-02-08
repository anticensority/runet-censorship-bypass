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
      path: '/icons/ribbon32.png',
      tabId: details.tabId
    });

    chrome.pageAction.getTitle(
      { tabId: details.tabId },
      title => {
        
        var ifTitleSetAlready = !/\n/.test(title);
        var proxyHost = window.antiCensorRu.pacProvider.proxyIps[ details.ip ];
        var hostname = getHostname(details.url);
        var ifShouldUpdateTitle = false;
        var indent = '  ';

        // Initially title equals extension name.
        if (ifTitleSetAlready) {
          title = 'Разблокированы:\n'+ indent + hostname +'\nПрокси:\n'+ indent + proxyHost;
          ifShouldUpdateTitle = true;
        } else {
          title = title.replace(/Прокси:([\s\S]+)/, '{0}\n$&');
          var proxies = RegExp.$1;
          if (proxies.indexOf(proxyHost) == -1) {
            title = title.replace(/Прокси:[\s\S]+/, '$&\n'+ indent + proxyHost);
            ifShouldUpdateTitle = true;
          }

          var ifHostListedAlready = title.indexOf(hostname) != -1;
          if (!ifHostListedAlready) {
            title = title.replace('{0}', indent + hostname);
            ifShouldUpdateTitle = true;
          } else if (ifShouldUpdateTitle)
            title = title.replace('{0}\n', '');
        }

        if (ifShouldUpdateTitle)
          chrome.pageAction.setTitle({
            title: title,
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
