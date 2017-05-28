'use strict';

/*
window.chrome.browserAction.setBadgeBackgroundColor({
  color: '#db4b2f',
});
*/

chrome.webNavigation.onErrorOccurred.addListener((details) => {

  const tabId = details.tabId;
  if (!(tabId > 0)) {
    alert(tabId);
    return;
  }

  //console.log('SETTING 2', details.tabId);
  chrome.browserAction.setPopup({
    tabId,
    popup: './pages/on-error-menu/index.html',
  });

  /*
  window.chrome.browserAction.setBadgeBackgroundColor({
    tabId,
    color: '#09f911',
  });
  */

  chrome.browserAction.setBadgeText({
    tabId,
    text: '●●●',
  });

});

