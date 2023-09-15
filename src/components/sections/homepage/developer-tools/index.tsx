/* eslint-disable simple-import-sort/imports */
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import { gsap } from 'lib/gsap'
import { omit } from 'lodash'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { AspectBox } from '~/components/common/aspect-box'
import { Timeline } from '~/components/common/progress-bar'
import { ArrowIcon } from '~/components/icons'
import { Section } from '~/components/layout/section'
import { NavLink } from '~/components/primitives/nav-link'
import { TitleAndSubtitle } from '~/components/primitives/texts'
import { useDeviceDetect } from '~/hooks/use-device-detect'
import { useIntersectionObserver } from '~/hooks/use-intersection-observer'
import { useTabletBreakpoint } from '~/hooks/use-media'
import { useMouseTracker } from '~/hooks/use-mouse-tracker'
import { padZeroes, toperc } from '~/lib/utils'

/* -- Images High Res -- */
/* React Inspector */
import reactInspectorCode from '~/images/homepage/devtools-high-res/react-inspector_code.png'
import reactInspectorInspector from '~/images/homepage/devtools-high-res/react-inspector_inspector.png'
import reactInspectorReplay from '~/images/homepage/devtools-high-res/react-inspector_replay.png'

/* Console Logs */
import consoleLogsCode from '~/images/homepage/devtools-high-res/console-logs_code.png'
import consoleLogsConsole from '~/images/homepage/devtools-high-res/console-logs_console.png'
import consoleLogsReplay from '~/images/homepage/devtools-high-res/console-logs_replay.png'

/* Tests */
import testsCode from '~/images/homepage/devtools-high-res/tests_code.png'
import testsReplay from '~/images/homepage/devtools-high-res/tests_replay.png'
import testsSuite from '~/images/homepage/devtools-high-res/tests_suite.png'
import testsInspector from '~/images/homepage/devtools-high-res/tests_inspector.png'

/* Events */
import eventsCode from '~/images/homepage/devtools-high-res/events_code.png'
import eventsReplay from '~/images/homepage/devtools-high-res/events_replay.png'
import eventsInspector from '~/images/homepage/devtools-high-res/events_inspector.png'
import eventsEvents from '~/images/homepage/devtools-high-res/events_events.png'

/* Network */
import networkCode from '~/images/homepage/devtools-high-res/network_code.png'
import networkReplay from '~/images/homepage/devtools-high-res/network_replay.png'
import networkInspector from '~/images/homepage/devtools-high-res/network_inspector.png'

/* Mobile */
import networkMobile from '~/images/homepage/devtools-high-res/network_mobile.png'
import reactInspectorMobile from '~/images/homepage/devtools-high-res/react-inspector_mobile.png'
import testsMobile from '~/images/homepage/devtools-high-res/tests_mobile.png'
import consoleLogsMobile from '~/images/homepage/devtools-high-res/console-logs_mobile.png'
import eventsMobile from '~/images/homepage/devtools-high-res/events_mobile.png'

import s from './developer-tools.module.scss'

type PanelWrapper = (props: Partial<ImageProps>) => JSX.Element

type ColConfig = Omit<JSX.IntrinsicElements['div'], 'children'> & {
  children: PanelWrapper[] | PanelWrapper
}

const PANELS_CONTAINER_WIDTH = 1216

const topanelperc = (px: number) => toperc(px, PANELS_CONTAINER_WIDTH)

const chunks: {
  mobilePanel?: PanelWrapper
  panels?: ColConfig[]
  title: string
  shortTitle: string
  description: string
  link: string
}[] = [
  {
    mobilePanel: ({ className, ...props }) => (
      <Image
        {...props}
        className={clsx(s['mobile-panel'], className)}
        src={reactInspectorMobile}
        quality={100}
        alt="code panel"
      />
    ),
    panels: [
      {
        style: { width: topanelperc(522) },
        children: (props) => (
          <Image
            {...props}
            className={s['panel']}
            src={reactInspectorCode}
            alt="code panel"
            quality={100}
            draggable={false}
          />
        )
      },
      {
        style: { width: topanelperc(681) },
        children: [
          ({ ...props }) => (
            <Image
              {...props}
              className={s['panel']}
              src={reactInspectorReplay}
              alt="app panel"
              quality={100}
              draggable={false}
            />
          ),
          (props) => (
            <Image
              {...props}
              className={clsx(s['panel'], s['highlight-panel'])}
              src={reactInspectorInspector}
              alt="code panel"
              quality={100}
              draggable={false}
            />
          )
        ]
      }
    ],
    title: 'Inspect React components',
    shortTitle: 'React DevTools',
    description:
      'Whether you’re using context, state, or hooks, Replay gives you the tools to inspect your components and see why they rendered.',
    link: 'https://docs.replay.io/reference-guide/react'
  },
  {
    mobilePanel: ({ className, ...props }) => (
      <Image
        {...props}
        className={clsx(s['mobile-panel'], className)}
        quality={100}
        src={consoleLogsMobile}
        alt="code panel"
      />
    ),
    panels: [
      {
        style: { width: topanelperc(585) },
        children: (props) => (
          <Image
            {...props}
            className={clsx(s['panel'], s['highlight-panel'])}
            src={consoleLogsCode}
            alt="code panel"
            quality={100}
            draggable={false}
          />
        )
      },
      {
        style: { width: topanelperc(618) },
        children: [
          ({ ...props }) => (
            <Image
              {...props}
              className={s['panel']}
              src={consoleLogsReplay}
              alt="app panel"
              quality={100}
              draggable={false}
            />
          ),
          (props) => (
            <Image
              {...props}
              className={s['panel']}
              src={consoleLogsConsole}
              alt="code panel"
              quality={100}
              draggable={false}
            />
          )
        ]
      }
    ],
    title: 'Retroactive console logs',
    shortTitle: 'Console logs',
    description:
      'Adding console logs is as simple as clicking on a line of code and adding an expression.',
    link: 'https://docs.replay.io/reference-guide/print-statements'
  },
  {
    mobilePanel: ({ className, ...props }) => (
      <Image
        {...props}
        className={clsx(s['mobile-panel'], className)}
        src={testsMobile}
        quality={100}
        alt="code panel"
      />
    ),
    panels: [
      {
        style: { width: topanelperc(270) },
        children: (props) => (
          <Image
            {...props}
            className={clsx(s['panel'], s['highlight-panel'])}
            src={testsSuite}
            alt="code panel"
            quality={100}
            draggable={false}
          />
        )
      },
      {
        style: { width: topanelperc(448) },
        children: (props) => (
          <Image
            {...props}
            className={s['panel']}
            src={testsCode}
            alt="app panel"
            quality={100}
            draggable={false}
          />
        )
      },
      {
        style: { width: topanelperc(474) },
        children: [
          (props) => (
            <Image
              {...props}
              className={s['panel']}
              src={testsReplay}
              alt="app panel"
              quality={100}
              draggable={false}
            />
          ),
          (props) => (
            <Image
              {...props}
              className={s['panel']}
              src={testsInspector}
              alt="code panel"
              quality={100}
              draggable={false}
            />
          )
        ]
      }
    ],
    title: 'De-flake your tests',
    shortTitle: 'Test panel',
    description:
      'With built-in support for Cypress and Playwright, you can jump to steps and into your application event handlers.',
    link: 'https://docs.replay.io/reference-guide/cypress-panel'
  },
  {
    mobilePanel: ({ className, ...props }) => (
      <Image
        {...props}
        className={clsx(s['mobile-panel'], className)}
        src={eventsMobile}
        quality={100}
        alt="code panel"
      />
    ),
    panels: [
      {
        style: { width: topanelperc(242) },
        children: (props) => (
          <Image
            {...props}
            className={clsx(s['panel'], s['highlight-panel'])}
            src={eventsEvents}
            alt="code panel"
            quality={100}
            draggable={false}
          />
        )
      },
      {
        style: { width: topanelperc(412) },
        children: (props) => (
          <Image
            {...props}
            className={s['panel']}
            src={eventsCode}
            alt="code panel"
            quality={100}
            draggable={false}
          />
        )
      },
      {
        style: { width: topanelperc(540) },
        children: [
          ({ ...props }) => (
            <Image
              {...props}
              className={s['panel']}
              src={eventsReplay}
              alt="code panel"
              quality={100}
              draggable={false}
            />
          ),
          (props) => (
            <Image
              {...props}
              className={s['panel']}
              src={eventsInspector}
              alt="code panel"
              quality={100}
              draggable={false}
            />
          )
        ]
      }
    ],
    title: 'Time travel to any point',
    shortTitle: 'Time travel',
    description:
      'When you start jumping to Console logs, React events, and Redux actions, you become a time traveler.',
    link: 'https://docs.replay.io/reference-guide/events#b1a0e7f432f5426888b80e9b00e7b226'
  },
  {
    mobilePanel: ({ className, ...props }) => (
      <Image
        {...props}
        className={clsx(s['mobile-panel'], className)}
        src={networkMobile}
        quality={100}
        alt="code panel"
      />
    ),
    panels: [
      {
        style: { width: topanelperc(521) },
        children: (props) => (
          <Image
            {...props}
            className={s['panel']}
            src={networkCode}
            alt="code panel"
            quality={100}
            draggable={false}
          />
        )
      },
      {
        style: { width: topanelperc(683) },
        children: [
          ({ ...props }) => (
            <Image
              {...props}
              className={s['panel']}
              src={networkReplay}
              alt="app panel"
              quality={100}
              draggable={false}
            />
          ),
          (props) => (
            <Image
              {...props}
              className={clsx(s['panel'], s['highlight-panel'])}
              src={networkInspector}
              alt="code panel"
              quality={100}
              draggable={false}
            />
          )
        ]
      }
    ],
    title: 'Powerful Browser DevTools',
    shortTitle: 'DevTools',
    description:
      'Inspect UI elements, Network events, Console logs, Call Stacks, and Scopes at any point in time.',
    link: 'https://docs.replay.io/reference-guide'
  }
]

