# Anti-Censorship Solution based on PAC-Script

## Censorship in Russia

Censorship in Russia plagues the Freedoms of
[Information](https://en.wikipedia.org/wiki/Freedom_of_information) and [Speech](https://en.wikipedia.org/wiki/Freedom_of_speech),
slowly building analogue of [China Golden Shield](https://en.wikipedia.org/wiki/Golden_Shield_Project).  

For good or bad, it blocks
[Main Kampf](https://en.wikipedia.org/wiki/Mein_Kampf),
[lolicon](https://en.wikipedia.org/wiki/Lolicon) (rearly distinguishing from hentai) and
[critics of Putin](http://www.reuters.com/article/2014/03/13/us-russia-internet-idUSBREA2C21L20140313).

Looking at how Russian government [distorts TV](https://therussianreader.wordpress.com/2015/11/22/russian-truckers-strike-dagestan/) and blocks Internet, I decided to write an Anti-Censorship extension for Chomium.

I believe the freedom of information is a virtue and important __information mustn't be blocked based on political or other subjective views__.

## Technical Titbits

```javascript
if (Is_subdomain_of( host, blocked_hosts ))
  return 'use proxy';
```

You have to make `Is_subdomain_of` very fast.  
This check is executed on each request. You should watch memeory consumption too.

The naive solution is to keep array of blocked ips and check if the host resolves to one of the ips.  
You may do it with `indexOf`, binary search, etc.  
The shortcoming of every ip solution is that some providers resolve blocked hosts to wrong ips, so we eventually need list of hosts.

I have tested different solutions, and depicted [results](./Benchmark/Output.txt) in the following chart:

![Host Lookup Chart: Time-Memory, Hits-Misses](./chart/host-lookup-chart.png)

* __IPs indexOf__ – Blocked IP is search by `indexOf`
* __IPs binary__  – Blocked IP is search by binary search. For some reason miss time slightly increased.
* __IPs switch__  – Simply `switch(Blocked_IP) { case1: ... caseN: return true }`. Works even better than binary search. Magic.
* __Hosts switch__ – Radix trie built on `switch`. Comparable to __IPs switch__.
