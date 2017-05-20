'use strict';

chrome.runtime.getBackgroundPage( (backgroundPage) =>
  backgroundPage.apis.errorHandlers.installListenersOn(
    window, 'EXC', () => {

      const editor = document.getElementById('editor');
      const loadBtn = document.getElementById('load');
      const saveBtn = document.getElementById('save');
      const status = document.getElementById('status');

      loadBtn.onclick = function() {

        const mods = backgroundPage.apis.pacKitchen.getPacMods();
        editor.value = `# Комментарии начинаются с # и действуют до конца строки.
# Комментарии НЕ сохраняются!
# Сначала идёт список проксируемых сайтов,
# затем ==== на отдельной строке,
# затем исключённые сайты, отсортированные с конца строки.

# ПРОКСИРОВАТЬ:

${(mods.included || []).join('\n')}

===============================
# НЕ ПРОКСИРОВАТЬ:

${(mods.excluded || []).join('\n')}`;

        status.innerText = 'Успешно загружено!';

      };
      loadBtn.click();

      saveBtn.onclick = function() {

        let [proxyList, dontProxyList] = editor.value
          .trim()
          .replace(/#.*/g, '')
          .split(/=+/g)
          .map( (listStr) => listStr
            .trim()
            .split(/(?:\s*\r?\n\s*)+/g)
            .filter((host) => host)
          )
        dontProxyList = dontProxyList || [];

        const exceptions = {};
        proxyList.forEach((host) => (exceptions[host] = true));
        dontProxyList.forEach((host) => (exceptions[host] = false));
        const mods = backgroundPage.apis.pacKitchen.getPacMods();
        mods.exceptions = exceptions;
        backgroundPage.apis.pacKitchen.keepCookedNowAsync(mods, (err) => {
          if (!err) {
            status.innerText = 'Успешно сохранено!';
            loadBtn.click();
          } else {
            status.innerText = '<em>ОШИБКА:</em>' + err;
          }
        });

      };

      editor.oninput = () => (status.innerText = 'Вы держитесь там!');

      document.documentElement.style.display = 'initial';

    })
);
