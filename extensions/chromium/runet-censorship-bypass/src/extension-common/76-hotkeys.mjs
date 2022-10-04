'use strict';

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-pac-script') {
    console.log("Toggling PAC-script!");
  }
});
