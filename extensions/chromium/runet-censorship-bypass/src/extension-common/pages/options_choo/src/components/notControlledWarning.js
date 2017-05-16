// @flow

import mComponent from 'microcomponent';
import html from 'bel';
import css from 'csjs-inject';

const cssClasses = css`

  .ifNotControlled {
    background-color: red;
    color: white;
    font-weight: bold;
    text-align: center;

    padding-top: 1em;
    padding-bottom: 1em;

    border-bottom: 1px solid var(--default-grey);
  }

  :root.ifInsideOptions .ifNotControlled {
    padding-top: 0;
    padding-bottom: 0;
  }
  .ifNotControlled a {
    color: white;
  }

`;

export default (opts) => new mComponent(Object.assign({
    props: null,
    pure: true,
  }, opts))
  .on('render', function() {

    return html`<section class="${cssClasses.ifNotControlled} horPadded">${ html(this.props.utils.messages.whichExtensionHtml()) }</section>`

  });
