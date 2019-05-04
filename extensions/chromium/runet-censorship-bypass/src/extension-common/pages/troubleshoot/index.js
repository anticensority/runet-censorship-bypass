'use strict';

chrome.runtime.getBackgroundPage( (backgroundPage) =>
  backgroundPage.apis.errorHandlers.installListenersOn(
    window, 'TRBL', () => {

      document.querySelectorAll('.reset-settings').forEach((el) => {

        el.onclick = () => {

          backgroundPage.localStorage.clear();
          chrome.storage.local.clear( () => chrome.runtime.reload() );

        };
      });

      document.querySelectorAll('.view-errors').forEach((el) => {

        el.onclick = () =>
          backgroundPage.apis.errorHandlers.viewError('all');
      });

    },
  ),
);
