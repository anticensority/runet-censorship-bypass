'use strict';

/* `setTimeout` changes context of execution from other window
    (e.g. popup) to background window, so we may catch errors
    in bg error handlers.
    More: https://bugs.chromium.org/p/chromium/issues/detail?id=357568
*/
// Fix error context of methods of all APIs.
for(const api of Object.keys(window.apis)) {
  for(const prop of Object.keys(api)) {
    if ( typeof(api[prop]) !== 'function' ) {
      continue;
    }
    const method = api[prop];
    api[prop] = function(...args) {

      setTimeout(method.bind(this, ...args), 0);

    };
  }
}


