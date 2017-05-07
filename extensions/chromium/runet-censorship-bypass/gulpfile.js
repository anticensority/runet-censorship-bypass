'use strict';

const gulp = require('gulp');
const del = require('del');
const through = require('through2');
const PluginError = require('gulp-util').PluginError;

const PluginName = 'Template literals';

const templatePlugin = (context) => through.obj(function(file, encoding, cb) {

  const tjson = '.tmpl.json';
  if (file.path.endsWith(tjson)) {

    const originalPath = file.path;
    file.path = file.path.replace(new RegExp(`${tjson}$`), '.json');

    if (file.isStream()) {
      return cb(new PluginError(PluginName, 'Streams not supported!'));
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

gulp.task('clean', function() {

  return del.sync('./build');

});

const contexts = require('./src/templates-data').contexts;

const woTests = ['!./src/**/test', '!./src/**/test/**/*'];
const srcWoTests = ['./src/extension-common/**/*', ...woTests];

gulp.task('_cp-common', ['clean'], function() {

  gulp.src(srcWoTests)
    .pipe(templatePlugin(contexts.mini))
    .pipe(gulp.dest('./build/extension-mini'))

  gulp.src(srcWoTests)
    .pipe(templatePlugin(contexts.full))
    .pipe(gulp.dest('./build/extension-full'));

});

gulp.task('_cp-mini', ['_cp-common'], function() {

  gulp.src(['./src/extension-mini/**/*', ...woTests])
    .pipe(templatePlugin(contexts.mini))
    .pipe(gulp.dest('./build/extension-mini'));

});

gulp.task('_cp-full', ['_cp-common'], function() {

  gulp.src(['./src/extension-full/**/*', ...woTests])
    .pipe(templatePlugin(contexts.full))
    .pipe(gulp.dest('./build/extension-full'));

});

gulp.task('build', ['_cp-mini', '_cp-full']);
