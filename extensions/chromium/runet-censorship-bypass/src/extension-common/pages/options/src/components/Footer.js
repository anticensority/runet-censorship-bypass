import Inferno from 'inferno';
import css from 'csjs-inject';

export default function getFooter(theState) {

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

  return (props) => (
    <div class="horPadded">
      <section class={scopedCss.statusRow}>
        <div class={scopedCss.status} style="will-change: contents">
          {typeof(props.status) === 'string' ? <div dangerouslySetInnerHTML={{ __html: props.status }}></div> : props.status}
        </div>
      </section>

      <footer class={scopedCss.controlRow + ' horFlex nowrap'}>
        <input type="button" value={chrome.i18n.getMessage('Finish')} disabled={props.ifInputsDisabled} style={{ display: theState.flags.ifInsideEdgeOptionsPage ? 'none' : 'initial' }} onClick={() => window.close()} />
        <a href="https://github.com/anticensority/runet-censorship-bypass/wiki/Поддержать">{chrome.i18n.getMessage('Donate')}</a>
        <a data-in-bg="false" href="../troubleshoot/index.html">
          {chrome.i18n.getMessage('ProblemsQ')}
        </a>
      </footer>
    </div>
  );

};
