module.exports = {
  extends: ['airbnb-base', 'prettier', 'prettier/standard', 'plugin:chai-friendly/recommended'],
  parser: 'babel-eslint',
  plugins: ['prettier', 'chai-friendly'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['', '.json', '.js', '.jsx'],
        moduleDirectory: ['src', 'node_modules'],
      },
    },
  },
  ignorePatterns: ['*conf.js'],
  rules: {
    'no-use-before-define': 'off',
    'no-await-in-loop': 'off',
    'no-underscore-dangle': 'off',
    'global-require': 'off',
    'arrow-parens': ['error', 'always'],
    'class-methods-use-this': 'off',
    'valid-jsdoc': [2, { requireReturn: false }],
    'object-curly-newline': ['error', { multiline: true, consistent: true }],
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'prettier/prettier': 'error',
  },
};
