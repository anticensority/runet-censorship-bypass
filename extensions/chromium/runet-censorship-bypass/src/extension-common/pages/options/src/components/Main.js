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

    handleModCheck(that, event) {

      const checkbox = event.target;
      const [tCat, tIndex] = [checkbox.dataset.category, parseInt(checkbox.dataset.index)];
      const oldCats = that.state.catToOrderedMods;
      const newCats = Object.keys(that.state.catToOrderedMods).reduce((acc, cat) => {

        if (cat !== tCat) {
          acc[cat] = oldCats[cat];
        } else {
          acc[cat] = oldCats[cat].map(
            (conf, index) => tIndex === index
              ? Object.assign({}, conf, {value: !conf.value})
              : conf
          );
        }
        return acc;

      }, {});
      
      that.setState({ catToOrderedMods: newCats });

    }

    handleModChange(that) {

      that.setState({ifModsChangesStashed: true});

    }

    render(props) {

      const applyModsEl = createElement(ApplyMods, Object.assign({}, props,
        {
          disabled: !this.state.ifModsChangesStashed || props.ifInputsDisabled,
          onClick: linkEvent(this, this.handleModApply),
        }
      ));

      const modsHandlers = {
        onChange: linkEvent(this, this.handleModChange),
        onClick: linkEvent(this, this.handleModCheck),
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
                  customProxyStringRaw: createElement(ProxyEditor),
                },
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
