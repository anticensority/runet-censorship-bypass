'use strict';

chrome.runtime.getBackgroundPage( (backgroundPage) => {

  const getStatus = () => document.querySelector('#status');

  const setStatusTo = (msg) => {

    const status = getStatus();
    if (msg) {
      status.classList.remove('off');
      status.innerHTML = msg;
    }
    else {
      status.classList.add('off');
    }

  };

  const antiCensorRu = backgroundPage.antiCensorRu;

  // SET DATE

  const setDate = () => {

    let dateForUser = 'никогда';
    if( antiCensorRu.lastPacUpdateStamp ) {
      let diff = Date.now() - antiCensorRu.lastPacUpdateStamp;
      let units = ' мс';
      const gauges = [
        [1000, ' с'],
        [60, ' мин'],
        [60, ' ч'],
        [24, ' дн'],
        [7, ' недель'],
        [4, ' месяцев'],
        [12, ' г']
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

    const dateElement = document.querySelector('.update-date');
    dateElement.innerText = dateForUser;
    dateElement.title = new Date(antiCensorRu.lastPacUpdateStamp).toLocaleString('ru-RU');

  };

  setDate();
  chrome.storage.onChanged.addListener( (changes) => changes.lastPacUpdateStamp.newValue && setDate() );

  // CLOSE BUTTON

  document.querySelector('.close-button').onclick = () => window.close();

  // RADIOS

  const currentRadio = () => {

    const id = antiCensorRu.currentPacProviderKey || 'none';
    return document.querySelector('#'+id);

  }
  const checkChosenProvider = () => currentRadio().checked = true;
  const triggerChosenProvider = () => currentRadio().click();

  const ul = document.querySelector('#list-of-providers');
  const _firstChild = ul.firstChild;
  for( const providerKey of Object.keys(antiCensorRu.pacProviders).sort() ) {
    const li = document.createElement('li');
    li.innerHTML = '<input type="radio" name="pacProvider" id="' + providerKey + '"> <label for="' + providerKey + '">'+providerKey + '</label> <a href class="link-button checked-radio-panel">[обновить]</a>';
    li.querySelector('.link-button').onclick = () => { triggerChosenProvider(); return false; };
    ul.insertBefore( li, _firstChild );
  }

  const radios = [].slice.apply( document.querySelectorAll('[name=pacProvider]') );
  for(const radio of radios) {
    radio.onclick = function(event) {

      const pacKey = event.target.id;
      if (pacKey === 'none') {
        return antiCensorRu.clearPac();
      }

      const enableDisableInputs = function () {

        const inputs = document.querySelectorAll('input');
        for ( let i = 0; i < inputs.length; i++ ) {
          inputs[i].disabled = !inputs[i].disabled;
        }

      }

      enableDisableInputs();
      setStatusTo('Установка...');
      antiCensorRu.installPac(pacKey, (err) => {

        backgroundPage.console.log('Popup callback...');
        if (!err) {
          setStatusTo('PAC-скрипт установлен.');
          checkChosenProvider();
        }
        else {
          const ifNotCritical = err.clarification && err.clarification.ifNotCritical;

          let message = '';
          let clarification = err.clarification;
          do {
            message = message +' '+ (clarification && clarification.message || err.message || '');
            clarification = clarification && clarification.prev;
          } while( clarification );
          message = message.trim();
          setStatusTo(
`<span style="color:red">${ifNotCritical ? 'Некритичная ошибка.' : 'Ошибка!'}</span>
<br/>
<span style="font-size: 0.9em; color: darkred">${message}</span>
<button>Сообщить автору</button><br/>
<a href class="link-button">[Ещё&nbsp;подробнее]</a>`
          );
          getStatus().querySelector('.link-button').onclick = function() {

            const div = document.createElement('div');
            div.innerHTML = `
Более подробную информацию можно узнать из логов фоновой страницы:<br/>
<a href="chrome://extensions?id=${chrome.runtime.id}" data-in-bg="true">chrome://extensions</a> › Это расширение › Отладка страниц: фоновая страница › Console (DevTools)
<br>
Ещё: ${JSON.stringify({err: err, stack: err.stack})}
`;
            getStatus().replaceChild(div, this);
            return false;

          };
        }
        enableDisableInputs();
      });
      return false;
    }
  }

  setStatusTo('');
  checkChosenProvider();
  if (antiCensorRu.ifFirstInstall) {
    triggerChosenProvider();
  }

});
