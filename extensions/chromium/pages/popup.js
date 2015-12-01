chrome.runtime.getBackgroundPage(
  background => {
    var RKN = background.RKN;

    var switchButton = document.querySelector('#switch-button');
    var switchText = document.querySelector('#switch-button-text');
    var updateButton = document.querySelector('#update-button');
    var updateText = document.querySelector('#update-button-text');

    var renderSwitchButton = () => switchText.innerText = RKN.ifEnabled ? 'Отключить' : 'Включить';
    renderSwitchButton();
    switchButton.onclick = () => {
      switchText.innerText = 'Ждите...';
      RKN.switch( renderSwitchButton );
    };
    updateButton.onclick = () => {
      updateText.innerText = 'Ждите...';
      RKN.checkForUpdates( () => {updateText.innerText = new Date(RKN.lastUpdate).toLocaleTimeString() } );
    };
  }
);
