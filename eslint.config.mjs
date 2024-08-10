import antfu from '@antfu/eslint-config'
import ii from '@importantimport/eslint-config'

export default antfu({
  react: true,
  typescript: true,
}).append(ii({ functional: false }))
