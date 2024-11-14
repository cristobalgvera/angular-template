/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*'],
  overrides: [
    {
      files: ['*.html'],
      extends: [
        'plugin:@angular-eslint/template/recommended',
        'plugin:@angular-eslint/template/accessibility',
        'plugin:prettier/recommended',
      ],
    },
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: { project: true },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:rxjs/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          { type: 'attribute', prefix: 'app', style: 'camelCase' },
        ],
        '@angular-eslint/component-selector': [
          'error',
          { type: 'element', prefix: 'app', style: 'kebab-case' },
        ],
        '@typescript-eslint/member-ordering': [
          'error',
          { default: ['signature', 'field', 'constructor', 'method'] },
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
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
      overrides: [
        {
          files: ['*.ts'],
          excludedFiles: ['*.spec.ts'],
          plugins: ['functional'],
          extends: [
            'plugin:functional/external-typescript-recommended',
            'plugin:functional/no-mutations',
            'plugin:functional/stylistic',
          ],
          rules: {
            'functional/prefer-immutable-types': [
              'error',
              {
                enforcement: 'None',
                ignoreInferredTypes: true,
                parameters: { enforcement: 'ReadonlyShallow' },
                returnTypes: { enforcement: 'ReadonlyShallow' },
              },
            ],
          },
        },
        {
          files: ['*.spec.ts'],
          extends: [
            'plugin:jest/recommended',
            'plugin:jest/style',
            'plugin:jest-extended/all',
            'plugin:jest-formatting/strict',
            'plugin:jest-dom/recommended',
          ],
          rules: {
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
          },
        },
      ],
    },
  ],
};
