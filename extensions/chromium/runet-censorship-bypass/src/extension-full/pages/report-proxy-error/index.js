'use strict';

chrome.runtime.getBackgroundPage( (bgWindow) =>
  bgWindow.apis.errorHandlers.installListenersOn(
    window, 'PRERR', () => {

      const params = new URLSearchParams(location.search.substr(1));
      const requestFailedTo = params.get('requestFailedTo');
      const fromPageHref = params.get('fromPageHref') || requestFailedTo;

      const acr = bgWindow.apis.antiCensorRu;
      const pacKey = acr.getCurrentPacProviderKey();
      const pacModTime = acr.getLastModifiedForKey(pacKey);

      const errorReport = `
Your proxy blocked the following request:
  * Request was from page: ${fromPageHref}
  * To address: ${requestFailedTo}
  * Used PAC-script: ${pacKey}
  * Its Last-Modified HTTP-header: ${pacModTime}
I think it's a mistake! Could you, please, take action to fix it.
Thank you!

Ваш прокси-сервер заблокировал следующий запрос:
  * Запрос был со страницы: ${fromPageHref}
  * Адрес запроса: ${requestFailedTo}
  * Мой PAC-скрипт: ${pacKey}
  * Его HTTP-заголовок Last-Modified: ${pacModTime}
Я думаю, это произошло по ошибке! Пожалуйста, примите действия для её исправления.
Спасибо!
      `.trim();
      errorInfo.innerText = errorReport;
      document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {

        a.href = `${a.href}?subject=${encodeURIComponent(new URL(requestFailedTo).hostname)} TUNNEL_CONNECTION_FAILED&body=${encodeURIComponent(errorReport)}`;
      });
    },
  ),
);
