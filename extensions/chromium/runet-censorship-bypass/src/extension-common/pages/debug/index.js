'use strict';

chrome.runtime.getBackgroundPage((bgWin) => {

  const setStatusTo = (msg) => document.getElementById('status').innerHTML = msg;

  const red = (text) => '<span style="color: red">' + text + '</span>';

  const editor = window.ace.edit('editor');
  editor.getSession().setOptions({
    mode: 'ace/mode/javascript',
    useSoftTabs: true,
  });

  bgWin.chrome.proxy.settings.onChange.addListener(
    (details) => setStatusTo(red( details.levelOfControl + '!') )
  );

  function _read() {

    bgWin.chrome.proxy.settings.get({}, (details) => {

      let control = details.levelOfControl;
      if (control.startsWith('controlled_by_other')) {
        control = red(control);
      }
      setStatusTo(control);
      const pac = details.value.pacScript;
      const data = pac && pac.data || 'PAC скрипт не установлен.';
      editor.setValue( data );

    });

  }

  document.querySelector('#read-button').onclick = _read;

  document.querySelector('#save-button').onclick = () => {

    const config = {
      mode: 'pac_script',
      pacScript: {
        mandatory: false,
        data: editor.getValue(),
      },
    };
    bgWin.chrome.proxy.settings.set( {value: config}, () => alert('Saved!') );

  };

  document.querySelector('#clear-button').onclick = () => {

    bgWin.chrome.proxy.settings.clear({}, () => {

      alert('Cleared! Reading...');
      _read();

    });

  };

})
