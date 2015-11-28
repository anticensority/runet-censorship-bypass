# Антизапрет PAC-скрипт

![Host Lookup Chart: Time-Memory, Hits-Misses](./chart/host-lookup-chart.png)

* __IPs indexOf__ – Blocked IP is search by `indexOf`
* __IPs binary__  – Blocked IP is search by binary search. For some reason miss time slightly increased.
* __IPs switch__  – Simply `switch(Blocked_IP) { case1: ... caseN: return true }`. Works even better than binary search. Magic.
* __Hosts switch__ – Radix trie built on `switch`. Comparable to __IPs switch__.
