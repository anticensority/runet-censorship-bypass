// @flow

import Inferno from 'inferno';
import createElement from 'inferno-create-element';
import appendGlobalCss from './globalCss';
import css from 'csjs-inject';
import getApp from './components/App';

chrome.runtime.getBackgroundPage( (bgWindow) =>
  bgWindow.apis.errorHandlers.installListenersOn(
    window, 'PUP', async() => {
      /*
        `Extension context invalidated` error is thrown if `window.closed` is true and call to
        `window.chrome.i18n` or other `window.chrome` api happens. Use bgWindow.chrome instead.
        Use winChrome for tab-related calls like winChrome.tabs.getCurrent.
      */
      window.winChrome = window.chrome;
      window.chrome = bgWindow.chrome;
      let theState;
      {
        const apis = bgWindow.apis;

        theState = {
          utils: bgWindow.utils,
          apis: apis,
          flags: {
            /* Shortcuts to boolean values. */
            ifNotControlled: !apis.errorHandlers.ifControllable,
            ifMini: apis.version.ifMini,
          },
          bgWindow,
        };
      }

      // IF INSIDE OPTIONS TAB

      const currentTab = await new Promise(
        (resolve) => winChrome.tabs.query(
          {active: true, currentWindow: true},
          ([tab]) => resolve(tab),
        )
      );
      // winChrome.runtime.sendMessage({ currentTab, eventName: 'POPUP_OPENED' });

      theState.flags.ifInsideOptionsPage = !currentTab || /.*:\/\/extensions\/\?options=/g.test(currentTab.url) || currentTab.url.startsWith('about:addons');
      theState.flags.ifInsideEdgeOptionsPage = theState.flags.ifInsideOptionsPage && currentTab &&  currentTab.url.startsWith('edge://');

      theState.currentTab = currentTab;

      // If opened not via popup and not via options modal.
      // E.g., if opened via copy-pasting an URL into the address bar from somewhere.
      // If browser is not Chrome (Opera, e.g.) then options page may be opened in a separate tab
      // and then you will get a false positive.
      theState.flags.ifOpenedUnsafely = Boolean(await new Promise(
        (resolve) => winChrome.tabs.getCurrent(resolve),
      ));

      // STATE DEFINED, COMPOSE.

      appendGlobalCss(document, theState);
      // Extendable css classes.

      Inferno.render(
        createElement(getApp(theState), theState),
        document.getElementById('app-root'),
      );
      // READY TO RENDER

      const show = () => { document.documentElement.style.visibility = 'initial'; };

      if (theState.flags.ifInsideOptionsPage) {
        show();
      } else {
        setTimeout(show, 200); // Mac bug: https://bugs.chromium.org/p/chromium/issues/detail?id=428044
      }

    }
  )
);

