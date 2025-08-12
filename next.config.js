const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'basehub.earth' },
      { hostname: 'image-forwarder.notaku.so' },
      { hostname: 'assets.basehub.com' }
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')]
  },
  redirects() {
    return [
      {
        source: '/view/:recording',
        destination: 'https://app.replay.io/:recording',
        permanent: false
      },
      {
        source: '/download',
        destination: 'https://docs.replay.io/getting-started/record-your-first-replay',
        permanent: false
      },
      {
        source: '/downloads/:path',
        destination: 'https://static.replay.io/downloads/:path',
        permanent: false
      },
      {
        source: '/discord',
        destination: 'https://discord.com/invite/PFjtU3uv7M',
        permanent: true
      },
      {
        source: '/protocol',
        destination: 'https://static.replay.io/protocol',
        permanent: true
      },
      {
        source: '/driver',
        destination: 'https://static.replay.io/driver',
        permanent: true
      },
      {
        source: '/tos.html',
        destination: 'https://static.replay.io/tos.html',
        permanent: true
      },
      {
        source: '/demo',
        destination: 'https://static.replay.io/demo',
        permanent: true
      },
      {
        source: '/browser/error',
        destination: 'https://app.replay.io/browser/error',
        permanent: true
      },
      {
        source: '/docs',
        destination: 'https://docs.replay.io',
        permanent: true
      },
      {
        source: '/blog',
        destination: 'https://blog.replay.io',
        permanent: true
      },
      /*
      {
        source: '/hiring',
        destination: 'https://jobs.ashbyhq.com/replay',
        permanent: true
      },
      */
      {
        source: '/effective-determinism',
        destination:
          'https://medium.com/replay-io/how-to-debug-an-effectively-deterministic-time-travel-debugger-seriously-how-ba4d59965b7a',
        permanent: true
      },
      {
        source: '/youtube',
        destination: 'https://www.youtube.com/channel/UChCMGx08l8k6SyVExoHpCwA',
        permanent: true
      },
      {
        source: '/oss',
        destination: 'https://docs.replay.io/docs/replay-oss-751fc053a0a14c32812c4766d7c65e4d',
        permanent: true
      },
      {
        source: '/pantheon',
        destination:
          'https://medium.com/replay-io/pantheon-solves-performance-bottlenecks-improving-load-time-by-5x-fed6f02e8106',
        permanent: true
      },
      {
        source: '/glide',
        destination:
          'https://medium.com/replay-io/glide-saves-40-hours-weekly-by-eliminating-the-reproducibility-problem-8a06e6330263',
        permanent: true
      },
      {
        source: '/midnite',
        destination:
          'https://medium.com/replay-io/midnite-builds-time-travel-workflows-for-fast-paced-betting-platform-780adf305a78',
        permanent: true
      },
      {
        source: '/tablecheck',
        destination:
          'https://medium.com/replay-io/tablecheck-transforms-qa-dev-communication-to-support-thousands-of-restaurants-and-hotel-chains-df5d4a940c58',
        permanent: true
      },
      {
        source: '/recording-bug-reports',
        destination:
          'https://docs.replay.io/docs/recording-bug-reports-80c37d7d6753485f81497570625d06f0',
        permanent: true
      },
      {
        source: '/record-bugs',
        destination:
          'https://docs.replay.io/docs/recording-bug-reports-80c37d7d6753485f81497570625d06f0',
        permanent: true
      },
      {
        source: '/examples',
        destination:
          'https://docs.replay.io/docs/resources-and-examples-d25ae319114e4d109022458cd47f38ec',
        permanent: true
      },
      {
        source: '/getting-started',
        destination:
          'https://docs.replay.io/docs/recording-a-web-app-5fc7ace7f3e449ce903e89e59d4b93ba',
        permanent: true
      },
      {
        source: '/support',
        destination:
          'https://docs.replay.io/docs/contact-and-community-096224a3bca4479b982ac572dc5c81d0',
        permanent: true
      },
      {
        source: '/billing',
        destination: 'https://docs.replay.io/docs/billing-e01f0740cd9548f1b8725c9773b217f6',
        permanent: true
      },
      {
        source: '/case-studies',
        destination:
          'https://docs.replay.io/docs/case-studies-and-comparisons-3bd958ab68234ae697cdac5904bbc36e',
        permanent: true
      },
      {
        source: '/terms-of-use',
        destination: 'https://www.replay.io/terms-of-service',
        permanent: true
      },
      {
        source: '/security-privacy',
        destination: 'https://www.replay.io/security-and-privacy',
        permanent: true
      },
      {
        source: '/pricing',
        destination: 'https://www.replay.io/',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
