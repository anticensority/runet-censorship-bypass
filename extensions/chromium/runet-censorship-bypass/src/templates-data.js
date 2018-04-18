'use strict';

const pacUrls = [
  // GitHub.io (anticensority), cached:
  '\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x6e\x74\x69\x63\x65\x6e\x73\x6f\x72\x69\x74\x79\x2e\x67\x69\x74\x68\x75\x62\x2e\x69\x6f\x2f\x67\x65\x6e\x65\x72\x61\x74\x65\x64\x2d\x70\x61\x63\x2d\x73\x63\x72\x69\x70\x74\x73\x2f\x61\x6e\x74\x69\x63\x65\x6e\x73\x6f\x72\x69\x74\x79\x2e\x70\x61\x63',
  // GitHub repo (anticensority), cached:
  '\x68\x74\x74\x70\x73\x3a\x2f\x2f\x72\x61\x77\x2e\x67\x69\x74\x68\x75\x62\x75\x73\x65\x72\x63\x6f\x6e\x74\x65\x6e\x74\x2e\x63\x6f\x6d\x2f\x61\x6e\x74\x69\x63\x65\x6e\x73\x6f\x72\x69\x74\x79\x2f\x67\x65\x6e\x65\x72\x61\x74\x65\x64\x2d\x70\x61\x63\x2d\x73\x63\x72\x69\x70\x74\x73\x2f\x6d\x61\x73\x74\x65\x72\x2f\x61\x6e\x74\x69\x63\x65\x6e\x73\x6f\x72\x69\x74\x79\x2e\x70\x61\x63',
  // First official, shortened, not cached:
  'https://rebrand.ly/ac-chrome-anticensority-pac',
  // Old, deprecated:
  'https://anticensorship-russia.tk/generated-pac-scripts/anticensority.pac',
];

const commonContext = {
  version: '1.21',
  anticensorityPacUrls: [
    ...pacUrls,
  ],
};

exports.contexts = {};

const  extra_permissions = ', "webRequest", "webRequestBlocking", "webNavigation"';

exports.contexts.full = Object.assign({}, commonContext, {
  versionSuffix: '',
  nameSuffixEn: '',
  nameSuffixRu: '',
  extra_permissions,
  persistent: '',
  scripts_0x: '',
  scripts_2x: ', "20-ip-to-host-api.js"',
  scripts_8x: ', "80-error-menu.js", "83-last-errors.js", "85-block-informer.js"',
});

exports.contexts.mini = Object.assign({}, commonContext, {
  versionSuffix: '-mini',
  nameSuffixEn: ' MINI',
  nameSuffixRu: ' МИНИ',
  extra_permissions: '',
  persistent: '"persistent": false,',
  scripts_0x: '',
  scripts_2x: ', "20-for-mini-only.js"',
  scripts_8x: '',
});

exports.contexts.firefox = Object.assign({}, commonContext, {
  versionSuffix: '',
  nameSuffixEn: '',
  nameSuffixRu: '',
  extra_permissions,
  persistent: '',
  scripts_0x: ', "01-chrome-proxy-settings.js"',
  scripts_2x: ', "20-ip-to-host-api.js"',
  scripts_8x: ', "80-error-menu.js", "83-last-errors.js", "85-block-informer.js"',
});

exports.contexts.beta = Object.assign({}, commonContext, {
  anticensorityPacUrls: [
    'https://rebrand.ly/ac-beta-pac',
    ...pacUrls,
  ],
  version: '1.14',
  versionSuffix: '',
  nameSuffixEn: ' FOR TESTING',
  nameSuffixRu: ' ДЛЯ ТЕСТОВ',
  extra_permissions,
  persistent: '',
  scripts_0x: '',
  scripts_2x: ', "20-ip-to-host-api.js"',
  scripts_8x: ', "80-error-menu.js", "83-last-errors.js", "85-block-informer.js"',
});
