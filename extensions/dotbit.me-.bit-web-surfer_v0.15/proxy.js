function sleep(milliseconds, bithost) {
	// synchronous XMLHttpRequests from Chrome extensions are not blocking event handlers. That's why we use this
	// pretty little sleep function to try to get the IP of a .bit domain before the request times out.
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if (((new Date().getTime() - start) > milliseconds) || (sessionStorage.getItem(bithost) != null)){
			break;
		}
	}
}

// run script when a request is about to occur
chrome.webRequest.onBeforeRequest.addListener(function (details) {
	// get the parts of the url (hostname, port) by creating an 'a' element
	var parser = document.createElement('a');
	parser.href = details.url;
	var tld = parser.hostname.slice(-3);
	if (tld != 'bit') {
		// if this domain is not a .bit domain, exit
		return;
	} else {
		var bithost = parser.hostname;
		var port = (parser.protocol == "https:" ? "443" : "80");
		var access = (parser.protocol == "https:" ? "HTTPS" : "PROXY");
		// this is a .bit domain, first check local cache if this domain exists
		if (sessionStorage.getItem(bithost) == undefined) {
			// This .bit domain is not in cache, get the IP from dotbit.me
			var xhr = new XMLHttpRequest();
			var url = "https://dotbit.me/a/"+bithost;
			// synchronous XMLHttpRequest is actually asynchronous
			// check out https://developer.chrome.com/extensions/webRequest
			xhr.open("GET", url, false);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					var bitip = xhr.responseText;
					var config = {
						mode: "pac_script",
						pacScript: {
							data: "function FindProxyForURL(url, host) {\n" +
							"  if (dnsDomainIs(host, '"+bithost+"'))\n" +
							"    return '"+access+" "+bitip+":"+port+"';\n" +
							"  return 'DIRECT';\n" +
							"}"
						}
					};
					chrome.proxy.settings.set({value: config, scope: 'regular'},function() {
						console.log('Got IP from server. Config is changed: '+JSON.stringify(config));
					});
					// store the IP for .bit hostname in the local cache which is reset on each browser restart
					sessionStorage.setItem(bithost, bitip);
				}
			}
			xhr.send();
			// block the request until the new proxy settings are set. Block for up to two seconds.
			sleep(2000, bithost);
		} else {
			var bitip = sessionStorage.getItem(bithost);
			var config = {
				mode: "pac_script",
				pacScript: {
					data: "function FindProxyForURL(url, host) {\n" +
					"  if (dnsDomainIs(host, '"+bithost+"'))\n" +
					"    return '"+access+" "+bitip+":"+port+"';\n" +
					"  return 'DIRECT';\n" +
					"}"
				}
			};
			chrome.proxy.settings.get({'incognito': false},function(oldconfig) {
				if (oldconfig["value"]["pacScript"] == undefined) {
					chrome.proxy.settings.set({value: config, scope: 'regular'},function() {});
					console.log('IP '+bitip+' already cached for '+bithost+', Config is changed: '+JSON.stringify(config));
				} else {
					if (oldconfig["value"]["pacScript"]["data"] == config["pacScript"]["data"]) {
						// console.log('IP '+bitip+' already cached for '+bithost+', config is unchanged');
					} else {
						chrome.proxy.settings.set({value: config, scope: 'regular'},function() {});
						console.log('IP '+bitip+' already cached for '+bithost+', Config is changed: '+JSON.stringify(config));
					}
				}	
			});
		}
	}
}, { urls: ["<all_urls>"] }, ["blocking"]);
