'use strict';

/*
  Task 1. Gets IP for host proxy.antizapret.prostovpn.org with dns-lg.com.
          This IP is used in block-informer to inform user when proxy is ON.
  Task 2. Downloads PAC proxy script from Antizapret and sets it in Chromium settings.
  Task 3. Schedules tasks 1 & 2 for every 2 hours.
*/


/*
  In background scripts use window.antiCensorRu public variables.
  Thay are synced with chrome.storage so they persist restarts.
  In pages window.antiCensorRu are not accessible,
    use chrome.runtime.getBackgroundPage(..),
    avoid old extension.getBackgroundPage.
*/

window.antiCensorRu = {

  // PUBLIC
  
  version: chrome.runtime.getManifest().version,

  pacProviders: {
    Антизапрет: {
      pacUrl: 'http://antizapret.prostovpn.org/proxy.pac',
      proxyHosts: ['proxy.antizapret.prostovpn.org'],
      proxyIps: {
        '195.154.110.37': 'proxy.antizapret.prostovpn.org'
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
      proxyHosts: ['gw2.anticenz.org', 'proxy.antizapret.prostovpn.org'],
      proxyIps: {
        '5.196.220.114': 'gw2.anticenz.org',
        '195.154.110.37': 'proxy.antizapret.prostovpn.org'
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
  
  migrateStorage(cb) {
    chrome.storage.local.get(null, oldStorage => {
      
      var getPubCounter = version => parseInt( version.match(/\d+$/)[0] );
      var version = oldStorage.version || '0.0.0.0';
      var oldPubCounter = getPubCounter( version );
            
      if (oldPubCounter > 9) {
        console.log('No migration required, storage pub', oldPubCounter, 'is up to date.');
        return cb && cb(chrome.runtime.lastError, oldStorage);
      }

      console.log('Starting storage migration from publication', oldPubCounter, 'to', getPubCounter( this.version ));

      this._currentPacProviderKey = oldStorage._currentPacProviderKey;
      this.lastPacUpdateStamp = oldStorage.lastPacUpdateStamp;
      // There is no need to persist other properties in the storage.
      
      return this.pushToStorage(cb);

      /*

        History of Changes to Storage
        -----------------------------

        Version 0.0.0.10

          * Added this.version
          * PacProvider.proxyIps changed from {ip -> Boolean} to {ip -> hostname}

        Version 0.0.0.8-9        

          * Changed storage.ifNotInstalled to storage.ifFirstInstall
          * Added storage.lastPacUpdateStamp

      **/
    });
  },

  syncWithPacProvider(cb) {
    var cb = cb || (() => {});

    var pacSetPromise = new Promise(
      (resolve, reject) => setPacScriptFromProvider(
        this.pacProvider,
        (err, res) => {
          if (err)
            return reject(err);
          this.lastPacUpdateStamp = Date.now();
          this.ifFirstInstall = false;
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

  installPac(key, cb) {

    if(typeof(key) === 'function') {
      cb = key;
      key = undefined;
    }

    if(key)
      this.currentPacProviderKey = key;

    var cb = asyncLogGroup('Installing PAC...', cb);

    chrome.alarms.clear(
      this._periodicUpdateAlarmReason,
      () => chrome.alarms.create(
        this._periodicUpdateAlarmReason,
        { periodInMinutes: 4*60 }
      )
    );

    this.syncWithPacProvider(cb);
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

// ON EACH LAUNCH OF EXTENSION
// Not only on Chrome's startUp, but aslo on Enable/Disable

window.storageSyncedPromise = new Promise(
  (resolve, reject) => {
    /* We have to migrate on each launch, because:
        1. There is no way to check that chrome.runtime.onInstalled wasn't fired except timeout.
        2. There is no way to schedule onInstalled before pullFromStorage without timeouts.
        3. So inside onInstalled storage may only be already pulled.
    */
    window.antiCensorRu.migrateStorage(
      (err, migratedStorage) => 
        err ? reject(err) : window.antiCensorRu.pullFromStorage(
          (err, res) => err ? reject(err) : resolve(res)
        )
    );
  }
);

window.storageSyncedPromise.then(
  storage => {

    chrome.alarms.onAlarm.addListener(
      alarm => {
        if (alarm.name === window.antiCensorRu._periodicUpdateAlarmReason) {
          console.log('Periodic update triggered:', new Date());
          window.antiCensorRu.syncWithPacProvider();
        }
      }
    );
    console.log('Alarm listener installed. We won\'t miss any PAC update.');

    chrome.alarms.get(
      window.antiCensorRu._periodicUpdateAlarmReason,
      alarm => alarm && console.log(
        'Next update is scheduled on', new Date(alarm.scheduledTime).toLocaleString('ru-RU')
      )
    );

  }
);

chrome.runtime.onInstalled.addListener( installDetails => {
  console.log('Extension just installed, reason:', installDetails.reason);
  window.storageSyncedPromise.then(
    storage => {

      switch(installDetails.reason) {
        case 'update':
          console.log('Update or reload. Do nothing.');
          break;
        case 'install':
          window.antiCensorRu.ifFirstInstall = true;
          chrome.runtime.openOptionsPage();
      }

    }
  )
});

// PRIVATE

function asyncLogGroup() {
  var args = [].slice.apply(arguments);
  var cb = args.pop();
  console.group.apply(console, args);
  return function() {
    console.log('Finished');
    console.groupEnd();
    var _cb = cb || (() => {});
    return _cb.apply(this, arguments);
  }
}

function ifSuccessfulCode(status) {
  return status >= 200 && status < 300 || status === 304;
}

function httpGet(url, cb) {
  var cb = cb || (() => {});
  var req = new XMLHttpRequest();
  var ifAsync = true;
  req.open('GET', url, ifAsync);
  req.onload = event => {
    if ( !ifSuccessfulCode(req.status) ) {
      req.clarification = {message: 'Получен ответ с неудачным HTTP-кодом '+req.status+ '.'};
      return cb(req);
    }
    console.log('GETed with success.');
    return cb(null, req.responseText)
  };
  req.onerror = event => { event.clarification = {message: 'Что-то не так с сетью, проверьте соединение.'}; return cb(event); };
  req.send();
}

function updatePacProxyIps(provider, cb) {
  if (!provider.proxyHosts) {
    console.log(provider+' has no proxies defined.');
    return cb(null, null);
  }
  var cb = asyncLogGroup('Getting IP for '+ provider.proxyHosts.join(', ') +'...', cb);
  var failure = {
    clarification: {message:'Не удалось получить один или несколько IP адресов для прокси-серверов. Иконка для уведомления об обходе блокировок может не отображаться.'},
    errors: {}
  };
  var i = 0;
  for (var proxyHost of provider.proxyHosts) {
    httpGet(
      'http://www.dns-lg.com/google1/'+ proxyHost +'/A',
      (err, res) => {
        if (!err) {
          provider.proxyIps = provider.proxyIps || {};
                  provider.proxyIps[ JSON.parse(res).answer[0].rdata ] = proxyHost;
        } else
          failure.errors[proxyHost] = err;

        if ( ++i == provider.proxyHosts.length ) {
          failure = Object.keys(failure.errors).length ? failure : null;
          return cb(failure, provider.proxyIps);
        }
      }
    );
  }
}

function setPacScriptFromProvider(provider, cb) {
  var cb = asyncLogGroup('Getting pac script from provider...', provider.pacUrl, cb);

  httpGet(
    provider.pacUrl,
    (err, res) => {
      if (err) {
        err.clarification = {
          message: 'Не удалось скачать PAC-скрипт с адреса: ' +provider.pacUrl+ '.',
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
