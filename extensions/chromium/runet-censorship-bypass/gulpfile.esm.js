import gulp from 'gulp';
import del from 'del';
import through from 'through2';
import PluginError from 'plugin-error';

import {contexts} from './src/templates-data';

const PluginName = 'Template literals';

const templatePlugin = (context) => through.obj(function(file, encoding, cb) {

  const suffixes = ['.tmpl.json', 'tmpl.js', 'tmpl.mjs', 'tmpl.html'];
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

      }, {keys: [], values: []});
      try {
        file.contents = Buffer.from(
            (new Function(...keys, 'return `' + String(file.contents) + '`;'))(...values),
        );
      } catch (e) {
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

const excFolder = (name) => [`!./src/**/${name}`, `!./src/**/${name}/**/*`];
const excluded = [...excFolder('test'), ...excFolder('node_modules'), ...excFolder('src')];

const miniDst = './build/extension-mini';
const fullDst = './build/extension-full';

const commonSrc = './src/extension-common/**/*';
const miniSrc = './src/extension-mini/**/*';
const fullSrc = './src/extension-full/**/*';

const joinSrc = (...args) => [...args, ...excluded];

const copyMini = function(cb) {

  gulp.src(joinSrc(commonSrc, miniSrc))
      .pipe(templatePlugin(contexts.mini))
      .pipe(gulp.dest(miniDst))
      .on('end', cb);
};

const copyFull = function(cb) {

  gulp.src(joinSrc(commonSrc, fullSrc))
      .pipe(templatePlugin(contexts.full))
      .pipe(gulp.dest(fullDst))
      .on('end', cb);

};

const buildAll = gulp.series(clean, gulp.parallel(copyMini, copyFull));
export {
  buildAll as default,
  buildAll,
};
