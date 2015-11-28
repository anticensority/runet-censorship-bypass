'use strict';

module.exports = (hosts, ips, generator, generatePac) => generatePac( require('./ifBinaryFound'), 'host', hosts );
