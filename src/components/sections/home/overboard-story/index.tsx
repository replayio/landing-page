import type { Colorway, HoverboardControls } from '@replayio/overboard'
import { Color, Colors, colorways, Hoverboard, Logo } from '@replayio/overboard'
import { gsap, ScrollTrigger } from 'lib/gsap'
import React, { memo, useCallback, useMemo, useRef, useState } from 'react'

import { Timeline } from '~/components/common/progress-bar'
import { Logo as ReplayLogo } from '~/components/primitives/logo'
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import avatarOne from '~/public/images/home/avatar-1.webp'
import avatarTwo from '~/public/images/home/avatar-2.webp'
import avatarThree from '~/public/images/home/avatar-3.webp'

import s from './overboard-story.module.scss'
import { Story } from './story'

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

const SearchBar = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 12,
      padding: '6px 10px',
      borderBottom: '1px solid #DCDCDC',
      color: '#a5a3a3'
    }}
  >
    {children}
  </div>
)

export function ReactDevTools() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        backgroundColor: 'white'
      }}
    >
      <SearchBar>Search for component...</SearchBar>

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

export function ElementSelectorIcon() {
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

const symbols = {
  unicorn: () => '🦄',
  yellow: () => (
    <span
      style={{
        display: 'inline-block',
        borderRadius: '50%',
        width: 5,
        height: 5,
        background: '#FF9640'
      }}
    />
  )
}

export const Console = ({
  currentHit,
  logs
}: {
  currentHit: number
  logs: { symbol: keyof typeof symbols; prepend: string; content: any }[]
}) => {
  const logContent = (content: any) => {
    const kind = typeof content

    if (kind === 'string') {
      return content
    }

    if (kind === 'object') {
      return JSON.stringify(content)
    }

    return content
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        backgroundColor: 'white'
      }}
    >
      <SearchBar>Search for logs...</SearchBar>

      <div
        style={{
          position: 'relative',
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          padding: '32px 0px'
        }}
      >
        {logs.map((log, i) => (
          <>
            {i === currentHit && (
              <hr
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: 1,
                  background: 'var(--color-pink-crayon)'
                }}
              />
            )}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '4px 24px'
              }}
              key={i}
            >
              <span
                style={{
                  width: 14,
                  marginRight: 15,
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {symbols[log.symbol]()}
              </span>
              <div style={{ color: '#01ACFD' }}>
                {log.prepend}, {logContent(log.content)}
              </div>
            </div>
          </>
        ))}
      </div>

      <div
        style={{ borderTop: '1px solid #EAEAEA', padding: '8px 8px 20px 8px' }}
      >
        <svg
          width="13"
          height="10"
          viewBox="0 0 13 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.923717 0.432994C1.24513 0.142127 1.74868 0.142127 2.05938 0.432994L6.50563 4.45666C6.6561 4.593 6.74062 4.77782 6.74062 4.97052C6.74062 5.16322 6.6561 5.34804 6.50563 5.48439L2.05938 9.50805C1.98582 9.57949 1.89711 9.6368 1.79854 9.67654C1.69998 9.71628 1.59357 9.73765 1.48568 9.73938C1.37779 9.7411 1.27062 9.72314 1.17057 9.68657C1.07051 9.64999 0.979622 9.59556 0.90332 9.52651C0.827017 9.45746 0.766865 9.37521 0.726451 9.28466C0.686037 9.19412 0.66619 9.09713 0.668094 8.99949C0.669997 8.90186 0.693613 8.80557 0.737531 8.71637C0.781449 8.62717 0.84477 8.54689 0.923717 8.48032L4.80213 4.97052L0.923717 1.46072C0.773241 1.32438 0.68872 1.13956 0.68872 0.946859C0.68872 0.754159 0.773241 0.569338 0.923717 0.432994ZM6.28064 0.432994C6.60205 0.142127 7.1056 0.142127 7.4163 0.432994L11.8625 4.45666C12.013 4.593 12.0975 4.77782 12.0975 4.97052C12.0975 5.16322 12.013 5.34804 11.8625 5.48439L7.4163 9.50805C7.34274 9.57949 7.25403 9.6368 7.15546 9.67654C7.0569 9.71628 6.95049 9.73765 6.8426 9.73938C6.73471 9.7411 6.62754 9.72314 6.52749 9.68657C6.42743 9.64999 6.33654 9.59556 6.26024 9.52651C6.18394 9.45746 6.12378 9.37521 6.08337 9.28466C6.04296 9.19412 6.02311 9.09713 6.02501 8.99949C6.02692 8.90186 6.05053 8.80557 6.09445 8.71637C6.13837 8.62717 6.20169 8.54689 6.28064 8.48032L10.159 4.97052L6.28064 1.46072C6.13016 1.32438 6.04564 1.13956 6.04564 0.946859C6.04564 0.754159 6.13016 0.569338 6.28064 0.432994Z"
            fill="#C7C7C7"
          />
        </svg>
      </div>
    </div>
  )
}

