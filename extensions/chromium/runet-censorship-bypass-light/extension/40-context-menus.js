'use strict';

{

  let seqId = 0;

  const createMenuLinkEntry = (title, tab2url) => {

    const id = (++seqId).toString();

    chrome.runtime.onInstalled.addListener(
      () => chrome.contextMenus.create({
        id: id,
        title: title,
        contexts: ['browser_action']
      }, timeouted(() => {

        const err = chrome.runtime.lastError;
        if(err) {
          console.warn('CTX MENU ERR', err);
          throw err;
        }

      }))
    );

    chrome.contextMenus.onClicked.addListener((info, tab) => {

      if(info.menuItemId === id) {
        Promise.resolve( tab2url( tab ) )
          .then( (url) => chrome.tabs.create({url: url}) );
      }

    });

  };

  createMenuLinkEntry(
    'Сайт доступен из-за границы? Is up?',
    (tab) => `data:text/html;charset=utf8,<title>Запрашиваю...</title>
            <form class='tracker-form' method='POST'
              action='https://www.host-tracker.com/ru/InstantCheck/Create'>
            <input name='InstantCheckUrl' value='${new URL(tab.url).hostname}'
              type='hidden'>
            </form>
            <script>document.querySelector('.tracker-form').submit()<\/script>`
  );

  createMenuLinkEntry(
    'Сайт в реестре блокировок?',
    (tab) => 'https://antizapret.info/index.php?search=' + new URL(tab.url).hostname
  );

  createMenuLinkEntry(
    'Из архива archive.org',
    (tab) => 'https://web.archive.org/web/*/' + tab.url
  );

  createMenuLinkEntry(
    'Через Google Translate',
    (tab) => 'https://translate.google.com/translate?hl=&sl=en&tl=ru&anno=2&sandbox=1&u=' + tab.url
  );

  createMenuLinkEntry(
    'Другие варианты разблокировки',
    (tab) => 'https://rebrand.ly/ac-unblock#' + tab.url
  );

  createMenuLinkEntry(
    'У меня проблемы с расширением!',
    (tab) => 'https://rebrand.ly/ac-support'
  );

}
