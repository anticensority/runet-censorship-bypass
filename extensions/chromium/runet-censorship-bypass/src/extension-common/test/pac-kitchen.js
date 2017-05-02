'use strict';

const Chrome = require('sinon-chrome');
const Chai = require('chai');
const Mocha = require('mocha');

const storageMock = function storageMock() {

  let storage = {};

  return new Proxy({
    setItem: function(key, value) {

      storage[key] = value || '';

    },
    getItem: function(key) {

      return key in storage ? storage[key] : null;

    },
    removeItem: function(key) {

      delete storage[key];

    },
    get length() {

      return Object.keys(storage).length;

    },
    key: function(i) {

      throw new Error('Not implemented!');

    },
    clear: function() {

      storage = {};

    },
  }, {
    get: function(target, name) {

      if (name in target) {
        return target[name];
      }
      return target.getItem(name);

    },
    set: function(target, prop, value) {

      if (prop in target) {
        target[prop] = value;
        return;
      }
      return target.setItem(prop, value);

    },
  });

};

const myRequire = (path) => {

  delete require.cache[require.resolve(path)];
  return require(path);

};

Mocha.describe('window.apis.pacKitchen', function () {


  Mocha.beforeEach(function() {

    global.chrome = Chrome;
    global.window = {
      chrome: Chrome,
      localStorage: new storageMock(),
    };
    myRequire('../00-init-apis.js');

  });

  Mocha.it('is evaluated and defined', function () {

    myRequire('../35-pac-kitchen-api.js');
    Chai.assert.ok(window.apis.pacKitchen, 'exports to globals');

  });

  Mocha.afterEach(function() {

    delete global.window;

  });

});



