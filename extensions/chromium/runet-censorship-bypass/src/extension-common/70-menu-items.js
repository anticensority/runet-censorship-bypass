'use strict';

{

  window.apis.menus = {

    getItemsAsObject: () => ({

      hostTracker: {
        title: 'Сайт доступен из-за границы? Is up?',
        getUrl: (blockedUrl) => `data:text/html;charset=utf8,<title>Запрашиваю...</title>
                <form class='tracker-form' method='POST'
                  action='https://www.host-tracker.com/ru/InstantCheck/Create'>
                <input name='InstantCheckUrl' value='${new URL(blockedUrl).hostname}'
                  type='hidden'>
                </form>
                <script>document.querySelector('.tracker-form').submit()<\/script>`,
        order: 0,
      },

      antizapretInfo: {
        title: 'Сайт в реестре блокировок?',
        getUrl: (blockedUrl) => 'https://antizapret.info/index.php?search=' + new URL(blockedUrl).hostname,
        order: 1,
      },

      archiveOrg: {
        title: 'Из архива archive.org',
        getUrl: (blockedUrl) => 'https://web.archive.org/web/*/' + blockedUrl,
        order: 2,
      },

      googleTranslate: {
        title: 'Через Google Translate',
        getUrl: (blockedUrl) => (
          'https://translate.google.com/translate?hl=&sl=en&tl=ru&anno=2&sandbox=1&u=' + blockedUrl),
        order: 3,
      },

      otherUnblock: {
        title: 'Разблокировать по-другому',
        getUrl: (blockedUrl) => ('https://rebrand.ly/ac-unblock#' + blockedUrl),
        order: 4,
      },

      support: {
        title: 'Документация / Помощь / Поддержка',
        getUrl: (blockedUrl) => 'https://rebrand.ly/ac-support',
        order: 99,
      },

    }),

    getItemsAsArray: function() {

      const itemsObj = this.getItemsAsObject();
      return Object.keys(itemsObj).reduce((acc, key) => {

        acc.push(itemsObj[key]);
        return acc;

      }, [])
        .sort((a, b) => a.order - b.order);

    },

  };

}
