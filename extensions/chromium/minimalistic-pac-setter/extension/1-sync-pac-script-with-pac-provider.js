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
      //pacUrl: 'https://drive.google.com/uc?export=download&id=0B-ZCVSvuNWf0akpCOURNS2VCTmc',
      pacUrl: 'https://drive.google.com/uc?export=download&id=0B-ZCVSvuNWf0WGczNmJzY3gzMWc', // Beta
      proxyHosts: ['proxy.antizapret.prostovpn.org', 'gw2.anticenz.org'],
      proxyIps: {
        '195.123.209.38': 'proxy.antizapret.prostovpn.org',
        '2a02:27ac::10':  'proxy.antizapret.prostovpn.org',
        '5.196.220.114':  'gw2.anticenz.org'
      }
    }
  },

  _currentPacProviderKey: 'Оба_и_на_свитчах',

  get currentPacProviderKey() { return this._currentPacProviderKey },
  set currentPacProviderKey(newKey) {

    if (newKey && !this.pacProviders[newKey])
      throw new IllegalArgumentException('No provider for key:' + newKey);
    this._currentPacProviderKey = newKey;
  },

  get pacProvider() { return this.pacProviders[this.currentPacProviderKey] },

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

    return chrome.storage.local.clear(
      () => chrome.storage.local.set(
        onlySettable,
        () => cb && cb(chrome.runtime.lastError, onlySettable)
      )
    );

  },

  pullFromStorage(cb) {

    chrome.storage.local.get(null, (storage) => {
      console.log('Pulled from storage:', storage);
      for(const key of Object.keys(storage)) {
        this[key] = storage[key];
      }

      console.log('Synced with storage, any callback?', !!cb);
      if (cb) {
        cb(chrome.runtime.lastError, storage);
      }
    });
  },

  syncWithPacProvider(cb) {

    cb = asyncLogGroup('Syncing with PAC provider...', cb);
    if (!this.pacProvider) {
      return cb({clarification:{message:'Сперва выберите PAC-провайдера.'}});
    }

    var pacSetPromise = new Promise(
      (resolve, reject) => setPacScriptFromProvider(
        this.pacProvider,
        (err, res) => {

          if (err) {
            return reject(err);
          }

          this.lastPacUpdateStamp = Date.now();
          this.ifFirstInstall = false;
          this.setAlarms();

          return resolve(res);
        }
      )
    );

    return updatePacProxyIps(
      this.pacProvider,
      (ipsError) => {

        if (ipsError && ipsError.clarification) {
          ipsError.clarification.ifNotCritical = true;
        }
        pacSetPromise.then(
          (res) => this.pushToStorage(
            (pushError) => pushError ? cb(pushError) : cb(ipsError, res)
          ),
          cb
        )
      }
    );
  },

  _pacUpdatePeriodInMinutes: 4*60,

  setAlarms() {

    let nextUpdateMoment = this.lastPacUpdateStamp + this._pacUpdatePeriodInMinutes*60*1000;
    const now = Date.now();
    if (nextUpdateMoment < now)
      nextUpdateMoment = now;

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

    if(typeof(key) === 'function') {
      cb = key;
      key = undefined;
    }

    if(key) {
      this.currentPacProviderKey = key;
    }

    return this.syncWithPacProvider(cb);
  },

  clearPac(cb) {

    cb = asyncLogGroup('Cearing alarms and PAC...', cb);
    chrome.alarms.clearAll(
      () => chrome.proxy.settings.clear(
        {},
        () => {

          this.currentPacProviderKey = undefined;
          return this.pushToStorage(cb);
        }
      )
    );
  }

};

// ON EACH LAUNCH, STARTUP, RELOAD, UPDATE, ENABLE
chrome.storage.local.get(null, (oldStorage) => {

  console.log('Init on storage:', oldStorage);
  antiCensorRu.ifFirstInstall = Object.keys(oldStorage).length === 0;

  if (!antiCensorRu.ifFirstInstall) {
    // LAUNCH, RELOAD, UPDATE
    antiCensorRu._currentPacProviderKey = oldStorage._currentPacProviderKey;
    antiCensorRu.lastPacUpdateStamp = oldStorage.lastPacUpdateStamp || antiCensorRu.lastPacUpdateStamp;
    console.log( 'Last PAC update was on', new Date(antiCensorRu.lastPacUpdateStamp).toLocaleString('ru-RU') );
  }

  chrome.alarms.onAlarm.addListener(
    (alarm) => {

      if (alarm.name === antiCensorRu._periodicUpdateAlarmReason) {
        console.log('Periodic PAC update triggered:', new Date().toLocaleString('ru-RU'));
        antiCensorRu.syncWithPacProvider(/* Swallows errors. */);
      }
    }
  );
  console.log('Alarm listener installed. We won\'t miss any PAC update.');

  if (antiCensorRu.ifFirstInstall) {
    // INSTALL
    console.log('Installing...');
    return chrome.runtime.openOptionsPage();
  }

  if (!antiCensorRu.pacProvider) {
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
    updatePacProxyIps(
      antiCensorRu.pacProvider,
      (ipsError) => ipsError ? console.error('Error updating IPs:', ipsError) : antiCensorRu.pushToStorage(/* Swallows errors. */)
    );
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

function asyncLogGroup() {

  const args = [].slice.apply(arguments);
  const cb = args.pop() || (() => {});
  console.group.apply(console, args);
  return function() {

    console.groupEnd();
    console.log('Group finished.');
    return cb.apply(this, arguments);

  }
}

function httpGet(url, cb) {

  const start = Date.now();
  return fetch(url).then(
    (res) => {

      const textCb = (err) => cb && res.text().then( text => cb(err, text), cb );
      const status = res.status;
      if ( !( status >= 200 && status < 300 || status === 304 ) ) {
        res.clarification = {message: 'Получен ответ с неудачным HTTP-кодом ' + status + '.'};
        return textCb(res);
      }
      console.log('GETed with success:', url, Date.now() - start);
      return textCb();
    },
    (err) => {

      err.clarification = {message: 'Что-то не так с сетью, проверьте соединение.'};
      return cb && cb(err);
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
      return cb( err, res );
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
          return cb(failure, provider.proxyIps);
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

      console.log('Clearing chrome proxy settings...');
      return chrome.proxy.settings.clear({}, () => {

        const config = {
          mode: 'pac_script',
          pacScript: {
            mandatory: false,
            data: pacData
          }
        };
        console.log('Setting chrome proxy settings...');
        chrome.proxy.settings.set( {value: config}, cb );
      });
    }
  );
}