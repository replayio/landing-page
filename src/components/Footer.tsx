import Link from 'next/link'
import { ShortLogo } from './ShortLogo'
import styles from '../styles/Landingpage.module.css'

type LinkItem = {
  name: string
  href: string
  icon?: (props: any) => JSX.Element
}

const showNewsletter = false

function Category({ name, links }: { name: string; links: LinkItem[] }) {
  return (
    <>
      <h3 className="text-sm font-semibold leading-6 text-gray-900">{name}</h3>
      <ul role="list" className="mt-6 space-y-4">
        {links.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

const navigation = {
  product: [
    { name: 'Replay DevTools', href: 'https://docs.replay.io/browser-devtools/elements-panel' },
    {
      name: 'Replay Viewer',
      href: 'https://docs.replay.io/browser-devtools/replay-viewer'
    },
    { name: 'Replay Test Suites', href: 'https://docs.replay.io/test-suites/runs-view' },

    { name: 'Documentation', href: 'https://docs.replay.io' },
    { name: 'Pricing', href: '/pricing' }
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: 'https://blog.replay.io/' },
    { name: 'Careers', href: '/about#careers' }
    //TODO: We have categories in our blog but we don't have a direct link to them yet
    // { name: 'Changelog', href: '#' },
    // { name: 'Engineering blog', href: '#' },
    // { name: 'Case Studies', href: '#' }
  ],
  information: [
    { name: 'Contact', href: '/contact' },
    { name: 'Guides', href: 'https://docs.replay.io/time-travel-intro/what-is-time-travel' },
    { name: 'Branding', href: '/branding' },
    { name: 'Security', href: '/security-and-privacy' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Use', href: '/terms-of-service' }
  ],
  integrations: [
    { name: 'React', href: 'https://docs.replay.io/framework-devtools/react-panel' },
    {
      name: 'Redux',
      href: 'https://docs.replay.io/framework-devtools/redux-panel'
    },
    { name: 'Cypress', href: 'https://docs.replay.io/test-runners/cypress-io' },
    {
      name: 'Playwright',
      href: 'https://docs.replay.io/test-runners/playwright/record-your-first-replay'
    },
    { name: 'Selenium WebDriver', href: 'https://docs.replay.io/test-runners/selenium' },
    { name: 'NextJS', href: 'https://docs.replay.io/integrations/frameworks-libraries/nextjs' }
  ],
  social: [
    {
      name: 'Discord',
      href: '/discord',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props} style={{ marginTop: '3px' }}>
          <path d="M20.559,1.564A20.311,20.311,0,0,0,15.762,0a13.949,13.949,0,0,0-.65,1.323,18.933,18.933,0,0,0-8.107,0A14.024,14.024,0,0,0,5.882,0,20.506,20.506,0,0,0,3.753,1.57C.539,6.329-.331,10.96.105,15.534h0A20.458,20.458,0,0,0,6.325,18.659a15.045,15.045,0,0,0,1.34-2.172,13.243,13.243,0,0,1-2.102-1A14.62,14.62,0,0,0,12.466,15.6a14.621,14.621,0,0,0,6.9,0c.168.137.341.27.515.39a13.262,13.262,0,0,1-2.105,1,14.885,14.885,0,0,0,1.334,2.157A20.314,20.314,0,0,0,24.4,15.535h0C24.869,10.219,23.711,5.629,20.559,1.564ZM8.229,12.7c-1.224,0-2.089-1.1-2.089-2.48s1.021-2.468,2.209-2.468,2.1,1.108,2.089,2.481S9.453,12.7,8.229,12.7Zm8.164,0c-1.224,0-2.089-1.1-2.089-2.48s1.021-2.468,2.209-2.468,2.1,1.108,2.089,2.481S17.617,12.7,16.393,12.7Z" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      href: 'https://github.com/replayio',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      )
    },
    {
      name: 'X',
      href: 'https://twitter.com/replayio',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      )
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@replayio',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/replayio',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.938 3H4.063C3.476 3 3 3.476 3 4.063v15.875C3 20.524 3.476 21 4.063 21h15.875c.587 0 1.063-.476 1.063-1.063V4.063C21 3.476 20.524 3 19.938 3zM8.097 18.53H5.47V9h2.627v9.53zm-1.315-10.75a1.514 1.514 0 110-3.028c.836 0 1.515.678 1.515 1.514 0 .836-.679 1.514-1.515 1.514zm11.343 10.75h-2.627v-4.379c0-1.043-.021-2.387-1.455-2.387-1.456 0-1.679 1.138-1.679 2.309v4.457H9.937V9h2.522v1.281h.036c.351-.664 1.208-1.366 2.486-1.366 2.656 0 3.145 1.749 3.145 4.023v5.592z"
            clipRule="evenodd"
          />
        </svg>
      )
    }
  ]
}

export function Footer() {
  return (
    <footer className="relative isolate z-10 bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div
        className="absolute inset-x-0 top-1/4 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="ml-[max(20%,10rem)] aspect-[1313/600] w-[70.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <ShortLogo className="fill-slate-800" style={{ height: '20px' }} />
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <Category name="Product" links={navigation.product} />
              </div>
              <div className="mt-10 md:mt-0">
                <Category name="Company" links={navigation.company} />
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <Category name="Information" links={navigation.information} />
              </div>
              <div className="mt-10 md:mt-0">
                <Category name="Integrations" links={navigation.integrations} />
              </div>
            </div>
          </div>
        </div>
        {showNewsletter && (
          <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">
                Subscribe to our newsletter
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                The latest news, articles, and resources, sent to your inbox weekly.
              </p>
            </div>
            <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-56 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <button
                  type="submit"
                  className={`flex w-full items-center justify-center rounded-md ${styles.bgPrimaryAccent} px-3 py-2 text-sm font-semibold text-white shadow-sm hover:${styles.bgPrimaryAccent} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${styles.bgPrimaryAccent}`}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="mt-8 border-t border-gray-900/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
            &copy; Record Replay, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
