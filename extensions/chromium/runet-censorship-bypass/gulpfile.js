'use strict';

const gulp = require('gulp');
const del = require('del');
const through = require('through2');
const PluginError = require('gulp-util').PluginError;
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
        file.contents = new Buffer(
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

gulp.task('default', ['build:beta']);

gulp.task('clean', function(cb) {

  //return del.sync('./build');
  return cb();

});

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

gulp.task('_cp-mini', function(cb) {

  gulp.src(joinSrc(commonSrc, miniSrc))
    //.pipe(changed(miniDst))
    .pipe(templatePlugin(contexts.mini))
    .pipe(gulp.dest(miniDst))
    .on('end', cb);
});

gulp.task('_cp-full', function(cb) {

  gulp.src(joinSrc(commonSrc, fullSrc))
    //.pipe(changed(fullDst))
    .pipe(templatePlugin(contexts.full))
    .pipe(gulp.dest(fullDst))
    .on('end', cb);

});

gulp.task('_cp-firefox', function(cb) {

    gulp.src(joinSrc(commonSrc, fullSrc, firefoxSrc))
    //.pipe(changed(fullDst))
    .pipe(templatePlugin(contexts.firefox))
    .pipe(gulp.dest(firefoxDst))
    .on('end', cb);

});

gulp.task('_cp-beta', function(cb) {

    gulp.src(joinSrc(commonSrc, fullSrc))
    //.pipe(changed(fullDst))
    .pipe(templatePlugin(contexts.beta))
    .pipe(gulp.dest(betaDst))
    .on('end', cb);

});

gulp.task('build:all', ['_cp-mini', '_cp-full', '_cp-beta', '_cp-firefox']);
gulp.task('build:beta', ['_cp-beta']);
gulp.task('build:firefox', ['_cp-firefox']);
