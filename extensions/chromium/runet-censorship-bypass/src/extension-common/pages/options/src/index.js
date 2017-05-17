// @flow

import Inferno from 'inferno';
import Component from 'inferno-component';
import createElement from 'inferno-create-element';

import { createStore } from 'redux';

import css from 'csjs-inject';
import appendGlobalCss from './globalCss';

import getApp from './components/App';
/*
       #list-of-notifiers {
          margin-left: 0.4em;
        }
*/

chrome.runtime.getBackgroundPage( (backgroundPage) =>
  backgroundPage.apis.errorHandlers.installListenersOn(
    window, 'PUP', async() => {

      let theState;
      {
        const apis = backgroundPage.apis;

        theState = {
          utils: backgroundPage.utils,
          apis: backgroundPage.apis,
          flags: {
            /* Shortcuts to boolean values. */
            ifNotControlled: !apis.errorHandlers.ifControllable,
            ifMini: apis.version.ifMini,
          },
        };
      }

      if (theState.flags.ifMini) {
        document.documentElement.classList.add('ifVersionMini');
      }

      // IF INSIDE OPTIONS TAB

      const currentTab = await new Promise(
        (resolve) => chrome.tabs.query(
          {active: true, currentWindow: true},
          ([tab]) => resolve(tab)
        )
      );

      theState.flags.ifInsideOptionsPage = !currentTab || currentTab.url.startsWith('chrome://extensions/?options=');

      // STATE DEFINED, COMPOSE.

      appendGlobalCss(document, theState);

      Inferno.render(
        createElement(getApp(theState), theState),
        document.getElementById('app-root'),
      );
      // READY TO RENDER

      document.documentElement.style.display = 'initial';

    }
  )
);

