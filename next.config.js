const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')
const withTM = require('next-transpile-modules')

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['dummyimage.com']
  },
  redirects() {
    return [
      {
        source: '/discord',
        destination: 'https://discord.com/invite/PFjtU3uv7M',
        permanent: true
      }
    ]
  },
  experimental: { images: { allowFutureImage: true } },
  webpack: (config) => {
    /** Fix yarn linked dependencies that use react */
    config.resolve.alias.react = require('path').resolve('./node_modules/react')
    return config
  }
}

module.exports = withPlugins(
  [withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }), withTM([])],
  config
)
