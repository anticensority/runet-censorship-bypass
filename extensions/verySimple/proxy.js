'use strict';

function blockInform(details) {
	if (details.tabId !== -1 && details.ip === antizapret.proxyIp) {

		chrome.pageAction.setIcon({
			path: '/assets/icons/rkn-disabled.png',
			tabId: details.tabId
		});

		chrome.pageAction.setTitle({
			title: 'Сайт блокирован!',
			tabId: details.tabId
		});

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
