'use strict';

{
  const chromified = window.utils.chromified;

  const lastErrors = [];
  const lastErrorsLength = 20;

  const IF_COLL_KEY = 'err-to-exc-if-coll';

  const privates = {
    ifCollecting: window.localStorage[IF_COLL_KEY] || false,
  };

  const that = window.apis.lastNetErrors = {
    get ifCollecting() {

      return privates.ifCollecting;

    },

    set ifCollecting(newValue) {

      privates.ifCollecting = window.localStorage[IF_COLL_KEY] = newValue;

    },
    get: () => lastErrors,
  }

  chrome.webRequest.onErrorOccurred.addListener(chromified((err/*Ignored*/, details) => {

      if (!that.ifCollecting || [
              'net::ERR_BLOCKED_BY_CLIENT',
              'net::ERR_ABORTED',
              'net::ERR_CACHE_MISS',
              'net::ERR_INSUFFICIENT_RESOURCES',
          ].includes(details.error) ) {
        return;
      }
      const last = lastErrors[0];
      if (last && details.error === last.error && details.url === last.url) {
        // Dup.
        return;
      }

      lastErrors.unshift(details);
      if (lastErrors.length > lastErrorsLength) {
        lastErrors.pop();
      }

    }),
    {urls: ['<all_urls>']}
  );

}
