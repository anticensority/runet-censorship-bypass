'use strict';

const Chai = require('chai');
const Mocha = require('mocha');

const MyRequire = require('_project-root/tools/cacheless-require')(module);

Mocha.describe('window.utils', function () {

  const initApis = '../00-init-apis.js';

  Mocha.beforeEach(function() {

    global.window = {};

  });

  Mocha.it('exports as global', function () {

    MyRequire(initApis);
    Chai.assert.ok(window.utils, 'exported to globals');
    Chai.assert.isNotOk(window.apis.version.ifMini, 'is not MINI version');

  });

  Mocha.afterEach(function() {

    delete global.window;

  });

});



