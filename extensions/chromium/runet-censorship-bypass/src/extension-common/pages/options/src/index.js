// @flow

import Inferno from 'inferno';
import createElement from 'inferno-create-element';
import appendGlobalCss from './globalCss';
import css from 'csjs-inject';
import getApp from './components/App';

chrome.runtime.getBackgroundPage( (bgWindow) =>
  bgWindow.apis.errorHandlers.installListenersOn(
    window, 'PUP', async() => {

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
        (resolve) => chrome.tabs.query(
          {active: true, currentWindow: true},
          ([tab]) => resolve(tab)
        )
      );

      theState.flags.ifInsideOptionsPage = !currentTab || currentTab.url.startsWith('chrome://extensions/?options=') || currentTab.url.startsWith('about:addons');
      theState.currentTab = currentTab;

      // STATE DEFINED, COMPOSE.

      appendGlobalCss(document, theState);
      // Extendable css classes.

      Inferno.render(
        createElement(getApp(theState), theState),
        document.getElementById('app-root'),
      );
      // READY TO RENDER

      document.documentElement.style.display = 'initial';

    }
  )
);

