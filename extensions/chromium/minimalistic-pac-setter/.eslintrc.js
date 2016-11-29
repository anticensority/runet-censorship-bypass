module.exports = {
    "extends": ["eslint:recommended", "google"],
    "plugins": [
      //"hapi"
    ],
    "env": {
      "browser": true,
      "webextensions": true,
      "es6": true
    },
    "globals": {
      "chrome": true
    },
    "parserOptions": {
      "sourceType": "script",
      "ecmaFeatures": {
        "impliedStrict": false
      }
    },
    "rules": {
      "strict": ["error", "global"],
      "no-console": "off",
      "padded-blocks": "off",
      "require-jsdoc": "off"
      //"hapi/hapi-scope-start": ["warn"]
    }
};
