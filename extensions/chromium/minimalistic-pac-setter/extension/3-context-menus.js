'use strict';

+function() {

  var createMenuLinkEntry = (title, tab2url) => chrome.contextMenus.create({
    title: title,
    contexts: ['browser_action'],
    onclick: (menuInfo, tab) => Promise.resolve( tab2url( tab ) ).then( url => chrome.tabs.create({url: url}) )
  });

  createMenuLinkEntry( 'Сайт доступен из-за границы? ISUP.ME', tab => 'http://isup.me/'+ getHostname(tab.url) );
  
  createMenuLinkEntry( 'Сайт доступен из-за границы?', tab =>
    `data:text/html;charset=utf8,<title>Запрашиваю...</title>
    <form method="POST" action="https://www.host-tracker.com/ru/InstantCheck/Create">
      <input name="InstantCheckUrl" value="${getHostname(tab.url)}" type="hidden">
    </form>
    <script>document.forms[0].submit()</script>`
  );

  window.reestrUrl = 'http://reestr.rublacklist.net/search/?q=';

  createMenuLinkEntry('IP этого сайта в реестре блокировок?', tab => {
    var hostname = getHostname( tab.url );
    var ip = window.tabWithError2ip[tab.id];
    if ( /^[.\d]+$/.test(hostname) || /^[:\dA-Fa-f]+$/.test(hostname) )
      ip = hostname;
    return ip
      ? reestrUrl + ip
      : chrome.extension.getURL('./pages/is-ip-blocked/index.html') +'?'+ hostname
  });

  createMenuLinkEntry( 'Домен этого сайта в реестре блокировок?', tab => reestrUrl + getHostname(tab.url) );
  createMenuLinkEntry( 'Поиск этой страницы в архиве archive.org', tab => 'http://web.archive.org/web/*/'+ tab.url );
  createMenuLinkEntry( 'Разблокировать страницу по-другому', tab => chrome.extension.getURL('./pages/other-unblocks/index.html') +'?'+ tab.url );

}();