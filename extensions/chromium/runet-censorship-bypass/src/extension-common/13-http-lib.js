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

      const wasModified = new Date(0).toUTCString();
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
              (res.headers.get('Last-Modified') || wasModified)
          );
        },
        errorsLib.clarifyThen(checkCon, (err) => cb(err, wasModified))
      );

    },

    get(url, cb = mandatory()) {

      const start = Date.now();
      fetch(url, { cache: 'no-store' }).then(
        (res) => {

          const textCb =
            (err) => {

              res.text().then(
                (text) => cb(err, text),
                cb
              );

            };

          const status = res.status;
          if (!((status >= 200 && status < 300) || status === 304)) {
            return textCb(
              errorsLib.clarify(
                res,
                `Получен ответ с неудачным HTTP-кодом ${status}.`
              )
            );
          }

          console.log('GETed with success:', url, Date.now() - start);
          return textCb();

        },
        errorsLib.clarifyThen(checkCon, cb)
      );

    },

  };

}
