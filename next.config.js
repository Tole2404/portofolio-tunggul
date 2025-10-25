/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Exclude nodemailer from webpack bundling
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('nodemailer')
    }
    return config
  },
}

module.exports = nextConfig
