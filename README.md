# Russian Anti-Censorship on PAC-Scripts

This repo contains:

1. Chrome Extension to bypass censorship in Russia:
[WebStore](https://chrome.google.com/webstore/detail/npgcnondjocldhldegnakemclmfkngch)
| [Sources](https://github.com/ilyaigpetrov/anti-censorship-russia/tree/master/extensions/chromium/minimalistic-pac-setter)
2. Proof of concept PAC-script generator based on https://github.com/zapret-info/z-i
3. PAC-scripts performance analyses of scripts generated
4. Based on the research of step 3 [the final PAC-generator](https://script.google.com/d/1bJhqyXlYem9cyVQwo02EfpsWWg8Ns20FuT4jP7sL_AkS1K_SBgm-V6fH/edit?usp=sharing) was written as a Google App Script in JavaScript which is triggered every two hours to generate and publish [PAC-script on Google Drive](https://drive.google.com/open?id=0B-ZCVSvuNWf0akpCOURNS2VCTmc) ([direct link](https://drive.google.com/uc?export=download&id=0B-ZCVSvuNWf0akpCOURNS2VCTmc)).


## Why I do This

I believe __information mustn't be blocked based on political or other subjective views__.  

My maxim is _"Your freedom ends when it starts to confine the freedom of others"_.

See [my other arguments against censorship (ru)](https://gist.github.com/ilyaigpetrov/9452b93ef3d7dd3d8cc2)

Looking at how Russian government [distorts TV](https://therussianreader.wordpress.com/2015/11/22/russian-truckers-strike-dagestan/) and blocks [critics of Putin](http://www.reuters.com/article/2014/03/13/us-russia-internet-idUSBREA2C21L20140313),
I decided to write an anti-censorship extension for Chromium before they strike me first.
