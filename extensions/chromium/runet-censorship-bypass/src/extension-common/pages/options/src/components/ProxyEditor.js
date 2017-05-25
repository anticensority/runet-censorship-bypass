import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import createElement from 'inferno-create-element';
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
      height: 100%;
    }

    /* ADD PANEL */
    table.editor tr.addPanel td {
      padding: 0;
    }
    /* PROXY ROW */
    table.editor tr.proxyRow td:first-child {
      text-align: center;
    }

    table.editor th:not(:last-child) {
      padding: 0 0.6em;
    }

    table.editor input:not([type="submit"]),
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

    /* BUTTONS */
    table.editor input[type="submit"],
    table.editor button {
      min-width: 0;
      min-height: 0;
      width: 100%;
      padding: 0;
      border: none;
    }
    .only {
      /*height: 100%;*/
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    table.editor .add {
      font-weight: 900; 
    }
    table.editor .export {
      padding-right: 2px;
    }

    /* LAST COLUMN: BUTTONS */
    table.editor tr > *:nth-last-child(1) {
      text-align: center;
      padding: 0;
      position: relative;
      min-width: 1em;
    }
    /* LAST-2 COLUMN: HOSTNAME
    table.editor td:nth-last-child(3) {
      padding-left: 2px;
    }*/
    .noPad {
      padding: 0;
    }
    .padLeft {
      padding-left: 2px;
    }

    textarea.textarea {
      width: 100% !important;
      min-height: 100%;
      height: 6em;
      border-width: 1px 0 0 0;
      /*border: none;*/
    }

    table.editor input:invalid {
      color: red !important;
      border-radius: 0;
      border-bottom: 1px dotted red !important;
    }

  `;

  const UI_RAW = 'ui-proxy-string-raw';
  const MAX_PORT = 65535;
  const onlyPort = function onlyPort(event) {

    if (!event.ctrlKey && (/^\D$/.test(event.key) || /^\d$/.test(event.key) && parseInt(`${this.value}${event.key}`) > MAX_PORT)) {
      event.preventDefault();
      return false;
    }
    // Digits, Alt, Tab, Enter, etc.
    return true;

  };
  const PROXY_TYPE_LABEL_PAIRS = [['PROXY', 'PROXY/HTTP'],['HTTPS'],['SOCKS4'],['SOCKS5'],['SOCKS']];


  const SwitchButton = (props) =>
    (
      <button
        type="button"
        class={'emoji' + ' ' + scopedCss.export + ' ' + scopedCss.only}
        title={props.title}
        onClick={props.onClick}
      >⇄</button>
    );

  class TabledEditor extends Component {

    constructor(props) {

      super(props);
      this.state = {
        selectedNewType: 'HTTPS',
      };

    }

    handleTypeSelect(that, event) {

      that.setState({
        selectedNewType: event.target.value,
      });

    }

    showInvalidMessage(that, event) {

      that.props.funs.showErrors({message: event.target.validationMessage});

    }

    handleModeSwitch(that) {

      that.props.onSwitch();

    }

    handleAdd(that, event) {

      console.log('ADD');
      const form = event.target;
      const elements = Array.from(form.elements).reduce((acc, el, index) => {

        acc[el.name || index] = el.value;
        el.value = '';
        return acc;

      }, {});
      const type = that.state.selectedNewType;
      const hostname = elements.hostname;
      const port = elements.port;

      console.log('AA', type, hostname, port);
      that.props.updateProxyStringRaw(
        `${that.props.proxyStringRaw} ${type} ${hostname}:${port};`.trim()
      );

    }

    handleSubmit(that, event) {

      console.log('SUB');
      event.preventDefault();
      that.handleAdd(that, event);

    }

    render(props) {

      return (
        <form onSubmit={linkEvent(this, this.handleSubmit)}>
          <table class={scopedCss.editor}>
            <thead>
              <tr>
                <th>протокол</th> <th>домен / IP</th> <th>порт</th> <th>
                  <SwitchButton title="импорт/экспорт" onClick={linkEvent(this, this.handleModeSwitch)}/>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* ADD NEW PROXY STARTS. */}
              <tr class={scopedCss.addPanel}>
                <td>
                  <select reqiured
                    class={scopedCss.noPad}
                    name="proxyType"
                    onChange={linkEvent(this, this.handleTypeSelect)}
                  >
                    {
                      PROXY_TYPE_LABEL_PAIRS.map(
                        ([type, label]) =>
                          (<option value={type} selected={type === this.state.selectedNewType}>
                            {label || type}
                          </option>)
                      )
                    }
                  </select>
                </td>
                <td>
                  {/* LAST-2: HOSTNAME */}
                  <input required
                    class={scopedCss.noPad}
                    placeholder="89.140.125.17"
                    name="hostname"
                    onInvalid={linkEvent(this, this.showInvalidMessage)}
                  />
                </td>
                <td>
                  {/* LAST-1: PORT */}
                  <input required type="number"
                    class={scopedCss.noPad + ' ' + scopedCss.padLeft} style="min-width: 4em"
                    placeholder="9150"
                    min="0" step="1" max={MAX_PORT} pattern="[0-9]{1,5}"
                    name="port"
                    onInvalid={linkEvent(this, this.showInvalidMessage)}
                    onkeydown={onlyPort}
                  />
                </td>
                <td>
                  {/* LAST: ADD BUTTON */}
                  <input
                    type="submit" class={scopedCss.add + ' ' + scopedCss.only}
                    title="Добавить прокси" value="+"
                  />
                </td>
              </tr>
              {/* ADD NEW PROXY ENDS. */}
              {
                this.props.proxyStringRaw.split(/\s*;\s*/g).filter((s) => s).map((proxyAsString) => {

                  const [type, addr] = proxyAsString.trim().split(/\s/);
                  const [hostname, port] = addr.split(':');
                  return (
                    <tr class={scopedCss.proxyRow}>
                      <td>{type}</td><td>{hostname}</td><td>{port}</td>
                      <td>
                        <button type="button" title="Повысить приоритет">↑</button>
                        <br/>
                        {/*<input type="submit" title="Удалить прокси" value="X"/>*/}
                      </td>
                    </tr>
                  );

                })
              }
            </tbody>
          </table>
        </form>
      );
    }
  }

  class ExportsEditor extends Component {

    constructor(props) {
      super(props);
      this.state = {
        ifHasErrors: false,
        stashedExports: false,
      };
    }

    getErrorsInStashedExports() {

      if(this.state.stashedExports === false) {
        return;
      }
      const errors = this.state.stashedExports.trim()
        .replace(/#.*$/mg, '')
        .split(/\s*;\s*/)
        .filter((s) => s)
        .map((proxyAsString) => {

          const [rawType, addr, ...rest] = proxyAsString.split(/\s+/);
          if (rest && rest.length) {
            return new Error(
              `"${rest.join(', ')}" кажется мне лишним. Вы забыли ";"?`
            );
          }
          const knownTypes = PROXY_TYPE_LABEL_PAIRS.map(([type, label]) => type);
          if( !knownTypes.includes(rawType.toUpperCase()) ) {
            return new Error(
              `Неверный тип ${rawType}. Известные типы: ${knownTypes.join(', ')}.`
            );
          }
          if (!(addr && /^[^:]+:\d+$/.test(addr))) {
            return new Error(
              `Адрес прокси "${addr || ''}" не соответствует формату "<домен_или_IP>:<порт_из_цифр>".`
            );
          }
          const [hostname, rawPort] = addr.split(':');
          const port = parseInt(rawPort);
          if (port < 0 || port > 65535) {
            return new Error(
              `Порт "${rawPort}" должен быть целым числом от 0 до 65535.`
            );
          }
          return false;

        }).filter((e) => e);
      return errors && errors.length && errors;

    }

    handleModeSwitch(that, event) {

      if (that.state.stashedExports !== false) {
        const errors = that.getErrorsInStashedExports();
        if (errors) {
          that.setState({ifHasErrors: true});
          that.props.funs.showErrors(...errors);
          return;
        }
        that.props.updateProxyStringRaw(that.state.stashedExports);
      }
      that.setState({
        stashedExports: false,
        ifHasErrors: false,
      });
      that.props.onSwitch();

    }

    handleTextareaChange(that, event) {

      let newVal = event.target.value.trim();
      if (newVal && !newVal.endsWith(';')) {
        newVal += ';';
      }
      that.setState({stashedExports: newVal});

    }

    handleSubmit(that, event) {

      event.preventDefault();
      this.handleModeSwitch(this, event);

    }

    render(props) {

      return (
        <form onSubmit={linkEvent(this, this.handleSubmit)}>
          <table class={scopedCss.editor}>
            <thead>
              <tr>
                <th style="width: 100%">
                  {
                    this.state.stashedExports === false
                      ? 'Жду изменений...'
                      : (this.state.ifHasErrors
                          ? (<span><a href="">Сбросьте изменения</a> или поправьте</span>)
                          : (<a href="">Сбросить изменения</a>)
                        )
                  }
                </th>
                <th style="width: 1%">
                  <SwitchButton title="Переключиться в табличный режим" onClick={linkEvent(this, this.handleModeSwitch)}/>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2"><textarea
                    class={scopedCss.textarea}
                    spellcheck={false}
                    placeholder={`
SOCKS5 localhost:9050; # Tor Expert
SOCKS5 localhost:9150; # Tor Browser
HTTPS 11.22.33.44:3143;
PROXY foobar.com:8080; # Not HTTP!`.trim()}
                    onChange={linkEvent(this, this.handleTextareaChange)}
                    value={
                      this.state.stashedExports !== false
                        ? this.state.stashedExports
                        : (this.props.proxyStringRaw || '').replace(/\s*;\s*/g, ';\n')
                    }
                  /></td>
              </tr>
            </tbody>
          </table>
        </form>
      );

    }

  }

  return class ProxyEditor extends Component {

    constructor(props) {

      super(props);
      this.state = {
        proxyStringRaw: localStorage.getItem(UI_RAW) || '',
        ifExportsMode: false,
      };
      this.handleSwitch = () => this.setState({ifExportsMode: !this.state.ifExportsMode});
      
    }

    preventLostOfChanges() {

      window.onbeforeunload = () => true; // TODO

    }

    render(originalProps) {

      const props = Object.assign({
        proxyStringRaw: this.state.proxyStringRaw,
        onSwitch: this.handleSwitch,
        updateProxyStringRaw: (newVal) => this.setState({proxyStringRaw: newVal}),
      }, originalProps);
      
      return this.state.ifExportsMode
        ? createElement(ExportsEditor, props)
        : createElement(TabledEditor, props);

    };
  }

};
