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

import { Debugging, RecordRandomness, RecordRuntime } from './assets'
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
      data-sitemap-complete-title="What is time travel?"
    >
      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Time travel fundamentals.', as: 'h2' }}
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
    label: 'What is time travel?',
    title: (
      <>
        Don't record your app. <span>Record your runtime.</span>
      </>
    ),
    description: (
      <>
        <p>
          Time travel refers to the ability to record and deterministically
          replay the runtime down to the event loop and microtask queue.
        </p>
        <p>
          In order to pull this off, the runtime needs to think it’s running on
          the original computer at the original time.
        </p>
      </>
    ),
    Asset: RecordRuntime,
    cta: {
      href: 'https://medium.com/replay-io/how-replay-works-5c9c29580c58',
      label: 'How Replay works'
    },
    videoHref: '/'
  },
  {
    id: 'Record-randomness',
    label: 'How does it work?',
    title: (
      <>
        Record the randomness. <span> Replay the rest.</span>
      </>
    ),
    description: (
      <>
        <p>
          99.9% of compute is deterministic and does not need to be recorded.
          The challenge with recording Chrome is knowing how to capture the .1%
          that's non-deterministic.
        </p>
        <p>
          Because 99.9% of compute is deterministic, time travel has the ability
          to be incredibly lightweight, lossless, and capable of post-hoc
          dynamic analysis.
        </p>
      </>
    ),
    Asset: RecordRandomness,
    cta: {
      href: 'https://medium.com/replay-io/the-replayability-roadmap-c1d674fee576',
      label: 'Replayability roadmap'
    },
    videoHref: '/'
  },
  {
    id: 'debugging-database',
    label: "What's possible?",
    title: (
      <>
        Debugging <span>as a database.</span>
      </>
    ),
    description: (
      <>
        <p>
          Breakpoint debugging lets you pause a program at a point in time and
          explore the current state. Time travel debugging lets you pause at any
          point in time and explore.
        </p>
        <p>
          At a higher-level, time travel lets you query the state of the program
          across time. This is how we build Replay DevTools and how anyone can
          extend our protocol to build even more futuristic DevTools.
        </p>
      </>
    ),
    Asset: Debugging,
    cta: {
      href: 'https://blog.replay.io/how-we-rebuilt-react-devtools-with-replay-routines',
      label: 'How we built React DevTools '
    },
    videoHref: '/'
  }
]
