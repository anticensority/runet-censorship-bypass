// @flow

//import mComponent from 'microcomponent';
//import html from 'bel';
import css from 'csjs-inject';

import Inferno from 'inferno';
import Component from 'inferno-component';

export default function getNotControlledWarning({ flags }) {

  const cssClasses = css`

    .warningContainer {
      background-color: red;
      color: white;
      font-weight: bold;
      text-align: center;

      ${ flags.ifInsideOptionsPage
          ? `
        padding-top: 0;
        padding-bottom: 0;
        ` : `
        padding-top: 1em;
        padding-bottom: 1em;
        `
      }

      border-bottom: 1px solid var(--default-grey);
    }
    .warningContainer a {
      color: white;
    }
  `;

  return class NotControlledWarning extends Component {

    constructor(props) {

      super(props);

    }

    render(props) {

      return (
        <section class={cssClasses.warningContainer + " horPadded"} dangerouslySetInnerHTML={{ __html: props.utils.messages.whichExtensionHtml() }} />
      );

    }

  };

}
