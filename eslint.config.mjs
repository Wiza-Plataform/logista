// ESLint flat config — WIZA lojista (ENG-010). Este repo é autónomo: nada aqui é partilhado.
import js from '@eslint/js';
import globals from 'globals';
import boundaries from 'eslint-plugin-boundaries';
import security from 'eslint-plugin-security';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', '.next/**', 'coverage/**', 'node_modules/**'] },
  js.configs.recommended,
  security.configs.recommended,
  {
    files: ['**/*.mjs'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [...tseslint.configs.strictTypeChecked],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    plugins: { boundaries },
    settings: {
      // ENG-010: uma feature não importa de outra feature; só de si própria e de shared.
      'boundaries/elements': [
        { type: 'feature', pattern: 'src/features/*', capture: ['feature'] },
        { type: 'shared', pattern: 'src/shared/**' },
      ],
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            {
              from: { element: { type: 'feature' } },
              allow: {
                to: {
                  element: { type: 'feature', captured: { feature: '{{from.captured.feature}}' } },
                },
              },
            },
            {
              from: { element: { type: 'feature' } },
              allow: { to: { element: { type: 'shared' } } },
            },
            {
              from: { element: { type: 'shared' } },
              allow: { to: { element: { type: 'shared' } } },
            },
          ],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error', // ENG-025
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'as' }],
      complexity: ['error', 10], // ENG-020
      'max-lines-per-function': ['warn', 40],
      eqeqeq: ['error', 'always'],
    },
  },
  {
    // `test()` do node:test devolve uma promessa que o próprio runner gere.
    files: ['**/*.test.ts'],
    rules: { '@typescript-eslint/no-floating-promises': 'off' },
  },
);
