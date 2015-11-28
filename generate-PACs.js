var fs = require('fs');

var input = fs.readFileSync('dump.csv').toString();
var outputDir = 'generated-PACs';

try {
  fs.mkdirSync( outputDir );
} catch(e) {
  if ( e.code != 'EEXIST' ) throw e;
}

var punycode = require('punycode')

/*
  CVS Format:

   IP(s);host(s);URL(s);organization(s);reason;yyyy-mm-dd

  * multiple values are joind by " | "
  * url may have wierd protocol, e.g.: Newcamd525://

*/

var columnsSep = ';';
var valuesSep = /\s*\|\s*/g;

var ips = [], hosts = [], urls = [], orgs = [], date, reason;

for(var line of input.trim().split(/\r?\n/g).slice(1)) {
  var values = line.split( columnsSep );
  var newIps    = values.shift().split( valuesSep );
  var newHosts  = values.shift().split( valuesSep ).map( punycode.toASCII ).map( host => host.replace(/\.+$/g) );
  var newUrls   = values.shift().split( valuesSep );
  var newOrgs   = values.shift().split( valuesSep );
  var newDate   = values.pop();
  var newReason = values.join(';');
  ips.push.apply(ips, newIps);
  hosts.push.apply(hosts, newHosts);
}

function toHash(arr) {
  var res = {};
  arr.forEach( el => res[el] = true );
  return res;
}

var ipsHash   = toHash(ips);
var hostsHash = toHash(hosts);

// Remove duplicates and sort.
var ips   = Object.keys(ipsHash).sort();
var hosts = Object.keys(hostsHash).sort();

function FindProxyForURL(url, host) {
  // ProstoVPN.AntiZapret PAC-ip File
  // Generated on Sun Nov 22 10:12:29 MSK 2015

  // The whole PAC script is reevaluated on each call of this function.

  host = host.replace(/\.+$/).toLowerCase(); // E.g. WinHTTP may be nasty.

  // HTTPS proxy is a HTTP proxy over SSL. It is NOT CONNECT proxy!
  // Supported only in Chrome and Firefox.
  // http://www.chromium.org/developers/design-documents/secure-web-proxy
  // This is to bypass FULL DPI
  var isIE = /*@cc_on!@*/!1;
  var viaProxy = isIE
    ? 'PROXY proxy.antizapret.prostovpn.org:3128; DIRECT'
    : 'HTTPS proxy.antizapret.prostovpn.org:3143; PROXY proxy.antizapret.prostovpn.org:3128; DIRECT';

  return IFPROXY() ? viaProxy : 'DIRECT';
}

var pacTemplate = FindProxyForURL.toString();

function stringifyCall() {
  var fun = arguments[0];
  var args = [].slice.call( arguments, 1 )
    .map( a => typeof a !== 'string' ? JSON.stringify(a) : a ).join(', ');
  return '('+fun+')('+args+')';
}

function produceOutput() {
  var args = [].slice.call( arguments )
  var scriptName = args.shift();

  var script = pacTemplate
    .replace( 'IFPROXY()', stringifyCall.apply(this, args) );
  fs.writeFileSync(outputDir +'/'+ scriptName +'.js', script);
}

// BLOCKED IPS ARRAY

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

produceOutput('blocked-ips-indexOf', ifProxyByIp, 'host', ips);

// BLOCKED IPS SWITCH

function ifProxyBySwitch(host) {
  switch( dnsResolve(host) ) {
/*{CASES}*/
default:
  return false;
  }
}

var cases = ips.map( ip => 'case "'+ip+'":' ).join('\n') +'\nreturn true;';
var ifProxySwitchStr = ifProxyBySwitch.toString().replace('/*{CASES}*/', cases);

produceOutput('blocked-ips-switch', ifProxySwitchStr, 'host' );

// BLOCKED IPS BINARY

function ifBinaryFound(target, sortedArray) {
  var istart = 0;
  var iend = sortedArray.length - 1;

  while (istart < iend) {
    var imid = istart + Math.floor( (iend - istart)*0.5 );
    if (target > sortedArray[imid])
      istart = imid + 1;
    else
      iend = imid;
  }

  return target === sortedArray[iend];
}

produceOutput('blocked-ips-binary', ifBinaryFound, 'dnsResolve(host)', ips);

// BLOCKED HOSTS BINARY
produceOutput('blocked-hosts-binary', ifBinaryFound, 'host', hosts);

// REVERSED BINARY

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

produceOutput('blocked-hosts-reversed-binary', ifReversedBinaryFound, 'host', reversedHosts);

// REVERSED HOSTS SWITCH

function populateTrie(trie, doms) {

  var dom = doms.pop();
  if (!doms.length || doms.length === 1 && doms[0] === 'www') {
    trie[''] = trie[''] || [];
    trie[''].push( dom )
    return trie;
  }

  if (trie[''] && trie[''].indexOf(dom) !== -1) // Subdomain of a blocked domain.
    return trie;

  trie[dom] = trie[dom] || {};

  populateTrie( trie[dom], doms );
  return trie;
}

var trie = {};
for(var host of hosts) {
  var doms = host.split('.');
  populateTrie(trie, doms);
}

