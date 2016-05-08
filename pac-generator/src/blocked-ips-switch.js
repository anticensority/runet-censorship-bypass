'use strict';

module.exports = (hosts, ips, generator, generatePac) => {

	function ifProxyBySwitch(host) {
	  switch( dnsResolve(host) ) {
//CASES
	  }
		return false;
	}

	var cases = ips.map( ip => 'case "'+ip+'":' ).join('\n') +'\nreturn true;';
	var ifProxySwitchStr = ifProxyBySwitch.toString().replace('//CASES', cases);

	return generatePac( ifProxySwitchStr, 'host' );

}
