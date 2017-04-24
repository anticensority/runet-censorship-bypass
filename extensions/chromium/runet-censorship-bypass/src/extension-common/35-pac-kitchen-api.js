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
      order: 0,
    },
    ifUseSecureProxiesOnly: {
      dflt: false,
      label: 'только шифрованная связь с прокси',
      desc: 'Шифровать соединение до прокси от провайдера, используя только прокси типа HTTPS или локальный Tor. Провайдер всё же сможет видеть адреса (но не содержимое) проксируемых ресурсов из протокола DNS (даже с Tor). Опция вряд ли может быть вам полезна, т.к. шифруется не весь трафик, а лишь разблокируемые ресурсы.',
      order: 1,
    },
    ifProhibitDns: {
      dflt: false,
      label: 'запретить опредление по IP/DNS',
      desc: 'Пытается запретить скрипту использовать DNS, без которого определение блокировки по IP работать не будет (т.е. будет разблокироваться меньше сайтов). Используйте, чтобы получить прирост в производительности или если вам кажется, что мы проксируем слишком много сайтов. Запрет действует только для скрипта, браузер и др.программы продолжат использование DNS.',
      order: 2,
    },
    ifProxyOrDie: {
      dflt: true,
      ifDfltMods: true,
      label: 'проксируй или умри!',
      desc: 'Запрещает соединение с сайтами напрямую без прокси в случаях, когда все прокси отказывают. Например, если все ВАШИ прокси вдруг недоступны, то добавленные вручную сайты открываться не будут совсем. Однако смысл опции в том, что она препятствует занесению прокси в чёрные списки Хрома. Рекомендуется не отключать.',
      order: 3,
    },
    ifUsePacScriptProxies: {
      dflt: true,
      category: 'ownProxies',
      label: 'использовать прокси PAC-скрипта',
      desc: 'Использовать прокси-сервера от авторов PAC-скрипта.',
      order: 4,
    },
    ifUseLocalTor: {
      dflt: false,
      category: 'ownProxies',
      label: 'использовать СВОЙ локальный Tor',
      desc: 'Установите <a href="https://rebrand.ly/ac-tor">Tor</a> на свой компьютер и используйте его как прокси-сервер. <a href="https://rebrand.ly/ac-tor">ВАЖНО</a>',
      order: 5,
    },
    exceptions: {
      category: 'exceptions',
      dflt: null,
    },
    ifMindExceptions: {
      dflt: true,
      category: 'exceptions',
      label: 'учитывать исключения',
      desc: 'Учитывать сайты, добавленные вручную. Только для своих прокси-серверов! Без своих прокси работать не будет.',
      order: 6,
    },
    customProxyStringRaw: {
      dflt: '',
      category: 'ownProxies',
      label: 'использовать СВОИ прокси',
      url: 'https://rebrand.ly/ac-own-proxy',
      order: 7,
    },
    ifProxyMoreDomains: {
      ifDisabled: true,
      dflt: false,
      category: 'ownProxies',
      label: 'проксировать .onion, .i2p и OpenNIC',
      desc: 'Проксировать особые домены. Необходима поддержка со стороны прокси.',
      order: 8,
    },
    ifProxyErrors: {
      ifDisabled: true,
      dflt: false,
      category: 'ownProxies',
      label: 'проксировать <a href>избранные</a> ошибки',
      desc: 'Предлагать добавить сайт в исключения при выбранных ошибках.',
      order: 9,
    },

  };

  const getDefaults = function getDefaults() {

    return Object.keys(configs).reduce((acc, key) => {

      acc[key] = configs[key].dflt;
      return acc;

    }, {});

  };

  const getCurrentConfigs = function getCurrentConfigs() {

    const [err, mods, ...warns] = createPacModifiers( kitchenState(modsKey) );
    if (err) {
      throw err;
    }
    return mods;

  };

  const getOrderedConfigsForUser = function getOrderedConfigs(category) {

    const pacMods = getCurrentConfigs();
    return Object.keys(configs)
      .sort((keyA, keyB) => configs[keyA].order - configs[keyB].order)
      .reduce((arr, key) => {

        const conf = configs[key];
        if(typeof(conf.order) === 'number') {
          if(!category || category === (conf.category || 'general')) {
            arr.push(conf);
            conf.value = pacMods[key];
            conf.key = key;
         }
        }
        return arr;

      }, []);

  };

  const createPacModifiers = function createPacModifiers(mods = {}) {

    mods = mods || {}; // null?
    const ifNoMods = Object.keys(configs)
      .every((dProp) => {

        const ifDflt = (
          !(dProp in mods) ||
          Boolean(configs[dProp].dflt) === Boolean(mods[dProp])
        );
        const ifMods = configs[dProp].ifDfltMods;
        return ifDflt ? !ifMods : ifMods;

      });

    console.log('Input mods:', mods);
    const self = {};
    Object.assign(self, getDefaults(), mods);
    self.ifNoMods = ifNoMods;

    let customProxyArray = [];
    if (self.customProxyStringRaw) {
      customProxyArray = self.customProxyStringRaw
        .replace(/#.*$/mg, '') // Strip comments.
        .split( /(?:[^\S\r\n]*(?:;|\r?\n)+[^\S\r\n]*)+/g )
        .map( (p) => p.trim() )
        .filter( (p) => p && /\s+/g.test(p) );
      if (self.ifUseSecureProxiesOnly) {
        customProxyArray = customProxyArray.filter( (pStr) => /^HTTPS\s/.test(pStr) );
      }
    }
    if (self.ifUseLocalTor) {
      customProxyArray.push('SOCKS5 localhost:9050', 'SOCKS5 localhost:9150');
    }

    self.filteredCustomsString = '';
    if (customProxyArray.length) {
      self.customProxyArray = customProxyArray;
      self.filteredCustomsString = customProxyArray.join('; ');
    } else {
      if (!self.ifUsePacScriptProxies) {
        return [new TypeError('Нет ни одного прокси, удовлетворяющего вашим требованиям!')];
      }
      self.customProxyArray = false;
    }

    self.included = self.excluded = undefined;
    if (self.ifMindExceptions && self.exceptions) {
      self.included = [];
      self.excluded = [];
      for(const host of Object.keys(self.exceptions)) {
        if (self.exceptions[host]) {
          self.included.push(host);
        } else {
          self.excluded.push(host);
        }
      }
      ['included', 'excluded'].forEach((who) => {

        self[who] = self[who]
          .map( (s) => s.split('').reverse() )
          .sort()
          .map( (a) => a.reverse().join('') );

      });
      if (self.included.length && !self.filteredCustomsString) {
        return [null, self, new TypeError(
          'Имеются сайты, добавленные вручную. Они проксироваться не будут, т.к. нет СВОИХ проски, удовлетворяющих вашим запросам!'
        )];
      }
    }
    return [null, self];

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
      res += `
    const directIfAllowed = ${pacMods.ifProxyOrDie ? '""/* Not allowed. */' : '"; DIRECT"'};
      `;

      const ifIncluded = pacMods.included && pacMods.included.length;
      const ifExcluded = pacMods.excluded && pacMods.excluded.length;
      const ifExceptions = ifIncluded || ifExcluded;

      if (ifExceptions) {
        res += `
    /* EXCEPTIONS START */
    const dotHost = '.' + host;
    const isHostInDomain = (domain) => dotHost.endsWith('.' + domain);
    const domainReducer = (maxWeight, [domain, ifIncluded]) => {

      if (!isHostInDomain(domain)) {
        return maxWeight;
      }
      const newWeightAbs = domain.length;
      if (newWeightAbs < Math.abs(maxWeight)) {
        return maxWeight;
      }
      return newWeightAbs*(ifIncluded ? 1 : -1);

    };

    const excWeight = ${JSON.stringify(Object.entries(pacMods.exceptions))}.reduce( domainReducer, 0 );
    if (excWeight !== 0) {
      if (excWeight > 0) {
        // Always proxy it!
        ${ pacMods.filteredCustomsString
          ? `return "${pacMods.filteredCustomsString}" + directIfAllowed;`
          : '/* No proxies -- continue. */'
        }
      } else {
        // Never proxy it!
        return "DIRECT";
      }
    }
    /* EXCEPTIONS END */
`;
      }
      res += `
    const pacProxyString = originalFindProxyForURL(url, host)${
          pacMods.ifProxyOrDie ? '.replace(/DIRECT/g, "")' : ' + directIfAllowed'
      };`;
      if(
        !pacMods.ifUseSecureProxiesOnly &&
        !pacMods.filteredCustomsString &&
         pacMods.ifUsePacScriptProxies
      ) {
        return res + `
    return pacProxyString;`;
      }

      return res + `
    let pacProxyArray = pacProxyString.split(/(?:\\s*;\\s*)+/g).filter( (p) => p );
    const ifNoProxies = pacProxyArray${pacMods.ifProxyOrDie ? '.length === 0' : '.every( (p) => /^DIRECT$/i.test(p) )'};
    if (ifNoProxies) {
      // Directs only or null, no proxies.
      return "DIRECT";
    }
    return ` +
      function() {

        if (!pacMods.ifUsePacScriptProxies) {
          return `"${pacMods.filteredCustomsString}"`;
        }
        let filteredPacExp = 'pacProxyString';
        if (pacMods.ifUseSecureProxiesOnly) {
          filteredPacExp =
            'pacProxyArray.filter( (pStr) => /^HTTPS\\s/.test(pStr) ).join("; ")';
        }
        if ( !pacMods.filteredCustomsString ) {
          return filteredPacExp;
        }
        return `${filteredPacExp} + "; ${pacMods.filteredCustomsString}"`;

      }() + ' + directIfAllowed;'; // Without DIRECT you will get 'PROXY CONN FAILED' pac-error.

    }()}

  };

}(this);`;

    },

    setNowAsync(details, cb = throwIfError) {

      if (typeof(details) === 'function') {
        cb = details;
        details = undefined;
      }

      new Promise((resolve) =>

        details
          ? resolve(details)
          : chrome.proxy.settings.get({}, timeouted(resolve) )

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
            /a/.test('a'); // GC RegExp.input and friends.
            return chrome.proxy.settings.set(details, chromified(cb));
          }
        }

        kitchenState(ifIncontinence, true);
        cb(null, null, new TypeError(
          'Не найдено активного PAC-скрипта! Изменения будут применены при возвращении контроля настроек прокси или установке нового PAC-скрипта.'
        ));

      });

    },

    checkIncontinence(details) {

      if ( kitchenState(ifIncontinence) ) {
        this.setNowAsync(details, () => {/* Swallow. */});
      }

    },

    keepCookedNowAsync(pacMods = mandatory(), cb = throwIfError) {

      let ifProxiesChanged = false;
      let modsWarns = [];
      if (typeof(pacMods) === 'function') {
        cb = pacMods;
        pacMods = getCurrentConfigs();
      } else {
        let modsErr;
        [modsErr, pacMods, ...modsWarns] = createPacModifiers(pacMods);
        if (modsErr) {
          return cb(modsErr, null, modsWarns);
        }
        const oldProxies = getCurrentConfigs().filteredCustomsString || '';
        const newProxies = pacMods.filteredCustomsString || '';
        ifProxiesChanged = oldProxies !== newProxies;
        console.log('Proxies changed from:', oldProxies, 'to', newProxies);
        kitchenState(modsKey, pacMods);
      }
      console.log('Keep cooked now...', pacMods);
      this.setNowAsync(
        (err, res, ...setWarns) => {

          const accWarns = modsWarns.concat(setWarns); // Acc = accumulated.
          console.log('Try now err:', err);
          if (err) {
            return cb(err, res, ...accWarns);
          }

          if (!ifProxiesChanged) {
            return cb(null, res, ...accWarns);
          }
          const newHosts = (pacMods.customProxyArray || []).map( (ps) => ps.split(/\s+/)[1] );
          window.utils.fireRequest('ip-to-host-replace-all', newHosts, (err, res, ...moreWarns) => cb( err, res, ...accWarns.concat(moreWarns) ));

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

  const originalSet = chrome.proxy.settings.set.bind( chrome.proxy.settings );

  chrome.proxy.settings.set = function(details, cb) {

    const pac = window.utils.getProp(details, 'value.pacScript');
    if (!(pac && pac.data)) {
      return originalSet(details, cb);
    }
    const pacMods = getCurrentConfigs();
    pac.data = pacKitchen.cook( pac.data, pacMods );
    originalSet({value: details.value}, (/* No args. */) => {

      kitchenState(ifIncontinence, null);
      cb && cb();

    });

  };

  pacKitchen.checkIncontinence();
  chrome.proxy.settings.onChange.addListener(
    timeouted(
      pacKitchen.checkIncontinence.bind(pacKitchen)
    )
  );

} // Private namespace ends.
