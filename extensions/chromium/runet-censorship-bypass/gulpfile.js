'use strict';

const gulp = require('gulp');
const del = require('del');
const through = require('through2');
const PluginError = require('gulp-util').PluginError;

const PluginName = 'Template literals';

const templatePlugin = (context) => through.obj(function(file, encoding, cb) {

  const tjson = '.tmpl.json';
  if (file.path.endsWith(tjson)) {

    file.path = file.path.replace(new RegExp(`${tjson}$`), '.json');

    if (file.isStream()) {
      return cb(new PluginError(PluginName, 'Streams not supported!'));
    } else if (file.isBuffer()) {

      const stringsContext = new Proxy(context, {
        get: function(target, prop) {
          return target[prop] || '';
        },
      });

      try {
        file.contents = new Buffer(
          (new Function('ctx', 'return `' + String(file.contents) + '`;'))(stringsContext)
        );
      } catch(e) {
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

const commonContext = {
  version: '0.19',
};

const contextMini = Object.assign({
  nameSuffixEn: ' MINI',
  nameSuffixRu: ' МИНИ',
}, commonContext);

gulp.task('_cp-common', ['clean'], function() {

  gulp.src(['./src/extension-common/**/*'])
    .pipe(templatePlugin(contextMini))
    .pipe(gulp.dest('./build/extension-mini'))

  gulp.src(['./src/extension-common/**/*'])
    .pipe(templatePlugin(commonContext))
    .pipe(gulp.dest('./build/extension-full'));

});

gulp.task('_cp-mini', ['_cp-common'], function() {

  gulp.src(['./src/extension-mini/**/*'])
    .pipe(templatePlugin(contextMini))
    .pipe(gulp.dest('./build/extension-mini'));

});

gulp.task('_cp-full', ['_cp-common'], function() {

  gulp.src(['./src/extension-full/**/*'])
    .pipe(templatePlugin(commonContext))
    .pipe(gulp.dest('./build/extension-full'));

});

gulp.task('build', ['_cp-mini', '_cp-full']);
