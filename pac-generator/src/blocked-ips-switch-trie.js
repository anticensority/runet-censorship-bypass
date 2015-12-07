'use strict';

module.exports = (hosts, ips, generator, generatePac) => {

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
  for(var ip of ips) {
    var doms = ip.split('.').reverse();
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
    var doms = dnsResolve(host).split('.').reverse();
//SWITCH
    return false;
  }

  var ifProxyByTrieStr = ifProxyByTrie.toString().replace('//SWITCH', trieToSwitch(trie, '  '));

  return generatePac( ifProxyByTrieStr, 'host' );

}
