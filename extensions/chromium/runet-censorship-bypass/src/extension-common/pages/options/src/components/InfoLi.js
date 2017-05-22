import Inferno from 'inferno';
import css from 'csjs-inject';

export default function getInfoLi() {

  const scopedCss = css`
    /* CONTROL RAW = BUTTON + LINK */

    .labelContainer {
      flex-grow: 9;
      padding-left: 0.3em;
      /* Vertical align to middle. */
      align-self: flex-end;
      line-height: 100%;
    }

    /* INFO SIGNS */

    input:disabled + .labelContainer label {
      color: var(--default-grey);
      pointer-events: none;
    }

    .infoRow {
      position: relative;
      flex-wrap: wrap;
    }
    .rightBottomIcon {
      margin-left: 0.1em;
      vertical-align: bottom;
    }
    .infoUrl, .infoUrl:hover {
      text-decoration: none;
    }

    /* Source: https://jsfiddle.net/greypants/zgCb7/ */
    .desc {
      text-align: right;
      color: var(--ribbon-color);
      cursor: help; 
      padding-left: 0.3em;
    }
    .tooltip {
      display: none;
      position: absolute;
      white-space: initial;
      word-break: initial;
      top: 100%;
      left: 0;
      right: 1em;
      z-index: 1;
      background-color: var(--ribbon-color);
      padding: 1em;
      color: white;
      text-align: initial;
    }
    .desc:hover .tooltip {
      display: block;
    }
    .tooltip a,
    .tooltip em {
      color: white;
    }
    .desc .tooltip:after {
      border-left: solid transparent 0.5em;
      border-bottom: solid var(--ribbon-color) 0.5em;
      position: absolute;
      top: -0.5em;
      content: "";
      width: 0;
      right: 0;
      height: 0;
    }
    /* This bridges the gap so you can mouse into the tooltip without it disappearing. */
    .desc .tooltip:before {
      position: absolute;
      top: -1em;
      content: "";
      display: block;
      height: 1.2em;
      left: 75%;
      width: calc(25% + 0.6em);
    }

    /* CHILDREN */

    input:not(:checked) ~ .children {
      display: none;
    }
    .children {
      flex-grow: 9999;
    }

  `;

  const camelToDash = (name) => name.replace(/([A-Z])/g, (_, p1) => '-' + p1.toLowerCase());
  // const dashToCamel = (name) => name.replace(/-(.)/g, (_, p1) => p1.toUpperCase());

  const InfoIcon = function InfoIcon(props) {

      return (
        <svg class="icon" style="position: relative; top: 0.08em">$
          <use xlink:href="#iconInfo"></use>$
        </svg>
      );

  };

  return function InfoLi(props) {

    props = Object.assign({}, {
      idPrefix: '',
      ifDashify: false,
    }, props);

    const iddy = props.idPrefix + ( props.ifDashify ? camelToDash(props.conf.key) : props.conf.key );
    return (
      <li class={scopedCss.infoRow + ' horFlex'}>
        <input
          type={props.type}
          name={props.name}
          checked={props.checked}
          id={iddy}
          onClick={props.onClick}
          disabled={props.disabled}
        />
        <div class={scopedCss.labelContainer}>
          <label for={iddy} dangerouslySetInnerHTML={{__html: props.conf.label}}></label>
          &nbsp;{props.nodeAfterLabel}
        </div>
        {props.conf.desc
          ? (
            <div class={scopedCss.desc}>
              <InfoIcon />
              <div class={scopedCss.tooltip} dangerouslySetInnerHTML={{__html: props.conf.desc}}/>
            </div>)
          : (props.conf.url
              ? (<a href={props.conf.url} class={[scopedCss.rightBottomIcon, scopedCss.infoUrl].join(' ')} title="Открыть документацию"><InfoIcon /></a>)
              : (<span>&nbsp;</span>) // Affects vertical align of flexbox items.
            )
        }
        {props.children && (<div class={scopedCss.children}>{props.children}</div>)}
      </li>
    );

  };

};
