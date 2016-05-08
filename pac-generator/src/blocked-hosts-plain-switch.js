'use strict';

module.exports = (hosts, ips, generator, generatePac) => {

  function ifProxyByPlainSwitch(host) {

    function ifBlocked(host) {
      switch( host ) {
//CASES
      }
      return false;
    }

    var doms = host.split('.');

    for( var endi = doms.length-1; endi >= 0; --endi )
      if (ifBlocked( doms.slice( endi ).join('.') ))
        return true;
    return false;
  }

  var cases = hosts.map( host => 'case "'+host+'":' ).join('\n') +'\nreturn true;';
  var ifProxyString = ifProxyByPlainSwitch.toString().replace('//CASES', cases);

  return generatePac( ifProxyString, 'host' );

}
