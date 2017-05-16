import mComponent from 'microcomponent';
import html from 'bel';
import css from 'csjs-inject';

const cssClasses = css`

  section[data-for] {
    padding: 0.6em 0 1em;
  }
  section[data-for] li label {
    display: inline-block; /* Needed for ::first-letter below. */
  }
  section[data-for] li label::first-letter {
    text-transform: uppercase;
  }
  :root.ifInsideOptions section[data-for] {
    padding-bottom: 0.6em;
  }
  :root.ifInsideOptions section[data-for]:not(:last-child),
  .underlined {
    border-bottom: 1px solid var(--cr-options-headline);
  }

  /* HIDE starts. */

    :root:not(.ifInsideOptions) .mainNav section[data-for],
    /* One button shared between two sections: */
    :root:not(.ifInsideOptions) .mainNav #apply-mods-section
    {
      /* Hide, but preclude width resizes. */
      height: 0px !important;
      line-height: 0px !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      border: none !important;
      display: block;
      visibility: hidden;
      transform: scaleY(0) !important;
    }

    :root:not(.ifInsideOptions) .mainNav section[data-for] *,
    /* One button shared between two sections: */
    :root:not(.ifInsideOptions) .mainNav #apply-mods-section *
    {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }

  /* HIDE ends. */

  .navLabels {
    background-color: var(--cr-grey-panel);
    text-align: center;
  }
  .navLabels li label {
    display: inline-block;

    border: 1px solid var(--ribbon-color);
    border-radius: 0.2em;

    background-color: white;
    color: var(--ribbon-color);

    padding: 0.2em 0.3em 0.3em 0.2em;
    line-height: 0.8em;
    margin: 0.1em 0;
  }
  .navLabels li label:hover {
    background-color: var(--blue-bg);
    color: white;

    /*
    border-color: white;
    border-style: dotted;*/
  }

  /* LABELS starts. */

    input[name="selectedTabLabel"]:checked + label:not(:hover)
    {
      background-color: var(--blue-bg);
      color: white;
    }
    /* ★★★★★ */
    .navLabels label:before {
      content: '★';
      padding-right: 0.1em;
      visibility: hidden;
    }
    .navLabels li label:hover:before,
    input[name="selectedTabLabel"]:checked + label:before
    {
      visibility: initial;
    }

  /* LABELS ends. */

`;

export default (opts) => new mComponent(Object.assign({
    pure: true,
  }, opts))
  .on('render', function () {

    return html`
      <div>
        <nav class="${cssClasses.navLabels} hiddenForOptionsPage">
          <ul class='horizontalList'>
            ${
              this.state.tabs.map((tab, index) => html`
                <li><input type="radio" name="selectedTabLabel" class="off"><label for="tab${index}" class="${cssClasses.navLabel}">${tab.label}</label></li>
              `)
            }
          </ul>
          <hr>
        </nav>

        <nav class="horPadded ${cssClasses.mainNav}">

          ${
            this.state.tabs.map((tab, index) => html`<section data-for="tab${index}">${tab.content}</section>`)
          }
          
        </nav>
      </div>
    `;

  });
