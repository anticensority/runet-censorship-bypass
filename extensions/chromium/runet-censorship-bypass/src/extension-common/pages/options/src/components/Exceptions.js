import Inferno from 'inferno';
import createElement from 'inferno-create-element';
import css from 'csjs-inject';

import getInfoLi from './InfoLi';
import getExcEditor from './ExcEditor';

export default function getExceptions(theState) {

  const scopedCss = css`

    .excMods {
      padding-top: 1em;
    }
    .excMods input#mods-ifMindExceptions:not(:checked) + * > label {
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

      return props.flags.ifInsideOptionsPage
        ? (
        <div class="nowrap">
          Редактор исключений доступен только для <a href="chrome://newtab">вкладок</a>.
        </div>)
        :
        (<div>
          {createElement(ExcEditor, props)}
          <ul class={scopedCss.excMods}>
            {
              props.apis.pacKitchen.getOrderedConfigs('exceptions').map((conf) => {

                return <InfoLi
                  type="checkbox"
                  conf={conf}
                  idPrefix="mods-"
                  checked={conf.value}
                  disabled={props.ifInputsDisabled}
                  onClick={(evt) => {

                    const oldMods = props.apis.pacKitchen.getPacMods();
                    oldMods[conf.key] = !conf.value;
                    applyMods(oldMods);

                  }}
                />;

              })
            }
            <li><input type="checkbox" style="visibility: hidden"/><a href>Смотреть последние ошибки</a></li>
          </ul>
        </div>
      );

  };

};
