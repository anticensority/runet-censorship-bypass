'use strict';

{

  if (!chrome.proxy.settings) {

    const ffxStore = window.utils.createStorage('firefox-only');


    chrome.proxy.settings = {
      get: (_, cb) => {

        let currentSettings = ffxStore('proxySettings') || {};
        currentSettings.levelOfControl = 'controlled_by_this_extension'; // May be lie, but this field is required.
        cb && cb(currentSettings);

      },
      onChange: {
        addListener: () => {},
      },
      set: (details, cb) => {

        browser.proxy.unregister();
        browser.proxy.register('./default.pac.js');


        // browser.proxy.onProxyError.addListener((...err) => { console.log('ERROR IN PAC:', ...err)  });

        browser.runtime.sendMessage(details, {toProxyScript: true});
        ffxStore('proxySettings', details);
        cb && cb();

      },
    };
    const proxySettings = ffxStore('proxySettings');
    if (proxySettings) {
      chrome.proxy.settings.set(proxySettings);
    }

  }

}
