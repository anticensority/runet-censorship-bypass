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
        document.documentElement.classList.add('if-options-page')
      }

      // EXCEPTIONS PANEL

      {

        const pacKitchen = backgroundPage.apis.pacKitchen;

        {

          const excEditor = document.getElementById('exc-editor');

          const validateHost = function validateHost(host) {

            const ValidHostnameRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
            if(!ValidHostnameRegex.test(host)) {
              showErrors(new TypeError('Должно быть только доменное имя, без протокола, порта и пути. Попробуйте ещё раз.'));
              return false;
            }
            return true;

          };

          const ifProxyHtml = '✔';
          const ifNotProxyHtml = '✘';
          const ifAutoHtml = '🔄';

          const addOption = function addOption(host, yesNoUndefined) {

            const opt = document.createElement('option');
            opt.value = host;
            opt.dataset.host = host;
            switch(yesNoUndefined) {
              case true:
                opt.innerHTML = ifProxyHtml;
                break;
              case false:
                opt.innerHTML = ifNotProxyHtml;
                break;
              default:
                opt.innerHTML = ifAutoHtml;
            }
            const editorHost = excEditor.value.trim();
            if (host === editorHost) {
              excList.insertBefore( opt, excList.firstChild );
            } else {
              excList.appendChild(opt);
            }

          };

          const thisYes = document.getElementById('this-yes');
          const thisNo = document.getElementById('this-no');
          const thisAuto = document.getElementById('this-auto');
          const yesClass = 'if-yes';
          const noClass = 'if-no';

          function moveCursorIfNeeded() {

            const nu = excEditor.dataset.moveCursorTo;
            if(nu !== undefined) {
              excEditor.setSelectionRange(nu, nu);
              delete excEditor.dataset.moveCursorTo;
            }

          }

          const hideOpt = (opt) => opt.value = '\n';
          const unhideOpt = (opt) => opt.value = opt.dataset.host + ' ';

          const excList = document.getElementById('exc-list');

          excEditor.onkeydown = function(event) {

            moveCursorIfNeeded();
            if(event.key === 'Enter') {
              // Hide all.
              excList.childNodes.forEach( hideOpt );
            }
            return true;

          };

          excEditor.onclick = excEditor.oninput = function(event) {

            // If triangle button on right of datalist input clicked.

            let ifTriangleClicked = false;
            const ifClick = event && event.type === 'click';

            {
              const minIndentFromRightInPx = 15;
              if( ifClick
                    && !this.selectionStart && !this.selectionStart
                    && event.x > this.getBoundingClientRect().right - minIndentFromRightInPx
              ) {
                  ifTriangleClicked = true;
              }
            }

            const setInputValue = (newValue) => {

              if (ifClick && !ifTriangleClicked) {
                // Don't jerk cursor on simple clicks.
                return;
              }
              // See bug in my comment to http://stackoverflow.com/a/32394157/521957
              // First click on empty input may be still ignored.
              const nu = this.selectionStart + newValue.length - this.value.length;
              this.value = newValue;
              excEditor.dataset.moveCursorTo = nu;
              window.setTimeout(moveCursorIfNeeded, 0);

            }

            const host = this.value.trim();
            setInputValue(ifTriangleClicked ? '' : (host || ' '));
            thisAuto.checked = true;

            let exactOpt = false;
            excList.childNodes.forEach(
              (opt) => {

                if(opt.innerHTML === ifAutoHtml) {
                  return opt.remove();
                }
                const ifExactMatch = opt.dataset.host === host;
                if (!ifExactMatch) {
                  return unhideOpt(opt);
                }
                exactOpt = opt;

              }
            );

            this.parentNode.classList.remove(noClass, yesClass);
            if(exactOpt) {
              if(ifTriangleClicked) {
                unhideOpt(exactOpt);
              } else {
                hideOpt(exactOpt);
                if(exactOpt.innerHTML === ifProxyHtml) {
                  thisYes.checked = true;
                  this.parentNode.classList.add(yesClass);
                } else {
                  thisNo.checked = true;
                  this.parentNode.classList.add(noClass);
                }
              }
            } else if (ifTriangleClicked && host) {
              addOption(host, undefined);
            }
            return true;

          };

          if (currentTab && !currentTab.url.startsWith('chrome')) {
            excEditor.value = new URL(currentTab.url).hostname;
          } else {
            // Show placeholder.
            excEditor.value = '';
          }

          { // Populate selector.

            const pacMods = pacKitchen.getPacMods();
            for(const host of Object.keys(pacMods.exceptions || {}).sort()) {
              addOption(host, pacMods.exceptions[host]);
            }
            //excEditor.oninput();

          }

          document.getElementById('exc-radio').onclick = function(event) {

            /* ON CLICK */
            if(event.target.tagName !== 'INPUT') {
              // Only label on checkbox.
              return true;
            }

            const host = excEditor.value.trim();

            const pacMods = pacKitchen.getPacMods();
            pacMods.exceptions = pacMods.exceptions || {};

            let fixUi = () => {};

            if (thisAuto.checked) {
              delete pacMods.exceptions[host];
              fixUi = () => excEditor.value = '';
            } else {
              // YES or NO.
              if (!validateHost(host)) {
                return false;
              }
              if (thisYes.checked && !pacMods.filteredCustomsString) {
                showErrors( new TypeError(
                  'Проксировать СВОИ сайты можно только при наличии СВОИХ прокси (см. «Модификаторы» ).'
                ));
                return false;
              }
              pacMods.exceptions[host] = thisYes.checked;
              fixUi = () => addOption(host, thisYes.checked);
            }

            conduct(
              'Применяем исключения...',
              (cb) => pacKitchen.keepCookedNowAsync(pacMods, cb),
              'Исключения применены.',
              () => {

                excList.childNodes.forEach(
                  (opt) => opt.dataset.host === host && opt.remove()
                );
                fixUi();
                console.log(excEditor, excEditor.oninput);
                excEditor.oninput();

              }
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
          pacKitchen.resetToDefaults();
          backgroundPage.apis.ipToHost.resetToDefaults();
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

      if( !errorHandlers.ifControllable ) {
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
      document.documentElement.style.display = 'initial';

      console.log(Date.now() - START);

    })
);
