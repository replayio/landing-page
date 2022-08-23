import { ResizeObserver } from '@juggle/resize-observer'
import clsx from 'clsx'
import { FC } from 'react'
import useMeasure from 'react-use-measure'

import s from './inspect-box.module.scss'

type InspectBoxProps = {
  boxId: string
  name: string
} & JSX.IntrinsicElements['div']

export const InspectBox: FC<InspectBoxProps> = ({
  boxId,
  name,
  className,
  children,
  ...rest
}) => {
  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver })

  return (
    <div
      data-box-id={boxId}
      className={clsx(s['inspect-box'], className)}
      {...rest}
      ref={ref}
    >
      {children}
      <span className={s['info']}>
        {name} | {bounds.width.toFixed(0)}px x {bounds.height.toFixed(0)}px
      </span>
    </div>
  )
}
