'use strict';

{

  const mandatory = window.utils.mandatory;
  const httpLib = window.apis.httpLib;
  const clarify = window.apis.errorsLib.clarify;

  // IP REGEX starts.

  const portOpt = '(:\\d+)?'; // The only capturing group, sic!
  const ipv4portOpt = '(?:[0-9]{1,3}\\.){3}[0-9]{1,3}' + portOpt;
  const ipv6nake = '(?:[0-9a-f]{0,4}:){2,7}[0-9a-f]{0,4}';
  const ipv6portOpt = '(?:' + ipv6nake + '|' + '\\[' + ipv6nake + '\\]' + portOpt + ')';

  const ipv4Re = new RegExp('^' + ipv4portOpt + '$');
  const ipv6Re = new RegExp('^' + ipv6portOpt + '$');

  const _match = function _match(ipRe, str) {

    const m = (str.match(ipRe) || []).filter( (c) => c );
    const port = m.length > 1 ? m.pop() : false;
    return {ifMatched: m.length, port: port};

  };

  const _test = {

    ipv4: _match.bind(null, ipv4Re),
    ipv6: _match.bind(null, ipv6Re),
    ipv4v6: function(str) {

      let mr = this.ipv4(str);
      if (mr.ifMatched) {
        mr.ifv4 = true;
        mr.canonical = str.replace(mr.port, '');
        return mr;
      }
      mr = this.ipv6(str);
      if (mr.ifMatched) {
        mr.ifv6 = true;
        mr.canonical = str.replace(mr.port, '').replace(/[\[\]]/g, '');
        return mr;
      }
      return mr;

    },

  };

  // IP REGEX ends.

  const _state = window.utils.createStorage('ip-to-host');
  const ip2host = '';

  const privates = {};

  const _createHostObj = function _addHostObj(hostStr) {

    return (privates._strToHostObj[hostStr] = {host: hostStr});

  };

  const _getHostObj = function _getHostObj(hostStr) {

    return privates._strToHostObj[hostStr] || _createHostObj(hostStr);

  };

  const reinit = function reinit() {

    // Defaults.
    const _antizapret = {
      /* Don't use directly, please.
         Encoded to counter abuse. */
      host: '\x70\x72\x6f\x78\x79\x2e\x61\x6e\x74\x69\x7a\x61\x70\x72\x65\x74\x2e\x70\x72\x6f\x73\x74\x6f\x76\x70\x6e\x2e\x6f\x72\x67',
    };
    privates._strToHostObj = {
      [_antizapret.host]: _antizapret,
    };

    privates._ipToHostObj = {};
    for( const ip of [
      // IPs of Antizapret.
      '195.123.209.38',
      '137.74.171.91',
      '51.15.39.201',
      '2001:bc8:4700:2300::1:d07',
      '2a02:27ac::10',
    ] ) {
      privates._ipToHostObj[ip] = _antizapret;
    }

    // Persisted.
    const ipToHost = _state(ip2host);
    if (ipToHost) {
      for( const ip of Object.keys(ipToHost) ) {
        const host = ipToHost[ip];
        privates._ipToHostObj[ip] = _getHostObj(host);
      }
    }

  };

  reinit();

  const getIpsFor = function getIpsFor(host, cb = mandatory()) {

    if (host.trim() === 'localhost') {
      return cb(null, ['127.0.0.1', '::1']);
    }
    const types = [1, 28];
    const promises = types.map(
      (type) => new Promise((resolve) =>
        httpLib.get(
          'https://dns.google.com/resolve?type=' + type + '&name=' + host,
          (err, res) => {

            console.log('After GET...');
            if (res) {
              try {
                console.log('Parsing JSON...');
                res = JSON.parse(res);
                console.log('JSON parsed.');
                if (err || res.Status) {
                  const msg = ['Answer', 'Comment', 'Status']
                    .filter( (prop) => res[prop] )
                    .map( (prop) => prop + ': ' + JSON.stringify( res[prop] ) )
                    .join(', \n');
                  err = clarify(err || {}, 'Сервер (json): ' + msg, {data: res});
                } else {
                  res = res.Answer || [];
                  res = res.filter(
                    (record) => types.includes(record.type)
                  ).map( (ans) => ans.data );
                }
              } catch(e) {
                err = clarify(
                  e,
                  'Сервер (текст): ' + res, err ? {data: err} : undefined
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

        if(v4err) {
          return cb(v4err, v4res);
        }
        const ips = v4res;
        let warns = [];
        if (!v6err) {
          ips.push(...v6res);
        } else {
          warns = [v6err];
        }
        cb(null, ips, ...warns);

      }
    );

  };

  const _canonize = function canonize(addrArr) {

    const ipSet = new Set();
    const hostSet = new Set();

    for( const addr of addrArr ) {

      const ipm = _test.ipv4v6(addr);
      if (ipm.ifMatched) {
        ipSet.add( ipm.canonical );
      } else {
        hostSet.add( addr.replace(/:\d+$/, '') );
      }

    }

    console.log('Canonized hosts/ips:', hostSet.size + '/' + ipSet.size);
    return [ipSet, hostSet];

  };

  window.apis.ipToHost = {

    persist() {

      console.log('Persisting ipToHost...', privates);
      const ipToHost = {};
      for( const ip of Object.keys(privates._ipToHostObj) ) {
        ipToHost[ip] = privates._ipToHostObj[ip].host;
      }
      _state(ip2host, ipToHost);

    },

    resetToDefaults() {

      _state(ip2host, null);
      reinit();

    },

    _purgeOldIpsForSync(hostStr) {

      console.log('Purging old IPs for', hostStr);
      for(const ip of Object.keys(privates._ipToHostObj)) {
        if (hostStr === privates._ipToHostObj[ip].host) {
          console.log('del', ip);
          delete privates._ipToHostObj[ip];
        }
      }

    },

    _addAsync(hostStr, cb = mandatory()) {

      getIpsFor(hostStr, (err, ips, ...warns) => {

        console.log('Got IPs + err?:', ips, err);
        if (!err) {
          this._purgeOldIpsForSync(hostStr);
          // Object may be shared, string can't.
          const hostObj = _getHostObj(hostStr);
          for(const ip of ips) {
            console.log('IP', ip);
            privates._ipToHostObj[ip] = hostObj;
            console.log(privates._ipToHostObj[ip], privates._ipToHostObj);
          }
        }
        return cb(err, null, ...warns);

      });

    },

    _updateAllAsync(cb = mandatory()) {

      const hostArr = Object.keys(privates._strToHostObj);
      console.log('Update all:', hostArr);

      const promises = hostArr.map(
        (hostStr) => new Promise(
          (resolve) => this._addAsync(
            hostStr,
            (...args) => resolve(args)
          )
        )
      );
      Promise.all( promises ).then( (cbsRes) => {

        const errors = cbsRes.map( ([err]) => err ).filter( (err) => err );
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
        cb(null, null, newError);

      });

    },


    updateAllAsync(cb = mandatory()) {

      this._updateAllAsync((err, ...args) => {

        if (!err) {
          this.persist();
        }
        cb(err, ...args);

      });

    },

    _replaceAllAsync(hostArr = mandatory(), cb) {

      if (typeof(hostArr) === 'function') {
        cb = hostArr;
        hostArr = Object.keys(privates._strToHostObj);
      }

      this.resetToDefaults();
      for(const hostStr of hostArr) {
        _createHostObj(hostStr);
      }

      this._updateAllAsync(cb);

    },

    replaceAllAsync(addrArr, cb = mandatory()) {

      console.log('Replacing...');
      const [ipSet, hostSet] = _canonize(addrArr);
      for( const ip of ipSet ) {
        const host = _getHostObj(ip);
        privates._ipToHostObj[ip] = host;
      }

      const hostArr = Array.from(hostSet);
      this._replaceAllAsync(hostArr, (allErr, ...args) => {

        if (!allErr) {
          this.persist();
        }
        cb(allErr, ...args);

      });

    },

    get(ip) {

      const tmp = privates._ipToHostObj[ip];
      return tmp && tmp.host;

    },

  };

}
