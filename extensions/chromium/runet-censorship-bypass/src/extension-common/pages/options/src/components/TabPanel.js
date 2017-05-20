import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import css from 'csjs-inject';

export default function getTabPannel({ flags, baseCss }) {

  const scopedCss = css`

    .tabContainer {
      padding: 0.6em 0 1em;
    }
    .tabContainer li label {
      display: inline-block; /* Needed for ::first-letter below. */
    }
    .tabContainer li label::first-letter {
      text-transform: uppercase;
    }
    :root.ifInsideOptionsPage .tabContainer {
      padding-bottom: 0.6em;
    }
    :root.ifInsideOptionsPage nav.mainNav > div:not(:last-child) {
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

      return (
        <div>
          <nav class={scopedCss.navLabels}>
            <ul class='horizontalList'>
              {
                props.tabs.map((tab, index) =>
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
              props.tabs.map((tab, index) => (
                  <div>
                    <input type="radio" name="selectedTab" id={'radioTab' + index} checked={this.state.chosenTabIndex === index} class="off"/>
                    <section id={'tab' + index} class={scopedCss.tabContainer}>{tab.content}</section>
                  </div>
                )
              )
            }
          </nav>
          <hr/>
        </div>);

    }

  };

};
