'use strict';

chrome.runtime.getBackgroundPage( (bgWindow) =>
  bgWindow.apis.errorHandlers.installListenersOn(
    window, 'LERR', () => {

      const tbody = document.getElementById('errorsTable');
      const errors = bgWindow.apis.lastNetErrors.get().map(
        ({url, error}, index) => ({ message: error, hostname: new URL(url).hostname, ifChecked: false })
      );

      const renderTbody = () => {

        const exc = bgWindow.apis.pacKitchen.getPacMods().exceptions || {};
        tbody.innerHTML = '';
        if (!errors.length) {
          tbody.innerHTML = '<tr><td colspan="4">Ошибок пока не было.</td></tr>';
          return;
        }
        errors.forEach((err, index) => {

          const ifProxy = exc[err.hostname];
          let style = '';
          if (ifProxy !== undefined) {
            style = `style="color: ${ifProxy ? 'green' : 'red' }"`;
          }
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${index}</td>
            <td ${style}>${err.hostname}</td>
            <td>${err.message}</td>
            <td><input type="checkbox" ${ err.ifChecked ? 'checked' : '' }></td>
          `;
          tr.querySelector('input').onchange = function() {

            errors[index].ifChecked = this.checked;
            return false;

          };
          tbody.appendChild(tr);

        });

      };

      document.getElementById('allBtn').onclick = () => {

        const ifAllChecked = errors.every((err) => err.ifChecked);
        if (ifAllChecked) {
          errors.forEach((err) => { err.ifChecked = false; })
        } else {
          errors.forEach((err) => { err.ifChecked = true; })
        }
        renderTbody();
        return false;

      };

      document.getElementById('addBtn').onclick = () => {

        const mutatedMods = bgWindow.apis.pacKitchen.getPacMods();
        const exc = mutatedMods.exceptions || {};
        mutatedMods.exceptions = errors.reduce((acc, err) => {

          if (err.ifChecked) {
            acc[err.hostname] = true;
          }
          return acc;

        }, exc);
        bgWindow.apis.pacKitchen.keepCookedNowAsync(mutatedMods, (err) => alert(err || 'Сделано!'));

      };

      renderTbody();
      document.documentElement.style.display = '';

    })
);
