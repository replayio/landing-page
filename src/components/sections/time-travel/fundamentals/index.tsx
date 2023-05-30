import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Section } from '~/components/common/section'
import ChevronIcon from '~/components/icons/chevron'
import { ButtonLink } from '~/components/primitives/cta'
import { NavLink } from '~/components/primitives/nav-link'
import { TitleAndSubtitle } from '~/components/primitives/texts'
import { useTabletLgBreakpoint } from '~/hooks/use-media'

import s from './fundamentals.module.scss'

export const Fundamentals = () => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>(
    data[0]?.id || 'record-runtime'
  )
  const [emblaRef, embla] = useEmblaCarousel({ align: 'center' })
  const isTablet = useTabletLgBreakpoint()
  const activeBarRef = useRef<HTMLDivElement>(null)

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedFeatureId(data[embla.selectedScrollSnap()]?.id as string)
  }, [embla])

  const scrollTo = useCallback(
    (index: number) => embla && embla.scrollTo(index),
    [embla]
  )
  useEffect(() => {
    if (!activeBarRef.current) return

    const findFeature = data.find((item) => item.id === selectedFeatureId)
    const findFeatureIndex = data.findIndex(
      (item) => item.id === selectedFeatureId
    )

    if (!findFeature) return

    const findLabelElement: any = document.querySelector(`#${findFeature.id}`)
    const labelElementComputedStyle = getComputedStyle(findLabelElement)

    const labelElementWithoutPadding =
      findLabelElement.clientWidth -
      parseFloat(labelElementComputedStyle.paddingRight) -
      parseFloat(labelElementComputedStyle.paddingLeft)

    activeBarRef.current.style.width = `${labelElementWithoutPadding}px`

    if (findFeatureIndex === 0) {
      activeBarRef.current.style.left = `${findLabelElement.offsetLeft}px`
    } else {
      activeBarRef.current.style.left = `${
        findLabelElement.offsetLeft +
        parseFloat(labelElementComputedStyle.paddingLeft)
      }px`
    }

    scrollTo(findFeatureIndex)
  }, [selectedFeatureId, isTablet, scrollTo])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on('select', onSelect)
  }, [embla, onSelect])

  useEffect(() => {
    embla?.reInit()
  }, [isTablet, embla])

  return (
    <Section
      id="homepage-bugs-slider"
      className={s.section}
      data-sitemap
      data-sitemap-icon="fundamentals"
      data-sitemap-short-title="fundamentals"
      data-sitemap-complete-title="The fundamentals of time travel"
    >
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'The fundamentals of time travel', as: 'h2' }}
        subtitle={{
          children:
            'Time travel  is an idea that is as old as time. We believe that it is finally time for it to take off.',
          className: s.subtitle
        }}
      />

      <div className={s.filterWrapper}>
        <div className={s.activeBar} ref={activeBarRef} />

        <div className={s.labelsWrapper}>
          {data.map((item) => (
            <button
              key={item.id}
              id={item.id}
              type="button"
              aria-label={item.label}
              onClick={() => setSelectedFeatureId(item.id)}
              className={clsx({
                [s.active as string]: item.id === selectedFeatureId
              })}
            >
              {item.label}
            </button>
          ))}
        </div>

        {!isTablet && (
          <Arrows
            selectedFeatureId={selectedFeatureId}
            handleSelctedFeature={(id) => setSelectedFeatureId(id)}
          />
        )}
      </div>

      <div className={s.embla} ref={emblaRef}>
        <div className={s.emblaContainer}>
          {data.map((item) => (
            <div
              key={item.id}
              className={clsx(s.emblaSlide, {
                [s.active as string]: item.id === selectedFeatureId
              })}
            >
              <div
                className={s.card}
                onClick={() => {
                  if (item.id !== selectedFeatureId) {
                    setSelectedFeatureId(item.id)
                  }
                }}
              >
                <InfoSide isTablet={Boolean(isTablet)} {...item} />

                {!isTablet && <item.Asset />}
              </div>
            </div>
          ))}
        </div>

        {isTablet && (
          <Arrows
            selectedFeatureId={selectedFeatureId}
            handleSelctedFeature={(id) => setSelectedFeatureId(id)}
          />
        )}
      </div>
    </Section>
  )
}

