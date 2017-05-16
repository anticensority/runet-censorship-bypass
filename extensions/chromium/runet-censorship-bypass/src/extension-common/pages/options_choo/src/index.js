// @flow

import mComponent from 'microcomponent';
import html from 'bel';
import css from 'csjs-inject';
import appendGlobalCss from './globalCss';

import NotControlledWarning from './components/notControlledWarning';
import Tabber from './components/tabber';
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
          antiCensorRu: backgroundPage.apis.antiCensorRu,
          errorHandlers: apis.errorHandlers,
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

      theState.flags.ifInsideOptions = !currentTab || currentTab.url.startsWith('chrome://extensions/?options=');
      if (theState.flags.ifInsideOptions) {
        document.documentElement.classList.add('ifInsideOptions');
      }

      // STATE DEFINED, COMPOSE.

      appendGlobalCss(document, theState);

      const cssClasses = css`

        /* IF INSIDE OPTIONS */

        ${
          theState.flags.ifInsideOptions ? `

            ul, ol {
              margin-left: 0.4em;
            }

          ` : `

            ul, ol {
              /*Here is a flex bug:
                () antizapret [update]                     (i)
                () anticensority very_long_foobar [update]  (i) <- Sic!
                Also: options page is wider, check it too.
                But: fixed 100% width conflicts with margins/paddings.
                So: use only when needed and avoid margins.
                FYI: setting left-margin fixes problem too, but margins are not wanted.
                Fix this problem below:
              */
              display: inline-block;
              min-width: 100%;
            }
          `
        }

      `;

      const app = new mComponent({
        props: null,
        pure: true,
      })
        .on('render', function() {

          return html`<div>
            ${
              this.props.flags.ifNotControlled ? NotControlledWarning().render(this.props) : ''
            }
            ${ Tabber({ state: {
                tabs: [
                  {
                    label: 'PAC-скрипт',
                    content: "PacChooser().render(this.props)",
                  },
                  {
                    label: 'Исключения',
                    content: "Exceptions().render(this.props)",
                  },
                  {
                    label: 'Свои прокси',
                    content: "OwnProxies().render(this.props)",
                  },
                  {
                    label: 'Модификаторы',
                    content: "Modificators().render(this.props)",
                  },
                  {
                    label: 'Уведомления',
                    content: "Notifications().render(this.props)",
                  }
                ]
              }}).render(this.props)
            }
          </div>`

        });

      document.body.appendChild(app.render(theState));

      // READY TO RENDER

      document.documentElement.style.display = 'initial';

    }
  )
);

