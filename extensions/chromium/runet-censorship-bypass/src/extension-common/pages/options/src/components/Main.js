import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import createElement from 'inferno-create-element';

import getTabPanel from './TabPanel';
import getPacChooser from './PacChooser';
import getExceptions from './Exceptions';
import getModList from './ModList';
import getProxyEditor from './ProxyEditor';
import getApplyMods from './ApplyMods';
import getNotifications from './Notifications';

export default function getMain(theState) {

  const TabPanel = getTabPanel(theState);

  const PacChooser = getPacChooser(theState);
  const Exceptions = getExceptions(theState);
  const ModList = getModList(theState);
  const ProxyEditor = getProxyEditor(theState);
  const ApplyMods = getApplyMods(theState);
  const Notifications = getNotifications(theState);

  //const addChecks = (arr) => arr.map( (conf) => Object.assign(conf, {ifChecked: Boolean(conf.value)}) );

  const checksName = 'pacMods';

  return class Main extends Component {

    constructor(props) {

      super(props);
      this.state = {
        ifModsChangesStashed: false,
        catToOrderedMods: {
          'general': props.apis.pacKitchen.getOrderedConfigs('general'),
          'ownProxies': props.apis.pacKitchen.getOrderedConfigs('ownProxies'),
        },
      };
      this.handleModChange = this.handleModChange.bind(this);

    }

    getAllMods() {

      return [].concat(...Object.keys(this.state.catToOrderedMods).map((cat) =>
        this.state.catToOrderedMods[cat]
      ))

    }

    handleModApply(that) {

      const modsMutated = that.props.apis.pacKitchen.getPacMods();
      const newMods = that.getAllMods().reduce((_, conf) => {

        modsMutated[conf.key] = conf.value;
        return modsMutated;

      });
      that.props.funs.conduct(
        'Применяем настройки...',
        (cb) => that.props.apis.pacKitchen.keepCookedNowAsync(newMods, cb),
        'Настройки применены.',
        () => that.setState({ifModsChangesStashed: false})
      );

    }

    handleModChange({targetConf, targetIndex, newValue}) {

      const oldCats = this.state.catToOrderedMods;
      const newCats = Object.keys(this.state.catToOrderedMods).reduce((acc, cat) => {

        if (cat !== targetConf.category) {
          acc[cat] = oldCats[cat];
        } else {
          acc[cat] = oldCats[cat].map((conf, index) => {

            if (targetIndex !== index) {
              return conf;
            }
            return Object.assign({}, conf, {
              value: newValue
            });

          });
        }
        return acc;

      }, {});
      
      this.setState({
        catToOrderedMods: newCats,
        ifModsChangesStashed: true,
      });

    }

    render(props) {

      const applyModsEl = createElement(ApplyMods, Object.assign({}, props,
        {
          ifInputsDisabled: !this.state.ifModsChangesStashed || props.ifInputsDisabled,
          onClick: linkEvent(this, this.handleModApply),
        }
      ));

      const modsHandlers = {
        onConfChanged: this.handleModChange,
      };

      return createElement(TabPanel, {
        tabs: [
          {
            label: 'PAC-скрипт',
            content: createElement(PacChooser, props),
            key: 'pacScript',
          },
          {
            label: 'Исключения',
            content: createElement(Exceptions, props),
            key: 'exceptions',
          },
          {
            label: 'Свои прокси',
            content: createElement(
              ModList,
              Object.assign({}, props, {
                orderedConfigs: this.state.catToOrderedMods['ownProxies'],
                childrenOfMod: {
                  customProxyStringRaw: ProxyEditor,
                },
                name: checksName,
              }, modsHandlers)
            ),
            key: 'ownProxies',
          },
          {
            label: 'Модификаторы',
            content: createElement(
              ModList,
              Object.assign({}, props, {
                orderedConfigs: this.state.catToOrderedMods['general'],
                name: checksName,
              }, modsHandlers)
            ),
            key: 'mods',
          },
          {
            content: applyModsEl,
            key: 'applyMods',
          },
          {
            label: 'Уведомления',
            content: createElement(Notifications, props),
            key: 'notifications',
          },
        ],
        alwaysShownWith: {
          'applyMods': ['ownProxies', 'mods'],
        },
      });

    }

  }

};
