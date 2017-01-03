'use strict';

chrome.runtime.getBackgroundPage( (backgroundPage) => {

  const state = backgroundPage.state;

  if( state.ifNotControlled ) {
    document.getElementById('which-extension').innerHTML
      = backgroundPage.utils.messages.whichExtensionHtml();
    document.querySelectorAll('.if-not-controlled').forEach( (node) => {

      node.style.display = 'block';

    });
  }

  if (state.lastError) {

    document.querySelectorAll('.if-error').forEach( (node) => {

      node.style.display = 'block';

    });
    document.getElementById('last-error').innerHTML = state.lastError;
  }

  document.documentElement.style.display = '';

  // CLOSE BUTTON

  document.querySelector('.close-button').onclick = () => window.close();

});
