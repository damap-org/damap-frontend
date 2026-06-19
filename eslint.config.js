const angular = require('angular-eslint');
const tseslint = require('typescript-eslint');

const tsFiles = ['**/*.ts'];
const htmlFiles = ['**/*.html'];

const withFiles = (configs, files) =>
  configs.map(config => ({
    ...config,
    files,
  }));

module.exports = [
  {
    ignores: [
      '**/coverage/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/tmp/**',
      '**/*.js',
    ],
  },
  ...withFiles(angular.configs.tsRecommended, tsFiles),
  {
    files: tsFiles,
    processor: angular.processInlineTemplates,
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/prefer-inject': 'off',
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
    },
  },
  {
    files: ['libs/damap/**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: '',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: '',
          style: 'kebab-case',
        },
      ],
    },
  },
  ...withFiles(angular.configs.templateRecommended, htmlFiles),
];
