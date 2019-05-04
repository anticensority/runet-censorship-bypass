import Inferno from 'inferno';
import Component from 'inferno-component';
import createElement from 'inferno-create-element';
import css from 'csjs-inject';

import getLastUpdateDate from './LastUpdateDate';
import getInfoLi from './InfoLi';

export default function getPacChooser(theState) {

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
      margin-left: 0.5em;
    }
    input:checked + div .updateButton {
      visibility: inherit;
    }
    label[for="onlyOwnSites"] + .updateButton,
    label[for="none"] + .updateButton {
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

  const LastUpdateDate = getLastUpdateDate(theState);
  const InfoLi = getInfoLi(theState);

  return class PacChooser extends Component {

    constructor(props) {

      super(props);
      this.state = {
        chosenPacName: 'none',
      };

      this.updatePac = function updatePac(onSuccess) {
        props.funs.conduct(
          'Обновляем...',
          (cb) => theState.apis.antiCensorRu.syncWithPacProviderAsync(cb),
          'Обновлено.',
          onSuccess
        );
      };
      this.radioClickHandler = this.radioClickHandler.bind(this);
      this.updateClickHandler = this.updateClickHandler.bind(this);

    }

    getCurrentProviderId() {

      return theState.apis.antiCensorRu.getCurrentPacProviderKey() || 'none';

    }

    updateClickHandler(event) {

      event.preventDefault();
      this.updatePac();

    }

    radioClickHandler(event) {

      const checkChosenProvider = () =>
        this.setState({ chosenPacName: this.getCurrentProviderId() });

      const pacKey = event.target.id;
      if (
        pacKey === (
          theState.apis.antiCensorRu.getCurrentPacProviderKey() || 'none'
        )
      ) {
        return false;
      }
      if (pacKey === 'none') {
        this.props.funs.conduct(
          'Отключение...',
          (cb) => theState.apis.antiCensorRu.clearPacAsync(cb),
          'Отключено.',
          () => this.setState({ chosenPacName: 'none' }),
          checkChosenProvider
        );
      } else {
        this.props.funs.conduct(
          'Установка...',
          (cb) => theState.apis.antiCensorRu.installPacAsync(pacKey, cb),
          'PAC-скрипт установлен.',
          checkChosenProvider
        );
      }
      return false;

    }

    render(props) {

      const iddyToCheck = this.getCurrentProviderId();
      return (
        <div>
          {props.flags.ifInsideOptionsPage && (<header>{chrome.i18n.getMessage('PAC_script')}:</header>)}
          <ul>
            {
              [...theState.apis.antiCensorRu.getSortedEntriesForProviders(), {key: 'none', label: chrome.i18n.getMessage('Disable')}].map((provConf) =>
                (<InfoLi
                  onClick={this.radioClickHandler}
                  conf={provConf}
                  type="radio"
                  name="pacProvider"
                  checked={iddyToCheck === provConf.key}
                  ifInputsDisabled={props.ifInputsDisabled}
                  nodeAfterLabel={<a href="" class={scopedCss.updateButton} onClick={this.updateClickHandler}>[{chrome.i18n.getMessage('update')}]</a>}
                />)
              )
            }
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

    componentDidMount() {

      if (theState.apis.antiCensorRu.ifFirstInstall) {
        this.updatePac();
      }

    }

  };

};
