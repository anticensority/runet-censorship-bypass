import Inferno from 'inferno';
import createElement from 'inferno-create-element';
import css from 'csjs-inject';

import getInfoLi from './InfoLi';
import getExcEditor from './ExcEditor';

export default function getExceptions(theState) {

  const scopedCss = css`

    #excMods {
      padding-top: 1em;
    }
    #excMods input#mods-if-mind-exceptions:not(:checked) + .label-container label {
      color: red;
    }

  `;

  const InfoLi = getInfoLi(theState);
  const ExcEditor = getExcEditor(theState);

  return function Exceptions(props) {

      const applyMods = (newMods) => {

        props.apis.pacKitchen.keepCookedNowAsync(newMods, (err, ...warns) =>
          err
            ? props.funs.showErrors(err, ...warns)
            : props.funs.setStatusTo('Применено.')
        );

      };

      return (
        <div>
          {createElement(ExcEditor, props)}
          <ul id="excMods">
            {
              props.apis.pacKitchen.getOrderedConfigs('exceptions').map((conf) => {

                return <InfoLi
                  conf={conf}
                  type="checkbox"
                  checked={conf.value}
                  disabled={props.ifInputsDisabled}
                  onClick={(evt) => {

                    const oldMods = props.apis.pacKitchen.getPacMods();
                    oldMods[conf.key] = !conf.value;
                    applyMods(oldMods);

                  }}
                />;

                //const key = conf.key;
                //modKeyToLi[key] = li;

              })
            }
          </ul>
        </div>
      );

  };

};
