import clsx from 'clsx'
import { useMemo } from 'react'

import { ButtonLink } from '~/components/primitives/button'
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
export function DownloadButton() {
  const rendered = useHasRendered()
  const currentPlatformDownloadLink = useMemo(() => {
    if (!rendered) return '/'

    return getDownloadLink()
  }, [rendered])
  return (
    <div
      className={clsx(s['cta'], {
        [s['hidden']]: !currentPlatformDownloadLink
      })}
    >
      <ButtonLink
        href={currentPlatformDownloadLink || ''}
        target="_blank"
        variant="primary"
        download
      >
        Download Replay
      </ButtonLink>
    </div>
  )
}
