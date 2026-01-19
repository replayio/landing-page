import '~/styles/tailwind.css'
import { Viewport } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import Script from 'next/script'

import { ReactNode } from 'react'
import Analytics from '~/lib/analytics'
import { Toolbar } from 'basehub/next-toolbar'

export const viewport: Viewport = {
  themeColor: '#FFF'
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend'
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={clsx('h-full scroll-smooth bg-white antialiased', inter.variable, lexend.variable)}
    >
      <head>
        <Analytics />
        <Toolbar />
        <Script
          async
          src="https://replay-analytics.netlify.app/umami.js"
          data-website-id="fbe91bf5-8681-4948-a34b-8f2200a4d18f"
          data-host-url="https://replay-analytics.netlify.app"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
