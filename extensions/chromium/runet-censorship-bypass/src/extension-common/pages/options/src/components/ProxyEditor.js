import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import css from 'csjs-inject';

export default function getProxyEditor(theState) {

  const scopedCss = css`

    table.editor {
      border-collapse: collapse;
      /*border-style: hidden;*/
      width: 100%;
      margin: 0.5em 0;
      background-color: #f3f5f6;
    }

    table.editor ::-webkit-input-placeholder {
      color: #c9c9c9;
    }

    table.editor td, table.editor th {
      border: 1px solid #ccc;
      text-align: left;
    }
    table.editor th {
      padding: 0 0.6em;
    }

    table.editor input,
    table.editor select,
    table.editor select:hover {
      border: none;
      background: inherit !important;
    }
    table.editor select,
    table.editor select:hover {
      -webkit-appearance: menulist !important;
      box-shadow: none !important;
    }
    table.editor input {
      width: 100%;
    }

    table.editor input[type="submit"],
    table.editor button {
      min-width: 0;
      min-height: 0;
      width: 100%;
      padding: 0;
      border: none;
    }
    table.editor .add {
      font-weight: 800;	
    }
    table.editor button.export {
      padding-right: 2px;
    }
    /* LAST COLUMN */
    table.editor th:nth-last-child(1),
    table.editor td:nth-last-child(1) {
      height: 100%;
      /*border: 0;*/
      padding: 0;
      text-align: center;
    }
    table.editor td:nth-last-child(2) {
      /*border-right: 0;
      /* FOR PORT */
      padding: 0;
    }
    .laftPadded {
      padding-left: 2px;
    }
    .noPad {
      padding: 0;
    }

    textarea.textarea {
      width: 100% !important;
      min-height: 100%;
      height: 6em;
      border-width: 1px 0 0 0;
    }

  `;

  const uiRaw = 'ui-proxy-string-raw';

  return class ProxyEditor extends Component {

    constructor(props) {

      super(props);
      this.state = {
        proxyStringRaw: localStorage.getItem(uiRaw) || '',
        ifExportMode: false,
      };
     // props.funs.setStatusTo('Hello from editor!');

      this.switchBtn = (
        <button
          class={'emoji' + ' ' + scopedCss.export}
          title="импорт/экспорт"
          onClick={linkEvent(this, this.handleModeSwitch)}
        >⇄</button>
      );

    }

    handleModeSwitch(that) {
      
      that.setState({ ifExportMode: !that.state.ifExportMode });

    }
    handleAdd(that) {

      

    }

    render(props) {

      return (
        <form action="https://ya.ru">
          {
            !this.state.ifExportMode
            ? ((
              <table class={scopedCss.editor}>
                <thead>
                  <tr>
                    <th>протокол</th> <th>домен</th> <th>порт</th> <th>{this.switchBtn}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class={scopedCss.noPad}>
                      <select reqiured class={scopedCss.noPad}>
                        <option value="PROXY">HTTP/PROXY</option>
                        <option value="HTTPS" selected>HTTPS</option>
                        <option value="SOCKS4">SOCKS4</option>
                        <option value="SOCKS5">SOCKS5</option>
                        <option value="SOCKS">SOCKS</option>
                      </select>
                    </td>
                    <td class={scopedCss.leftPadded}>
                      <input required type="url" placeholder="89.140.125.17" pattern="https://[a]+\.ru" class={scopedCss.noPad}/>
                    </td>
                    <td class={scopedCss.leftPadded}>
                      <input required type="number" placeholder="9150" min="0" step="1" max="65535" class={scopedCss.noPad} style="min-width: 4em"/>
                    </td>
                    <td>
                      <button title="Повысить приоритет">↑</button>
                      <br/>
                      <input type="submit" class={scopedCss.add} title="Добавить прокси" onClick={linkEvent(this, this.handleAdd)} value="+"/>
                    </td>
                  </tr>
                </tbody>
              </table>
            )) : ((
              <table class={scopedCss.editor}>
                <thead>
                  <tr>
                    <th style="width: 100%">Прокси видят данные HTTP-сайтов!</th>
                    <th style="width: 1%">{this.switchBtn}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="2"><textarea class={scopedCss.textarea}
                        spellcheck={false}
                        placeholder={`
SOCKS5 localhost:9050; # Tor Expert
SOCKS5 localhost:9150; # Tor Browser
HTTPS 11.22.33.44:3143;
PROXY foobar.com:8080; # Not HTTP!`.trim()}
                        value={this.state.proxyStringRaw}
                      /></td>
                  </tr>
                </tbody>
              </table>
            ))
          }
        </form>
      );

    };
  }

};
