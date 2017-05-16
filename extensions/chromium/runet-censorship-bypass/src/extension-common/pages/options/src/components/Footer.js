import Inferno from 'inferno';
import css from 'csjs-inject';
import Component from 'inferno-component';

export default function getFooter() {

  const scopedCss = css`

    #statusRow {
      padding: 0 0.3em 1em;
    }
    #status {
      display: inline-block;
    }

    .controlRow {
      margin: 1em 0 1em 0;
    }
  `;

  return function (props) {

    return (
      <div class="horPadded">
        <section id="statusRow">
          <div id="status" style="will-change: contents">{props.status}</div>
        </section>

        <footer class={scopedCss.controlRow + ' horFlex nowrap'}>
          <input type="button" value="Готово" onClick={() => window.close()} />
          <a href="../troubleshoot/index.html">
            Проблемы?
          </a>
        </footer>
      </div>
    );

  };

};
