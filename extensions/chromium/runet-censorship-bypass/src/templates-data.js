'use strict';

const commonContext = {
  version: '1.4',
  anticensorityPacUrls: [
    // First official, shortened:
    'https://rebrand.ly/ac-chrome-anticensority-pac',
    // Second official, Cloud Flare with caching:
    'https://anticensority.tk/generated-pac-scripts/anticensority.pac',
    // GitHub.io (anticensority):
    '\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x6e\x74\x69\x63\x65\x6e\x73\x6f\x72\x69\x74\x79\x2e\x67\x69\x74\x68\x75\x62\x2e\x69\x6f\x2f\x67\x65\x6e\x65\x72\x61\x74\x65\x64\x2d\x70\x61\x63\x2d\x73\x63\x72\x69\x70\x74\x73\x2f\x61\x6e\x74\x69\x63\x65\x6e\x73\x6f\x72\x69\x74\x79\x2e\x70\x61\x63',
    // GitHub repo (anticensority):
    '\x68\x74\x74\x70\x73\x3a\x2f\x2f\x72\x61\x77\x2e\x67\x69\x74\x68\x75\x62\x75\x73\x65\x72\x63\x6f\x6e\x74\x65\x6e\x74\x2e\x63\x6f\x6d\x2f\x61\x6e\x74\x69\x63\x65\x6e\x73\x6f\x72\x69\x74\x79\x2f\x67\x65\x6e\x65\x72\x61\x74\x65\x64\x2d\x70\x61\x63\x2d\x73\x63\x72\x69\x70\x74\x73\x2f\x6d\x61\x73\x74\x65\x72\x2f\x61\x6e\x74\x69\x63\x65\x6e\x73\x6f\x72\x69\x74\x79\x2e\x70\x61\x63',
    // Old, deprecated:
    'https://anticensorship-russia.tk/generated-pac-scripts/anticensority.pac',
    // Google Drive (0.17, anticensority):
    '\x68\x74\x74\x70\x73\x3a\x2f\x2f\x64\x72\x69\x76\x65\x2e\x67\x6f\x6f\x67\x6c\x65\x2e\x63\x6f\x6d\x2f\x75\x63\x3f\x65\x78\x70\x6f\x72\x74\x3d\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x26\x69\x64\x3d\x30\x42\x32\x6d\x68\x42\x67\x46\x6e\x66\x34\x70\x45\x4c\x56\x6c\x47\x4e\x54\x42\x45\x4d\x58\x4e\x6d\x52\x58\x63',
  ]
};

exports.contexts = {};

exports.contexts.full = Object.assign({}, commonContext, {
  versionSuffix: '',
  nameSuffixEn: '',
  nameSuffixRu: '',
  extra_permissions: ', "webRequest", "webNavigation"',
  persistent: '',
  scripts_2x: ', "20-ip-to-host-api.js"',
  scripts_8x: ', "80-error-menu.js", "83-last-errors.js", "85-block-informer.js"',
});

exports.contexts.mini = Object.assign({}, commonContext, {
  versionSuffix: '-mini',
  nameSuffixEn: ' MINI',
  nameSuffixRu: ' МИНИ',
  extra_permissions: '',
  persistent: '"persistent": false,',
  scripts_2x: ', "20-for-mini-only.js"',
  scripts_8x: '',
});

exports.contexts.beta = Object.assign({}, commonContext, {
  anticensorityPacUrls: ['https://rebrand.ly/ac-beta-pac'],
  version: '1.5',
  versionSuffix: '',
  nameSuffixEn: ' FOR TESTING',
  nameSuffixRu: ' ДЛЯ ТЕСТОВ',
  extra_permissions: ', "webRequest", "webNavigation"',
  persistent: '',
  scripts_2x: ', "20-ip-to-host-api.js"',
  scripts_8x: ', "80-error-menu.js", "83-last-errors.js", "85-block-informer.js"',
});
