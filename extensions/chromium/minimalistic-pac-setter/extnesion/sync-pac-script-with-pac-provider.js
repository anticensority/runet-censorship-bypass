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

  pacProviders: {
    Антизапрет: {
      pacUrl: 'http://antizapret.prostovpn.org/proxy.pac',
      proxyHosts: ['proxy.antizapret.prostovpn.org'],
      proxyIps: {'195.154.110.37': true}
    },
    Антиценз: {
      pacUrl: 'https://config.anticenz.org/proxy.pac',
      proxyHosts: ['gw2.anticenz.org'],
      proxyIps: {'185.120.5.7': true}
    },
    Оба_и_на_свитчах: {
      pacUrl: 'https://drive.google.com/uc?export=download&id=0B-ZCVSvuNWf0akpCOURNS2VCTmc',
      proxyHosts: ['gw2.anticenz.org', 'proxy.antizapret.prostovpn.org'],
      proxyIps: {'195.154.110.37': true, '185.120.5.7': true}
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

  ifNotInstalled: true,

  // PROTECTED

  pushToStorage(cb) {
		// Copy only settable properties.
		var onlySettable = {};
		for(var key of Object.keys(this))
			if (Object.getOwnPropertyDescriptor(this, key).writable && typeof(this[key]) !== 'function')
				onlySettable[key] = this[key]

    return chrome.storage.local.set(onlySettable, cb);
  },

  pullFromStorage(cb) {
    chrome.storage.local.get(null, storage => {
      for(var key of Object.keys(storage))
        this[key] = storage[key];

      if (cb)
        cb(storage);
    });
  },

  lastPacUpdateStamp: 0,

  syncWithPacProvider(cb) {
    setPacScriptFromProvider(
      this.pacProvider,
      err => {
        if (!err)
          this.lastPacUpdateStamp = Date.now();
        updatePacProxyIps(
          this.pacProvider,
          () => {
						this.ifNotInstalled = false;
						this.pushToStorage(cb)
					}
      )}
    )
  },

  _periodicUpdateAlarmReason: 'Периодичное обновление PAC-скрипта Антизапрет',

  installPac(key, cb) {

		if(typeof(key) === 'function') {
			cb = key;
			key = undefined;
		}

		if(key)
			this.currentPacProviderKey = key;

    var cb = asyncLogGroup('Installing PAC...', cb);

    chrome.alarms.clear(this._periodicUpdateAlarmReason,
      () => chrome.alarms.create(this._periodicUpdateAlarmReason, {
        periodInMinutes: 4*60
      })
    );

    this.syncWithPacProvider(cb);
  },

  clearPac(cb) {
    var cb = asyncLogGroup('Cearing PAC...', cb);
    chrome.alarms.clearAll( () => chrome.proxy.settings.clear(
			{},
			() => {
				this.currentPacProviderKey = undefined;
				return this.pushToStorage(cb);
			})
		);
  }

};

window.ifPulled = false;
window.onPulledFuns = [];
function pullFinished() {
  window.onPulledFuns.map( fun => fun() );
  window.ifPulled = true;
}
function execAfterPulled(fun) {
  if (window.ifPulled)
    fun();
  else
    window.onPulledFuns.push( fun );
}

chrome.runtime.onInstalled.addListener( details => {
  console.log('Installing, reason:', details.reason);
  switch(details.reason) {
    case 'update':
      return execAfterPulled( () => window.antiCensorRu.installPac() );
    case 'install':
      return execAfterPulled( () => {
        window.antiCensorRu.ifNotInstalled = true;
        chrome.runtime.openOptionsPage();
      } );
  }
});

window.antiCensorRu.pullFromStorage( () => {
  console.log('Pulled from storage.');

  chrome.alarms.onAlarm.addListener(
    alarm => {
      if (alarm.name === window.antiCensorRu._periodicUpdateAlarmReason) {
        console.log('Periodic update triggered:', new Date());
        window.antiCensorRu.syncWithPacProvider();
      }
    }
  );
  console.log('Installed alarm listener.');

  return pullFinished();
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

function httpGet(url, cb) {
  var cb = cb || (() => {});
  var req = new XMLHttpRequest();
  var ifAsync = true;
  req.open('GET', url, ifAsync);
  req.onload = event => {
    if (req.status !== 200)
      return cb(event);
    console.log('GETed with success.');
    return cb(null, req.responseText)
  };
  req.onerror = cb;
  req.send();
}

function updatePacProxyIps(provider, cb) {
  if (!provider.proxyHosts) {
    console.log(provider+' has no proxies defined.');
    return cb(null, null);
  }
  var cb = asyncLogGroup('Getting IP for '+ provider.proxyHosts.join(', ') +'...', cb);
  var i = 0;
  for (var proxyHost of provider.proxyHosts) {
    httpGet(
      'http://www.dns-lg.com/google1/'+ proxyHost +'/A',
      (err, res) => {
        if (!err) {
          provider.proxyIps = provider.proxyIps || {};
  				provider.proxyIps[ JSON.parse(res).answer[0].rdata ] = true;
        }
        if ( ++i == provider.proxyHosts.length )
          return cb(err, 'Complete.');
      }
    );
  }
}

function setPacScriptFromProvider(provider, cb) {
  var cb = asyncLogGroup('Getting pac script from provider...', provider.pacUrl, cb);

  httpGet(
    provider.pacUrl,
    (err, res) => {
      if (err)
        return cb(err);
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
