'use strict';

{

  const proxySideErrors = [
    'net::ERR_TUNNEL_CONNECTION_FAILED',
  ];

  const urlToA = (url) => new URL(url).host.link(
    encodeURIComponent(url),
  );

  const isProxyErrorHandledAsync = async (details) => {

    if (!proxySideErrors.includes(details.error) || details.type === 'main_frame') {
      // Main frame websocket errors are followed by webnavigation errors
      // which chrome-internals code resets the state of the popup.
      return;
    }
    let fromPageHref = '';
    let fromPageHtml = '';
    let youMayReportHtml = '';
    const initiator = details.initiator !== 'null' && details.initiator;
    try {
      if (initiator) {
        fromPageHref = new URL(initiator).href; // Sanitize: only urls, not other stuff.
        fromPageHtml = ` со страницы ${urlToA(fromPageHref)}`;
      }
      youMayReportHtml = ` Вы можете <b>${'сообщить об ошибке'.link(
        encodeURIComponent(
          '/pages/report-proxy-error/index.html?' +
          new URLSearchParams({
            fromPageHref,
            requestFailedTo: new URL(details.url).href,
          }),
        ),
      )}</b> администратору прокси.`;
    } catch(e) {
      /* For malformed urls. */
      console.log('Error handling malformed URLs:', details);
      const msg = `Error handling malformed URLs: ${JSON.stringify(details, null, 2)}`;
      throw new TypeError(msg);
    }

    const tabId = details.tabId;
    const popupPrefix = chrome.runtime.getURL(`/pages/options/index.html?status=<span style="color: red">🔥 Прокси-сервер отказался обслуживать запрос к `);
    const oldPopup = await new Promise((resolve) => chrome.browserAction.getPopup({ tabId }, resolve));
    if (decodeURIComponent(oldPopup).startsWith(popupPrefix)) {
      return true;
    }
    const popup = `${popupPrefix}${urlToA(details.url)}${fromPageHtml}</span>. Это могло быть намеренно или по ошибке.${youMayReportHtml}#tab=exceptions`;

    chrome.browserAction.setPopup({
      tabId,
      popup,
    });

    chrome.browserAction.setBadgeBackgroundColor({
      tabId,
      color: 'red',
    });
    chrome.browserAction.setBadgeText({
      tabId,
      text: '❗',
    });
    let limit = 5;
    let ifOnTurn = true;
    let ifError = false;
    const flip = () => {

      if (!ifOnTurn && !--limit || ifError) {
        clearInterval(timer);
        return;
      }
      chrome.browserAction.setBadgeText({
        tabId,
        text: ifOnTurn ? '❗' : '',
      }, () => {
        ifError = chrome.runtime.lastError;
      });
      ifOnTurn = !ifOnTurn;
    };
    flip();
    const timer = setInterval(flip, 500);
    return true;
  };

  chrome.webNavigation.onErrorOccurred.addListener(async (details) => {

    const tabId = details.tabId;
    if ( !(details.frameId === 0 && tabId >= 0) ||
          [
            'net::ERR_BLOCKED_BY_CLIENT',
            'net::ERR_ABORTED',
          ].includes(details.error) ) {
      return;
    }
    if (await isProxyErrorHandledAsync(details)) {
      return;
    }

    chrome.browserAction.setPopup({
      tabId,
      popup: './pages/options/index.html?status=Правый клик по иконке — меню инструментов!#tab=exceptions',
    });

    chrome.browserAction.setBadgeBackgroundColor({
      tabId,
      color: '#4285f4',
    });
    chrome.browserAction.setBadgeText({
      tabId,
      text: '●●●',
    });

  });

  chrome.webRequest.onErrorOccurred.addListener(
    isProxyErrorHandledAsync,
    {urls: ['<all_urls>']},
  );

}
