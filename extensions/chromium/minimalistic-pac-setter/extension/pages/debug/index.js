'use strict';

const setStatusTo = (msg) => document.getElementById('status').innerHTML = msg;

const red = (text) => '<span style="color: red">' + text + '</span>';

const editor = ace.edit('editor');
editor.getSession().setOptions({
  mode: "ace/mode/javascript",
  useSoftTabs: true
});

chrome.proxy.settings.onChange.addListener( (details) => setStatusTo(red( details.levelOfControl + '!') ) );

document.querySelector('#read-button').onclick = () => {

  chrome.proxy.settings.get({}, (details) => {

    let control = details.levelOfControl;
    if (control.startsWith('controlled_by_other')) {
      control = red(control);
    }
    setStatusTo(control);
    console.log(details);
    const pac = details.value.pacScript;
    const data = pac && pac.data || 'PAC скрипт не установлен.';
    editor.setValue( data );

  });

};

document.querySelector('#save-button').onclick = () => {

  const config = {
    mode: 'pac_script',
    pacScript: {
      mandatory: false,
      data: editor.getValue()
    }
  };
  chrome.proxy.settings.set( {value: config}, () => alert('Saved!') );

};

