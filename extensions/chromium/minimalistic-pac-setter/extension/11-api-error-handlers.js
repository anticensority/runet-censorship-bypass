'use strict';

{ // Private namespace

  const handlersState = function(key, value) {

    console.log(key, value, '!');
    key = 'handlers-' + key;
    if (value === null) {
      return localStorage.removeItem(key);
    }
    if (value === undefined) {
      const item = localStorage.getItem(key);
      return item && JSON.parse(item);
    }
    if (value instanceof Date) {
      throw new TypeError('Converting Date format to JSON is not supported.');
    }
    localStorage.setItem(key, JSON.stringify(value));

  };

  const ifPrefix = 'if-on-';

  window.apis.errorHandlers = {

    getEventsMap() {

      return new Map([
        ['pac-error', 'ошибки PAC скриптов'],
        ['ext-error', 'ошибки расширения'],
        ['no-control', 'утеря контроля над настройками'],
      ]);

    },

    switch(onOffStr, eventName) {

      if (!['on', 'off'].includes(onOffStr)) {
        throw new TypeError('First argument bust be "on" or "off".');
      }
      for(
        const name of (eventName ? [eventName] : this.getEventsMap().keys() )
      ) {
        handlersState( ifPrefix + name, onOffStr === 'on' ? 'on' : null );
      }

    },

    isOn(eventName) {

      return handlersState( ifPrefix + eventName);

    },

    ifNotControlled: null,

    isNotControlled(details) {

      this.ifNotControlled = window.utils.areSettingsNotControlledFor( details );
      if (this.ifNotControlled) {
        chrome.browserAction.disable();
      } else {
        chrome.browserAction.enable();
      }
      return this.ifNotControlled;

    },

  };

}

// INIT
chrome.proxy.settings.get(
  {},
  (details) => window.apis.errorHandlers.isNotControlled(details)
);

{

  const extName = chrome.runtime.getManifest().name;

  const mayNotify = function(
      id, title, message,
      icon = 'default-128.png',
      context = extName
    ) {

      if ( !window.apis.errorHandlers.isOn(id) ) {
        return;
      }
      chrome.notifications.create(
        id,
        {
          title: title,
          message: message,
          contextMessage: context,
          requireInteraction: true,
          type: 'basic',
          iconUrl: './icons/' + icon,
          isClickable: true,
        }
      );

    };

  window.addEventListener('error', (err) => {

    console.warn('GLOBAL ERROR', err);
    mayNotify('ext-error', 'Unhandled error', JSON.stringify(err),
      'ext-error-128.png');

  });

  window.addEventListener('unhandledrejection', (event) => {

    console.warn('Unhandled rejection. Throwing error.');
    event.preventDefault();
    throw event.reason;

  });

  chrome.proxy.onProxyError.addListener((details) => {

    if (window.apis.errorHandlers.ifNoControl) {
      return;
    }
    console.warn('PAC ERROR', details);
    mayNotify('pac-error', ' PAC !', JSON.stringify(details),
      'pac-error-128.png' );

  });

  chrome.proxy.settings.onChange.addListener((details) => {

    console.log('Proxy settings changed.', details);
    const noCon = 'no-control';
    if ( window.apis.errorHandlers.isNotControlled(details) ) {
      mayNotify(noCon, 'Proxy changed', JSON.stringify(details),
        'no-control-128.png');
    } else {
      chrome.notifications.clear( noCon );
    }

  });

}
