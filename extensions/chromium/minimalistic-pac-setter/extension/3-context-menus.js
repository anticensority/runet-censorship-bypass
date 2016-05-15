'use strict';

+function() {

  const createMenuLinkEntry = (title, tab2url) => chrome.contextMenus.create({
    title: title,
    contexts: ['browser_action'],
    onclick: (menuInfo, tab) => Promise.resolve( tab2url( tab ) ).then( url => chrome.tabs.create({url: url}) )
  });

  const removeProtocol = (url) => {

    const link = createLink(url);
    return link.href.replace( link.protocol + '//', '' );
  };

  createMenuLinkEntry( 'Сайт доступен из-за границы? Is up?', (tab) => 'http://isup.me/'+ createLink(tab.url).hostname );

  window.reestrUrl = 'http://reestr.rublacklist.net/search/?q=';

  createMenuLinkEntry( 'Сайт в реестре блокировок?', (tab) => {

    const ifHost = confirm('Да  — искать по домену\nНет — искать по IP (зависит от местоположения)');
    const hostname = createLink( tab.url ).hostname;
    if (ifHost) {
      return reestrUrl + hostname;
    }
    let ip = window.tabWithError2ip[tab.id];
    if ( /^[.\d]+$/.test(hostname) || /^[:\dA-Fa-f]+$/.test(hostname) ) {
      ip = hostname;
    }
    return ip
      ? reestrUrl + ip
      : chrome.extension.getURL('./pages/is-ip-blocked/index.html') +'?'+ hostname
  });

  createMenuLinkEntry( 'Из кэша Google', (tab) => 'https://webcache.googleusercontent.com/search?q=cache:' + removeProtocol(tab.url) );

  createMenuLinkEntry( 'Из архива archive.org', (tab) => 'https://web.archive.org/web/*/' + removeProtocol(tab.url) );

  createMenuLinkEntry( 'Открыть веб прокси (не наш)', (tab) => 'https://kproxy.com' );

  createMenuLinkEntry( 'Другие варианты', (tab) => {

    const ifPage = confirm('Да  — открыть страницу с решениями\nНет — сделать свежий снимок страницы (Screenshot Machine)');
    return ifPage
      ? chrome.extension.getURL('./pages/other-unblocks/index.html') + '?' + removeProtocol(tab.url)
      : `data:text/html;charset=utf8,<title>Screenshot machine</title>
            <form method="POST" action="https://screenshotmachine.com/processor.php">
                <input name="urlparam" value="${ removeProtocol(tab.url) }" type="hidden">
                <input name="size" value="F" type="hidden">
                <input name="cacheLimit" value="0" type="hidden">
            </form>
            <script>document.forms[0].submit()</script>`;
  });

  /*
  createMenuLinkEntry( 'Свежий снимок страницы, Screenshot machine', (tab) => `
    data:text/html;charset=utf8,<title>Screenshot machine</title>
        <form method="POST" action="https://screenshotmachine.com/processor.php">
            <input name="urlparam" value="${ removeProtocol(tab.url) }" type="hidden">
            <input name="size" value="F" type="hidden">
            <input name="cacheLimit" value="0" type="hidden">
        </form>
        <script>document.forms[0].submit()</script>`
  );
  */

}();
