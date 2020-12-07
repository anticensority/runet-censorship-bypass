'use strict';

if (window.apis.platform.ifFirefox) {

  const prefix = 'firefox-only';

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
        window.utils.lastError = err;
        cb();
        return;
      }
      await window.utils.promisedLocalStorage.set({ [`${prefix}-pac-data`]: pac.data });
      cb();
    }));
  };

  const originalGet = chrome.proxy.settings.get.bind( chrome.proxy.settings );
  chrome.proxy.settings.get = function(details, cb) {
    originalGet(details, window.utils.chromified(async (err, originalDetails) => {
      if (err) {
        window.utils.lastError = err;
        cb(originalDetails);
        return;
      }
      let pacData = await window.utils.promisedLocalStorage.get(`${prefix}-pac-data`);
      if (!pacData || !Object.keys(pacData).length) {
        cb(originalDetails);
        return;
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
    }));
  };

  const originalClear = chrome.proxy.settings.clear.bind( chrome.proxy.settings );
  chrome.proxy.settings.clear = async function(details, cb) {
    await window.utils.promisedLocalStorage.remove(`${prefix}-pac-data`);
    originalClear(details, cb);
  };
}
