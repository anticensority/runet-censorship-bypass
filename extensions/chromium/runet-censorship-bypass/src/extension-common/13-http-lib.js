'use strict';

{

  const mandatory = window.utils.mandatory;
  const errorsLib = window.apis.errorsLib;

  const checkCon = 'Что-то не так с сетью, проверьте соединение.';

  window.apis.httpLib = {

    ifModifiedSince(
      url,
      lastModified,
      cb = mandatory()
    ) {

      if (url.startsWith('data:')) {
        return cb(null, false);
      }
      const wasModifiedIn1970 = new Date(0).toUTCString();
      const notModifiedCode = 304;
      fetch(url, {
        method: 'HEAD',
        headers: new Headers({
          'If-Modified-Since': lastModified,
        }),
      }).then(
        (res) => {
          cb(
            null,
            res.status === notModifiedCode ?
              false :
              (res.headers.get('Last-Modified') || wasModifiedIn1970)
          );
        },
        errorsLib.clarifyThen(checkCon, (err) => cb(err, wasModifiedIn1970))
      );

    },

    get(url, cb = mandatory()) {

      const start = Date.now();
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
                cb
              );

            };

          const status = res.status;
          if ( !( status >= 200 && status < 300 || status === 304 ) ) {
            return textCb(
              errorsLib.clarify(
                res,
                'Получен ответ с неудачным HTTP-кодом ' + status + '.'
              )
            );
          }

          console.log('GETed with success:', url.substr(0, 100), Date.now() - start);
          textCb();

        },
        errorsLib.clarifyThen(checkCon, cb)
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
        errorsLib.clarifyThen(checkCon, cb)
      );

    },

  };

}