function trieToSwitch(trie, indent) {
  var _indent = indent || '';
  var indent = _indent + '  ';
  var keys = Object.keys(trie).sort();

  if (!trie[''] && keys.length === 1) {
    var key = keys[0];
    return _indent + 'if (doms.pop() === "'+key+'")\n'+ trieToSwitch(trie[key], indent);
  }

  var cases = '';
  if (trie['']) {
    var values = trie[''].sort();

    if (values.length === 1 && keys.length === 1)
      return _indent + 'return doms.pop() === "'+values[0]+'";\n';

    cases =
      values.filter( v => v ).map( val => indent +'case "'+val+'":\n' ).join('') + indent +'  return true;\n';

    delete trie[''];
    keys = Object.keys(trie).sort();
  }

  cases += keys.filter( k => k ).map(
    key => {
      var tmp = trieToSwitch( trie[key], indent+'  ');
      if (!/^\s*return/.test(tmp))
        tmp += indent+'  break;\n';

      return indent +'case "'+key+'":\n' +tmp;
    }
  ).join('');

  return ''
    + _indent +'switch( doms.pop() ) {\n'
    + cases
    + _indent +'}\n';
}

function ifProxyByTrie(host) {
//SWITCH
  return false;
}

var ifProxyByTrieStr = ifProxyByTrie.toString().replace('//SWITCH', trieToSwitch(trie, '  '));

produceOutput('blocked-hosts-switch', ifProxyByTrieStr, 'host' );

/* REVERSED HOSTS BINARY TRIE

function populateBinTrie(trie, doms) {
  var dom = doms.pop();
  if (!doms.length || doms.length === 1 && doms[0] === 'www') {
    trie[dom] = 'blocked';
    return trie;
  }

  if (trie[dom] === 'blocked') // Subdomain of a blocked domain.
    return trie;

  trie[dom] = trie[dom] || {};
  populateBinTrie( trie[dom], doms );
  return trie;
}

var trie = {};
for(var host of hosts) {
  var doms = host.split('.');
  populateBinTrie(trie, doms);
}

function trie2sorted(trie) {
  if (trie === 'blocked')
    return trie;

  var keys = Object.keys(trie).sort();
  return keys.map( key => trie[key] !== 'blocked' ? [ key, trie2sorted( trie[key] ) ] : [key] );
}

var sortedTrie = trie2sorted(trie);

function ifProxyByBinTrie(host, sortedTrie) {

  var doms = host.split('.');

  function ifBinaryBlocked(sortedTrie) {
    var target = doms.pop();
    if (!target)
      return false;

    var istart = 0;
    var iend = sortedTrie.length - 1;

    while (istart < iend) {
      var imid = istart + Math.floor( (iend - istart)*0.5 );
      if (target > sortedTrie[imid][0])
        istart = imid + 1;
      else
        iend = imid;
    }

    if (target !== sortedTrie[iend][0])
      return false;

    return sortedTrie[iend].length < 2 ? true : ifBinaryBlocked( sortedTrie[iend][1] );
  }

  return ifBinaryBlocked(sortedTrie)
}

produceOutput('blocked-hosts-binary-trie', ifProxyByBinTrie, 'host',  sortedTrie);

*/

// BLOCKED HOSTS PLAIN SWITCH

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
var tmp = ifProxyByPlainSwitch.toString().replace('//CASES', cases);

produceOutput( 'blocked-hosts-plain-switch', tmp, 'host' );


// SIMPLY TRIE

function populateSimpleTrie(trie, letters) {

  if (!letters.length || !trie)
    return trie;

  var letter = letters.shift();

  if (!letters.length) {
    trie[letter] = ['', false];
    return trie;
  }

  if (trie[letter] === ['', false]) // Subdomain of a blocked domain.
    return trie;

  if (!trie[letter]) {
    trie[letter] = [letters.join(''), false]
    return trie;
  }

  var arr = trie[letter];
  var link = arr[0].split('');
  var linkTrie = arr[1];

  function commonPrefix(wa, wb) {
    var len = Math.min(wa.length, wb.length);
    var i = -1;
    while(++i < len)
      if (wa[i] !== wb[i])
        break;
    return wa.slice(0, i)
  }

  var prefix = commonPrefix(link, letters);

  var suffixLetters = letters.slice(prefix.length);
  var suffixLink    = link.slice(prefix.length);

  var newTrie = {};
  if (!suffixLink.length)
    var newTrie = linkTrie;
  if (!suffixLetters.length)
    var newTrie = false;

  if (newTrie) {
    newTrie = populateSimpleTrie( newTrie, suffixLetters );
    newTrie = populateSimpleTrie( newTrie, suffixLink );
  }
  trie[letter] = [prefix.join(''), newTrie];

  return trie;
}

var simpleTrie = {};
for(var host of hosts)
  populateSimpleTrie(simpleTrie, host.split('').reverse());

function ifProxyBySimpleTrie(host, simpleTrie) {
  var letters = host.split('').reverse();
  while(letters.length) {
    var letter = letters.shift();
    var arr = simpleTrie[letter];
    var link     = arr[0];

    if (link.length > letters.length)
      return false;

    for( var i=0; i < link.length; ++i )
      if ( letters[i] !== link.charAt(i) )
        return false;

    letters = letters.slice(link.length);
    simpleTrie = arr[1];
    if (!simpleTrie)
      return true;
  }
}

produceOutput('blocked-hosts-simple-trie', ifProxyBySimpleTrie, 'host',  simpleTrie);
