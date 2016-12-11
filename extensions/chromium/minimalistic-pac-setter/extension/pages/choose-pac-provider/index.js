'use strict';

chrome.runtime.getBackgroundPage( (backgroundPage) =>
  backgroundPage.apis.errorHandlers.installListenersOn(window, 'POPUP', () => {

    const getStatus = () => document.querySelector('#status');

    const setStatusTo = (msg) => {

      const status = getStatus();
      if (msg) {
        status.classList.remove('off');
        status.innerHTML = msg;
      } else {
        status.classList.add('off');
      }

    };

    const antiCensorRu = backgroundPage.apis.antiCensorRu;

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
          [12, ' г'],
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
      dateElement.title = new Date(antiCensorRu.lastPacUpdateStamp)
        .toLocaleString('ru-RU');

    };

    setDate();
    chrome.storage.onChanged.addListener(
      (changes) => changes.lastPacUpdateStamp.newValue && setDate()
    );

    // CLOSE BUTTON

    document.querySelector('.close-button').onclick = () => window.close();

    // RADIOS

    const currentProviderRadio = () => {

      const id = antiCensorRu.currentPacProviderKey || 'none';
      return document.querySelector('#'+id);

    };
    const checkChosenProvider = () => currentProviderRadio().checked = true;

    const showError = (err) => {

      let clarification = err.clarification;
      const ifNotCritical = clarification && clarification.ifNotCritical;
      let message = err.message || '';

      while( clarification ) {
        message = (clarification && (clarification.message + ' ')) + message;
        clarification = clarification.prev;
      }
      message = message.trim();
      setStatusTo(
        `<span style="color:red">
        ${ifNotCritical ? 'Некритичная ошибка.' : 'Ошибка!'}
        </span>
        <br/>
        <span style="font-size: 0.9em; color: darkred">${message}</span>
        <a href class="link-button">
          [Ещё&nbsp;подробнее]
        </a>`
      );
      getStatus().querySelector('.link-button').onclick = function() {

        backgroundPage.apis.errorHandlers.viewError(err);
        return false;

      };

    };

    const enableDisableInputs = function() {

      const inputs = document.querySelectorAll('input');
      for ( let i = 0; i < inputs.length; i++ ) {
        inputs[i].disabled = !inputs[i].disabled;
      }

    };

    const conduct = (beforeStatus, operation, afterStatus, onSuccess) => {

      setStatusTo(beforeStatus);
      enableDisableInputs();
      operation((err) => {
        if (err) {
          showError(err);
        } else {
          setStatusTo(afterStatus);
          onSuccess && onSuccess();
        }
        enableDisableInputs();
      });

    };

    const ul = document.querySelector('#list-of-providers');
    const _firstChild = ul.firstChild;
    for( const providerKey of Object.keys(antiCensorRu.pacProviders).sort() ) {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="radio" name="pacProvider" id="${providerKey}">
        <label for="${providerKey}">${providerKey}</label>
        <a href class="link-button checked-radio-panel"
          id="update-${providerKey}">[обновить]</a>`;
      li.querySelector('.link-button').onclick =
        () => {
          conduct(
            'Обновляем...', (cb) => antiCensorRu.syncWithPacProviderAsync(cb),
            'Обновлено.'
          );
          return false;
        };
      ul.insertBefore( li, _firstChild );
    }
    checkChosenProvider();

    const radios = [].slice.apply(
      document.querySelectorAll('[name=pacProvider]')
    );
    for(const radio of radios) {
      radio.onclick = function(event) {

        if (
          event.target.id === (antiCensorRu.currentPacProviderKey || 'none')
        ) {
          return false;
        }
        const pacKey = event.target.id;
        if (pacKey === 'none') {
          conduct(
            'Отключение...',
            (cb) => antiCensorRu.clearPacAsync(cb),
            'Отключено.',
            checkChosenProvider
          );
        } else {
          conduct(
            'Установка...',
            (cb) => antiCensorRu.installPacAsync(pacKey, cb),
            'PAC-скрипт установлен.',
            checkChosenProvider
          );
        }
        return false;
      };
    }

    const conpanel = document.getElementById('list-of-handlers');
    backgroundPage.apis.errorHandlers.getEventsMap().forEach( (value, name) => {

      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" id="if-on-${name}"/>
        <label for="if-on-${name}">${value}</label>`;
      const box = li.querySelector('input');
      box.checked = backgroundPage.apis.errorHandlers.isOn(name);
      box.onclick = function() {

        const id = this.id.replace('if-on-', '');
        backgroundPage.apis.errorHandlers.switch(
          this.checked ? 'on' : 'off',
          id
        );

      };
      conpanel.appendChild(li);

    });

    setStatusTo('');
    if (antiCensorRu.ifFirstInstall) {
      const id = antiCensorRu.currentPacProviderKey || 'none';
      document.querySelector('#update-' + id).click();
    }

  })
);
