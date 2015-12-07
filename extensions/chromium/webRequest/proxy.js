'use strict';

var PROXY_IP = '195.154.110.37';

chrome.storage.onChanged.addListener(
	(changes, areaName) => {
		if (changes['antizapret']) {
			var value = changes['antizapret'].newValue || changes['antizapret'].oldValue; // Same oldValue written?
			var antizapret = JSON.parse(value);
			PROXY_IP = antizapret.proxyIp;
		}
	}
);

function blockageInform(details) {
	console.log(details.tabId, details.ip, PROXY_IP);
	if (details.tabId !== -1 && details.ip === PROXY_IP) {
		chrome.browserAction.setIcon({
			path: '/assets/icons/rkn-warn.png',
			tabId: details.tabId
		});
		chrome.browserAction.setTitle({
			title: 'Сайт блокирован!',
			tabId: details.tabId
		});
	}
}

chrome.webRequest.onCompleted.addListener(
	blockageInform,
	{ urls: ['<all_urls>'] }
);

chrome.webRequest.onErrorOccurred.addListener(
	blockageInform,
	{ urls: ['<all_urls>'] }
);

installRkn();

/*

chrome.runtime.onInstalled.addListener( details => {
  switch(details.reason) {
    case 'install':
    case 'update':
      installRkn();
  }
});
*/
