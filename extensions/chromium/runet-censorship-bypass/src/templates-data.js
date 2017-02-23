'use strict';

const commonContext = {
  version: '0.21',
};

exports.contexts = {};

exports.contexts.full = Object.assign({}, commonContext, {
  versionSuffix: '',
  nameSuffixEn: '',
  nameSuffixRu: '',
  extra_permissions: ', "webRequest"',
  scripts_2x: ', "20-ip-to-host-api.js"',
  scripts_7x: ', "70-block-informer.js"',
});

exports.contexts.mini = Object.assign({}, commonContext, {
  versionSuffix: '-mini',
  nameSuffixEn: ' MINI',
  nameSuffixRu: ' МИНИ',
  extra_permissions: '',
  scripts_2x: ', "20-for-mini-only.js"',
  scripts_7x: '',
});

