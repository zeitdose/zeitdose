import antfu from '@antfu/eslint-config'
import ii from '@importantimport/eslint-config'

export default antfu(
  {
    ignores: ['**/*.d.ts'],
    react: true,
    typescript: {
      tsconfigPath: './tsconfig.json',
    },
  },
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react/no-unstable-context-value': 'off',
      'react-refresh/only-export-components': 'off',
      'ts/no-use-before-define': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
  {
    rules: {
      'perfectionist/sort-objects': 'error',
      'style/no-mixed-operators': 'off',
    },
  },
).append(ii({ functional: false }))
