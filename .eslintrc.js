module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': 'off',
    'global-require': 'off',
    'arrow-parens': ['error', 'always'],
    'class-methods-use-this': 'off',
    'object-curly-newline': ['error', { multiline: true, consistent: true }],
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'prettier/prettier': 'error',
    'prefer-template': 'error',
  },
};
