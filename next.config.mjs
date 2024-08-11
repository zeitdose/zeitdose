// import MillionLint from '@million/lint'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  reactStrictMode: true,
  serverExternalPackages: ['oslo', '@node-rs/argon2'],
  webpack: (config) => {
    config.externals.push('@node-rs/argon2', '@node-rs/bcrypt')
    return config
  },
}

export default nextConfig
