import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import css from 'csjs-inject';

export default function getTabPannel({ flags, baseCss }) {

  const scopedCss = css`

    /*.tabContainer {
      padding: 0;
    }*/
    .tabContainer li label {
      display: inline-block; /* Needed for ::first-letter below. */
    }
    .tabContainer li label::first-letter {
      text-transform: uppercase;
    }
    :root.ifInsideOptionsPage .tabContainer {
      padding: 0.3em 0 0.4em 0;
    }
    :root.ifInsideOptionsPage nav.mainNav > section:not(:last-child):not([data-key=ownProxies]):not([data-key=mods]) {
      border-bottom: 1px solid var(--cr-options-headline);
    }

    :root.ifInsideOptionsPage .navLabels {
      display: none;
    }

    /* HIDE starts. */

      :root:not(.ifInsideOptionsPage) .mainNav input:not(:checked) + section
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

      :root:not(.ifInsideOptionsPage) .mainNav input:not(:checked) + section *
      {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }

    /* HIDE ends. */

    .navLabels {
      background-color: var(--cr-grey-panel);
      text-align: center;
      min-width: 24em;
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
      .navLabels li {
        margin: 0 0.125em; /* 1.5px */
      }

    /* LABELS ends. */

    .mainNav {
      padding-top: 0.6em;
      padding-bottom: 1em;
    }

  `;

  if (flags.ifInsideOptionsPage) {
    document.documentElement.classList.add(scopedCss.ifInsideOptionsPage);
  }

  return class TabPannel extends Component {

    constructor(props) {

      super(props);
      this.state = {
        chosenTabIndex: 0,
      };

    }

    render(props) {

      const indexedTabs = props.tabs.filter((tab) => tab.label);
      const chosenTabKey = indexedTabs[this.state.chosenTabIndex].key;

      return (
        <div>
          <nav class={scopedCss.navLabels}>
            <ul class='horizontalList'>
              {
                indexedTabs.map((tab, index) =>
                  (<li>
                    <input type="radio" name="selectedTabLabel" id={'radioLabel' + index} checked={this.state.chosenTabIndex === index} class="off"/>
                    <label onClick={() => this.setState({chosenTabIndex: index})} for={'radioLabel' + index} class={scopedCss.navLabel}>{tab.label}</label>
                  </li>)
                )
              }
            </ul>
            <hr/>
          </nav>

          <nav class={'horPadded ' + scopedCss.mainNav}>
            {
              [].concat(...props.tabs.map((tab, index) => [
                (<input type="checkbox" name="selectedTab" id={'radioTab' + index} checked={

                  chosenTabKey === tab.key || (props.alwaysShownWith[tab.key] || []).includes(chosenTabKey)

                } class="off"/>),
                (<section id={'tab' + index} class={scopedCss.tabContainer} data-key={tab.key}>{tab.content}</section>),
              ]))
            }
          </nav>
          <hr/>
        </div>);

    }

  };

};
