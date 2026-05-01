module.exports = [
  require('@eslint/js').configs.recommended,
  {
    ignores: [
      'node_modules/**',
      'migrations/**',
      'seeders/**',
      'coverage/**',
      'eslint.config.js',
      '.eslintrc.js',
    ],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'script',
      globals: {
        require: 'readonly',
        module: 'readonly',
        process: 'writable',
        console: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        URL: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['log', 'warn', 'error'] }],
      'no-redeclare': 'off',
      'no-unused-vars': ['error', { vars: 'all', args: 'none' }],
    },
  },
];
