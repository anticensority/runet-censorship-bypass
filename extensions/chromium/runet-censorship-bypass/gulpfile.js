'use strict';

const gulp = require('gulp');
const del = require('del');
const through = require('through2');
const PluginError = require('plugin-error');
const changed = require('gulp-changed');

const PluginName = 'Template literals';

const templatePlugin = (context) => through.obj(function(file, encoding, cb) {

  const suffixes = ['.tmpl.json', 'tmpl.js'];
  if ( suffixes.some( (suff) => file.path.endsWith(suff) ) ) {

    const originalPath = file.path;
    file.path = file.path.replace(new RegExp(`tmpl.([^.]+)$`), '$1');

    if (file.isStream()) {
      return cb(new PluginError(PluginName, 'Streams are not supported!'));
    } else if (file.isBuffer()) {

      const {keys, values} = Object.keys(context).reduce( (acc, key) => {

        const value = context[key];
        acc.keys.push(key);
        acc.values.push(value);
        return acc;

      }, { keys: [], values: [] });
      try {
        file.contents = Buffer.from(
          (new Function(...keys, 'return `' + String(file.contents) + '`;'))(...values)
        );
      } catch(e) {
        e.message += '\nIN FILE: ' + originalPath;
        return cb(new PluginError(PluginName, e));
      }
    }

  }
  cb(null, file);

});


const clean = function(cb) {

  del.sync('./build');
  return cb();

};

const contexts = require('./src/templates-data').contexts;

const excFolder = (name) => [`!./src/**/${name}`, `!./src/**/${name}/**/*`];
const excluded = [ ...excFolder('test') , ...excFolder('node_modules'), ...excFolder('src') ];

const miniDst = './build/extension-mini';
const fullDst = './build/extension-full';
const betaDst = './build/extension-beta';
const firefoxDst = './build/extension-firefox';

const commonSrc = './src/extension-common/**/*';;
const miniSrc = './src/extension-mini/**/*';
const fullSrc = './src/extension-full/**/*';
const firefoxSrc = './src/extension-firefox/**/*';

const joinSrc = (...args) => [...args, ...excluded];

const copyMini = function(cb) {

  gulp.src(joinSrc(commonSrc, miniSrc))
    //.pipe(changed(miniDst))
    .pipe(templatePlugin(contexts.mini))
    .pipe(gulp.dest(miniDst))
    .on('end', cb);
};

const copyFull = function(cb) {

  gulp.src(joinSrc(commonSrc, fullSrc))
    //.pipe(changed(fullDst))
    .pipe(templatePlugin(contexts.full))
    .pipe(gulp.dest(fullDst))
    .on('end', cb);

};

const copyBeta = function(cb) {

    gulp.src(joinSrc(commonSrc, fullSrc))
    //.pipe(changed(fullDst))
    .pipe(templatePlugin(contexts.beta))
    .pipe(gulp.dest(betaDst))
    .on('end', cb);

};

const buildAll = gulp.series(clean, gulp.parallel(copyMini, copyFull, copyBeta));
const buildBeta = copyBeta;

module.exports = {
  default: buildAll,
  buildAll,
  buildBeta,
};
