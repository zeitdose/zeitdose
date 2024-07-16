// import MillionLint from '@million/lint'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push('@node-rs/argon2', '@node-rs/bcrypt')
    return config
  },
  experimental: {
    reactCompiler: true,
  },
  serverExternalPackages: ['oslo', '@node-rs/argon2'],
}

export default nextConfig
