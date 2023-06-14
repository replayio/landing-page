import { useEffect, useState } from 'react'

import AppleIcon from '~/components/icons/apple'
import { LinuxIcon } from '~/components/icons/linux'
import { WindowsIcon } from '~/components/icons/windows'
import { ButtonLink, ButtonLinkProps } from '~/components/primitives/cta'
import { NavLink, NavLinkProps } from '~/components/primitives/nav-link'
import { isServer } from '~/lib/constants'

import s from './download-button.module.scss'

type PlatformIcon = {
  label: string
  icon: React.FC
  downloadSource: string
}

type Platform = 'windows' | 'mac' | 'linux'

const availablePlatforms: { [platform: string]: PlatformIcon } = {
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

const getPlatform = (): Platform | null => {
  if (isServer) return null

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
  const [platform, setPlatform] = useState<Platform | null>(null)

  useEffect(() => {
    if (!isServer) {
      setPlatform(getPlatform())
    }
  }, [])

  if (!platform) return null
  const platformIcon = availablePlatforms[platform]
  if (!platformIcon) return null

  return (
    <ButtonLink
      {...rest}
      href={platformIcon.downloadSource}
      target="_blank"
      download
    >
      {children}

      <platformIcon.icon className={s['platform']} />
    </ButtonLink>
  )
}

export const DownloadLink: React.FC<Partial<NavLinkProps>> = ({
  children,
  ...rest
}) => {
  const [platform, setPlatform] = useState<string | null>(null)

  useEffect(() => {
    if (!isServer) {
      setPlatform(getPlatform())
    }
  }, [])

  if (!platform) return null
  const platformIcon = availablePlatforms[platform]
  if (!platformIcon) return null

  return (
    <NavLink
      {...rest}
      href={platformIcon.downloadSource}
      target="_blank"
      download
    >
      {children}

      <platformIcon.icon className={s['platform']} />
    </NavLink>
  )
}
