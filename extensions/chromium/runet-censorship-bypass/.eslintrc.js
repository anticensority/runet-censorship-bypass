module.exports = {
  extends: ['eslint:recommended', 'airbnb'],
    env: {
      browser: true,
      webextensions: true,
      es6: true
    },
    globals: {
      chrome: true
    },
    parserOptions: {
      sourceType: 'script',
      ecmaVersion: 2017,
      ecmaFeatures: {
        impliedStrict: false
      }
    },
    rules: {
      strict: ['error', 'global'],
      'no-console': 'off',
      'padded-blocks': 'off',
      'require-jsdoc': 'off',
      'no-multi-assign': 'off',
      'arrow-parens': ['error', 'always'],
      'no-plusplus': 'off',
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      }],
      /* Taken from airbnb:
      'max-len': ['error', 100, 2, {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      }],*/
    },
};
