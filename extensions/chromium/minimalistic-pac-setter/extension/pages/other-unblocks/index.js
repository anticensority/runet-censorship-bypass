'use strict';

const url = decodeURIComponent(window.location.search.substring(1));
document.body.innerHTML = `
  <input type="text" value="${url}" autofocus style="width: 100%; border: 0; outline: none; font-size: 2em"/>
  <button>Копировать</button>
  <h3>Веб-прокси</h3>
    <a href="https://www.vpnbook.com/webproxy">vpnbook [COPY]</a><br/>
    <a href="https://webproxy.com/browse.php?u=${url}">webproxy.com [COPY]</a><br/>
    <a href="http://buka.link/browse.php?u=${url.replace(/\?.+/,'')}">buka.link [AVAST, COPY]</a><br/>
    <a href="https://hide.me/en/proxy">hide.me [COPY]</a><br/>
    <a href="https://www.hidemyass.com/proxy">Hide my ass [COPY]</a><br/>
    <a href="http://usafastproxy.com">USA Fast Proxy [COPY, HTTP, GLYPE]</a><br/>
    <a href="http://www.mysafesurfing.com">My Safe Surfing [COPY, HTTP, GLYPE]</a><br/>
    <a href="https://www.google.com/search?q=webproxy">Другие</a>
  <h3>Из кэша поисковиков</h3>
    <a href="https://webcache.googleusercontent.com/search?q=cache:${url}">Google</a></br>
    <a href="http://viewcached.com/${url}">viewcached.com</a></br>
    <a href="http://cachedview.com">cachedview.com [COPY]</a>
  <h3>Из архивов Интернета</h3>
    <a href="http://web.archive.org/web/*/${url}">web.archive.org</a><br/>
    <a href="http://archive.is/${url}">archive.is</a><br/>
    <a href="http://timetravel.mementoweb.org">Momento Time Travel [COPY]</a>
  <h3>Снимки страниц</h3>
    <a href="https://screenshotmachine.com">Screenshot Machine [COPY]</a><br/>
    <a href="https://www.url2png.com">url2png [COPY]</a><br/>
    <a href="http://site2pic.com/">site2pic [COPY]</a><br/>
    <a href="https://browshot.com">brow shot [COPY]</a>
  <h3>Инструменты</h3>
    <a href="http://isup.me/${url}">Сайт доступен из-за границы? isup.me</a><br/>
    <a href='
			data:text/html;charset=utf8,<title>Запрашиваю...</title>
	    <form method="POST" action="https://www.host-tracker.com/ru/InstantCheck/Create">
  	    <input name="InstantCheckUrl" value="${url}" type="hidden">
	    </form>
  	  <script>document.forms[0].submit()</script>
		'>Сайт доступен из-за границы? host-tracker</a>
`;

const _ = document.querySelector('input');
_.onfocus = function() { this.select() };
document.querySelector('button').onclick = () => {_.focus(); document.execCommand('copy')};
