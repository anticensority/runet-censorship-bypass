'use strict';

console.log('Started.');

window.state = {
  lastError: null,
  ifNotControllable: false,
};

window.whichExtensionHtml = `

  ${chrome.i18n.getMessage('noControl')}
  <a href="chrome://settings/search#${chrome.i18n.getMessage('proxy')}">
    ${chrome.i18n.getMessage('which')}
  </a>`;

const resetBadge = function resetBadge() {

  okBadge('M');
  chrome.browserAction.setTitle({title: ''});

};

window.timeouted = (cb) => (...args) => window.setTimeout(() => cb(...args), 0);

const errorJsonReplacer = function errorJsonReplacer(key, value) {

  // fooWindow.ErrorEvent !== barWindow.ErrorEvent
  if (!( value && value.constructor
    && ['Error', 'Event'].some(
      (suff) => value.constructor.name.endsWith(suff)
    )
  )) {
    return value;
  }
  const alt = {};

  Object.getOwnPropertyNames(value).forEach(function(key) {

      alt[key] = value[key];

  }, value);

  for(const prop in value) {
    if (/^[A-Z]/.test(prop)) {
      // MOUSEMOVE, CLICK, KEYUP, NONE, etc.
      continue;
    }
    alt[prop] = value[prop];
  }

  if (value.constructor.name === 'ErrorEvent') {
    for(const circularProp of
      [  // First line are circular props.
        'target', 'srcElement', 'path', 'currentTarget',
        'bubbles', 'cancelBubble', 'cancelable', 'composed',
        'defaultPrevented', 'eventPhase', 'isTrusted', 'returnValue',
        'timeStamp']) {
      delete alt[circularProp];
    }
  }

  if (value.name) {
    alt.name = value.name;
  }

  return alt;

}

const extName = chrome.runtime.getManifest().name;

chrome.notifications.onClicked.addListener( timeouted( (notId) => {

  chrome.notifications.clear(notId);
  const err = window.state.lastError;
  err.extName = extName;
  const type = 'ext-error';
  const json = JSON.stringify(err, errorJsonReplacer, 0);
  const url = 'http://rebrand.ly/ac-error/?json=' + encodeURIComponent(json)
    + (type ? '&type=' + encodeURIComponent(type) : '')
    + '&version=' + chrome.runtime.getManifest().version;
  chrome.tabs.create(
    {url: url}
  );

}));


const mayNotify = function mayNotify(
  id, title, errOrMessage,
  {
    icon = 'default-128.png',
    ifSticky = true,
  } = {}
) {

  const message = errOrMessage.message || errOrMessage.toString();
  chrome.notifications.create(
    id,
    {
      title: title,
      message: message,
      contextMessage:
        extName + ' ' + chrome.runtime.getManifest().version.replace(/\d+\.\d+\./g, ''),
      requireInteraction: ifSticky,
      type: 'basic',
      iconUrl: './icons/' + icon,
      isClickable: true,
    }
  );

}

window.installListenersOn = function installListenersOn(win, name, cb) {

  win.addEventListener('error', (errEvent) => {

    window.state.lastError = errEvent;
    console.warn(name + ':GLOBAL ERROR', errEvent);
    mayNotify('ext-error', 'Ошибка расширения!', errEvent, {icon: 'ext-error-128.png'});

  });

  win.addEventListener('unhandledrejection', (event) => {

    console.warn(name + ': Unhandled rejection. Throwing error.');
    event.preventDefault();
    console.log('ev', event);
    throw event.reason;

  });

  if (cb) {
    // In most cases getBackgroundPage( (bg) => installListenersOn
    // Without setTimeout errors are swallowed, bug #357568
    timeouted(cb)();
  }

};

window.installListenersOn(window, 'BG');

const redBadge = function redBadge(msg) {

  chrome.browserAction.setBadgeBackgroundColor({
    color: '#db4b2f',
  });
  chrome.browserAction.setBadgeText({
    text: msg,
  });

};

const defaultColorPromise = new Promise( function (resolve) {

  chrome.browserAction.getBadgeBackgroundColor({}, resolve);

});

const okBadge = function okBadge(msg) {

  defaultColorPromise.then( function (defaultColor) {
    chrome.browserAction.setBadgeBackgroundColor({
      color: defaultColor,
    });
    chrome.browserAction.setBadgeText({
      text: msg,
    });
  });

}

const mandatory = (err) => {

  throw new TypeError('This arg is required!');

};

const throwIfError = (err) => {

  if (err) {
    throw new Error('Got error in cb!');
  }

};

const areSettingsNotControllableFor = function areSettingsNotControllable(details = mandatory()) {

  state.ifNotControllable = ['controlled_by_other', 'not_controllable']
    .some( (pref) => details.levelOfControl.startsWith(pref) );

  if (state.ifNotControllable) {
    console.warn('Failed, other extension is in control.');
    state.ifNotControlled = true;
    redBadge('xCTRL');
    chrome.browserAction.setTitle({title: 'Другое расширение контролирует прокси'});
  } else {
    console.log('Settings are under our control.');
    state.ifNotControlled = !details.levelOfControl.startsWith('controlled_by_this');
    resetBadge();
  }

};

chrome.proxy.settings.onChange.addListener( (details) => {

  console.log('CHANGED prx');
  areSettingsNotControllableFor(details);

});

const updateControlState = function updateControlState(cb = mandatory()) {

  chrome.proxy.settings.get({}, timeouted( (details) => {

    areSettingsNotControllableFor(details);
    cb();

  }));

};

const mayUpdatePac = function mayUpdatePac(cb = mandatory()) {

  if (Date.now() < (localStorage.lastPacUpdateStamp || 0) + 12*60*60*1000 ) {
    console.log('Too early for an update.' );
    return cb();
  }

  fetch('https://rebrand.ly/ac-light-pac').then(
    (res) => {

      const status = res.status;
      if ( !( status >= 200 && status < 300 || status === 304 ) ) {
        return cb(new Error('Не удалось скачать скрипт, ошибка ' + status));
      }
      return res.text();

    },
    cb
  ).then( (pacData) => {

    console.log('Updating PAC...');
    chrome.proxy.settings.set(
      {
        value: {
          mode: 'pac_script',
          pacScript: {
            // Use only with extension!
            data: pacData
          },
        },
      },
      timeouted(() => {

        const err = chrome.runtime.lastError || chrome.extension.lastError;
        if(err) {
          console.log('Updated with error:', err);
          state.lastError = err;
          redBadge('ERR');
          chrome.browserAction.setTitle({title: 'Произошла ошибка'});
          setTimeout(resetBadge, 10000);
          return cb(err);
        }
        console.log('Updated, no errors.');
        localStorage.lastPacUpdateStamp = Date.now();
        updateControlState( () => {

          if(state.ifNotControlled) {
            cb(new Error(window.whichExtensionHtml));
          } else {
            cb();
          }

        });

      })
    );

  },
  cb
);

};

window.switchPac = function switchPac(onOff, cb = mandatory()) {

  if(onOff !== 'off') {
    localStorage.onOff = 'on';
    chrome.browserAction.setIcon( {path: './icons/default-128.png'} );
    return mayUpdatePac(cb);
  }

  chrome.proxy.settings.clear({}, timeouted(() => {

    localStorage.lastPacUpdateStamp = 0;
    localStorage.onOff = 'off';
    chrome.browserAction.setIcon({
      path: './icons/default-grayscale-128.png',
    });
    cb();

  }));

};

resetBadge();
switchPac( localStorage.onOff, (err) => {

  updateControlState(() => throwIfError(err));

});
