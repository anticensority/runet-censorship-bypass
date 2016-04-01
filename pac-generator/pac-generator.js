'use strict';

var fs = require('fs');

var input = fs.readFileSync('dump.csv').toString();

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
  var args = [].slice.call( arguments );
  var fun = args.shift();
  var args = args
    .map( a => typeof a !== 'string' ? JSON.stringify(a) : a ).join(', ');
  return '('+fun+')('+args+')';
}

function ifProxy2pac() {
  return pacTemplate.replace( 'IFPROXY()', stringifyCall.apply(this, arguments) );
}

function writeOutputToFile() {
  var args = [].slice.call( arguments );
  var scriptPath = args.shift();
  var pac = ifProxy2pac.apply(this, args);
  fs.writeFileSync( scriptPath, pac);
}

module.exports = {
  hosts: hosts,
  ips: ips,
  stringifyCall: stringifyCall,
  writeOutputToFile: writeOutputToFile,
}
