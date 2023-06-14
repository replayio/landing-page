import AppleIcon from '~/components/icons/apple'
import { LinuxIcon } from '~/components/icons/linux'
import { WindowsIcon } from '~/components/icons/windows'
import { ButtonLink, ButtonLinkProps } from '~/components/primitives/cta'
import { NavLink, NavLinkProps } from '~/components/primitives/nav-link'
import { isServer } from '~/lib/constants'

import s from './download-button.module.scss'

const availablePlatforms = {
  windows: {
    label: 'Windows',
    icon: WindowsIcon,
    downloadSource: '/downloads/windows-replay.zip'
  },
  mac: {
    label: 'Mac',
    icon: AppleIcon,
    downloadSource: '/downloads/replay.dmg'
  },
  linux: {
    label: 'Linux',
    icon: LinuxIcon,
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

export const DownloadButton: React.FC<Partial<ButtonLinkProps>> = ({
  children,
  ...rest
}) => {
  if (isServer) {
    return null
  }

  const platform = availablePlatforms[getPlatform()]
  const PlatformIcon = platform.icon

  return (
    <ButtonLink
      {...rest}
      href={platform.downloadSource}
      target="_blank"
      download
    >
      {children}

      <PlatformIcon className={s['platform']} />
    </ButtonLink>
  )
}

export const DownloadLink: React.FC<Partial<NavLinkProps>> = ({
  children,
  ...rest
}) => {
  if (isServer) {
    return null
  }

  const platform = availablePlatforms[getPlatform()]
  const PlatformIcon = platform.icon

  return (
    <NavLink {...rest} href={platform.downloadSource} target="_blank" download>
      {children}

      <PlatformIcon className={s['platform']} />
    </NavLink>
  )
}
