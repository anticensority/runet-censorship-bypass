'use strict';

const commonContext = {
  version: '1.1',
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

