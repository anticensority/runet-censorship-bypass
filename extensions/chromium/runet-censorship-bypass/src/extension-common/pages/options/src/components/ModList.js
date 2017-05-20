import Inferno from 'inferno';
import Component from 'inferno-component';
import createElement from 'inferno-create-element';

import getInfoLi from './InfoLi';
import getApplyMods from './ApplyMods';

export default function getModList(theState) {

  const InfoLi = getInfoLi(theState);
  const ApplyMods = getApplyMods(theState);

  return class ModList extends Component {

    constructor(props) {

      super(props);
      this.state = {
        orderedConfigs: props.apis.pacKitchen.getOrderedConfigs(props.category),
        ifChangesStashed: false,
      };

    } 

    render(props) {

      return (
        <section>
          <ul onChange={() => { this.setState({ifChangesStashed: true}); }}>
          {
            this.state.orderedConfigs.map((conf, index) =>
              <InfoLi conf={conf} type='checkbox' checked={conf.value} key={index} onClick={() => {

                const newConfigs = this.state.orderedConfigs.map((c) => Object.assign({}, c)); // Shallow.
                newConfigs[index].value = !newConfigs[index].value;
                this.setState({orderedConfigs: newConfigs});

              }}>{props.modToChildren && props.modToChildren[conf.key]}</InfoLi>
            )
          }
          </ul>
          {createElement(ApplyMods, Object.assign({}, props,
            {
              disabled: !this.state.ifChangesStashed || props.ifInputsDisabled,
              onClick: () => {

                const oldMods = this.props.apis.pacKitchen.getPacMods();
                const newMods = this.state.orderedConfigs.reduce((acc, conf) => {

                  acc[conf.key] = conf.value;
                  return acc;

                }, oldMods);

                this.props.funs.conduct(
                  'Применяем настройки...',
                  (cb) => this.props.apis.pacKitchen.keepCookedNowAsync(newMods, cb),
                  'Настройки применены.',
                  () => this.setState({ifChangesStashed: false})
                );

              }
            }
          ))}
        </section>
      );

    }

  };

};
