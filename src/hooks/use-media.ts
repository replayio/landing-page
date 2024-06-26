import * as React from 'react'

import { isApiSupported } from '~/lib/utils'

export const useMedia = (mediaQuery: string, initialValue?: boolean) => {
  const [isVerified, setIsVerified] = React.useState<boolean | undefined>(initialValue)

  React.useEffect(() => {
    if (!isApiSupported('matchMedia')) {
      console.warn('matchMedia is not supported by your current browser')
      return
    }
    const mediaQueryList = window.matchMedia(mediaQuery)
    const changeHandler = () => setIsVerified(!!mediaQueryList.matches)

    changeHandler()
    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', changeHandler)
      return () => {
        mediaQueryList.removeEventListener('change', changeHandler)
      }
    } else if (typeof mediaQueryList.addListener === 'function') {
      mediaQueryList.addListener(changeHandler)
      return () => {
        mediaQueryList.removeListener(changeHandler)
      }
    }
  }, [mediaQuery])

  return isVerified
}

export const useTabletBreakpoint = () => {
  return useMedia('(max-width: 768px)')
}

export const useTabletLgBreakpoint = () => {
  return useMedia('(max-width: 1024px)')
}

export const useMinTabletBreakpoint = () => {
  return useMedia('(min-width: 769px)')
}

export const useMinTabletLgBreakpoint = () => {
  return useMedia('(min-width: 1024px)')
}
