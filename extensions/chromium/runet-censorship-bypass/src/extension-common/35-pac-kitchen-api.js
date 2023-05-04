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

  let proxyHostToCredsList = {};
  const ifAuthSupported = chrome.webRequest && chrome.webRequest.onAuthRequired && !window.apis.version.ifMini;
  if (ifAuthSupported) {

    const requestIdToTries = {};

    chrome.webRequest.onAuthRequired.addListener(
      (details) => {

        if (!details.isProxy) {
          return {};
        }

        const proxyHost = `${details.challenger.host}:${details.challenger.port}`;
        const credsList = proxyHostToCredsList[proxyHost];
        if (!credsList) {
          return {}; // No creds found for this proxy.
        }
        const requestId = details.requestId;
        const tries = requestIdToTries[requestId] || 0;
        if (tries > credsList.length) {
          return {}; // All creds for this proxy were tried already.
        }
        requestIdToTries[requestId] = tries + 1;
        return {
          authCredentials: credsList[tries],
        };

      },
      {urls: ['<all_urls>']},
      ['blocking'],
    );

    const forgetRequestId = (details) => {

      delete requestIdToTries[details.requestId];

    };

    chrome.webRequest.onCompleted.addListener(
      forgetRequestId,
      {urls: ['<all_urls>']},
    );

    chrome.webRequest.onErrorOccurred.addListener(
      forgetRequestId,
      {urls: ['<all_urls>']},
    );

  }

  const getDefaultConfigs = () => ({// Configs user may mutate them and we don't care!

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
      label: 'запретить определение по IP/DNS',
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
      desc: 'Установите <a href="https://github.com/anticensority/runet-censorship-bypass/wiki/Расширение-и-TOR">Tor</a> на свой компьютер и используйте его как прокси-сервер. <a href="https://github.com/anticensority/runet-censorship-bypass/wiki/Расширение-и-TOR#важно">ВАЖНО</a>.',
      order: 5,
    },
    ifUseLocalWarp: {
      dflt: false,
      category: 'ownProxies',
      label: 'использовать WARP как прокси',
      desc: 'Использовать СВОЙ локальный CloudFlare WARP (<a href="https://one.one.one.one">https://one.one.one.one</a>) в качестве прокси.',
      order: 5.5,
    },
    exceptions: {
      dflt: null,
      category: 'exceptions',
    },
    ifMindExceptions: {
      dflt: true,
      category: 'exceptions',
      label: 'учитывать исключения',
      desc: 'Учитывать сайты, добавленные вручную. Только для своих прокси-серверов! Без своих прокси работать не будет.',
      order: 6,
    },
    whitelist: {
      dflt: [],
      category: 'exceptions',
    },
    ifMindWhitelist: {
      dflt: false,
      category: 'exceptions',
      label: 'Ограничиться только <a href="../exceptions/index.html">белым списком</a>',
      desc: 'Разрешить расширению работать только с адресами из белого списка.',
      order: 6.5,
    },
    customProxyStringRaw: {
      dflt: '',
      category: 'ownProxies',
      label: 'использовать СВОИ прокси',
      url: 'https://github.com/anticensority/runet-censorship-bypass/wiki/Свои-прокси-в-расширении',
      order: 7,
    },
    ifUseOwnProxiesOnlyForOwnSites: {
      dflt: false,
      category: 'ownProxies',
      label: 'СВОИ прокси только для СВОИХ сайтов',
      desc: 'Не использовать СВОИ прокси для всех сайтов из PAC-скрипта, а только для добавленных вручную исключений.',
      order: 7.5,
    },
    ifProxyMoreDomains: {
      ifDisabled: true,
      dflt: false,
      category: 'ownProxies',
      label: 'проксировать .onion, .i2p и <a href="https://en.wikipedia.org/wiki/OpenNIC#OpenNIC_TLDs">OpenNIC</a>',
      desc: 'Проксировать особые домены. Необходима поддержка со стороны СВОИХ прокси.',
      order: 8,
    },
    replaceDirectWith: {
      ifDisabled: true,
      dflt: false,
      category: 'ownProxies',
      label: 'подменять DIRECT на',
      desc: 'Использовать в PAC-скрипте указанную строку для запросов напрямую (вместо директивы DIRECT). Данная строка не проверяется на требования к шифрованию связи до прокси! Строка должна соответствовать формату возвращаемого значения PAC-скрипта, который подобен <a href="https://github.com/anticensority/runet-censorship-bypass/wiki/Свои-прокси-в-расширении#формат">формату своих прокси</a>.',
      order: 9,
    },

  });

  const getDefaults = function getDefaults() {

    const configs = getDefaultConfigs();
    return Object.keys(configs).reduce((acc, key) => {

      acc[key] = configs[key].dflt;
      return acc;

    }, {});
  };

  const getCurrentConfigs = function getCurrentConfigs(ifRaw = false) {

    const oldMods = kitchenState(modsKey);
    if (ifRaw) {
      // No migration!
      return oldMods;
    }

    // Client may expect mods.included and mods.excluded!
    // On first install they are not defined.
    const [err, mods, ...warns] = createPacModifiers(oldMods);
    if (err) {
      throw err;
    }
    return mods;

  };

  const getOrderedConfigsForUser = function getOrderedConfigs(category) {

    const pacMods = getCurrentConfigs();
    const configs = getDefaultConfigs();
    return Object.keys(configs)
      .sort((keyA, keyB) => configs[keyA].order - configs[keyB].order)
      .reduce((arr, key) => {

        const conf = configs[key];
        if(typeof(conf.order) === 'number') {
          if(!category || category === (conf.category || 'general')) {
            conf.value = pacMods[key];
            conf.key = key;
            conf.category = category || 'general';
            arr.push(conf);
         }
        }
        return arr;

      }, []);

  };

  const createPacModifiers = function createPacModifiers(mods = {}) {

    mods = mods || {}; // null?
    const configs = getDefaultConfigs();
    const ifNoMods = Object.keys(configs)
      .every((dProp) => {

        const ifDflt = (
          !(
            dProp in mods &&
            Boolean(configs[dProp].dflt) !== Boolean(mods[dProp])
          )
        );
        const ifMods = configs[dProp].ifDfltMods; // If default value implies PAC-script modification.
        return ifDflt ? !ifMods : ifMods;

      });

    const self = {};
    const gdft = getDefaults();
    Object.assign(self, gdft, mods);
    self.ifNoMods = ifNoMods;

    let customProxyArray = [];
    if (self.customProxyStringRaw) {
      customProxyArray = self.customProxyStringRaw
        .replace(/#.*$/mg, '') // Strip comments.
        .split( /(?:\s*(?:;\r?\n)+\s*)+/g )
        .map( (p) => p.trim() )
        .filter( (p) => p && /\s+/g.test(p) ); // At least one space is required.
      if (self.ifUseSecureProxiesOnly) {
        customProxyArray = customProxyArray.filter( (pStr) => /^HTTPS\s/.test(pStr) );
      }
    }
    if (self.ifUseLocalWarp) {
      self.warpPoints = ['SOCKS5 localhost:40000', 'HTTPS localhost:40000'];
      customProxyArray.push(...self.warpPoints);
    }
    if (self.ifUseLocalTor) {
      self.torPoints = ['SOCKS5 localhost:9150', 'SOCKS5 localhost:9050'];
      customProxyArray.push(...self.torPoints);
    }

    // Hanlde protected proxies in customProxyArray.
    const protectedProxies = [];
    customProxyArray = customProxyArray.map((proxyScheme) => {

      if (proxyScheme.includes('@')) {

        const proxy = window.utils.parseProxyScheme(proxyScheme);
        protectedProxies.push(proxy);
        return `${proxy.type} ${proxy.hostname}:${proxy.port}`;

      }
      return proxyScheme;

    });

    if (!ifAuthSupported && protectedProxies.length) {
      return [new Error('Запароленные прокси не поддерживаются в данной версии/платформе!')];
    }

    proxyHostToCredsList = {};
    protectedProxies.forEach(({ hostname, port, username, password }) => {

      proxyHostToCredsList[`${hostname}:${port}`] =
        proxyHostToCredsList[`${hostname}:${port}`] || [];
      const tries = proxyHostToCredsList[`${hostname}:${port}`];
      tries.push({
        username: username || '',
        password: password || '',
      });

    });

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

    [self.included, self.excluded] = [[], []];
    if (self.ifProxyMoreDomains) {
      self.moreDomains = [
        /* Networks */
        'onion', 'i2p',
        /* OpenNIC */
        'bbs', 'chan', 'dyn', 'free', 'geek', 'gopher', 'indy',
        'libre', 'neo', 'null', 'o', 'oss', 'oz', 'parody', 'pirate',
        /* OpenNIC Alternatives */
        'bazar', 'bit', 'coin', 'emc', 'fur', 'ku', 'lib', 'te', 'ti', 'uu'
      ];
    }
    if (self.ifMindExceptions && self.exceptions) {
      self.included = [];
      self.excluded = [];
      for(const host of Object.keys(self.exceptions)) {
        const ifProxy = self.exceptions[host] || false;
        if (ifProxy) {
          self.included.push(host);
        } else {
          self.excluded.push(host);
        }
      }
      ['included', 'excluded'].forEach((who) => {

        self[who] = self[who]
          .map( (domain) => domain.split('').reverse() )
          .sort()
          .map( (rDomain) => rDomain.reverse().join('') );

      });
      if (self.included.length && !self.filteredCustomsString) {
        return [null, self, new TypeError(
          'Имеются сайты, добавленные вручную. Они проксироваться не будут, т.к. нет СВОИХ проски, удовлетворяющих вашим требованиям! Если прокси всё же имеются, то проверьте требования (модификаторы).'
        )];
      }
    }
    return [null, self];

  };

  window.apis.pacKitchen = {

    getPacMods: getCurrentConfigs,
    getPacModsRaw: () => getCurrentConfigs(true),
    getOrderedConfigs: getOrderedConfigsForUser,

    cook(pacData, pacMods = mandatory()) {

      pacData = pacData.replace(
        new RegExp(kitchenStartsMark + '[\\s\\S]*$', 'g'),
        ''
      );
      /a/.test('a'); // GC RegExp.input and friends.

      return pacMods.ifNoMods ? pacData : pacData + `${ kitchenStartsMark }
/******/
/******/;(function(global) {
/******/  "use strict";
/******/
/******/  const originalFindProxyForURL = FindProxyForURL;
/******/  let tmp = function(url, host) {
/******/    const dotHost = '.' + host;
    ${
      function() {
        let generatedPac = `
/******/  if (${pacMods.ifMindWhitelist && pacMods.whitelist.length}) {
/******/    const ifWhitelisted =
/******/      ${JSON.stringify(pacMods.whitelist)}.some((whiteHost) => {
/******/        const ifWild = whiteHost.startsWith('*');
/******/          if (ifWild) {
/******/            return dotHost.endsWith(whiteHost.substr(1));
/******/          }
/******/          return host === whiteHost;
/******/      })
/******/    if (!ifWhitelisted) {
/******/      return 'DIRECT';
/******/    }
/******/  }`;

        generatedPac += pacMods.ifProhibitDns ? `
/******/
/******/    global.dnsResolve = function(host) { return null; };
/******/
/******/` : '';
        if (pacMods.ifProxyHttpsUrlsOnly) {

          generatedPac += `
/******/
/******/    if (!url.startsWith("https")) {
/******/      return "DIRECT";
/******/    }
/******/
/******/  `;
        }
        if (pacMods.ifUseLocalTor) {

          generatedPac += `
/******/
/******/    if (host.endsWith(".onion")) {
/******/      return "${pacMods.torPoints.join('; ')}";
/******/    }
/******/
/******/  `;
        }
        generatedPac += `
/******/
/******/    const directIfAllowed = ${pacMods.ifProxyOrDie ? '""/* Not allowed. */' : '"DIRECT"'};
/******/`;
        if (pacMods.filteredCustomsString) {
          generatedPac += `
/******/
/******/    const filteredCustomProxies = "${pacMods.filteredCustomsString}";
/******/`;
        }

        const ifIncluded = pacMods.included && pacMods.included.length;
        const ifExcluded = pacMods.excluded && pacMods.excluded.length;
        const ifManualExceptions = ifIncluded || ifExcluded;
        let finalExceptions = {};
        if (pacMods.ifProxyMoreDomains) {
          finalExceptions = pacMods.moreDomains.reduce((acc, tld) => {

            acc['*.' + tld] = true;
            return acc;

          }, finalExceptions);
        }
        if (pacMods.ifMindExceptions) {
          Object.assign(finalExceptions, (pacMods.exceptions || {}));
        }
        const ifExceptions = Object.keys(finalExceptions).length;

        if (ifExceptions) {
          generatedPac += `
/******/
/******/    /* EXCEPTIONS START */
            // TODO: handle wildcards.
/******/    const isHostInDomain = (domain, ifWild) => {
              if (ifWild) {
                return dotHost.endsWith(domain.substr(1));
              }
              return domain === host;
            }
/******/    const domainReducer = (maxWeight, [domain, ifProxy]) => {
/******/
              const ifWild = domain.startsWith('*.');
/******/      if (!isHostInDomain(domain, ifWild)) {
/******/        return maxWeight;
/******/      }
              let len = domain.length;
              if (ifWild) {
                len = len === 0 ? len : (len - 2)*2 - 1;
              } else {
                len = len*2;
              }
/******/      const newWeightAbs = len;
/******/      if (newWeightAbs < Math.abs(maxWeight)) {
/******/        return maxWeight;
/******/      }
/******/      return newWeightAbs*(ifProxy ? 1 : -1);
/******/
/******/    };
/******/
/******/    const excWeight = ${ JSON.stringify(Object.entries(finalExceptions)) }.reduce( domainReducer, 0 );
/******/    if (excWeight !== 0) {
/******/      if (excWeight < 0) {
/******/        // Never proxy it!
/******/        return "DIRECT";
/******/      }
/******/      // Always proxy it!
${        pacMods.filteredCustomsString
            ? `/******/      return filteredCustomProxies + "; " + directIfAllowed;`
            : '/******/      /* No custom proxies -- continue. */'
}
/******/    }
/******/    /* EXCEPTIONS END */
`;
        }
        generatedPac += `
/******/    const pacScriptProxies = originalFindProxyForURL(url, host)${
/******/          pacMods.ifProxyOrDie
                    ? '.replace(/DIRECT/g, "")'
                    : ' + "; " + directIfAllowed'
        };`;
        if(
          !pacMods.ifUseSecureProxiesOnly &&
          !pacMods.filteredCustomsString &&
           pacMods.ifUsePacScriptProxies
        ) {
          return generatedPac + `
/******/    return [pacScriptProxies, directIfAllowed]
              .filter((p) => p).join("; ") || "DIRECT";`;
        }

        return generatedPac + `
/******/    let pacProxyArray = pacScriptProxies.split(/(?:\\s*;\\s*)+/g).filter( (p) => p );
/******/    const ifNoProxies = pacProxyArray${pacMods.ifProxyOrDie ? '.length === 0' : '.every( (p) => /^DIRECT$/i.test(p) )'};
/******/    if (ifNoProxies) {
/******/      // Directs only or null, no proxies.
/******/      return "DIRECT";
/******/    }
/******/    return ` +
        ((pacMods.filteredCustomsString && !pacMods.ifUseOwnProxiesOnlyForOwnSites)
          ? 'filteredCustomProxies + "; " + '
          : ''
        ) +
        function() {

          if (!pacMods.ifUsePacScriptProxies) {
            return '';
          }
          let filteredPacExp = 'pacScriptProxies';
          if (pacMods.ifUseSecureProxiesOnly) {
            filteredPacExp =
              'pacProxyArray.filter( (pStr) => /^HTTPS\\s/.test(pStr) ).join("; ")';
          }
          return filteredPacExp + ' + "; " + ';

        }() + 'directIfAllowed;'; // Without DIRECT you will get 'PROXY CONN FAILED' pac-error.

      }()
    }

/******/  };
${
      !pacMods.replaceDirectWith
        ? ''
        : `
/******/  const oldTmp = tmp;
/******/  tmp = function(url, host) {
/******/    const ip = dnsResolve(host);
/******/    if (ip) {
/******/      const ipInt = convert_addr(ip);
/******/      if([
/******/          /* Reserved networks: https://en.wikipedia.org/wiki/Reserved_IP_addresses#IPv4 */
/******/          [-16777216,  0          ], // ['0.0.0.0'    , '255.0.0.0'  ],
/******/          [-16777216,  167772160  ], // ['10.0.0.0'   , '255.0.0.0'  ],
/******/          [-4194304,   1681915904 ], // ['100.64.0.0' , '255.192.0.0'],
/******/          [-16777216,  2130706432 ], // ['127.0.0.0'  , '255.0.0.0'  ],
/******/          [-65536,     -1442971648], // ['169.254.0.0', '255.255.0.0'],
/******/          [-1048576,   -1408237568], // ['172.16.0.0', '255.240.0.0'],
/******/          [-256,       -1073741824], // ['192.0.0.0'  , '255.255.255.0'],
/******/          [-256,       -1073741312], // ['192.0.2.0'  , '255.255.255.0'],
/******/          [-256,       -1067949312], // ['192.88.99.0'  , '255.255.255.0'],
/******/          [-65536,     -1062731776], // ['192.168.0.0', '255.255.0.0'],
/******/          [-131072,    -971898880 ], // ['198.18.0.0', '255.254.0.0'],
/******/          [-256,       -969710592 ], // ['198.51.100.0', '255.255.255.0'],
/******/          [-256,       -889163520 ], // ['203.0.113.0', '255.255.255.0'],
/******/          [-268435456, -536870912 ], // ['224.0.0.0', '240.0.0.0'],
/******/          [-268435456, -268435456 ], // ['240.0.0.0', '240.0.0.0'],
/******/          [-1,         -1         ], // ['255.255.255.255' , '255.255.255.255'],
/******/        ].some(([netMask, maskedNet]) => (ipInt & netMask) === maskedNet)
/******/      ) {
/******/        return "DIRECT";
/******/      }
/******/    }
/******/    return oldTmp.call(this, url, host).replace(/(;|^)\\s*DIRECT\\s*(?=;|$)/g, "$1${pacMods.replaceDirectWith}");
/******/  };
          `
}
/******/  if (global) {
/******/    global.FindProxyForURL = tmp;
/******/  } else {
/******/    FindProxyForURL = tmp;
/******/  }

/*****/})(this);`;

    },

    setNowAsync(details, cb = throwIfError) {

      if (typeof(details) === 'function') {
        cb = details;
        details = undefined;
      }

      new Promise((resolve) =>

        details
          ? resolve(details)
          : chrome.proxy.settings.get({}, timeouted(resolve) ),

      ).then((details) => {

        if (
          details && details.levelOfControl === 'controlled_by_this_extension'
        ) {
          const pac = window.utils.getProp(details, 'value.pacScript');
          if (pac && pac.data) {
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
        this.setNowAsync(details, (err) => { if (err) { throw err; } }); // TODO: suppress?
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
        kitchenState(modsKey, pacMods);
      }
      this.setNowAsync(
        (err, res, ...setWarns) => {

          const accWarns = modsWarns.concat(setWarns); // Acc = accumulated.
          if (err) {
            return cb(err, res, ...accWarns);
          }

          if (!ifProxiesChanged) {
            return cb(null, res, ...accWarns);
          }
          const newHosts = (pacMods.customProxyArray || []).map( (ps) => ps.split(/\s+/)[1] );
          window.utils.fireRequest(
            'ip-to-host-replace-all',
            newHosts,
            (err, res, ...moreWarns) =>
              cb(err, res, ...accWarns, ...moreWarns),
          );

        },
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
      return originalSet(details, window.utils.timeouted(cb));
    }
    const pacMods = getCurrentConfigs();
    pac.data = pacKitchen.cook( pac.data, pacMods );
    originalSet({value: details.value}, window.utils.chromified((err) => {

      if (!err) {
        kitchenState(ifIncontinence, null);
      }
      window.utils.lastError = err;
      cb && cb();

    }));
  };

} // Private namespace ends.
