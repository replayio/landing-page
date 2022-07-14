import type { Colorway, HoverboardControls } from '@replayio/overboard'
import { Color, Colors, colorways, Hoverboard, Logo } from '@replayio/overboard'
import { gsap, ScrollTrigger } from 'lib/gsap'
import { useRef, useState } from 'react'

import { Logo as ReplayLogo } from '~/components/primitives/logo'
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import avatarOne from '~/public/images/home/avatar-1.webp'
import avatarTwo from '~/public/images/home/avatar-2.webp'
import avatarThree from '~/public/images/home/avatar-3.webp'

// import overboardStore from '~/public/images/home/overboard-store.png'
import styles from './overboard-story.module.scss'

const reactTree = {
  type: 'App',
  children: [
    { type: 'Hero' },
    { type: 'Hoverboard' },
    {
      type: 'PurchaseForm',
      children: [
        {
          type: 'Colors',
          children: [
            {
              type: 'Color',
              key: 'red',
              value: 'red'
            },
            {
              type: 'Color',
              key: 'green',
              value: 'green'
            },
            {
              type: 'Color',
              key: 'blue',
              value: 'blue'
            }
          ]
        },
        { type: 'SubmitButton' }
      ]
    }
  ]
}

function renderReactTree(node: { type: string; children?: any[] }, depth = 0) {
  return (
    <ul
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: depth > 0 ? 16 : 0
      }}
    >
      {node.children
        ? node.children.map((node, index) => {
            return (
              <li key={index} style={{ padding: 4 }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      transform: 'rotate(180deg)'
                    }}
                  >
                    ▴
                  </span>
                  <span style={{ color: '#8434D3' }}>{node.type}</span>
                  {node.key && (
                    <span style={{ color: '#FF9640' }}>
                      key="<span style={{ color: '#3734D3' }}>{node.key}</span>"
                    </span>
                  )}
                </div>
                {renderReactTree(node, depth + 1)}
              </li>
            )
          })
        : null}
    </ul>
  )
}

function ReactDevTools() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        backgroundColor: 'white'
      }}
    >
      <div
        style={{
          fontSize: 12,
          padding: '6px 10px',
          borderBottom: '1px solid #DCDCDC',
          color: '#a5a3a3'
        }}
      >
        Search for component...
      </div>

      <div
        style={{
          display: 'flex',
          fontFamily: 'monospace'
        }}
      >
        <div style={{ padding: 10 }}>{renderReactTree(reactTree)}</div>

        <div
          style={{
            padding: 10,
            fontVariantNumeric: 'tabular-nums',
            borderLeft: '1px solid #DCDCDC'
          }}
        >
          props:
          <ul style={{ paddingLeft: 16 }}>
            <li>
              rotate:{' '}
              <span id="hoverboard-rotate" style={{ color: '#314EB2' }}>
                0
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function ElementSelectorIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: 4 }}
    >
      <path
        d="M3.21642 3.26886C2.93209 3.26886 2.65941 3.38961 2.45836 3.60455C2.25731 3.8195 2.14436 4.11103 2.14436 4.415V13.5842C2.14436 13.8882 2.25731 14.1797 2.45836 14.3946C2.65941 14.6096 2.93209 14.7303 3.21642 14.7303H6.00377C6.28809 14.7303 6.56077 14.8511 6.76182 15.066C6.96287 15.281 7.07582 15.5725 7.07582 15.8765C7.07582 16.1804 6.96287 16.472 6.76182 16.6869C6.56077 16.9019 6.28809 17.0226 6.00377 17.0226H3.21642C2.36343 17.0226 1.54539 16.6604 0.942239 16.0155C0.33909 15.3707 0.000244141 14.4961 0.000244141 13.5842L0.000244141 4.415C0.000244141 3.50307 0.33909 2.62849 0.942239 1.98366C1.54539 1.33883 2.36343 0.976563 3.21642 0.976562H13.937C14.79 0.976563 15.608 1.33883 16.2112 1.98366C16.8143 2.62849 17.1532 3.50307 17.1532 4.415V7.39498C17.1532 7.69896 17.0402 7.99049 16.8392 8.20543C16.6381 8.42038 16.3654 8.54113 16.0811 8.54113C15.7968 8.54113 15.5241 8.42038 15.323 8.20543C15.122 7.99049 15.009 7.69896 15.009 7.39498V4.415C15.009 4.11103 14.8961 3.8195 14.695 3.60455C14.494 3.38961 14.2213 3.26886 13.937 3.26886H3.21642Z"
        fill="#38383D"
      />
      <path
        d="M13.8942 16.6821C14.1954 17.0632 14.7476 17.1056 15.099 16.7879C15.4604 16.4597 15.5006 15.8774 15.1994 15.4962L13.3722 13.241L15.8018 12.1822C15.859 12.1603 15.9086 12.1205 15.944 12.0683C15.9793 12.016 15.9989 11.9536 16 11.8894C16.001 11.8252 15.9836 11.7622 15.9501 11.7086C15.9165 11.655 15.8683 11.6134 15.8118 11.5893L8.43259 8.03182C8.38046 8.00517 8.32215 7.99493 8.26464 8.00235C8.20714 8.00976 8.15288 8.03451 8.10837 8.07362C8.06387 8.11273 8.031 8.16455 8.01372 8.22287C7.99643 8.28118 7.99546 8.34351 8.01092 8.40239L10.1494 16.7562C10.165 16.8168 10.1974 16.8712 10.2424 16.9125C10.2873 16.9537 10.3429 16.98 10.402 16.9879C10.4611 16.9958 10.5211 16.9851 10.5745 16.957C10.6278 16.929 10.672 16.8849 10.7016 16.8303L12.0569 14.4163L13.8942 16.6821Z"
        fill="#38383D"
      />
    </svg>
  )
}

