'use strict';

chrome.runtime.getBackgroundPage( (backgroundPage) =>
  backgroundPage.apis.errorHandlers.installListenersOn(
    window, 'EXC', () => {

      const editor = document.getElementById('editor');
      const mods = backgroundPage.apis.pacKitchen.getPacMods();
      editor.innerText = `# Комментарии начинаются с # и действуют до конца строки.
# Сначала идёт список проксируемых сайтов,
# затем ---- на отдельной строке,
# затем исключённые сайты.

# ПРОКСИРОВАТЬ:

${mods.included.join('\n')}

-----------------------------
# НЕ ПРОКСИРОВАТЬ:

${mods.excluded.join('\n')}`;

    })
);
