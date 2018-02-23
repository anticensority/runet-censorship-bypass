'use strict';

const Chai = require('chai');
const Mocha = require('mocha');

const CachelessRequire = require('symlink-to/project-root/tools/cacheless-require')(module);

Mocha.describe('window.utils', function () {

  const initApis = '../00-init-apis.js';

  Mocha.beforeEach(function() {

    global.window = {};

  });

  Mocha.it('is exported as global', function () {

    CachelessRequire(initApis);
    Chai.expect(window.utils, 'to be exported as global').to.exist;
    Chai.expect(window.apis.version.ifMini, 'to be marked as not MINI version by default').to.be.false;

  });

  Mocha.afterEach(function() {

    delete global.window;

  });

});