const Arrows = ({
  selectedFeatureId,
  handleSelctedFeature
}: {
  selectedFeatureId: string
  handleSelctedFeature: (id: string) => void
}) => {
  return (
    <div className={s.arrowsWrapper}>
      <button
        type="button"
        aria-label="Previous feature"
        disabled={selectedFeatureId === data[0]?.id}
        onClick={() => {
          const findFeatureIndex: number = data.findIndex(
            (item) => item.id === selectedFeatureId
          )

          if (data[findFeatureIndex - 1]) {
            handleSelctedFeature(data[findFeatureIndex - 1]?.id as string)
          }
        }}
      >
        <ChevronIcon />
      </button>
      <button
        type="button"
        aria-label="Next feature"
        disabled={selectedFeatureId === data[data.length - 1]?.id}
        onClick={() => {
          const findFeatureIndex: number = data.findIndex(
            (item) => item.id === selectedFeatureId
          )

          if (data[findFeatureIndex + 1] !== undefined) {
            handleSelctedFeature(data[findFeatureIndex + 1]?.id as string)
          }
        }}
      >
        <ChevronIcon />
      </button>
    </div>
  )
}

const InfoSide = ({
  isTablet,
  title,
  Asset,
  description,
  cta
}: DataType & { isTablet: boolean }) => {
  return (
    <div className={s.infoSide}>
      {isTablet && <Asset />}
      <p className={s.title}>{title}</p>

      <div className={s.description}>{description}</div>
      <div className={s.links}>
        {isTablet ? (
          <ButtonLink
            mode="secondary"
            href={cta.href}
            className={s.cta}
            iconSuffix="arrow"
            aria-label={cta.label}
          >
            {cta.label}
          </ButtonLink>
        ) : (
          <NavLink
            className={s['link']}
            href={cta.href}
            iconSuffix="arrow"
            invertedHover
          >
            {cta.label}
          </NavLink>
        )}
      </div>
    </div>
  )
}

const RecordRuntime = () => {
  return (
    <div className={s.recordRuntime}>
      <AssetSideBox className={s.recordRuntime}>
        <p>RecordRuntime</p>
      </AssetSideBox>
    </div>
  )
}

const RecordRandomness = () => {
  return (
    <AssetSideBox className={s.recordRuntime}>
      <p>RecordRuntime</p>
    </AssetSideBox>
  )
}

const Debugging = () => {
  return (
    <AssetSideBox className={s.recordRuntime}>
      <p>RecordRuntime</p>
    </AssetSideBox>
  )
}

const AssetSideBox = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={s.assetSide}>
      <div className={clsx(s.assetWrapper, className)}>
        <div className={s.assetTab}>
          <span />
          <span />
          <span />
        </div>
        <div className={s.assetContent}>{children}</div>
      </div>
    </div>
  )
}

type DataType = {
  id: string
  label: string
  title: React.ReactNode
  description: React.ReactNode
  Asset: React.FC
  cta: {
    href: string
    label: string
  }
  videoHref: string
}

const data: DataType[] = [
  {
    id: 'record-runtime',
    label: 'Runtime',
    title: (
      <>
        Record the runtime <span>not the application.</span>
      </>
    ),
    description: (
      <>
        <p>
          Time travel is not about recording and replaying user actions. Time
          travel is about recording and deterministically replaying the runtime
          down to the event loop and microtask queue.
        </p>
        <p>
          When <span>Replay.io</span> replays a runtime, the browser thinks it’s
          running on the original computer, at the original time, with the
          original user. In reality it’s running in the simulation, a virtual
          environment with perfect emulation.
        </p>
      </>
    ),
    Asset: RecordRuntime,
    cta: {
      href: '/',
      label: 'Learn more'
    },
    videoHref: '/'
  },
  {
    id: 'Record-randomness',
    label: 'Randomness',
    title: (
      <>
        Record the randomness <span> replay the rest.</span>
      </>
    ),
    description: (
      <>
        <p>
          Fibonacci is deterministic so it does not need to be recorded. It can
          be simply be re-run. The challenge with recording and replaying a
          runtime like Chrome is knowing how to record the randomness and replay
          it later.
        </p>
        <p>
          Record + Replay has three benefits over traditional instrumentation
          approaches. It’s light weight because 99.9% of compute is
          deterministic. The entire execution trace and application state is
          available. It’s possible to perform dynamic analysis after the fact.
          See our replayability roadmap.
        </p>
      </>
    ),
    Asset: RecordRandomness,
    cta: {
      href: '/',
      label: 'See our replayability roadmap'
    },
    videoHref: '/'
  },
  {
    id: 'debugging-database',
    label: 'Debugging',
    title: (
      <>
        Debugging <span>as a database.</span>
      </>
    ),
    description: (
      <>
        <p>
          Breakpoint debugging is all about pausing a program at a point in time
          and exploring the current state. Time travel debugging lets you look
          at the program at any point in time.
        </p>
        <p>
          At a higher-level, time travel debugging lets anyone build DevTools
          that can query the state of the program across time. This is how we
          build React DevTools and the Cypress Panel and how anyone can extend
          our protocol to build next-generation UIs.
        </p>
      </>
    ),
    Asset: Debugging,
    cta: {
      href: '/',
      label: 'Learn more'
    },
    videoHref: '/'
  }
]
