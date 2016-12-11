# [Maintainer Needed! Нужен разработчик!](https://github.com/anticensorship-russia/chromium-extension/issues/2)

Also, if you __unstar__, please, send [us](https://github.com/anticensorship-russia/chromium-extension/issues) a note why you do so.

# Russian Anti-Censorship on PAC-Scripts

This repo contains:

1. Chrome Extension to bypass censorship in Russia:
[WebStore](https://chrome.google.com/webstore/detail/npgcnondjocldhldegnakemclmfkngch)
| [Sources](https://github.com/ilyaigpetrov/anti-censorship-russia/tree/master/extensions/chromium/minimalistic-pac-setter)
2. Proof of concept PAC-script generator based on https://github.com/zapret-info/z-i
3. PAC-scripts performance analyses of scripts generated
4. Based on the research of step 3 [the final PAC-generator][pac-generator] ([Beta][pac-generator-debug]) was written as a Google App Script in JavaScript which is triggered every two hours to generate and publish PAC-script on Google Drive (don't use it without extension, please).

[pac-generator]: https://script.google.com/d/1bJhqyXlYem9cyVQwo02EfpsWWg8Ns20FuT4jP7sL_AkS1K_SBgm-V6fH/edit?usp=sharing
[pac-generator-debug]: https://script.google.com/d/1M8H7rpvZc18hUJz6co3kEckklhSGVyj824p1LYv_CoKcpHDDW8rGcKZV/edit?usp=sharing

## Why I do This

I believe __information mustn't be blocked based on political or other subjective views__.  

My maxim is _"Your freedom ends when it starts to confine the freedom of others"_.

See [my other arguments against censorship (ru)](https://gist.github.com/ilyaigpetrov/9452b93ef3d7dd3d8cc2)

Looking at how Russian government [distorts TV](https://therussianreader.wordpress.com/2015/11/22/russian-truckers-strike-dagestan/) and blocks [critics of Putin](http://www.reuters.com/article/2014/03/13/us-russia-internet-idUSBREA2C21L20140313),
I decided to write an anti-censorship extension for Chromium before they strike me first.

## How it Works

0. PAC script is a JavaScript file, triggered on every URL request, which says browser which proxy to use if any for this particular URL.
1. The Chrome Extension sets PAC script in browser settings and keeps it synced with PAC script on the server (offering one on Google Drive, Antizapret or on Anticenz).
2. On every request PAC script checks if host is blocked OR if it's IP is blocked using `switch(..) {..}` trie-like structure (Google Drive PAC script).  
Antizapret PAC script checks for IPs only with `indexOf`.  
Anticenz PAC script checks for hosts and IPs with `indexOf`, but lacks some IPs.
3. If address is blocked PAC script returns proxy server to the browser: Antizapret, or Anticenz if the first one fails.
4. PAC scripts on servers are updated periodically from https://github.com/zapret-info/z-i
