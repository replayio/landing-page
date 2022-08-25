const withBundleAnalyzer = require('@next/bundle-analyzer')
const withMDX = require('@next/mdx')
const withTM = require('next-transpile-modules')

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: false,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  productionBrowserSourceMaps: true,
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

module.exports = (_phase, { defaultConfig: _ }) => {
  const plugins = [
    withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }),
    withMDX({ options: { providerImportSource: '@mdx-js/react' } }),
    withTM([]) // add modules you want to transpile here
  ]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...config })
}
