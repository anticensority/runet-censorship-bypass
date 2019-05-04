export default function append(document, { flags }) {

  // innerText converts \n to <br>, so:
  document.querySelector('style').innerHTML = `
    /* GLOBAL VARIABLES */

    :root {
      --ribbon-color: #4169e1;
      --blue-bg: dodgerblue;
      --default-grey: #bfbfbf;
      --cr-options-headline: #d3d3d3;
      --cr-icon-selected: #d7d7d7;
      --cr-popup-border: #bababa;
      --cr-grey-panel: #f2f2f2;
      ${ flags.ifInsideOptionsPage
          // Without this prop on the next line
          // options page width may be jerking
          // in size when scrolling is showed.
          ? 'width: 20em'
          : 'max-width: 25em;' }
    }

    /* BASE ELEMENTS */

    body {
      margin: 0;
    }
    a, a:visited {
      color: var(--ribbon-color);
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    label {
      user-select: none;
    }
    div, section, header, ul, ol {
      margin: 0;
      padding: 0;
    }
    header {
      margin-bottom: 0.3em
    }
    ul, ol {
      list-style-type: none;
    }
    .nowrap {
      white-space: nowrap;
      word-break: keep-all;
    }
    .nowrap {
      display: block;
    }
    .middledChildren > li,
    .middledChildren > li > * {
      vertical-align: middle;
    }
    input[type="radio"], input[type="checkbox"] {
      flex-shrink: 0;
    }
    input[type="radio"], label {
      cursor: pointer;
    }
    hr {
      border: none;
      border-top: 1px solid var(--cr-popup-border);
      margin: 0 0 0.6em 0;
      padding: 0;
    }
    em {
      font-style: normal;
      text-decoration: underline;
    }


    /* IF INSIDE OPTIONS */
    ${
      flags.ifInsideOptionsPage
        ? `

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


    /* COMMON CLASSES */

    .off {
      display: none;
    }
    .horPadded {
      padding-left: 1.4em;
      padding-right: 1.4em;
    }
    .horizontalList,
    .horizontalList li {
      line-height: 100%;
    }
    .horizontalList li {
      display: inline-block;
    }

    /* Flexes */

    .horFlex {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      width: 100%;
    }
    .horFlex > input:not([type="button"]) {
      align-self: flex-end;
    }

    /* Fonts/Icons */

    @font-face {
      font-family: "emoji";
      src:url("../lib/fonts/emoji.woff") format("woff");
      font-weight: normal;
      font-style: normal;
    }
    .emoji {
      font-family: "emoji";
    }

    svg.icon {
      display: inline-block;
      width: 1em;
      height: 1em;
      stroke-width: 0;
      stroke: currentColor;
      fill: currentColor;
    }

  `;

};
