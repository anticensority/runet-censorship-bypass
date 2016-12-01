'use strict';

{
  const extName = chrome.runtime.getManifest().name;
  const notify = (
      id,
      title,
      message,
      icon = 'default-128.png',
      context = extName
    ) => chrome.notifications.create(
        id,
        {
          title: title,
          message: message,
          contextMessage: context,
          requireInteraction: true,
          type: 'basic',
          iconUrl: './icons/' + icon,
        }
      );

  window.addEventListener('error', (err) => {

    console.warn('Global error');
    notify('Unhandled error', 'Unhandled error', JSON.stringify(err),
      'ext-error-128.png');

  });

  window.addEventListener('unhandledrejection', (event) => {

    console.warn('Unhandled rejection. Throwing error.');
    event.preventDefault();
    throw event.reason;

  });

  chrome.proxy.onProxyError.addListener((details) => {

    console.warn('PAC ERROR:', details);
    notify('pac-error', ' PAC !', JSON.stringify(details),
      'pac-error-128.png' );

  });

  chrome.proxy.settings.onChange.addListener((details) => {

    console.log('Proxy settings changed.', details);
    // const ifOther = details.levelOfControl.startsWith('controlled_by_other');
    notify('Proxy change', 'Proxy changed', JSON.stringify(details),
      'no-control-128.png');

  });

}
