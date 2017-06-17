'use strict';

const gulp = require('gulp');
const del = require('del');
const through = require('through2');
const PluginError = require('gulp-util').PluginError;
const changed = require('gulp-changed');

const PluginName = 'Template literals';

const templatePlugin = (context) => through.obj(function(file, encoding, cb) {

  const tjson = '.tmpl.json';
  if (file.path.endsWith(tjson)) {

    const originalPath = file.path;
    file.path = file.path.replace(new RegExp(`${tjson}$`), '.json');

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

gulp.task('default', ['build']);

gulp.task('clean', function(cb) {

  //return del.sync('./build');
  return cb();

});

const contexts = require('./src/templates-data').contexts;

const excFolder = (name) => [`!./src/**/${name}`, `!./src/**/${name}/**/*`];
const excluded = [ ...excFolder('test') , ...excFolder('node_modules'), ...excFolder('src') ];
const commonWoTests = ['./src/extension-common/**/*', ...excluded];

const miniDst = './build/extension-mini';
const fullDst = './build/extension-full';

gulp.task('_cp-common', ['clean'], function(cb) {

  let fins = 0;
  const intheend = () => {
    if (++fins === 2) {
      cb();
    }
  };

  gulp.src(commonWoTests)
    .pipe(changed(miniDst))
    .pipe(templatePlugin(contexts.mini))
    .pipe(gulp.dest(miniDst))
    .on('end', intheend);

  gulp.src(commonWoTests)
    .pipe(changed(fullDst))
    .pipe(templatePlugin(contexts.full))
    .pipe(gulp.dest(fullDst))
    .on('end', intheend);

});

gulp.task('_cp-mini', ['_cp-common'], function(cb) {

  gulp.src(['./src/extension-mini/**/*', ...excluded])
    .pipe(changed(miniDst))
    .pipe(templatePlugin(contexts.mini))
    .pipe(gulp.dest(miniDst))
    .on('end', cb);
});

gulp.task('_cp-full', ['_cp-common'], function(cb) {

  gulp.src(['./src/extension-full/**/*', ...excluded])
    .pipe(changed(fullDst))
    .pipe(templatePlugin(contexts.full))
    .pipe(gulp.dest(fullDst))
    .on('end', cb);

});

gulp.task('build:prod', ['_cp-mini', '_cp-full']);
gulp.task('build', ['_cp-full']);
