## PAC-Script Performance Analysis

__Warning:__ this experimentation wasn't implemented in the extension yet.

Somewhere in PAC-script you may want:

```javascript
if (Is_subdomain_of( host, blocked_hosts ))
  return 'use proxy';
```

You have to make `Is_subdomain_of` very fast.  
This check is executed on each request. You should watch memeory consumption too.

The naive solution is to keep array of blocked ips and check if the host resolves to one of the ips.  
You may do it with `indexOf`, binary search, etc.  
The shortcoming of every ip solution is that __some providers resolve blocked hosts to wrong ips__, so we eventually need list of hosts.

I have tested different [solutions](https://github.com/ilyaigpetrov/anti-censorship-russia/tree/master/pac-generator/src), and depicted [results](./benchmark/Output.txt) in the following chart:

![Host Lookup Chart: Time-Memory, Hits-Misses](./chart/host-lookup-chart.png)

* __IPs indexOf__ – Blocked IP is searched by `indexOf`
* __IPs binary__  – Blocked IP is searched by binary search. For some reason miss time slightly increased.
* __IPs switch__  – Simply `switch(Blocked_IP) { case1: ... caseN: return true }`. Works even better than binary search. Magic.
* __Hosts switch__ – Radix trie built on `switch`. Comparable to __IPs switch__.
* __Hosts reversed binary__ – binary search on hosts, but hosts are kept in reversed form: _"gro.evichra"_ instead of _"archive.org"_. It shouldn't really affect anything, but it does, maybe because I also use `dnsDomainIs`.

