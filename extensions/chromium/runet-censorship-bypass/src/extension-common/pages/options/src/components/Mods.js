import Inferno from 'inferno';
import Component from 'inferno-component';
import createElement from 'inferno-create-element';
import css from 'csjs-inject';

import getInfoLi from './InfoLi';
import getApplyMods from './ApplyMods';

export default function getMods(theState) {

  const InfoLi = getInfoLi(theState);
  const ApplyMods = getApplyMods(theState);

  return class Mods extends Component {

    getOrderedConfigs() {

      return this.props.apis.pacKitchen.getOrderedConfigs('general');

    }

    constructor(props) {

      super(props);
      this.state = {
        orderedConfigs: this.getOrderedConfigs(),
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

              }}/>
            )
          }
          </ul>
          {createElement(ApplyMods, Object.assign({}, props,
            {
              disabled: !this.state.ifChangesStashed,
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
