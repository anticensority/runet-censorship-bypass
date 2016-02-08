'use strict';

// Shows user PageAction icon if any part of the current site is being blocked and proxied.

function getHostname(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.hostname;
}

function blockInform(details) {
  if (details.tabId !== -1 && window.antiCensorRu.pacProvider && window.antiCensorRu.pacProvider.proxyIps && window.antiCensorRu.pacProvider.proxyIps[ details.ip ]) {

    console.log(details.url, details.type, details);
	var ifMainFrame = details.type === 'main_frame';
	var doesSetIconEraseTitlePromise = new Promise(
	  (resolve, reject) => {
		if (false && ifMainFrame)
          chrome.pageAction.setIcon({
              path: '/icons/ribbon32.png',
              tabId: details.tabId
            },
			() => {
			  chrome.pageAction.show(details.tabId);
			  resolve();
			}
		  );
		else resolve();
	  }
	);
	doesSetIconEraseTitlePromise
	.then(
      res => chrome.pageAction.getTitle(
		  { tabId: details.tabId },
		  title => {
			
			var ifTitleSetAlready = /\n/.test(title); // Initially title equals extension name.
			var proxyHost = window.antiCensorRu.pacProvider.proxyIps[ details.ip ];
			var hostname = getHostname(details.url).trim();
			var ifShouldUpdateTitle = !ifTitleSetAlready;
			var indent = '  ';

			if (!ifTitleSetAlready) {
			  console.log('Main frame?', ifMainFrame);
			  console.log(ifTitleSetAlready, title);
			  console.log('Setting for', details.url, details.type);
			  if (false && !ifMainFrame)
			    chrome.pageAction.setIcon({
				  path:  '/icons/ribbon-partly32.png',
				  tabId: details.tabId
			    });
			  title = 'Разблокированы:\n'+ indent + hostname +'\nПрокси:\n'+ indent + proxyHost;
			} else {
			  title = title.replace(/Прокси:([\s\S]+)/, '{0}\n$&');
			  var proxies = RegExp.$1;
			  if (proxies.indexOf(proxyHost) == -1) {
				title = title.replace(/Прокси:[\s\S]+/, '$&\n'+ indent + proxyHost);
				ifShouldUpdateTitle = true;
			  }

			  var ifHostListedAlready = title.split(/\r?\n/g).some(
				line => line.trim() === hostname
			  );
			  if (!ifHostListedAlready) {
				title = title.replace('{0}', indent + hostname);
				ifShouldUpdateTitle = true;
			  } else if (ifShouldUpdateTitle)
				title = title.replace('\n{0}', '');
			}

			if (ifShouldUpdateTitle) {
			  chrome.pageAction.setTitle({
				title: title,
				tabId: details.tabId
			  });
			  
			}
		  }
      )
	);

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
