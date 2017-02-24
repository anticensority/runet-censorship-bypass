'use strict';

{ // Private namespace starts.

  const mandatory = window.utils.mandatory;
  const throwIfError = window.utils.throwIfError;
  const chromified = window.utils.chromified;
  const timeouted = window.utils.timeouted;

  const kitchenStartsMark = '\n\n//%#@@@@@@ PAC_KITCHEN_STARTS @@@@@@#%';
  const kitchenState = window.utils.createStorage('pac-kitchen-');
  const ifIncontinence = 'if-incontinence';
  const modsKey = 'mods';

  // Don't keep objects in defaults or at least freeze them!
  const configs = {

    ifProxyHttpsUrlsOnly: {
      dflt: false,
      label: 'проксировать только HTTP<em>S</em>-сайты',
      desc: 'Проксировать только сайты, доступные по шифрованному протоколу HTTP<em>S</em>. Прокси и провайдер смогут видеть только адреса проксируемых HTTP<em>S</em>-сайтов, но не их содержимое. Используйте, если вы не доверяете прокси-серверам ваш HTTP-трафик. Разумеется, что с этой опцией разблокировка HTTP-сайтов работать не будет.',
      index: 0,
    },
    ifUseSecureProxiesOnly: {
      dflt: false,
      label: 'только шифрованная связь с прокси',
      desc: 'Шифровать соединение до прокси от провайдера. Провайдер всё же сможет видеть адреса (но не содержимое) проксируемых ресурсов из протокола DNS. Опция вряд ли может быть вам полезна, т.к. шифруется не весь трафик, а лишь разблокируемые ресурсы.',
      index: 1,
    },
    ifProhibitDns: {
      dflt: false,
      label: 'запретить опредление по IP/DNS',
      desc: 'Пытается запретить скрипту использовать DNS, без которого определение блокировки по IP работать не будет. Используйте, если вам кажется, что мы проксируем слишком много сайтов. Запрет действует только для скрипта, браузер и др.программы продолжат использование DNS.',
      index: 2,
    },
    ifUsePacScriptProxies: {
      dflt: true,
      label: 'использовать прокси PAC-скрипта',
      desc: 'Использовать прокси-сервера от авторов PAC-скрипта.',
      index: 3,
    },
    ifUseLocalTor: {
      dflt: false,
      label: 'использовать СВОЙ локальный TOR',
      desc: 'Установите <a href="https://rebrand.ly/ac-tor">TOR</a> на свой компьютер и используйте его как прокси-сервер. <a href="https://rebrand.ly/ac-tor">ВАЖНО</a>',
      index: 4,
    },
    exceptions: {
      dflt: null,
    },
    ifMindExceptions: {
      dflt: true,
      label: 'учитывать исключения',
      desc: 'Учитывать сайты, добавленные вручную. Только для своих прокси-серверов! Без своих прокси работать не будет.',
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

    return Object.keys(configs).reduce((acc, key) =>
      Object.assign(acc, { [key]: configs[key].dflt }),
      {}
    );

  };

  class PacModifiers {

    constructor(mods = {}) {

      const defaults = getDefaults();
      const ifAllDefaults = Object.keys(defaults)
        .every(
          (prop) => !(prop in mods)
            || Boolean(defaults[prop]) === Boolean(mods[prop])
        );

      Object.assign(this, defaults, mods);
      this.ifNoMods = ifAllDefaults;

      let customProxyArray = [];
      if (this.customProxyStringRaw) {
        customProxyArray = this.customProxyStringRaw
          .replace(/#.*$/mg, '') // Strip comments.
          .split(/(?:[^\S\r\n]*(?:;|\r?\n)+[^\S\r\n]*)+/g)
          .map((p) => p.trim())
          .filter((p) => p && /\s+/g.test(p));
        if (this.ifUseSecureProxiesOnly) {
          customProxyArray = customProxyArray.filter((p) => !p.startsWith('HTTP '));
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
        this.included = [];
        this.excluded = [];
        Object.keys(this.exceptions).forEach((host) => {
          if (this.exceptions[host]) {
            this.included.push(host);
          } else {
            this.excluded.push(host);
          }
        });
        if (this.included && !this.filteredCustomsString) {
          throw new TypeError(
            'Проксировать свои сайты можно только через свои прокси. Нет ни одного своего прокси, удовлетворяющего вашим требованиям!'
          );
        }
      }

    }

  }

  const getCurrentConfigs = function getCurrentConfigs() {

    const mods = kitchenState(modsKey);
    return new PacModifiers(mods || {});

  };

  const getOrderedConfigsForUser = function getOrderedConfigs() {

    const pacMods = getCurrentConfigs();
    return Object.keys(configs).reduce((arr, key) => {

      const conf = configs[key];
      if (typeof conf.index === 'number') {
        Object.assign(arr, { [conf.index]: conf });
        conf.value = pacMods[key];
        conf.key = key;
      }
      return arr;

    }, []);

  };

  const privates = {};

  privates.tryNowAsync = function tryNowAsync(maybeDetails, maybeCb = throwIfError) {

    let cb;
    let detailsOrUndefined;
    if (typeof maybeDetails === 'function') {
      detailsOrUndefined = undefined;
      cb = maybeDetails;
    } else {
      detailsOrUndefined = maybeDetails;
      cb = maybeCb;
    }

    new Promise((resolve) => (
      detailsOrUndefined
        ? resolve(detailsOrUndefined)
        : chrome.proxy.settings.get({}, timeouted(resolve))
    )).then((details) => {

      if (
        details.levelOfControl === 'controlled_by_this_extension'
      ) {
        const pac = window.utils.getProp(details, 'value.pacScript');
        if (pac && pac.data) {
          // Delete old kitchen modifications.
          pac.data = pac.data.replace(
            new RegExp(`${kitchenStartsMark}[\\s\\S]*$`, 'g'),
            ''
          );
          return chrome.proxy.settings.set(details, chromified(cb));
        }
      }

      kitchenState(ifIncontinence, true);
      return cb(null, null, new TypeError(
        'Не найдено активного PAC-скрипта! Изменения будут применены при возвращении контроля настроек прокси или установке нового PAC-скрипта.'
      ));

    });

  };

  window.apis.pacKitchen = {

    getPacMods: getCurrentConfigs,
    getOrderedConfigs: getOrderedConfigsForUser,

    cook(pacData, pacMods = mandatory()) {

      return pacMods.ifNoMods ? pacData : `${pacData}${kitchenStartsMark}
;+function(global) {
  "use strict";

  const originalFindProxyForURL = FindProxyForURL;
  global.FindProxyForURL = function(url, host) {
    ${((function generateNewFindProxyForURL() {

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

      if (
        !pacMods.ifUseSecureProxiesOnly &&
        !pacMods.filteredCustomsString &&
         pacMods.ifUsePacScriptProxies
      ) {
        return `${res}
    return originalFindProxyForURL(url, host);
`;
      }

      return `${res}
    const originalProxyString = originalFindProxyForURL(url, host);
    let originalProxyArray = originalProxyString.split(/(?:\\s*;\\s*)+/g).filter( (p) => p );
    if (originalProxyArray.every( (p) => /^DIRECT$/i.test(p) )) {
      // Directs only or null, no proxies.
      return originalProxyString;
    }
    return ${
      ((function getProxies() {

        if (!pacMods.ifUsePacScriptProxies) {
          return `"${pacMods.filteredCustomsString}"`;
        }
        let filteredOriginalsExp = 'originalProxyString';
        if (pacMods.ifUseSecureProxiesOnly) {
          filteredOriginalsExp =
            'originalProxyArray.filter( (p) => !p.toUpperCase().startsWith("HTTP ") ).join("; ")';
        }
        if (!pacMods.filteredCustomsString) {
          return filteredOriginalsExp;
        }
        return `"${pacMods.filteredCustomsString}; " + ${filteredOriginalsExp}`;

      })())} + "; DIRECT";`; // Without DIRECT you will get 'PROXY CONN FAILED' pac-error.

    })())}

  };

}(this);`;

    },

    checkIncontinence(details) {

      if (kitchenState(ifIncontinence)) {
        privates.tryNowAsync(details, () => { /* Swallow. */ });
      }

    },


    keepCookedNowAsync(maybePacMods = mandatory(), maybeCb = throwIfError) {

      let pacMods;
      let cb;
      if (typeof maybePacMods === 'function') {
        cb = maybePacMods;
        pacMods = getCurrentConfigs();
      } else {
        try {
          pacMods = new PacModifiers(maybePacMods);
        } catch (e) {
          return cb(e);
        }
        kitchenState(modsKey, pacMods);
        cb = maybeCb;
      }
      console.log('Keep cooked now...', pacMods);
      return privates.tryNowAsync(
        (err, res, ...warns) => {

          console.log('Try now err:', err);
          if (err) {
            return cb(err, res, ...warns);
          }

          const par = pacMods.customProxyArray;
          if (!(par && par.length)) {
            return cb(null, res, ...warns);
          }

          const hosts = par.map((ps) => ps.split(/\s+/)[1]);
          return window.utils.fireRequest(
            'ip-to-host-replace-all',
            hosts,
            (ipErr, ipRes, ...ipWarns) => cb(ipErr, ipRes, ...warns.concat(ipWarns))
          );

        }
      );

    },

    resetToDefaults() {

      kitchenState(modsKey, null);
      kitchenState(ifIncontinence, null);
      this.keepCookedNowAsync(throwIfError);

    },

  };

  const pacKitchen = window.apis.pacKitchen;

  const originalSet = chrome.proxy.settings.set.bind(chrome.proxy.settings);

  chrome.proxy.settings.set = function modifiedSet(details, cb = () => {}) {

    const pac = window.utils.getProp(details, 'value.pacScript');
    if (!(pac && pac.data)) {
      return originalSet(details, cb);
    }
    const pacMods = getCurrentConfigs();
    pac.data = pacKitchen.cook(pac.data, pacMods);
    return originalSet({ value: details.value }, (/* No args. */) => {

      kitchenState(ifIncontinence, null);
      cb();

    });

  };

  pacKitchen.checkIncontinence();
  chrome.proxy.settings.onChange.addListener(
    timeouted(
      pacKitchen.checkIncontinence.bind(pacKitchen)
    )
  );

} // Private namespace ends.
