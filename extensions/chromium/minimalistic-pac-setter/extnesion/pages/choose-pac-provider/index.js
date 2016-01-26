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

  // DATE

  var dateForUser = 'неизвестно';
  if( antiCensorRu.lastPacUpdateStamp ) {
    var diff = Date.now() - antiCensorRu.lastPacUpdateStamp;
    var units = ' мс'
    var gauges = [
      [1000, ' с'],
      [60, ' мин'],
      [60, ' ч'],
      [24, ' дн'],
      [7, ' недель'],
      [4, ' месяцев'],
      [12, ' г']
    ];
    for(var g of gauges) {
      var diffy = Math.floor(diff / g[0]);
      if (!diffy)
        break;
      diff = diffy;
      var units = g[1];
    }
    dateForUser = diff + units + ' назад';
  }

  var dateElement = document.querySelector('.update-date');
  dateElement.innerText = dateForUser;
  dateElement.title = new Date(antiCensorRu.lastPacUpdateStamp).toLocaleString('ru-RU');

  // CLOSE

  document.querySelector('.close-button').onclick = () => window.close();

  // RADIOS

  var currentRadio = () => {
    var id = antiCensorRu.currentPacProviderKey || 'none';
    return document.querySelector('#'+id);
  }
  var checkChosenProvider = () => {
    var radio = currentRadio();
    radio.checked = true;
  }
  var triggerChosenProvider = () => {
    var event = document.createEvent('HTMLEvents');
    event.initEvent('change', false, true);
    currentRadio().dispatchEvent(event);
  }

  var ul = document.querySelector('#list-of-providers');
  var _firstChild = ul.firstChild;
  for( var providerKey of Object.keys(antiCensorRu.pacProviders) ) {
    var li = document.createElement('li');
    li.innerHTML = '<input type="radio" name="pacProvider" id="'+providerKey+'"> <label for="'+providerKey+'">'+providerKey+'</label> <a href class="link-button">[обновить]</a>';
    li.querySelector('.link-button').onclick = () => {triggerChosenProvider(); return false;};
    ul.insertBefore( li, _firstChild );
  }

  var radios = [].slice.apply( document.querySelectorAll('[name=pacProvider]') );
  for(var radio of radios) {
    radio.onchange = function(event) {
      var pacKey = event.target.id;
      if (pacKey === 'none')
        return antiCensorRu.clearPac();

      function enableDisableInputs() {
        var inputs = document.querySelectorAll('input');
        console.log(inputs.length);
        for (var i = 0; i < inputs.length; i++)
          inputs[i].disabled = !inputs[i].disabled;
      }

      enableDisableInputs();
      setStatusTo('Установка...');
      antiCensorRu.installPac(pacKey, () => {
        setStatusTo('PAC-скрипт установлен.');
        enableDisableInputs();
      });
    }
  }

  setStatusTo('');
  checkChosenProvider();
  if (antiCensorRu.ifNotInstalled)
    triggerChosenProvider();

});
