'use strict';

var url = decodeURIComponent(window.location.search.substring(1));
document.body.innerHTML = `
  <input type="text" value="${url}" autofocus style="width: 100%; border: 0; outline: none; font-size: 2em"/>
  <button>Копировать</button>
  <h3>Веб-прокси</h3>
    <a href="https://www.vpnbook.com/webproxy">vpnbook [COPY]</a><br/>
    <a href="https://webproxy.com/browse.php?u=${url}">webproxy.com</a><br/>
    <a href="http://buka.link/browse.php?u=${url.replace(/\?.+/,'')}">buka.link [AVAST]</a><br/>
    <a href="https://hide.me/en/proxy">hide.me [COPY]</a><br/>
    <a href="https://www.hidemyass.com/proxy">Hide my ass [COPY]</a><br/>
    <a href="https://www.google.com/search?q=webproxy">Другие</a>
  <h3>Из кеша поисковиков</h3>
    <a href="https://webcache.googleusercontent.com/search?q=cache:${url}">Google</a></br>
    <a href="http://viewcached.com/${url}">viewcached.com</a></br>
    <a href="http://cachedview.com">cachedview.com [COPY]</a>
  <h3>Из архивов Интернета</h3>
    <a href="http://web.archive.org/web/*/${url}">web.archive.org</a><br/>
    <a href="http://archive.is/${url}">archive.is</a><br/>
    <a href="http://timetravel.mementoweb.org">Momento Time Travel [COPY]</a>
`;
var _ = document.querySelector('input');
_.onfocus = function() { this.select() };
document.querySelector('button').onclick = () => {_.focus(); document.execCommand('copy')};