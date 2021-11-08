'use strict';

{

  const timeouted = window.utils.timeouted;

  const isProxied = (requestDetails) => false;
  const isProxySideError = (details) =>
    /* About !main_frame: Main frame websocket errors are followed by webnavigation errors
       which chrome-internals code resets the state of the popup.
    */
    details.error === 'net::ERR_TUNNEL_CONNECTION_FAILED' && details.type !== 'main_frame' && isProxied(details) ||
    details.error === 'NS_ERROR_CONNECTION_REFUSED' && Boolean(details.proxyInfo);

  const urlToA = (url) => new URL(url).host.link(
    encodeURIComponent(url),
  );

  const isProxyErrorHandledAsync = async (details) => {

    if (!isProxySideError(details)) {
      return;
    }
    let fromPageHref = '';
    let toUrlHref = '';
    let fromPageHtml = '';
    let youMayReportHtml = '';
    const initiator = details.initiator !== 'null' && details.initiator;
    try {
      if (initiator) {
        fromPageHref = new URL(initiator).href; // Sanitize: only urls, not other stuff.
        fromPageHtml = ` со страницы ${urlToA(fromPageHref)}`;
      }
      toUrlHref = new URL(details.url).href;
      youMayReportHtml = ` Вы можете <b>${'сообщить об ошибке'.link(
        encodeURIComponent(
          '/pages/report-proxy-error/index.html?' +
          new URLSearchParams({
            fromPageHref,
            requestFailedTo: toUrlHref,
          }),
        ),
      )}</b> администратору прокси.`;
    } catch(e) {
      /* For malformed urls. */
      console.log('Error handling malformed URLs:', details);
      const msg = `Error handling malformed URLs: ${JSON.stringify(details, null, 2)}`;
      throw new TypeError(msg);
    }

    // Service workers have tabId = -1, get active tubId for them.
    const tabId = details.tabId < 0
      ? await new Promise((resolve) => chrome.tabs.query(
          { active: true },
          ([tab]) => resolve(tab.id)),
        )
      : details.tabId;

    const [oldPopup, oldText, oldColor] = await new Promise((resolve) =>
      chrome.browserAction.getPopup({ tabId }, (oldPopup) =>
        chrome.browserAction.getBadgeText({ tabId }, (oldText) =>
          chrome.browserAction.getBadgeBackgroundColor({ tabId }, (oldColor) => resolve([
            oldPopup,
            oldText,
            oldColor,
          ])),
        ),
      )
    );

    const popupPrefix = chrome.runtime.getURL(`/pages/options/index.html?status=<span style="color: red">🔥 Прокси-сервер отказался обслуживать запрос к%20`);
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

    const restoringHandler = timeouted((eventDetails) => {

      if(eventDetails && tabId !== ((eventDetails.currentTab || eventDetails).id || eventDetails.tabId)) {
        return;
      }
      clearInterval(timer);

      chrome.browserAction.setPopup({ tabId, popup: oldPopup});
      chrome.browserAction.setBadgeBackgroundColor({ tabId, color: oldColor});
      chrome.browserAction.setBadgeText({ tabId, text: oldText});

      chrome.runtime.onMessage.removeListener(restoringHandler);
      chrome.tabs.onRemoved.removeListener(restoringHandler);
      chrome.tabs.onReplaced.removeListener(restoringHandler);
      chrome.webNavigation.onBeforeNavigate.removeListener(restoringHandler);
    });
    chrome.runtime.onMessage.addListener(restoringHandler);
    chrome.tabs.onRemoved.addListener(restoringHandler);
    chrome.tabs.onReplaced.addListener(restoringHandler); // When does it happen?
    chrome.webNavigation.onBeforeNavigate.addListener(restoringHandler);

    return true;
  };

  chrome.webNavigation.onErrorOccurred.addListener(timeouted(async (details) => {

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

  }));

  chrome.webRequest.onErrorOccurred.addListener(
    timeouted(isProxyErrorHandledAsync),
    {urls: ['<all_urls>']},
  );
}
