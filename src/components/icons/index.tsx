import ArrowIcon from './arrow'
import ChevronIcon from './chevron'

export const IconsLibrary = {
  arrow: <ArrowIcon />,
  chevron: <ChevronIcon />
}

export type IconNames = keyof typeof IconsLibrary

export { ArrowIcon }
