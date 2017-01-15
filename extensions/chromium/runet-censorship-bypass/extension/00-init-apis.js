'use strict';

const IF_DEBUG = false;

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


window.utils = {

  mandatory() {

    throw new TypeError('Missing required argument. ' +
      'Be explicit if you swallow errors.');

  },

  getProp(obj, path = this.mandatory()) {

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

  areSettingsNotControlledFor(details) {

    return ['controlled_by_other', 'not_controllable']
      .some( (prefix) => details.levelOfControl.startsWith(prefix) );

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
