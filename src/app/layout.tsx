import '~/styles/tailwind.css'
import { Viewport } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'

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
      </head>
      <body>{children}</body>
    </html>
  )
}