const CodeLine = ({
  children
}: {
  number: number
  children: React.ReactNode
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        lineHeight: '15px',
        fontSize: '14px',
        fontFamily: 'var(--font-mono)'
      }}
    >
      <div style={{ paddingLeft: '6px' }} className={s['code']}>
        {children}
      </div>
    </div>
  )
}

export const Code = memo(({ onHit }: { onHit: (idx: number) => void }) => {
  const [currentHit, setCurrentHit] = useState(0)

  const lines = [
    { print: 'disabled', content: <></> },
    { print: 'disabled', content: <></> },
    {
      print: 'not-available',
      content: (
        <>
          <span className="reserved">export function</span>{' '}
          <span className="declaration">HoverBoard</span>() {'{'}
        </>
      )
    },
    {
      print: 'available',
      content: (
        <>
          &nbsp;&nbsp;
          <span className="reserved">const</span>{' '}
          <span className="symbol">[</span>
          <span className="variable">pos</span>,{' '}
          <span className="variable">setPos</span>
          <span className="symbol">]</span> <span className="symbol">=</span>{' '}
          <span className="function">useState</span>({'{'}
          left: 0, right: 0{'}'})
        </>
      )
    },
    {
      print: 'available',
      content: (
        <>
          &nbsp;&nbsp;
          <span className="reserved">const</span>{' '}
          <span className="symbol">[</span>
          <span className="variable">angle</span>,{' '}
          <span className="variable">setAngle</span>
          <span className="symbol">]</span> <span className="symbol">=</span>{' '}
          <span className="function">useState</span>(0)
        </>
      )
    }
  ]

  const handleHit = useCallback(
    (idx: number) => {
      setCurrentHit(idx)
      onHit(idx)
    },
    [onHit]
  )

  const timelineProps = useMemo(
    () => ({
      markers: [30, 36, 40, 55, 80].map((position, idx) => ({
        position,
        onActive: () => handleHit(idx + 1)
      })),
      onComplete: () => {
        handleHit(0)
        setCurrentHit(0)
      }
    }),
    [handleHit]
  )

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid var(--color-gray-lighter)'
      }}
    >
      <div
        style={{
          height: 35,
          background: 'var(--color-gray-lightest)',
          borderBottom: '1px solid var(--color-gray-lighter)'
        }}
      />
      <div
        className={s['code']}
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '25px 4px auto',
          alignContent: 'flex-start',
          lineHeight: '15px',
          fontSize: '14px',
          height: '100%',
          fontFamily: 'var(--font-mono)',
          paddingTop: '18px'
        }}
      >
        <div />
        <div>
          <div
            style={{
              position: 'absolute',
              zIndex: 0,
              height: '100%',
              width: 4,
              top: 0,
              bottom: 0,
              background: '#F1F1F1'
            }}
          />
        </div>
        <div />

        {lines.map((line, idx) => (
          <>
            <span
              style={{
                display: 'inline-block',
                color: '#666666',
                textAlign: 'right',
                paddingRight: '3px',
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              {idx + 1}
            </span>
            <span
              style={{
                position: 'relative',
                display: 'inline-block',
                background:
                  (line.print === 'disabled' && 'transparent') ||
                  (line.print === 'not-available' && '#BBEAFA') ||
                  (line.print === 'available' && '#69A5FF') ||
                  undefined,
                width: 4,
                height: 15
              }}
            />
            <CodeLine number={idx + 1}>{line.content}</CodeLine>
          </>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 29,
          bottom: 0,
          right: 0,
          padding: '10px',
          background: '#FAFAFA'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="8.24471"
                cy="7.91268"
                r="7.85294"
                transform="rotate(180 8.24471 7.91268)"
                fill="#F0F0F0"
              />
              <circle
                r="2.61765"
                transform="matrix(1 0 0 -1 8.24655 7.9136)"
                fill="#D8D8D8"
              />
            </svg>
          </span>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              color: '#8000D7',
              marginLeft: 8
            }}
          >
            "rotate", angle
          </p>
        </div>
        <div style={{ display: 'flex', marginTop: 12, alignItems: 'center' }}>
          <svg
            width="38"
            height="16"
            viewBox="0 0 38 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              r="7.85294"
              transform="matrix(-1 0 0 1 8.24472 7.85294)"
              fill="#DBDBDB"
            />
            <path
              d="M4.68231 7.17859L7.22809 5.60423L9.7739 4.02988C9.88432 3.96166 10.0095 3.92576 10.137 3.92578C10.2645 3.92581 10.3897 3.96176 10.5001 4.03002C10.6105 4.09829 10.7021 4.19646 10.7659 4.31469C10.8296 4.43291 10.8632 4.56702 10.8633 4.70355V11.0009C10.8632 11.1375 10.8297 11.2716 10.7659 11.3898C10.7022 11.508 10.6105 11.6062 10.5001 11.6745C10.3897 11.7427 10.2645 11.7787 10.137 11.7787C10.0095 11.7787 9.88432 11.7428 9.7739 11.6746L7.22809 10.1003L4.68231 8.52595C4.5719 8.45767 4.48021 8.35948 4.41647 8.24122C4.35272 8.12296 4.31916 7.98882 4.31916 7.85227C4.31916 7.71572 4.35272 7.58157 4.41647 7.46332C4.48021 7.34506 4.5719 7.24686 4.68231 7.17859Z"
              fill="white"
            />
            <circle cx="29.185" cy="7.85294" r="7.85294" fill="#DBDBDB" />
            <path
              d="M32.7474 7.17859L30.2016 5.60423L27.6558 4.02988C27.5454 3.96166 27.4201 3.92576 27.2927 3.92578C27.1652 3.92581 27.04 3.96176 26.9296 4.03002C26.8192 4.09829 26.7275 4.19646 26.6638 4.31469C26.6 4.43291 26.5665 4.56702 26.5664 4.70355V11.0009C26.5664 11.1375 26.6 11.2716 26.6638 11.3898C26.7275 11.508 26.8192 11.6062 26.9296 11.6745C27.04 11.7427 27.1652 11.7787 27.2927 11.7787C27.4201 11.7787 27.5454 11.7428 27.6558 11.6746L30.2016 10.1003L32.7474 8.52595C32.8578 8.45767 32.9495 8.35948 33.0132 8.24122C33.077 8.12296 33.1105 7.98882 33.1105 7.85227C33.1105 7.71572 33.077 7.58157 33.0132 7.46332C32.9495 7.34506 32.8578 7.24686 32.7474 7.17859Z"
              fill="white"
            />
          </svg>
          <div style={{ flex: 1, padding: '0 10px' }}>
            <Timeline
              primaryColor="#01ACFD"
              secondaryColor="#D5D5D5"
              duration={6}
              markerSize={12}
              markers={timelineProps['markers']}
              onComplete={timelineProps['onComplete']}
            />
          </div>
          <span
            style={{
              borderRadius: 'var(--border-radius-full)',
              fontSize: 10,
              display: 'inline-flex',
              width: 44,
              height: 16,
              background: '#E5E5E5',
              color: '#7D7D7D',
              justifyContent: 'center'
            }}
          >
            {currentHit}/5
          </span>
        </div>
      </div>
    </div>
  )
})

