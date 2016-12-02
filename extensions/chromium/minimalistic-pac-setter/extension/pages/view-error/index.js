'use strict';

function errorJsonReplacer(key, value) {

  if ( !['Error', 'ErrorEvent'].includes( value.constructor.name ) ) {
    return value;
  }
  const alt = {};

  Object.getOwnPropertyNames(value).forEach(function (key) {
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

chrome.runtime.getBackgroundPage( (backgroundPage) =>
  backgroundPage.apis.errorHandlers.installListenersOn(window, 'ErrView', () => {

    Raven.config('https://bc534321358f455b9ae861740c2d3af8@sentry.io/116007', {
      release: chrome.runtime.getManifest().version,
      autoBreadcrumbs: false,
    }).install();

    const errId = window.location.hash.slice(1);
    const err = backgroundPage.apis.errorHandlers.idToErr[errId];
    const json = JSON.stringify(err, errorJsonReplacer, 2);
    document.getElementById('output').innerHTML = hljs.highlight('json', json).value;

    document.addEventListener('ravenSuccess', () => alert('Готово'));
    document.addEventListener('ravenFailure', () => alert('Ошибка sentry.io! (подробности недоступны)'));

    document.getElementById('raven-report').onclick = () => {

      const e = err.error || err;
      const extra = JSON.parse(json);
      const comment = document.getElementById('comment').value;
      if (comment.trim()) {
        extra.comment = comment;
      }
      Raven.captureException(e, {
        extra: extra,
        onSuccess: () => alert('Готово'),
        onError: (err) => { throw err; }
      });

    };

    document.getElementById('github-search').onclick = () => {

      const title = err.message || err;
      chrome.tabs.create({
        active: true,
        url: 'https://rebrand.ly/ac-search-issues?q=' + encodeURIComponent(title)
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
        active: true,
        url: `https://rebrand.ly/ac-new-issue?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`
      });

    };

  })
);
