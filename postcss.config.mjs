import autoprefixer from 'autoprefixer'
import tailwindcss from '@tailwindcss/postcss'

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: [
    autoprefixer(),
    tailwindcss()
  ]
}
