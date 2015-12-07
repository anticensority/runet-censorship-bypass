'use strict';

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

function UpdatePac() {

  httpGet(
  	'http://www.dns-lg.com/google1/'+antizapret.proxyHost+'/A',
  	(err, res) => {
  		antizapret.proxyIp = JSON.parse(res).answer[0].rdata;
  	}
  );

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

chrome.runtime.onInstalled.addListener( details => {
  switch(details.reason) {
    case 'install':
    case 'update':

      UpdatePac();

      var reason = 'Периодичное обновление PAC-скрипта Антизапрет';

      chrome.alarms.onAlarm.addListener(
        alarm => {
          if (alarm.name === reason)
            UpdatePac();
        }
      );

      chrome.alarms.create(reason, {
        periodInMinutes: 2*60
      });

  }
});
