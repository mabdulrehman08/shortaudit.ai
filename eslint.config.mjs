import js from '@eslint/js';

export default [
  { ignores: ['.next/**', 'node_modules/**', 'out/**', 'dist/**', '**/*.ts', '**/*.tsx'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        process: 'readonly',
      },
    },
  },
];
