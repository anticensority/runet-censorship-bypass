'use strict';

{

  const mandatory = window.utils.mandatory;
  const httpLib = window.apis.httpLib;
  const clarify = window.apis.errorsLib.clarify;

  // IP REGEX starts.

  const portOpt = '(:\\d+)?'; // The only capturing group, sic!
  const ipv4portOpt = `(?:[0-9]{1,3}\\.){3}[0-9]{1,3}${portOpt}`;
  const ipv6nake = '(?:[0-9a-f]{0,4}:){2,7}[0-9a-f]{0,4}';
  const ipv6portOpt = `(?:${ipv6nake}|\\[${ipv6nake}\\]${portOpt})`;

  const ipv4Re = new RegExp(`^${ipv4portOpt}$`);
  const ipv6Re = new RegExp(`^${ipv6portOpt}$`);

  const reMatchIp = function reMatchIp(ipRe, str) {

    const m = (str.match(ipRe) || []).filter((c) => c);
    const port = m.length > 1 ? m.pop() : false;
    return { ifMatched: m.length, port };

  };

  const matchIpv4v6 = function matchIpv4v6(str) {

    let mr = reMatchIp(ipv4Re, str);
    if (mr.ifMatched) {
      mr.ifv4 = true;
      mr.canonical = str.replace(mr.port, '');
      return mr;
    }
    mr = reMatchIp(ipv6Re, str);
    if (mr.ifMatched) {
      mr.ifv6 = true;
      mr.canonical = str.replace(mr.port, '').replace(/[[\]]/g, '');
      return mr;
    }
    return mr;

  };

  // IP REGEX ends.

  // GET IPS starts.

  const getIpsFor = function getIpsFor(host, cb = mandatory()) {

    if (host.trim() === 'localhost') {
      return cb(null, ['127.0.0.1', '::1']);
    }
    const types = [1, 28];
    const promises = types.map(
      (type) => new Promise((resolve) =>
        httpLib.get(
          `https://dns.google.com/resolve?type=${type}&name=${host}`,
          (httpErr, httpRes) => {

            let res = httpRes;
            let err = httpErr;
            if (httpRes) {
              let jsonRes = {};
              try {
                jsonRes = JSON.parse(httpRes);
                res = jsonRes;
                if (httpErr || jsonRes.Status) {
                  const msg = ['Answer', 'Comment', 'Status']
                    .filter((prop) => jsonRes[prop])
                    .map((prop) => `${prop}: ${JSON.stringify(jsonRes[prop])}`)
                    .join(', \n');
                  err = clarify(httpErr || {}, `Сервер (json): ${msg}`, { data: jsonRes });
                } else {
                  res = (jsonRes.Answer || []).filter(
                    (record) => types.includes(record.type)
                  ).map((ans) => ans.data);
                }
              } catch (e) {
                err = clarify(
                  e,
                  `Сервер (текст): ${res}`,
                  httpErr ? { data: httpErr } : undefined
                );
              }
            }
            resolve([err, res]);

          }
        )
      )
    );
    Promise.all(promises).then(
      ([[v4err, v4res], [v6err, v6res]]) => {

        if (v4err) {
          return cb(v4err, v4res);
        }
        const ips = v4res;
        let warns = [];
        if (!v6err) {
          ips.push(...v6res);
        } else {
          warns = [v6err];
        }
        return cb(null, ips, ...warns);

      }
    );
    return undefined;

  };

  // GET IPS ends.

  const ipToHostKey = '';
  const privates = {

    state: window.utils.createStorage('ip-to-host'),

    createHostObj(hostStr) {

      return (this.strToHostObj[hostStr] = { host: hostStr });

    },

    getHostObj(hostStr) {

      return this.strToHostObj[hostStr] || this.createHostObj(hostStr);

    },

    reinit() {

      // Defaults.
      const antizapret = {
        /* Don't use directly, please.
           Encoded to counter abuse. */
        host: '\x70\x72\x6f\x78\x79\x2e\x61\x6e\x74\x69\x7a\x61\x70\x72\x65\x74\x2e\x70\x72\x6f\x73\x74\x6f\x76\x70\x6e\x2e\x6f\x72\x67',
      };
      this.strToHostObj = {
        [antizapret.host]: antizapret,
      };

      this.ipToHostObj = {};
      [ // IPs of Antizapret.
        '195.123.209.38',
        '137.74.171.91',
        '51.15.39.201',
        '2001:bc8:4700:2300::1:d07',
        '2a02:27ac::10',
      ].forEach((ip) => {
        this.ipToHostObj[ip] = antizapret;
      });

      // Persisted.
      const ipToHost = this.state(ipToHostKey);
      if (ipToHost) {
        Object.keys(ipToHost).forEach((ip) => {

          const host = ipToHost[ip];
          this.ipToHostObj[ip] = this.getHostObj(host);

        });
      }

    },

    // POST INIT

    resetToDefaults() {

      this.state(ipToHostKey, null);
      this.reinit();

    },

    purgeOldIpsForSync(hostStr) {

      console.log('Purging old IPs for', hostStr);
      Object.keys(privates.ipToHostObj).forEach((ip) => {
        if (hostStr === this.ipToHostObj[ip].host) {
          delete this.ipToHostObj[ip];
        }
      });

    },

    addAsync(hostStr, cb = mandatory()) {

      getIpsFor(hostStr, (err, ips, ...warns) => {

        console.log('Got IPs + err?:', ips, err);
        if (!err) {
          this.purgeOldIpsForSync(hostStr);
          // Object may be shared, string can't.
          const hostObj = privates.getHostObj(hostStr);
          ips.forEach((ip) => {
            privates.ipToHostObj[ip] = hostObj;
          });
        }
        return cb(err, null, ...warns);

      });

    },

    updateAllAsync(cb = mandatory()) {

      const hostArr = Object.keys(this.strToHostObj);
      console.log('Update all:', hostArr);

      const promises = hostArr.map(
        (hostStr) => new Promise(
          (resolve) => this.addAsync(
            hostStr,
            (...args) => resolve(args)
          )
        )
      );
      Promise.all(promises).then((cbsRes) => {

        const errors = cbsRes.map(([err]) => err).filter((err) => err);
        let newError;
        const ifAllErrors = cbsRes.length === errors.length;
        if (errors.length) {
          if (ifAllErrors) {
            newError = errors.shift();
          } else {
            newError = errors;
          }
          newError = clarify(
            newError,
            'Не удалось получить один или несколько IP адресов для' +
            ' прокси-серверов. Иконка для уведомления об обходе' +
            ' блокировок может не отображаться.'
          );
          if (ifAllErrors) {
            return cb(newError);
          }
        }
        return cb(null, null, newError);

      });

    },

    replaceAllAsync(maybeHostArr = mandatory(), maybeCb) {

      let hostArr;
      let cb;
      if (typeof maybeHostArr === 'function') {
        hostArr = Object.keys(this.strToHostObj);
        cb = maybeHostArr;
      } else {
        hostArr = maybeHostArr;
        cb = maybeCb;
      }

      this.resetToDefaults();
      hostArr.forEach((hostStr) => this.createHostObj(hostStr));

      this.updateAllAsync(cb);

    },
  };

  privates.reinit();

  const canonize = function canonize(addrArr) {

    const ipSet = new Set();
    const hostSet = new Set();

    addrArr.forEach((addr) => {

      const ipm = matchIpv4v6(addr);
      if (ipm.ifMatched) {
        ipSet.add(ipm.canonical);
      } else {
        hostSet.add(addr.replace(/:\d+$/, ''));
      }

    });

    console.log(`Canonized hosts/ips: ${hostSet.size}/${ipSet.size}`);
    return [ipSet, hostSet];

  };

  const theApi = window.apis.ipToHost = {

    persistData() {

      console.log('Persisting ipToHost...', privates);
      const ipToHost = {};
      Object.keys(privates.ipToHostObj).forEach((ip) => {
        ipToHost[ip] = privates.ipToHostObj[ip].host;
      });
      privates.state(ipToHostKey, ipToHost);

    },

    resetToDefaults() {

      privates.resetToDefaults();

    },

    // PUBLIC

    updateAllAsync(cb = mandatory()) {

      privates.updateAllAsync((err, ...args) => {

        if (!err) {
          this.persistData();
        }
        cb(err, ...args);

      });

    },

    replaceAllAsync(addrArr, cb = mandatory()) {

      console.log('Replacing...');
      const [ipSet, hostSet] = canonize(addrArr);
      ipSet.forEach((ip) => {

        privates.ipToHostObj[ip] = privates.getHostObj(ip);

      });

      const hostArr = Array.from(hostSet);
      privates.replaceAllAsync(hostArr, (allErr, ...args) => {

        if (!allErr) {
          this.persistData();
        }
        cb(allErr, ...args);

      });

    },

    get(ip) {

      const tmp = privates.ipToHostObj[ip];
      return tmp && tmp.host;

    },

  };

  window.utils.addRequestResponder(
    'ip-to-host-update-all', (...args) => theApi.updateAllAsync(...args)
  );
  window.utils.addRequestResponder(
    'ip-to-host-replace-all', (...args) => theApi.replaceAllAsync(...args)
  );
  window.utils.addRequestResponder(
    'ip-to-host-reset-to-defaults', (cb) => {
      theApi.resetToDefaults();
      cb();
    }
  );

}
