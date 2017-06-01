'use strict';

{

  const chromified = window.utils.chromified;

  let seqId = 0;

  const createMenuLinkEntry = (title, tab2url) => {

    const id = (++seqId).toString();

    chrome.contextMenus.create({
      id: id,
      title: title,
      contexts: ['browser_action'],
    }, chromified((err) => {

      if(err) {
        console.warn('Context menu error ignored:', err);
      }

    }));

    chrome.contextMenus.onClicked.addListener((info, tab) => {

      if(info.menuItemId === id) {
        Promise.resolve( tab2url( tab ) )
          .then( (url) => chrome.tabs.create({url: url}) );
      }

    });

  };

  window.apis.menus.getItemsAsArray().forEach((item) => {

    createMenuLinkEntry(
      item.title,
      (tab) => item.getUrl(tab.url)
    );

  });

}
