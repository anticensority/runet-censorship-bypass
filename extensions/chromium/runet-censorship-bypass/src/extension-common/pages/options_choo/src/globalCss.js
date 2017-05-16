export default function append(document, props) {

  // innerText converts \n to <br>, so:
  document.head.querySelector('style').innerHTML = `
    /* GLOBAL VARIABLES */

    :root {
      --ribbon-color: #4169e1;
      --blue-bg: dodgerblue;
      --default-grey: #bfbfbf;
      --cr-options-headline: #d3d3d3;
      --cr-icon-selected: #d7d7d7;
      --cr-popup-border: #bababa;
      --cr-grey-panel: #f2f2f2;
      max-width: 28em;
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
    li, .nowrap {
      display: block;
      white-space: nowrap;
      word-break: keep-all;
    }
    li, li > * {
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
  `;

};
