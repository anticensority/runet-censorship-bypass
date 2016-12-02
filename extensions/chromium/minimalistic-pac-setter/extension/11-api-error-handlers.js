'use strict';

{ // Private namespace

  const handlersState = function(key, value) {

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
  const extName = chrome.runtime.getManifest().name;

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

    idToErr: {},

    mayNotify(
      id, title, errOrMessage,
      icon = 'default-128.png',
      context = extName
    ) {

      if ( !this.isOn(id) ) {
        return;
      }
      this.idToErr[id] = errOrMessage;
      const message = errOrMessage.message || errOrMessage.toString();
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

    },

    installListenersOn(win, name, cb) {

      win.addEventListener('error', (errEvent) => {

        console.warn(name + ':GLOBAL ERROR', errEvent);
        this.mayNotify('ext-error', 'Ошибка расширения', errEvent,
          'ext-error-128.png');

      });

      win.addEventListener('unhandledrejection', (event) => {

        console.warn(name + ':Unhandled rejection. Throwing error.');
        event.preventDefault();
        throw event.reason;

      });

      if (cb) {
        // setTimeout changes error context.
        setTimeout(cb, 0);
      }

    },

  };

}

{

  const handlers = window.apis.errorHandlers;

  // INIT
  chrome.proxy.settings.get(
    {},
    (details) => handlers.isNotControlled(details)
  );

  chrome.notifications.onClicked.addListener( function(notId) {

    chrome.notifications.clear(notId);
    if(notId === 'no-control') {
      return chrome.tabs.create({active: true, url: 'chrome://settings/#proxy'});
    }
    chrome.tabs.create({active: true, url: './pages/view-error/index.html#' + notId});

  });

  handlers.installListenersOn(window, 'BG');

  chrome.proxy.onProxyError.addListener((details) => {

    if (handlers.ifNoControl) {
      return;
    }
    console.warn('PAC ERROR', details);
    handlers.mayNotify('pac-error', 'Ошибка PAC!', details,
      'pac-error-128.png' );

  });

  chrome.proxy.settings.onChange.addListener((details) => {

    console.log('Proxy settings changed.', details);
    const noCon = 'no-control';
    if ( handlers.isNotControlled(details) ) {
      console.log(details);
      handlers.mayNotify(noCon, 'Прокси контролирует другое расширение', details,
        'no-control-128.png');
    } else {
      chrome.notifications.clear( noCon );
    }

  });

}
