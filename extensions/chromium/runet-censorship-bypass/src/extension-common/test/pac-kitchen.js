'use strict';

const Storage = require('_project-root/tools/sinon-storage');
const Chai = require('chai');
const Mocha = require('mocha');

const CachelessRequire = require('_project-root/tools/cacheless-require')(module);

Mocha.describe('window.apis.pacKitchen', function () {

  Mocha.beforeEach(function() {

    global.chrome = CachelessRequire('sinon-chrome/extensions');
    global.window = {
      chrome: global.chrome,
      localStorage: new Storage(),
    };
    CachelessRequire('../00-init-apis.js');

  });

  Mocha.it('is exported with correct default values', function () {

    CachelessRequire('../35-pac-kitchen-api.js');
    Chai.expect(window.apis.pacKitchen, 'to be exported as global').to.exist;

    const mods = window.apis.pacKitchen.getPacMods();
    Chai.expect(
      mods, 'to expose default configs on first run'
    ).to.exist;
    Chai.expect(mods.ifNoMods, 'to impose modifications by default (prohibits DIRECT)').to.be.false;

    const orderedMods = window.apis.pacKitchen.getOrderedConfigs();
    Chai.expect(orderedMods, 'to have method for getting ordered configs').to.exist;
    {
      const several = 9;
      Chai.expect(orderedMods.length, 'to have several ordered configs').to.be.above(several);
    }

    Chai.expect(
      Object.keys(mods).length,
      'pacModifiers to inherit default configs keys as props and add extra props'
    ).to.be.above(orderedMods.length);

    Chai.expect(
      orderedMods.every((mod) => mods[mod.key] === mod.dflt),
      'all configs to be default on first run'
    ).to.be.ok;

    const excMods = window.apis.pacKitchen.getOrderedConfigs('exceptions');
    Chai.expect(excMods.length, 'to have several ordered mods under category "exceptions"').to.be.above(0);

    const proxyMods = window.apis.pacKitchen.getOrderedConfigs('ownProxies');
    Chai.expect(proxyMods.length, 'to have several ordered mods under category "ownProxies"').to.be.above(0);

    const generalMods = window.apis.pacKitchen.getOrderedConfigs('general');
    Chai.expect(generalMods.length, 'to have several ordered mods without category').to.be.above(0);

    Chai.expect(
      orderedMods.length, 'to be a sum of categorized (and ordered) mods'
    ).to.be.equal(
      proxyMods.length + excMods.length + generalMods.length
    );

  });

  Mocha.it('is installed (by modifying `chrome.proxy.settings.set`)', function () {

    const originalSet = chrome.proxy.settings.set;
    CachelessRequire('../35-pac-kitchen-api.js');
    Chai.expect(originalSet.notCalled, 'original set not to be called during install').to.be.true;
    Chai.expect(originalSet, 'settings.set to be modified during install').not.to.be.equal(chrome.proxy.settings.set);

  });

  Mocha.afterEach(function() {

    delete global.window;

  });

});



