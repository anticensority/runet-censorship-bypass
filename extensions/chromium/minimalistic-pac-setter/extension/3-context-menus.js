'use strict';

{

  const createMenuLinkEntry = (title, tab2url) => chrome.contextMenus.create({
    title: title,
    contexts: ['browser_action'],
    onclick: (menuInfo, tab) => Promise.resolve( tab2url( tab ) ).then( (url) => chrome.tabs.create({url: url}) )
  });

  createMenuLinkEntry( 'Сайт доступен из-за границы? Is up?', (tab) => 'http://isup.me/'+ new URL(tab.url).hostname );

  createMenuLinkEntry( 'Сайт в реестре блокировок?', (tab) => 'https://antizapret.info/index.php?search=' + tab.url );

  createMenuLinkEntry( 'Из архива archive.org', (tab) => 'https://web.archive.org/web/*/' + tab.url );

  createMenuLinkEntry( 'Открыть веб прокси (не наш)', (tab) => 'https://kproxy.com' );

  createMenuLinkEntry( 'Другие варианты разблокировки', (tab) => 'https://rebrand.ly/unblock#' + tab.url );

  createMenuLinkEntry( 'У меня проблемы с расширением!', (tab) => 'https://rebrand.ly/ac-support');

};
