nl.drew.cp.core.cache = function() {
  var cache = {};
  cache.nowProxyAllClean = function() {
    nl.drew.cp.state.nowProxyCache = {};
  };
  cache.nowProxyClean = function(purl) {
    if (typeof purl.host != "undefined" && purl.host) {
      delete nl.drew.cp.state.nowProxyCache[purl.host];
    }
  };
  return cache;
}();