export const DeveloperTools = () => {
  const isTablet = useTabletBreakpoint()
  const { isDesktop } = useDeviceDetect()
  const [emblaRef, embla] = useEmblaCarousel({ align: 'start' })
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inViewRef, { inView }] = useIntersectionObserver<HTMLDivElement>({})

  const [activeChunk, setActiveChunk] = useState(0)
  const devtoolsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inView) {
      document.documentElement.classList.add('hide-header')
    } else {
      document.documentElement.classList.remove('hide-header')
    }
    return () => {
      document.documentElement.classList.remove('hide-header')
    }
  }, [inView])

  const { elementRef: mouseTrackedElementRef } =
    useMouseTracker<HTMLDivElement>({
      enableOnlyWhenHovering: true,
      centered: true,
      onLeave: () => {
        gsap.to([devtoolsRef.current], {
          ease: 'power2.out',
          overwrite: true,
          duration: 0.75,
          '--local-rotation-y': '0deg',
          '--local-rotation-x': '0deg'
        })
      },
      onChange: (data) => {
        gsap.to([devtoolsRef.current], {
          overwrite: 'auto',
          duration: 0.15,
          '--local-rotation-y': data.normalized.x * (360 * 0.05) + 'deg',
          '--local-rotation-x': data.normalized.y * (360 * 0.05) + 'deg'
        })
      }
    })

  useEffect(() => {
    if (!devtoolsRef.current || !isDesktop) return

    const progress = { value: 0 }

    const tl = gsap.fromTo(
      progress,
      {
        value: 0
      },
      {
        ease: 'none',
        duration: 10,
        repeat: -1,
        value: Math.PI * 2,
        onUpdate: () => {
          const x = Math.cos(progress.value)
          const y = Math.sin(progress.value)

          gsap.set([devtoolsRef.current], {
            overwrite: 'auto',
            '--global-rotation-y': x * 5 + 'deg',
            '--global-rotation-x': y * 5 + 'deg'
          })
        }
      }
    )

    return () => {
      tl.kill()
    }
  }, [isDesktop])

  useEffect(() => {
    if (isTablet) {
      embla?.reInit()
    } else if (!isTablet) {
      embla?.destroy()
    }
  }, [isTablet, embla])

  useEffect(() => {
    if (!embla) return

    embla.on('select', () => {
      const index = embla.selectedScrollSnap()

      setActiveChunk(index)
    })
  }, [embla])

  useEffect(() => {
    if (!embla) return

    embla.scrollTo(activeChunk)
  }, [activeChunk, embla])

  const handleComplete = () => {
    setActiveChunk((prev) => (prev + 1) % chunks.length)
  }

  const renderPanels = (panels: ColConfig[]) => {
    let count = 0

    const renderPanel = (
      panel: PanelWrapper | PanelWrapper[]
    ): React.ReactNode => {
      if (Array.isArray(panel)) {
        return panel.map(renderPanel)
      }

      const key = count

      count++

      return panel({
        key,
        style: {
          // @ts-ignore
          '--delay-factor': key
        }
      })
    }

    const rendered = panels
      .map((c) => c.children)
      .map((c) => renderPanel(c))
      .map((panel, idx) => (
        <div className={s['col']} {...omit(panels[idx], 'children')} key={idx}>
          {panel}
        </div>
      ))

    return rendered
  }

  return (
    <Section
      ref={sectionRef}
      id="homepage-developer-tools"
      className={s['section']}
      data-sitemap
      data-sitemap-icon="debugging"
      data-sitemap-short-title="Replay"
      data-sitemap-complete-title="Next Gen Browser DevTools."
    >
      <div className={s['container']}>
        <TitleAndSubtitle
          title={{
            as: 'h2',
            children: 'Zero in on Every Root Cause'
          }}
          subtitle={{
            children: (
              <span>
                Replay DevTools is the debugging experience you've always wanted, but never believed was possible.
                Stop constantly adding logs and retrying.  Never step past the point you wanted to stop at.
                You can easily trace any problem back to its root cause, no matter how complex or timing sensitive.
              </span>
            )
          }}
        />

        <div className={s['main']}>
          <BackLines />
          <div className={s['mobile-wrapper']}>
            <AspectBox ratio={335 / 191} className={s['inner']}>
              {chunks.map((chunk, idx) => {
                return chunk.mobilePanel?.({
                  key: idx,
                  className: clsx({
                    [s['active'] as string]: idx === activeChunk
                  })
                })
              })}
            </AspectBox>
          </div>

          <div
            className={s['perspective-container']}
            ref={mouseTrackedElementRef}
          >
            <div
              className={s['wrapper']}
              // @ts-ignore
              style={{ '--raw-ratio': 1264 / 674 }}
              ref={devtoolsRef}
            >
              <AspectBox ratio={1264 / 674} className={s['devtools']}>
                <SVGDashbaord className={s['dashboard']} />

                {chunks.map((chunk, idx) => {
                  return (
                    <div
                      className={clsx(s['panels'], {
                        [s['active'] as string]: activeChunk === idx
                      })}
                      key={idx}
                    >
                      {chunk.panels ? renderPanels(chunk.panels) : []}
                      <div className={clsx(s['overlay'])} />
                    </div>
                  )
                })}
              </AspectBox>
            </div>
          </div>
        </div>

        <div ref={inViewRef}>
          <div className={s['embla']} ref={emblaRef}>
            <div className={clsx(s['embla-container'], s['chunks'])}>
              {chunks.map((chunk, idx) => {
                const isActive = idx === activeChunk

                return (
                  <div
                    key={idx}
                    className={clsx(s['chunk'], s['embla-slide'], {
                      [s['active'] as string]: activeChunk === idx
                    })}
                  >
                    <button
                      className={s['head']}
                      onClick={() => {
                        setActiveChunk(idx)
                      }}
                      aria-label={chunk.title}
                    >
                      <div className={s['timeline']}>
                        <Timeline
                          duration={8}
                          loop={false}
                          playing={inView && activeChunk === idx}
                          onComplete={handleComplete}
                          primaryColor={
                            isActive ? 'var(--white)' : 'var(--blue-800)'
                          }
                          secondaryColor={'var(--blue-800)'}
                        />
                      </div>

                      <h3 className={s['title']}>
                        <span className={s['idx']}>
                          {padZeroes(idx + 1, 2)}.
                        </span>
                        {isActive ? chunk.title : chunk.shortTitle}
                      </h3>
                    </button>

                    <div className={s['body']}>
                      <p className={s['description']}>{chunk.description}</p>
                      <NavLink
                        invertedHover
                        href={chunk.link}
                        aria-label=""
                        className={s['learn-more']}
                        tabIndex={activeChunk === idx ? undefined : -1}
                      >
                        Learn more
                        <span className={s['arrow']}>
                          <ArrowIcon />
                        </span>
                      </NavLink>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

            <br></br>
            <br></br>
            <br></br>

      <TitleAndSubtitle
        className={s.titleAndSubtitle}
        title={{ children: 'Debug Test Failures Remotely', as: 'h2' }}
        subtitle={{
          children: (
            <span>
              Stop trying to locally reproduce test failures that happened in CI.
              With Replay you can directly debug test failures as if they happened on your own machine.
            <br></br>
            <br></br>
            <Link href="https://app.replay.io/team/new" aria-label="Create a team">
              Learn More
            </Link>
            </span>
          )
        }}
      />

     </Section>
  )
}

const BackLines = () => {
  const { isDesktop, isChrome } = useDeviceDetect()

  const loadHeavyFilters = isDesktop && isChrome

  return (
    <svg
      className={s['back-lines']}
      viewBox="0 0 1440 707"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter={loadHeavyFilters ? 'url(#filter0_ddd_2677_88836)' : undefined}>
        <path d="M1440 357.437L1 357.437" stroke="#F41C52" />
      </g>
      <g filter={loadHeavyFilters ? 'url(#filter1_ddd_2677_88836)' : undefined}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.000318527 446.444C109.023 427.94 405.552 390.937 719.584 390.937V391.937C405.616 391.937 109.145 428.933 0.16765 447.429L0.000318527 446.444ZM1439.67 446.444C1330.64 427.94 1034.12 390.937 720.084 390.937V391.937C1034.05 391.937 1330.52 428.933 1439.5 447.429L1439.67 446.444Z"
          fill="#F41C52"
        />
      </g>
      <g filter={loadHeavyFilters ? 'url(#filter2_ddd_2677_88836)' : undefined}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-14.0012 141.873C71.9179 189.754 338.971 285.437 720.242 285.437C1101.51 285.437 1368.57 189.754 1454.49 141.873L1454 141C1368.25 188.785 1101.37 284.437 720.242 284.437C339.113 284.437 72.2331 188.785 -13.5144 141L-14.0012 141.873Z"
          fill="#F41C52"
        />
      </g>
      <g filter={loadHeavyFilters ? 'url(#filter3_ddd_2677_88836)' : undefined}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-13.9993 569C71.9199 521.118 338.973 425.436 720.244 425.436C1101.52 425.436 1368.57 521.118 1454.49 569L1454 569.873C1368.25 522.088 1101.37 426.436 720.244 426.436C339.115 426.436 72.2351 522.088 -13.5125 569.873L-13.9993 569Z"
          fill="#F41C52"
        />
      </g>
      <g filter={loadHeavyFilters ? 'url(#filter4_ddd_2677_88836)' : undefined}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.000318527 265.93C109.023 284.433 405.552 321.437 719.584 321.437V320.437C405.616 320.437 109.145 283.44 0.16765 264.944L0.000318527 265.93ZM1439.67 265.93C1330.64 284.434 1034.12 321.437 720.084 321.437V320.437C1034.05 320.437 1330.52 283.44 1439.5 264.944L1439.67 265.93Z"
          fill="#F41C52"
        />
      </g>
      <g filter={loadHeavyFilters ? 'url(#filter5_ddd_2677_88836)' : undefined}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-14.3061 17.3955C86.095 95.1146 373.466 250.5 720 250.5C1066.53 250.5 1353.9 95.1146 1454.31 17.3955L1453.69 16.6047C1353.43 94.219 1066.27 249.5 720 249.5C373.734 249.5 86.5717 94.219 -13.6939 16.6047L-14.3061 17.3955Z"
          fill="#F41C52"
        />
      </g>
      <g filter={loadHeavyFilters ? 'url(#filter6_ddd_2677_88836)' : undefined}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-14.3061 690.105C86.095 612.386 373.466 457 720 457C1066.53 457 1353.9 612.386 1454.31 690.105L1453.69 690.896C1353.43 613.281 1066.27 458 720 458C373.734 458 86.5717 613.281 -13.6939 690.896L-14.3061 690.105Z"
          fill="#F41C52"
        />
      </g>
      <defs>
        <filter
          id="filter0_ddd_2677_88836"
          x="-15"
          y="340.937"
          width="1471"
          height="33.0002"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2677_88836"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2677_88836"
            result="effect2_dropShadow_2677_88836"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_2677_88836"
            result="effect3_dropShadow_2677_88836"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_2677_88836"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_ddd_2677_88836"
          x="-15.9997"
          y="374.937"
          width="1471.67"
          height="88.4929"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2677_88836"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2677_88836"
            result="effect2_dropShadow_2677_88836"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_2677_88836"
            result="effect3_dropShadow_2677_88836"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_2677_88836"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_ddd_2677_88836"
          x="-30.0012"
          y="125"
          width="1500.49"
          height="176.437"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2677_88836"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2677_88836"
            result="effect2_dropShadow_2677_88836"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_2677_88836"
            result="effect3_dropShadow_2677_88836"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_2677_88836"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_ddd_2677_88836"
          x="-29.9993"
          y="409.436"
          width="1500.49"
          height="176.437"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2677_88836"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2677_88836"
            result="effect2_dropShadow_2677_88836"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_2677_88836"
            result="effect3_dropShadow_2677_88836"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_2677_88836"
            result="shape"
          />
        </filter>
        <filter
          id="filter4_ddd_2677_88836"
          x="-15.9997"
          y="248.944"
          width="1471.67"
          height="88.4932"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2677_88836"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2677_88836"
            result="effect2_dropShadow_2677_88836"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_2677_88836"
            result="effect3_dropShadow_2677_88836"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_2677_88836"
            result="shape"
          />
        </filter>
        <filter
          id="filter5_ddd_2677_88836"
          x="-30.3061"
          y="0.604736"
          width="1500.61"
          height="265.895"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2677_88836"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2677_88836"
            result="effect2_dropShadow_2677_88836"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_2677_88836"
            result="effect3_dropShadow_2677_88836"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_2677_88836"
            result="shape"
          />
        </filter>
        <filter
          id="filter6_ddd_2677_88836"
          x="-30.3061"
          y="441"
          width="1500.61"
          height="265.896"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2677_88836"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2677_88836"
            result="effect2_dropShadow_2677_88836"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_2677_88836"
            result="effect3_dropShadow_2677_88836"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_2677_88836"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

const SVGDashbaord = (props: JSX.IntrinsicElements['svg']) => {
  return (
    <svg
      viewBox="0 0 1264 674"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1603_871)">
        <rect width="1264" height="674" fill="#081120" />
        <g clipPath="url(#clip1_1603_871)">
          <rect width="1264" height="48" fill="#0A111F" />
          <path
            d="M54.4382 31V17.9091H59.1044C60.1186 17.9091 60.9602 18.0838 61.6293 18.4332C62.3026 18.7827 62.8054 19.2663 63.1378 19.8842C63.4702 20.4979 63.6364 21.2074 63.6364 22.0128C63.6364 22.8139 63.468 23.5192 63.1314 24.1286C62.799 24.7337 62.2962 25.2045 61.6229 25.5412C60.9538 25.8778 60.1122 26.0462 59.098 26.0462H55.5632V24.3459H58.919C59.5582 24.3459 60.0781 24.2543 60.4787 24.071C60.8835 23.8878 61.1797 23.6214 61.3672 23.272C61.5547 22.9226 61.6484 22.5028 61.6484 22.0128C61.6484 21.5185 61.5526 21.0902 61.3608 20.728C61.1733 20.3658 60.8771 20.0888 60.4723 19.897C60.0717 19.701 59.5455 19.603 58.8935 19.603H56.4134V31H54.4382ZM60.9006 25.0938L64.1349 31H61.8849L58.7145 25.0938H60.9006ZM69.9949 31.1982C69.0275 31.1982 68.1944 30.9915 67.4956 30.5781C66.801 30.1605 66.264 29.5746 65.8848 28.8203C65.5098 28.0618 65.3223 27.1733 65.3223 26.1548C65.3223 25.1491 65.5098 24.2628 65.8848 23.4957C66.264 22.7287 66.7924 22.13 67.47 21.6996C68.1518 21.2692 68.9487 21.054 69.8606 21.054C70.4146 21.054 70.9515 21.1456 71.4714 21.3288C71.9913 21.5121 72.4579 21.7997 72.8713 22.1918C73.2846 22.5838 73.6106 23.093 73.8493 23.7195C74.0879 24.3416 74.2072 25.098 74.2072 25.9886V26.6662H66.4025V25.2344H72.3343C72.3343 24.7315 72.2321 24.2862 72.0275 23.8984C71.823 23.5064 71.5353 23.1974 71.1646 22.9716C70.7981 22.7457 70.3677 22.6328 69.8734 22.6328C69.3365 22.6328 68.8677 22.7649 68.4672 23.0291C68.0708 23.2891 67.764 23.63 67.5467 24.0518C67.3336 24.4695 67.2271 24.9233 67.2271 25.4134V26.532C67.2271 27.1882 67.3422 27.7464 67.5723 28.2067C67.8066 28.6669 68.1326 29.0185 68.5502 29.2614C68.9679 29.5 69.4558 29.6193 70.014 29.6193C70.3762 29.6193 70.7065 29.5682 71.0048 29.4659C71.3031 29.3594 71.5609 29.2017 71.7782 28.9929C71.9956 28.7841 72.1618 28.5263 72.2768 28.2195L74.0858 28.5455C73.9409 29.0781 73.6809 29.5447 73.3059 29.9453C72.9352 30.3416 72.4686 30.6506 71.9061 30.8722C71.3478 31.0895 70.7108 31.1982 69.9949 31.1982ZM76.3278 34.6818V21.1818H78.1942V22.7734H78.354C78.4648 22.5689 78.6246 22.3324 78.8335 22.0639C79.0423 21.7955 79.332 21.5611 79.7028 21.3608C80.0735 21.1562 80.5636 21.054 81.1729 21.054C81.9656 21.054 82.6729 21.2543 83.2951 21.6548C83.9173 22.0554 84.4052 22.6328 84.7589 23.3871C85.1168 24.1413 85.2958 25.049 85.2958 26.1101C85.2958 27.1712 85.119 28.081 84.7653 28.8395C84.4116 29.5937 83.9258 30.1754 83.3079 30.5845C82.69 30.9893 81.9847 31.1918 81.1921 31.1918C80.5955 31.1918 80.1076 31.0916 79.7283 30.8913C79.3533 30.6911 79.0593 30.4567 78.8462 30.1882C78.6332 29.9197 78.4691 29.6811 78.354 29.4723H78.239V34.6818H76.3278ZM78.2006 26.0909C78.2006 26.7812 78.3008 27.3864 78.5011 27.9062C78.7013 28.4261 78.9911 28.8331 79.3704 29.1271C79.7496 29.4169 80.2141 29.5618 80.7638 29.5618C81.3349 29.5618 81.8121 29.4105 82.1957 29.108C82.5792 28.8011 82.869 28.3857 83.065 27.8615C83.2653 27.3374 83.3654 26.7472 83.3654 26.0909C83.3654 25.4432 83.2674 24.8615 83.0714 24.3459C82.8796 23.8303 82.5898 23.4233 82.2021 23.125C81.8185 22.8267 81.3391 22.6776 80.7638 22.6776C80.2099 22.6776 79.7411 22.8203 79.3576 23.1058C78.9783 23.3913 78.6907 23.7898 78.4947 24.3011C78.2987 24.8125 78.2006 25.4091 78.2006 26.0909ZM89.3484 17.9091V31H87.4371V17.9091H89.3484ZM94.7768 31.2173C94.1547 31.2173 93.5922 31.1023 93.0893 30.8722C92.5865 30.6378 92.188 30.299 91.894 29.8558C91.6042 29.4126 91.4593 28.8693 91.4593 28.2259C91.4593 27.6719 91.5659 27.2159 91.7789 26.858C91.992 26.5 92.2797 26.2166 92.6419 26.0078C93.0041 25.799 93.4089 25.6413 93.8564 25.5348C94.3038 25.4283 94.7598 25.3473 95.2243 25.2919C95.8123 25.2237 96.2896 25.1683 96.6561 25.1257C97.0226 25.0788 97.2889 25.0043 97.4551 24.902C97.6213 24.7997 97.7044 24.6335 97.7044 24.4034V24.3587C97.7044 23.8004 97.5467 23.3679 97.2314 23.0611C96.9203 22.7543 96.4558 22.6009 95.8379 22.6009C95.1944 22.6009 94.6873 22.7436 94.3166 23.0291C93.9501 23.3104 93.6966 23.6236 93.5559 23.9688L91.7598 23.5597C91.9728 22.9631 92.2839 22.4815 92.693 22.1151C93.1064 21.7443 93.5815 21.4759 94.1184 21.3097C94.6554 21.1392 95.22 21.054 95.8123 21.054C96.2044 21.054 96.6199 21.1009 97.0588 21.1946C97.502 21.2841 97.9153 21.4503 98.2988 21.6932C98.6866 21.9361 99.0041 22.2834 99.2512 22.7351C99.4984 23.1825 99.622 23.7642 99.622 24.4801V31H97.7555V29.6577H97.6788C97.5552 29.9048 97.3699 30.1477 97.1227 30.3864C96.8755 30.625 96.5581 30.8232 96.1703 30.9808C95.7825 31.1385 95.318 31.2173 94.7768 31.2173ZM95.1923 29.6832C95.7207 29.6832 96.1724 29.5788 96.5474 29.37C96.9267 29.1612 97.2143 28.8885 97.4103 28.5518C97.6106 28.2109 97.7108 27.8466 97.7108 27.4588V26.1932C97.6426 26.2614 97.5105 26.3253 97.3145 26.3849C97.1227 26.4403 96.9032 26.4893 96.6561 26.532C96.4089 26.5703 96.1681 26.6065 95.9338 26.6406C95.6994 26.6705 95.5034 26.696 95.3457 26.7173C94.975 26.7642 94.6362 26.843 94.3294 26.9538C94.0268 27.0646 93.7839 27.2244 93.6007 27.4332C93.4217 27.6378 93.3322 27.9105 93.3322 28.2514C93.3322 28.7244 93.5069 29.0824 93.8564 29.3253C94.2058 29.5639 94.6511 29.6832 95.1923 29.6832ZM103.024 34.6818C102.739 34.6818 102.479 34.6584 102.244 34.6115C102.01 34.5689 101.835 34.522 101.72 34.4709L102.18 32.9048C102.53 32.9986 102.841 33.0391 103.114 33.0263C103.386 33.0135 103.627 32.9112 103.836 32.7195C104.049 32.5277 104.237 32.2145 104.398 31.7798L104.635 31.1278L101.043 21.1818H103.088L105.575 28.8011H105.677L108.163 21.1818H110.215L106.169 32.3104C105.982 32.8217 105.743 33.2543 105.453 33.608C105.163 33.9659 104.818 34.2344 104.418 34.4134C104.017 34.5923 103.553 34.6818 103.024 34.6818ZM120.911 31.1982C119.99 31.1982 119.187 30.9872 118.501 30.5653C117.815 30.1435 117.282 29.5533 116.903 28.7947C116.524 28.0362 116.334 27.1499 116.334 26.1357C116.334 25.1172 116.524 24.2266 116.903 23.4638C117.282 22.701 117.815 22.1087 118.501 21.6868C119.187 21.2649 119.99 21.054 120.911 21.054C121.831 21.054 122.634 21.2649 123.32 21.6868C124.007 22.1087 124.539 22.701 124.919 23.4638C125.298 24.2266 125.487 25.1172 125.487 26.1357C125.487 27.1499 125.298 28.0362 124.919 28.7947C124.539 29.5533 124.007 30.1435 123.32 30.5653C122.634 30.9872 121.831 31.1982 120.911 31.1982ZM120.917 29.5938C121.514 29.5938 122.008 29.4361 122.4 29.1207C122.792 28.8054 123.082 28.3857 123.269 27.8615C123.461 27.3374 123.557 26.7599 123.557 26.1293C123.557 25.5028 123.461 24.9276 123.269 24.4034C123.082 23.875 122.792 23.451 122.4 23.1314C122.008 22.8118 121.514 22.652 120.917 22.652C120.316 22.652 119.818 22.8118 119.421 23.1314C119.029 23.451 118.737 23.875 118.546 24.4034C118.358 24.9276 118.264 25.5028 118.264 26.1293C118.264 26.7599 118.358 27.3374 118.546 27.8615C118.737 28.3857 119.029 28.8054 119.421 29.1207C119.818 29.4361 120.316 29.5938 120.917 29.5938ZM132.293 21.1818V22.7159H126.745V21.1818H132.293ZM128.266 31V20.044C128.266 19.4304 128.401 18.9212 128.669 18.5163C128.938 18.1072 129.293 17.8026 129.737 17.6023C130.18 17.3977 130.661 17.2955 131.181 17.2955C131.565 17.2955 131.893 17.3274 132.165 17.3913C132.438 17.451 132.641 17.5064 132.773 17.5575L132.325 19.1044C132.236 19.0788 132.121 19.049 131.98 19.0149C131.839 18.9766 131.669 18.9574 131.469 18.9574C131.004 18.9574 130.672 19.0724 130.472 19.3026C130.276 19.5327 130.178 19.8651 130.178 20.2997V31H128.266ZM141.157 31L138.268 21.1818H140.243L142.167 28.392H142.263L144.194 21.1818H146.169L148.086 28.3601H148.182L150.094 21.1818H152.069L149.186 31H147.236L145.242 23.9112H145.095L143.101 31H141.157ZM156.011 31L153.122 21.1818H155.097L157.021 28.392H157.117L159.047 21.1818H161.022L162.94 28.3601H163.036L164.947 21.1818H166.922L164.039 31H162.09L160.096 23.9112H159.949L157.954 31H156.011ZM170.865 31L167.975 21.1818H169.95L171.874 28.392H171.97L173.901 21.1818H175.876L177.794 28.3601H177.889L179.801 21.1818H181.776L178.893 31H176.943L174.949 23.9112H174.802L172.808 31H170.865ZM183.513 31.1214C183.163 31.1214 182.863 30.9979 182.612 30.7507C182.36 30.4993 182.234 30.1967 182.234 29.843C182.234 29.4936 182.36 29.1953 182.612 28.9482C182.863 28.6967 183.163 28.571 183.513 28.571C183.862 28.571 184.163 28.6967 184.414 28.9482C184.665 29.1953 184.791 29.4936 184.791 29.843C184.791 30.0774 184.732 30.2926 184.612 30.4886C184.497 30.6804 184.344 30.8338 184.152 30.9489C183.96 31.0639 183.747 31.1214 183.513 31.1214ZM191.487 31.1982C190.566 31.1982 189.763 30.9872 189.077 30.5653C188.391 30.1435 187.858 29.5533 187.479 28.7947C187.1 28.0362 186.91 27.1499 186.91 26.1357C186.91 25.1172 187.1 24.2266 187.479 23.4638C187.858 22.701 188.391 22.1087 189.077 21.6868C189.763 21.2649 190.566 21.054 191.487 21.054C192.407 21.054 193.211 21.2649 193.897 21.6868C194.583 22.1087 195.115 22.701 195.495 23.4638C195.874 24.2266 196.064 25.1172 196.064 26.1357C196.064 27.1499 195.874 28.0362 195.495 28.7947C195.115 29.5533 194.583 30.1435 193.897 30.5653C193.211 30.9872 192.407 31.1982 191.487 31.1982ZM191.493 29.5938C192.09 29.5938 192.584 29.4361 192.976 29.1207C193.368 28.8054 193.658 28.3857 193.846 27.8615C194.037 27.3374 194.133 26.7599 194.133 26.1293C194.133 25.5028 194.037 24.9276 193.846 24.4034C193.658 23.875 193.368 23.451 192.976 23.1314C192.584 22.8118 192.09 22.652 191.493 22.652C190.892 22.652 190.394 22.8118 189.998 23.1314C189.605 23.451 189.314 23.875 189.122 24.4034C188.934 24.9276 188.841 25.5028 188.841 26.1293C188.841 26.7599 188.934 27.3374 189.122 27.8615C189.314 28.3857 189.605 28.8054 189.998 29.1207C190.394 29.4361 190.892 29.5938 191.493 29.5938ZM206.262 21.1818L202.702 31H200.656L197.089 21.1818H199.141L201.628 28.7372H201.73L204.21 21.1818H206.262ZM211.956 31.1982C210.988 31.1982 210.155 30.9915 209.456 30.5781C208.762 30.1605 208.225 29.5746 207.846 28.8203C207.471 28.0618 207.283 27.1733 207.283 26.1548C207.283 25.1491 207.471 24.2628 207.846 23.4957C208.225 22.7287 208.753 22.13 209.431 21.6996C210.113 21.2692 210.91 21.054 211.822 21.054C212.376 21.054 212.912 21.1456 213.432 21.3288C213.952 21.5121 214.419 21.7997 214.832 22.1918C215.246 22.5838 215.572 23.093 215.81 23.7195C216.049 24.3416 216.168 25.098 216.168 25.9886V26.6662H208.363V25.2344H214.295C214.295 24.7315 214.193 24.2862 213.988 23.8984C213.784 23.5064 213.496 23.1974 213.126 22.9716C212.759 22.7457 212.329 22.6328 211.834 22.6328C211.297 22.6328 210.829 22.7649 210.428 23.0291C210.032 23.2891 209.725 23.63 209.508 24.0518C209.295 24.4695 209.188 24.9233 209.188 25.4134V26.532C209.188 27.1882 209.303 27.7464 209.533 28.2067C209.768 28.6669 210.094 29.0185 210.511 29.2614C210.929 29.5 211.417 29.6193 211.975 29.6193C212.337 29.6193 212.667 29.5682 212.966 29.4659C213.264 29.3594 213.522 29.2017 213.739 28.9929C213.956 28.7841 214.123 28.5263 214.238 28.2195L216.047 28.5455C215.902 29.0781 215.642 29.5447 215.267 29.9453C214.896 30.3416 214.43 30.6506 213.867 30.8722C213.309 31.0895 212.672 31.1982 211.956 31.1982ZM218.289 31V21.1818H220.136V22.7415H220.238C220.417 22.2131 220.733 21.7976 221.184 21.495C221.64 21.1882 222.156 21.0348 222.731 21.0348C222.85 21.0348 222.991 21.0391 223.153 21.0476C223.319 21.0561 223.449 21.0668 223.543 21.0795V22.9077C223.466 22.8864 223.33 22.8629 223.134 22.8374C222.938 22.8075 222.742 22.7926 222.546 22.7926C222.094 22.7926 221.691 22.8885 221.338 23.0803C220.988 23.2678 220.711 23.5298 220.507 23.8665C220.302 24.1989 220.2 24.5781 220.2 25.0043V31H218.289ZM225.35 31V17.9091H227.262V22.7734H227.377C227.487 22.5689 227.647 22.3324 227.856 22.0639C228.065 21.7955 228.355 21.5611 228.725 21.3608C229.096 21.1562 229.586 21.054 230.195 21.054C230.988 21.054 231.695 21.2543 232.318 21.6548C232.94 22.0554 233.428 22.6328 233.781 23.3871C234.139 24.1413 234.318 25.049 234.318 26.1101C234.318 27.1712 234.142 28.081 233.788 28.8395C233.434 29.5937 232.948 30.1754 232.33 30.5845C231.713 30.9893 231.007 31.1918 230.215 31.1918C229.618 31.1918 229.13 31.0916 228.751 30.8913C228.376 30.6911 228.082 30.4567 227.869 30.1882C227.656 29.9197 227.492 29.6811 227.377 29.4723H227.217V31H225.35ZM227.223 26.0909C227.223 26.7812 227.323 27.3864 227.524 27.9062C227.724 28.4261 228.014 28.8331 228.393 29.1271C228.772 29.4169 229.237 29.5618 229.786 29.5618C230.357 29.5618 230.835 29.4105 231.218 29.108C231.602 28.8011 231.892 28.3857 232.088 27.8615C232.288 27.3374 232.388 26.7472 232.388 26.0909C232.388 25.4432 232.29 24.8615 232.094 24.3459C231.902 23.8303 231.612 23.4233 231.225 23.125C230.841 22.8267 230.362 22.6776 229.786 22.6776C229.232 22.6776 228.764 22.8203 228.38 23.1058C228.001 23.3913 227.713 23.7898 227.517 24.3011C227.321 24.8125 227.223 25.4091 227.223 26.0909ZM240.6 31.1982C239.68 31.1982 238.876 30.9872 238.19 30.5653C237.504 30.1435 236.972 29.5533 236.592 28.7947C236.213 28.0362 236.023 27.1499 236.023 26.1357C236.023 25.1172 236.213 24.2266 236.592 23.4638C236.972 22.701 237.504 22.1087 238.19 21.6868C238.876 21.2649 239.68 21.054 240.6 21.054C241.521 21.054 242.324 21.2649 243.01 21.6868C243.696 22.1087 244.229 22.701 244.608 23.4638C244.987 24.2266 245.177 25.1172 245.177 26.1357C245.177 27.1499 244.987 28.0362 244.608 28.7947C244.229 29.5533 243.696 30.1435 243.01 30.5653C242.324 30.9872 241.521 31.1982 240.6 31.1982ZM240.607 29.5938C241.203 29.5938 241.697 29.4361 242.089 29.1207C242.482 28.8054 242.771 28.3857 242.959 27.8615C243.151 27.3374 243.246 26.7599 243.246 26.1293C243.246 25.5028 243.151 24.9276 242.959 24.4034C242.771 23.875 242.482 23.451 242.089 23.1314C241.697 22.8118 241.203 22.652 240.607 22.652C240.006 22.652 239.507 22.8118 239.111 23.1314C238.719 23.451 238.427 23.875 238.235 24.4034C238.048 24.9276 237.954 25.5028 237.954 26.1293C237.954 26.7599 238.048 27.3374 238.235 27.8615C238.427 28.3857 238.719 28.8054 239.111 29.1207C239.507 29.4361 240.006 29.5938 240.607 29.5938ZM250.167 31.2173C249.545 31.2173 248.983 31.1023 248.48 30.8722C247.977 30.6378 247.579 30.299 247.285 29.8558C246.995 29.4126 246.85 28.8693 246.85 28.2259C246.85 27.6719 246.956 27.2159 247.17 26.858C247.383 26.5 247.67 26.2166 248.032 26.0078C248.395 25.799 248.8 25.6413 249.247 25.5348C249.694 25.4283 250.15 25.3473 250.615 25.2919C251.203 25.2237 251.68 25.1683 252.047 25.1257C252.413 25.0788 252.68 25.0043 252.846 24.902C253.012 24.7997 253.095 24.6335 253.095 24.4034V24.3587C253.095 23.8004 252.937 23.3679 252.622 23.0611C252.311 22.7543 251.846 22.6009 251.229 22.6009C250.585 22.6009 250.078 22.7436 249.707 23.0291C249.341 23.3104 249.087 23.6236 248.947 23.9688L247.15 23.5597C247.363 22.9631 247.675 22.4815 248.084 22.1151C248.497 21.7443 248.972 21.4759 249.509 21.3097C250.046 21.1392 250.611 21.054 251.203 21.054C251.595 21.054 252.01 21.1009 252.449 21.1946C252.893 21.2841 253.306 21.4503 253.689 21.6932C254.077 21.9361 254.395 22.2834 254.642 22.7351C254.889 23.1825 255.013 23.7642 255.013 24.4801V31H253.146V29.6577H253.069C252.946 29.9048 252.76 30.1477 252.513 30.3864C252.266 30.625 251.949 30.8232 251.561 30.9808C251.173 31.1385 250.709 31.2173 250.167 31.2173ZM250.583 29.6832C251.111 29.6832 251.563 29.5788 251.938 29.37C252.317 29.1612 252.605 28.8885 252.801 28.5518C253.001 28.2109 253.101 27.8466 253.101 27.4588V26.1932C253.033 26.2614 252.901 26.3253 252.705 26.3849C252.513 26.4403 252.294 26.4893 252.047 26.532C251.8 26.5703 251.559 26.6065 251.324 26.6406C251.09 26.6705 250.894 26.696 250.736 26.7173C250.366 26.7642 250.027 26.843 249.72 26.9538C249.417 27.0646 249.175 27.2244 248.991 27.4332C248.812 27.6378 248.723 27.9105 248.723 28.2514C248.723 28.7244 248.898 29.0824 249.247 29.3253C249.596 29.5639 250.042 29.6832 250.583 29.6832ZM257.558 31V21.1818H259.406V22.7415H259.508C259.687 22.2131 260.002 21.7976 260.454 21.495C260.91 21.1882 261.425 21.0348 262.001 21.0348C262.12 21.0348 262.261 21.0391 262.423 21.0476C262.589 21.0561 262.719 21.0668 262.812 21.0795V22.9077C262.736 22.8864 262.599 22.8629 262.403 22.8374C262.207 22.8075 262.011 22.7926 261.815 22.7926C261.364 22.7926 260.961 22.8885 260.607 23.0803C260.258 23.2678 259.981 23.5298 259.776 23.8665C259.572 24.1989 259.469 24.5781 259.469 25.0043V31H257.558ZM267.79 31.1918C266.998 31.1918 266.29 30.9893 265.668 30.5845C265.05 30.1754 264.564 29.5937 264.211 28.8395C263.861 28.081 263.687 27.1712 263.687 26.1101C263.687 25.049 263.863 24.1413 264.217 23.3871C264.575 22.6328 265.065 22.0554 265.687 21.6548C266.309 21.2543 267.015 21.054 267.803 21.054C268.412 21.054 268.903 21.1562 269.273 21.3608C269.648 21.5611 269.938 21.7955 270.143 22.0639C270.351 22.3324 270.513 22.5689 270.628 22.7734H270.743V17.9091H272.655V31H270.788V29.4723H270.628C270.513 29.6811 270.347 29.9197 270.13 30.1882C269.917 30.4567 269.623 30.6911 269.248 30.8913C268.873 31.0916 268.387 31.1918 267.79 31.1918ZM268.212 29.5618C268.762 29.5618 269.226 29.4169 269.606 29.1271C269.989 28.8331 270.279 28.4261 270.475 27.9062C270.675 27.3864 270.775 26.7812 270.775 26.0909C270.775 25.4091 270.677 24.8125 270.481 24.3011C270.285 23.7898 269.998 23.3913 269.618 23.1058C269.239 22.8203 268.77 22.6776 268.212 22.6776C267.637 22.6776 267.157 22.8267 266.774 23.125C266.39 23.4233 266.101 23.8303 265.905 24.3459C265.713 24.8615 265.617 25.4432 265.617 26.0909C265.617 26.7472 265.715 27.3374 265.911 27.8615C266.107 28.3857 266.397 28.8011 266.78 29.108C267.168 29.4105 267.645 29.5618 268.212 29.5618ZM276.642 31.1214C276.292 31.1214 275.992 30.9979 275.74 30.7507C275.489 30.4993 275.363 30.1967 275.363 29.843C275.363 29.4936 275.489 29.1953 275.74 28.9482C275.992 28.6967 276.292 28.571 276.642 28.571C276.991 28.571 277.292 28.6967 277.543 28.9482C277.794 29.1953 277.92 29.4936 277.92 29.843C277.92 30.0774 277.86 30.2926 277.741 30.4886C277.626 30.6804 277.473 30.8338 277.281 30.9489C277.089 31.0639 276.876 31.1214 276.642 31.1214ZM284.156 31.1918C283.363 31.1918 282.656 30.9893 282.033 30.5845C281.415 30.1754 280.93 29.5937 280.576 28.8395C280.227 28.081 280.052 27.1712 280.052 26.1101C280.052 25.049 280.229 24.1413 280.582 23.3871C280.94 22.6328 281.43 22.0554 282.053 21.6548C282.675 21.2543 283.38 21.054 284.168 21.054C284.778 21.054 285.268 21.1562 285.638 21.3608C286.013 21.5611 286.303 21.7955 286.508 22.0639C286.717 22.3324 286.879 22.5689 286.994 22.7734H287.109V17.9091H289.02V31H287.153V29.4723H286.994C286.879 29.6811 286.712 29.9197 286.495 30.1882C286.282 30.4567 285.988 30.6911 285.613 30.8913C285.238 31.0916 284.752 31.1918 284.156 31.1918ZM284.577 29.5618C285.127 29.5618 285.592 29.4169 285.971 29.1271C286.354 28.8331 286.644 28.4261 286.84 27.9062C287.04 27.3864 287.141 26.7812 287.141 26.0909C287.141 25.4091 287.043 24.8125 286.847 24.3011C286.651 23.7898 286.363 23.3913 285.984 23.1058C285.604 22.8203 285.136 22.6776 284.577 22.6776C284.002 22.6776 283.523 22.8267 283.139 23.125C282.756 23.4233 282.466 23.8303 282.27 24.3459C282.078 24.8615 281.982 25.4432 281.982 26.0909C281.982 26.7472 282.08 27.3374 282.276 27.8615C282.472 28.3857 282.762 28.8011 283.146 29.108C283.533 29.4105 284.011 29.5618 284.577 29.5618ZM295.979 31.1982C295.012 31.1982 294.179 30.9915 293.48 30.5781C292.785 30.1605 292.248 29.5746 291.869 28.8203C291.494 28.0618 291.307 27.1733 291.307 26.1548C291.307 25.1491 291.494 24.2628 291.869 23.4957C292.248 22.7287 292.777 22.13 293.454 21.6996C294.136 21.2692 294.933 21.054 295.845 21.054C296.399 21.054 296.936 21.1456 297.456 21.3288C297.976 21.5121 298.442 21.7997 298.856 22.1918C299.269 22.5838 299.595 23.093 299.834 23.7195C300.072 24.3416 300.192 25.098 300.192 25.9886V26.6662H292.387V25.2344H298.319C298.319 24.7315 298.216 24.2862 298.012 23.8984C297.807 23.5064 297.52 23.1974 297.149 22.9716C296.782 22.7457 296.352 22.6328 295.858 22.6328C295.321 22.6328 294.852 22.7649 294.452 23.0291C294.055 23.2891 293.748 23.63 293.531 24.0518C293.318 24.4695 293.211 24.9233 293.211 25.4134V26.532C293.211 27.1882 293.327 27.7464 293.557 28.2067C293.791 28.6669 294.117 29.0185 294.535 29.2614C294.952 29.5 295.44 29.6193 295.998 29.6193C296.361 29.6193 296.691 29.5682 296.989 29.4659C297.287 29.3594 297.545 29.2017 297.763 28.9929C297.98 28.7841 298.146 28.5263 298.261 28.2195L300.07 28.5455C299.925 29.0781 299.665 29.5447 299.29 29.9453C298.92 30.3416 298.453 30.6506 297.89 30.8722C297.332 31.0895 296.695 31.1982 295.979 31.1982ZM310.43 21.1818L306.87 31H304.824L301.257 21.1818H303.309L305.796 28.7372H305.898L308.378 21.1818H310.43Z"
            fill="#D7D7DB"
          />
          <rect x="784" y="8" width="94" height="32" rx="8" fill="#01ACFD" />
          <path
            d="M810.143 20.1818L809.383 20.9564L808.531 20.0891V26.1818H807.47V20.0891L806.618 20.9564L805.858 20.1818L808.001 18L810.143 20.1818ZM812.286 22.9091V28.9091C812.286 29.5091 811.804 30 811.215 30H804.786C804.192 30 803.715 29.5091 803.715 28.9091V22.9091C803.715 22.3036 804.192 21.8182 804.786 21.8182H806.393V22.9091H804.786V28.9091H811.215V22.9091H809.608V21.8182H811.215C811.804 21.8182 812.286 22.3036 812.286 22.9091Z"
            fill="white"
          />
          <path
            d="M825.581 20.8182C825.517 20.2784 825.258 19.8594 824.803 19.5611C824.349 19.2628 823.791 19.1136 823.131 19.1136C822.648 19.1136 822.225 19.1918 821.863 19.348C821.504 19.5043 821.224 19.7191 821.021 19.9925C820.822 20.266 820.723 20.5767 820.723 20.9247C820.723 21.2159 820.792 21.4663 820.931 21.6758C821.073 21.8817 821.254 22.054 821.474 22.1925C821.694 22.3274 821.925 22.4393 822.166 22.5281C822.408 22.6133 822.63 22.6825 822.832 22.7358L823.94 23.0341C824.224 23.1087 824.54 23.2116 824.888 23.343C825.24 23.4744 825.576 23.6538 825.895 23.881C826.218 24.1048 826.485 24.3924 826.694 24.744C826.904 25.0955 827.008 25.527 827.008 26.0384C827.008 26.6278 826.854 27.1605 826.545 27.6364C826.24 28.1122 825.792 28.4904 825.203 28.771C824.617 29.0515 823.905 29.1918 823.067 29.1918C822.285 29.1918 821.609 29.0657 821.037 28.8136C820.469 28.5614 820.022 28.2099 819.695 27.7589C819.372 27.3079 819.189 26.7841 819.146 26.1875H820.51C820.545 26.5994 820.684 26.9403 820.925 27.2102C821.17 27.4766 821.479 27.6754 821.852 27.8068C822.229 27.9347 822.633 27.9986 823.067 27.9986C823.571 27.9986 824.024 27.9169 824.425 27.7536C824.826 27.5866 825.144 27.3558 825.378 27.0611C825.613 26.7628 825.73 26.4148 825.73 26.017C825.73 25.6548 825.629 25.3601 825.426 25.1328C825.224 24.9055 824.958 24.7209 824.627 24.5788C824.297 24.4368 823.94 24.3125 823.557 24.206L822.214 23.8224C821.362 23.5774 820.687 23.2276 820.19 22.7731C819.693 22.3185 819.445 21.7237 819.445 20.9886C819.445 20.3778 819.61 19.8452 819.94 19.3906C820.274 18.9325 820.721 18.5774 821.282 18.3253C821.847 18.0696 822.477 17.9418 823.173 17.9418C823.876 17.9418 824.501 18.0678 825.048 18.32C825.595 18.5685 826.028 18.9094 826.348 19.3427C826.671 19.7759 826.842 20.2678 826.859 20.8182H825.581ZM830.027 24.0781V29H828.77V18.0909H830.027V22.0966H830.134C830.325 21.674 830.613 21.3384 830.997 21.0898C831.384 20.8377 831.899 20.7116 832.541 20.7116C833.099 20.7116 833.587 20.8235 834.006 21.0472C834.425 21.2674 834.75 21.6065 834.981 22.0646C835.215 22.5192 835.332 23.098 835.332 23.8011V29H834.075V23.8864C834.075 23.2365 833.907 22.734 833.569 22.3789C833.236 22.0202 832.772 21.8409 832.179 21.8409C831.767 21.8409 831.398 21.9279 831.071 22.1019C830.748 22.2759 830.492 22.5298 830.304 22.8636C830.119 23.1974 830.027 23.6023 830.027 24.0781ZM839.8 29.1918C839.281 29.1918 838.811 29.0941 838.388 28.8988C837.966 28.6999 837.63 28.4141 837.382 28.0412C837.133 27.6648 837.009 27.2102 837.009 26.6776C837.009 26.2088 837.101 25.8288 837.286 25.5376C837.47 25.2429 837.717 25.0121 838.026 24.8452C838.335 24.6783 838.676 24.554 839.049 24.4723C839.425 24.3871 839.803 24.3196 840.183 24.2699C840.681 24.206 841.084 24.158 841.393 24.1261C841.705 24.0906 841.932 24.032 842.074 23.9503C842.22 23.8686 842.293 23.7266 842.293 23.5241V23.4815C842.293 22.956 842.149 22.5476 841.861 22.2564C841.577 21.9652 841.146 21.8196 840.567 21.8196C839.967 21.8196 839.496 21.951 839.155 22.2138C838.814 22.4766 838.575 22.7571 838.436 23.0554L837.243 22.6293C837.456 22.1321 837.74 21.745 838.095 21.468C838.454 21.1875 838.845 20.9922 839.267 20.8821C839.693 20.7685 840.112 20.7116 840.524 20.7116C840.787 20.7116 841.089 20.7436 841.43 20.8075C841.774 20.8679 842.106 20.994 842.426 21.1857C842.749 21.3775 843.017 21.6669 843.23 22.054C843.443 22.4411 843.55 22.9595 843.55 23.6094V29H842.293V27.892H842.229C842.144 28.0696 842.002 28.2596 841.803 28.462C841.604 28.6644 841.339 28.8366 841.009 28.9787C840.679 29.1207 840.276 29.1918 839.8 29.1918ZM839.992 28.0625C840.489 28.0625 840.908 27.9648 841.249 27.7695C841.593 27.5742 841.852 27.3221 842.027 27.0131C842.204 26.7042 842.293 26.3793 842.293 26.0384V24.8878C842.24 24.9517 842.122 25.0103 841.941 25.0636C841.764 25.1133 841.558 25.1577 841.323 25.1967C841.093 25.2322 840.867 25.2642 840.647 25.2926C840.43 25.3175 840.254 25.3388 840.12 25.3565C839.793 25.3991 839.487 25.4684 839.203 25.5643C838.923 25.6566 838.696 25.7969 838.522 25.9851C838.351 26.1697 838.266 26.4219 838.266 26.7415C838.266 27.1783 838.427 27.5085 838.751 27.7322C839.077 27.9524 839.491 28.0625 839.992 28.0625ZM845.604 29V20.8182H846.819V22.054H846.904C847.053 21.6491 847.323 21.3207 847.714 21.0685C848.104 20.8164 848.545 20.6903 849.035 20.6903C849.127 20.6903 849.243 20.6921 849.381 20.6957C849.52 20.6992 849.624 20.7045 849.695 20.7116V21.9901C849.653 21.9794 849.555 21.9634 849.402 21.9421C849.253 21.9173 849.095 21.9048 848.928 21.9048C848.531 21.9048 848.175 21.9883 847.863 22.1552C847.554 22.3185 847.309 22.5458 847.128 22.837C846.95 23.1246 846.862 23.4531 846.862 23.8224V29H845.604ZM854.127 29.1705C853.338 29.1705 852.658 28.9964 852.087 28.6484C851.519 28.2969 851.08 27.8068 850.771 27.1783C850.466 26.5462 850.313 25.8111 850.313 24.973C850.313 24.1349 850.466 23.3963 850.771 22.7571C851.08 22.1143 851.51 21.6136 852.06 21.255C852.614 20.8928 853.26 20.7116 853.999 20.7116C854.425 20.7116 854.846 20.7827 855.261 20.9247C855.677 21.0668 856.055 21.2976 856.396 21.6172C856.737 21.9332 857.009 22.3523 857.211 22.8743C857.413 23.3963 857.515 24.0391 857.515 24.8026V25.3352H851.208V24.2486H856.236C856.236 23.7869 856.144 23.375 855.959 23.0128C855.778 22.6506 855.519 22.3647 855.182 22.1552C854.848 21.9457 854.454 21.8409 853.999 21.8409C853.498 21.8409 853.065 21.9652 852.699 22.2138C852.337 22.4588 852.058 22.7784 851.863 23.1726C851.668 23.5668 851.57 23.9893 851.57 24.4403V25.1648C851.57 25.7827 851.677 26.3065 851.89 26.7362C852.106 27.1623 852.406 27.4872 852.79 27.7109C853.173 27.9311 853.619 28.0412 854.127 28.0412C854.457 28.0412 854.755 27.995 855.022 27.9027C855.292 27.8068 855.524 27.6648 855.72 27.4766C855.915 27.2848 856.066 27.0469 856.172 26.7628L857.387 27.1037C857.259 27.5156 857.044 27.8778 856.742 28.1903C856.44 28.4993 856.068 28.7408 855.624 28.9148C855.18 29.0852 854.681 29.1705 854.127 29.1705Z"
            fill="#F9F9FA"
          />
          <rect x="894" y="8" width="307" height="32" rx="8" fill="#3F434A" />
          <rect x="1044.83" y="9" width="155" height="30" rx="8" fill="black" />
          <path
            d="M949.336 18.0885L952.574 27.2717H952.702L955.941 18.0885H957.326L953.32 28.9976H951.956L947.951 18.0885H949.336ZM958.615 28.9976V20.8157H959.872V28.9976H958.615ZM959.254 19.4521C959.009 19.4521 958.797 19.3687 958.62 19.2017C958.446 19.0348 958.359 18.8342 958.359 18.5998C958.359 18.3655 958.446 18.1648 958.62 17.9979C958.797 17.831 959.009 17.7476 959.254 17.7476C959.499 17.7476 959.708 17.831 959.882 17.9979C960.06 18.1648 960.149 18.3655 960.149 18.5998C960.149 18.8342 960.06 19.0348 959.882 19.2017C959.708 19.3687 959.499 19.4521 959.254 19.4521ZM965.365 29.168C964.576 29.168 963.896 28.994 963.324 28.646C962.756 28.2944 962.318 27.8044 962.009 27.1758C961.703 26.5437 961.551 25.8086 961.551 24.9706C961.551 24.1325 961.703 23.3939 962.009 22.7547C962.318 22.1119 962.747 21.6112 963.298 21.2525C963.852 20.8903 964.498 20.7092 965.237 20.7092C965.663 20.7092 966.084 20.7802 966.499 20.9223C966.915 21.0643 967.293 21.2951 967.634 21.6147C967.975 21.9308 968.246 22.3498 968.449 22.8718C968.651 23.3939 968.752 24.0366 968.752 24.8001V25.3328H962.446V24.2461H967.474C967.474 23.7845 967.382 23.3726 967.197 23.0103C967.016 22.6481 966.757 22.3623 966.419 22.1527C966.085 21.9432 965.691 21.8385 965.237 21.8385C964.736 21.8385 964.303 21.9628 963.937 22.2113C963.575 22.4564 963.296 22.776 963.101 23.1701C962.905 23.5643 962.808 23.9869 962.808 24.4379V25.1623C962.808 25.7802 962.914 26.304 963.127 26.7337C963.344 27.1598 963.644 27.4848 964.028 27.7085C964.411 27.9287 964.857 28.0388 965.365 28.0388C965.695 28.0388 965.993 27.9926 966.259 27.9003C966.529 27.8044 966.762 27.6623 966.957 27.4741C967.153 27.2824 967.303 27.0444 967.41 26.7603L968.624 27.1013C968.497 27.5132 968.282 27.8754 967.98 28.1879C967.678 28.4968 967.305 28.7383 966.861 28.9123C966.417 29.0828 965.919 29.168 965.365 29.168ZM972.278 28.9976L969.785 20.8157H971.106L972.875 27.0799H972.96L974.707 20.8157H976.05L977.775 27.0586H977.861L979.629 20.8157H980.95L978.457 28.9976H977.221L975.432 22.712H975.304L973.514 28.9976H972.278ZM985.524 29.168C984.736 29.168 984.056 28.994 983.484 28.646C982.916 28.2944 982.477 27.8044 982.168 27.1758C981.863 26.5437 981.71 25.8086 981.71 24.9706C981.71 24.1325 981.863 23.3939 982.168 22.7547C982.477 22.1119 982.907 21.6112 983.457 21.2525C984.011 20.8903 984.658 20.7092 985.396 20.7092C985.822 20.7092 986.243 20.7802 986.659 20.9223C987.074 21.0643 987.452 21.2951 987.793 21.6147C988.134 21.9308 988.406 22.3498 988.608 22.8718C988.811 23.3939 988.912 24.0366 988.912 24.8001V25.3328H982.605V24.2461H987.634C987.634 23.7845 987.541 23.3726 987.357 23.0103C987.175 22.6481 986.916 22.3623 986.579 22.1527C986.245 21.9432 985.851 21.8385 985.396 21.8385C984.896 21.8385 984.462 21.9628 984.097 22.2113C983.734 22.4564 983.456 22.776 983.26 23.1701C983.065 23.5643 982.967 23.9869 982.967 24.4379V25.1623C982.967 25.7802 983.074 26.304 983.287 26.7337C983.504 27.1598 983.804 27.4848 984.187 27.7085C984.571 27.9287 985.016 28.0388 985.524 28.0388C985.854 28.0388 986.153 27.9926 986.419 27.9003C986.689 27.8044 986.922 27.6623 987.117 27.4741C987.312 27.2824 987.463 27.0444 987.57 26.7603L988.784 27.1013C988.656 27.5132 988.441 27.8754 988.14 28.1879C987.838 28.4968 987.465 28.7383 987.021 28.9123C986.577 29.0828 986.078 29.168 985.524 29.168ZM990.584 28.9976V20.8157H991.799V22.0515H991.884C992.033 21.6467 992.303 21.3182 992.694 21.0661C993.084 20.814 993.525 20.6879 994.015 20.6879C994.107 20.6879 994.222 20.6897 994.361 20.6932C994.499 20.6968 994.604 20.7021 994.675 20.7092V21.9876C994.633 21.977 994.535 21.961 994.382 21.9397C994.233 21.9148 994.075 21.9024 993.908 21.9024C993.51 21.9024 993.155 21.9858 992.843 22.1527C992.534 22.3161 992.289 22.5434 992.108 22.8346C991.93 23.1222 991.841 23.4507 991.841 23.82V28.9976H990.584Z"
            fill="#D7D7DB"
          />
          <path
            d="M1103.61 28.9976H1100.24V18.0885H1103.76C1104.82 18.0885 1105.72 18.3069 1106.48 18.7437C1107.23 19.1769 1107.81 19.8001 1108.21 20.6133C1108.61 21.423 1108.81 22.3924 1108.81 23.5217C1108.81 24.6581 1108.61 25.6364 1108.2 26.4567C1107.8 27.2735 1107.21 27.902 1106.43 28.3424C1105.66 28.7792 1104.72 28.9976 1103.61 28.9976ZM1101.57 27.8257H1103.53C1104.43 27.8257 1105.17 27.6517 1105.77 27.3037C1106.36 26.9557 1106.8 26.4603 1107.09 25.8175C1107.39 25.1748 1107.53 24.4095 1107.53 23.5217C1107.53 22.641 1107.39 21.8829 1107.1 21.2472C1106.81 20.608 1106.38 20.1179 1105.81 19.777C1105.24 19.4326 1104.53 19.2603 1103.67 19.2603H1101.57V27.8257ZM1114.05 29.168C1113.26 29.168 1112.58 28.994 1112.01 28.646C1111.44 28.2944 1111 27.8044 1110.69 27.1758C1110.38 26.5437 1110.23 25.8086 1110.23 24.9706C1110.23 24.1325 1110.38 23.3939 1110.69 22.7547C1111 22.1119 1111.43 21.6112 1111.98 21.2525C1112.53 20.8903 1113.18 20.7092 1113.92 20.7092C1114.34 20.7092 1114.76 20.7802 1115.18 20.9223C1115.6 21.0643 1115.97 21.2951 1116.31 21.6147C1116.66 21.9308 1116.93 22.3498 1117.13 22.8718C1117.33 23.3939 1117.43 24.0366 1117.43 24.8001V25.3328H1111.13V24.2461H1116.15C1116.15 23.7845 1116.06 23.3726 1115.88 23.0103C1115.7 22.6481 1115.44 22.3623 1115.1 22.1527C1114.77 21.9432 1114.37 21.8385 1113.92 21.8385C1113.42 21.8385 1112.98 21.9628 1112.62 22.2113C1112.26 22.4564 1111.98 22.776 1111.78 23.1701C1111.59 23.5643 1111.49 23.9869 1111.49 24.4379V25.1623C1111.49 25.7802 1111.59 26.304 1111.81 26.7337C1112.02 27.1598 1112.32 27.4848 1112.71 27.7085C1113.09 27.9287 1113.54 28.0388 1114.05 28.0388C1114.38 28.0388 1114.67 27.9926 1114.94 27.9003C1115.21 27.8044 1115.44 27.6623 1115.64 27.4741C1115.83 27.2824 1115.98 27.0444 1116.09 26.7603L1117.31 27.1013C1117.18 27.5132 1116.96 27.8754 1116.66 28.1879C1116.36 28.4968 1115.99 28.7383 1115.54 28.9123C1115.1 29.0828 1114.6 29.168 1114.05 29.168ZM1125.55 20.8157L1122.52 28.9976H1121.24L1118.22 20.8157H1119.58L1121.84 27.3356H1121.92L1124.18 20.8157H1125.55ZM1126.03 19.2603V18.0885H1134.21V19.2603H1130.78V28.9976H1129.46V19.2603H1126.03ZM1137.97 29.168C1137.24 29.168 1136.59 28.9922 1136.03 28.6407C1135.48 28.2891 1135.04 27.7973 1134.73 27.1652C1134.42 26.5331 1134.27 25.7944 1134.27 24.9493C1134.27 24.097 1134.42 23.353 1134.73 22.7174C1135.04 22.0817 1135.48 21.5881 1136.03 21.2366C1136.59 20.885 1137.24 20.7092 1137.97 20.7092C1138.71 20.7092 1139.36 20.885 1139.91 21.2366C1140.47 21.5881 1140.9 22.0817 1141.21 22.7174C1141.53 23.353 1141.68 24.097 1141.68 24.9493C1141.68 25.7944 1141.53 26.5331 1141.21 27.1652C1140.9 27.7973 1140.47 28.2891 1139.91 28.6407C1139.36 28.9922 1138.71 29.168 1137.97 29.168ZM1137.97 28.0388C1138.54 28.0388 1139 27.8949 1139.36 27.6073C1139.72 27.3196 1139.99 26.9415 1140.16 26.4727C1140.34 26.004 1140.42 25.4961 1140.42 24.9493C1140.42 24.4024 1140.34 23.8928 1140.16 23.4205C1139.99 22.9482 1139.72 22.5665 1139.36 22.2753C1139 21.9841 1138.54 21.8385 1137.97 21.8385C1137.41 21.8385 1136.95 21.9841 1136.59 22.2753C1136.23 22.5665 1135.96 22.9482 1135.79 23.4205C1135.61 23.8928 1135.52 24.4024 1135.52 24.9493C1135.52 25.4961 1135.61 26.004 1135.79 26.4727C1135.96 26.9415 1136.23 27.3196 1136.59 27.6073C1136.95 27.8949 1137.41 28.0388 1137.97 28.0388ZM1146.68 29.168C1145.95 29.168 1145.3 28.9922 1144.74 28.6407C1144.19 28.2891 1143.75 27.7973 1143.44 27.1652C1143.13 26.5331 1142.98 25.7944 1142.98 24.9493C1142.98 24.097 1143.13 23.353 1143.44 22.7174C1143.75 22.0817 1144.19 21.5881 1144.74 21.2366C1145.3 20.885 1145.95 20.7092 1146.68 20.7092C1147.42 20.7092 1148.07 20.885 1148.62 21.2366C1149.18 21.5881 1149.61 22.0817 1149.92 22.7174C1150.24 23.353 1150.39 24.097 1150.39 24.9493C1150.39 25.7944 1150.24 26.5331 1149.92 27.1652C1149.61 27.7973 1149.18 28.2891 1148.62 28.6407C1148.07 28.9922 1147.42 29.168 1146.68 29.168ZM1146.68 28.0388C1147.25 28.0388 1147.71 27.8949 1148.07 27.6073C1148.43 27.3196 1148.7 26.9415 1148.87 26.4727C1149.05 26.004 1149.14 25.4961 1149.14 24.9493C1149.14 24.4024 1149.05 23.8928 1148.87 23.4205C1148.7 22.9482 1148.43 22.5665 1148.07 22.2753C1147.71 21.9841 1147.25 21.8385 1146.68 21.8385C1146.12 21.8385 1145.66 21.9841 1145.3 22.2753C1144.94 22.5665 1144.67 22.9482 1144.5 23.4205C1144.32 23.8928 1144.23 24.4024 1144.23 24.9493C1144.23 25.4961 1144.32 26.004 1144.5 26.4727C1144.67 26.9415 1144.94 27.3196 1145.3 27.6073C1145.66 27.8949 1146.12 28.0388 1146.68 28.0388ZM1153.33 18.0885V28.9976H1152.07V18.0885H1153.33ZM1161.19 22.6481L1160.06 22.9677C1159.99 22.7795 1159.88 22.5966 1159.74 22.4191C1159.61 22.238 1159.42 22.0888 1159.19 21.9716C1158.95 21.8544 1158.65 21.7959 1158.29 21.7959C1157.79 21.7959 1157.37 21.9113 1157.04 22.1421C1156.71 22.3694 1156.54 22.6588 1156.54 23.0103C1156.54 23.3228 1156.65 23.5696 1156.88 23.7508C1157.11 23.9319 1157.46 24.0828 1157.95 24.2035L1159.16 24.5018C1159.89 24.6794 1160.44 24.951 1160.8 25.3168C1161.16 25.679 1161.34 26.146 1161.34 26.7177C1161.34 27.1865 1161.2 27.6055 1160.93 27.9748C1160.66 28.3441 1160.29 28.6353 1159.81 28.8484C1159.33 29.0615 1158.77 29.168 1158.14 29.168C1157.3 29.168 1156.61 28.9869 1156.07 28.6247C1155.52 28.2625 1155.17 27.7334 1155.03 27.0373L1156.22 26.739C1156.34 27.1794 1156.55 27.5096 1156.87 27.7298C1157.19 27.95 1157.6 28.0601 1158.12 28.0601C1158.7 28.0601 1159.17 27.9358 1159.51 27.6872C1159.86 27.4351 1160.04 27.1332 1160.04 26.7816C1160.04 26.4976 1159.94 26.2596 1159.74 26.0679C1159.54 25.8726 1159.23 25.727 1158.82 25.6311L1157.46 25.3115C1156.71 25.1339 1156.16 24.8587 1155.81 24.4858C1155.46 24.1094 1155.28 23.6389 1155.28 23.0743C1155.28 22.6126 1155.41 22.2042 1155.67 21.8491C1155.94 21.494 1156.29 21.2152 1156.74 21.0128C1157.2 20.8104 1157.71 20.7092 1158.29 20.7092C1159.1 20.7092 1159.73 20.8868 1160.2 21.2419C1160.66 21.597 1160.99 22.0657 1161.19 22.6481Z"
            fill="white"
          />
          <circle cx="1232.5" cy="24" r="15.5" fill="#0A111F" />
          <path
            d="M1226.55 26.7051C1225.62 26.7051 1224.88 25.9727 1224.88 25.0352C1224.88 24.0977 1225.62 23.3652 1226.55 23.3652C1227.49 23.3652 1228.22 24.0977 1228.22 25.0352C1228.22 25.9727 1227.49 26.7051 1226.55 26.7051ZM1233 26.7051C1232.06 26.7051 1231.33 25.9727 1231.33 25.0352C1231.33 24.0977 1232.06 23.3652 1233 23.3652C1233.94 23.3652 1234.67 24.0977 1234.67 25.0352C1234.67 25.9727 1233.94 26.7051 1233 26.7051ZM1239.45 26.7051C1238.51 26.7051 1237.78 25.9727 1237.78 25.0352C1237.78 24.0977 1238.51 23.3652 1239.45 23.3652C1240.38 23.3652 1241.12 24.0977 1241.12 25.0352C1241.12 25.9727 1240.38 26.7051 1239.45 26.7051Z"
            fill="#D7D7DB"
          />
          <path
            d="M24.3475 18.2742C24.0266 17.9086 23.5092 17.9086 23.1883 18.2742L17.7462 24.474C17.4908 24.765 17.4908 25.235 17.7462 25.526L23.1883 31.7258C23.5092 32.0914 24.0266 32.0914 24.3475 31.7258C24.6684 31.3602 24.6684 30.7709 24.3475 30.4053L19.6061 24.9963L24.354 19.5873C24.6684 19.2292 24.6684 18.6323 24.3475 18.2742Z"
            fill="#D7D7DB"
          />
        </g>
        <rect y="616" width="1274" height="51" fill="#081120" />
        <circle cx="27" cy="642" r="16" fill="#01ACFD" />
        <path
          d="M33.6896 640.813L29.0213 638.14L24.3531 635.467C24.1506 635.351 23.921 635.29 23.6872 635.29C23.4535 635.29 23.2239 635.351 23.0215 635.467C22.8191 635.583 22.651 635.75 22.5341 635.95C22.4171 636.151 22.3556 636.379 22.3555 636.611V647.303C22.3555 647.535 22.4171 647.762 22.534 647.963C22.6509 648.164 22.819 648.33 23.0215 648.446C23.2239 648.562 23.4535 648.623 23.6872 648.623C23.921 648.623 24.1506 648.562 24.3531 648.447L29.0213 645.774L33.6896 643.101C33.892 642.985 34.0601 642.818 34.177 642.617C34.2939 642.416 34.3555 642.189 34.3555 641.957C34.3555 641.725 34.2939 641.497 34.177 641.296C34.0601 641.096 33.892 640.929 33.6896 640.813Z"
          fill="#F9F9FA"
        />
        <rect
          width="1075"
          height="3"
          transform="translate(54 640.5)"
          fill="#363C48"
        />
        <rect
          width="919"
          height="3"
          transform="translate(54 640.994)"
          fill="#5B6E80"
        />
        <rect x="54" y="640.994" width="922" height="3" fill="#01ACFD" />
        <rect
          x="1141"
          y="631.506"
          width="115"
          height="20"
          rx="10"
          fill="#363C48"
        />
        <path
          d="M1160.16 646.236C1159.52 646.236 1158.97 646.061 1158.52 645.711C1158.07 645.359 1157.72 644.849 1157.48 644.182C1157.25 643.511 1157.13 642.701 1157.13 641.753C1157.13 640.809 1157.25 640.004 1157.48 639.336C1157.73 638.666 1158.07 638.155 1158.52 637.802C1158.98 637.447 1159.52 637.27 1160.16 637.27C1160.8 637.27 1161.34 637.447 1161.79 637.802C1162.25 638.155 1162.59 638.666 1162.83 639.336C1163.07 640.004 1163.2 640.809 1163.2 641.753C1163.2 642.701 1163.08 643.511 1162.84 644.182C1162.6 644.849 1162.25 645.359 1161.8 645.711C1161.35 646.061 1160.8 646.236 1160.16 646.236ZM1160.16 645.298C1160.8 645.298 1161.29 644.991 1161.64 644.378C1162 643.764 1162.17 642.889 1162.17 641.753C1162.17 640.997 1162.09 640.353 1161.93 639.822C1161.77 639.291 1161.54 638.886 1161.24 638.608C1160.94 638.329 1160.58 638.19 1160.16 638.19C1159.53 638.19 1159.04 638.501 1158.68 639.123C1158.33 639.743 1158.15 640.619 1158.15 641.753C1158.15 642.508 1158.23 643.15 1158.39 643.679C1158.55 644.207 1158.78 644.609 1159.07 644.885C1159.38 645.16 1159.74 645.298 1160.16 645.298ZM1165.32 645C1165.11 645 1164.93 644.924 1164.78 644.774C1164.63 644.623 1164.56 644.443 1164.56 644.233C1164.56 644.022 1164.63 643.842 1164.78 643.691C1164.93 643.541 1165.11 643.466 1165.32 643.466C1165.53 643.466 1165.71 643.541 1165.87 643.691C1166.02 643.842 1166.09 644.022 1166.09 644.233C1166.09 644.372 1166.06 644.5 1165.98 644.616C1165.92 644.733 1165.82 644.826 1165.71 644.897C1165.59 644.966 1165.47 645 1165.32 645ZM1165.32 640.585C1165.11 640.585 1164.93 640.51 1164.78 640.359C1164.63 640.209 1164.56 640.028 1164.56 639.818C1164.56 639.608 1164.63 639.427 1164.78 639.277C1164.93 639.126 1165.11 639.051 1165.32 639.051C1165.53 639.051 1165.71 639.126 1165.87 639.277C1166.02 639.427 1166.09 639.608 1166.09 639.818C1166.09 639.957 1166.06 640.085 1165.98 640.201C1165.92 640.318 1165.82 640.412 1165.71 640.483C1165.59 640.551 1165.47 640.585 1165.32 640.585ZM1170.59 646.236C1170.03 646.236 1169.52 646.139 1169.08 645.946C1168.65 645.753 1168.3 645.484 1168.04 645.14C1167.78 644.794 1167.64 644.392 1167.62 643.934H1168.7C1168.72 644.216 1168.82 644.459 1168.99 644.663C1169.16 644.865 1169.38 645.021 1169.65 645.132C1169.93 645.243 1170.24 645.298 1170.57 645.298C1170.95 645.298 1171.28 645.233 1171.57 645.102C1171.86 644.971 1172.09 644.79 1172.25 644.557C1172.41 644.324 1172.5 644.054 1172.5 643.747C1172.5 643.426 1172.42 643.143 1172.26 642.899C1172.1 642.652 1171.87 642.459 1171.56 642.319C1171.25 642.18 1170.88 642.111 1170.43 642.111H1169.74V641.173H1170.43C1170.78 641.173 1171.09 641.111 1171.35 640.986C1171.61 640.861 1171.82 640.684 1171.96 640.457C1172.11 640.23 1172.19 639.963 1172.19 639.656C1172.19 639.361 1172.12 639.103 1171.99 638.885C1171.86 638.666 1171.68 638.495 1171.44 638.373C1171.2 638.251 1170.93 638.19 1170.6 638.19C1170.3 638.19 1170.02 638.245 1169.75 638.356C1169.49 638.464 1169.27 638.622 1169.1 638.829C1168.94 639.034 1168.85 639.281 1168.83 639.571H1167.81C1167.83 639.113 1167.96 638.713 1168.22 638.369C1168.48 638.022 1168.82 637.753 1169.24 637.559C1169.66 637.366 1170.12 637.27 1170.62 637.27C1171.16 637.27 1171.62 637.379 1172.01 637.598C1172.4 637.814 1172.69 638.099 1172.9 638.454C1173.11 638.809 1173.21 639.193 1173.21 639.605C1173.21 640.096 1173.08 640.515 1172.83 640.862C1172.57 641.209 1172.22 641.449 1171.78 641.582V641.65C1172.33 641.741 1172.76 641.976 1173.07 642.353C1173.38 642.728 1173.54 643.193 1173.54 643.747C1173.54 644.221 1173.41 644.647 1173.15 645.025C1172.89 645.4 1172.54 645.696 1172.1 645.912C1171.66 646.128 1171.15 646.236 1170.59 646.236ZM1175.04 646.116V645.349L1177.92 642.196C1178.26 641.826 1178.54 641.505 1178.76 641.233C1178.97 640.957 1179.14 640.699 1179.24 640.457C1179.35 640.213 1179.4 639.957 1179.4 639.69C1179.4 639.383 1179.33 639.118 1179.18 638.893C1179.04 638.669 1178.84 638.495 1178.59 638.373C1178.33 638.251 1178.05 638.19 1177.73 638.19C1177.4 638.19 1177.11 638.26 1176.86 638.399C1176.61 638.535 1176.42 638.727 1176.28 638.974C1176.15 639.221 1176.08 639.511 1176.08 639.843H1175.07C1175.07 639.332 1175.19 638.883 1175.43 638.497C1175.66 638.111 1175.98 637.809 1176.39 637.593C1176.8 637.378 1177.26 637.27 1177.77 637.27C1178.28 637.27 1178.73 637.378 1179.13 637.593C1179.52 637.809 1179.83 638.101 1180.06 638.467C1180.28 638.834 1180.39 639.241 1180.39 639.69C1180.39 640.011 1180.33 640.325 1180.22 640.632C1180.1 640.936 1179.9 641.275 1179.62 641.65C1179.34 642.022 1178.95 642.477 1178.45 643.014L1176.49 645.111V645.179H1180.55V646.116H1175.04ZM1188.3 636.98L1185.49 647.429H1184.57L1187.38 636.98H1188.3Z"
          fill="#D7D7DB"
        />
        <path
          d="M1195.22 646.236C1194.58 646.236 1194.03 646.061 1193.58 645.711C1193.13 645.359 1192.78 644.849 1192.54 644.182C1192.3 643.511 1192.19 642.701 1192.19 641.753C1192.19 640.809 1192.3 640.004 1192.54 639.336C1192.78 638.666 1193.13 638.155 1193.58 637.802C1194.04 637.447 1194.58 637.27 1195.22 637.27C1195.86 637.27 1196.4 637.447 1196.85 637.802C1197.31 638.155 1197.65 638.666 1197.89 639.336C1198.13 640.004 1198.25 640.809 1198.25 641.753C1198.25 642.701 1198.13 643.511 1197.9 644.182C1197.66 644.849 1197.31 645.359 1196.86 645.711C1196.41 646.061 1195.86 646.236 1195.22 646.236ZM1195.22 645.298C1195.86 645.298 1196.35 644.991 1196.7 644.378C1197.05 643.764 1197.23 642.889 1197.23 641.753C1197.23 640.997 1197.15 640.353 1196.99 639.822C1196.83 639.291 1196.6 638.886 1196.3 638.608C1196 638.329 1195.64 638.19 1195.22 638.19C1194.59 638.19 1194.1 638.501 1193.74 639.123C1193.39 639.743 1193.21 640.619 1193.21 641.753C1193.21 642.508 1193.29 643.15 1193.45 643.679C1193.61 644.207 1193.83 644.609 1194.13 644.885C1194.43 645.16 1194.8 645.298 1195.22 645.298ZM1200.38 645C1200.17 645 1199.99 644.924 1199.84 644.774C1199.69 644.623 1199.62 644.443 1199.62 644.233C1199.62 644.022 1199.69 643.842 1199.84 643.691C1199.99 643.541 1200.17 643.466 1200.38 643.466C1200.59 643.466 1200.77 643.541 1200.92 643.691C1201.07 643.842 1201.15 644.022 1201.15 644.233C1201.15 644.372 1201.11 644.5 1201.04 644.616C1200.97 644.733 1200.88 644.826 1200.77 644.897C1200.65 644.966 1200.52 645 1200.38 645ZM1200.38 640.585C1200.17 640.585 1199.99 640.51 1199.84 640.359C1199.69 640.209 1199.62 640.028 1199.62 639.818C1199.62 639.608 1199.69 639.427 1199.84 639.277C1199.99 639.126 1200.17 639.051 1200.38 639.051C1200.59 639.051 1200.77 639.126 1200.92 639.277C1201.07 639.427 1201.15 639.608 1201.15 639.818C1201.15 639.957 1201.11 640.085 1201.04 640.201C1200.97 640.318 1200.88 640.412 1200.77 640.483C1200.65 640.551 1200.52 640.585 1200.38 640.585ZM1205.65 646.236C1205.08 646.236 1204.58 646.139 1204.14 645.946C1203.7 645.753 1203.36 645.484 1203.1 645.14C1202.84 644.794 1202.7 644.392 1202.68 643.934H1203.75C1203.78 644.216 1203.87 644.459 1204.04 644.663C1204.21 644.865 1204.44 645.021 1204.71 645.132C1204.99 645.243 1205.29 645.298 1205.63 645.298C1206 645.298 1206.34 645.233 1206.63 645.102C1206.92 644.971 1207.14 644.79 1207.31 644.557C1207.47 644.324 1207.56 644.054 1207.56 643.747C1207.56 643.426 1207.48 643.143 1207.32 642.899C1207.16 642.652 1206.92 642.459 1206.62 642.319C1206.31 642.18 1205.94 642.111 1205.49 642.111H1204.79V641.173H1205.49C1205.84 641.173 1206.14 641.111 1206.4 640.986C1206.67 640.861 1206.87 640.684 1207.02 640.457C1207.17 640.23 1207.25 639.963 1207.25 639.656C1207.25 639.361 1207.18 639.103 1207.05 638.885C1206.92 638.666 1206.74 638.495 1206.5 638.373C1206.26 638.251 1205.98 638.19 1205.66 638.19C1205.36 638.19 1205.08 638.245 1204.81 638.356C1204.55 638.464 1204.33 638.622 1204.16 638.829C1204 639.034 1203.9 639.281 1203.89 639.571H1202.87C1202.88 639.113 1203.02 638.713 1203.28 638.369C1203.54 638.022 1203.88 637.753 1204.3 637.559C1204.72 637.366 1205.18 637.27 1205.68 637.27C1206.22 637.27 1206.68 637.379 1207.07 637.598C1207.46 637.814 1207.75 638.099 1207.96 638.454C1208.17 638.809 1208.27 639.193 1208.27 639.605C1208.27 640.096 1208.14 640.515 1207.88 640.862C1207.63 641.209 1207.28 641.449 1206.84 641.582V641.65C1207.39 641.741 1207.82 641.976 1208.13 642.353C1208.44 642.728 1208.6 643.193 1208.6 643.747C1208.6 644.221 1208.47 644.647 1208.21 645.025C1207.95 645.4 1207.6 645.696 1207.16 645.912C1206.72 646.128 1206.21 646.236 1205.65 646.236ZM1212.89 646.236C1212.31 646.236 1211.79 646.132 1211.34 645.924C1210.9 645.714 1210.55 645.426 1210.3 645.059C1210.05 644.69 1209.92 644.27 1209.93 643.798C1209.92 643.429 1210 643.088 1210.14 642.775C1210.29 642.46 1210.49 642.197 1210.75 641.987C1211.01 641.774 1211.3 641.639 1211.61 641.582V641.531C1211.2 641.423 1210.86 641.189 1210.62 640.828C1210.37 640.464 1210.25 640.051 1210.25 639.588C1210.25 639.145 1210.36 638.748 1210.59 638.399C1210.82 638.049 1211.13 637.774 1211.53 637.572C1211.93 637.37 1212.38 637.27 1212.89 637.27C1213.4 637.27 1213.85 637.37 1214.25 637.572C1214.65 637.774 1214.96 638.049 1215.19 638.399C1215.42 638.748 1215.53 639.145 1215.54 639.588C1215.53 640.051 1215.41 640.464 1215.16 640.828C1214.91 641.189 1214.58 641.423 1214.17 641.531V641.582C1214.49 641.639 1214.77 641.774 1215.02 641.987C1215.28 642.197 1215.48 642.46 1215.63 642.775C1215.78 643.088 1215.86 643.429 1215.86 643.798C1215.86 644.27 1215.73 644.69 1215.48 645.059C1215.23 645.426 1214.88 645.714 1214.43 645.924C1213.99 646.132 1213.48 646.236 1212.89 646.236ZM1212.89 645.298C1213.29 645.298 1213.63 645.234 1213.92 645.106C1214.2 644.978 1214.42 644.798 1214.58 644.565C1214.74 644.332 1214.82 644.059 1214.82 643.747C1214.82 643.417 1214.73 643.126 1214.56 642.873C1214.4 642.62 1214.17 642.422 1213.88 642.277C1213.59 642.132 1213.26 642.059 1212.89 642.059C1212.52 642.059 1212.19 642.132 1211.9 642.277C1211.61 642.422 1211.38 642.62 1211.21 642.873C1211.05 643.126 1210.96 643.417 1210.97 643.747C1210.96 644.059 1211.04 644.332 1211.19 644.565C1211.35 644.798 1211.57 644.978 1211.86 645.106C1212.15 645.234 1212.5 645.298 1212.89 645.298ZM1212.89 641.156C1213.21 641.156 1213.48 641.093 1213.72 640.968C1213.97 640.843 1214.16 640.669 1214.3 640.444C1214.44 640.22 1214.51 639.957 1214.51 639.656C1214.51 639.361 1214.44 639.103 1214.3 638.885C1214.17 638.663 1213.98 638.493 1213.74 638.373C1213.5 638.251 1213.21 638.19 1212.89 638.19C1212.57 638.19 1212.28 638.251 1212.04 638.373C1211.79 638.493 1211.6 638.663 1211.47 638.885C1211.34 639.103 1211.27 639.361 1211.27 639.656C1211.27 639.957 1211.34 640.22 1211.47 640.444C1211.61 640.669 1211.81 640.843 1212.05 640.968C1212.29 641.093 1212.58 641.156 1212.89 641.156Z"
          fill="#737373"
        />
        <line
          x1="1220.5"
          y1="631.506"
          x2="1220.5"
          y2="651.506"
          stroke="black"
        />
        <path
          d="M1233.58 647.726H1242.41C1243.03 647.726 1243.48 647.547 1243.79 647.188C1244.1 646.834 1244.25 646.301 1244.25 645.589V637.172C1244.25 636.46 1244.1 635.927 1243.79 635.573C1243.48 635.214 1243.03 635.035 1242.41 635.035H1233.58C1232.97 635.035 1232.51 635.214 1232.21 635.573C1231.9 635.927 1231.75 636.46 1231.75 637.172V645.589C1231.75 646.301 1231.9 646.834 1232.21 647.188C1232.51 647.547 1232.97 647.726 1233.58 647.726ZM1232.83 643.583V639.178C1232.83 639.063 1232.86 638.967 1232.93 638.889C1233 638.806 1233.09 638.764 1233.18 638.764C1233.28 638.764 1233.36 638.806 1233.43 638.889C1233.5 638.967 1233.54 639.063 1233.54 639.178V643.583C1233.54 643.698 1233.5 643.797 1233.43 643.879C1233.36 643.957 1233.28 643.997 1233.18 643.997C1233.09 643.997 1233 643.957 1232.93 643.879C1232.86 643.797 1232.83 643.698 1232.83 643.583ZM1234.62 646.616V636.145H1241.38V646.616H1234.62ZM1242.46 643.583V639.178C1242.46 639.063 1242.49 638.967 1242.56 638.889C1242.63 638.806 1242.72 638.764 1242.82 638.764C1242.91 638.764 1243 638.806 1243.06 638.889C1243.13 638.967 1243.17 639.063 1243.17 639.178V643.583C1243.17 643.698 1243.13 643.797 1243.06 643.879C1243 643.957 1242.91 643.997 1242.82 643.997C1242.72 643.997 1242.63 643.957 1242.56 643.879C1242.49 643.797 1242.46 643.698 1242.46 643.583ZM1228.91 643.493L1230.49 641.97C1230.65 641.814 1230.73 641.625 1230.73 641.405C1230.72 641.184 1230.65 640.996 1230.49 640.839L1228.91 639.281C1228.77 639.148 1228.62 639.084 1228.48 639.088C1228.34 639.088 1228.22 639.148 1228.13 639.268C1228.03 639.383 1227.99 639.546 1227.99 639.757V643.031C1227.99 643.234 1228.04 643.392 1228.13 643.507C1228.23 643.622 1228.35 643.682 1228.49 643.686C1228.63 643.686 1228.77 643.622 1228.91 643.493ZM1247.09 643.493C1247.22 643.622 1247.36 643.686 1247.5 643.686C1247.64 643.682 1247.76 643.622 1247.86 643.507C1247.96 643.392 1248.01 643.234 1248.01 643.031V639.757C1248.01 639.546 1247.96 639.383 1247.86 639.268C1247.77 639.148 1247.65 639.088 1247.51 639.088C1247.37 639.084 1247.23 639.148 1247.09 639.281L1245.5 640.839C1245.35 640.996 1245.27 641.184 1245.27 641.405C1245.26 641.625 1245.34 641.814 1245.5 641.97L1247.09 643.493Z"
          fill="#D7D7DB"
        />
        <path
          d="M22.7751 55.7539C28.3175 55.7539 32.8022 60.2387 32.8022 65.781C32.8022 71.3233 28.3175 75.8081 22.7751 75.8081C17.2328 75.8081 12.748 71.3233 12.748 65.781C12.748 60.2387 17.2328 55.7539 22.7751 55.7539Z"
          fill="#BCBCBC"
        />
        <path
          d="M27.6056 69.6974C27.2566 70.7793 26.733 71.5821 26 72.1755C25.2671 72.7688 24.2897 73.0829 23.0681 73.1877L22.8238 71.5821C23.6266 71.4774 24.22 71.3029 24.6039 71.0236C24.7435 70.9189 25.0228 70.6048 25.0228 70.6048L22.1257 61.3205H24.5341L26.2095 68.2663L27.9895 61.3205H30.328L27.6056 69.6974ZM19.1938 61.0063C19.7523 61.0063 20.2759 61.0762 20.6947 61.2507C21.1484 61.4252 21.5673 61.6695 21.9861 62.0185L21.0088 63.3449C20.7296 63.1355 20.4504 62.9958 20.206 62.8911C19.9617 62.7864 19.6476 62.7515 19.3684 62.7515C18.1816 62.7515 17.5883 63.659 17.5883 65.5089C17.5883 66.4513 17.7279 67.1144 18.042 67.4984C18.3562 67.9172 18.775 68.0918 19.3684 68.0918C19.6476 68.0918 19.9268 68.0568 20.1711 67.9522C20.4155 67.8474 20.6947 67.7079 21.0438 67.4984L22.021 68.8946C21.2183 69.5577 20.3108 69.8719 19.2637 69.8719C18.426 69.8719 17.7279 69.6974 17.0996 69.3483C16.5063 68.9993 16.0176 68.4757 15.7035 67.8125C15.3894 67.1494 15.2148 66.3815 15.2148 65.474C15.2148 64.6014 15.3894 63.7987 15.7035 63.1355C16.0176 62.4374 16.5063 61.9138 17.0996 61.5299C17.693 61.2158 18.3911 61.0063 19.1938 61.0063Z"
          fill="#081120"
        />
        <path
          d="M22.9023 86.6846C18.0529 86.6846 14.1172 90.6203 14.1172 95.4697C14.1172 100.319 18.0529 104.255 22.9023 104.255C27.7517 104.255 31.6874 100.319 31.6874 95.4697C31.6874 90.6203 27.7517 86.6846 22.9023 86.6846ZM23.7808 99.8622H22.0238V94.5912H23.7808V99.8622ZM23.7808 92.8342H22.0238V91.0771H23.7808V92.8342Z"
          fill="#01ACFD"
        />
        <path
          d="M31.0487 118.641H30.046V126.663C30.046 127.214 29.5948 127.666 29.0433 127.666H17.0108V128.668C17.0108 129.771 17.9133 130.674 19.0162 130.674H29.0433L33.0542 134.685V120.647C33.0542 119.544 32.1517 118.641 31.0487 118.641ZM28.0406 123.655V116.636C28.0406 115.533 27.1382 114.63 26.0352 114.63H15.0054C13.9024 114.63 13 115.533 13 116.636V129.671L17.0108 125.66H26.0352C27.1382 125.66 28.0406 124.758 28.0406 123.655Z"
          fill="#BCBCBC"
        />
        <path
          d="M25.1926 146.11C24.8751 145.793 24.449 145.617 24.0061 145.617H18.0149C17.0958 145.617 16.3438 146.369 16.3438 147.288V160.658C16.3438 161.577 17.0874 162.329 18.0066 162.329H28.042C28.9612 162.329 29.7132 161.577 29.7132 160.658V151.324C29.7132 150.881 29.5377 150.455 29.2202 150.146L25.1926 146.11ZM25.5352 158.987H20.5217C20.0621 158.987 19.6861 158.611 19.6861 158.151C19.6861 157.691 20.0621 157.315 20.5217 157.315H25.5352C25.9948 157.315 26.3708 157.691 26.3708 158.151C26.3708 158.611 25.9948 158.987 25.5352 158.987ZM25.5352 155.644H20.5217C20.0621 155.644 19.6861 155.268 19.6861 154.809C19.6861 154.349 20.0621 153.973 20.5217 153.973H25.5352C25.9948 153.973 26.3708 154.349 26.3708 154.809C26.3708 155.268 25.9948 155.644 25.5352 155.644ZM23.8641 150.631V146.871L28.4598 151.466H24.6996C24.2401 151.466 23.8641 151.09 23.8641 150.631Z"
          fill="#BCBCBC"
        />
        <path
          d="M27.612 186.318H26.7902L26.4989 186.037C27.5183 184.852 28.1321 183.312 28.1321 181.637C28.1321 177.903 25.1051 174.876 21.3707 174.876C17.6364 174.876 14.6094 177.903 14.6094 181.637C14.6094 185.372 17.6364 188.399 21.3707 188.399C23.0455 188.399 24.585 187.785 25.7708 186.766L26.0517 187.057V187.879L31.2527 193.069L32.8026 191.519L27.612 186.318ZM21.3707 186.318C18.7806 186.318 16.6898 184.227 16.6898 181.637C16.6898 179.047 18.7806 176.956 21.3707 176.956C23.9608 176.956 26.0517 179.047 26.0517 181.637C26.0517 184.227 23.9608 186.318 21.3707 186.318Z"
          fill="#BCBCBC"
        />
        <path
          d="M16.3419 210.097C16.5591 210.314 16.626 210.623 16.5508 210.915C16.2583 212.052 16.25 213.314 16.6343 214.575C17.3697 217.007 19.5088 218.837 22.0155 219.213C26.628 219.89 30.5302 215.82 29.5609 211.174C29.0178 208.559 26.862 206.487 24.2382 206.027C23.2272 205.852 22.2495 205.902 21.3471 206.136C21.0546 206.211 20.7371 206.136 20.5282 205.927C20.0603 205.459 20.2942 204.682 20.9209 204.515C22.1492 204.197 23.4778 204.147 24.8482 204.44C28.1738 205.158 30.7725 207.932 31.2822 211.291C32.1513 216.982 27.2547 221.803 21.556 220.834C18.2053 220.257 15.4896 217.609 14.8378 214.275C14.5788 212.946 14.6373 211.667 14.9381 210.489C15.1052 209.863 15.8823 209.637 16.3419 210.097ZM18.8487 207.172C18.8487 207.866 18.2888 208.425 17.5953 208.425C16.9017 208.425 16.3419 207.866 16.3419 207.172C16.3419 206.478 16.9017 205.919 17.5953 205.919C18.2888 205.919 18.8487 206.478 18.8487 207.172ZM23.0266 207.59C20.2608 207.59 18.0131 209.838 18.0131 212.603C18.0131 215.369 20.2608 217.617 23.0266 217.617C25.7924 217.617 28.0402 215.369 28.0402 212.603C28.0402 209.838 25.7924 207.59 23.0266 207.59ZM21.3554 215.11C20.8959 215.11 20.5198 214.734 20.5198 214.275V210.932C20.5198 210.473 20.8959 210.097 21.3554 210.097C21.815 210.097 22.191 210.473 22.191 210.932V214.275C22.191 214.734 21.815 215.11 21.3554 215.11ZM24.6978 215.11C24.2382 215.11 23.8622 214.734 23.8622 214.275V210.932C23.8622 210.473 24.2382 210.097 24.6978 210.097C25.1574 210.097 25.5334 210.473 25.5334 210.932V214.275C25.5334 214.734 25.1574 215.11 24.6978 215.11Z"
          fill="#BCBCBC"
        />
        <path
          d="M0 89C0.552285 89 1 89.4477 1 90V104C1 104.552 0.552285 105 0 105V89Z"
          fill="#01ACFD"
        />
      </g>
      <defs>
        <clipPath id="clip0_1603_871">
          <rect width="1264" height="674" fill="white" />
        </clipPath>
        <clipPath id="clip1_1603_871">
          <rect width="1264" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
