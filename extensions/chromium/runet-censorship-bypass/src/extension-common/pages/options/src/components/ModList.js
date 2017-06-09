import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import createElement from 'inferno-create-element';
import getInfoLi from './InfoLi';

export default function getModList(theState) {

  const InfoLi = getInfoLi(theState);

  return class ModList extends Component { 

    constructor(props) {

      super(props);
      this.state= {
        checks: props.orderedConfigs.map((mod) => Boolean(mod.value)),
      };

    }

    handleCheck(confMeta, ifChecked) {

      this.setState({
        checks: this.state.checks.map(
          (ch, i) => i === confMeta.index ? ifChecked : ch
        )
      });
      if (ifChecked === false || !confMeta.ifChild) {
        this.handleNewValue(confMeta, ifChecked);
      }

    }

    handleNewValue({ conf, index }, newValue) {

      this.props.onConfChanged({
        targetConf: conf,
        targetIndex: index,
        newValue: newValue,
      });

    }

    render(props) {

      return (
        <ol>
        {
          props.orderedConfigs.map((conf, index) => {

            const ifMayHaveChild = props.childrenOfMod && props.childrenOfMod[conf.key];
            const confMeta = { conf, index, ifChild: ifMayHaveChild };

            const child = ifMayHaveChild && this.state.checks[index]
              && createElement(
                props.childrenOfMod[conf.key],
                Object.assign({}, props, {conf, onNewValue: (newValue) => this.handleNewValue(confMeta, newValue)})
              );

            return (<InfoLi
              conf={conf}
              type='checkbox'
              name={props.name}
              checked={this.state.checks[index]}
              key={index}
              onChange={(event) => this.handleCheck(confMeta, event.target.checked)}
              ifInputsDisabled={props.ifInputsDisabled}
            >
              {child}
            </InfoLi>);

          })
        }
        </ol>
      );

    }

  }

};
