var coolFind = () => {};
this.FindProxyForURL = function (...args) {
  return coolFind(...args);
};

const dnsResolve = this.dnsResolve || (() => null); // Welcome to hell! Someone forgot dns.

browser.runtime.onMessage.addListener((details) => {
  const pacData =
    details && details.value && details.value.pacScript && details.value.pacScript.data;
  if (!pacData) {
    throw new Error('Never install empty PAC scripts!');
  }
  coolFind = (function() { eval(pacData); return FindProxyForURL; })();

});

