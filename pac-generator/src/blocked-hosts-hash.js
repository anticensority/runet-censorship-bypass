'use strict';

module.exports = (hosts, ips, generator, generatePac) => {
  var hostsHash = {'': true};
  hosts.forEach( host => hostsHash[host] = true );
  function ifProxyByHash(host, hostsHash) {
    while(!hostsHash[host])
      host = (host+'.').replace(/^\w*\./g);
    return host.length !== 0;
  }
  return generatePac( ifProxyByHash, 'host', hostsHash )
};
