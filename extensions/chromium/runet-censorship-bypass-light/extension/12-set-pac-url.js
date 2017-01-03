'use strict';

window.state = {
  lastError: null,
  ifNotControlled: false
};

function redBadge(msg) {

  window.chrome.browserAction.setBadgeBackgroundColor({
    color: '#db4b2f',
  });
  chrome.browserAction.setBadgeText({
    text: msg,
  });

}

let defaultColorPromise = new Promise( function (resolve) {

  chrome.browserAction.getBadgeBackgroundColor({}, resolve);

});

function okBadge(msg) {

  defaultColorPromise.then( function (defaultColor) {
    window.chrome.browserAction.setBadgeBackgroundColor({
      color: defaultColor,
    });
    chrome.browserAction.setBadgeText({
      text: msg,
    });
  });

}

function checkControlFor(details) {

  state.ifNotControlled = utils.areSettingsNotControlledFor(details);
  if (state.ifNotControlled) {
    console.warn('Failed, other extension is in control.');
    redBadge('xCTRL');
  } else {
    console.log('Successfuly set PAC in proxy settings..');
    okBadge('ok');
  }

}

chrome.proxy.settings.onChange.addListener( checkControlFor );

chrome.proxy.onProxyError.addListener((details) => {

  console.error(details);
      //if (window.state.ifNotControlled) {
      //  return;
      //}
});

chrome.proxy.settings.set(
  {
    value: {
      mode: 'pac_script',
      pacScript: {
        /*
          Don't use in system configs! Because Win does poor caching.
          Url is encoded to counter abuse.
          Source: CloudFlare
        */
        //url: 'https://anticensorship-russia.tk/generated-pac-scripts/on-switches-0.17.pac',
        //url: 'https://antizapret.prostovpn.org/proxy.pac',
        url: 'http://localhost:8080/on-switches-0.17.pac',
        mandatory: true
        //url: '\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x6e\x74\x69\x63\x65\x6e\x73\x6f\x72\x73\x68\x69\x70\x2d\x72\x75\x73\x73\x69\x61\x2e\x74\x6b\x2f\x67\x65\x6e\x65\x72\x61\x74\x65\x64\x2d\x70\x61\x63\x2d\x73\x63\x72\x69\x70\x74\x73\x2f\x6f\x6e\x2d\x73\x77\x69\x74\x63\x68\x65\x73\x2d\x30\x2e\x31\x37\x2e\x70\x61\x63',
      },
    },
  },
  function() {

    const err = chrome.runtime.lastError || chrome.extension.lastError;
    if(err) {
      alert(333)
      redBadge('ERR');
    } else {
      alert(11);
      chrome.proxy.settings.get({}, checkControlFor);
    }

  }
);
