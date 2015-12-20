function setStatusTo(msg) {
  var status = document.querySelector('#status');
  if (msg) {
    status.classList.remove('off');
    status.innerHTML = msg;
  } else
    status.classList.add('off');
}

chrome.runtime.getBackgroundPage( backgroundPage => {

  var antiCensorRu = backgroundPage.antiCensorRu;

  var ul = document.querySelector('#list-of-providers');
  var _firstChild = ul.firstChild;
  for(var providerKey of Object.keys(antiCensorRu.pacProviders)) {
    var li = document.createElement('li');
    li.innerHTML = '<input type="radio" name="pacProvider" id="'+providerKey+'"> <label for="'+providerKey+'">'+providerKey+'</label>';
    ul.insertBefore( li, _firstChild );
  }

  var checkChosenProvider = () => {
    var id = antiCensorRu.currentPacProviderKey || 'none';
    var checkedRadio = document.querySelector('#'+id);
    checkedRadio.checked = true;
    var event = document.createEvent('HTMLEvents');
    event.initEvent('change', false, true);
    checkedRadio.dispatchEvent(event);
  }

  checkChosenProvider();
  setStatusTo('');

  var radios = [].slice.apply( document.querySelectorAll('[name=pacProvider]') );
  for(var radio of radios) {
    radio.onchange = function(event) {
      setStatusTo('');
      var pacKey = event.target.id;
      if (pacKey === 'none')
        return antiCensorRu.clearPac( () => window && window.close() );
      setStatusTo('Установка...');
      antiCensorRu.installPac(pacKey, () => { setStatusTo('PAC-скрипт установлен.'); if(window) window.close(); });
    }
  }

});
