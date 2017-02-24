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
    if (!cb || typeof cb !== 'function') {
      throw new TypeError(`cb must be a function, but got: ${cb}`);
    }
    console.group(...args);
    return function finishLogGroup(...cbArgs) {

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
    chrome.proxy.settings.set({ value: config }, chromified((err) => {

      if (err) {
        return cb(err);
      }
      return handlers.updateControlState(() => {

        if (!handlers.ifControlled) {

          console.warn('Failed, other extension is in control.');
          return cb(
            new Error(window.utils.messages.whichExtensionHtml())
          );

        }
        console.log('Successfuly set PAC in proxy settings..');
        return cb();

      });

    }));

  };

  const updatePacProxyIps = function updatePacProxyIps(
    originalCb = throwIfError
  ) {

    const cb = asyncLogGroup(
      'Getting IPs for PAC hosts...',
      originalCb
    );
    window.utils.fireRequest('ip-to-host-update-all', cb);

  };

  const setPacScriptFromProviderAsync = function setPacScriptFromProviderAsync(
    provider, lastModified = mandatory(), originalCb = throwIfError
  ) {

    const pacUrl = provider.pacUrls[0];
    const cb = asyncLogGroup(
      'Getting PAC script from provider...', pacUrl,
      originalCb
    );

    httpLib.ifModifiedSince(pacUrl, lastModified, (err, newLastModified) => {

      if (!newLastModified) {
        return cb(
          null,
          { lastModified },
          new Warning(
            `Ваш PAC-скрипт не нуждается в обновлении. Его дата: ${lastModified}.`
          )
        );
      }

      // Employ all urls, the latter are fallbacks for the former.
      const pacDataPromise = provider.pacUrls.reduce(
        (promise, url) => promise.catch(
          () => new Promise(
            (resolve, reject) => httpLib.get(
              url,
              (newErr, pacData) => (newErr ? reject(newErr) : resolve(pacData))
            )
          )
        ),
        Promise.reject()
      );

      pacDataPromise.then(

        (pacData) => {

          setPacAsync(
            pacData,
            (pacErr, pacRes) => cb(
              pacErr,
              Object.assign(pacRes || {}, { lastModified: newLastModified })
            )
          );

        },

        clarifyThen(
          `Не удалось скачать PAC-скрипт с адресов: [ ${provider.pacUrls.join(' , ')} ].`,
          cb
        )

      );
      return undefined;

    });

  };

  const currentVersion = chrome.runtime.getManifest().version;

  const privates = {

    pacUpdatePeriodInMinutes: 12 * 60,
    periodicUpdateAlarmReason: 'Периодичное обновление PAC-скрипта',
    state: window.utils.createStorage('anti-censor-ru-'),

    get version() {
      return this.state('version');
    },
    set version(newValue) {
      return this.state('version', newValue);
    },

    get ifFirstInstall() {
      return this.version === null;
    },
    set ifFirstInstall(newValue) {
      if (newValue) {
        throw new TypeError('ifFirstInstall can\'t be set to true!');
      }
      this.version = currentVersion;
    },

    get currentPacProviderKey() {
      return this.state('current-pac');
    },
    set currentPacProviderKey(newValue) {
      return this.state('current-pac', newValue);
    },

    get lastPacUpdateStamp() {
      return this.state('last-pac-update-stamp') || 0;
    },
    set lastPacUpdateStamp(newValue) {
      return this.state('last-pac-update-stamp', newValue);
    },

    get currentPacProviderLastModified() {
      return this.state('current-pac-last-mod') || 0;
    },
    set currentPacProviderLastModified(newValue) {
      return this.state('current-pac-last-mod', newValue);
    },

  };

  window.apis.antiCensorRu = {

    pacProviders: {
      Антизапрет: {
        label: 'Антизапрет',
        desc: 'Альтернативный PAC-скрипт от стороннего разработчика.' +
          ' Блокировка определяется по доменному имени,' +
          ' для некоторых провайдеров есть автоопредление.' +
          ' <br/> <a href="https://antizapret.prostovpn.org">Страница проекта</a>.',

        pacUrls: ['https://antizapret.prostovpn.org/proxy.pac'],
      },
      Антицензорити: {
        label: 'Антицензорити (<a href="https://github.com/anticensorship-russia/chromium-extension/issues/6" style="color: red">тормозит</a>)',
        desc: 'Основной PAC-скрипт от автора расширения.' +
        ' Блокировка определятся по доменному имени или IP адресу.' +
        ' Работает на switch-ах. <br/>' +
        ' <a href="https://rebrand.ly/ac-anticensority">Страница проекта</a>.',

        /*
          Don't use in system configs! Because Windows does poor caching.
          Some urls are encoded to counter abuse.
          Version: 0.17
        */
        pacUrls: [
          // First official, shortened:
          'https://rebrand.ly/ac-chrome-anticensority-pac',
          // Second official, Cloud Flare with caching:
          'https://anticensorship-russia.tk/generated-pac-scripts/anticensority.pac',
          // GitHub.io:
          '\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x6e\x74\x69\x63\x65\x6e\x73\x6f\x72\x73\x68\x69\x70\x2d\x72\x75\x73\x73\x69\x61\x2e\x67\x69\x74\x68\x75\x62\x2e\x69\x6f\x2f\x67\x65\x6e\x65\x72\x61\x74\x65\x64\x2d\x70\x61\x63\x2d\x73\x63\x72\x69\x70\x74\x73\x2f\x61\x6e\x74\x69\x63\x65\x6e\x73\x6f\x72\x69\x74\x79\x2e\x70\x61\x63', // eslint-disable-line max-len
          // GitHub repo:
          '\x68\x74\x74\x70\x73\x3a\x2f\x2f\x72\x61\x77\x2e\x67\x69\x74\x68\x75\x62\x75\x73\x65\x72\x63\x6f\x6e\x74\x65\x6e\x74\x2e\x63\x6f\x6d\x2f\x61\x6e\x74\x69\x63\x65\x6e\x73\x6f\x72\x73\x68\x69\x70\x2d\x72\x75\x73\x73\x69\x61\x2f\x67\x65\x6e\x65\x72\x61\x74\x65\x64\x2d\x70\x61\x63\x2d\x73\x63\x72\x69\x70\x74\x73\x2f\x6d\x61\x73\x74\x65\x72\x2f\x61\x6e\x74\x69\x63\x65\x6e\x73\x6f\x72\x69\x74\x79\x2e\x70\x61\x63', // eslint-disable-line max-len
          // Google Drive (0.17):
          '\x68\x74\x74\x70\x73\x3a\x2f\x2f\x64\x72\x69\x76\x65\x2e\x67\x6f\x6f\x67\x6c\x65\x2e\x63\x6f\x6d\x2f\x75\x63\x3f\x65\x78\x70\x6f\x72\x74\x3d\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x26\x69\x64\x3d\x30\x42\x2d\x5a\x43\x56\x53\x76\x75\x4e\x57\x66\x30\x54\x44\x46\x52\x4f\x47\x35\x46\x62\x55\x39\x4f\x64\x44\x67'], // eslint-disable-line max-len
      },
    },

    /* Is it the first time extension installed?
       Do something, e.g. initiate PAC sync.
    */
    get ifFirstInstall() {

      return privates.ifFirstInstall;

    },
    get lastPacUpdateStamp() {

      return privates.lastPacUpdateStamp;

    },

    getLastModifiedForKey(key = mandatory()) {

      if (privates.currentPacProviderKey === key) {
        return new Date(privates.currentPacProviderLastModified).toUTCString();
      }
      return new Date(0).toUTCString();

    },

    setLastModified(newValue = mandatory()) {

      privates.currentPacProviderLastModified = newValue;

    },

    mustBeKey(key = mandatory()) {

      if (key !== null && !this.pacProviders[key]) {
        throw new TypeError(`No provider for key:${key}`);
      }

    },

    getCurrentPacProviderKey() {

      return privates.currentPacProviderKey;

    },

    setCurrentPacProviderKey(
      newKey = mandatory(),
      lastModified = new Date().toUTCString()
    ) {

      this.mustBeKey(newKey);
      privates.currentPacProviderKey = newKey;
      privates.currentPacProviderLastModified = lastModified;

    },

    getPacProvider(maybeKey) {

      let key;
      if (maybeKey) {
        this.mustBeKey(maybeKey);
        key = maybeKey;
      } else {
        key = this.getCurrentPacProviderKey();
      }
      return this.pacProviders[key];

    },

    syncWithPacProviderAsync(maybeKey = this.currentPacProvierKey, maybeCb = throwIfError) {

      let key;
      let originalCb;
      if (typeof maybeKey === 'function') {
        key = this.getCurrentPacProviderKey();
        originalCb = maybeKey;
      } else {
        key = maybeKey;
        originalCb = maybeCb;
      }
      const cb = asyncLogGroup(`Syncing with PAC provider ${key}...`, originalCb);

      if (key === null) {
        // No pac provider set.
        return clarifyThen('Сперва выберите PAC-провайдера.', cb);
      }

      const pacProvider = this.getPacProvider(key);

      const pacSetPromise = new Promise(
        (resolve) => setPacScriptFromProviderAsync(
          pacProvider,
          this.getLastModifiedForKey(key),
          (err, res, ...warns) => {

            if (!err) {
              this.setCurrentPacProviderKey(key, res.lastModified);
              privates.lastPacUpdateStamp = Date.now();
              privates.ifFirstInstall = false;
              this.setAlarms();
            }

            resolve([err, null, ...warns]);

          }
        )
      );

      const ipsErrorPromise = new Promise(
        (resolve) => updatePacProxyIps(
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
          return cb(pacErr, null, ...warns);

        },
        cb
      );
      return undefined;

    },

    get pacUpdatePeriodInMinutes() {

      return privates.pacUpdatePeriodInMinutes;

    },

    setAlarms() {

      let nextUpdateMoment = this.lastPacUpdateStamp
        + (privates.pacUpdatePeriodInMinutes * 60 * 1000);
      const now = Date.now();
      if (nextUpdateMoment < now) {
        nextUpdateMoment = now;
      }

      console.log(
        'Next PAC update is scheduled on',
        new Date(nextUpdateMoment).toLocaleString('ru-RU')
      );

      chrome.alarms.create(
        privates.periodicUpdateAlarmReason,
        {
          when: nextUpdateMoment,
          periodInMinutes: privates.pacUpdatePeriodInMinutes,
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
      console.log(`${key} already installed.`);
      return cb();

    },

    clearPacAsync(originalCb = throwIfError) {

      const cb = asyncLogGroup('Cearing alarms and PAC...', originalCb);
      chrome.alarms.clearAll(
        () => chrome.proxy.settings.clear(
          {},
          chromified((err) => {

            if (err) {
              return cb(err);
            }
            this.setCurrentPacProviderKey(null);
            return handlers.updateControlState(cb);

          })
        )
      );

    },

  };

  // ON EACH LAUNCH, STARTUP, RELOAD, UPDATE, ENABLE
  ((async function init() {
    /*
       Event handlers that ALWAYS work (even if installation is not done
       or failed).
       E.g. install window may fail to open or be closed by user accidentally.
       In such case extension _should_ try to work on default parameters.
    */
    const antiCensorRu = window.apis.antiCensorRu;

    chrome.alarms.onAlarm.addListener(
      timeouted((alarm) => {

        if (alarm.name === privates.periodicUpdateAlarmReason) {
          console.log(
            'Periodic PAC update triggered:',
            new Date().toLocaleString('ru-RU')
          );
          antiCensorRu.syncWithPacProviderAsync(() => { /* swallow */ });
        }

      })
    );
    console.log('Alarm listener installed. We won\'t miss any PAC update.');

    window.addEventListener('online', () => {

      console.log('We are online, checking periodic updates...');
      antiCensorRu.setAlarms();

    });

    if (antiCensorRu.ifFirstInstall) {
      // INSTALL
      console.log('Installing...');
      privates.currentPacProviderKey = 'Антизапрет';
      return chrome.runtime.openOptionsPage();
    }

    // LAUNCH, RELOAD, UPDATE
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
    const ifUpdating = currentVersion !== privates.version;

    if (!ifUpdating) {

      // LAUNCH, RELOAD, ENABLE
      console.log('Extension launched, reloaded or enabled.');

    } else {

      // UPDATE & MIGRATION
      // Use old or migrate to defaults.
      const oldStorage = await new Promise((resolve) =>
        chrome.storage.local.get(null, resolve)
      );
      if (Object.keys(oldStorage).length) {
        // eslint-disable-next-line no-underscore-dangle
        let oldKey = oldStorage._currentPacProviderKey;
        if (oldKey) {
          const ifVeryOld = !Object.keys(antiCensorRu.pacProviders).includes(oldKey);
          const ifWasForced = localStorage.getItem('provider-backup');
          if (ifVeryOld || !ifWasForced) {
            if (!ifWasForced) {
              localStorage.setItem('provider-backup', oldKey);
            }
            oldKey = 'Антизапрет';
          }
        }
        privates.currentPacProviderKey = oldKey || null;
        // eslint-disable-next-line no-underscore-dangle
        privates.currentPacProviderLastModified = oldStorage._currentPacProviderLastModified || 0;
        privates.lastPacUpdateStamp = oldStorage.lastPacUpdateStamp || 0;
        await new Promise((resolve) => chrome.storage.local.clear(resolve));
      }
      privates.version = currentVersion;
      console.log('Extension updated.');

    }

    if (antiCensorRu.getPacProvider()) {
      antiCensorRu.setAlarms();
    }
    return undefined;

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
  })());

}