const tabs = {
  Console: () => null,
  Elements: () => null,
  Network: () => null,
  React: ReactDevTools
} as const

function TabNav({
  activePanel,
  setActivePanel
}: {
  activePanel: keyof typeof tabs
  setActivePanel: (panel: keyof typeof tabs) => void
}) {
  return (
    <ul
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12,
        fontSize: 12,
        borderBottom: '1px solid #DCDCDC'
      }}
    >
      <ElementSelectorIcon />

      {Object.keys(tabs).map((key, index) => {
        const isActive = key === activePanel

        return (
          <li
            key={index}
            style={{
              padding: '8px 10px',
              backgroundColor: isActive ? '#DCDCDC' : 'transparent'
            }}
          >
            <button
              style={{ all: 'unset' }}
              onClick={() => setActivePanel(key as keyof typeof tabs)}
            >
              {key}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

function ViewToggle() {
  const ref = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref.current?.closest('section'),
          start: '+=100vh',
          end: '+=400vh',
          scrub: true
        }
      })
      .fromTo(
        ref.current,
        { clipPath: 'inset(4px 50% 4px 4px round 4px)' },
        { clipPath: 'inset(4px 4px 4px 50% round 4px)' }
      )
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        backgroundColor: '#F5F5F5',
        color: '#464646',
        padding: 4,
        borderRadius: 8,
        fontSize: 14,
        textAlign: 'center'
      }}
    >
      <div
        ref={ref}
        aria-hidden={true}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'inline-grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          padding: 4,
          borderRadius: 8,
          backgroundColor: '#464646',
          color: '#FFFFFF',
          transition: 'clip-path 0.16s ease-out'
        }}
      >
        <span
          style={{
            gridArea: '1 / 1',
            padding: '4px 16px'
          }}
        >
          Viewer
        </span>
        <span
          style={{
            gridArea: '1 / 2',
            padding: '4px 16px'
          }}
        >
          DevTools
        </span>
      </div>

      <button
        onClick={() =>
          window.scrollTo({
            top: document.getElementById('overboard-story')?.offsetTop,
            behavior: 'smooth'
          })
        }
        style={{
          all: 'unset',
          gridColumn: 1,
          gridRow: 1,
          padding: '4px 16px'
        }}
      >
        Viewer
      </button>

      <button
        onClick={() =>
          window.scrollTo({
            top:
              (document.getElementById('overboard-story')?.offsetTop ?? 0) +
              window.innerHeight,
            behavior: 'smooth'
          })
        }
        style={{
          all: 'unset',
          gridColumn: 2,
          gridRow: 1,
          padding: '4px 16px'
        }}
      >
        DevTools
      </button>
    </div>
  )
}

