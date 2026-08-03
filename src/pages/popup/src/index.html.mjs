#!/bin/node
import customRadio from '#components/custom-radio.html';

const pacControls =  `
  <span class="after-label">
    <span class="show-if-checked" hidden>
      <a href title="Обновить">[обновить]</a>
      <a href title="Приостановить">[⏸]</a>
    </span>
    <a href title="Информация о PAC-скрипте" style="float: right; vertical-align: top">[ℹ]</a>
  </span>
`;

console.log(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="./fix-the-forms.copy.mjs" type="module"></script>
    <style>
      /*
        Josh's Custom CSS Reset
        https://www.joshwcomeau.com/css/custom-css-reset/
      */
      *, *::before, *::after {
        box-sizing: border-box;
      }
      * {
        margin: 0;
      }
      body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
      }
      img, picture, video, canvas, svg {
        display: block;
        max-width: 100%;
      }
      input, button, textarea, select {
        font: inherit;
      }
      p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
      }
      #root, #__next {
        isolation: isolate;
      }
      /* Reset ends */

      :root {
        border-color: black;
        border-radius: 0;
        /*
          The initial theme is light but it's quickly inverted to dark.
          Dark theme should be the first theme user sees by default.
          TODO: Ponder more. E.g. valid color (green) must remain the
          same even after invertion. Also a flash/blink of colors
          during invertion must be avoided.
        */
        /*
        background-color: white; /* Not transparent. */
        /*color: black;
        /*
        border: 0 none white;
        outline: 0 none white;*/
        /*color-scheme: light;
        /* COLOR INVERTION */
        filter: invert(0); /* TODO: temporary disabled. */
      }
      :root, html, body {
        /*background: url('./gsbg.png') no-repeat;*/
        padding: 0;
        margin: 0;
      }
      body {
        --ribbon-color: #0075ff; /* #4169e1;*/
        font-family: Ubuntu, Arial, sans-serif;
        font-size: 80%;
        padding: 10px;
      }

      menu {
        list-style: none;
        padding: 0;
      }
      li {
        margin-top: 0.2rem;
      }
      a, a:visited {
        text-decoration: none;
        color: var(--ribbon-color);
      }
      label {
        vertical-align: bottom;
      }
      input {
        vertical-align: text-bottom;
        margin-right: 3px;
      }
      input[type="url"] {
        border: 1px solid black;
        /*border-width: 0 0 1px 0;
        border-color: crimson;*/
        flex-grow: 1;
        /*padding: 0 3px 0 3px;*/
        /*width: 100%;*/
      }
      input[type="radio"], label {
        cursor: pointer;
      }
      #ownInputs {
        display: flex;
      }
      /*
      input#ownRadio ~ div:has(> input#customPacUrl):after {
        border: 5px solid lime;
        background-color: navy;
        content: "";
      }
      input#ownRadio ~ div:after:not(:empty) {
        border: 5px solid pink;
      }
      */

      .use-preferred-color-scheme {
        /*background-color: violet;
        color: darkred;*/
        /*color-scheme: light;*/
      }/*
      @media (prefers-color-scheme: dark) {
        .use-preferred-color-scheme {
          color-scheme: dark;
          background-color: green;
          color: #bfbfbf;
        }
      }
      @media (prefers-color-scheme: light) {
        .use-preferred-color-scheme {
          color-scheme: dark;
          background-color: pink;
          color: purple;
          border: 5px solid red;
        }
      }
      /*
      input:invalid {
        border: 5px solid red;
      }*/
      #customPacUrl:disabled {
        /*background-color: grey;*/
      }
      #ownInputs button {
        font-family: emoji, monospace;
        width: 2em;
        width: 2ch;
        border-width: 1px 1px 1px 0px;
      }
      #ownInputs > input {
        border-radius: 0;
      }
      #ownInputs > div {
        display: flex;
      }
      #customPacUrl:disabled ~ .editPanel {
        display: none;
      }
      #customPacUrl:not(:disabled) ~ .unlockPanel {
        display: none;
      }
      #boxes {
        padding: 1em 0;
        padding: 1ch 0;
      }
      #boxes > div {
        /* Don't break sentences on spaces. */
        white-space: nowrap;
      }
      #boxes label {
        display: flex;
      }
    </style>
  </head>
  <body class="use-preferred-color-scheme">
    <header>
      PAC-скрипт:
    </header>
    <nav>
      <form id="pacChooserForm">
        <menu id="radios">
          <li>
            ${customRadio({
              id: 'antizapretRadio',
              label: 'Антизапрет',
              value: 'antizapret',
              afterLabel: pacControls,
              attrs: { name: 'pacScriptRadio', form: 'pacChooserForm' },
            })}
          </li><li>
            ${customRadio({
              id: 'anticensorityRadio',
              label: 'Антицензорити',
              value: 'anticensority',
              afterLabel: pacControls,
              attrs: { name: 'pacScriptRadio', form: 'pacChooserForm' },
            })}
          </li><!--li>
            <label>
              <input type="radio" form="pacChooserForm" value="own" name="pacScriptRadio" id="ownRadio" disabled>
              <span>Свой:</span>
            </label>
            <div id="ownInputs">
              <input id="customPacUrl" type="url" placeholder="https://example.com/proxy.pac"
                size="27"
                spellcheck="false" autocorrect="off" autocapitalize="off"
                required
                disabled
              >
              <div class="unlockPanel">
                <button id="editPacUrlButton" title="Редактировать">🖉</button>
              </div>
              <div class="editPanel">
                <button id="savePacUrlButton" title="Сохранить">🗸</button>
                <button id="cancelPacUrlButton" title="Отмена">🗙</button>
              </div>
            </div>
          </li--><li>
            ${customRadio({
              id: 'disabledRadio',
              label: 'Отключить / Сброс',
              value: 'disabled',
              customStyles: `
                #disabledRadio:checked + span {
                  color: red;
                }
              `,
              attrs: {
                checked: '',
                name: 'pacScriptRadio', form: 'pacChooserForm',
              },
            })}
          </li>
        </menu>
        <div id="boxes">
          <div>
            <label>
              <input type="checkbox" name="ifToResetBox" id="ifToResetBox" checked>
              <span>Отключать прокси перед скачиванием</span>
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" name="ifToUpdateBox" id="ifToUpdateBox" checked>
              <span>Обновлять каждые 12ч</span>
            </label>
          </div>
        </div>
      </form>
    </nav>
    <hr/>
    <footer style="display: flex; justify-content: space-between; padding: 1rem 0.5rem 0.5rem; align-items: center;">
      <!--button>OK</button-->
      <a id="news" target="_blank" data-localize="__MSG_News__"
        href="https://github.com/anticensority/runet-censorship-bypass/issues/10"
      >Новости</a>
      <a id="donate" target="_blank" data-localize="__MSG_Donate__"
        href="https://github.com/anticensority/runet-censorship-bypass/wiki/Поддержать"
      >Поддержать ❤</a>
      <a id="problems" target="_blank" data-localize="__MSG_News__"
        href="https://github.com/anticensority/runet-censorship-bypass/wiki"
      >Проблемы?</a>
    </footer>
  </body>
</html>
`.trim());