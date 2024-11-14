// @ts-check

const angular = require('angular-eslint');
const eslint = require('@eslint/js');
const stylistic = require('@stylistic/eslint-plugin');
const jest = require('eslint-plugin-jest');
const jestExtended = require('eslint-plugin-jest-extended');
const jestDom = require('eslint-plugin-jest-dom');
const eslintPluginPrettierRecommened = require('eslint-plugin-prettier/recommended');
const sonarjs = require('eslint-plugin-sonarjs');
const globals = require('globals');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  eslint.configs.recommended,
  {
    name: '@app/angular-typescript',
    files: ['**/*.ts'],
    extends: [...angular.configs.tsRecommended],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
    },
  },
  {
    name: '@app/angular-html',
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      eslintPluginPrettierRecommened,
    ],
  },
  {
    name: '@app/typescript-eslint',
    files: ['**/*.ts'],
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.js'],
          defaultProject: 'tsconfig.json',
        },
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      '@typescript-eslint/member-ordering': [
        'error',
        { default: ['signature', 'field', 'constructor', 'method'] },
      ],
      '@typescript-eslint/no-extraneous-class': [
        'error',
        { allowWithDecorator: true },
      ],
      '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true, allowBoolean: true, allowAny: true },
      ],
    },
  },
  {
    name: '@app/typescript-eslint/type-check',
    files: ['**/*.ts'],
    ignores: ['**/*.spec.ts'],
    extends: [...tseslint.configs.strictTypeChecked],
    rules: {
      '@typescript-eslint/member-ordering': [
        'error',
        { default: ['signature', 'field', 'constructor', 'method'] },
      ],
    },
  },
  {
    name: '@app/sonarjs',
    files: ['**/*.ts'],
    extends: [sonarjs.configs.recommended],
    rules: {
      'sonarjs/redundant-type-aliases': 'off',
      'sonarjs/argument-type': 'off',
      'sonarjs/todo-tag': 'warn',
    },
  },
  {
    name: '@app/sonarjs/test',
    files: ['**/*.spec.ts'],
    extends: [sonarjs.configs.recommended],
    rules: {
      'sonarjs/no-identical-functions': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-nested-functions': 'off',
      'sonarjs/no-base-to-string': 'off',
      'sonarjs/no-clear-text-protocols': 'off',
    },
  },
  {
    name: '@app/jest',
    files: ['**/*.spec.ts'],
    extends: [
      jest.configs['flat/recommended'],
      jest.configs['flat/style'],
      jestExtended.configs['flat/all'],
      jestDom.configs['flat/recommended'],
    ],
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
  {
    name: '@app/stylistic',
    files: ['**/*.ts'],
    extends: [
      stylistic.configs.customize({
        semi: true,
        quotes: 'single',
        quoteProps: 'as-needed',
        indent: 2,
        flat: true,
        arrowParens: true,
        braceStyle: '1tbs',
      }),
    ],
    rules: {
      '@stylistic/lines-between-class-members': [
        'error',
        { enforce: [{ blankLine: 'always', prev: '*', next: 'method' }] },
      ],
      '@stylistic/operator-linebreak': [
        'error',
        'after',
        { overrides: { '?': 'before', ':': 'before' } },
      ],
    },
  },
  {
    name: '@app/disable-type-check',
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    name: '@app/files/module',
    files: ['**/*.module.ts'],
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
  eslintPluginPrettierRecommened,
);
