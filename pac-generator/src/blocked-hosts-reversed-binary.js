'use strict';

module.exports = (hosts, ips, generator, generatePac) => {

  var reverse = str => str.split('').reverse().join('');
  var reversedHosts = hosts.map( reverse ).sort();

  function ifReversedBinaryFound(host, sortedArray) {
    target = host.split('').reverse().join('');
    var istart = 0;
    var iend = sortedArray.length - 1;

    while (istart < iend) {
      var imid = istart + Math.floor( (iend - istart)*0.5 );
      if (target > sortedArray[imid])
        istart = imid + 1;
      else
        iend = imid;
    }
    return dnsDomainIs( host, sortedArray[iend].split('').reverse().join('') );
  }

  return generatePac( ifReversedBinaryFound, 'host', reversedHosts );

}
