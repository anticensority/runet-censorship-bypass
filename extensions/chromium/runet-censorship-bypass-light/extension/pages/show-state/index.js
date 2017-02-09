'use strict';

chrome.runtime.getBackgroundPage( (backgroundPage) => {

  const state = backgroundPage.state;

  if( state.ifNotControllable ) {
    document.getElementById('which-extension').innerHTML = backgroundPage.whichExtensionHtml;
    document.documentElement.classList.add('if-not-controlled');
  }

  if ( state.lastError) {

    const err = ['message', 'stack', 'name'].reduce((acc, prop) => {

      acc[prop] = state.lastError[prop];
      return acc;

    }, {});
    document.getElementById('last-error').innerHTML = JSON.stringify(err);
    document.documentElement.classList.add('if-error');

  }

  const setStatusTo = (msg) => {
    document.getElementById('status').innerHTML = msg;
  };

  if(localStorage.onOff === 'on') {
    document.getElementById('pac-on').checked = true;
  } else {
    document.getElementById('pac-off').checked = true;
  }
  document.getElementById('pac-switch').onclick = function(event) {

    if(event.target.tagName !== 'INPUT') {
      return true;
    }
    setStatusTo('Ждите...');
    const cb = () => {

      event.target.checked = true;
      setStatusTo('Готово!');

    };
    if (event.target.id === 'pac-on') {
      backgroundPage.switchPac('on', cb);
    } else {
      backgroundPage.switchPac('off', cb);
    }
    return false;

  };

  // CLOSE BUTTON

  document.querySelector('.close-button').onclick = () => window.close();

  document.documentElement.style.display = '';

});
