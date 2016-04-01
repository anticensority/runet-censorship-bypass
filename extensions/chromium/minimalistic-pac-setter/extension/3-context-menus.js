'use strict';

+function() {

  var createMenuLinkEntry = (title, tab2url) => chrome.contextMenus.create({
    title: title,
    contexts: ['browser_action'],
    onclick: (menuInfo, tab) => Promise.resolve( tab2url( tab ) ).then( url => chrome.tabs.create({url: url}) )
  });

  createMenuLinkEntry( 'Сайт доступен из-за границы? Is up?', tab => 'http://isup.me/'+ getHostname(tab.url) );

  window.reestrUrl = 'http://reestr.rublacklist.net/search/?q=';

  createMenuLinkEntry( 'Сайт в реестре блокировок?', tab => {
		const ifIp = confirm('Да = искать по IP.\nНет = искать по домену.');
		const hostname = getHostname( tab.url );
		if (ifIp) {
			var ip = window.tabWithError2ip[tab.id];
			if ( /^[.\d]+$/.test(hostname) || /^[:\dA-Fa-f]+$/.test(hostname) )
				ip = hostname;
			return ip
				? reestrUrl + ip
				: chrome.extension.getURL('./pages/is-ip-blocked/index.html') +'?'+ hostname
		}
		return reestrUrl + hostname
	});

  createMenuLinkEntry( 'Из кэша Google', tab => 'https://webcache.googleusercontent.com/search?q=cache:'+ tab.url );

  createMenuLinkEntry( 'Из архива archive.org', tab => 'https://web-beta.archive.org/web/submit?url='+ tab.url );

	createMenuLinkEntry( 'Свежий снимок страницы', tab => `
		data:text/html;charset=utf8,<title>Чиииз...</title>
			<form method="POST" action="https://screenshotmachine.com/processor.php">
				<input name="urlparam" value="${tab.url}" type="hidden">
				<input name="size" value="F" type="hidden">
				<input name="cacheLimit" value="0" type="hidden">
			</form>
			<script>document.forms[0].submit()</script>`
	);

  createMenuLinkEntry( 'Разблокировать страницу по-другому', tab => chrome.extension.getURL('./pages/other-unblocks/index.html') +'?'+ tab.url );

}();
