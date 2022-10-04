module.exports = {
  extends: ['eslint:recommended', 'google'],
    env: {
      node: true,
      browser: true,
      worker: true,
      webextensions: true,
      es2022: true,
    },
    globals: {
      chrome: true,
    },
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 2022,
    },
    rules: {
      strict: ['error', 'global'],
      'no-console': 'off',
      'padded-blocks': 'off',
      'require-jsdoc': 'off',

      // Taken from airbnb:
      'max-len': ['error', 100, 2, {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      }],
    },
};
