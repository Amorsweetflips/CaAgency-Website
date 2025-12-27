const { withBotId } = require('botid/next/config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'caagency.com',
      },
      {
        protocol: 'https',
        hostname: 'caagency.co.uk',
      },
    ],
    unoptimized: false,
  },
}

module.exports = withBotId(nextConfig)
