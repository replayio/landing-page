import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import { gsap } from 'lib/gsap'
import { omit } from 'lodash'
import Image, { ImageProps } from 'next/image'
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
import bugslayerPanel from '~/images/homepage/devtools/bugslayer-panel.png'
import codePanel2 from '~/images/homepage/devtools/code-2-panel.png'
import codePanel3 from '~/images/homepage/devtools/code-3-panel.png'
import codePanel4 from '~/images/homepage/devtools/code-4-panel.png'
import codePanel from '~/images/homepage/devtools/code-panel.png'
import consoleLogs2Panel from '~/images/homepage/devtools/console-logs-2-panel.png'
import consoleLogsPanel from '~/images/homepage/devtools/console-logs-panel.png'
import consoleLogsPanelSmall from '~/images/homepage/devtools/console-logs-small-panel.png'
import formPanel from '~/images/homepage/devtools/form-panel.png'
import networkPanel from '~/images/homepage/devtools/network-panel.png'
import reactPanel from '~/images/homepage/devtools/react-panel.png'
import testsPanel from '~/images/homepage/devtools/tests-panel.png'
import tracePanel from '~/images/homepage/devtools/trace-panel.png'
import { padZeroes } from '~/lib/utils'

import s from './developer-tools.module.scss'

type PanelWrapper = (props: Partial<ImageProps>) => JSX.Element
type ColConfig = Omit<JSX.IntrinsicElements['div'], 'children'> & {
  children: PanelWrapper[] | PanelWrapper
}

const chunks: {
  mobilePanel?: PanelWrapper
  panels?: ColConfig[]
  title: string
  description: string
}[] = [
  {
    mobilePanel: ({ className, ...props }) => (
      <Image
        {...props}
        className={clsx(s['mobile-panel'], className)}
        src={reactPanel}
        quality={100}
        alt="code panel"
      />
    ),
    panels: [
      {
        style: { width: '45.8%' },
        children: (props) => (
          <Image
            {...props}
            className={s['panel']}
            src={codePanel}
            alt="code panel"
            quality={100}
            draggable={false}
          />
        )
      },
      {
        style: { width: '52.6%' },
        children: [
          ({ style, ...props }) => (
            <Image
              {...props}
              style={{
                aspectRatio: (642 / 264).toString(),
                width: '100%',
                objectFit: 'contain',
                ...style
              }}
              className={s['panel']}
              src={bugslayerPanel}
              alt="app panel"
              quality={100}
              draggable={false}
            />
          ),
          (props) => (
            <Image
              {...props}
              className={clsx(s['panel'], s['highlight-panel'])}
              src={reactPanel}
              alt="code panel"
              quality={100}
              draggable={false}
            />
          )
        ]
      }
    ],
    title: 'Next-Gen React DevTools',
    description:
      'Whether you’re using context, state, or effects, Replay gives you the tools to inspect your component and see why it rendered.'
  },
  {
    mobilePanel: ({ className, ...props }) => (
      <Image
        {...props}
        className={clsx(s['mobile-panel'], className)}
        quality={100}
        src={testsPanel}
        alt="code panel"
      />
    ),
    panels: [
      {
        style: { width: '46%' },
        children: (props) => (
          <Image
            {...props}
            className={clsx(s['panel'], s['highlight-panel'])}
            src={codePanel2}
            alt="code panel"
            quality={100}
            draggable={false}
          />
        )
      },
      {
        style: { width: '52.6%' },
        children: [
          ({ style, ...props }) => (
            <Image
              {...props}
              style={{
                aspectRatio: (642 / 264).toString(),
                width: '100%',
                objectFit: 'contain',
                ...style
              }}
              className={s['panel']}
              src={bugslayerPanel}
              alt="app panel"
              quality={100}
              draggable={false}
            />
          ),
          (props) => (
            <Image
              {...props}
              className={s['panel']}
              src={consoleLogsPanel}
              alt="code panel"
              quality={100}
              draggable={false}
            />
          )
        ]
      }
    ],
    title: 'Instant console logs',
    description:
      'We’ve obsessed over the perfect print statement loop where you can add an expression and see the logs immediately'
  },
  {
    mobilePanel: ({ className, ...props }) => (
      <Image
        {...props}
        className={clsx(s['mobile-panel'], className)}
        src={tracePanel}
        quality={100}
        alt="code panel"
      />
    ),
    panels: [
      {
        style: { width: '26.1%' },
        children: (props) => (
          <Image
            {...props}
            className={clsx(s['panel'], s['highlight-panel'])}
            src={testsPanel}
            alt="code panel"
            quality={100}
            draggable={false}
          />
        )
      },
      {
        style: { width: '33.6%' },
        children: (props) => (
          <Image
            {...props}
            className={s['panel']}
            src={codePanel3}
            alt="app panel"
            quality={100}
            draggable={false}
          />
        )
      },
      {
        style: { width: '37.9%' },
        children: [
          (props) => (
            <Image
              {...props}
              className={s['panel']}
              src={formPanel}
              alt="app panel"
              quality={100}
              draggable={false}
            />
          ),
          (props) => (
            <Image
              {...props}
              className={s['panel']}
              src={consoleLogs2Panel}
              alt="code panel"
              quality={100}
              draggable={false}
            />
          )
        ]
      }
    ],
    title: 'De-flake Cypress test',
    description:
      'Start recording your cypress test in CI and never worry about reproducing failures locally in order to time travel thought your test steps and asserts.'
  },
  {
    mobilePanel: ({ className, ...props }) => (
      <Image
        {...props}
        className={clsx(s['mobile-panel'], className)}
        src={networkPanel}
        quality={100}
        alt="code panel"
      />
    ),
    panels: [
      {
        style: { width: '20%' },
        children: (props) => (
          <Image
            {...props}
            className={clsx(s['panel'], s['highlight-panel'])}
            src={tracePanel}
            alt="code panel"
            quality={100}
            draggable={false}
          />
        )
      },
      {
        style: { width: '36.45%' },
        children: (props) => (
          <Image
            {...props}
            className={s['panel']}
            src={codePanel4}
            alt="code panel"
            quality={100}
            draggable={false}
          />
        )
      },
      {
        style: { width: '41.5%' },
        children: [
          ({ style, ...props }) => (
            <Image
              {...props}
              style={{
                aspectRatio: (508 / 264).toString(),
                width: '100%',
                objectFit: 'contain',
                ...style
              }}
              className={s['panel']}
              src={bugslayerPanel}
              alt="code panel"
              quality={100}
              draggable={false}
            />
          ),
          (props) => (
            <Image
              {...props}
              className={s['panel']}
              src={consoleLogsPanelSmall}
              alt="code panel"
              quality={100}
              draggable={false}
            />
          )
        ]
      }
    ],
    title: 'Time travel to any point in time',
    description:
      'Experience the magic of time travel by jumping to any Console log, React onClick, Redux dispatch, and React setState.'
  },
  {
    mobilePanel: ({ className, ...props }) => (
      <Image
        {...props}
        className={clsx(s['mobile-panel'], className)}
        src={networkPanel}
        quality={100}
        alt="code panel"
      />
    ),
    panels: [
      {
        style: { width: '45.8%' },
        children: (props) => (
          <Image
            {...props}
            className={s['panel']}
            src={codePanel}
            alt="code panel"
            quality={100}
            draggable={false}
          />
        )
      },
      {
        style: { width: '52.5%' },
        children: [
          ({ style, ...props }) => (
            <Image
              {...props}
              style={{
                aspectRatio: (652 / 264).toString(),
                width: '100%',
                objectFit: 'contain',
                ...style
              }}
              className={s['panel']}
              src={bugslayerPanel}
              alt="app panel"
              quality={100}
              draggable={false}
            />
          ),
          (props) => (
            <Image
              {...props}
              className={clsx(s['panel'], s['highlight-panel'])}
              src={networkPanel}
              alt="code panel"
              quality={100}
              draggable={false}
            />
          )
        ]
      }
    ],
    title: 'Powerful Browser DevTools',
    description:
      'Inspect UI elements, Network events, Console logs, Call Stacks, and Scopes as if your application is running live.'
  }
]

