'use strict';

/*
  Task 1. Gets IPs for proxies of antizapret/anticenz with dns-lg.com.
          These IPs are used in block-informer to inform user when proxy is ON.
  Task 2. Downloads PAC proxy script from antizapret/anticenz/my Google Drive and sets it in Chromium settings.
  Task 3. Schedules tasks 1 & 2 for every 4 hours.
*/

/*
  In background scripts use window.antiCensorRu public variables.
  In pages window.antiCensorRu are not accessible,
    use chrome.runtime.getBackgroundPage(..),
    avoid old extension.getBackgroundPage.
*/

window.antiCensorRu = {

  // PUBLIC

  version: chrome.runtime.getManifest().version,

  pacProviders: {
    Антизапрет: {
      pacUrl: 'https://antizapret.prostovpn.org/proxy.pac',
      proxyHosts: ['proxy.antizapret.prostovpn.org'],
      proxyIps: {
        '195.154.110.37': 'proxy.antizapret.prostovpn.org',
        '195.123.209.38': 'proxy.antizapret.prostovpn.org'
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
      pacUrl: 'https://drive.google.com/uc?export=download&id=0B-ZCVSvuNWf0akpCOURNS2VCTmc',
      //pacUrl: 'https://drive.google.com/uc?export=download&id=0B-ZCVSvuNWf0WGczNmJzY3gzMWc', // Beta
      proxyHosts: ['proxy.antizapret.prostovpn.org', 'gw2.anticenz.org'],
      proxyIps: {
        '195.154.110.37': 'proxy.antizapret.prostovpn.org',
        '195.123.209.38': 'proxy.antizapret.prostovpn.org',
        '5.196.220.114': 'gw2.anticenz.org'
      }
    }
  },

  _currentPacProviderKey: 'Оба_и_на_свитчах',

  get currentPacProviderKey() { return this._currentPacProviderKey },
  set currentPacProviderKey(newKey) {
    if (newKey && !this.pacProviders[newKey])
      throw new IllegalArgumentException('No provider for key:'+newKey);
    this._currentPacProviderKey = newKey;
  },

  get pacProvider() { return this.pacProviders[this.currentPacProviderKey] },

  /*
    Is it the first time extension installed? Do something, e.g. initiate PAC sync.
  */
  ifFirstInstall: false,
  lastPacUpdateStamp: 0,

  // PROTECTED
  _periodicUpdateAlarmReason: 'Периодичное обновление PAC-скрипта Антизапрет',

  pushToStorage(cb) {
    console.log('Pushing...');

    // Copy only settable properties.
    var onlySettable = {};
      for(var key of Object.keys(this))
        if (Object.getOwnPropertyDescriptor(this, key).writable && typeof(this[key]) !== 'function')
          onlySettable[key] = this[key]

    return chrome.storage.local.clear(
      () => chrome.storage.local.set(
        onlySettable,
        () => cb && cb(chrome.runtime.lastError, onlySettable)
      )
    );

  },

  pullFromStorage(cb) {
    chrome.storage.local.get(null, storage => {
      console.log('In storage:', storage);
      for(var key of Object.keys(storage))
        this[key] = storage[key];

      console.log('Synced with storage, any callback?', !!cb);
      if (cb)
        cb(chrome.runtime.lastError, storage);
    });
  },

  syncWithPacProvider(cb) {
    var cb = asyncLogGroup('Syncing with PAC provider...', cb);
    if (!this.pacProvider)
      return cb({clarification:{message:'Сперва выберите PAC-провайдера.'}});

    var pacSetPromise = new Promise(
      (resolve, reject) => setPacScriptFromProvider(
        this.pacProvider,
        (err, res) => {
          if (err)
            return reject(err);

          this.lastPacUpdateStamp = Date.now();
          this.ifFirstInstall = false;
          this.setAlarms();

          return resolve(res);
        }
      )
    );

    return updatePacProxyIps(
      this.pacProvider,
      ipsError => {
        if (ipsError && ipsError.clarification)
          ipsError.clarification.ifNotCritical = true;
        pacSetPromise.then(
          res => this.pushToStorage(
            pushError => pushError ? cb(pushError) : cb(ipsError, res)
          ),
          err => cb(err)
        )
      }
    );
  },
  
  _pacUpdatePeriodInMinutes: 4*60,

  setAlarms() {

    var nextUpdateMoment = this.lastPacUpdateStamp + this._pacUpdatePeriodInMinutes*60*1000;
    var now = Date.now();
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

    return nextUpdateMoment === now; // ifAlarmTriggered. May be changed.
  },

  installPac(key, cb) {
    if(typeof(key) === 'function') {
      cb = key;
      key = undefined;
    }

    if(key)
      this.currentPacProviderKey = key;

    return this.syncWithPacProvider(cb);
  },

  clearPac(cb) {
    var cb = asyncLogGroup('Cearing alarms and PAC...', cb);
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
chrome.storage.local.get(null, oldStorage => {

  console.log('Init on storage:', oldStorage);
  antiCensorRu.ifFirstInstall = Object.keys(oldStorage).length === 0;

  if (!antiCensorRu.ifFirstInstall) {
    // LAUNCH, RELOAD, UPDATE
    antiCensorRu._currentPacProviderKey = oldStorage._currentPacProviderKey;
    antiCensorRu.lastPacUpdateStamp = oldStorage.lastPacUpdateStamp || antiCensorRu.lastPacUpdateStamp;
    console.log( 'Last PAC update was on', new Date(antiCensorRu.lastPacUpdateStamp).toLocaleString('ru-RU') );
  }

  chrome.alarms.onAlarm.addListener(
    alarm => {
      if (alarm.name === antiCensorRu._periodicUpdateAlarmReason) {
        console.log('Periodic PAC update triggered:', new Date().toLocaleString('ru-RU'));
        antiCensorRu.syncWithPacProvider();
      }
    }
  );
  console.log('Alarm listener installed. We won\'t miss any PAC update.');
  
  if (antiCensorRu.ifFirstInstall) {
    // INSTALL
    console.log('Installing...');
    return chrome.runtime.openOptionsPage();
  }

  if (!antiCensorRu.pacProvider)
    return console.log('No PAC provider set. Do nothing.');

  /* 
    1. There is no way to check that chrome.runtime.onInstalled wasn't fired except timeout.
       Otherwise we could put storage migration code only there.
    2. We have to check storage for migration before using it.
       Better on each launch then on each pull.
  */

  var ifAlarmTriggered = antiCensorRu.setAlarms();
  
  if (antiCensorRu.version === oldStorage.version) {
    // LAUNCH, RELOAD, ENABLE
    antiCensorRu.pacProviders = oldStorage.pacProviders;
    return console.log('Extension launched, reloaded or enabled.');
  }

  // UPDATE & MIGRATION
  console.log('Extension updated.');
  if (!ifAlarmTriggered)
    updatePacProxyIps(
      antiCensorRu.pacProvider,
      ipsError => ipsError ? console.error('Error updating IPs:', ipsError) : antiCensorRu.pushToStorage()
    );

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
  var args = [].slice.apply(arguments);
  var cb = args.pop();
  console.group.apply(console, args);
  return function() {
    console.groupEnd();
    console.log('Group finished.');
    var _cb = cb || (() => {});
    return _cb.apply(this, arguments);
  }
}

function httpGet(url, cb) {
  return fetch(url).then(
    res => {
      var textCb = err => cb && res.text().then( text => cb(err, text), cb );
      var status = res.status;
      if ( !( status >= 200 && status < 300 || status === 304 ) ) {
        res.clarification = {message: 'Получен ответ с неудачным HTTP-кодом '+status+'.'};
        return textCb(res);
      }
      console.log('GETed with success.');
      return textCb();
    },
    err => {
      err.clarification = {message: 'Что-то не так с сетью, проверьте соединение.'};
      return cb && cb(err);
    }
  );
}

function getIpsAndCnames(host, cb) {
  httpGet(
    'http://www.dns-lg.com/google1/'+ host +'/a',
    (err, res) => {
      if (res)
        try {
          res = JSON.parse(res);
          if (err)
            err.clarification.message += ' Сервер: '+ res.message;
          else
            res = res.answer;
        } catch(e) {
          err = err || {clarification:{message:''}};
          err.clarification.message += ' Сервер: '+ res;
          err.clarification.message.trim();
        }
      return cb( err, res );
    }
  );
}

function updatePacProxyIps(provider, cb) {
  var cb = asyncLogGroup('Getting IP for '+ provider.proxyHosts.join(', ') +'...', cb);
  var failure = {
    clarification: {message:'Не удалось получить один или несколько IP адресов для прокси-серверов. Иконка для уведомления об обходе блокировок может не отображаться.'},
    errors: {}
  };  
  var i = 0;
  provider.proxyHosts.map(
    proxyHost => getIpsAndCnames(
      proxyHost,
      (err, ans) => {
        if (!err) {
          provider.proxyIps = provider.proxyIps || {};
          ans.filter( ans => ans.type === 'A' ).map( ans => provider.proxyIps[ ans.rdata ] = proxyHost );
        } else
          failure.errors[proxyHost] = err;

        if ( ++i == provider.proxyHosts.length ) {
          failure = Object.keys(failure.errors).length ? failure : null;
          return cb(failure, provider.proxyIps);
        }
      }
    )
  );
}

function setPacScriptFromProvider(provider, cb) {
  var cb = asyncLogGroup('Getting pac script from provider...', provider.pacUrl, cb);

  httpGet(
    provider.pacUrl,
    (err, res) => {
      if (err) {
        err.clarification = {
          message: 'Не удалось скачать PAC-скрипт с адреса: '+ provider.pacUrl +'.',
          prev: err.clarification
        };
        return cb(err);
      }
      console.log('Clearing chrome proxy settings...');
      return chrome.proxy.settings.clear({}, () => {
        var config = {
          mode: 'pac_script',
          pacScript: {
            mandatory: false,
            data: res
          }
        };
        console.log('Setting chrome proxy settings...');
        chrome.proxy.settings.set( {value: config}, cb );
      });
    }
  );
}