const tabs = {
  console: Console,
  elements: () => null,
  network: () => null,
  react: ReactDevTools
} as const

export function TabNav({
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
              backgroundColor: isActive ? '#DCDCDC' : 'transparent',
              textTransform: 'capitalize'
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

export function DevTools({
  panelProps,
  panel
}: {
  panelProps?: any
  panel: keyof typeof tabs
}) {
  const [activePanel, setActivePanel] = useState<keyof typeof tabs>(
    panel || 'console'
  )
  const ActiveTabPanel = tabs[activePanel]
  const ref = useRef<HTMLDivElement>(null)

  // useIsomorphicLayoutEffect(() => {
  //   gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: ref.current?.closest('section'),
  //         start: '+=100vh',
  //         end: '+=400vh',
  //         scrub: true
  //         // markers: true
  //       }
  //     })
  //     .fromTo(ref.current, { opacity: 0 }, { opacity: 1 })
  // }, [])

  return (
    <div
      ref={ref}
      style={{
        // gridRow: 2,
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        width: '100%',
        // height: '100%',
        border: '1px solid #DCDCDC',
        borderRadius: 12,
        overflow: 'hidden'
      }}
    >
      <TabNav activePanel={activePanel} setActivePanel={setActivePanel} />
      <ActiveTabPanel {...panelProps} />
    </div>
  )
}

export function ReplayApplication() {
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

      <DevTools panel="react" />
    </div>
  )
}

export function OverboardStore() {
  const ref = useRef<HTMLImageElement>(null)
  const hoverboardRef = useRef<HoverboardControls>(null)
  const [color, setColor] = useState<Colorway>('red')
  // const padding = 16
  // const frameHeight = `calc(100vh - ${padding * 2}px)`

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      // gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ref.current.closest('section'),
      //       start: 0,
      //       end: '+=100vh',
      //       scrub: true
      //     }
      //   })
      //   .to(ref.current, {
      //     y: '4vh',
      //     scale: 0.85
      //   })

      // gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: ref.current.closest('section'),
      //       start: '+=100vh',
      //       end: '+=200vh',
      //       scrub: true
      //     }
      //   })
      //   .to(ref.current, {
      //     x: '26vh',
      //     y: '-6vh',
      //     scale: 0.6
      //   })

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
        display: 'grid',
        gridTemplateRows: '12vw 24vw auto',
        justifyItems: 'center',
        // gridArea: '1 / 1 / 1 / 1',
        // height: frameHeight,
        // width: '100%',
        padding: 64,
        borderRadius: 20,
        backgroundColor: '#1E076C'
      }}
    >
      <Logo />
      <Hoverboard ref={hoverboardRef} color={color} />
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

  return <Story />
  // return <ReplayApplication />

  return (
    <section
      id="overboard-story"
      style={{
        height: `max(calc(${frameCount * 100}vh - ${padding}px), 600px)`,
        padding: 80
      }}
    >
      <div style={{ position: 'sticky', top: padding }} className={s.grid}>
        <ReplayApplication />
      </div>
    </section>
  )
}
