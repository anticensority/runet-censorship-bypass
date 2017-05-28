'use strict';

chrome.runtime.getBackgroundPage( (bgWindow) =>
  bgWindow.apis.errorHandlers.installListenersOn(
    window, 'ERRM', async() => {

      const [currentTab] = await new Promise((resolve) =>
        chrome.tabs.query({
          active: true,
          currentWindow: true,
        }, resolve)
      );

      const itemsRoot = document.getElementById('menuItems');
      bgWindow.apis.menus.getItemsAsArray().forEach((item) => {

        const li = document.createElement('li');
        li.innerHTML = `
          <a href>${item.title}</a>
        `;
        li.querySelector('a').href = item.getUrl(currentTab.url);
        itemsRoot.appendChild(li);

      });

      document.documentElement.style.display = 'initial';

    }
  )
);
