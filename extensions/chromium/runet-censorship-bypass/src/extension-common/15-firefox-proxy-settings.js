'use strict';

if (window.apis.platform.ifFirefox) {

  const prefix = 'firefox-only';

  const ffxStorage = {
    get(keys) {
      return new Promise((resolve) => (
        chrome.storage.local.get(
          keys,
          window.utils.getOrDie(resolve),
        )
      ));
    },
    set(items) {
      return new Promise((resolve) => (
        chrome.storage.local.set(items, resolve)
      ));
    },
    remove(keys) {
      return new Promise((resolve) => (
        chrome.storage.local.remove(keys, resolve)
      ));
    },
  };

  const originalSet = chrome.proxy.settings.set.bind( chrome.proxy.settings );
  chrome.proxy.settings.set = function(details, cb) {
    const pac = window.utils.getProp(details, 'value.pacScript') || {};
    if (!(pac && pac.data)) {
      return originalSet(details, cb);
    }

    const blob = new Blob([pac.data], { type : 'application/x-ns-proxy-autoconfig' });
    const blobUrl = URL.createObjectURL(blob);
    originalSet({
      value: {
        proxyType: 'autoConfig',
        autoConfigUrl: blobUrl,
      },
    }, window.utils.chromified( async (err) => {
      if (err) {
        throw err;
      }
      await ffxStorage.set({ [`${prefix}-pacData`]: pac.data });
      cb();
    }));
  };

  const originalGet = chrome.proxy.settings.get.bind( chrome.proxy.settings );
  chrome.proxy.settings.get = function(details, cb) {
    originalGet(details, window.utils.chromified((err, originalDetails) => {
      if (err) {
        throw err;
      }
      const autoConfigUrl = window.utils.getProp(originalDetails, 'value.autoConfigUrl');
      if (!autoConfigUrl) {
        return cb(originalDetails);
      }
      window.apis.httpLib.get(autoConfigUrl, async (err, pacData) => {
        if (err) {
          pacData = await ffxStorage.get(`${prefix}-pacData`);
        }
        cb(Object.assign(
          originalDetails,
          {
            value: {
              mode: 'pac_script',
              pacScript: {
                data: pacData,
              },
            },
          }
        ));
      });
    }));
  };

  const originalClear = chrome.proxy.settings.clear.bind( chrome.proxy.settings );
  chrome.proxy.settings.clear = async function(details, cb) {
    await ffxStorage.remove(`${prefix}-pacData`);
    originalClear(details, cb);
  };
}
