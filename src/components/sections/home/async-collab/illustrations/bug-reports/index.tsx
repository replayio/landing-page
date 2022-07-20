import clsx from 'clsx'
import { FC, useEffect, useRef, useState } from 'react'

import { IsoLogo } from '~/components/primitives/logo'
import { useGsapTime } from '~/hooks/use-gsap-time'
import { useIntersectionObserver } from '~/hooks/use-intersection-observer'
import { Flip, gsap } from '~/lib/gsap'
import { padZeroesToNumber } from '~/lib/utils'

import s from './bug-reports.module.scss'

type BugItemProps = {
  id: string
  hidden?: boolean
  title: string
  color: 'violet' | 'red' | 'light-blue'
  addon: { type: 'badge'; arg?: 'error' } | { type: 'report'; arg: number }
  status?: 'active' | 'exiting'
  debug?: boolean
} & JSX.IntrinsicElements['div']

const BugItem: FC<BugItemProps> = ({
  title,
  color,
  addon,
  hidden,
  status,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={clsx(s['bug-item'], status && s[status], {
        [s['hidden']]: hidden
      })}
    >
      <span className={clsx(s['color'], s[color])} />
      <p className={s['title']}>{title}</p>
      <div className={s['addon']}>
        {addon.type === 'badge' && <span className={s['badge']}>Error</span>}
        {addon.type === 'report' && (
          <span className={s['report']}>
            <span className={s['icon']}>
              <IsoLogo />
            </span>
            <span className={s['number']}>
              {padZeroesToNumber(addon.arg, 3)}
            </span>
          </span>
        )}
      </div>
    </div>
  )
}

const getId = (title: string, timebased = false) => {
  const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-')

  return 'bug-report-' + slug + (timebased ? `-${new Date().getTime()}` : '')
}

const reports: Pick<BugItemProps, 'title' | 'color' | 'addon'>[] = [
  {
    title: '“Add to cart” fails when user submits.',
    color: 'red',
    addon: { type: 'badge' }
  },
  {
    title: 'Hoverboard flickers when flipping.',
    color: 'violet',
    addon: { type: 'report', arg: 2 }
  },
  {
    title: 'Hoverboard should change color mid flip.',
    color: 'light-blue',
    addon: { type: 'report', arg: 3 }
  },
  {
    title: "Color picker doesn't affect the hoverboard",
    color: 'red',
    addon: { type: 'badge' }
  },
  {
    title: 'Text is not selectable',
    color: 'red',
    addon: { type: 'report', arg: 4 }
  }
]

export const BugReports = () => {
  const [ref, { inView }] = useIntersectionObserver({ triggerOnce: false })
  const bugGridRef = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)
  const locked = useRef(false)

  const [infiniteReports, setInfiniteReports] = useState(() =>
    reports.map((report) => ({
      ...report,
      id: getId(report.title)
    }))
  )

  const remove = (
    element: HTMLElement,
    item: typeof infiniteReports[number]
  ) => {
    if (locked.current) return

    const state = Flip.getState(bugGridRef.current?.children || [])

    gsap.set(element, {
      display: 'none'
    })

    const timeline = Flip.from(state, {
      absolute: true,
      ease: 'power1.inOut',
      targets: bugGridRef.current?.children,
      scale: true,
      simple: true,
      onStart: () => {
        locked.current = true
      },
      onComplete: () => {
        locked.current = false
      },
      onLeave: (elements) => {
        return gsap.to(elements, {
          opacity: 0
        })
      }
    })

    const remainingReports = infiniteReports.filter(
      (_item) => _item.id !== item.id
    )

    const nextRandomReport =
      reports[Math.floor(Math.random() * (reports.length - 1))]

    remainingReports.push({
      ...nextRandomReport,
      id: getId(nextRandomReport.title, true)
    })

    timeline.add(() => {
      setInfiniteReports(remainingReports)
    })
  }

  const time = useGsapTime({
    duration: 2,
    loop: true,
    onComplete: () => {
      if (infiniteReports[0].id) {
        const element = document.querySelector(
          '#' + infiniteReports[0].id
        ) as HTMLElement

        if (element) {
          remove(element, infiniteReports[0])
        }
      }
    }
  })

  useEffect(() => {
    if (!isHovering.current && inView) {
      time.start()
    } else if (!inView) {
      time.pause()
    }

    return time.pause
  }, [time, inView])

  return (
    <div className={s['bug-reports']} ref={ref}>
      <div className={s['bottom-gradient']} />

      <div
        onMouseEnter={() => {
          isHovering.current = true
          time.pause()
        }}
        onMouseLeave={() => {
          isHovering.current = false
          time.resume()
        }}
        className={s['bug-grid']}
        ref={bugGridRef}
      >
        {infiniteReports.map((r) => {
          return (
            <BugItem
              {...r}
              id={r.id}
              onClick={(e) => {
                remove(e.currentTarget, r)
              }}
              key={r.id}
            />
          )
        })}
      </div>
    </div>
  )
}
