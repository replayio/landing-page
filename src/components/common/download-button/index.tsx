import clsx from 'clsx'
import { useMemo } from 'react'

import { ButtonLink } from '~/components/primitives/button'
import { useDeviceDetect } from '~/hooks/use-device-detect'
import { useHasRendered } from '~/hooks/use-has-rendered'
import { isServer } from '~/lib/constants'

import s from './download-button.module.scss'

const availablePlatforms = {
  windows: '/downloads/windows-replay.zip',
  mac: '/downloads/replay.dmg',
  linux: '/downloads/linux-replay.tar.bz2'
}
const getDownloadLink = () => {
  if (isServer) return

  const uAgent = navigator.userAgent

  return (
    (uAgent.match(/Linux/i) && availablePlatforms['linux']) ||
    (uAgent.match(/Windows/i) && availablePlatforms['windows']) ||
    (uAgent.match(/Mac/i) && availablePlatforms['mac']) ||
    undefined
  )
}
const getLogoSource = () => {
  if (isServer) return

  const uAgent = navigator.userAgent

  return (
    (uAgent.match(/Linux/i) && '/images/logos/linux.svg') ||
    (uAgent.match(/Windows/i) && '/images/logos/windows.svg') ||
    (uAgent.match(/Mac/i) && '/images/logos/apple.svg') ||
    undefined
  )
}
const getLogoAlt = () => {
  if (isServer) return

  const uAgent = navigator.userAgent

  return (
    (uAgent.match(/Linux/i) && 'Linux') ||
    (uAgent.match(/Windows/i) && 'Windows') ||
    (uAgent.match(/Mac/i) && 'Apple') ||
    undefined
  )
}

export function DownloadButton({
  title = 'Record your first replay',
  variant = 'primary'
}: {
  title?: string
  variant?: 'primary' | 'tertiary-inverted'
}) {
  const rendered = useHasRendered()
  const currentPlatformDownloadLink = useMemo(() => {
    if (!rendered) return '/'

    return getDownloadLink()
  }, [rendered])

  const { isDesktop } = useDeviceDetect()

  if (!isDesktop && rendered) {
    return null
  }

  const logoSource = getLogoSource()

  return (
    <div
      className={clsx(s['cta'], {
        [s['visible']]: rendered
      })}
    >
      <ButtonLink
        href={currentPlatformDownloadLink || ''}
        target="_blank"
        variant={variant}
        download
      >
        {title}{' '}
        <img
          alt={getLogoAlt()}
          src={logoSource}
          style={{
            height: 20,
            marginLeft: 8,
            filter: variant === 'primary' ? 'invert(100%)' : undefined
          }}
        />
      </ButtonLink>
    </div>
  )
}
