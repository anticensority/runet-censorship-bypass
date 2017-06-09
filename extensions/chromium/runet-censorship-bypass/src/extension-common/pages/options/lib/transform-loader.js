'use strict';

const loaderUtils = require('loader-utils');
const concat = require('concat-stream');

module.exports = function(content) {

  const cb = this.async();
  const Readable = require('stream').Readable;
  const src = new Readable();
  src._read = function noop() {};
  src.push(content);
  src.push(null);

  const opts = loaderUtils.getOptions(this) || {};
  const readme = Object.keys(opts).reduce((readable, moduleName) => {

    const newStream = require(moduleName)(/* No filename. */);
    return readable.pipe(newStream);

  }, src);
  readme.pipe(concat ((buf) => cb(null, buf.toString()) ));

};
