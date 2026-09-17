export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV === 'production'

export const isClient = typeof document !== 'undefined'
export const isServer = !isClient

if (
  typeof process.env.NEXT_PUBLIC_SITE_URL !== 'string' &&
  typeof process.env.NEXT_PUBLIC_VERCEL_URL !== 'string'
) {
  throw new Error(
    `Please set the NEXT_PUBLIC_SITE_URL environment variable to your site's URL.
    
1. Create .env file at the root of your project.
2. Add NEXT_PUBLIC_SITE_URL=http://localhost:3000
3. For other environments (like production), make sure you set the correct URL.
    `
  )
}

export const siteURL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
)
export const siteOrigin = siteURL.origin

// we like putting this in the JavaScript console,
// as our signature.
// you can delete it if not needed.
export const basementLog = `

   ██╗
   ██║
   ██████╗
   ██╔══██╗  ██╗
   ██████╔╝  ██╝
   ╚═════╝   
                                                                                
   From the basement. https://basement.studio
`

// TODO: update this data
export const defaultMeta = {
  title: 'Replay QA — Autonomous QA for the Vibecoding Era',
  description:
    'Replay QA autonomously tests your web app for functional bugs, security vulnerabilities, accessibility failures, and performance problems — then files root-caused bug reports your coding agent can act on immediately.',
  ogImage: `${siteOrigin}/replayQA_og-image.png`,
  twitter: {
    handle: '@replayio',
    site: '@replayio'
  }
}

export const breakpoints = {
  screenSm: 640,
  screenMd: 768,
  screenLg: 1024,
  screenXl: 1280
}

/** Auth0 login entrypoint on Replay QA — matches loop-qa UserMenu login(). */
export const qaAuthLoginUrl = (returnTo: string) =>
  `https://qa.replay.io/api/auth-login?returnTo=${encodeURIComponent(returnTo)}`

export const qaSignInUrl = qaAuthLoginUrl('/')

/** Login/signup, then land on /new with the app URL pre-filled. */
export const qaNewProjectLoginUrl = (appUrl?: string) =>
  qaAuthLoginUrl(appUrl ? `/new?url=${encodeURIComponent(appUrl)}` : '/new')

// TODO: add variable (NEXT_PUBLIC_GA_TRACKING_ID) to env if necessary
export const gaTrackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID
