'use strict';
/* global Raven:false, hljs:false */
function errorJsonReplacer(key, value) {

  if (!( value && value.constructor
    && ['Error', 'Event'].some(
      (suff) => value.constructor.name.endsWith(suff)
    )
  )) {
    return value;
  }
  const alt = {};

  Object.getOwnPropertyNames(value).forEach(function(key) {
      alt[key] = value[key];
  }, value);

  for(const prop in value) {
    if (/^[A-Z]/.test(prop)) {
      continue;
    }
    alt[prop] = value[prop];
  }

  // fooWindow.ErrorEvent !== barWindow.ErrorEvent
  if (value.constructor.name === 'ErrorEvent') {
    for(const circularProp of
      [  // First line are circular props.
        'target', 'srcElement', 'path', 'currentTarget',
        'bubbles', 'cancelBubble', 'cancelable', 'composed',
        'defaultPrevented', 'eventPhase', 'isTrusted', 'returnValue',
        'timeStamp']) {
      delete alt[circularProp];
    }
  }

  return alt;

}

chrome.runtime.getBackgroundPage( (bgPage) =>
  bgPage.apis.errorHandlers.installListenersOn(window, 'ErrView', () => {

    Raven.config('https://bc534321358f455b9ae861740c2d3af8@sentry.io/116007', {
      release: chrome.runtime.getManifest().version,
      autoBreadcrumbs: false,
    }).install();

    const originalComment = document.querySelector('#comment').value.trim();
    let json;
    let err;
    {
      const output = document.getElementById('output');
      const errId = window.location.hash.slice(1);
      const idToErr = bgPage.apis.errorHandlers.idToErr;
      err = errId && idToErr[errId] || idToErr;
      if (!Object.keys(err).length) {
        output.innerHTML = 'Ошибок не найдено. ' +
          'Оставьте, пожалуйста, подробный комментарий.';
      } else {
        json = JSON.stringify(err, errorJsonReplacer, 2);
        output.innerHTML = hljs.highlight('json', json).value;
      }
    }

    document.addEventListener('ravenSuccess', () => alert('Готово'));
    document.addEventListener('ravenFailure',
      () => alert('Ошибка sentry.io! (подробности недоступны)'));

    document.getElementById('raven-report').onclick = () => {

      const e = err.error || err;
      let comment = document.getElementById('comment').value.trim();
      if (comment === originalComment) {
        comment = '';
      }
      if (!comment && !json) {
        return alert('Посылать нечего, так как вы не оставили комментария.');
      }
      const extra = json && JSON.parse(json) || {};
      if (comment) {
        extra.comment = comment;
      }
      Raven.captureException(e, {
        extra: extra,
        onSuccess: () => alert('Готово'),
        onError: (err) => {

          throw err;

        },
      });

    };

    document.getElementById('github-search').onclick = () => {

      const title = err.message || err;
      chrome.tabs.create({
        url: 'https://rebrand.ly/ac-search-issues?q=' + encodeURIComponent(title),
      });

    };
    document.getElementById('github-report').onclick = () => {

      const comment = document.getElementById('comment').value;
      const title = err.message || err;
      const body = (comment || 'Ваш текст') + `

### Ошибка

\`\`\`json
${json}
\`\`\`

Версия: ${chrome.runtime.getManifest().version}
`;
      chrome.tabs.create({
        url: `https://rebrand.ly/ac-new-issue?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`,
      });

    };

    document.querySelector('main').style.display = '';
    document.body.style.background =
        'linear-gradient(to bottom, black ' +
        document.querySelector('textarea').offsetTop +
        'px, transparent)';

  })
);
