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

    .tabledEditor, .exportsEditor {
      /* Empty, but not undefined. */
    }

    table.editor ::-webkit-input-placeholder {
      color: #c9c9c9;
    }

    table.editor th.shrink,
    table.editor td.shrink {
      width: 1%;
    }

    table.editor td, table.editor th {
      border: 1px solid #ccc;
      text-align: left;
      height: 100%;
    }

    table.editor input,
    table.editor button,
    table.editor select
    {
      min-width: 0;
      min-height: 0;
      height: 100%;
    }

    /* ADD PANEL */
    table.editor tr.addPanel td,
    table.editor tr.addPanel td input
    {
      padding: 0;
    }
    table.editor tr.addPanel td > select[name="newProxyType"],
    table.editor tr.addPanel td:nth-last-child(2) input /* PORT */
    {
      font-size: 0.9em;
    }
    table.editor tr.addPanel td:nth-last-child(2) /* PORT */
    {
      min-width: 4em;
    }
    /* PROXY ROW */
    table.editor tr.proxyRow td:nth-child(2), /* type */
    table.editor tr.proxyRow td:nth-child(4)  /* port */
    {
      text-align: center;
    }
    table.editor tr.proxyRow input[name="crededHostname"] {
      padding: 0;
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
      /*padding-right: 2px;*/
    }

    /* LAST COLUMN: BUTTONS */
    table.editor tr > *:nth-last-child(1), /* Buttons */
    table.tabledEditor tr > *:nth-last-child(2), /* Port */
    table.tabledEditor tr.proxyRow > td:first-child /* Type */
    {
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
      padding-left: 2px !important;
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
  const splitBySemi = (proxyString) => proxyString.replace(/#.*$/mg, '').trim().split(/\s*;\s*/g).filter((s) => s);
  const joinBySemi = (strs) => strs.join(';\n') + ';';
  const normalizeProxyString = (str) => joinBySemi(splitBySemi(str));

  const PROXY_TYPE_LABEL_PAIRS = [['PROXY', 'PROXY/HTTP'],['HTTPS'],['SOCKS4'],['SOCKS5'],['SOCKS']];


  const SwitchButton = (props) =>
    (
      <button
        type="button" disabled={props.ifInputsDisabled}
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

      const form = event.target;
      const elements = Array.from(form.elements).reduce((acc, el, index) => {

        acc[el.name || index] = el.value;
        el.value = '';
        return acc;

      }, {});
      const type = that.state.selectedNewType;
      const crededHostname = elements.newHostname;
      const port = elements.newPort;

      const newValue = `${that.props.proxyStringRaw}; ${type} ${crededHostname}:${port}`
        .trim().replace(/(\s*;\s*)+/, '; ');
      that.props.setProxyStringRaw(true, newValue);

    }

    handleDelete(that, {proxyAsString, index}) {

      event.preventDefault();
      const proxyStrings = splitBySemi(that.props.proxyStringRaw);
      proxyStrings.splice(index, 1);

      that.props.setProxyStringRaw(true, joinBySemi(proxyStrings) );

    }

    raisePriority(that, {proxyAsString, index}) {

      event.preventDefault();
      if (index < 1) {
        return;
      }
      const proxyStrings = splitBySemi(that.props.proxyStringRaw);
      proxyStrings.splice(index - 1, 2, proxyStrings[index], proxyStrings[index-1]);

      that.props.setProxyStringRaw(true, joinBySemi(proxyStrings) );

    }

    handleSubmit(that, event) {

      event.preventDefault();
      that.handleAdd(that, event);

    }

    render(props) {

      return (
        <form onSubmit={linkEvent(this, this.handleSubmit)}>
          <table class={scopedCss.editor + ' ' + scopedCss.tabledEditor}>
            <thead>
              <tr>
                <th colspan="2" class={scopedCss.shrink}>протокол</th>
                <th>домен / IP</th>
                <th class={scopedCss.shrink}>порт</th>
                <th>
                  <SwitchButton title="импорт/экспорт" onClick={linkEvent(this, this.handleModeSwitch)}/>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* ADD NEW PROXY STARTS. */}
              <tr class={scopedCss.addPanel}>
                <td colspan="2">
                  <select reqiured
                    class={scopedCss.noPad}
                    name="newProxyType"
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
                  <input required disabled={props.ifInputsDisabled}
                    class={scopedCss.noPad}
                    placeholder="89.140.125.17"
                    name="newHostname"
                    onInvalid={linkEvent(this, this.showInvalidMessage)}
                    tabindex="1"
                  />
                </td>
                <td>
                  {/* LAST-1: PORT */}
                  <input required type="number" disabled={props.ifInputsDisabled}
                    class={scopedCss.noPad + ' ' + scopedCss.padLeft + ' ' + scopedCss.only}
                    placeholder="9150"
                    min="0" step="1" max={MAX_PORT} pattern="[0-9]{1,5}"
                    name="newPort"
                    onInvalid={linkEvent(this, this.showInvalidMessage)}
                    onkeydown={onlyPort}
                    tabindex="2"
                  />
                </td>
                <td>
                  {/* LAST: ADD BUTTON */}
                  <input type="submit" disabled={props.ifInputsDisabled}
                    class={scopedCss.add + ' ' + scopedCss.only}
                    title="Добавить прокси" value="+"
                  />
                </td>
              </tr>
              {/* ADD NEW PROXY ENDS. */}
              {
                splitBySemi(this.props.proxyStringRaw).map((proxyAsString, index) => {

                  const [type, crededAddr] = proxyAsString.trim().split(/\s+/);
                  let [creds, addr] = crededAddr.split('@');
                  if (!addr) {
                    addr = creds;
                    creds = '';
                  }
                  const [hostname, port] = addr.split(':');
                  return (
                    <tr class={scopedCss.proxyRow}>
                      <td>
                        <button type="button" disabled={props.ifInputsDisabled}
                          class={scopedCss.only} title="Удалить"
                          onClick={() => this.handleDelete(this, {proxyAsString, index})}
                        >X</button>
                      </td>
                      <td>{type}</td>
                      <td><input value={`${creds && `${creds}@`}${hostname}`} name="crededHostname" readonly/></td>
                      <td>{port}</td>
                      <td>
                        <button type="button" disabled={props.ifInputsDisabled}
                          class={scopedCss.only} title="Повысить приоритет"
                          onClick={() => this.raisePriority(this, {proxyAsString, index})}
                        >▲</button>
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

  const getInitState = () => ({
    ifHasErrors: false,
    stashedExports: false,
  });

  class ExportsEditor extends Component {

    constructor(props) {

      super(props);
      this.state = getInitState();
      this.resetState = linkEvent(this, this.resetState);
      this.showApply =  linkEvent(undefined,  props.setProxyStringRaw);

    }

    resetState(that, event) {

      that.props.setProxyStringRaw(true, that.props.proxyStringRaw);
      if (that.state.ifHasErrors) {
        that.props.funs.setStatusTo(''); // Clear errors
      }
      that.setState(getInitState());
      event.preventDefault();

    }

    getErrorsInStashedExports() {

      if(this.state.stashedExports === false) {
        return;
      }
      const errors = splitBySemi(this.state.stashedExports)
        .map((proxyAsString) => {

          const [rawType, crededAddr, ...rest] = proxyAsString.split(/\s+/);
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
          if (!(crededAddr && /^(?:[^@]+@)?[^:]+:\d+$/.test(crededAddr))) {
            return new Error(
              `Адрес прокси "${crededAddr || ''}" не соответствует формату "<опц_логин>:<опц_пароль>@<домен_или_IP>:<порт_из_цифр>".`
            );
          }
          let [creds, addr] = crededAddr.split('@');
          if (!addr) {
            addr = creds;
            creds = '';
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

      if (that.state.ifHasErrors) {
        return;
      }
      that.props.onSwitch();

    }

    handleTextareaChange(that, event) {

      that.setState({
        stashedExports: normalizeProxyString(event.target.value),
      });
      const errors = that.getErrorsInStashedExports();
      if (errors) {
        that.props.setProxyStringRaw(false);
        that.setState({ifHasErrors: true});
        that.props.funs.showErrors(...errors);
        return;
      }
      // No errors.
      that.props.setProxyStringRaw(true, that.state.stashedExports);
      that.setState({
        stashedExports: false,
        ifHasErrors: false,
      });

    }

    handleSubmit(that, event) {

      event.preventDefault();
      this.handleModeSwitch(this, event);

    }

    render(props) {

      return (
        <form onSubmit={linkEvent(this, this.handleSubmit)}>
          <table class={scopedCss.editor + ' ' + scopedCss.exportsEditor}>
            <thead>
              <tr>
                <th style="width: 100%">
                  {
                    this.state.stashedExports === false
                      ? 'Комментарии вырезаются!'
                      : (this.state.ifHasErrors
                          ? (<span><a href="" onClick={this.resetState} style="color: red">Сбросьте изменения</a> или поправьте</span>)
                          : (<a href="" onClick={this.resetState}>Сбросить изменения</a>)
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
                    onFocus={this.showApply}
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

  const migrate = (proxyStringRaw) => {
    /* In the old format \n\r? could be used as a separator. */

    return proxyStringRaw
      .replace(/#.*$/mg, '') // Strip comments.
      .replace(/[^\S\r\n]*DIRECT[^\S\r\n]*/g, '') // Remove DIRECT from old versions.
      .split( /(?:[^\S\r\n]*(?:;|\r?\n)+[^\S\r\n]*)+/g )
      .map( (p) => p.trim() )
      .filter((p) => p)
      .join(';\n');

  };

  let waitingTillMount = [];

  return class ProxyEditor extends Component {

    constructor(props/*{ conf, onNewValue, ifInputsDisabled }*/) {

      super(props);
      const oldValue = typeof props.conf.value === 'string' && props.conf.value;
      const newValue = migrate(oldValue || localStorage.getItem(UI_RAW) || '');
      this.state = {
        proxyStringRaw: newValue,
        ifExportsMode: false,
        ifValid: true,
      };
      this.handleSwitch = () => this.setState({ifExportsMode: !this.state.ifExportsMode});
      waitingTillMount.push(newValue); // Wait till mount or eat bugs.

    }

    componentDidMount() {

      if (waitingTillMount.length) {
        this.mayEmitNewValue(this.props.value, waitingTillMount.pop());
        waitingTillMount = [];
      }

    }

    componentDidUnmount() {

      waitingTillMount = [];

    }

    mayEmitNewValue(oldValue, newValue, ifValidityChanged) {

      if ( // Reject: 1) both `false` OR 2) both `===`.
        ifValidityChanged || ( Boolean(oldValue) || Boolean(newValue) ) && oldValue !== newValue
      ) {
        this.props.onNewValue(this.state.ifValid, newValue);
      }

    }

    render(originalProps) {

      const props = Object.assign({
        proxyStringRaw: this.state.proxyStringRaw,
        onSwitch: this.handleSwitch,
        setProxyStringRaw: (ifValid, newValue) => {

          const ifValidityChanged = this.state.ifValid !== ifValid;
          if (!ifValid) {
            if (ifValidityChanged || ifValid === undefined) {
              this.props.onNewValue(ifValid);
              this.setState({ ifValid });
            }
            return;
          }

          const oldValue = this.state.proxyStringRaw;
          localStorage.setItem(UI_RAW, newValue);
          this.setState({proxyStringRaw: newValue, ifValid});
          this.mayEmitNewValue(oldValue, newValue, ifValidityChanged);

        },
      }, originalProps);

      return this.state.ifExportsMode
        ? createElement(ExportsEditor, props)
        : createElement(TabledEditor, props);

    };
  }

};
