import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
      'no-console': 'warn',           // предупреждать о console.log
      'no-debugger': 'warn',          // предупреждать о debugger
      'eqeqeq': ['warn', 'always'],   // требовать === вместо ==
      'curly': ['warn', 'all'],       // требовать {} для блоков
      'no-var': 'warn',               // использовать let/const вместо var
      'prefer-const': 'warn',
    },
  },
])
