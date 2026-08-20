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
  {
    // As duas pastas onde o CLI do shadcn escreve (ver aliases do components.json): código de
    // que passamos a ser donos mas que não escrevemos à mão e que é reescrito a cada
    // `shadcn add --overwrite`. As regras desligadas aqui são de estilo e tamanho, não de
    // segurança de tipos — `no-explicit-any`, `no-floating-promises` e as fronteiras continuam
    // a valer. Código nosso vive fora destas pastas e fica sujeito ao conjunto completo.
    files: ['src/shared/ui/**', 'src/shared/hooks/**'],
    rules: {
      'max-lines-per-function': 'off',
      complexity: 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },
);
