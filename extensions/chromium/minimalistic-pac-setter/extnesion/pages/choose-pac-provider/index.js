'use strict';

renderPage();

function renderPage() {
  console.log('Rendering started.');

  function getStatus() {
    return document.querySelector('#status');
  }

  function setStatusTo(msg) {
    var status = getStatus();
    if (msg) {
      status.classList.remove('off');
      status.innerHTML = msg;
    } else
      status.classList.add('off');
  }

  chrome.runtime.getBackgroundPage( backgroundPage => {

    var antiCensorRu = backgroundPage.antiCensorRu;

    // SET DATE

    function setDate() {
      var dateForUser = 'никогда';
      if( antiCensorRu.lastPacUpdateStamp ) {
        var diff = Date.now() - antiCensorRu.lastPacUpdateStamp;
        var units = ' мс';
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
    }

    setDate();
    chrome.storage.onChanged.addListener( setDate );

    // CLOSE BUTTON

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
      li.innerHTML = '<input type="radio" name="pacProvider" id="'+providerKey+'"> <label for="'+providerKey+'">'+providerKey+'</label> <a href class="link-button checked-radio-panel">[обновить]</a>';
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
        antiCensorRu.installPac(pacKey, err => {
          if (err) {
            var ifNotCritical = err.clarification && err.clarification.ifNotCritical;

            var message = '';
            var clarification = err.clarification;
            do {
              message = message +' '+ (clarification && clarification.message || err.message || '');
              clarification = clarification.prev;
            } while( clarification && clarification.prev );
            message = message.trim();

            message = '<span style="font-size: 0.9em; color: darkred">'+ message +'</span>';
            var label = ifNotCritical ? 'Некритичная ошибка.' : 'Ошибка!';
            label = '<span style="color:red">'+ label +'</span>';
            setStatusTo(
              label +'<br/>'+ message +' <a href class="link-button">[Ещё подробнее]</a>'
            );
            var btn = getStatus().querySelector('.link-button');
            btn.onclick = function() {
              var div = document.createElement('div');
              div.innerHTML = '\
Более подробную информацию можно узнать из логов фоновой страницы:<br/>\
<a href class="ext">chrome://extensions</a> › Это расширение › Отладка страниц: фоновая страница › Console (DevTools)';
              getStatus().replaceChild(div, this);
              div.querySelector('.ext').onclick = () => {
                chrome.tabs.create({ url: "chrome://extensions" });
                return false;
              }
              return false;
            };
          } else
            setStatusTo('PAC-скрипт установлен.');
          enableDisableInputs();
        });
      }
    }

    setStatusTo('');
    checkChosenProvider();
    if (antiCensorRu.ifFirstInstall)
      triggerChosenProvider();

  });

}
