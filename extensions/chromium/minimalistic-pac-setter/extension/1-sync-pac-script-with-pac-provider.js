'use strict';

/*
  Task 1. Gets IPs for proxies of antizapret/anticenz via dns over https.
          These IPs are used in block-informer to inform user when proxy is ON.
  Task 2. Downloads PAC proxy script from antizapret/anticenz/my Google Drive and sets it in Chromium settings.
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

    pacProviders: {
      Антизапрет: {
        pacUrl: 'https://antizapret.prostovpn.org/proxy.pac',
        proxyHosts: ['proxy.antizapret.prostovpn.org'],
        proxyIps: {
          '195.123.209.38': 'proxy.antizapret.prostovpn.org',
          '2a02:27ac::10':  'proxy.antizapret.prostovpn.org'
        }
      },
      Антиценз: {
        pacUrl: 'https://config.anticenz.org/proxy.pac',
        proxyHosts: ['gw2.anticenz.org'],
        proxyIps: {
          '5.196.220.114': 'gw2.anticenz.org'
        }
      },
      Оба_и_на_свитчах: {
        //pacUrl: 'https://drive.google.com/uc?export=download&id=0B-ZCVSvuNWf0akpCOURNS2VCTmc', // 0.14
        pacUrl: 'https://drive.google.com/uc?export=download&id=0B-ZCVSvuNWf0bzNUR2F4RF8wOU0',   // 0.15
        proxyHosts: ['proxy.antizapret.prostovpn.org', 'gw2.anticenz.org'],
        proxyIps: {
          '195.123.209.38': 'proxy.antizapret.prostovpn.org',
          '2a02:27ac::10':  'proxy.antizapret.prostovpn.org',
          '5.196.220.114':  'gw2.anticenz.org'
        }
      }
    },

    _currentPacProviderKey: 'Оба_и_на_свитчах',

    isProxied(ip) {

      // Executed on each request with ip. Make it as fast as possible.
      return this._currentPacProviderKey && this.pacProviders[this._currentPacProviderKey].proxyIps.hasOwnProperty(ip);
      // The benefit of removing lookups is little, e.g. this._currentProxyIps && this._currentProxyIps.hasOwnProperty(ip);

    },

    mustBeKey(key) {

      if ( !(key === null || this.pacProviders[key]) ) {
        throw new IllegalArgumentException('No provider for key:' + key);
      }

    },

    get currentPacProviderKey() { return this._currentPacProviderKey },
    set currentPacProviderKey(newKey) {

      this.mustBeKey(newKey);
      this._currentPacProviderKey = newKey;

    },

    getPacProvider(key) {

      if(key) {
        this.mustBeKey(key);
      }
      else {
        key = this.currentPacProviderKey;
      }
      return this.pacProviders[key];

    },

    /*
      Is it the first time extension installed? Do something, e.g. initiate PAC sync.
    */
    ifFirstInstall: false,
    lastPacUpdateStamp: 0,

    _periodicUpdateAlarmReason: 'Периодичное обновление PAC-скрипта Антизапрет',

    pushToStorage(cb) {

      console.log('Pushing to storage...');

      // Copy only settable properties (except functions).
      const onlySettable = {};
      for(const key of Object.keys(this)) {
        if (Object.getOwnPropertyDescriptor(this, key).writable && typeof(this[key]) !== 'function') {
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

    syncWithPacProvider(key, cb) {

      if( !key || typeof(key) === 'function' ) {
        cb = key;
        key = this.currentPacProviderKey;
      }
      cb = asyncLogGroup('Syncing with PAC provider ' + key + '...', cb);

      if (key === null) {
        // No pac provider set.
        return cb({clarification:{message:'Сперва выберите PAC-провайдера.'}});
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

      let nextUpdateMoment = this.lastPacUpdateStamp + this._pacUpdatePeriodInMinutes*60*1000;
      const now = Date.now();
      if (nextUpdateMoment < now) {
        nextUpdateMoment = now;
      }

      console.log( 'Next PAC update is scheduled on', new Date(nextUpdateMoment).toLocaleString('ru-RU') );

      chrome.alarms.create(
        this._periodicUpdateAlarmReason,
        {
          when: nextUpdateMoment,
          periodInMinutes: this._pacUpdatePeriodInMinutes
        }
      );

      return nextUpdateMoment === now; // ifAlarmTriggered. May be changed in the future.

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
    }

  };

  // ON EACH LAUNCH, STARTUP, RELOAD, UPDATE, ENABLE
  chrome.storage.local.get(null, (oldStorage) => {

    checkChromeError();
    /*
       Event handlers that ALWAYS work (even if installation is not done or failed).
       E.g. install window may fail to open or be closed by user accidentally.
       In such case extension _should_ try to work on default parameters.
    */
    chrome.alarms.onAlarm.addListener(
      (alarm) => {

        if (alarm.name === antiCensorRu._periodicUpdateAlarmReason) {
          console.log('Periodic PAC update triggered:', new Date().toLocaleString('ru-RU'));
          antiCensorRu.syncWithPacProvider(/* Swallows errors. */);
        }

      }
    );
    console.log('Alarm listener installed. We won\'t miss any PAC update.');

    window.addEventListener('online',  () => {

      console.log('We are online, checking periodic updates...');
      antiCensorRu.setAlarms();

    });

    console.log('Storage on init:', oldStorage);
    antiCensorRu.ifFirstInstall = Object.keys(oldStorage).length === 0;

    if (!antiCensorRu.ifFirstInstall) {
      // LAUNCH, RELOAD, UPDATE
      antiCensorRu._currentPacProviderKey = oldStorage._currentPacProviderKey || null; // Old or migrate.
      antiCensorRu.lastPacUpdateStamp = oldStorage.lastPacUpdateStamp || antiCensorRu.lastPacUpdateStamp; // Old or migrate to default.
      console.log( 'Last PAC update was on', new Date(antiCensorRu.lastPacUpdateStamp).toLocaleString('ru-RU') );
    }
    else {
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
      1. There is no way to check that chrome.runtime.onInstalled wasn't fired except timeout.
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
    console.group.apply(console, args);
    return function(...cbArgs) {

      console.groupEnd();
      console.log('Group finished.');
      cb.apply(this, cbArgs);

    }
  }

  function checkChromeError(betterStack) {

    // Chrome API calls your cb in a context different from the point of API method invokation.
    const err = chrome.runtime.lastError || chrome.extension.lastError || null;
    if (err) {
      const args = ['API returned error:', err];
      if (betterStack) {
        args.push('\n' + betterStack);
      }
      console.warn.apply(console, args);
    }
    return err;

  }

  function chromified(cb, ...replaceArgs) {

    const stack = (new Error()).stack;
    // Take error first callback and covert it to chrome api callback.
    return function(...args) {

      if (replaceArgs.length) {
        args = replaceArgs;
      }
      const err = checkChromeError(stack);
      cb && cb.call(this, err, ...args);

    };

  }

  function setPac(pacData, cb) {

    const config = {
      mode: 'pac_script',
      pacScript: {
        mandatory: false,
        data: pacData
      }
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
          return cb({clarification: {message:'Настройки прокси контролирует другое расширение. <a href="chrome://settings/search#proxy">Какое?</a>'}});
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
          res.clarification = {message: 'Получен ответ с неудачным HTTP-кодом ' + status + '.'};
          return textCb(res);
        }
        console.log('GETed with success:', url, Date.now() - start);
        textCb();

      },
      (err) => {

        err.clarification = {message: 'Что-то не так с сетью, проверьте соединение.'};
        cb && cb(err);

      }
    );
  }

  function getOneDnsRecord(args, cb) {

    // args: { host:..., type: 'AAAA', filter: ['AAAA'] }
    if (!(args.host && args.type && cb)) {
      throw new Error('Wrong args:' + host + ',' + type);
    }

    const type2str = {
      // https://en.wikipedia.org/wiki/List_of_DNS_record_types
      // A, AAAA may be localized (github, e.g.), but you may use ANY
      1:  'A',      // IPv4
      28: 'AAAA',   // IPv6
      2:  'NS',
      5:  'CNAME',  // Synonyms, returned by server together with A/AAAA.
      255: 'ANY'    // Deprecated on some servers, not recommended
    };

    httpGet(
      'https://dns.google.com/resolve?type=' + args.type + '&name=' + args.host,
      (err, res) => {
        if (res) {
          try {
            res = JSON.parse(res);
            console.log('Json parsed.');
            if (err || res.Status) {
              const msg = ['Answer', 'Comment', 'Status']
                .filter( (prop) => res[ prop ] )
                .map( (prop) => prop + ': ' + JSON.stringify( res[ prop ] ) )
                .join(', \n');
              err.clarification.message += ' Сервер (json): ' + msg;
              err.data = err.data || res;
            }
            else {
              res = res.Answer || [];
              for (const record of res) {
                record.type = type2str[ record.type ];
              }
              if ( args.filter ) {
                res = res.filter( (record) => args.filter.indexOf( record.type ) > -1 );
              }
            }
          }
          catch(e) {
            err = e || err || {clarification:{message:''}};
            err.clarification = err.clarification || { message: '' };
            err.clarification.message += ' Сервер (текст): '+ res;
            err.clarification.message.trim();
            err.data = err.data || res;
          }
        }
        cb( err, res );
      }
    );
  };

  function getDnsRecords(args, cb) {

    /*
      Example of input:
        {
          // Required
            host: 'proxy.navalny.cia.gov',
          // Optional
            types: {
              string: ['A', 'AAAA'], // <- Default. Makes one request per each type.
              filter: ['A', 'AAAA'], // <- Default. E.g., you want to get rid of CNAME type from response.
            }
        }
      Exmple of answer from google:
        "Answer":
        [
          {
            "name": "apple.com.",   // Always matches name in the Question section
            "type": 1,              // A - Standard DNS RR type
            "TTL": 3599,            // Record's time-to-live in seconds
            "data": "17.178.96.59"  // Data for A - IP address as text
          },
        ...
      Exmple of output:
        The same as google, but types _may be_ canonical strings ('AAAA', 'A')
    **/

    if ( !args.host.length ) {
      throw new Error('args.host is required: ' + args.host);
    }
    args.types = Object.assign({
      string: ['A', 'AAAA'],
      filter: ['A', 'AAAA']
    }, args.types);

    const promises = args.types.string.map(
      (type) => new Promise( (resolve, reject) =>
        getOneDnsRecord({ host: args.host, type: type, filter: args.types.filter }, (err, res) => err ? reject(err) : resolve(res) )
      )
    );
    Promise.all(promises).then( (answers) => cb( null, [].concat.apply([], answers) ), cb );
  }

  const getIpDnsRecords = (host, cb) => getDnsRecords({ host: host }, cb);

  function updatePacProxyIps(provider, cb) {

    cb = asyncLogGroup('Getting IP for '+ provider.proxyHosts.join(', ') +'...', cb);
    let failure = {
      clarification: {message:'Не удалось получить один или несколько IP адресов для прокси-серверов. Иконка для уведомления об обходе блокировок может не отображаться.'},
      errors: {}
    };
    let i = 0;
    provider.proxyHosts.map(
      (proxyHost) => getIpDnsRecords(
        proxyHost,
        (err, records) => {

          if (!err) {
            provider.proxyIps = provider.proxyIps || {};
            records.forEach( (ans) => provider.proxyIps[ ans.data ] = proxyHost );
          }
          else {
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

    cb = asyncLogGroup('Getting pac script from provider...', provider.pacUrl, cb);

    httpGet(
      provider.pacUrl,
      (err, pacData) => {

        if (err) {
          err.clarification = {
            message: 'Не удалось скачать PAC-скрипт с адреса: ' + provider.pacUrl + '.',
            prev: err.clarification
          };
          return cb(err);
        }
        setPac(pacData, cb);

      }
    );
  }

}

window.addEventListener('error', (err) => {

  console.error('Global error');

});

window.addEventListener('unhandledrejection', (event) => {

  console.warn('Unhandled rejection. Throwing error.');
  event.preventDefault();
  throw event.reason;

});

chrome.proxy.settings.onChange.addListener((details) => {

   console.log('Proxy settings changed.', details);
   const ifOther = details.levelOfControl.startsWith('controlled_by_other');

});
