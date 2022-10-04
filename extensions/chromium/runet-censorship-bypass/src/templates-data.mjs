const pacUrls = [
  // GitHub.io (anticensority), cached:
  'https://anticensority.github.io/generated-pac-scripts/anticensority.pac',
  // GitHub repo (anticensority), cached:
  'https://raw.githubusercontent.com/anticensority/generated-pac-scripts/master/anticensority.pac',
  // First official, shortened, not cached:
  'https://rebrand.ly/ac-chrome-anticensority-pac',
];

const commonContext = {
  version: '1.57',
  anticensorityPacUrls: [
    ...pacUrls,
  ],
};

const contexts = {};

const extraPermissions = ', "webRequest", "webRequestBlocking", "webNavigation"';

contexts.full = Object.assign({}, commonContext, {
  versionSuffix: '',
  nameSuffixEn: '',
  nameSuffixRu: '',
  extraPermissions,
  persistent: '',
  scripts_0x: '',
  scripts_2x: "import './20-ip-to-host-api.mjs';",
  scripts_8x: `
    import './80-error-menu.mjs';
    import './83-last-errors.mjs';
    import './85-block-informer.mjs';
  `,
});

contexts.mini = Object.assign({}, commonContext, {
  versionSuffix: '-mini',
  nameSuffixEn: ' MINI',
  nameSuffixRu: ' МИНИ',
  extraPermissions: '',
  persistent: '"persistent": false,',
  scripts_0x: '',
  scripts_2x: "import '20-for-mini-only.mjs';",
  scripts_8x: '',
});

export {contexts};
