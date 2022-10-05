console.log('Shimming for mv3...');

if (!chrome.browserAction) {
  chrome.browserAction = chrome.action;
}
