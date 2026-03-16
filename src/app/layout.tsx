import '~/styles/tailwind.css'
import { Viewport } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import Script from 'next/script'

import { ReactNode } from 'react'
import Analytics from '~/lib/analytics'
import { Toolbar } from 'basehub/next-toolbar'
import { TopBanner } from '~/components/TopBanner'

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
        <Script
          id="apollo-website-tracker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function initApollo(){
                var n = Math.random().toString(36).substring(7);
                var o = document.createElement("script");
                o.src = "https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=" + n;
                o.async = true;
                o.defer = true;
                o.onload = function(){
                  window.trackingFunctions.onLoad({appId: "69987d99eda3b200117689e4"});
                };
                document.head.appendChild(o);
              }
              initApollo();
            `.trim()
          }}
        />
        <Script
          id="linkedin-insight-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window._linkedin_partner_id = "8830930";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);
              })(window.lintrk);
            `.trim()
          }}
        />
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=8830930&fmt=gif"
          />
        </noscript>
        <TopBanner />
        {children}
      </body>
    </html>
  )
}
