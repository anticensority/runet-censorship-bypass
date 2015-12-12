'use strict';

/*
  Task 1. Gets IP for host proxy.antizapret.prostovpn.org with dns-lg.com.
	        This IP is used in block-informer to inform user when proxy is ON.
	Task 2. Downloads PAC proxy script from Antizapret and sets it in Chromium settings.
  Task 3. Schedules tasks 1 & 2 for every 2 hours.
*/

var antizapret = {
	pacUrl: 'http://antizapret.prostovpn.org/proxy.pac',
	proxyHost: 'proxy.antizapret.prostovpn.org',
	proxyIp: '195.154.110.37',
};

function httpGet(url, cb) {
	var cb = cb || (() => {});
	var req = new XMLHttpRequest();
	var ifAsync = true;
	req.open('GET', url, ifAsync);
	req.onload = event => {
		if (req.status === 404)
			return cb(event);
		return cb(null, req.responseText)
	};
	req.onerror = cb;
	req.send();
}

function getIpForHost(host, cb) {
	httpGet(
  	'http://www.dns-lg.com/google1/'+host+'/A',
		cb
  );
}

function updateAntizapretProxyIp() {
	getIpForHost(
		antizapret.proxyHost,
		(err, res) => {
			if (err)
				console.log(err)
			else
				antizapret.proxyIp = JSON.parse(res).answer[0].rdata;
		}
	);
}

function setPacScriptFromAntizapret() {
	httpGet(
  	antizapret.pacUrl,
  	(err, res) => {

  		if (err)
  			return;
  		chrome.proxy.settings.clear({}, () => {
  			 var config = {
  				 mode: 'pac_script',
  				 pacScript: {
  					 mandatory: false,
  					 data: res
  				 }
  			 };
  			 chrome.proxy.settings.set( {value: config} );
  		});

  	}
	);
}

function syncWithAntizapret() {
	updateAntizapretProxyIp();
	setPacScriptFromAntizapret();
}

chrome.runtime.onInstalled.addListener( details => {
  switch(details.reason) {
    case 'install':
    case 'update':

      syncWithAntizapret();

      var reason = 'Периодичное обновление PAC-скрипта Антизапрет';

      chrome.alarms.onAlarm.addListener(
        alarm => {
          if (alarm.name === reason) {
						syncWithAntizapret();
					}
        }
      );

      chrome.alarms.create(reason, {
        periodInMinutes: 2*60
      });

  }
});
