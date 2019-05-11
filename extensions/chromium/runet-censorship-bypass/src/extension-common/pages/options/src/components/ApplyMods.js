import Inferno, { linkEvent } from 'inferno';

export default function getApplyMods(theState) {

  const resetMods = function resetMods(props) {

    const ifSure = props.bgWindow.confirm('Сбросить все модификаторы и ИСКЛЮЧЕНИЯ?');
    if (!ifSure) {
      return false;
    }
    props.funs.conduct(
      'Сбрасываем...',
      (cb) => {

        props.apis.pacKitchen.resetToDefaults();
        props.bgWindow.utils.fireRequest('ip-to-host-reset-to-defaults', cb);
        window.localStorage.clear();

      },
      'Откройте окно заново для отображения эффекта.',
      () => window.close()
    );

  }

  return function ApplyMods(props) {

    return (
      <section class="controlRow horFlex" style="margin-top: 1em">
        <input type="button" value="Применить" disabled={props.ifInputsDisabled} onClick={props.onClick}/>
        <a href="" onClick={linkEvent(props, resetMods)}>К изначальным!</a>
      </section>
    );

  };

};
