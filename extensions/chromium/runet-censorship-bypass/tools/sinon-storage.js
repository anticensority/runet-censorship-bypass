'use strict';

const Sinon = require('sinon');

module.exports = function storageMock() {

  let storage = {};

  return new Proxy({
    setItem: Sinon.spy(function(key, value) {
      storage[key] = value || '';
    }),
    getItem: Sinon.spy(function(key) {
      return key in storage ? storage[key] : null;
    }),
    removeItem: Sinon.spy(function(key) {
      delete storage[key];
    }),
    get length() {
      return Object.keys(storage).length;
    },
    key: Sinon.spy(function(i) {
      throw new Error('Not implemented!');
    }),
    clear: Sinon.spy(function() {
      storage = {};
    }),
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
