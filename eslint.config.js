const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const globals = require('globals');

module.exports = tseslint.config(
  {
    ignores: ['public/assets/'],
  },
  eslint.configs.recommended,
  {
    files: ['**/*.js'],
    extends: tseslint.configs.recommendedTypeChecked,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jquery,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-underscore-dangle': ['error', { allow: ['_id'] }],
    },
  },
);
