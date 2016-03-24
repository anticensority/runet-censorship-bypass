'use strict';
chrome.runtime.getBackgroundPage( backgroundPage => {
  
  var hostname = window.location.search.substring(1);

  backgroundPage.getIpsAndCnames( hostname, (err, records) =>
    err
      ? document.write(
          `<title>IP уже нет</title>
          Не могу получить IP для домена "${hostname}". Домена уже нет?<br/>
          Ошибка:<br/>
          ${err.clarification && err.clarification.message || err.message}`
        )
      : records.length === 1 && records[0].type === 'A'
        ? window.location.replace( backgroundPage.reestrUrl + records[0].rdata )
        : document.write(
              '<title>Выбор IP</title>'
            + '<h4>У домена несколько IP / синонимов:</h4>'
            + records
              .sort( (a,b) => a.rdata.localeCompare(b.rdata) )
              .map( ans => ans.rdata.link( ans.type === 'A' ? backgroundPage.reestrUrl + ans.rdata : window.location.pathname +'?'+ ans.rdata ) )
              .join('<br/>')
          )
  )

})