import React from 'react'

import ChevronIcon from '~/components/icons/chevron'

import s from './arrows.module.scss'

export const Arrows = ({
  label = '',
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false
}: {
  label?: string
  prevDisabled?: boolean
  nextDisabled?: boolean
  onPrev: () => void
  onNext: () => void
}) => {
  return (
    <div className={s.arrowsWrapper}>
      <button
        type="button"
        aria-label={`Previous ${label}`}
        disabled={prevDisabled}
        onClick={prevDisabled ? undefined : onPrev}
      >
        <ChevronIcon />
      </button>
      <button
        type="button"
        aria-label={`Next ${label}`}
        disabled={nextDisabled}
        onClick={nextDisabled ? undefined : onNext}
      >
        <ChevronIcon />
      </button>
    </div>
  )
}
