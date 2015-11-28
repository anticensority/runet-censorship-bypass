'use strict';

module.exports = (hosts, ips, generator, generatePac) => generatePac( require('./ifBinaryFound'), 'dnsResolve(host)', ips );