export const DeveloperTools = () => {
  const isTablet = useTabletBreakpoint()
  const { isDesktop } = useDeviceDetect()
  const [emblaRef, embla] = useEmblaCarousel({ align: 'start' })
  const [inViewRef, inView] = useIntersectionObserver<HTMLDivElement>({})

  const [activeChunk, setActiveChunk] = useState(0)
  const devtoolsRef = useRef<HTMLDivElement>(null)
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
      id="homepage-developer-tools"
      className={s['section']}
      data-sitemap
      data-sitemap-icon="debugging"
      data-sitemap-short-title="Debugging"
      data-sitemap-complete-title="Explore the 4th dimension."
    >
      <div className={s['container']}>
        <TitleAndSubtitle
          title={{
            as: 'h2',
            children: 'Explore the 4th dimension.'
          }}
          subtitle={{
            children:
              'Travel through time and inspect your application with supercharged DevTools. '
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
            <div className={s['wrapper']} ref={devtoolsRef}>
              <AspectBox ratio={1264 / 722} className={s['devtools']}>
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

                      <span className={s['idx']}>{padZeroes(idx + 1, 2)}.</span>
                      <h3 className={s['title']}>{chunk.title}</h3>
                    </button>

                    <div className={s['body']}>
                      <p className={s['description']}>{chunk.description}</p>
                      <NavLink
                        invertedHover
                        href="/"
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
    </Section>
  )
}

const BackLines = () => {
  return (
    <svg
      className={s['back-lines']}
      viewBox="0 0 1440 707"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_ddd_2677_88836)">
        <path d="M1440 357.437L1 357.437" stroke="#F41C52" />
      </g>
      <g filter="url(#filter1_ddd_2677_88836)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.000318527 446.444C109.023 427.94 405.552 390.937 719.584 390.937V391.937C405.616 391.937 109.145 428.933 0.16765 447.429L0.000318527 446.444ZM1439.67 446.444C1330.64 427.94 1034.12 390.937 720.084 390.937V391.937C1034.05 391.937 1330.52 428.933 1439.5 447.429L1439.67 446.444Z"
          fill="#F41C52"
        />
      </g>
      <g filter="url(#filter2_ddd_2677_88836)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-14.0012 141.873C71.9179 189.754 338.971 285.437 720.242 285.437C1101.51 285.437 1368.57 189.754 1454.49 141.873L1454 141C1368.25 188.785 1101.37 284.437 720.242 284.437C339.113 284.437 72.2331 188.785 -13.5144 141L-14.0012 141.873Z"
          fill="#F41C52"
        />
      </g>
      <g filter="url(#filter3_ddd_2677_88836)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-13.9993 569C71.9199 521.118 338.973 425.436 720.244 425.436C1101.52 425.436 1368.57 521.118 1454.49 569L1454 569.873C1368.25 522.088 1101.37 426.436 720.244 426.436C339.115 426.436 72.2351 522.088 -13.5125 569.873L-13.9993 569Z"
          fill="#F41C52"
        />
      </g>
      <g filter="url(#filter4_ddd_2677_88836)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.000318527 265.93C109.023 284.433 405.552 321.437 719.584 321.437V320.437C405.616 320.437 109.145 283.44 0.16765 264.944L0.000318527 265.93ZM1439.67 265.93C1330.64 284.434 1034.12 321.437 720.084 321.437V320.437C1034.05 320.437 1330.52 283.44 1439.5 264.944L1439.67 265.93Z"
          fill="#F41C52"
        />
      </g>
      <g filter="url(#filter5_ddd_2677_88836)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-14.3061 17.3955C86.095 95.1146 373.466 250.5 720 250.5C1066.53 250.5 1353.9 95.1146 1454.31 17.3955L1453.69 16.6047C1353.43 94.219 1066.27 249.5 720 249.5C373.734 249.5 86.5717 94.219 -13.6939 16.6047L-14.3061 17.3955Z"
          fill="#F41C52"
        />
      </g>
      <g filter="url(#filter6_ddd_2677_88836)">
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
      viewBox="0 0 1264 722"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_3029_169941)">
        <rect width="1264" height="722" fill="#081120" />
        <g clipPath="url(#clip1_3029_169941)">
          <rect width="1264" height="48" fill="#0A111F" />
          <path
            d="M65.8097 24.4545C65.8097 25.8523 65.554 27.054 65.0426 28.0597C64.5313 29.0611 63.8303 29.8324 62.9396 30.3736C62.0533 30.9105 61.0455 31.179 59.9162 31.179C58.7827 31.179 57.7706 30.9105 56.88 30.3736C55.9936 29.8324 55.2947 29.0589 54.7834 28.0533C54.272 27.0476 54.0163 25.848 54.0163 24.4545C54.0163 23.0568 54.272 21.8572 54.7834 20.8558C55.2947 19.8501 55.9936 19.0788 56.88 18.5419C57.7706 18.0007 58.7827 17.7301 59.9162 17.7301C61.0455 17.7301 62.0533 18.0007 62.9396 18.5419C63.8303 19.0788 64.5313 19.8501 65.0426 20.8558C65.554 21.8572 65.8097 23.0568 65.8097 24.4545ZM63.8537 24.4545C63.8537 23.3892 63.6811 22.4922 63.3359 21.7635C62.995 21.0305 62.5263 20.4766 61.9297 20.1016C61.3374 19.7223 60.6662 19.5327 59.9162 19.5327C59.1619 19.5327 58.4886 19.7223 57.8963 20.1016C57.304 20.4766 56.8352 21.0305 56.4901 21.7635C56.1491 22.4922 55.9787 23.3892 55.9787 24.4545C55.9787 25.5199 56.1491 26.419 56.4901 27.152C56.8352 27.8807 57.304 28.4347 57.8963 28.8139C58.4886 29.1889 59.1619 29.3764 59.9162 29.3764C60.6662 29.3764 61.3374 29.1889 61.9297 28.8139C62.5263 28.4347 62.995 27.8807 63.3359 27.152C63.6811 26.419 63.8537 25.5199 63.8537 24.4545ZM76.5179 21.1818L72.9576 31H70.9121L67.3453 21.1818H69.3972L71.8837 28.7372H71.986L74.4661 21.1818H76.5179ZM82.2116 31.1982C81.2443 31.1982 80.4112 30.9915 79.7124 30.5781C79.0178 30.1605 78.4808 29.5746 78.1016 28.8203C77.7266 28.0618 77.5391 27.1733 77.5391 26.1548C77.5391 25.1491 77.7266 24.2628 78.1016 23.4957C78.4808 22.7287 79.0092 22.13 79.6868 21.6996C80.3686 21.2692 81.1655 21.054 82.0774 21.054C82.6314 21.054 83.1683 21.1456 83.6882 21.3288C84.2081 21.5121 84.6747 21.7997 85.0881 22.1918C85.5014 22.5838 85.8274 23.093 86.0661 23.7195C86.3047 24.3416 86.424 25.098 86.424 25.9886V26.6662H78.6193V25.2344H84.5511C84.5511 24.7315 84.4489 24.2862 84.2443 23.8984C84.0398 23.5064 83.7521 23.1974 83.3814 22.9716C83.0149 22.7457 82.5845 22.6328 82.0902 22.6328C81.5533 22.6328 81.0845 22.7649 80.6839 23.0291C80.2876 23.2891 79.9808 23.63 79.7635 24.0518C79.5504 24.4695 79.4439 24.9233 79.4439 25.4134V26.532C79.4439 27.1882 79.5589 27.7464 79.7891 28.2067C80.0234 28.6669 80.3494 29.0185 80.767 29.2614C81.1847 29.5 81.6726 29.6193 82.2308 29.6193C82.593 29.6193 82.9233 29.5682 83.2216 29.4659C83.5199 29.3594 83.7777 29.2017 83.995 28.9929C84.2124 28.7841 84.3786 28.5263 84.4936 28.2195L86.3026 28.5455C86.1577 29.0781 85.8977 29.5447 85.5227 29.9453C85.152 30.3416 84.6854 30.6506 84.1229 30.8722C83.5646 31.0895 82.9276 31.1982 82.2116 31.1982ZM88.5446 31V21.1818H90.3919V22.7415H90.4941C90.6731 22.2131 90.9885 21.7976 91.4402 21.495C91.8961 21.1882 92.4118 21.0348 92.987 21.0348C93.1064 21.0348 93.247 21.0391 93.4089 21.0476C93.5751 21.0561 93.7051 21.0668 93.7988 21.0795V22.9077C93.7221 22.8864 93.5858 22.8629 93.3897 22.8374C93.1937 22.8075 92.9977 22.7926 92.8017 22.7926C92.35 22.7926 91.9473 22.8885 91.5936 23.0803C91.2441 23.2678 90.9672 23.5298 90.7626 23.8665C90.5581 24.1989 90.4558 24.5781 90.4558 25.0043V31H88.5446ZM95.6062 31V17.9091H97.5174V22.7734H97.6325C97.7433 22.5689 97.9031 22.3324 98.1119 22.0639C98.3207 21.7955 98.6104 21.5611 98.9812 21.3608C99.3519 21.1562 99.842 21.054 100.451 21.054C101.244 21.054 101.951 21.2543 102.574 21.6548C103.196 22.0554 103.684 22.6328 104.037 23.3871C104.395 24.1413 104.574 25.049 104.574 26.1101C104.574 27.1712 104.397 28.081 104.044 28.8395C103.69 29.5937 103.204 30.1754 102.586 30.5845C101.968 30.9893 101.263 31.1918 100.471 31.1918C99.8739 31.1918 99.386 31.0916 99.0067 30.8913C98.6317 30.6911 98.3377 30.4567 98.1246 30.1882C97.9116 29.9197 97.7475 29.6811 97.6325 29.4723H97.4727V31H95.6062ZM97.479 26.0909C97.479 26.7812 97.5792 27.3864 97.7795 27.9062C97.9798 28.4261 98.2695 28.8331 98.6488 29.1271C99.0281 29.4169 99.4925 29.5618 100.042 29.5618C100.613 29.5618 101.091 29.4105 101.474 29.108C101.858 28.8011 102.147 28.3857 102.343 27.8615C102.544 27.3374 102.644 26.7472 102.644 26.0909C102.644 25.4432 102.546 24.8615 102.35 24.3459C102.158 23.8303 101.868 23.4233 101.48 23.125C101.097 22.8267 100.618 22.6776 100.042 22.6776C99.4883 22.6776 99.0195 22.8203 98.636 23.1058C98.2567 23.3913 97.9691 23.7898 97.7731 24.3011C97.5771 24.8125 97.479 25.4091 97.479 26.0909ZM110.856 31.1982C109.936 31.1982 109.132 30.9872 108.446 30.5653C107.76 30.1435 107.227 29.5533 106.848 28.7947C106.469 28.0362 106.279 27.1499 106.279 26.1357C106.279 25.1172 106.469 24.2266 106.848 23.4638C107.227 22.701 107.76 22.1087 108.446 21.6868C109.132 21.2649 109.936 21.054 110.856 21.054C111.776 21.054 112.58 21.2649 113.266 21.6868C113.952 22.1087 114.485 22.701 114.864 23.4638C115.243 24.2266 115.433 25.1172 115.433 26.1357C115.433 27.1499 115.243 28.0362 114.864 28.7947C114.485 29.5533 113.952 30.1435 113.266 30.5653C112.58 30.9872 111.776 31.1982 110.856 31.1982ZM110.862 29.5938C111.459 29.5938 111.953 29.4361 112.345 29.1207C112.737 28.8054 113.027 28.3857 113.215 27.8615C113.406 27.3374 113.502 26.7599 113.502 26.1293C113.502 25.5028 113.406 24.9276 113.215 24.4034C113.027 23.875 112.737 23.451 112.345 23.1314C111.953 22.8118 111.459 22.652 110.862 22.652C110.262 22.652 109.763 22.8118 109.367 23.1314C108.975 23.451 108.683 23.875 108.491 24.4034C108.303 24.9276 108.21 25.5028 108.21 26.1293C108.21 26.7599 108.303 27.3374 108.491 27.8615C108.683 28.3857 108.975 28.8054 109.367 29.1207C109.763 29.4361 110.262 29.5938 110.862 29.5938ZM120.423 31.2173C119.801 31.2173 119.239 31.1023 118.736 30.8722C118.233 30.6378 117.835 30.299 117.54 29.8558C117.251 29.4126 117.106 28.8693 117.106 28.2259C117.106 27.6719 117.212 27.2159 117.425 26.858C117.638 26.5 117.926 26.2166 118.288 26.0078C118.651 25.799 119.055 25.6413 119.503 25.5348C119.95 25.4283 120.406 25.3473 120.871 25.2919C121.459 25.2237 121.936 25.1683 122.303 25.1257C122.669 25.0788 122.935 25.0043 123.102 24.902C123.268 24.7997 123.351 24.6335 123.351 24.4034V24.3587C123.351 23.8004 123.193 23.3679 122.878 23.0611C122.567 22.7543 122.102 22.6009 121.484 22.6009C120.841 22.6009 120.334 22.7436 119.963 23.0291C119.597 23.3104 119.343 23.6236 119.202 23.9688L117.406 23.5597C117.619 22.9631 117.93 22.4815 118.339 22.1151C118.753 21.7443 119.228 21.4759 119.765 21.3097C120.302 21.1392 120.866 21.054 121.459 21.054C121.851 21.054 122.266 21.1009 122.705 21.1946C123.148 21.2841 123.562 21.4503 123.945 21.6932C124.333 21.9361 124.651 22.2834 124.898 22.7351C125.145 23.1825 125.268 23.7642 125.268 24.4801V31H123.402V29.6577H123.325C123.202 29.9048 123.016 30.1477 122.769 30.3864C122.522 30.625 122.205 30.8232 121.817 30.9808C121.429 31.1385 120.964 31.2173 120.423 31.2173ZM120.839 29.6832C121.367 29.6832 121.819 29.5788 122.194 29.37C122.573 29.1612 122.861 28.8885 123.057 28.5518C123.257 28.2109 123.357 27.8466 123.357 27.4588V26.1932C123.289 26.2614 123.157 26.3253 122.961 26.3849C122.769 26.4403 122.55 26.4893 122.303 26.532C122.055 26.5703 121.815 26.6065 121.58 26.6406C121.346 26.6705 121.15 26.696 120.992 26.7173C120.621 26.7642 120.283 26.843 119.976 26.9538C119.673 27.0646 119.43 27.2244 119.247 27.4332C119.068 27.6378 118.979 27.9105 118.979 28.2514C118.979 28.7244 119.153 29.0824 119.503 29.3253C119.852 29.5639 120.298 29.6832 120.839 29.6832ZM127.814 31V21.1818H129.661V22.7415H129.764C129.943 22.2131 130.258 21.7976 130.71 21.495C131.166 21.1882 131.681 21.0348 132.257 21.0348C132.376 21.0348 132.517 21.0391 132.678 21.0476C132.845 21.0561 132.975 21.0668 133.068 21.0795V22.9077C132.992 22.8864 132.855 22.8629 132.659 22.8374C132.463 22.8075 132.267 22.7926 132.071 22.7926C131.619 22.7926 131.217 22.8885 130.863 23.0803C130.514 23.2678 130.237 23.5298 130.032 23.8665C129.828 24.1989 129.725 24.5781 129.725 25.0043V31H127.814ZM138.046 31.1918C137.254 31.1918 136.546 30.9893 135.924 30.5845C135.306 30.1754 134.82 29.5937 134.467 28.8395C134.117 28.081 133.942 27.1712 133.942 26.1101C133.942 25.049 134.119 24.1413 134.473 23.3871C134.831 22.6328 135.321 22.0554 135.943 21.6548C136.565 21.2543 137.271 21.054 138.059 21.054C138.668 21.054 139.158 21.1562 139.529 21.3608C139.904 21.5611 140.194 21.7955 140.398 22.0639C140.607 22.3324 140.769 22.5689 140.884 22.7734H140.999V17.9091H142.911V31H141.044V29.4723H140.884C140.769 29.6811 140.603 29.9197 140.386 30.1882C140.173 30.4567 139.879 30.6911 139.504 30.8913C139.129 31.0916 138.643 31.1918 138.046 31.1918ZM138.468 29.5618C139.018 29.5618 139.482 29.4169 139.862 29.1271C140.245 28.8331 140.535 28.4261 140.731 27.9062C140.931 27.3864 141.031 26.7812 141.031 26.0909C141.031 25.4091 140.933 24.8125 140.737 24.3011C140.541 23.7898 140.254 23.3913 139.874 23.1058C139.495 22.8203 139.026 22.6776 138.468 22.6776C137.893 22.6776 137.413 22.8267 137.03 23.125C136.646 23.4233 136.357 23.8303 136.161 24.3459C135.969 24.8615 135.873 25.4432 135.873 26.0909C135.873 26.7472 135.971 27.3374 136.167 27.8615C136.363 28.3857 136.653 28.8011 137.036 29.108C137.424 29.4105 137.901 29.5618 138.468 29.5618Z"
            fill="#D7D7DB"
          />
          <rect x="784" y="8" width="94" height="32" rx="8" fill="#01ACFD" />
          <path
            d="M810.142 20.1818L809.382 20.9564L808.53 20.0891V26.1818H807.469V20.0891L806.617 20.9564L805.857 20.1818L808 18L810.142 20.1818ZM812.285 22.9091V28.9091C812.285 29.5091 811.803 30 811.214 30H804.785C804.191 30 803.714 29.5091 803.714 28.9091V22.9091C803.714 22.3036 804.191 21.8182 804.785 21.8182H806.392V22.9091H804.785V28.9091H811.214V22.9091H809.607V21.8182H811.214C811.803 21.8182 812.285 22.3036 812.285 22.9091Z"
            fill="white"
          />
          <path
            d="M825.582 20.8182C825.518 20.2784 825.259 19.8594 824.804 19.5611C824.35 19.2628 823.792 19.1136 823.132 19.1136C822.649 19.1136 822.226 19.1918 821.864 19.348C821.505 19.5043 821.225 19.7191 821.022 19.9925C820.823 20.266 820.724 20.5767 820.724 20.9247C820.724 21.2159 820.793 21.4663 820.932 21.6758C821.074 21.8817 821.255 22.054 821.475 22.1925C821.695 22.3274 821.926 22.4393 822.167 22.5281C822.409 22.6133 822.631 22.6825 822.833 22.7358L823.941 23.0341C824.225 23.1087 824.541 23.2116 824.889 23.343C825.241 23.4744 825.577 23.6538 825.896 23.881C826.219 24.1048 826.486 24.3924 826.695 24.744C826.905 25.0955 827.009 25.527 827.009 26.0384C827.009 26.6278 826.855 27.1605 826.546 27.6364C826.241 28.1122 825.793 28.4904 825.204 28.771C824.618 29.0515 823.906 29.1918 823.068 29.1918C822.286 29.1918 821.61 29.0657 821.038 28.8136C820.47 28.5614 820.023 28.2099 819.696 27.7589C819.373 27.3079 819.19 26.7841 819.147 26.1875H820.511C820.546 26.5994 820.685 26.9403 820.926 27.2102C821.171 27.4766 821.48 27.6754 821.853 27.8068C822.23 27.9347 822.634 27.9986 823.068 27.9986C823.572 27.9986 824.025 27.9169 824.426 27.7536C824.827 27.5866 825.145 27.3558 825.379 27.0611C825.614 26.7628 825.731 26.4148 825.731 26.017C825.731 25.6548 825.63 25.3601 825.427 25.1328C825.225 24.9055 824.959 24.7209 824.628 24.5788C824.298 24.4368 823.941 24.3125 823.558 24.206L822.215 23.8224C821.363 23.5774 820.688 23.2276 820.191 22.7731C819.694 22.3185 819.446 21.7237 819.446 20.9886C819.446 20.3778 819.611 19.8452 819.941 19.3906C820.275 18.9325 820.722 18.5774 821.283 18.3253C821.848 18.0696 822.478 17.9418 823.174 17.9418C823.877 17.9418 824.502 18.0678 825.049 18.32C825.596 18.5685 826.029 18.9094 826.349 19.3427C826.672 19.7759 826.843 20.2678 826.86 20.8182H825.582ZM830.028 24.0781V29H828.771V18.0909H830.028V22.0966H830.135C830.326 21.674 830.614 21.3384 830.998 21.0898C831.385 20.8377 831.899 20.7116 832.542 20.7116C833.1 20.7116 833.588 20.8235 834.007 21.0472C834.426 21.2674 834.751 21.6065 834.982 22.0646C835.216 22.5192 835.333 23.098 835.333 23.8011V29H834.076V23.8864C834.076 23.2365 833.908 22.734 833.57 22.3789C833.236 22.0202 832.773 21.8409 832.18 21.8409C831.768 21.8409 831.399 21.9279 831.072 22.1019C830.749 22.2759 830.493 22.5298 830.305 22.8636C830.12 23.1974 830.028 23.6023 830.028 24.0781ZM839.801 29.1918C839.282 29.1918 838.812 29.0941 838.389 28.8988C837.967 28.6999 837.631 28.4141 837.383 28.0412C837.134 27.6648 837.01 27.2102 837.01 26.6776C837.01 26.2088 837.102 25.8288 837.287 25.5376C837.471 25.2429 837.718 25.0121 838.027 24.8452C838.336 24.6783 838.677 24.554 839.05 24.4723C839.426 24.3871 839.804 24.3196 840.184 24.2699C840.682 24.206 841.085 24.158 841.394 24.1261C841.706 24.0906 841.933 24.032 842.075 23.9503C842.221 23.8686 842.294 23.7266 842.294 23.5241V23.4815C842.294 22.956 842.15 22.5476 841.862 22.2564C841.578 21.9652 841.147 21.8196 840.568 21.8196C839.968 21.8196 839.497 21.951 839.156 22.2138C838.815 22.4766 838.576 22.7571 838.437 23.0554L837.244 22.6293C837.457 22.1321 837.741 21.745 838.096 21.468C838.455 21.1875 838.846 20.9922 839.268 20.8821C839.694 20.7685 840.113 20.7116 840.525 20.7116C840.788 20.7116 841.09 20.7436 841.431 20.8075C841.775 20.8679 842.107 20.994 842.427 21.1857C842.75 21.3775 843.018 21.6669 843.231 22.054C843.444 22.4411 843.551 22.9595 843.551 23.6094V29H842.294V27.892H842.23C842.145 28.0696 842.003 28.2596 841.804 28.462C841.605 28.6644 841.34 28.8366 841.01 28.9787C840.68 29.1207 840.277 29.1918 839.801 29.1918ZM839.993 28.0625C840.49 28.0625 840.909 27.9648 841.25 27.7695C841.594 27.5742 841.853 27.3221 842.027 27.0131C842.205 26.7042 842.294 26.3793 842.294 26.0384V24.8878C842.241 24.9517 842.123 25.0103 841.942 25.0636C841.765 25.1133 841.559 25.1577 841.324 25.1967C841.094 25.2322 840.868 25.2642 840.648 25.2926C840.431 25.3175 840.255 25.3388 840.121 25.3565C839.794 25.3991 839.488 25.4684 839.204 25.5643C838.924 25.6566 838.697 25.7969 838.523 25.9851C838.352 26.1697 838.267 26.4219 838.267 26.7415C838.267 27.1783 838.428 27.5085 838.752 27.7322C839.078 27.9524 839.492 28.0625 839.993 28.0625ZM845.605 29V20.8182H846.82V22.054H846.905C847.054 21.6491 847.324 21.3207 847.715 21.0685C848.105 20.8164 848.546 20.6903 849.036 20.6903C849.128 20.6903 849.244 20.6921 849.382 20.6957C849.521 20.6992 849.625 20.7045 849.696 20.7116V21.9901C849.654 21.9794 849.556 21.9634 849.403 21.9421C849.254 21.9173 849.096 21.9048 848.929 21.9048C848.532 21.9048 848.176 21.9883 847.864 22.1552C847.555 22.3185 847.31 22.5458 847.129 22.837C846.951 23.1246 846.862 23.4531 846.862 23.8224V29H845.605ZM854.128 29.1705C853.339 29.1705 852.659 28.9964 852.088 28.6484C851.52 28.2969 851.081 27.8068 850.772 27.1783C850.467 26.5462 850.314 25.8111 850.314 24.973C850.314 24.1349 850.467 23.3963 850.772 22.7571C851.081 22.1143 851.511 21.6136 852.061 21.255C852.615 20.8928 853.261 20.7116 854 20.7116C854.426 20.7116 854.847 20.7827 855.262 20.9247C855.678 21.0668 856.056 21.2976 856.397 21.6172C856.738 21.9332 857.01 22.3523 857.212 22.8743C857.414 23.3963 857.516 24.0391 857.516 24.8026V25.3352H851.209V24.2486H856.237C856.237 23.7869 856.145 23.375 855.96 23.0128C855.779 22.6506 855.52 22.3647 855.183 22.1552C854.849 21.9457 854.455 21.8409 854 21.8409C853.499 21.8409 853.066 21.9652 852.7 22.2138C852.338 22.4588 852.059 22.7784 851.864 23.1726C851.669 23.5668 851.571 23.9893 851.571 24.4403V25.1648C851.571 25.7827 851.678 26.3065 851.891 26.7362C852.107 27.1623 852.407 27.4872 852.791 27.7109C853.174 27.9311 853.62 28.0412 854.128 28.0412C854.458 28.0412 854.756 27.995 855.023 27.9027C855.293 27.8068 855.525 27.6648 855.721 27.4766C855.916 27.2848 856.067 27.0469 856.173 26.7628L857.388 27.1037C857.26 27.5156 857.045 27.8778 856.743 28.1903C856.441 28.4993 856.069 28.7408 855.625 28.9148C855.181 29.0852 854.682 29.1705 854.128 29.1705Z"
            fill="#F9F9FA"
          />
          <rect x="894" y="8" width="307" height="32" rx="8" fill="#3F434A" />
          <rect x="1044.83" y="9" width="155" height="30" rx="8" fill="black" />
          <path
            d="M949.335 18.0885L952.573 27.2717H952.701L955.94 18.0885H957.325L953.319 28.9976H951.956L947.95 18.0885H949.335ZM958.614 28.9976V20.8157H959.871V28.9976H958.614ZM959.253 19.4521C959.008 19.4521 958.796 19.3687 958.619 19.2017C958.445 19.0348 958.358 18.8342 958.358 18.5998C958.358 18.3655 958.445 18.1648 958.619 17.9979C958.796 17.831 959.008 17.7476 959.253 17.7476C959.498 17.7476 959.707 17.831 959.881 17.9979C960.059 18.1648 960.148 18.3655 960.148 18.5998C960.148 18.8342 960.059 19.0348 959.881 19.2017C959.707 19.3687 959.498 19.4521 959.253 19.4521ZM965.364 29.168C964.575 29.168 963.895 28.994 963.323 28.646C962.755 28.2944 962.317 27.8044 962.008 27.1758C961.702 26.5437 961.55 25.8086 961.55 24.9706C961.55 24.1325 961.702 23.3939 962.008 22.7547C962.317 22.1119 962.746 21.6112 963.297 21.2525C963.851 20.8903 964.497 20.7092 965.236 20.7092C965.662 20.7092 966.083 20.7802 966.498 20.9223C966.914 21.0643 967.292 21.2951 967.633 21.6147C967.974 21.9308 968.245 22.3498 968.448 22.8718C968.65 23.3939 968.751 24.0366 968.751 24.8001V25.3328H962.445V24.2461H967.473C967.473 23.7845 967.381 23.3726 967.196 23.0103C967.015 22.6481 966.756 22.3623 966.418 22.1527C966.084 21.9432 965.69 21.8385 965.236 21.8385C964.735 21.8385 964.302 21.9628 963.936 22.2113C963.574 22.4564 963.295 22.776 963.1 23.1701C962.904 23.5643 962.807 23.9869 962.807 24.4379V25.1623C962.807 25.7802 962.913 26.304 963.126 26.7337C963.343 27.1598 963.643 27.4848 964.027 27.7085C964.41 27.9287 964.856 28.0388 965.364 28.0388C965.694 28.0388 965.992 27.9926 966.258 27.9003C966.528 27.8044 966.761 27.6623 966.956 27.4741C967.152 27.2824 967.302 27.0444 967.409 26.7603L968.624 27.1013C968.496 27.5132 968.281 27.8754 967.979 28.1879C967.677 28.4968 967.304 28.7383 966.86 28.9123C966.416 29.0828 965.918 29.168 965.364 29.168ZM972.277 28.9976L969.784 20.8157H971.105L972.874 27.0799H972.959L974.706 20.8157H976.049L977.774 27.0586H977.86L979.628 20.8157H980.949L978.456 28.9976H977.221L975.431 22.712H975.303L973.513 28.9976H972.277ZM985.523 29.168C984.735 29.168 984.055 28.994 983.483 28.646C982.915 28.2944 982.476 27.8044 982.167 27.1758C981.862 26.5437 981.709 25.8086 981.709 24.9706C981.709 24.1325 981.862 23.3939 982.167 22.7547C982.476 22.1119 982.906 21.6112 983.456 21.2525C984.01 20.8903 984.657 20.7092 985.395 20.7092C985.822 20.7092 986.242 20.7802 986.658 20.9223C987.073 21.0643 987.451 21.2951 987.792 21.6147C988.133 21.9308 988.405 22.3498 988.607 22.8718C988.81 23.3939 988.911 24.0366 988.911 24.8001V25.3328H982.604V24.2461H987.633C987.633 23.7845 987.54 23.3726 987.356 23.0103C987.174 22.6481 986.915 22.3623 986.578 22.1527C986.244 21.9432 985.85 21.8385 985.395 21.8385C984.895 21.8385 984.461 21.9628 984.096 22.2113C983.733 22.4564 983.455 22.776 983.259 23.1701C983.064 23.5643 982.966 23.9869 982.966 24.4379V25.1623C982.966 25.7802 983.073 26.304 983.286 26.7337C983.503 27.1598 983.803 27.4848 984.186 27.7085C984.57 27.9287 985.015 28.0388 985.523 28.0388C985.853 28.0388 986.152 27.9926 986.418 27.9003C986.688 27.8044 986.921 27.6623 987.116 27.4741C987.311 27.2824 987.462 27.0444 987.569 26.7603L988.783 27.1013C988.655 27.5132 988.44 27.8754 988.139 28.1879C987.837 28.4968 987.464 28.7383 987.02 28.9123C986.576 29.0828 986.077 29.168 985.523 29.168ZM990.583 28.9976V20.8157H991.798V22.0515H991.883C992.032 21.6467 992.302 21.3182 992.693 21.0661C993.083 20.814 993.524 20.6879 994.014 20.6879C994.106 20.6879 994.221 20.6897 994.36 20.6932C994.498 20.6968 994.603 20.7021 994.674 20.7092V21.9876C994.632 21.977 994.534 21.961 994.381 21.9397C994.232 21.9148 994.074 21.9024 993.907 21.9024C993.509 21.9024 993.154 21.9858 992.842 22.1527C992.533 22.3161 992.288 22.5434 992.107 22.8346C991.929 23.1222 991.84 23.4507 991.84 23.82V28.9976H990.583Z"
            fill="#D7D7DB"
          />
          <path
            d="M1103.61 28.9976H1100.24V18.0885H1103.76C1104.82 18.0885 1105.72 18.3069 1106.48 18.7437C1107.23 19.1769 1107.81 19.8001 1108.21 20.6133C1108.61 21.423 1108.81 22.3924 1108.81 23.5217C1108.81 24.6581 1108.61 25.6364 1108.2 26.4567C1107.8 27.2735 1107.21 27.902 1106.43 28.3424C1105.66 28.7792 1104.72 28.9976 1103.61 28.9976ZM1101.57 27.8257H1103.53C1104.43 27.8257 1105.17 27.6517 1105.77 27.3037C1106.36 26.9557 1106.8 26.4603 1107.09 25.8175C1107.39 25.1748 1107.53 24.4095 1107.53 23.5217C1107.53 22.641 1107.39 21.8829 1107.1 21.2472C1106.81 20.608 1106.38 20.1179 1105.81 19.777C1105.24 19.4326 1104.53 19.2603 1103.67 19.2603H1101.57V27.8257ZM1114.05 29.168C1113.26 29.168 1112.58 28.994 1112.01 28.646C1111.44 28.2944 1111 27.8044 1110.69 27.1758C1110.38 26.5437 1110.23 25.8086 1110.23 24.9706C1110.23 24.1325 1110.38 23.3939 1110.69 22.7547C1111 22.1119 1111.43 21.6112 1111.98 21.2525C1112.53 20.8903 1113.18 20.7092 1113.92 20.7092C1114.34 20.7092 1114.76 20.7802 1115.18 20.9223C1115.6 21.0643 1115.97 21.2951 1116.31 21.6147C1116.66 21.9308 1116.93 22.3498 1117.13 22.8718C1117.33 23.3939 1117.43 24.0366 1117.43 24.8001V25.3328H1111.13V24.2461H1116.15C1116.15 23.7845 1116.06 23.3726 1115.88 23.0103C1115.7 22.6481 1115.44 22.3623 1115.1 22.1527C1114.77 21.9432 1114.37 21.8385 1113.92 21.8385C1113.42 21.8385 1112.98 21.9628 1112.62 22.2113C1112.26 22.4564 1111.98 22.776 1111.78 23.1701C1111.59 23.5643 1111.49 23.9869 1111.49 24.4379V25.1623C1111.49 25.7802 1111.59 26.304 1111.81 26.7337C1112.02 27.1598 1112.32 27.4848 1112.71 27.7085C1113.09 27.9287 1113.54 28.0388 1114.05 28.0388C1114.38 28.0388 1114.67 27.9926 1114.94 27.9003C1115.21 27.8044 1115.44 27.6623 1115.64 27.4741C1115.83 27.2824 1115.98 27.0444 1116.09 26.7603L1117.31 27.1013C1117.18 27.5132 1116.96 27.8754 1116.66 28.1879C1116.36 28.4968 1115.99 28.7383 1115.54 28.9123C1115.1 29.0828 1114.6 29.168 1114.05 29.168ZM1125.55 20.8157L1122.52 28.9976H1121.24L1118.22 20.8157H1119.58L1121.84 27.3356H1121.92L1124.18 20.8157H1125.55ZM1126.03 19.2603V18.0885H1134.21V19.2603H1130.78V28.9976H1129.46V19.2603H1126.03ZM1137.97 29.168C1137.24 29.168 1136.59 28.9922 1136.03 28.6407C1135.48 28.2891 1135.04 27.7973 1134.73 27.1652C1134.42 26.5331 1134.27 25.7944 1134.27 24.9493C1134.27 24.097 1134.42 23.353 1134.73 22.7174C1135.04 22.0817 1135.48 21.5881 1136.03 21.2366C1136.59 20.885 1137.24 20.7092 1137.97 20.7092C1138.71 20.7092 1139.36 20.885 1139.91 21.2366C1140.47 21.5881 1140.9 22.0817 1141.21 22.7174C1141.53 23.353 1141.68 24.097 1141.68 24.9493C1141.68 25.7944 1141.53 26.5331 1141.21 27.1652C1140.9 27.7973 1140.47 28.2891 1139.91 28.6407C1139.36 28.9922 1138.71 29.168 1137.97 29.168ZM1137.97 28.0388C1138.54 28.0388 1139 27.8949 1139.36 27.6073C1139.72 27.3196 1139.99 26.9415 1140.16 26.4727C1140.34 26.004 1140.42 25.4961 1140.42 24.9493C1140.42 24.4024 1140.34 23.8928 1140.16 23.4205C1139.99 22.9482 1139.72 22.5665 1139.36 22.2753C1139 21.9841 1138.54 21.8385 1137.97 21.8385C1137.41 21.8385 1136.95 21.9841 1136.59 22.2753C1136.23 22.5665 1135.96 22.9482 1135.79 23.4205C1135.61 23.8928 1135.52 24.4024 1135.52 24.9493C1135.52 25.4961 1135.61 26.004 1135.79 26.4727C1135.96 26.9415 1136.23 27.3196 1136.59 27.6073C1136.95 27.8949 1137.41 28.0388 1137.97 28.0388ZM1146.68 29.168C1145.95 29.168 1145.3 28.9922 1144.74 28.6407C1144.19 28.2891 1143.75 27.7973 1143.44 27.1652C1143.13 26.5331 1142.98 25.7944 1142.98 24.9493C1142.98 24.097 1143.13 23.353 1143.44 22.7174C1143.75 22.0817 1144.19 21.5881 1144.74 21.2366C1145.3 20.885 1145.95 20.7092 1146.68 20.7092C1147.42 20.7092 1148.07 20.885 1148.62 21.2366C1149.18 21.5881 1149.61 22.0817 1149.92 22.7174C1150.24 23.353 1150.39 24.097 1150.39 24.9493C1150.39 25.7944 1150.24 26.5331 1149.92 27.1652C1149.61 27.7973 1149.18 28.2891 1148.62 28.6407C1148.07 28.9922 1147.42 29.168 1146.68 29.168ZM1146.68 28.0388C1147.25 28.0388 1147.71 27.8949 1148.07 27.6073C1148.43 27.3196 1148.7 26.9415 1148.87 26.4727C1149.05 26.004 1149.14 25.4961 1149.14 24.9493C1149.14 24.4024 1149.05 23.8928 1148.87 23.4205C1148.7 22.9482 1148.43 22.5665 1148.07 22.2753C1147.71 21.9841 1147.25 21.8385 1146.68 21.8385C1146.12 21.8385 1145.66 21.9841 1145.3 22.2753C1144.94 22.5665 1144.67 22.9482 1144.5 23.4205C1144.32 23.8928 1144.23 24.4024 1144.23 24.9493C1144.23 25.4961 1144.32 26.004 1144.5 26.4727C1144.67 26.9415 1144.94 27.3196 1145.3 27.6073C1145.66 27.8949 1146.12 28.0388 1146.68 28.0388ZM1153.33 18.0885V28.9976H1152.07V18.0885H1153.33ZM1161.19 22.6481L1160.06 22.9677C1159.99 22.7795 1159.88 22.5966 1159.74 22.4191C1159.61 22.238 1159.42 22.0888 1159.19 21.9716C1158.95 21.8544 1158.65 21.7959 1158.29 21.7959C1157.79 21.7959 1157.37 21.9113 1157.04 22.1421C1156.71 22.3694 1156.54 22.6588 1156.54 23.0103C1156.54 23.3228 1156.65 23.5696 1156.88 23.7508C1157.11 23.9319 1157.46 24.0828 1157.95 24.2035L1159.16 24.5018C1159.89 24.6794 1160.44 24.951 1160.8 25.3168C1161.16 25.679 1161.34 26.146 1161.34 26.7177C1161.34 27.1865 1161.2 27.6055 1160.93 27.9748C1160.66 28.3441 1160.29 28.6353 1159.81 28.8484C1159.33 29.0615 1158.77 29.168 1158.14 29.168C1157.3 29.168 1156.61 28.9869 1156.07 28.6247C1155.52 28.2625 1155.17 27.7334 1155.03 27.0373L1156.22 26.739C1156.34 27.1794 1156.55 27.5096 1156.87 27.7298C1157.19 27.95 1157.6 28.0601 1158.12 28.0601C1158.7 28.0601 1159.17 27.9358 1159.51 27.6872C1159.86 27.4351 1160.04 27.1332 1160.04 26.7816C1160.04 26.4976 1159.94 26.2596 1159.74 26.0679C1159.54 25.8726 1159.23 25.727 1158.82 25.6311L1157.46 25.3115C1156.71 25.1339 1156.16 24.8587 1155.81 24.4858C1155.46 24.1094 1155.28 23.6389 1155.28 23.0743C1155.28 22.6126 1155.41 22.2042 1155.67 21.8491C1155.94 21.494 1156.29 21.2152 1156.74 21.0128C1157.2 20.8104 1157.71 20.7092 1158.29 20.7092C1159.1 20.7092 1159.73 20.8868 1160.2 21.2419C1160.66 21.597 1160.99 22.0657 1161.19 22.6481Z"
            fill="white"
          />
          <circle cx="1232.5" cy="24" r="15.5" fill="#0A111F" />
          <path
            d="M1226.55 26.7051C1227.49 26.7051 1228.22 25.9727 1228.22 25.0352C1228.22 24.0977 1227.49 23.3652 1226.55 23.3652C1225.62 23.3652 1224.88 24.0977 1224.88 25.0352C1224.88 25.9727 1225.62 26.7051 1226.55 26.7051ZM1233 26.7051C1233.94 26.7051 1234.67 25.9727 1234.67 25.0352C1234.67 24.0977 1233.94 23.3652 1233 23.3652C1232.06 23.3652 1231.33 24.0977 1231.33 25.0352C1231.33 25.9727 1232.06 26.7051 1233 26.7051ZM1239.45 26.7051C1240.38 26.7051 1241.12 25.9727 1241.12 25.0352C1241.12 24.0977 1240.38 23.3652 1239.45 23.3652C1238.51 23.3652 1237.78 24.0977 1237.78 25.0352C1237.78 25.9727 1238.51 26.7051 1239.45 26.7051Z"
            fill="#D7D7DB"
          />
          <path
            d="M24.3484 18.2742C24.0275 17.9086 23.5102 17.9086 23.1893 18.2742L17.7472 24.474C17.4918 24.765 17.4918 25.235 17.7472 25.526L23.1893 31.7258C23.5102 32.0914 24.0275 32.0914 24.3484 31.7258C24.6693 31.3602 24.6693 30.7709 24.3484 30.4053L19.6071 24.9963L24.355 19.5873C24.6693 19.2292 24.6693 18.6323 24.3484 18.2742Z"
            fill="#D7D7DB"
          />
        </g>
        <rect y="672" width="1274" height="51" fill="#081120" />
        <circle cx="27" cy="698" r="16" fill="#01ACFD" />
        <path
          d="M33.6891 696.813L29.0209 694.14L24.3526 691.467C24.1501 691.351 23.9205 691.29 23.6868 691.29C23.453 691.29 23.2234 691.351 23.021 691.467C22.8186 691.583 22.6505 691.75 22.5336 691.95C22.4167 692.151 22.3551 692.379 22.355 692.611V703.303C22.3551 703.535 22.4166 703.762 22.5335 703.963C22.6504 704.164 22.8185 704.33 23.021 704.446C23.2234 704.562 23.453 704.623 23.6867 704.623C23.9205 704.623 24.1501 704.562 24.3526 704.447L29.0209 701.774L33.6891 699.101C33.8915 698.985 34.0597 698.818 34.1766 698.617C34.2934 698.416 34.355 698.189 34.355 697.957C34.355 697.725 34.2934 697.497 34.1766 697.296C34.0597 697.096 33.8915 696.929 33.6891 696.813V696.813Z"
          fill="#F9F9FA"
        />
        <rect
          width="1075"
          height="3"
          transform="translate(54 696.5)"
          fill="#363C48"
        />
        <rect
          width="919"
          height="3"
          transform="translate(54 696.994)"
          fill="#5B6E80"
        />
        <rect x="54" y="696.994" width="922" height="3" fill="#01ACFD" />
        <rect
          x="1141"
          y="687.506"
          width="115"
          height="20"
          rx="10"
          fill="#363C48"
        />
        <path
          d="M1160.16 702.237C1159.52 702.237 1158.97 702.062 1158.52 701.712C1158.07 701.36 1157.72 700.85 1157.48 700.183C1157.25 699.512 1157.13 698.702 1157.13 697.754C1157.13 696.81 1157.25 696.005 1157.48 695.337C1157.73 694.667 1158.07 694.156 1158.52 693.803C1158.98 693.448 1159.52 693.271 1160.16 693.271C1160.8 693.271 1161.34 693.448 1161.79 693.803C1162.25 694.156 1162.59 694.667 1162.83 695.337C1163.07 696.005 1163.2 696.81 1163.2 697.754C1163.2 698.702 1163.08 699.512 1162.84 700.183C1162.6 700.85 1162.25 701.36 1161.8 701.712C1161.35 702.062 1160.8 702.237 1160.16 702.237ZM1160.16 701.299C1160.8 701.299 1161.29 700.992 1161.64 700.379C1162 699.765 1162.17 698.89 1162.17 697.754C1162.17 696.998 1162.09 696.354 1161.93 695.823C1161.77 695.292 1161.54 694.887 1161.24 694.609C1160.94 694.33 1160.58 694.191 1160.16 694.191C1159.53 694.191 1159.04 694.502 1158.68 695.124C1158.33 695.744 1158.15 696.62 1158.15 697.754C1158.15 698.509 1158.23 699.151 1158.39 699.68C1158.55 700.208 1158.78 700.61 1159.07 700.886C1159.38 701.161 1159.74 701.299 1160.16 701.299ZM1165.32 701.001C1165.11 701.001 1164.93 700.925 1164.78 700.775C1164.63 700.624 1164.56 700.444 1164.56 700.234C1164.56 700.023 1164.63 699.843 1164.78 699.692C1164.93 699.542 1165.11 699.467 1165.32 699.467C1165.53 699.467 1165.71 699.542 1165.87 699.692C1166.02 699.843 1166.09 700.023 1166.09 700.234C1166.09 700.373 1166.06 700.501 1165.98 700.617C1165.92 700.734 1165.82 700.827 1165.71 700.898C1165.59 700.967 1165.47 701.001 1165.32 701.001ZM1165.32 696.586C1165.11 696.586 1164.93 696.511 1164.78 696.36C1164.63 696.21 1164.56 696.029 1164.56 695.819C1164.56 695.609 1164.63 695.428 1164.78 695.278C1164.93 695.127 1165.11 695.052 1165.32 695.052C1165.53 695.052 1165.71 695.127 1165.87 695.278C1166.02 695.428 1166.09 695.609 1166.09 695.819C1166.09 695.958 1166.06 696.086 1165.98 696.202C1165.92 696.319 1165.82 696.413 1165.71 696.484C1165.59 696.552 1165.47 696.586 1165.32 696.586ZM1170.59 702.237C1170.03 702.237 1169.52 702.14 1169.08 701.947C1168.65 701.754 1168.3 701.485 1168.04 701.141C1167.78 700.795 1167.64 700.393 1167.62 699.935H1168.7C1168.72 700.217 1168.82 700.46 1168.99 700.664C1169.16 700.866 1169.38 701.022 1169.65 701.133C1169.93 701.244 1170.24 701.299 1170.57 701.299C1170.95 701.299 1171.28 701.234 1171.57 701.103C1171.86 700.972 1172.09 700.79 1172.25 700.558C1172.41 700.325 1172.5 700.055 1172.5 699.748C1172.5 699.427 1172.42 699.144 1172.26 698.9C1172.1 698.653 1171.87 698.46 1171.56 698.32C1171.25 698.181 1170.88 698.112 1170.43 698.112H1169.74V697.174H1170.43C1170.78 697.174 1171.09 697.112 1171.35 696.987C1171.61 696.862 1171.82 696.685 1171.96 696.458C1172.11 696.231 1172.19 695.964 1172.19 695.657C1172.19 695.362 1172.12 695.104 1171.99 694.886C1171.86 694.667 1171.68 694.496 1171.44 694.374C1171.2 694.252 1170.93 694.191 1170.6 694.191C1170.3 694.191 1170.02 694.246 1169.75 694.357C1169.49 694.465 1169.27 694.623 1169.1 694.83C1168.94 695.035 1168.85 695.282 1168.83 695.572H1167.81C1167.83 695.114 1167.96 694.714 1168.22 694.37C1168.48 694.023 1168.82 693.754 1169.24 693.56C1169.66 693.367 1170.12 693.271 1170.62 693.271C1171.16 693.271 1171.62 693.38 1172.01 693.599C1172.4 693.815 1172.69 694.1 1172.9 694.455C1173.11 694.81 1173.21 695.194 1173.21 695.606C1173.21 696.097 1173.08 696.516 1172.83 696.863C1172.57 697.21 1172.22 697.45 1171.78 697.583V697.651C1172.33 697.742 1172.76 697.977 1173.07 698.354C1173.38 698.729 1173.54 699.194 1173.54 699.748C1173.54 700.222 1173.41 700.648 1173.15 701.026C1172.89 701.401 1172.54 701.697 1172.1 701.913C1171.66 702.129 1171.15 702.237 1170.59 702.237ZM1175.04 702.117V701.35L1177.92 698.197C1178.26 697.827 1178.54 697.506 1178.76 697.234C1178.97 696.958 1179.14 696.7 1179.24 696.458C1179.35 696.214 1179.4 695.958 1179.4 695.691C1179.4 695.384 1179.33 695.119 1179.18 694.894C1179.04 694.67 1178.84 694.496 1178.59 694.374C1178.33 694.252 1178.05 694.191 1177.73 694.191C1177.4 694.191 1177.11 694.261 1176.86 694.4C1176.61 694.536 1176.42 694.728 1176.28 694.975C1176.15 695.222 1176.08 695.512 1176.08 695.844H1175.07C1175.07 695.333 1175.19 694.884 1175.43 694.498C1175.66 694.112 1175.98 693.81 1176.39 693.594C1176.8 693.379 1177.26 693.271 1177.77 693.271C1178.28 693.271 1178.73 693.379 1179.13 693.594C1179.52 693.81 1179.83 694.102 1180.06 694.468C1180.28 694.835 1180.39 695.242 1180.39 695.691C1180.39 696.012 1180.33 696.326 1180.22 696.633C1180.1 696.937 1179.9 697.276 1179.62 697.651C1179.34 698.023 1178.95 698.478 1178.45 699.015L1176.49 701.112V701.18H1180.55V702.117H1175.04ZM1188.3 692.981L1185.49 703.43H1184.57L1187.38 692.981H1188.3Z"
          fill="#D7D7DB"
        />
        <path
          d="M1195.22 702.237C1194.58 702.237 1194.03 702.062 1193.58 701.712C1193.13 701.36 1192.78 700.85 1192.54 700.183C1192.3 699.512 1192.19 698.702 1192.19 697.754C1192.19 696.81 1192.3 696.005 1192.54 695.337C1192.78 694.667 1193.13 694.156 1193.58 693.803C1194.04 693.448 1194.58 693.271 1195.22 693.271C1195.86 693.271 1196.4 693.448 1196.85 693.803C1197.31 694.156 1197.65 694.667 1197.89 695.337C1198.13 696.005 1198.25 696.81 1198.25 697.754C1198.25 698.702 1198.13 699.512 1197.9 700.183C1197.66 700.85 1197.31 701.36 1196.86 701.712C1196.41 702.062 1195.86 702.237 1195.22 702.237ZM1195.22 701.299C1195.86 701.299 1196.35 700.992 1196.7 700.379C1197.05 699.765 1197.23 698.89 1197.23 697.754C1197.23 696.998 1197.15 696.354 1196.99 695.823C1196.83 695.292 1196.6 694.887 1196.3 694.609C1196 694.33 1195.64 694.191 1195.22 694.191C1194.59 694.191 1194.1 694.502 1193.74 695.124C1193.39 695.744 1193.21 696.62 1193.21 697.754C1193.21 698.509 1193.29 699.151 1193.45 699.68C1193.61 700.208 1193.83 700.61 1194.13 700.886C1194.43 701.161 1194.8 701.299 1195.22 701.299ZM1200.38 701.001C1200.17 701.001 1199.99 700.925 1199.84 700.775C1199.69 700.624 1199.62 700.444 1199.62 700.234C1199.62 700.023 1199.69 699.843 1199.84 699.692C1199.99 699.542 1200.17 699.467 1200.38 699.467C1200.59 699.467 1200.77 699.542 1200.92 699.692C1201.07 699.843 1201.15 700.023 1201.15 700.234C1201.15 700.373 1201.11 700.501 1201.04 700.617C1200.97 700.734 1200.88 700.827 1200.77 700.898C1200.65 700.967 1200.52 701.001 1200.38 701.001ZM1200.38 696.586C1200.17 696.586 1199.99 696.511 1199.84 696.36C1199.69 696.21 1199.62 696.029 1199.62 695.819C1199.62 695.609 1199.69 695.428 1199.84 695.278C1199.99 695.127 1200.17 695.052 1200.38 695.052C1200.59 695.052 1200.77 695.127 1200.92 695.278C1201.07 695.428 1201.15 695.609 1201.15 695.819C1201.15 695.958 1201.11 696.086 1201.04 696.202C1200.97 696.319 1200.88 696.413 1200.77 696.484C1200.65 696.552 1200.52 696.586 1200.38 696.586ZM1205.65 702.237C1205.08 702.237 1204.58 702.14 1204.14 701.947C1203.7 701.754 1203.36 701.485 1203.1 701.141C1202.84 700.795 1202.7 700.393 1202.68 699.935H1203.75C1203.78 700.217 1203.87 700.46 1204.04 700.664C1204.21 700.866 1204.44 701.022 1204.71 701.133C1204.99 701.244 1205.29 701.299 1205.63 701.299C1206 701.299 1206.34 701.234 1206.63 701.103C1206.92 700.972 1207.14 700.79 1207.31 700.558C1207.47 700.325 1207.56 700.055 1207.56 699.748C1207.56 699.427 1207.48 699.144 1207.32 698.9C1207.16 698.653 1206.92 698.46 1206.62 698.32C1206.31 698.181 1205.94 698.112 1205.49 698.112H1204.79V697.174H1205.49C1205.84 697.174 1206.14 697.112 1206.4 696.987C1206.67 696.862 1206.87 696.685 1207.02 696.458C1207.17 696.231 1207.25 695.964 1207.25 695.657C1207.25 695.362 1207.18 695.104 1207.05 694.886C1206.92 694.667 1206.74 694.496 1206.5 694.374C1206.26 694.252 1205.98 694.191 1205.66 694.191C1205.36 694.191 1205.08 694.246 1204.81 694.357C1204.55 694.465 1204.33 694.623 1204.16 694.83C1204 695.035 1203.9 695.282 1203.89 695.572H1202.87C1202.88 695.114 1203.02 694.714 1203.28 694.37C1203.54 694.023 1203.88 693.754 1204.3 693.56C1204.72 693.367 1205.18 693.271 1205.68 693.271C1206.22 693.271 1206.68 693.38 1207.07 693.599C1207.46 693.815 1207.75 694.1 1207.96 694.455C1208.17 694.81 1208.27 695.194 1208.27 695.606C1208.27 696.097 1208.14 696.516 1207.88 696.863C1207.63 697.21 1207.28 697.45 1206.84 697.583V697.651C1207.39 697.742 1207.82 697.977 1208.13 698.354C1208.44 698.729 1208.6 699.194 1208.6 699.748C1208.6 700.222 1208.47 700.648 1208.21 701.026C1207.95 701.401 1207.6 701.697 1207.16 701.913C1206.72 702.129 1206.21 702.237 1205.65 702.237ZM1212.89 702.237C1212.31 702.237 1211.79 702.133 1211.34 701.925C1210.9 701.715 1210.55 701.427 1210.3 701.06C1210.05 700.691 1209.92 700.271 1209.93 699.799C1209.92 699.43 1210 699.089 1210.14 698.776C1210.29 698.461 1210.49 698.198 1210.75 697.988C1211.01 697.775 1211.3 697.64 1211.61 697.583V697.532C1211.2 697.424 1210.86 697.19 1210.62 696.829C1210.37 696.465 1210.25 696.052 1210.25 695.589C1210.25 695.146 1210.36 694.749 1210.59 694.4C1210.82 694.05 1211.13 693.775 1211.53 693.573C1211.93 693.371 1212.38 693.271 1212.89 693.271C1213.4 693.271 1213.85 693.371 1214.25 693.573C1214.65 693.775 1214.96 694.05 1215.19 694.4C1215.42 694.749 1215.53 695.146 1215.54 695.589C1215.53 696.052 1215.41 696.465 1215.16 696.829C1214.91 697.19 1214.58 697.424 1214.17 697.532V697.583C1214.49 697.64 1214.77 697.775 1215.02 697.988C1215.28 698.198 1215.48 698.461 1215.63 698.776C1215.78 699.089 1215.86 699.43 1215.86 699.799C1215.86 700.271 1215.73 700.691 1215.48 701.06C1215.23 701.427 1214.88 701.715 1214.43 701.925C1213.99 702.133 1213.48 702.237 1212.89 702.237ZM1212.89 701.299C1213.29 701.299 1213.63 701.235 1213.92 701.107C1214.2 700.979 1214.42 700.799 1214.58 700.566C1214.74 700.333 1214.82 700.06 1214.82 699.748C1214.82 699.418 1214.73 699.127 1214.56 698.874C1214.4 698.621 1214.17 698.423 1213.88 698.278C1213.59 698.133 1213.26 698.06 1212.89 698.06C1212.52 698.06 1212.19 698.133 1211.9 698.278C1211.61 698.423 1211.38 698.621 1211.21 698.874C1211.05 699.127 1210.96 699.418 1210.97 699.748C1210.96 700.06 1211.04 700.333 1211.19 700.566C1211.35 700.799 1211.57 700.979 1211.86 701.107C1212.15 701.235 1212.5 701.299 1212.89 701.299ZM1212.89 697.157C1213.21 697.157 1213.48 697.094 1213.72 696.969C1213.97 696.844 1214.16 696.67 1214.3 696.445C1214.44 696.221 1214.51 695.958 1214.51 695.657C1214.51 695.362 1214.44 695.104 1214.3 694.886C1214.17 694.664 1213.98 694.494 1213.74 694.374C1213.5 694.252 1213.21 694.191 1212.89 694.191C1212.57 694.191 1212.28 694.252 1212.04 694.374C1211.79 694.494 1211.6 694.664 1211.47 694.886C1211.34 695.104 1211.27 695.362 1211.27 695.657C1211.27 695.958 1211.34 696.221 1211.47 696.445C1211.61 696.67 1211.81 696.844 1212.05 696.969C1212.29 697.094 1212.58 697.157 1212.89 697.157Z"
          fill="#737373"
        />
        <line
          x1="1220.5"
          y1="687.506"
          x2="1220.5"
          y2="707.506"
          stroke="black"
        />
        <path
          d="M1233.58 703.726H1242.41C1243.03 703.726 1243.48 703.547 1243.79 703.189C1244.1 702.835 1244.25 702.302 1244.25 701.589V693.173C1244.25 692.46 1244.1 691.927 1243.79 691.573C1243.48 691.215 1243.03 691.036 1242.41 691.036H1233.58C1232.97 691.036 1232.51 691.215 1232.21 691.573C1231.9 691.927 1231.75 692.46 1231.75 693.173V701.589C1231.75 702.302 1231.9 702.835 1232.21 703.189C1232.51 703.547 1232.97 703.726 1233.58 703.726ZM1232.83 699.583V695.179C1232.83 695.064 1232.86 694.967 1232.93 694.889C1233 694.806 1233.09 694.765 1233.18 694.765C1233.28 694.765 1233.36 694.806 1233.43 694.889C1233.5 694.967 1233.54 695.064 1233.54 695.179V699.583C1233.54 699.698 1233.5 699.797 1233.43 699.88C1233.36 699.958 1233.28 699.997 1233.18 699.997C1233.09 699.997 1233 699.958 1232.93 699.88C1232.86 699.797 1232.83 699.698 1232.83 699.583ZM1234.62 702.617V692.145H1241.38V702.617H1234.62ZM1242.46 699.583V695.179C1242.46 695.064 1242.49 694.967 1242.56 694.889C1242.63 694.806 1242.72 694.765 1242.82 694.765C1242.91 694.765 1243 694.806 1243.06 694.889C1243.13 694.967 1243.17 695.064 1243.17 695.179V699.583C1243.17 699.698 1243.13 699.797 1243.06 699.88C1243 699.958 1242.91 699.997 1242.82 699.997C1242.72 699.997 1242.63 699.958 1242.56 699.88C1242.49 699.797 1242.46 699.698 1242.46 699.583ZM1228.91 699.494L1230.49 697.97C1230.65 697.814 1230.73 697.626 1230.73 697.405C1230.72 697.185 1230.65 696.996 1230.49 696.84L1228.91 695.282C1228.77 695.149 1228.62 695.084 1228.48 695.089C1228.34 695.089 1228.22 695.149 1228.13 695.268C1228.03 695.383 1227.99 695.546 1227.99 695.758V699.032C1227.99 699.234 1228.04 699.393 1228.13 699.508C1228.23 699.623 1228.35 699.682 1228.49 699.687C1228.63 699.687 1228.77 699.623 1228.91 699.494ZM1247.09 699.494C1247.22 699.623 1247.36 699.687 1247.5 699.687C1247.64 699.682 1247.76 699.623 1247.86 699.508C1247.96 699.393 1248.01 699.234 1248.01 699.032V695.758C1248.01 695.546 1247.96 695.383 1247.86 695.268C1247.77 695.149 1247.65 695.089 1247.51 695.089C1247.37 695.084 1247.23 695.149 1247.09 695.282L1245.5 696.84C1245.35 696.996 1245.27 697.185 1245.27 697.405C1245.26 697.626 1245.34 697.814 1245.5 697.97L1247.09 699.494Z"
          fill="#D7D7DB"
        />
        <path
          d="M22.7746 55.7539C28.317 55.7539 32.8017 60.2387 32.8017 65.781C32.8017 71.3233 28.317 75.8081 22.7746 75.8081C17.2323 75.8081 12.7476 71.3233 12.7476 65.781C12.7476 60.2387 17.2323 55.7539 22.7746 55.7539Z"
          fill="#BCBCBC"
        />
        <path
          d="M27.6051 69.6971C27.2561 70.7791 26.7325 71.5819 25.9995 72.1752C25.2666 72.7686 24.2893 73.0827 23.0676 73.1874L22.8233 71.5819C23.6261 71.4772 24.2195 71.3026 24.6034 71.0234C24.743 70.9187 25.0223 70.6046 25.0223 70.6046L22.1252 61.3202H24.5336L26.209 68.266L27.989 61.3202H30.3276L27.6051 69.6971ZM19.1934 61.0061C19.7518 61.0061 20.2754 61.0759 20.6942 61.2504C21.1479 61.4249 21.5668 61.6693 21.9857 62.0183L21.0083 63.3446C20.7291 63.1352 20.4499 62.9956 20.2056 62.8909C19.9612 62.7862 19.6471 62.7513 19.3679 62.7513C18.1812 62.7513 17.5878 63.6587 17.5878 65.5087C17.5878 66.451 17.7274 67.1142 18.0415 67.4982C18.3557 67.917 18.7745 68.0915 19.3679 68.0915C19.6471 68.0915 19.9263 68.0566 20.1707 67.9519C20.415 67.8472 20.6942 67.7076 21.0433 67.4982L22.0205 68.8943C21.2178 69.5575 20.3103 69.8716 19.2632 69.8716C18.4255 69.8716 17.7274 69.6971 17.0991 69.3481C16.5058 68.999 16.0171 68.4755 15.703 67.8123C15.3889 67.1491 15.2144 66.3813 15.2144 65.4737C15.2144 64.6011 15.3889 63.7984 15.703 63.1352C16.0171 62.4372 16.5058 61.9136 17.0991 61.5297C17.6925 61.2155 18.3906 61.0061 19.1934 61.0061Z"
          fill="#081120"
        />
        <path
          d="M22.9023 86.6843C18.0529 86.6843 14.1172 90.6201 14.1172 95.4694C14.1172 100.319 18.0529 104.255 22.9023 104.255C27.7517 104.255 31.6874 100.319 31.6874 95.4694C31.6874 90.6201 27.7517 86.6843 22.9023 86.6843ZM23.7808 99.862H22.0238V94.5909H23.7808V99.862ZM23.7808 92.8339H22.0238V91.0769H23.7808V92.8339Z"
          fill="#01ACFD"
        />
        <path
          d="M31.0487 118.641H30.046V126.663C30.046 127.215 29.5948 127.666 29.0433 127.666H17.0108V128.669C17.0108 129.772 17.9133 130.674 19.0162 130.674H29.0433L33.0542 134.685V120.647C33.0542 119.544 32.1517 118.641 31.0487 118.641ZM28.0406 123.655V116.636C28.0406 115.533 27.1382 114.631 26.0352 114.631H15.0054C13.9024 114.631 13 115.533 13 116.636V129.671L17.0108 125.66H26.0352C27.1382 125.66 28.0406 124.758 28.0406 123.655Z"
          fill="#BCBCBC"
        />
        <path
          d="M25.1912 146.11C24.8737 145.792 24.4475 145.617 24.0046 145.617H18.0135C17.0943 145.617 16.3423 146.369 16.3423 147.288V160.658C16.3423 161.577 17.086 162.329 18.0051 162.329H28.0405C28.9597 162.329 29.7117 161.577 29.7117 160.658V151.324C29.7117 150.881 29.5363 150.455 29.2187 150.146L25.1912 146.11ZM25.5338 158.986H20.5202C20.0607 158.986 19.6846 158.61 19.6846 158.151C19.6846 157.691 20.0607 157.315 20.5202 157.315H25.5338C25.9933 157.315 26.3694 157.691 26.3694 158.151C26.3694 158.61 25.9933 158.986 25.5338 158.986ZM25.5338 155.644H20.5202C20.0607 155.644 19.6846 155.268 19.6846 154.808C19.6846 154.349 20.0607 153.973 20.5202 153.973H25.5338C25.9933 153.973 26.3694 154.349 26.3694 154.808C26.3694 155.268 25.9933 155.644 25.5338 155.644ZM23.8626 150.63V146.87L28.4583 151.466H24.6982C24.2386 151.466 23.8626 151.09 23.8626 150.63Z"
          fill="#BCBCBC"
        />
        <path
          d="M27.611 186.318H26.7892L26.498 186.037C27.5174 184.852 28.1311 183.312 28.1311 181.637C28.1311 177.903 25.1041 174.876 21.3697 174.876C17.6354 174.876 14.6084 177.903 14.6084 181.637C14.6084 185.372 17.6354 188.399 21.3697 188.399C23.0445 188.399 24.584 187.785 25.7698 186.766L26.0507 187.057V187.879L31.2517 193.069L32.8016 191.519L27.611 186.318V186.318ZM21.3697 186.318C18.7796 186.318 16.6888 184.227 16.6888 181.637C16.6888 179.047 18.7796 176.956 21.3697 176.956C23.9599 176.956 26.0507 179.047 26.0507 181.637C26.0507 184.227 23.9599 186.318 21.3697 186.318Z"
          fill="#BCBCBC"
        />
        <path
          d="M16.3424 210.097C16.5596 210.314 16.6265 210.623 16.5513 210.915C16.2588 212.052 16.2505 213.314 16.6348 214.575C17.3702 217.007 19.5093 218.837 22.016 219.213C26.6285 219.89 30.5307 215.82 29.5614 211.174C29.0183 208.559 26.8625 206.487 24.2387 206.027C23.2276 205.852 22.25 205.902 21.3476 206.136C21.0551 206.211 20.7376 206.136 20.5287 205.927C20.0608 205.459 20.2947 204.682 20.9214 204.515C22.1497 204.197 23.4783 204.147 24.8487 204.44C28.1743 205.158 30.773 207.932 31.2827 211.291C32.1517 216.982 27.2552 221.803 21.5565 220.834C18.2057 220.257 15.4901 217.609 14.8383 214.275C14.5793 212.946 14.6378 211.667 14.9386 210.489C15.1057 209.863 15.8828 209.637 16.3424 210.097ZM18.8491 207.172C18.8491 207.866 18.2893 208.425 17.5958 208.425C16.9022 208.425 16.3424 207.866 16.3424 207.172C16.3424 206.478 16.9022 205.919 17.5958 205.919C18.2893 205.919 18.8491 206.478 18.8491 207.172ZM23.0271 207.59C20.2613 207.59 18.0136 209.838 18.0136 212.603C18.0136 215.369 20.2613 217.617 23.0271 217.617C25.7929 217.617 28.0406 215.369 28.0406 212.603C28.0406 209.838 25.7929 207.59 23.0271 207.59ZM21.3559 215.11C20.8963 215.11 20.5203 214.734 20.5203 214.275V210.932C20.5203 210.473 20.8963 210.097 21.3559 210.097C21.8155 210.097 22.1915 210.473 22.1915 210.932V214.275C22.1915 214.734 21.8155 215.11 21.3559 215.11ZM24.6983 215.11C24.2387 215.11 23.8627 214.734 23.8627 214.275V210.932C23.8627 210.473 24.2387 210.097 24.6983 210.097C25.1579 210.097 25.5339 210.473 25.5339 210.932V214.275C25.5339 214.734 25.1579 215.11 24.6983 215.11Z"
          fill="#BCBCBC"
        />
        <path
          d="M0 89V89C0.552285 89 1 89.4477 1 90V104C1 104.552 0.552285 105 0 105V105V89Z"
          fill="#01ACFD"
        />
      </g>
      <defs>
        <clipPath id="clip0_3029_169941">
          <rect width="1264" height="722" fill="white" />
        </clipPath>
        <clipPath id="clip1_3029_169941">
          <rect width="1264" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
