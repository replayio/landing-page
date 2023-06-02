import '~/css/global.scss'

import type { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import { Inter, Roboto_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import Head from 'next/head'
import * as React from 'react'

import { useAppStore } from '~/context/use-app-store'
import {
  basementLog,
  gaTrackingId,
  isClient,
  isDev,
  isProd
} from '~/lib/constants'
import { GAScripts, useAppGA } from '~/lib/ga'

/* MISC */

// TODO delete this basement log if not a basement project.
if (isProd && isClient) {
  // eslint-disable-next-line no-console
  console.log(basementLog)
}

/* CUSTOM APP */

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  preload: true
})

const robotoMono = Roboto_Mono({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap'
})

const roobert = localFont({
  src: [
    {
      path: '../../public/fonts/roobert/subset-Roobert-Heavy.woff2',
      weight: '900',
      style: 'normal'
    },
    {
      path: '../../public/fonts/roobert/subset-Roobert-BoldItalic.woff2',
      weight: 'bold',
      style: 'italic'
    },
    {
      path: '../../public/fonts/roobert/subset-Roobert-Light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../public/fonts/roobert/subset-Roobert-HeavyItalic.woff2',
      weight: '900',
      style: 'italic'
    },
    {
      path: '../../public/fonts/roobert/subset-Roobert-Bold.woff2',
      weight: 'bold',
      style: 'normal'
    },
    {
      path: '../../public/fonts/roobert/subset-Roobert-LightItalic.woff2',
      weight: '300',
      style: 'italic'
    },
    {
      path: '../../public/fonts/roobert/subset-Roobert-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../public/fonts/roobert/subset-Roobert-Regular.woff2',
      weight: 'normal',
      style: 'normal'
    },
    {
      path: '../../public/fonts/roobert/subset-Roobert-MediumItalic.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: '../../public/fonts/roobert/subset-Roobert-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/roobert/subset-Roobert-RegularItalic.woff2',
      weight: 'normal',
      style: 'italic'
    },
    {
      path: '../../public/fonts/roobert/subset-Roobert-SemiBoldItalic.woff2',
      weight: '600',
      style: 'italic'
    }
  ],
  variable: '--font-body',
  display: 'swap'
})

const App = ({ Component, pageProps, ...rest }: AppProps) => {
  if (gaTrackingId) useAppGA()

  useOverflowDebuggerInDev()
  useUserIsTabbing()
  useMobileVh()
  usePauseAnimationOnTabChange()

  React.useEffect(() => {
    function onReady() {
      useAppStore.setState({ fontsLoaded: true })
      document.documentElement.classList.add('fonts-loaded')
    }

    try {
      document.fonts.ready
        .then(() => {
          onReady()
        })
        .catch((error: unknown) => {
          console.error(error)
          onReady()
        })
    } catch (error) {
      console.error(error)
      onReady()
    }
  }, [])

  const getLayout: GetLayoutFn =
    (Component as any).getLayout ||
    (({ Component, pageProps }) => <Component {...pageProps} />)

  return (
    <>
      {gaTrackingId && <GAScripts />}
      <Head>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-roobert: ${roobert.style.fontFamily};
          --font-roboto-mono: ${robotoMono.style.fontFamily};

        }
        `
          }}
        />
      </Head>
      {getLayout({ Component, pageProps, ...rest })}
    </>
  )
}

/* APP HOOKS */

const useOverflowDebuggerInDev = () => {
  React.useEffect(() => {
    if (!isDev) return
    let mousetrapRef: Mousetrap.MousetrapInstance | undefined = undefined
    import('mousetrap').then(({ default: mousetrap }) => {
      mousetrapRef = mousetrap.bind(['command+i', 'ctrl+i', 'alt+i'], () => {
        document.body.classList.toggle('inspect')
      })
    })

    return () => {
      mousetrapRef?.unbind(['command+i', 'ctrl+i', 'alt+i'])
    }
  }, [])
}

const useUserIsTabbing = () => {
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === `Tab`) {
        document.body.classList.add('user-is-tabbing')
      }
    }

    function handleMouseDown() {
      document.body.classList.remove('user-is-tabbing')
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleMouseDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])
}

const usePauseAnimationOnTabChange = () => {
  const { setTabIsFocused } = useAppStore()

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      setTabIsFocused(document.visibilityState === 'visible')
    }

    window.addEventListener('visibilitychange', handleVisibilityChange)

    return () =>
      window.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [setTabIsFocused])
}

const setMobileVh = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

const useMobileVh = () => {
  React.useEffect(() => {
    setMobileVh()
    window.addEventListener('resize', setMobileVh)

    return () => {
      window.removeEventListener('resize', setMobileVh)
    }
  }, [])
}

/* TYPES */

export type Page<P = Record<string, unknown>> = NextComponentType<
  NextPageContext,
  Record<string, unknown>,
  P
> & { getLayout?: GetLayoutFn<P> }

export type GetLayoutFn<P = Record<string, unknown>> = (
  props: Omit<AppProps<P>, 'pageProps'> & { pageProps: P }
) => React.ReactNode

/* EXPORT */

export default App
