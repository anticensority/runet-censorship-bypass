'use strict';
/* eslint-env node, mocha */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
describe('PAC provider synchronization', function() {

  it('restores existing proxy settings when a PAC download fails', async function() {

    const templatePath = path.resolve(
        __dirname,
        '../37-sync-pac-script-with-pac-provider-api.tmpl.js',
    );
    const template = fs.readFileSync(templatePath, 'utf8');
    const generatedSource = vm.runInNewContext('`' + template + '`', {
      anticensorityPacUrls: ['https://pac.invalid/proxy.pac'],
    }, {timeout: 5000});
    const initializationStart = generatedSource.indexOf(
        '  // ON EACH LAUNCH, STARTUP, RELOAD, UPDATE, ENABLE',
    );
    assert.notStrictEqual(
        initializationStart,
        -1,
        'the generated source contains its startup block',
    );
    const source = generatedSource.slice(0, initializationStart) + '\n}';

    const originalValue = {
      mode: 'pac_script',
      pacScript: {
        mandatory: false,
        data: 'function FindProxyForURL(){ return "PROXY synthetic.invalid:8080"; }',
      },
    };
    let currentSettings = {
      levelOfControl: 'controlled_by_this_extension',
      value: originalValue,
    };
    const setCalls = [];
    let clearCalls = 0;
    const copySettings = (settings) => {
      const copy = {};
      if (settings.levelOfControl !== undefined) {
        copy.levelOfControl = settings.levelOfControl;
      }
      if (settings.value) {
        copy.value = {mode: settings.value.mode};
        if (settings.value.pacScript) {
          copy.value.pacScript = {
            mandatory: settings.value.pacScript.mandatory,
            data: settings.value.pacScript.data,
          };
        }
      }
      return copy;
    };

    const chrome = {
      i18n: {getMessage: (key) => key === '@@ui_locale' ? 'en-US' : key},
      runtime: {getManifest: () => ({version: '0.0.1.66'})},
      proxy: {settings: {
        get: (_details, callback) => callback(copySettings(currentSettings)),
        clear: (_details, callback) => {
          clearCalls++;
          currentSettings = {
            levelOfControl: 'controllable_by_this_extension',
            value: {mode: 'system'},
          };
          callback();
        },
        set: (details, callback) => {
          setCalls.push(copySettings(details));
          currentSettings = copySettings(details);
          callback();
        },
      }},
    };

    const window = {
      utils: {
        mandatory: () => {
          throw new Error('unexpected missing argument');
        },
        throwIfError: (err) => {
          if (err) {
            throw err;
          }
        },
        chromified: (callback) => (...args) => callback(null, ...args),
        timeouted: (callback) => (...args) => callback(...args),
        fireRequest: (_type, ...args) => args[args.length - 1](),
        areSettingsControlledFor: (settings) =>
          settings.levelOfControl.startsWith('controlled_by_this'),
        getProp: (object, dottedPath) => dottedPath.split('.').reduce(
            (value, key) => value && value[key],
            object,
        ),
        openAndFocus: () => {},
      },
      apis: {
        errorsLib: {
          clarify: (err, message) => Object.assign(
              new Error(message),
              {cause: err},
          ),
          clarifyThen: (message, callback) => (err, ...args) => callback(
              err ? new Error(message) : null,
              ...args,
          ),
          Warning: class Warning {
            constructor(message) {
              this.message = message;
            }
          },
        },
        pacKitchen: {getPacMods: () => ({})},
        errorHandlers: {
          ifControlled: true,
          updateControlState: (callback) => callback(),
          switch: () => {},
        },
        httpLib: {
          get: (_url, callback) => callback(new Error('synthetic download failure')),
        },
      },
    };
    const quietConsole = {
      group: () => {},
      groupEnd: () => {},
      log: () => {},
      warn: () => {},
      error: () => {},
    };

    vm.runInNewContext(source, {window, chrome, console: quietConsole}, {timeout: 5000});
    window.apis.antiCensorRu.pacProviders['Антизапрет'].pacUrls = ['https://pac.invalid/proxy.pac'];

    const outcome = await new Promise((resolve) => {
      window.apis.antiCensorRu.syncWithPacProviderAsync(
          {key: 'Антизапрет'},
          (err) => resolve(err),
      );
    });

    assert(outcome, 'the synthetic PAC download should fail');
    assert.strictEqual(
        clearCalls,
        1,
        'the existing proxy is temporarily cleared for a direct PAC download',
    );
    assert.strictEqual(
        setCalls.length,
        1,
        'the previous proxy settings must be restored after the failed download',
    );
    assert.deepStrictEqual(currentSettings.value, originalValue);
  });

});
