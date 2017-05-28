'use strict';

{

  const lastErrors = [];
  const lastErrorsLength = 20;

  const that = window.apis.lastErrors = {
    ifCollecting: false,
    get: () => lastErrors,
  }

  chrome.webRequest.onErrorOccurred.addListener((details) => {

      if (!that.ifCollecting || [
              'net::ERR_BLOCKED_BY_CLIENT',
              'net::ERR_ABORTED',
          ].includes(details.error) ) {
        return;
      }
      const last = lastErrors[0];
      if (last && details.error === last.error && details.url === last.url) {
        // Dup.
        return;
      }

      lastErrors.unshift(details);
      if (lastErrors.length > lastErrorsLenght) {
        lastErrors.pop();
      }

    },
    {urls: ['<all_urls>']}
  );

}
