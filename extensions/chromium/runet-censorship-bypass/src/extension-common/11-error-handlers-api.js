'use strict';

{ // Private namespace

  const timeouted = window.utils.timeouted;
  const throwIfError = window.utils.throwIfError;

  const errorJsonReplacer = function errorJsonReplacer(key, value) {

    // fooWindow.ErrorEvent !== barWindow.ErrorEvent
    if (value === window) {
      return; // STUPID, because other window object may be passed.
    }
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

  };

  const ifPrefix = 'if-on-';
  const extName = chrome.runtime.getManifest().name;
  const extVersion = window.apis.version.build;

  window.apis.errorHandlers = {

    state: window.utils.createStorage('handlers-'),

    viewError(type = window.utils.mandatory(), err) {

      const errors = err ? {[type]: err} : this.idToError;
      const json = JSON.stringify(errors, errorJsonReplacer, 0);

      window.utils.openAndFocus(
        'https://anticensority.github.io/error/?json=' + encodeURIComponent(json) +
          (type ? '&type=' + encodeURIComponent(type) : '') +
          '&version=' + chrome.runtime.getManifest().version +
          '&useragent=' + encodeURIComponent(navigator.userAgent) +
          '&platform=' + encodeURIComponent(navigator.platform),
      );

    },

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
        this.state( ifPrefix + name, onOffStr === 'on' ? 'on' : null );
      }

    },

    isOn(eventName) {

      return this.state( ifPrefix + eventName );

    },

    ifControlled: null,
    ifControllable: null,

    isControllable(details) {

      if (details) {
        this.ifControllable = window.utils.areSettingsControllableFor(details);

        if (this.ifControllable) {
          this.ifControlled = window.utils.areSettingsControlledFor(details);
        } else {
          this.ifControlled = false;
        }

        if (this.ifControlled) {
          chrome.browserAction.setIcon( {path: './icons/default-128.png'} );
        } else {
          chrome.browserAction.setIcon({
            path: './icons/default-grayscale-128.png',
          });
        }
      }

      return this.ifControllable;

    },

    isControlled(details) {

      if (details) {
        this.isControllable(details);
      }
      return this.ifControlled;

    },

    updateControlState(cb = throwIfError) {

      chrome.proxy.settings.get(
        {},
        timeouted(
          (details) => {

            if (details) {
              this.isControllable(details);
            }
            cb();

          }
        )
      );

    },

    idToError: {},

    mayNotify(
      id, title, errOrMessage,
      {
        icon = 'default-128.png',
        context = extName + ' ' + extVersion,
        ifSticky = true,
      } = {}
    ) {

      if ( !this.isOn(id) ) {
        return;
      }
      this.idToError[id] = errOrMessage;
      const message = errOrMessage.message || errOrMessage.toString();
      chrome.notifications.create(
        id,
        Object.assign({
          title: title,
          message: message,
          contextMessage: context,
          type: 'basic',
          iconUrl: './icons/' + icon,
          appIconMaskUrl: './icons/default-mask-128.png',
          isClickable: true,
        }, window.apis.platform.ifFirefox ? {} : { requireInteraction: ifSticky }),
      );

    },

    installListenersOn(win, name, cb) {

      win.addEventListener('error', (errEvent) => {

        console.warn(name + ':GLOBAL ERROR', errEvent);
        this.mayNotify('ext-error', 'Ошибка расширения', errEvent,
          {icon: 'ext-error-128.png'});

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
        setTimeout(cb, 0);
      }

    },

  };

  const handlers = window.apis.errorHandlers;

  // Initialization
  // ==============

  chrome.proxy.settings.get(
    {},
    timeouted( handlers.isControllable.bind(handlers) )
  );

  chrome.notifications.onClicked.addListener( timeouted( (notId) => {

    chrome.notifications.clear(notId);
    if(notId === 'no-control') {
      return window.utils.openAndFocus(
        window.utils.messages.searchSettingsForUrl('proxy')
      );
    }
    handlers.viewError(notId);

  }));

  handlers.installListenersOn(window, 'BG');

  (chrome.proxy.onProxyError || chrome.proxy.onError).addListener( timeouted( (details) => {

    if (!handlers.ifControlled) {
      return;
    }
    /*
      Example:
        details: "line: 7: Uncaught Error: This is error, man.",
        error: "net::ERR_PAC_SCRIPT_FAILED",
        fatal: false,
    */
    const ifConFail = [
      'net::ERR_TUNNEL_CONNECTION_FAILED',
      'net::ERR_PROXY_CONNECTION_FAILED',
    ].includes(details.error);

    if (ifConFail) {
      // Happens if you return neither prixies nor "DIRECT".
      // Ignore it.
      return;
    }
    console.warn('PAC ERROR', details);
    // TOOD: add "view pac script at this line" button.
    handlers.mayNotify('pac-error', 'Ошибка PAC!',
      (details.error || details.message /* Firefox */) + '\n' + details.details,
      {icon: 'pac-error-128.png'}
    );

  }));

  chrome.proxy.settings.onChange.addListener( timeouted( (details) => {

    console.log('Proxy settings changed:', details.levelOfControl);
    const noCon = 'no-control';
    const ifWasControllable = handlers.ifControllable;
    if ( !handlers.isControllable(details) && ifWasControllable ) {
      handlers.mayNotify(
        noCon,
        chrome.i18n.getMessage('noControl'),
        chrome.i18n.getMessage('WhichQ'),
        {icon: 'no-control-128.png', ifSticky: false}
      );
    } else {
      chrome.notifications.clear( noCon );
    }

  }));

}
