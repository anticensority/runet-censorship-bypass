'use strict';

/*
  Task 1. Gets IPs for proxies of antizapret/anticenz via dns over https.
          These IPs are used in block-informer to inform user when proxy is ON.
  Task 2. Downloads PAC proxy script from antizapret/anticenz/
          my Google Drive and sets it in Chromium settings.
  Task 3. Schedules tasks 1 & 2 for every 4 hours.
*/

/*
  In background scripts use window.apis.antiCensorRu public variables.
  In pages window.apis.antiCensorRu is not accessible,
    use chrome.runtime.getBackgroundPage(..),
    extension.getBackgroundPage is deprecated

  If you want to catch errors, then call api from setTimeout!
  See errorHandlers api for more.

*/

{ // Private namespace starts.

  const mandatory = window.utils.mandatory;
  const throwIfError = window.utils.throwIfError;
  const chromified = window.utils.chromified;
  const timeouted = window.utils.timeouted;

  const clarifyThen = window.apis.errorsLib.clarifyThen;
  const Warning = window.apis.errorsLib.Warning;

  const httpLib = window.apis.httpLib;
  const handlers = window.apis.errorHandlers;

  const asyncLogGroup = function asyncLogGroup(...args) {

    const cb = args.pop();
    if(!(cb && typeof(cb) === 'function')) {
      throw new TypeError('cb must be a function, but got: ' + cb);
    }
    console.group(...args);
    return function(...cbArgs) {

      console.groupEnd();
      console.log('Group finished.');
      cb(...cbArgs);

    };

  };

  const setPacAsync = function setPacAsync(
    pacData = mandatory(), cb = throwIfError
  ) {

    const config = {
      mode: 'pac_script',
      pacScript: {
        mandatory: false,
        data: pacData,
      },
    };
    console.log('Setting chrome proxy settings...');
    chrome.proxy.settings.set( {value: config}, chromified((err) => {

      if (err) {
        return cb(err);
      }
      handlers.updateControlState( () => {

        if ( !handlers.ifControlled ) {

          console.warn('Failed, other extension is in control.');
          return cb(
            new Error( window.utils.messages.whichExtensionHtml() )
          );

        }
        console.log('Successfuly set PAC in proxy settings..');
        cb();

      });

    }));

  };

  const updatePacProxyIps = function updatePacProxyIps(
    cb = throwIfError
  ) {

    cb = asyncLogGroup(
      'Getting IPs for PAC hosts...',
      cb
    );
    window.utils.fireRequest('ip-to-host-update-all', cb);

  };

  const setPacScriptFromProviderAsync = function setPacScriptFromProviderAsync(
    provider, lastModifiedStr = mandatory(), cb = throwIfError
  ) {

    const pacUrl = provider.pacUrls[0];
    cb = asyncLogGroup(
      'Getting PAC script from provider...', pacUrl,
      cb
    );

    httpLib.ifModifiedSince(pacUrl, lastModifiedStr, (err, newLastModifiedStr) => {

      if (!newLastModifiedStr) {
        const res = {lastModified: lastModifiedStr};
        const ifWasEverModified = lastModifiedStr !== new Date(0).toUTCString();
        if (ifWasEverModified) {
          return cb(
            null, res,
            new Warning(
              'Ваш PAC-скрипт не нуждается в обновлении. Его дата: ' +
                lastModifiedStr
            )
          );
        }
      }

      // Employ all urls, the latter are fallbacks for the former.
      const pacDataPromise = provider.pacUrls.reduce(
        (promise, url) => promise.catch(
          () => new Promise(
            (resolve, reject) => httpLib.get(
              url,
              (newErr, pacData) => newErr ? reject(newErr) : resolve(pacData)
            )
          )
        ),
        Promise.reject()
      );

      pacDataPromise.then(

        (pacData) => {

          setPacAsync(
            pacData,
            (err, res) => cb(
              err,
              Object.assign(res || {}, {lastModified: newLastModifiedStr})
            )
          );

        },

        clarifyThen(
          'Не удалось скачать PAC-скрипт с адресов: [ '
          + provider.pacUrls.join(' , ') + ' ].',
          cb
        )

      );

    });

  };

  window.apis.antiCensorRu = {

    version: chrome.runtime.getManifest().version,

    pacProviders: {
      Антизапрет: {
        label: 'Антизапрет',
        desc: \`Альтернативный PAC-скрипт от стороннего разработчика.
               Работает быстрее, но охватывает меньше сайтов.
               Блокировка определяется по доменному имени,
               <br/> <a href="https://antizapret.prostovpn.org">Страница проекта</a>.\`,
        order: 0,
        pacUrls: ['https://antizapret.prostovpn.org/proxy.pac'],
      },
      Антицензорити: {
        label: 'Антицензорити',
        desc: \`Основной PAC-скрипт от автора расширения.
               Работает медленней, но охватывает больше сайтов.
               Блокировка определятся по доменному имени или IP адресу.<br/>
               <a href="https://rebrand.ly/ac-anticensority">Страница проекта</a>.\`,
        order: 1,

        /*
          Don't use in system configs! Because Windows does poor caching.
          Some urls are encoded to counter abuse.
          Version: 0.17
        */
        pacUrls: ${JSON.stringify(anticensorityPacUrls, null, 2)},
      },
      onlyOwnSites: {
        label: 'Только свои сайты и свои прокси',
        desc: 'Проксируются только добавленные вручную сайты через СВОИ вручную добавленные прокси или через локальный Tor.',
        order: 99,
        pacUrls: [
          'data:application/x-ns-proxy-autoconfig,' + escape('function FindProxyForURL(){ return "DIRECT"; }'),
        ]
      }
    },

    getSortedEntriesForProviders() {

      return Object.entries(this.pacProviders).sort((entryA, entryB) => entryA[1].order - entryB[1].order).map(([key, prov]) => Object.assign({key: key}, prov));

    },

    _currentPacProviderKey: 'Антицензорити',

    /* Is it the first time extension installed?
       Do something, e.g. initiate PAC sync.
    */
    ifFirstInstall: false,
    lastPacUpdateStamp: 0,

    setTitle() {

      const upDate = new Date(this.lastPacUpdateStamp).toLocaleString('ru-RU')
        .replace(/:\\d+$/, '').replace(/\\.\\d{4}/, '');
      chrome.browserAction.setTitle({
        title: \`Обновлялись \${upDate} | Версия \${window.apis.version.build}\`,
      });

    },

    _currentPacProviderLastModified: 0, // Not initialized.

    getLastModifiedForKey(key = mandatory()) {

      if (this._currentPacProviderKey === key) {
        return new Date(this._currentPacProviderLastModified).toUTCString();
      }
      return new Date(0).toUTCString();

    },

    setLastModified(newValue = mandatory()) {

      this._currentPacProviderLastModified = newValue;

    },

    mustBeKey(key = mandatory()) {

      if ( !(key === null || this.pacProviders[key]) ) {
        throw new TypeError('No provider for key:' + key);
      }

    },

    getCurrentPacProviderKey() {

      return this._currentPacProviderKey;

    },

    setCurrentPacProviderKey(
      newKey = mandatory(),
      lastModified = new Date().toUTCString()
    ) {

      this.mustBeKey(newKey);
      this._currentPacProviderKey = newKey;
      this._currentPacProviderLastModified = lastModified;

    },

    getPacProvider(key) {

      if(key) {
        this.mustBeKey(key);
      } else {
        key = this.getCurrentPacProviderKey();
      }
      return this.pacProviders[key];

    },

    _periodicUpdateAlarmReason: 'Периодичное обновление PAC-скрипта',

    pushToStorageAsync(cb = throwIfError) {

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
          chromified(cb)
        )
      );

    },

    syncWithPacProviderAsync(
      key = this.currentPacProvierKey, cb = throwIfError) {

      if( typeof(key) === 'function' ) {
        cb = key;
        key = this.getCurrentPacProviderKey();
      }
      cb = asyncLogGroup('Syncing with PAC provider ' + key + '...', cb);

      if (key === null) {
        // No pac provider set.
        return clarifyThen('Сперва выберите PAC-провайдера.', cb);
      }

      const pacProvider = this.getPacProvider(key);

      const pacSetPromise = new Promise(
        (resolve, reject) => setPacScriptFromProviderAsync(
          pacProvider,
          this.getLastModifiedForKey(key),
          (err, res, ...warns) => {

            if (!err) {
              this.setCurrentPacProviderKey(key, res.lastModified);
              this.lastPacUpdateStamp = Date.now();
              this.ifFirstInstall = false;
              this.setAlarms();
              this.setTitle();
            }

            resolve([err, null, ...warns]);

          }
        )
      );

      const ipsErrorPromise = new Promise(
        (resolve, reject) => updatePacProxyIps(
          resolve
        )
      );

      Promise.all([pacSetPromise, ipsErrorPromise]).then(
        ([[pacErr, pacRes, ...pacWarns], ipsErr]) => {

          if (pacErr && ipsErr) {
            return cb(pacErr, pacRes);
          }
          const warns = pacWarns;
          if (ipsErr) {
            warns.push(ipsErr);
          }
          this.pushToStorageAsync(
            (pushErr) => cb(pacErr || pushErr, null, ...warns)
          );

        },
        cb
      );

    },

    _pacUpdatePeriodInMinutes: 12*60,
    get pacUpdatePeriodInMinutes() {

      return this._pacUpdatePeriodInMinutes;

    },

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

    installPacAsync(key, cb = throwIfError) {

      console.log('Installing PAC...');
      if (!key) {
        throw new Error('Key must be defined.');
      }
      if (this.currentProviderKey !== key) {
        return this.syncWithPacProviderAsync(key, cb);
      }
      console.log(key + ' already installed.');
      cb();

    },

    clearPacAsync(cb = throwIfError) {

      cb = asyncLogGroup('Cearing alarms and PAC...', cb);
      chrome.alarms.clearAll(
        () => chrome.proxy.settings.clear(
          {},
          chromified((err) => {

            if (err) {
              return cb(err);
            }
            this.setCurrentPacProviderKey(null);
            this.pushToStorageAsync(
              () => handlers.updateControlState(cb)
            );

          })
        )
      );

    },

  };

  // ON EACH LAUNCH, STARTUP, RELOAD, UPDATE, ENABLE
  chrome.storage.local.get(null, chromified( async (err, oldStorage) => {

    if (err) {
      throw err;
    }

    /*
       Event handlers that ALWAYS work (even if installation is not done
       or failed).
       E.g. install window may fail to open or be closed by user accidentally.
       In such case extension _should_ try to work on default parameters.
    */
    const antiCensorRu = window.apis.antiCensorRu;

    chrome.alarms.onAlarm.addListener(
      timeouted( (alarm) => {

        if (alarm.name === antiCensorRu._periodicUpdateAlarmReason) {
          console.log(
            'Periodic PAC update triggered:',
            new Date().toLocaleString('ru-RU')
          );
          antiCensorRu.syncWithPacProviderAsync(() => {/* swallow */});
        }

      })
    );
    console.log('Alarm listener installed. We won\\'t miss any PAC update.');

    window.addEventListener('online', () => {

      console.log('We are online, checking periodic updates...');
      antiCensorRu.setAlarms();

    });

    console.log('Keep cooked...');
    await new Promise((resolve) => window.apis.pacKitchen.keepCookedNowAsync(resolve));

    console.log('Storage on init:', oldStorage);
    antiCensorRu.ifFirstInstall = Object.keys(oldStorage).length === 0;

    if (antiCensorRu.ifFirstInstall) {
      // INSTALL
      console.log('Installing...');
      handlers.switch('on', 'ext-error');
      return chrome.runtime.openOptionsPage();
    }

    // LAUNCH, RELOAD, UPDATE
    // Use old or migrate to default.
    antiCensorRu._currentPacProviderKey =
      oldStorage._currentPacProviderKey || null;
    antiCensorRu.lastPacUpdateStamp =
      oldStorage.lastPacUpdateStamp || antiCensorRu.lastPacUpdateStamp;
    antiCensorRu._currentPacProviderLastModified =
      oldStorage._currentPacProviderLastModified
      || antiCensorRu._currentPacProviderLastModified;
    console.log(
      'Last PAC update was on',
      new Date(antiCensorRu.lastPacUpdateStamp).toLocaleString('ru-RU')
    );


    /*
      1. There is no way to check that chrome.runtime.onInstalled wasn't fired
         except timeout.
         Otherwise we could put storage migration code only there.
      2. We have to check storage for migration before using it.
         Better on each launch then on each pull.
    */

    await new Promise((resolve) => {

      const ifUpdating = antiCensorRu.version !== oldStorage.version;
      if (!ifUpdating) {

        // LAUNCH, RELOAD, ENABLE
        antiCensorRu.pacProviders = oldStorage.pacProviders;
        console.log('Extension launched, reloaded or enabled.');
        return resolve();

      }

      // UPDATE & MIGRATION
      console.log('Updating from', oldStorage.version, 'to', antiCensorRu.version);
      if (window.apis.version.isLeq(oldStorage.version, '0.0.1.5')) {

        // Change semicolons to newlines in proxy string (raw).
        // TODO:
        const modsMutated = window.apis.pacKitchen.getPacMods();
        modsMutated['customProxyStringRaw'] = MIGRATE(conf.value);
        window.apis.pacKitchen.keepCookedNowAsync(modsMutated, cb);

      }

      antiCensorRu.pushToStorageAsync(() => {

        console.log('Extension updated.');
        resolve();

      });

    });

    if (antiCensorRu.getPacProvider()) {
      antiCensorRu.setAlarms();
    }
    antiCensorRu.setTitle();

    /*
      History of Changes to Storage (Migration Guide)
      -----------------------------------------------
      Version 0.0.0.17:
        * Remove "Антиценз".
        * Rename "Оба_и_на_свитчах" to "Антицензорити"
        * Add provider.label and provider.desc.
      Version 0.0.0.10:
        * Add this.version.
        * Change PacProvider.proxyIps from {ip -> Boolean} to {ip -> hostname}.
      Version 0.0.0.8-9:
        * Change storage.ifNotInstalled to storage.ifFirstInstall.
        * Add storage.lastPacUpdateStamp.
    **/

  }));

}
