import Inferno from 'inferno';
import css from 'csjs-inject';

export default function getFooter() {

  const scopedCss = css`

    .statusRow {
      padding: 0 0.3em 1em;
    }
    .status {
      display: inline-block;
    }
    .controlRow {
      margin: 1em 0 1em 0;
    }

  `;

  return function (props) {

    return (
      <div class="horPadded">
        <section class={scopedCss.statusRow}>
          <div clss={scopedCss.status} style="will-change: contents">{props.status}</div>
        </section>

        <footer class={scopedCss.controlRow + ' horFlex nowrap'}>
          <input type="button" value={chrome.i18n.getMessage('Finish')} disabled={props.ifInputsDisabled} onClick={() => window.close()} />
          <a href="https://rebrand.ly/ac-donate">{chrome.i18n.getMessage('Donate')}</a>
          <a data-in-bg="false" href="../troubleshoot/index.html">
            {chrome.i18n.getMessage('ProblemsQ')}
          </a>
        </footer>
      </div>
    );

  };

};
