import antfu from '@antfu/eslint-config'
import ii from '@importantimport/eslint-config'

export default antfu(
  {
    react: true,
    typescript: true,
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
).append(ii({ functional: false }))