function DevTools() {
  const [activePanel, setActivePanel] = useState<keyof typeof tabs>('React')
  const ActiveTabPanel = tabs[activePanel]
  const ref = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref.current?.closest('section'),
          start: '+=100vh',
          end: '+=400vh',
          scrub: true
          // markers: true
        }
      })
      .fromTo(ref.current, { opacity: 0 }, { opacity: 1 })
  }, [])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(200px, 400px) 1fr',
        padding: 32,
        gap: 24,
        backgroundColor: '#F5F5F5'
      }}
    >
      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          width: '100%',
          height: '100%',
          border: '1px solid #DCDCDC',
          borderRadius: 8,
          overflow: 'hidden'
        }}
      >
        <TabNav activePanel={activePanel} setActivePanel={setActivePanel} />
        <ActiveTabPanel />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          width: '100%',
          height: '100%',
          // border: '1px solid #DCDCDC',
          borderRadius: 8,
          overflow: 'hidden'
        }}
      />
    </div>
  )
}

function ReplayApplication() {
  const applicationRef = useRef<HTMLDivElement>(null)
  const padding = 16
  const frameHeight = `calc(100vh - ${padding * 2}px)`

  useIsomorphicLayoutEffect(() => {
    if (applicationRef.current) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: applicationRef.current.closest('section'),
            start: 0,
            end: '+=100vh',
            scrub: true
          }
        })
        .from(applicationRef.current, {
          opacity: 0,
          yPercent: 10,
          scale: 0.98
        })
    }
  }, [])

  return (
    <div
      ref={applicationRef}
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        height: frameHeight,
        overflow: 'hidden',
        borderRadius: 16,
        border: '1px solid #DCDCDC'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 32px',
          backgroundColor: 'white',
          borderBottom: '1px solid #DCDCDC'
        }}
      >
        <div style={{ width: 96 }}>
          <ReplayLogo />
        </div>
        <div
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: 32,
            gap: 8,
            marginLeft: 'auto',
            marginRight: 24
          }}
        >
          <img src={avatarOne.src} style={{ borderRadius: '100%' }} />
          <img src={avatarTwo.src} style={{ borderRadius: '100%' }} />
          <img src={avatarThree.src} style={{ borderRadius: '100%' }} />
        </div>
        <ViewToggle />
      </div>

      <DevTools />
    </div>
  )
}

function OverboardStore() {
  const ref = useRef<HTMLImageElement>(null)
  const hoverboardRef = useRef<HoverboardControls>(null)
  const [color, setColor] = useState<Colorway>('red')
  const padding = 16
  const frameHeight = `calc(100vh - ${padding * 2}px)`

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ref.current.closest('section'),
            start: 0,
            end: '+=100vh',
            scrub: true
          }
        })
        .to(ref.current, {
          y: '4vh',
          scale: 0.85
        })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ref.current.closest('section'),
            start: '+=100vh',
            end: '+=200vh',
            scrub: true
          }
        })
        .to(ref.current, {
          x: '26vh',
          y: '-6vh',
          scale: 0.6
        })

      ScrollTrigger.create({
        trigger: ref.current.closest('section'),
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onLeaveBack: () => {
          hoverboardRef.current?.reset()
        },
        onUpdate: ({ progress }) => {
          const rotateValue = gsap.utils.mapRange(0, 1, 0, 360, progress)

          hoverboardRef.current?.rotate?.(rotateValue)

          const rotateText = document.getElementById('hoverboard-rotate')

          if (rotateText) {
            rotateText.innerText = rotateValue.toFixed(2)
          }
        }
      })
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        gridArea: '1 / 1 / 1 / 1',
        height: frameHeight,
        width: '100%',
        padding: 64,
        objectFit: 'contain',
        borderRadius: 20,
        backgroundColor: '#1E076C'
      }}
    >
      <Logo />
      <div style={{ height: '30vh' }}>
        <Hoverboard ref={hoverboardRef} color={color} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Colors
          onColorChange={(color) => {
            // TODO: need to fix type in overboard design system
            // @ts-ignore
            setColor(color)
          }}
        >
          {Object.entries(colorways).map(([name, [start, end]]) => (
            <Color
              key={name}
              label={name}
              value={name.toLowerCase()}
              startColor={start}
              endColor={end}
            />
          ))}
        </Colors>
      </div>
    </div>
  )
}

export function OverboardStory() {
  const padding = 16
  const frameCount = 4

  return (
    <section
      id="overboard-story"
      style={{
        height: `max(calc(${frameCount * 100}vh - ${padding}px), 600px)`,
        padding: 80
      }}
    >
      <div style={{ position: 'sticky', top: padding }} className={styles.grid}>
        <ReplayApplication />

        <OverboardStore />
      </div>
    </section>
  )
}
