// @ts-check
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const cypress = require('eslint-plugin-cypress');
const prettier = require('eslint-config-prettier');

module.exports = tseslint.config(
  {
    ignores: [
      '**/coverage/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/tmp/**',
      '**/*.js',
    ],
  },
  // Application + library TypeScript (mirrors the former @angular-eslint/recommended setup)
  {
    files: ['**/*.ts'],
    ignores: ['apps/damap-frontend-e2e/**/*.ts'],
    extends: [...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      '@angular-eslint/prefer-standalone': 'off',
      // Newly enabled by angular-eslint v20 recommended; the project does not
      // enforce inject() yet (constructor DI remains). Optional future cleanup
      // via `ng generate @angular/core:inject`.
      '@angular-eslint/prefer-inject': 'off',
    },
  },
  // Library overrides the selector prefix (no enforced prefix), as before
  {
    files: ['libs/damap/**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: '', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: '', style: 'kebab-case' },
      ],
    },
  },
  // Templates
  {
    files: ['**/*.html'],
    ignores: ['apps/damap-frontend-e2e/**'],
    extends: [...angular.configs.templateRecommended],
    rules: {},
  },
  // End-to-end (Cypress)
  {
    files: ['apps/damap-frontend-e2e/**/*.ts'],
    extends: [...tseslint.configs.recommended, cypress.configs.recommended],
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  prettier,
);
