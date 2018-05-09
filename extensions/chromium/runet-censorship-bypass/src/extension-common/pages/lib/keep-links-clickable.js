'use strict';
/*
In popup links are not clickable at all, fix it.
On other pages "chrome://" links are not clickable, fix it.
Use only if really required because of performance penalty.
*/
{

  const target = document.documentElement;

  const updateLinks = () => {

    const links = document.querySelectorAll('a:not([href=""])');
    for (let i = 0; i < links.length; i++) {
      const ln = links[i];
      const location = ln.href;
      ln.onclick = function() {

        chrome.tabs.create({active: this.dataset.inBg === "false", url: location});
        return false;

      };
    }

  };

  new MutationObserver( updateLinks )
    .observe(target, {
      attributes: true,
      subtree: true,
      childList: true,
      characterData: false,
    });

  document.addEventListener('DOMContentLoaded', updateLinks);

}
