'use strict';

{ // Private namespace starts.

  const mandatory = window.utils.mandatory;
  const throwIfError = window.utils.throwIfError;
  const chromified = window.utils.chromified;

  const kitchenStartsMark = '\n\n//%#@@@@@@ PAC_KITCHEN_STARTS @@@@@@#%';
  const kitchenState = window.utils.createStorage('pac-kitchen-');
  const ifIncontinence = 'if-incontinence';
  const modsKey = 'mods';

  // Don't keep objects in defaults or at least freeze them!
  const configs = {

    ifProxyHttpsUrlsOnly: {
      dflt: false,
      label: 'проксировать только HTTP<span style="border-bottom: 1px solid black">S</span>-сайты',
      desc: 'Проксировать только сайты, доступные по шифрованному протоколу HTTPS. Прокси и провайдер смогут видеть только адреса проксируемых ресурсов, но не их содержимое.',
      index: 0,
    },
    ifUseSecureProxiesOnly: {
      dflt: false,
      label: 'только шифрованная связь с прокси',
      desc: 'Шифровать соединение до прокси от провайдера. Провайдер всё же сможет видеть адреса (но не содержимое) проксируемых ресурсов из протокола DNS.',
      index: 1,
    },
    ifProhibitDns: {
      dflt: false,
      label: 'запретить опредление по IP/DNS',
      desc: 'Пытается запретить скрипту использовать DNS, без которого определение блокировки по IP работать не будет. Используйте, если вам кажется, что мы проксируем слишком много сайтов.',
      index: 2,
    },
    ifUsePacScriptProxies: {
      dflt: true,
      label: 'использовать прокси PAC-скрипта',
      desc: 'Использовать прокси от авторов PAC-скрипта.',
      index: 3,
    },
    ifUseLocalTor: {
      dflt: false,
      label: 'использовать СВОЙ локальный TOR',
      desc: 'Установите <a href="https://ru.wikipedia.org/wiki/Tor">TOR</a> на свой компьютер и используйте его как прокси. <a href="https://rebrand.ly/ac-tor">ВАЖНО</a>',
      index: 4,
    },
    exceptions: {
      dflt: null,
    },
    ifMindExceptions: {
      dflt: true,
      label: 'учитывать исключения',
      desc: 'Учитывать сайты, добавленные вручную. Только для своих прокси! Без своих прокси работать не будет.',
      index: 5,
    },
    customProxyStringRaw: {
      dflt: '',
      label: 'использовать СВОИ прокси',
      url: 'https://rebrand.ly/ac-own-proxy',
      index: 6,
    },

  };

  const getDefaults = function getDefaults() {

    return Object.keys(configs).reduce((acc, key) => {

      acc[key] = configs[key].dflt;
      return acc;

    }, {});

  };

  const getCurrentConfigs = function getCurrentConfigs() {

    const mods = kitchenState(modsKey);
    return new PacModifiers(mods || {});

  };

  const getOrderedConfigsForUser = function getOrderedConfigs() {

    const pacMods = getCurrentConfigs();
    return Object.keys(configs).reduce((arr, key) => {

      const conf = configs[key]
      if(typeof(conf.index) === 'number') {
        arr[conf.index] = conf;
        conf.value = pacMods[key];
        conf.key = key;
      }
      return arr;

    }, []);

  };

  class PacModifiers {

    constructor(mods = {}) {

      const defaults = getDefaults();
      const ifAllDefaults =
        Object.keys(defaults)
        .every(
          (prop) => !(prop in mods)
            || Boolean(defaults[prop]) === Boolean(mods[prop])
        );

      Object.assign(this, defaults, mods);
      this.ifNoMods = ifAllDefaults ? true : false;

      let customProxyArray = [];
      if (this.customProxyStringRaw) {
        customProxyArray = this.customProxyStringRaw
          .replace(/#.*$/mg, '') // Strip comments.
          .split( /(?:[^\S\r\n]*(?:;|\r?\n)+[^\S\r\n]*)+/g )
          .map( (p) => p.trim() )
          .filter( (p) => p && /\s+/g.test(p) );
        if (this.ifUseSecureProxiesOnly) {
          customProxyArray = customProxyArray.filter( (p) => !p.startsWith('HTTP ') );
        }
      }
      if (this.ifUseLocalTor) {
        customProxyArray.push('SOCKS5 localhost:9050', 'SOCKS5 localhost:9150');
      }

      if (customProxyArray.length) {
        this.customProxyArray = customProxyArray;
        this.filteredCustomsString = customProxyArray.join('; ');
      } else {
        if (!this.ifUsePacScriptProxies) {
          throw new TypeError('Нет ни одного прокси, удовлетворяющего вашим требованиям!');
        }
        this.customProxyArray = false;
        this.filteredCustomsString = '';
      }

      this.included = this.excluded = undefined;
      if (this.ifMindExceptions && this.exceptions) {
        console.log('Exceptions:', this.exceptions);
        this.included = [];
        this.excluded = [];
        for(const host of Object.keys(this.exceptions)) {
          if (this.exceptions[host]) {
            this.included.push(host)
          } else {
            this.excluded.push(host);
          }
        }
        if (this.included && !this.filteredCustomsString) {
          throw new TypeError(
            'Проксировать свои сайты можно только через свои прокси. Нет ни одного своего прокси, удовлетворяющего вашим требованиям!'
          );
        }
      }

    }

  };

  window.apis.pacKitchen = {

    getPacMods: getCurrentConfigs,
    getOrderedConfigs: getOrderedConfigsForUser,

    cook(pacData, pacMods = mandatory()) {

      return pacMods.ifNoMods ? pacData : pacData + `${ kitchenStartsMark }
;+function(global) {
  "use strict";

  const originalFindProxyForURL = FindProxyForURL;
  global.FindProxyForURL = function(url, host) {
    ${function() {

      let res = pacMods.ifProhibitDns ? `
    global.dnsResolve = function(host) { return null; };
` : '';
      if (pacMods.ifProxyHttpsUrlsOnly) {

        res += `
    if (!url.startsWith("https")) {
      return "DIRECT";
    }
`;
      }

      if (pacMods.included && pacMods.included.length) {
        res += `
    if ( ${JSON.stringify(pacMods.included)}.some( (included) => host.endsWith(included) ) ) {
      return "${pacMods.filteredCustomsString}; DIRECT";
    }
`;
      }

      if (pacMods.excluded && pacMods.excluded.length) {
        res += `
    if ( ${JSON.stringify(pacMods.excluded)}.some( (excluded) => host.endsWith(excluded) ) ) {
      return "DIRECT";
    }
`;
      }

      if(
        !pacMods.ifUseSecureProxiesOnly &&
        !pacMods.filteredCustomsString &&
         pacMods.ifUsePacScriptProxies
      ) {
        return res + `
    return originalFindProxyForURL(url, host);
`;
      }

      return res + `
    const originalProxyString = originalFindProxyForURL(url, host);
    let originalProxyArray = originalProxyString.split(/(?:\\s*;\\s*)+/g).filter( (p) => p );
    if (originalProxyArray.every( (p) => /^DIRECT$/i.test(p) )) {
      // Directs only or null, no proxies.
      return originalProxyString;
    }
    return ` +
      function() {

        if (!pacMods.ifUsePacScriptProxies) {
          return '"' + pacMods.filteredCustomsString + '"';
        }
        let filteredOriginalsExp = 'originalProxyString';
        if (pacMods.ifUseSecureProxiesOnly) {
          filteredOriginalsExp =
            'originalProxyArray.filter( (p) => !p.toUpperCase().startsWith("HTTP ") ).join("; ")';
        }
        if ( !pacMods.filteredCustomsString ) {
          return filteredOriginalsExp;
        }
        return '"' + pacMods.filteredCustomsString + '; " + ' + filteredOriginalsExp;

      }() + ' + "; DIRECT";'; // Without DIRECT you will get 'PROXY CONN FAILED' pac-error.

    }()}

  };

}(this);`;

    },

    _tryNowAsync(details, cb = throwIfError) {

      if (typeof(details) === 'function') {
        cb = details;
        details = undefined;
      }

      new Promise((resolve) =>

        details
          ? resolve(details)
          : chrome.proxy.settings.get({}, resolve)

      ).then( (details) => {

        if (
          details.levelOfControl === 'controlled_by_this_extension'
        ) {
          const pac = window.utils.getProp(details, 'value.pacScript');
          if (pac && pac.data) {
            // Delete old kitchen modifications.
            pac.data = pac.data.replace(
              new RegExp(kitchenStartsMark + '[\\s\\S]*$', 'g'),
              ''
            );
            return chrome.proxy.settings.set(details, chromified(cb));
          }
        }

        kitchenState(ifIncontinence, true);
        cb(null, null, new TypeError(
          'Не найдено активного PAC-скрипта! Изменения будут применены при возвращении контроля настроек прокси или установке нового PAC-скрипта.'
        ));

      });

    },

    checkIncontinenceVoid(details) {

      if ( kitchenState(ifIncontinence) ) {
        this._tryNowAsync(details, () => {/* Swallow. */});
      }

    },


    keepCookedNowAsync(pacMods = mandatory(), cb = throwIfError) {

      console.log('Keep cooked now...');
      if (typeof(pacMods) === 'function') {
        cb = pacMods;
        pacMods = this.getCurrentConfigs();
      } else {
        try {
          pacMods = new PacModifiers(pacMods);
        } catch(e) {
          return cb(e);
        }
        kitchenState(modsKey, pacMods);
      }
      this._tryNowAsync(
        (err, res, ...warns) => {

          console.log('Try now cb...', err);
          if (err) {
            return cb(err, res, ...warns);
          }

          const par = pacMods.customProxyArray;
          if (!(par && par.length)) {
            return cb(null, res, ...warns);
          }

          const hosts = par.map( (ps) => ps.split(/\s+/)[1] )
          window.apis.ipToHost.replaceAllAsync(
            hosts,
            (...args) => cb(...args, ...warns)
          );

        }
      );

    },

    resetToDefaultsVoid() {

      // Pruge all but exceptions.
      const exceptions = kitchenState(modsKey).exceptions;
      kitchenState(modsKey, null);
      kitchenState(ifIncontinence, null);
      this.keepCookedNowAsync({exceptions: exceptions});

    },

  };

  const pacKitchen = window.apis.pacKitchen;

  const originalSet = chrome.proxy.settings.set.bind( chrome.proxy.settings );

  chrome.proxy.settings.set = function(details, cb) {

    const pac = window.utils.getProp(details, 'value.pacScript');
    if (!(pac && pac.data)) {
      return originalSet(details, cb);
    }
    const pacMods = getCurrentConfigs();
    pac.data = pacKitchen.cook( pac.data, pacMods );
    originalSet({ value: details.value }, (/* No args. */) => {

      kitchenState(ifIncontinence, null);
      cb && cb();

    });

  };

  pacKitchen.checkIncontinenceVoid();
  chrome.proxy.settings.onChange.addListener( pacKitchen.checkIncontinenceVoid.bind(pacKitchen) );

} // Private namespace ends.
