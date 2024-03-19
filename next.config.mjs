import MillionLint from '@million/lint'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push('@node-rs/argon2', '@node-rs/bcrypt')
    return config
  },
}
export default MillionLint.next({
  rsc: true,
})(nextConfig)
