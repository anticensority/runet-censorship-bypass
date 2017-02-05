module.exports = {
    "extends": ["airbnb"],
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
      "ecmaVersion": 2017,
      "ecmaFeatures": {
        "impliedStrict": false
      }
    },
    "rules": {
      "strict": ["error", "global"],
      "no-console": "off",
      "padded-blocks": "off",
      "require-jsdoc": "off"
    }
};
