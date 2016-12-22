'use strict';

window.utils = {

  areSettingsNotControlledFor(details) {

    return ['controlled_by_other', 'not_controllable']
      .some( (prefix) => details.levelOfControl.startsWith(prefix) );

  },

  messages: {

    searchSettingsUrlFor(niddle) {

      return 'chrome://settings/search#' + (chrome.i18n.getMessage(niddle) || niddle);

    },

    whichExtensionHtml() {

      return chrome.i18n.getMessage('noControl') +
        ` <a href="${ this.searchSettingsUrlFor('proxy') }">
          ${ chrome.i18n.getMessage('which') }
        </a>`;

    },

  },

};

window.apis = {};
