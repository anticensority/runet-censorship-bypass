'use strict';

{

  const IF_DEBUG = true;

  if (!IF_DEBUG) {
    // I believe logging objects precludes them from being GCed.
    // I also don't remove logs for sake of client-side troubleshooting
    // (though no one sent me logs so far).
    ['log', 'warn', 'error'].forEach( (meth) => {
      const _meth = window.console[meth].bind(console);
      window.console[meth] = function(...args) {

        _meth(...args.map((a) => '' + a));

      };
    });
  }

  const self = window.utils = {

    mandatory() {

      throw new TypeError('Missing required argument. ' +
        'Be explicit if you swallow errors.');

    },

    throwIfError(err) {

      if(err) {
        throw err;
      }

    },

    checkChromeError() {

      // Chrome API calls your cb in a context different from the point of API
      // method invokation.
      let err = chrome.runtime.lastError || chrome.extension.lastError;
      if (err) {
        err = new Error(err.message); // Add stack.
        console.warn('API returned error:', err);
      }
      return err;

    },

    timeouted(cb = self.mandatory) {

      return (...args) => setTimeout(cb.bind(null, ...args), 0)

    },

    chromified(cb = self.mandatory(), ...replaceArgs) {

      // Take error first callback and convert it to chrome API callback.
      return function(...args) {

        if (replaceArgs.length) {
          args = replaceArgs;
        }
        const err = self.checkChromeError();
        // setTimeout fixes error context.
        setTimeout( cb.bind(null, err, ...args), 0 );

      };

    },

    getProp(obj, path = self.mandatory()) {

      const props = path.split('.');
      if (!props.length) {
        throw new TypeError('Property must be supplied.');
      }
      const lastProp = props.pop();
      for( const prop of props ) {
        if (!(prop in obj)) {
          return undefined;
        }
        obj = obj[prop];
      }
      return obj[lastProp];

    },

    createStorage(prefix) {

      return function state(key, value) {

        key = prefix + key;
        if (value === null) {
          return localStorage.removeItem(key);
        }
        if (value === undefined) {
          const item = localStorage.getItem(key);
          return item && JSON.parse(item);
        }
        if (value instanceof Date) {
          throw new TypeError('Converting Date format to JSON is not supported.');
        }
        localStorage.setItem(key, JSON.stringify(value));

      };

    },

    /*
    * Possible values for levelOfControl:
    *
    * 1. "not_controllable"
    * 2. "controlled_by_other_extensions"
    * 3. "controllable_by_this_extension"
    * 4. "controlled_by_this_extension"
    *
    * See: https://developer.chrome.com/extensions/proxy
    * */


    areSettingsControllableFor(details) {

      return details.levelOfControl.endsWith('this_extension');

    },

    areSettingsControlledFor(details) {

      return details.levelOfControl.startsWith('controlled_by_this');

    },

    messages: {

      searchSettingsForUrl(niddle) {

        return 'chrome://settings/search#' + (chrome.i18n.getMessage(niddle) || niddle);

      },

      whichExtensionHtml() {

        return chrome.i18n.getMessage('noControl') +
          ` <a href="${ this.searchSettingsForUrl('proxy') }">
            ${ chrome.i18n.getMessage('which') }
          </a>`;

      },

    },

  };

  window.apis = {};

}
