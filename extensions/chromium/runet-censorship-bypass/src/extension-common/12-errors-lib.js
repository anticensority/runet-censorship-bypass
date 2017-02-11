'use strict';
/*
 *  Error Library
 *  PURPOSE 1:
 *    Allow wrapping errors with clarifications when they bubble up.
 *  Why:
 *    Sometimes low level errors may bubble up through a chain of callbacks.
 *    And when they reach top level of a user they loose context and convey
 *    nonsense like "Error 404: Can't find file".
 *    -- What file? WTH, I just hit update button?!
 *  PURPOSE 2:
 *    Supply separate class for warnings.
 *  Why:
 *    Some callbacks expect warnings which are like non-fatal errors.
 *    I want Warnings and FooError to be distinctable by code readers,
 *    so I create separate class for warnings.
**/
{

  const mandatory = window.utils.mandatory;

  const self = window.apis.errorsLib = {

    // I don't use Error class, because we don't need stack here.
    Warning: class {

      constructor(message = mandatory()) {

        this.message = message;

      }

    },

    clarify: function(err, message = mandatory(), {data} = {}) {

      if (!err) {
        return err;
      }
      const warn = new self.Warning(message);
      warn.wrapped = err;
      if (data) {
        warn.data = data;
      }
      return warn;

    },

    clarifyThen: function(message, cb = mandatory()) {

      return (err, ...args) => cb( self.clarify(err, message), ...args );

    },

  };

}
