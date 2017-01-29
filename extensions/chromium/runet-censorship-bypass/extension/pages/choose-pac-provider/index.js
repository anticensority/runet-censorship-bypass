'use strict';

const START = Date.now();

document.getElementById('pac-mods').onchange = function() {

  this.classList.add('changed');
  document.getElementById('apply-mods').disabled = false;

};

chrome.runtime.getBackgroundPage( (backgroundPage) =>
  backgroundPage.apis.errorHandlers.installListenersOnAsync(
    window, 'PUP', async() => {

      const getStatus = () => document.querySelector('#status');

      const setStatusTo = (msg) => {

        getStatus().innerHTML = msg || 'Хорошего настроения вам!';

      };

      const antiCensorRu = backgroundPage.apis.antiCensorRu;
      const errorHandlers = backgroundPage.apis.errorHandlers;

      // SET DATE

      const setDate = () => {

        let dateForUser = 'никогда';
        if( antiCensorRu.lastPacUpdateStamp ) {
          let diff = Date.now() - antiCensorRu.lastPacUpdateStamp;
          let units = 'мс';
          const gauges = [
            [1000, 'с'],
            [60, 'мин'],
            [60, 'ч'],
            [24, 'дн'],
            [7, ' недель'],
            [4, ' месяцев'],
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
        dateElement.innerText = dateForUser + ' / ' +
          (antiCensorRu.pacUpdatePeriodInMinutes/60) + 'ч';
        dateElement.title = new Date(antiCensorRu.lastPacUpdateStamp)
          .toLocaleString('ru-RU');

      };

      setDate();
      chrome.storage.onChanged.addListener(
        (changes) => changes.lastPacUpdateStamp.newValue && setDate()
      );

      // CLOSE BUTTON

      document.querySelector('.close-button').onclick = () => window.close();

      // RADIOS FOR PROVIDERS

      const currentProviderRadio = () => {

        const id = antiCensorRu.getCurrentPacProviderKey() || 'none';
        return document.getElementById(id);

      };
      const checkChosenProvider = () => currentProviderRadio().checked = true;

      const showErrors = (err, ...warns) => {

        const warning = warns
          .map(
            (w) => w && w.message || ''
          )
          .filter( (m) => m )
          .map( (m) => '✘ ' + m )
          .join('<br/>');

        let message = '';
        if (err) {
          let wrapped = err.wrapped;
          message = err.message || '';

          while( wrapped ) {
            const deeperMsg = wrapped && wrapped.message;
            if (deeperMsg) {
              message = message + ' &gt; ' + deeperMsg;
            }
            wrapped = wrapped.wrapped;
          }
        }
        message = message.trim();
        if (warning) {
          message = message ? message + '<br/>' + warning : warning;
        }
        setStatusTo(
          `<span style="color:red">
            ${err ? '🔥&#xFE0E; Ошибка!' : 'Некритичная ошибка.'}
          </span>
          <br/>
          <span style="font-size: 0.9em; color: darkred">${message}</span>
          ${err ? '<a href class="link-button">[Ещё&nbsp;подробнее]</a>' : ''}`
        );
        if (err) {
          getStatus().querySelector('.link-button').onclick = function() {

            errorHandlers.viewErrorVoid('pup-ext-err', err);
            return false;

          };
        }

      };

      const switchInputs = function(val) {

        const inputs = document.querySelectorAll('input');
        for ( let i = 0; i < inputs.length; i++ ) {
          inputs[i].disabled = val === 'on' ? false : true;
        }

      };

      const conduct = (beforeStatus, operation, afterStatus, onSuccess) => {

        setStatusTo(beforeStatus);
        switchInputs('off');
        operation((err, res, ...warns) => {

          warns = warns.filter( (w) => w );
          if (err || warns.length) {
            backgroundPage.console.log('ERR', err, 'W', warns.length, 'w', warns);
            showErrors(err, ...warns);
          } else {
            setStatusTo(afterStatus);
          }
          switchInputs('on');
          if (!err) {
            onSuccess && onSuccess(res);
          }
        });

      };

      const infoSign = function infoSign(tooltip) {

        return `<div class="desc">
          <span class="info-sign">🛈</span>
          <div class="tooltip">${tooltip}</div>
        </div>`;

      };

      {
        const ul = document.querySelector('#list-of-providers');
        const _firstChild = ul.firstChild;
        for(
          const providerKey of Object.keys(antiCensorRu.pacProviders).sort()
        ) {
          const provider = antiCensorRu.getPacProvider(providerKey);
          const li = document.createElement('li');
          li.className = 'info-row';
          li.innerHTML = `
            <input type="radio" name="pacProvider" id="${providerKey}">
            <label for="${providerKey}"> ${provider.label}</label>
            &nbsp;<a href class="link-button update-button"
              id="update-${providerKey}">[обновить]</a> ` +
            infoSign(provider.desc);
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
      }

      const radios = [].slice.apply(
        document.querySelectorAll('[name=pacProvider]')
      );
      for(const radio of radios) {
        radio.onclick = function(event) {

          if (
            event.target.id === (
              antiCensorRu.getCurrentPacProviderKey() || 'none'
            )
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

      // IF INSIDE OPTIONS

      const currentTab = await new Promise(
        (resolve) => chrome.tabs.query(
          { active: true, currentWindow: true },
          ([tab]) => resolve(tab)
        )
      );

      const ifInsideOptions = !currentTab || currentTab.url.startsWith('chrome://extensions/?options=');
      if (ifInsideOptions) {
        const hidClass = 'hideable';
        for(const el of document.querySelectorAll('.' + hidClass)) {
          el.classList.remove(hidClass);
        }
        for(const el of document.querySelectorAll('.hidden-for-options-page')) {
          el.style.display = 'none';
        }
      }

      // EXCEPTIONS PANEL
      /*
        Iterating and modifying select.selectedOptions
        at the same time is buggy, iterate this way instead:
        [...select.selectedOptions]
      */

      {

        const pacKitchen = backgroundPage.apis.pacKitchen;

        {

          const excEditor = document.getElementById('except-editor');

          if (currentTab && !currentTab.url.startsWith('chrome')) {
            excEditor.value = new URL(currentTab.url).hostname;
          }

          const excSelect = document.getElementById('exceptions-select');

          excEditor.onkeyup = function() {

            this.value = this.value.trim();
            for(const opt of excSelect.options) {
              let commonChars = 0;
              for( const i in this.value ) {
                if (this.value.charAt(i) !== opt.value.charAt(i)) {
                  break;
                }
                ++commonChars;
              }
              opt.style.order = commonChars;
            }
            return true;

          };

          const thisYes = document.getElementById('this-yes');
          const thisNo = document.getElementById('this-no');
          const ifProxiedClass = 'if-proxied';

          excSelect.onclick = function(event) {

            // Only one item may be selecte at a time.
            // Spread op is used to fight weird bug with iterator.
            for(const sopt of [...this.selectedOptions]) {
              sopt.selected = false;
            }
            const opt = event.target;
            opt.selected = true;
            if (opt.classList.contains(ifProxiedClass)) {
              thisYes.checked = true;
            } else {
              thisNo.checked = true;
            }
            excEditor.value = opt.value.trim();

          };

          const addOption = function addOption(host, ifProxy) {

            const opt = document.createElement('option');
            opt.text = host;
            if(ifProxy) {
              opt.classList.add(ifProxiedClass);
            };
            const editorHost = excEditor.value.trim();
            if (host === editorHost) {
              excSelect.insertBefore( opt, excSelect.firstChild );
              opt.click();
            } else {
              excSelect.add(opt);
            }

          }

          { // Populate select box.

            const pacMods = pacKitchen.getPacMods();
            for(const host of Object.keys(pacMods.exceptions || {}).sort()) {
              addOption(host, pacMods.exceptions[host]);
            }

          }

          const validateHost = function validateHost(host) {

            const ValidHostnameRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
            if(!ValidHostnameRegex.test(host)) {
              showErrors(new TypeError('Должно быть только доменное имя, без протокола, порта и пути. Попробуйте ещё раз.'));
              return false;
            }
            return true;

          };

          document.getElementById('exc-radio').onclick = function(event) {

            if( !['LABEL', 'INPUT'].includes( event.target.tagName ) ) {
              return true;
            }

            const _host = excEditor.value.trim();
            const pacMods = pacKitchen.getPacMods();
            pacMods.exceptions = pacMods.exceptions || {};

            let fixSelectBox;

            if (document.getElementById('this-auto').checked) {
              delete pacMods.exceptions[_host];
              fixSelectBox = () => {

                for(const sopt of [...excSelect.selectedOptions]) {
                  const shost = sopt.value.trim();
                  delete pacMods.exceptions[shost];
                  sopt.remove();
                }
                excEditor.value = '';

              }
            } else {
              // YES or NO.
              if (!validateHost(_host)) {
                return false;
              }
              if (thisYes.checked && !pacMods.filteredCustomsString) {
                showErrors( new TypeError(
                  'Проксировать СВОИ сайты можно только при наличии СВОИХ прокси (см.«Модификаторы»).'
                ));
                return false;
              }
              pacMods.exceptions[_host] = thisYes.checked;

              if (excSelect.selectedIndex === -1) {
                // Add new.
                fixSelectBox = () => addOption(_host, thisYes.checked);
              } else {
                // Edit selected.
                fixSelectBox = () => {

                  for(const sopt of [...excSelect.selectedOptions]) {
                    sopt.value = _host;
                    if (thisYes.checked) {
                      sopt.classList.add(ifProxiedClass);
                    } else {
                      sopt.classList.remove(ifProxiedClass);
                    }
                  }

                }
              }

            }

            conduct(
              'Применяем исключения...',
              (cb) => pacKitchen.keepCookedNowAsync(pacMods, cb),
              'Исключения применены.',
              fixSelectBox
            );
            return true;

          };

        }

        // PAC MODS PANEL

        const modPanel = document.getElementById('pac-mods');
        const _firstChild = modPanel.firstChild;
        const keyToLi = {};
        const customProxyStringKey = 'customProxyStringRaw';

        for(const conf of pacKitchen.getOrderedConfigs()) {

          const key = conf.key;
          const iddy = 'mods-' + conf.key.replace(/([A-Z])/g, (_, p) => '-' + p.toLowerCase());
          const li = document.createElement('li');
          li.className = 'info-row';
          keyToLi[key] = li;
          li.innerHTML = `
            <input type="checkbox" id="${iddy}" ${ conf.value ? 'checked' : '' }/>
            <label for="${iddy}"> ${ conf.label }</label>`;

          if (key !== customProxyStringKey) {
            li.innerHTML += infoSign(conf.desc);
          } else {
            const uiRaw = 'ui-proxy-string-raw';
            li.innerHTML += `<a href="${conf.url}" class="info-sign info-url">🛈</a><br/>
<textarea
  spellcheck="false"
  placeholder="SOCKS5 localhost:9050; # TOR Expert
SOCKS5 localhost:9150; # TOR Browser
HTTPS foobar.com:3143;
HTTPS 11.22.33.44:8080;">${conf.value || localStorage.getItem(uiRaw) || ''}</textarea>`;
            li.querySelector('textarea').onkeyup = function() {

              this.dispatchEvent(new Event('change', { 'bubbles': true }));

            };
          }

          modPanel.insertBefore( li, _firstChild );

        };
        document.getElementById('apply-mods').onclick = () => {

          const oldMods = pacKitchen.getPacMods();
          for(const key of Object.keys(keyToLi)) {
            oldMods[key] = keyToLi[key].querySelector('input').checked;
          };

          {
            // OWN PROXY

            const liPs = keyToLi[customProxyStringKey];
            oldMods[customProxyStringKey]
              = liPs.querySelector('input').checked
                && liPs.querySelector('textarea').value.trim();

            const taVal = liPs.querySelector('textarea').value;
            if (oldMods[customProxyStringKey] !== false) {
              const ifValid = taVal
                .replace(/#.*$/mg)
                .split(/\s*[;\n\r]+\s*/g)
                .filter( (str) => str )
                .every(
                (str) =>
                  /^(?:DIRECT|(?:(?:HTTPS?|PROXY|SOCKS(?:4|5))\s+\S+))$/g
                    .test(str)
                )
              if (!ifValid) {
                return showErrors(new TypeError(
                  'Неверный формат своих прокси. Свертесь с <a href="https://rebrand.ly/ac-own-proxy" data-in-bg="true">документацией</a>.'
                ))
              }
              oldMods[customProxyStringKey] = taVal;
            } else {
              localStorage.setItem(uiRaw, taVal);
            }

          }

          conduct(
            'Применяем настройки...',
            (cb) => pacKitchen.keepCookedNowAsync(oldMods, cb),
            'Настройки применены.',
            () => { document.getElementById('apply-mods').disabled = true; }
          );

        };

        document.getElementById('reset-mods').onclick = () => {

          const ifSure = backgroundPage.confirm('Сбросить все модификации PAC-скрипта?');
          if (!ifSure) {
            return false;
          }
          pacKitchen.resetToDefaultsVoid();
          backgroundPage.apis.ipToHost.resetToDefaultsVoid();
          window.close();

        };

      }

      // NOTIFICATIONS PANEL

      const conPanel = document.getElementById('list-of-handlers');
      errorHandlers.getEventsMap().forEach( (value, name) => {

        const li = document.createElement('li');
        li.innerHTML = `
          <input type="checkbox" id="if-on-${name}"/>
          <label for="if-on-${name}">${value}</label>`;
        const box = li.querySelector('input');
        box.checked = backgroundPage.apis.errorHandlers.isOn(name);
        box.onclick = function() {

          const id = this.id.replace('if-on-', '');
          return backgroundPage.apis.errorHandlers.switchVoid(
            this.checked ? 'on' : 'off',
            id
          );

        };
        conPanel.appendChild(li);

      });

      if( errorHandlers.ifNotControlled ) {
        document.getElementById('which-extension').innerHTML
          = backgroundPage.utils.messages.whichExtensionHtml();
        document.querySelectorAll('.if-not-controlled').forEach( (node) => {

          node.style.display = 'block';

        });
      }
      setStatusTo('');

      if (antiCensorRu.ifFirstInstall) {
        const id = antiCensorRu.getCurrentPacProviderKey() || 'none';
        document.querySelector('#update-' + id).click();
      }
      document.documentElement.style.display = '';
      console.log(Date.now() - START);

    })
);
