'use strict';

// Shows user PageAction icon if any part of the current site is being blocked and proxied.

function getHostname(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.hostname;
}

function updateTitle(requestDetails, cb) {

  chrome.pageAction.getTitle(
    { tabId: requestDetails.tabId },
    title => {

      var ifTitleSetAlready = /\n/.test(title);
      var proxyHost = window.antiCensorRu.pacProvider.proxyIps[ requestDetails.ip ];
      var hostname = getHostname(requestDetails.url);
      var ifShouldUpdateTitle = false;
      var indent = '  ';
      var proxyTitle = 'Прокси:';

      // Initially title equals extension name.
      if (!ifTitleSetAlready) {
        title = 'Разблокированы:\n'+ indent + hostname +'\n'+ proxyTitle +'\n'+ indent + proxyHost;
        ifShouldUpdateTitle = true;
        
        function setIcon(iconOpts) {
          iconOpts.tabId = requestDetails.tabId;
          chrome.pageAction.setIcon(iconOpts);
          chrome.pageAction.show(requestDetails.tabId);
        }
        var iconPath = '/icons/ribbon32.png';
        
        if (requestDetails.type === 'main_frame')
          setIcon({path: iconPath});
        else {
          var canvas = document.createElement('canvas');
          var iconSize = 19;
          canvas.width = canvas.height = iconSize;
          var img = document.createElement('img');
          img.onload = () => {
            var context = canvas.getContext('2d');
            context.drawImage(img, 0, 0, iconSize, iconSize);
            var badgeText = '%';

            context.fillStyle = 'red';
            context.fillRect(0, 9, context.measureText(badgeText).width + 1, iconSize);

            context.fillStyle = 'white';
            context.font = '11px Arial';
            context.fillText('%', 0, iconSize - 1);
            
            setIcon({imageData: context.getImageData(0, 0, iconSize, iconSize)})            
          };
          img.src = iconPath;
        }
      } else {
        var hostsProxiesPair = title.split(proxyTitle);

        if (hostsProxiesPair[1].indexOf(proxyHost) === -1) {
          title = title.replace(hostsProxiesPair[1], hostsProxiesPair[1] +'\n'+ indent + proxyHost);
          ifShouldUpdateTitle = true;
        }

        if (hostsProxiesPair[0].indexOf(hostname) === -1) {
          title = title.replace(proxyTitle, indent + hostname +'\n'+ proxyTitle);
          ifShouldUpdateTitle = true;
        }
      }

      if (ifShouldUpdateTitle)
        chrome.pageAction.setTitle({
          title: title,
          tabId: requestDetails.tabId
        });

      return cb();
    }
  )
}

var previousUpdateTitleFinished = Promise.resolve();
/*
  previousUpdateTitleFinished works like a semaphor for updateTitle().
  What? Semaphor? In JavaScript? Are you kidding?
  
  Look at this:
    
    function getTitle(cb) {
      chrome.pageAction.getTitle(
        { tabId: details.tabId },
        cb
      );      
    }
    
    function setTitle(title) {
      console.log(title);
      chrome.pageAction.setTitle({
        title: title +' new!',
        tabId: details.tabId
      });
      chrome.pageAction.show(details.tabId);
    }
    
    var updateTitle = (details, cb) => {
      //var ID = parseInt(Math.random()*100);
      //console.log(ID, 'START');
      getTitle( title => {
        setTitle(title);
        cb && cb(title);
        //console.log(ID, 'FINISH');
      });
    }
    updateTitle(details);
  
  Load some massive page.
  The logs will be:
  
    FooBar Extension
    (6) FooBar Extension new!
    (2) FooBar Extension new! new!
    FooBar Extension new! new! new!
    FooBar Extension new! new! new! new!

  Notice the (6) and (2) denoting the number of repeated log messages.
  Uncommenting logs reveals that START->FINISH pairs are messed.
  However, if getTitle is called strictly after setTitle, we are ok:
  
    previousUpdateTitleFinished = previousUpdateTitleFinished.then(
      () => new Promise( resolve => updateTitle( details, resolve ) )
    );
  
  Well, I hope it works, because once I caught a bug.
**/

function blockInform(details) {
  
  if (details.tabId !== -1 && window.antiCensorRu.pacProvider && window.antiCensorRu.pacProvider.proxyIps && window.antiCensorRu.pacProvider.proxyIps[ details.ip ]) {

    previousUpdateTitleFinished = previousUpdateTitleFinished.then(
      () => new Promise( resolve => updateTitle( details, resolve ) )
    );

  }

}

chrome.webRequest.onCompleted.addListener(
  blockInform,
  { urls: ['<all_urls>'] }
);

chrome.webRequest.onErrorOccurred.addListener(
  blockInform,
  { urls: ['<all_urls>'] }
);
