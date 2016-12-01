'use strict';

/*
  Task 1. Gets IPs for proxies of antizapret/anticenz via dns over https.
          These IPs are used in block-informer to inform user when proxy is ON.
  Task 2. Downloads PAC proxy script from antizapret/anticenz/
          my Google Drive and sets it in Chromium settings.
  Task 3. Schedules tasks 1 & 2 for every 4 hours.
*/

/*
  In background scripts use window.antiCensorRu public variables.
  In pages window.antiCensorRu is not accessible,
    use chrome.runtime.getBackgroundPage(..),
    extension.getBackgroundPage is deprecated
*/
{ // Private namespace starts.

  window.antiCensorRu = {

    version: chrome.runtime.getManifest().version,

    fixErrorsContext() {
      /* `setTimeout` changes context of execution from other window
          (e.g. popup) to background window, so we may catch errors
          in bg error handlers.
          More: https://bugs.chromium.org/p/chromium/issues/detail?id=357568
      */
      for(const prop of Object.keys(this)) {
        if ( typeof(this[prop]) === 'function' ) {
          const method = this[prop];
          this[prop] = function(...args) {

            setTimeout(method.bind(this, ...args), 0);

          };
        }
      }
    },

    throw() {
      throw new Error('Artificial error');
    },

    pacProviders: {
      Антизапрет: {
        pacUrl: 'https://antizapret.prostovpn.org/proxy.pac',
        proxyHosts: ['proxy.antizapret.prostovpn.org'],
        proxyIps: {
          '195.123.209.38': 'proxy.antizapret.prostovpn.org',
          '2a02:27ac::10': 'proxy.antizapret.prostovpn.org',
        },
      },
      Антиценз: {
        pacUrl: 'https://config.anticenz.org/proxy.pac',
        proxyHosts: ['gw2.anticenz.org'],
        proxyIps: {
          '5.196.220.114': 'gw2.anticenz.org',
        },
      },
      Оба_и_на_свитчах: {
        // pacUrl: 'https://drive.google.com/uc?export=download&id=0B-ZCVSvuNWf0akpCOURNS2VCTmc', // 0.14
        pacUrl: 'https://drive.google.com/uc?export=download&id=0B-ZCVSvuNWf0bzNUR2F4RF8wOU0',   // 0.15
        proxyHosts: ['proxy.antizapret.prostovpn.org', 'gw2.anticenz.org'],
        proxyIps: {
          '195.123.209.38': 'proxy.antizapret.prostovpn.org',
          '2a02:27ac::10': 'proxy.antizapret.prostovpn.org',
          '5.196.220.114': 'gw2.anticenz.org',
        },
      },
    },

    _currentPacProviderKey: 'Оба_и_на_свитчах',

    isProxied(ip) {

      // Executed on each request with ip. Make it as fast as possible.
      // Property lookups are cheap (I tested).
      return this._currentPacProviderKey
        && this.pacProviders[this._currentPacProviderKey]
          .proxyIps.hasOwnProperty(ip);

    },

    mustBeKey(key) {

      if ( !(key === null || this.pacProviders[key]) ) {
        throw new TypeError('No provider for key:' + key);
      }

    },

    get currentPacProviderKey() {

      return this._currentPacProviderKey;

    },
    set currentPacProviderKey(newKey) {

      this.mustBeKey(newKey);
      this._currentPacProviderKey = newKey;

    },

    getPacProvider(key) {

      if(key) {
        this.mustBeKey(key);
      } else {
        key = this.currentPacProviderKey;
      }
      return this.pacProviders[key];

    },

    /* Is it the first time extension installed?
       Do something, e.g. initiate PAC sync.
    */
    ifFirstInstall: false,
    lastPacUpdateStamp: 0,

    _periodicUpdateAlarmReason: 'Периодичное обновление PAC-скрипта Антизапрет',

    pushToStorage(cb) {

      console.log('Pushing to storage...');

      // Copy only settable properties (except functions).
      const onlySettable = {};
      for(const key of Object.keys(this)) {
        if (
          Object.getOwnPropertyDescriptor(this, key).writable
            && typeof(this[key]) !== 'function'
        ) {
          onlySettable[key] = this[key];
        }
      }

      chrome.storage.local.clear(
        () => chrome.storage.local.set(
          onlySettable,
          chromified(cb, onlySettable)
        )
      );

    },

    /*
    pullFromStorage(cb) {

      chrome.storage.local.get(null, (storage) => {

        const err = checkChromeError();
        if (!err) {
          console.log('Pulled from storage:', storage);
          for(const key of Object.keys(storage)) {
            this[key] = storage[key];
          }
        }

        console.log('Synced with storage, any callback?', !!cb);
        cb && cb(err, storage);

      });
    },
    */

    syncWithPacProvider(key, cb) {

      if( !key || typeof(key) === 'function' ) {
        cb = key;
        key = this.currentPacProviderKey;
      }
      cb = asyncLogGroup('Syncing with PAC provider ' + key + '...', cb);

      if (key === null) {
        // No pac provider set.
        return cb({
          clarification: {
            message: 'Сперва выберите PAC-провайдера.',
          },
        });
      }

      const pacProvider = this.getPacProvider(key);

      const pacSetPromise = new Promise(
        (resolve, reject) => setPacScriptFromProvider(
          pacProvider,
          (err, res) => {

            if (!err) {
              this.currentPacProviderKey = key;
              this.lastPacUpdateStamp = Date.now();
              this.ifFirstInstall = false;
              this.setAlarms();
            }

            resolve([err, res]);

          }
        )
      );

      const ipsPromise = new Promise(
        (resolve, reject) => updatePacProxyIps(
          pacProvider,
          (ipsError) => {

            if (ipsError && ipsError.clarification) {
              ipsError.clarification.ifNotCritical = true;
            }
            resolve([ipsError]);

          }
        )
      );

      Promise.all([pacSetPromise, ipsPromise]).then(
        ([[pacErr, pacRes], [ipsErr]]) => {

          if (pacErr && ipsErr) {
            return cb(pacErr, pacRes);
          }
          this.pushToStorage(
            (pushErr) => cb(pacErr || ipsErr || pushErr, pacRes)
          );

        },
        cb
      );

    },

    _pacUpdatePeriodInMinutes: 4*60,

    setAlarms() {

      let nextUpdateMoment = this.lastPacUpdateStamp
        + this._pacUpdatePeriodInMinutes*60*1000;
      const now = Date.now();
      if (nextUpdateMoment < now) {
        nextUpdateMoment = now;
      }

      console.log(
        'Next PAC update is scheduled on',
        new Date(nextUpdateMoment).toLocaleString('ru-RU')
      );

      chrome.alarms.create(
        this._periodicUpdateAlarmReason,
        {
          when: nextUpdateMoment,
          periodInMinutes: this._pacUpdatePeriodInMinutes,
        }
      );

      // ifAlarmTriggered. May be changed in the future.
      return nextUpdateMoment === now;

    },

    installPac(key, cb) {

      console.log('Installing PAC...');
      if (!key) {
        throw new Error('Key must be defined.');
      }
      if (this.currentProviderKey !== key) {
        return this.syncWithPacProvider(key, cb);
      }
      console.log(key + ' already installed.');
      cb();

    },

    clearPac(cb) {

      cb = asyncLogGroup('Cearing alarms and PAC...', cb);
      chrome.alarms.clearAll(
        () => chrome.proxy.settings.clear(
          {},
          () => {

            const err = checkChromeError();
            if (err) {
              return cb(err);
            }
            this.currentPacProviderKey = null;
            this.pushToStorage(cb);

          }
        )
      );
    },

  };

  // ON EACH LAUNCH, STARTUP, RELOAD, UPDATE, ENABLE
  chrome.storage.local.get(null, (oldStorage) => {

    checkChromeError();
    /*
       Event handlers that ALWAYS work (even if installation is not done
       or failed).
       E.g. install window may fail to open or be closed by user accidentally.
       In such case extension _should_ try to work on default parameters.
    */
    const antiCensorRu = window.antiCensorRu;
    antiCensorRu.fixErrorsContext();

    chrome.alarms.onAlarm.addListener(
      (alarm) => {

        if (alarm.name === antiCensorRu._periodicUpdateAlarmReason) {
          console.log(
            'Periodic PAC update triggered:',
            new Date().toLocaleString('ru-RU')
          );
          antiCensorRu.syncWithPacProvider(/* Swallows errors. */);
        }

      }
    );
    console.log('Alarm listener installed. We won\'t miss any PAC update.');

    window.addEventListener('online', () => {

      console.log('We are online, checking periodic updates...');
      antiCensorRu.setAlarms();

    });

    console.log('Storage on init:', oldStorage);
    antiCensorRu.ifFirstInstall = Object.keys(oldStorage).length === 0;

    if (!antiCensorRu.ifFirstInstall) {
      // LAUNCH, RELOAD, UPDATE
      // Use old or migrate to default.
      antiCensorRu._currentPacProviderKey =
        oldStorage._currentPacProviderKey || null;
      antiCensorRu.lastPacUpdateStamp =
        oldStorage.lastPacUpdateStamp || antiCensorRu.lastPacUpdateStamp;
      console.log(
        'Last PAC update was on',
        new Date(antiCensorRu.lastPacUpdateStamp).toLocaleString('ru-RU')
      );
    } else {
      // INSTALL
      console.log('Installing...');
      return chrome.runtime.openOptionsPage();
    }

    if (!antiCensorRu.getPacProvider()) {
      /*
        In case of UPDATE:
          1. new providers will still be shown.
          2. new version won't be pushed to storage
      */
      return console.log('No PAC provider set. Do nothing.');
    }

    /*
      1. There is no way to check that chrome.runtime.onInstalled wasn't fired
         except timeout.
         Otherwise we could put storage migration code only there.
      2. We have to check storage for migration before using it.
         Better on each launch then on each pull.
    */

    const ifAlarmTriggered = antiCensorRu.setAlarms();

    if (antiCensorRu.version === oldStorage.version) {
      // LAUNCH, RELOAD, ENABLE
      antiCensorRu.pacProviders = oldStorage.pacProviders;
      return console.log('Extension launched, reloaded or enabled.');
    }

    // UPDATE & MIGRATION
    console.log('Extension updated.');
    if (!ifAlarmTriggered) {
      antiCensorRu.pushToStorage(/* Swallows errors. */);
    }

    /*
      History of Changes to Storage (Migration Guide)
      -----------------------------------------------
      Version 0.0.0.10
        * Added this.version
        * PacProvider.proxyIps changed from {ip -> Boolean} to {ip -> hostname}
      Version 0.0.0.8-9
        * Changed storage.ifNotInstalled to storage.ifFirstInstall
        * Added storage.lastPacUpdateStamp
    **/
  });

  function asyncLogGroup(...args) {

    const cb = args.pop() || (() => {});
    console.group(...args);
    return function(...cbArgs) {

      console.groupEnd();
      console.log('Group finished.');
      cb(...cbArgs);

    };
  }

  function checkChromeError(betterStack) {

    // Chrome API calls your cb in a context different from the point of API
    // method invokation.
    const err = chrome.runtime.lastError || chrome.extension.lastError || null;
    if (err) {
      const args = ['API returned error:', err];
      if (betterStack) {
        args.push('\n' + betterStack);
      }
      console.warn(...args);
    }
    return err;

  }

  function chromified(cb, ...replaceArgs) {

    const stack = (new Error()).stack;
    // Take error first callback and convert it to chrome api callback.
    return function(...args) {

      if (replaceArgs.length) {
        args = replaceArgs;
      }
      const err = checkChromeError(stack);
      cb && cb.call(null, err, ...args);

    };

  }

  function setPac(pacData, cb) {

    const config = {
      mode: 'pac_script',
      pacScript: {
        mandatory: false,
        data: pacData,
      },
    };
    console.log('Setting chrome proxy settings...');
    chrome.proxy.settings.set( {value: config}, () => {

      const err = checkChromeError();
      if (err) {
        return cb(err);
      }
      chrome.proxy.settings.get({}, (details) => {

        const ifThis = details.levelOfControl.startsWith('controlled_by_this');
        if (!ifThis) {
          console.warn('Failed, other extension is in control.');
          return cb({clarification: {message: 'Настройки прокси контролирует другое расширение. <a href="chrome://settings/search#proxy">Какое?</a>'}});
        }
        console.log('Successfuly set PAC in proxy settings..');
        cb();
      });

    });

  }

  function httpGet(url, cb) {

    const start = Date.now();
    fetch(url).then(
      (res) => {

        const textCb =
          (err) => cb && res.text()
            .then( (text) => cb(err, text), cb );
        const status = res.status;
        if ( !( status >= 200 && status < 300 || status === 304 ) ) {
          res.clarification = {
            message: 'Получен ответ с неудачным HTTP-кодом ' + status + '.',
          };
          return textCb(res);
        }
        console.log('GETed with success:', url, Date.now() - start);
        textCb();

      },
      (err) => {

        err.clarification = {
          message: 'Что-то не так с сетью, проверьте соединение.',
        };
        cb && cb(err);

      }
    );
  }

  function getIpsFor(host, cb) {

    const types = [1, 28];
    const promises = types.map(
      (type) => new Promise((resolve) =>
        httpGet(
          'https://dns.google.com/resolve?type=' + type + '&name=' + host,
          (err, res) => {

            if (res) {
              try {
                res = JSON.parse(res);
                console.log('Json parsed.');
                if (err || res.Status) {
                  const msg = ['Answer', 'Comment', 'Status']
                    .filter( (prop) => res[prop] )
                    .map( (prop) => prop + ': ' + JSON.stringify( res[prop] ) )
                    .join(', \n');
                  err.clarification.message += ' Сервер (json): ' + msg;
                  err.data = err.data || res;
                } else {
                  res = res.Answer || [];
                  res = res.filter(
                    (record) => types.includes(record.type)
                  );
                }
              } catch(e) {
                err = e || err || {clarification: {message: ''}};
                err.clarification = err.clarification || {message: ''};
                err.clarification.message = (
                  err.clarification.message
                  + ' Сервер (текст): '+ res
                ).trim();
                err.data = err.data || res;
              }
            }
            resolve([err, res]);

          }
        )
      )
    );
    Promise.all(promises).then(
      ([[v4err, v4res], [v6err, v6res]]) => {

        if(v4err) {
          return cb(v4err, v4res);
        }
        const ips = v4res;
        if (!v6err) {
          ips.push(...v6res);
        } else {
          v6err.clarification.ifNotCritical = true;
          console.warn(v6err);
        }
        cb(v6err, ips);

      }
    );

  }

  function updatePacProxyIps(provider, cb) {

    cb = asyncLogGroup(
      'Getting IP for '+ provider.proxyHosts.join(', ') + '...',
      cb
    );
    let failure = {
      clarification: {
        message: 'Не удалось получить один или несколько IP адресов для' +
        ' прокси-серверов. Иконка для уведомления об обходе блокировок ' +
        'может не отображаться.',
      },
      errors: {},
    };
    let i = 0;
    provider.proxyHosts.forEach(
      (proxyHost) => getIpsFor(
        proxyHost,
        (err, ips) => {

          if (!err || err.clarification.ifNotCritical) {
            provider.proxyIps = provider.proxyIps || {};
            ips.forEach(
              (ip) => provider.proxyIps[ip] = proxyHost
            );
          } else {
            failure.errors[proxyHost] = err;
          }

          if ( ++i === provider.proxyHosts.length ) {
            failure = Object.keys(failure.errors).length ? failure : null;
            cb(failure, provider.proxyIps);
          }
        }
      )
    );
  }

  function setPacScriptFromProvider(provider, cb) {

    cb = asyncLogGroup(
      'Getting pac script from provider...', provider.pacUrl,
      cb
    );

    httpGet(
      provider.pacUrl,
      (err, pacData) => {

        if (err) {
          err.clarification = {
            message: 'Не удалось скачать PAC-скрипт с адреса: '
              + provider.pacUrl + '.',
            prev: err.clarification,
          };
          return cb(err);
        }
        setPac(pacData, cb);

      }
    );
  }

}
