import clsx from 'clsx'

import { ButtonLink } from '~/components/primitives/button'
import { useDeviceDetect } from '~/hooks/use-device-detect'
import { useHasRendered } from '~/hooks/use-has-rendered'
import { isServer } from '~/lib/constants'

import s from './download-button.module.scss'

const availablePlatforms = {
  windows: {
    label: 'Windows',
    imageSource: '/images/logos/windows.svg',
    downloadSource: '/downloads/windows-replay.zip'
  },
  mac: {
    label: 'Mac',
    imageSource: '/images/logos/apple.svg',
    downloadSource: '/downloads/replay.zip'
  },
  linux: {
    label: 'Linux',
    imageSource: '/images/logos/linux.svg',
    downloadSource: '/downloads/linux-replay.tar.bz2'
  }
}
const getPlatform = () => {
  if (isServer) return 'mac'

  const uAgent = navigator.userAgent

  return (
    (uAgent.match(/Linux/i) && 'linux') ||
    (uAgent.match(/Windows/i) && 'windows') ||
    (uAgent.match(/Mac/i) && 'mac') ||
    'mac'
  )
}

export function DownloadButton({
  title = 'Record your first replay',
  variant = 'primary'
}: {
  title?: string
  variant?: 'primary' | 'tertiary-inverted' | 'tertiary'
}) {
  const rendered = useHasRendered()
  const platform = availablePlatforms[getPlatform()]

  const { isDesktop } = useDeviceDetect()

  if (!isDesktop || !rendered) {
    return <></>
  }

  return (
    <div
      className={clsx(s['cta'], {
        [s['visible']]: rendered
      })}
    >
      <ButtonLink
        href={platform.downloadSource}
        target="_blank"
        variant={variant}
        download
      >
        {title}{' '}
        <img
          alt={platform.label}
          src={platform.imageSource}
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
