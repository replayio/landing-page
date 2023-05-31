import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'

import { Arrows } from '~/components/common/arrows'
import { Section } from '~/components/common/section'
import { TabsWithArrows } from '~/components/common/tabsWithArrows'
import { ButtonLink } from '~/components/primitives/cta'
import { NavLink } from '~/components/primitives/nav-link'
import { TitleAndSubtitle } from '~/components/primitives/texts'
import { useTabletLgBreakpoint } from '~/hooks/use-media'

import s from './fundamentals.module.scss'

export const Fundamentals = () => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>(
    data[0]?.id || 'record-runtime'
  )
  const currentTabIndex = data.findIndex(
    (item) => item.id === selectedFeatureId
  )
  const [emblaRef, embla] = useEmblaCarousel({ align: 'center' })
  const isTablet = useTabletLgBreakpoint()

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedFeatureId(data[embla.selectedScrollSnap()]?.id as string)
  }, [embla])

  const scrollTo = useCallback(
    (index: number) => embla && embla.scrollTo(index),
    [embla]
  )

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on('select', onSelect)
  }, [embla, onSelect])

  useEffect(() => {
    embla?.reInit()
  }, [isTablet, embla])

  const prevCard = () => {
    const findFeatureIndex: number = data.findIndex(
      (item) => item.id === selectedFeatureId
    )

    if (data[findFeatureIndex - 1]) {
      setSelectedFeatureId(data[findFeatureIndex - 1]?.id as string)
    }
  }

  const nextCard = () => {
    const findFeatureIndex: number = data.findIndex(
      (item) => item.id === selectedFeatureId
    )

    if (data[findFeatureIndex + 1] !== undefined) {
      setSelectedFeatureId(data[findFeatureIndex + 1]?.id as string)
    }
  }

  return (
    <Section
      id="time-travel-fundamentals"
      className={s.section}
      data-sitemap
      data-sitemap-icon="fundamentals"
      data-sitemap-short-title="Fundamentals"
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

      <TabsWithArrows
        tabs={data.map((item) => ({
          id: item.id,
          label: item.label,
          onClick: () => setSelectedFeatureId(item.id)
        }))}
        currentTabIndex={currentTabIndex}
        onChange={(index) => {
          if (index !== undefined) {
            scrollTo(index)
          }
        }}
        withArrows={!isTablet}
        arrowProps={{
          label: 'feature',
          onPrev: prevCard,
          onNext: nextCard,
          prevDisabled: selectedFeatureId === data[0]?.id,
          nextDisabled: selectedFeatureId === data[data.length - 1]?.id
        }}
        className={s.tabs}
      />

      <div className={s.embla} ref={emblaRef}>
        <div className={clsx(s.emblaContainer, 'emblaContainer')}>
          {data.map((item) => (
            <div
              key={item.id}
              className={clsx(s.emblaSlide, 'emblaSlide', {
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
            label="feature"
            onPrev={prevCard}
            onNext={nextCard}
            prevDisabled={selectedFeatureId === data[0]?.id}
            nextDisabled={selectedFeatureId === data[data.length - 1]?.id}
          />
        )}
      </div>
    </Section>
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
