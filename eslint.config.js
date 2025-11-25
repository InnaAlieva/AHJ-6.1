import globals from 'globals';
import ESLint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import jest from 'eslint-plugin-jest';

/** @type { import('eslint').Linter.Config[] } */
export default [
  // Базовые правила ESLint
  ESLint.configs.recommended,

  // Игнорирование файлов
  {
    ignores: ['dist/', '*.json', 'eslint.config.mjs'],
  },

  // Глобальные переменные
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
    },
  },

  // Правила для тестов
  {
    files: ['**/*.test.js'],
    plugins: {
      jest: jest,
    },
    rules: {
      ...jest.configs.flat.recommended.rules,
      'jest/prefer-expect-assertions': 'off',
    },
  },

  // Стилистические правила (основной набор)
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/no-unused-vars': 'warn',
      '@stylistic/no-console': 'off',
      '@stylistic/max-len': ['error', { code: 130 }],
      '@stylistic/array-bracket-spacing': ['error', 'always'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
    },
  },
];
