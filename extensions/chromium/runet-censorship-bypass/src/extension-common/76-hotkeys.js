'use strict';

chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'toggle-pac-script') {
    console.log("Toggling PAC-script!");
    const pacKey = window.apis.antiCensorRu.getCurrentPacProviderKey();
    if (!pacKey) {
      let antiCensorRu = await window.utils.promisedLocalStorage
        .get('antiCensorRu');
      const oldKey = antiCensorRu._currentPacProviderKey;
      console.log('OLD KEY:', oldKey);
      if (oldKey) {
        window.apis.antiCensorRu.installPacAsync(oldKey, cb);
      }
      return;
    }
    window.apis.antiCensorRu.clearPacAsync();
  }
});
