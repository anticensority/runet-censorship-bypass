'use strict';

/* `setTimeout` changes context of execution from other window
    (e.g. popup) to background window, so we may catch errors
    in bg error handlers.
    More: https://bugs.chromium.org/p/chromium/issues/detail?id=357568
    setTimeout is applied to Async/Void methods
    only (name ends with Async/Void)
*/
// Fix error context of methods of all APIs.

for(const apiName of Object.keys(window.apis)) {
  const api = window.apis[apiName];
  for(const prop of Object.keys(api)) {
    const method = api[prop];
    if ( !(
            typeof(api[prop]) === 'function'
            && ['Async', 'Void'].some( (suff) => method.name.endsWith(suff) )
          )
    ) {
      continue;
    }
    api[prop] = function(...args) {
      setTimeout(method.bind(this, ...args), 0);
    };
  }
}
