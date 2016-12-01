'use strict';

window.utils = {

  areSettingsNotControlledFor(details) {

   return ['controlled_by_other', 'not_controllable']
      .some( (prefix) => details.levelOfControl.startsWith(prefix) );

  },

};

window.apis = {};
