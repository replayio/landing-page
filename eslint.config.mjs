import { defineConfig, globalIgnores } from 'eslint/config'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
  globalIgnores([
    '.next/**',
    'node_modules/**',
    'public/**',
    'design-mocks/**',
    'test-results/**',
    'playwright-report/**',
    'next-env.d.ts'
  ]),
  ...nextCoreWebVitals,
  prettierRecommended,
  {
    rules: {
      'prettier/prettier': 'warn',
      // New React Compiler rules in eslint-config-next 16. They flag the existing
      // mount-then-render pattern in portal.tsx and use-hash.ts, which works fine.
      // Kept as warnings until those are refactored.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn'
    }
  }
])
