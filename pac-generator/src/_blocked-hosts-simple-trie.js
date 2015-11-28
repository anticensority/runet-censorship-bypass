'use strict';

module.exports = (hosts, ips, generator, generatePac) => {

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

  return generatePac( ifProxyBySimpleTrie, 'host',  simpleTrie );

}
