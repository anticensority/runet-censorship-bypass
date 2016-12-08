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

      this.ifNotControlled = window.utils.areSettingsNotControlledFor(details);
      if (this.ifNotControlled) {
        chrome.browserAction.disable();
      } else {
        chrome.browserAction.enable();
      }
      return this.ifNotControlled;

    },

    idToError: {},

    mayNotify(
      id, title, errOrMessage,
      icon = 'default-128.png',
      context = extName
    ) {

      if ( !this.isOn(id) ) {
        return;
      }
      this.idToError[id] = errOrMessage;
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
          buttons: [
            {title: 'Сообшить о всех ошибках автору'},
          ]
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

  function errorJsonReplacer(key, value) {

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


  const handlers = window.apis.errorHandlers;

  // INIT
  chrome.proxy.settings.get(
    {},
    (details) => handlers.isNotControlled(details)
  );

  const openAndFocus = (url) => {

    chrome.tabs.create(
      {url: url},
      (tab) => chrome.windows.update(tab.windowId, {focused: true})
    );

  };

  chrome.notifications.onClicked.addListener( function(notId) {

    chrome.notifications.clear(notId);
    if(notId === 'no-control') {
      return openAndFocus('chrome://settings/#proxy');
    }
    const err = handlers.idToError[notId];
    openAndFocus('http://localhost:8000/error/?' + JSON.stringify(err, errorJsonReplacer, 0));

  });

  handlers.installListenersOn(window, 'BG');

  chrome.proxy.onProxyError.addListener((details) => {

    if (handlers.ifNoControl) {
      return;
    }
    /*
      Example:
        details: "line: 7: Uncaught Error: This is error, man.",
        error: "net::ERR_PAC_SCRIPT_FAILED",
        fatal: false,
    */
    console.warn('PAC ERROR', details);
    // TOOD: add "view pac script at this line" button.
    handlers.mayNotify('pac-error', 'Ошибка PAC!',
      details.error + '\n' + details.details,
      'pac-error-128.png'
    );

  });

  chrome.proxy.settings.onChange.addListener((details) => {

    console.log('Proxy settings changed.', details);
    const noCon = 'no-control';
    if ( handlers.isNotControlled(details) ) {
      console.log(details);
      handlers.mayNotify(noCon, 'Другое расширение контролирует прокси',
        'Какое?',
        'no-control-128.png');
    } else {
      chrome.notifications.clear( noCon );
    }

  });

}
