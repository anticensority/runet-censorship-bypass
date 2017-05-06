'use strict';

const Chrome = require('sinon-chrome');
const Storage = require('_project-root/tools/sinon-storage');
const Chai = require('chai');
const Mocha = require('mocha');

const CachelessRequire = require('_project-root/tools/cacheless-require')(module);

Mocha.describe('window.apis.pacKitchen', function () {


  Mocha.beforeEach(function() {

    global.chrome = Chrome;
    global.window = {
      chrome: Chrome,
      localStorage: new Storage(),
    };
    CachelessRequire('../00-init-apis.js');

  });

  Mocha.it('is evaluated and defined', function () {

    CachelessRequire('../35-pac-kitchen-api.js');
    Chai.assert.ok(window.apis.pacKitchen, 'exports to globals');

  });

  Mocha.afterEach(function() {

    delete global.window;

  });

});



