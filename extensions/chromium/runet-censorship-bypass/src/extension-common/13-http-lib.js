'use strict';

{

  const mandatory = window.utils.mandatory;
  const errorsLib = window.apis.errorsLib;

  const checkCon = 'Что-то не так с сетью, проверьте соединение.';

  window.apis.httpLib = {

    ifModifiedSince(
      url,
      cacheImprints,
      cb = mandatory(),
    ) {

      if (!cacheImprints.eTag && !cacheImprints.lastModifiedStr) {
        throw new TypeError('No cacheImprints provided!');
      }
      if (url.startsWith('data:')) {
        return cb(null, false);
      }
      const notModifiedCode = 304;
      fetch(url, {
        method: 'HEAD',
        headers: new Headers(
          cacheImprints.eTag
            ? {'If-None-Match': cacheImprints.eTag}
            : {'If-Modified-Since': cacheImprints.lastModifiedStr},
        ),
      }).then(
        (res) => {

          const eTag = res.headers.get('ETag');
          const lastModifiedStr = res.headers.get('Last-Modified');
          const newCacheImprints = (eTag || lastModifiedStr) ? { eTag, lastModifiedStr } : undefined;
          cb(
            null,
            res.status === notModifiedCode
              ? undefined
              : newCacheImprints,
          );
        },
        errorsLib.clarifyThen(checkCon, (err) => cb(err)),
      );

    },

    get(url, cb = mandatory()) {

      const start = Date.now();
      // 'no-store' disables cache completely, we handle caching manually instead.
      fetch(url, {cache: 'no-store'}).then(
        (res) => {

          const textCb =
            (err) => {

              console.log('Reading response as text...');
              res.text().then(
                (text) => {
                  console.log('Calling CB...');
                  cb(err, text);
                },
                cb,
              );

            };

          const status = res.status;
          if ( !( status >= 200 && status < 300 || status === 304 ) ) {
            return textCb(
              errorsLib.clarify(
                res,
                'Получен ответ с неудачным HTTP-кодом ' + status + '.',
              ),
            );
          }

          console.log('GETed with success:', url, Date.now() - start);
          textCb();

        },
        errorsLib.clarifyThen(checkCon, cb),
      );

    },

    head(url, cb = mandatory()) {

      const start = Date.now();
      fetch(url, {cache: 'no-store', method: 'HEAD'}).then(
        (res) => {

          const status = res.status;
          if ( !( status >= 200 && status < 300 || status === 304 ) ) {
            return cb(
              errorsLib.clarify(
                res,
                'Получен ответ с неудачным HTTP-кодом ' + status + '.'
              )
            );
          }

          console.log('HEADed with success:', url, Date.now() - start);
          cb();

        },
        errorsLib.clarifyThen(checkCon, cb),
      );

    },

  };

}
