import Inferno from 'inferno';
import Component from 'inferno-component';
import createElement from 'inferno-create-element';
import css from 'csjs-inject';

import getInfoLi from './InfoLi';

export default function getPacChooser(...args) {

  const scopedCss = css`
    /* OTHER VERSION */

    .otherVersion {
      font-size: 1.7em;
      color: var(--ribbon-color);
      margin-left: 0.1em;
    }
    .otherVersion:hover {
      text-decoration: none;
    }
    .fullLineHeight,
    .fullLineHeight * {
      line-height: 100%;
    }

    /* TAB_1: PAC PROVIDER */

    .updateButton {
      visibility: hidden;
    }
    input:checked + div .updateButton {
      visibility: inherit;
    }
    label[for="onlyOwnSites"] + .updateButton {
      display: none;
    }
    #none:checked + div label[for="none"] {
      color: red;
    }

    #updateMessage {
      white-space: nowrap;
      margin-top: 0.5em;
    }

  `;

  class LastUpdateDate extends Component {

    constructor(props) {

      super(props);
      chrome.storage.onChanged.addListener(
        (changes) => changes.lastPacUpdateStamp.newValue && this.forceUpdate()
      );

    }

    getDate(antiCensorRu) {

      let dateForUser = 'никогда';
      if( antiCensorRu.lastPacUpdateStamp ) {
        let diff = Date.now() - antiCensorRu.lastPacUpdateStamp;
        let units = 'мс';
        const gauges = [
          [1000, 'с'],
          [60, 'мин'],
          [60, 'ч'],
          [24, 'дн'],
          [7, ' недель'],
          [4, ' месяцев'],
        ];
        for(const g of gauges) {
          const diffy = Math.floor(diff / g[0]);
          if (!diffy)
            break;
          diff = diffy;
          units = g[1];
        }
        dateForUser = diff + units + ' назад';
      }
      return {
        text: `${dateForUser} / ${antiCensorRu.pacUpdatePeriodInMinutes/60}ч`,
        title: new Date(antiCensorRu.lastPacUpdateStamp).toLocaleString('ru-RU'),
      };

    }

    render(props) {

      const date = this.getDate(props.apis.antiCensorRu);
      return (<div>Обновлялись: <span class="updateDate" title={date.title}>{ date.text }</span></div>);

    }

  }

  const InfoLi = getInfoLi(...args);

  return class PacChooser extends Component {

    constructor(props) {

      super();
      this.state = {
        chosenPacName: 'none',
      };

    }

    getCurrentProviderId() {

      return this.props.apis.antiCensorRu.getCurrentPacProviderKey() || 'none';

    }

    radioClickHandler(event) {

      const checkChosenProvider = () => 
        this.setState({ chosenPacName: this.getCurrentProviderId() });

      const pacKey = event.target.id;
      if (
        pacKey === (
          this.props.apis.antiCensorRu.getCurrentPacProviderKey() || 'none'
        )
      ) {
        return false;
      }
      if (pacKey === 'none') {
        this.props.funs.conduct(
          'Отключение...',
          (cb) => this.props.apis.antiCensorRu.clearPacAsync(cb),
          'Отключено.',
          () => this.setState({ chosenPacName: 'none' }),
          checkChosenProvider
        );
      } else {
        this.props.funs.conduct(
          'Установка...',
          (cb) => this.props.apis.antiCensorRu.installPacAsync(pacKey, cb),
          'PAC-скрипт установлен.',
          checkChosenProvider
        );
      }
      return false;

    }

    render(props) {

      const updatePac = function updatePac() {
        props.funs.conduct(
          'Обновляем...',
          (cb) => props.apis.antiCensorRu.syncWithPacProviderAsync(cb),
          'Обновлено.'
        );
      };

      const iddyToCheck = this.getCurrentProviderId();
      return (
        <div>
          {props.flags.ifInsideOptionsPage && (<header>PAC-скрипт:</header>)}
          <ul>
            {
              props.apis.antiCensorRu.getSortedEntriesForProviders().map((provConf) =>
                (<InfoLi
                  onClick={this.radioClickHandler.bind(this)}
                  conf={provConf}
                  type="radio"
                  name="pacProvider"
                  checked={iddyToCheck === provConf.key}
                >
                  &nbsp;<a href="" class={scopedCss.updateButton} onClick={(evt) => { evt.preventDefault(); updatePac(); }}>[обновить]</a>
                </InfoLi>)
              )
            }
            <InfoLi
              onClick={this.radioClickHandler.bind(this)}
              type="radio"
              name="pacProvider"
              conf={{key: 'none', label: 'Отключить'}}
              checked={iddyToCheck === 'none'}
            />
          </ul>
          <div id="updateMessage" class="horFlex" style="align-items: center">
            { createElement(LastUpdateDate, props) }
            <div class={scopedCss.fullLineHeight}>
              {
                props.flags.ifMini
                  ? (<a class={scopedCss.otherVersion + ' emoji'} href="https://rebrand.ly/ac-versions"
                      title="Полная версия">🏋</a>)
                  : (<a class={scopedCss.otherVersion + ' emoji'} href="https://rebrand.ly/ac-versions"
                      title="Версия для слабых машин">🐌</a>)
              }
            </div>
          </div>
        </div>
      );

    }

  };

};
