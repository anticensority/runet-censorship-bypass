'use strict';

const Chai = require('chai');
const Mocha = require('mocha');

Mocha.describe('window.utils', function () {

  const initApis = '../00-init-apis.js';

  Mocha.beforeEach(function() {

    delete require.cache[require.resolve(initApis)];
    global.window = {};

  });

  Mocha.it('exports as global', function () {

    console.log('1',window);
    require(initApis);
    console.log('2',window);
    Chai.assert.ok(window.utils, 'exported to globals');
    Chai.assert.isNotOk(window.apis.version.ifMini, 'is not MINI version');

  });

  Mocha.afterEach(function() {

    delete global.window;

  });

});



