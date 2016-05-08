'use strict';

module.exports = (hosts, ips, generator, generatePac) => {

  function ifProxyByIp(host, blockedIpsArray) {

    // Internet Explorer
    if (!Array.prototype.indexOf)
      Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++)
          if (this[i] === obj) return i;
        return -1;
      }

    return blockedIpsArray.indexOf( dnsResolve(host) ) !== -1
  }

  return generatePac( ifProxyByIp, 'host', ips );

}
