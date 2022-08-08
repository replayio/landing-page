import clsx from 'clsx'
import {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef
} from 'react'

import { Timeline } from '~/components/common/progress-bar'
import { UseGsapTimeAPI } from '~/hooks/use-gsap-time'

import { Header, PanelContainer } from '../common'
import commonS from '../overboard-story.module.scss'
import s from './code.module.scss'

const CodeLine = ({
  children,
  debug
}: {
  number: number
  debug?: boolean
  children: React.ReactNode
}) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        lineHeight: '15px',
        fontSize: '14px',
        fontFamily: 'var(--font-mono)',
        background: debug ? '#BBEAFA' : 'transparent'
      }}
    >
      <div style={{ paddingLeft: '6px' }} className={s['code']}>
        {children}
      </div>
    </div>
  )
}

export type CodeLine = {
  print?: 'disabled' | 'not-available' | 'available'
  content: ReactNode
}

type CodeProps = {
  breakpoints?: number[]
  debugLine?: number
  currentHit?: number
  currentMarker?: string
  onComplete?: () => void
  onChangeMarker?: (
    marker: string,
    paused?: boolean
  ) => GSAPTimeline | undefined
  onHit?: (idx: number) => void
  code?: CodeLine[]
  debugger?: boolean
} & JSX.IntrinsicElements['div']

export const Code = forwardRef<
  {
    elm: HTMLDivElement | null
    timeline: UseGsapTimeAPI | null
  },
  CodeProps
>(
  (
    {
      onHit,
      debugLine,
      onChangeMarker,
      onComplete,
      currentHit,
      currentMarker,
      code,
      breakpoints,
      ...rest
    },
    ref
  ) => {
    const elmRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<UseGsapTimeAPI>(null)

    const lines: CodeLine[] = [
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
            &nbsp;&nbsp;&nbsp;
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
            &nbsp;&nbsp;&nbsp;
            <span className="reserved">const</span>{' '}
            <span className="symbol">[</span>
            <span className="variable">angle</span>,{' '}
            <span className="variable">setAngle</span>
            <span className="symbol">]</span> <span className="symbol">=</span>{' '}
            <span className="function">useState</span>(0)
          </>
        )
      },
      { print: 'disabled', content: <></> },
      { print: 'disabled', content: <></> },
      { print: 'disabled', content: <></> },
      { print: 'disabled', content: <></> },
      { print: 'disabled', content: <></> },
      { print: 'disabled', content: <></> },
      { print: 'disabled', content: <></> },
      { print: 'disabled', content: <></> }
    ]

    const handleHit = useCallback(
      (idx: number) => {
        onHit?.(idx)
      },
      [onHit]
    )

    const timelineProps = useMemo(
      () => ({
        markers: [30, 36, 40, 55, 80].map((position, idx) => ({
          position,
          onActive: () => handleHit(idx + 1)
        })),
        onStart: () => {
          handleHit(0)
        },
        onComplete
      }),
      [handleHit, onComplete]
    )

    useImperativeHandle(
      ref,
      () => ({
        elm: elmRef.current,
        timeline: timelineRef.current && {
          ...timelineRef.current,
          reset: () => {
            timelineRef.current?.reset()
          }
        }
      }),
      []
    )

    return (
      <PanelContainer
        id="dev-tools-code-panel"
        className={s['code-panel']}
        {...rest}
        ref={elmRef}
      >
        <Header />
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

          {(code || lines).map((line, idx) => {
            const codeLine = idx + 1
            const isTargetLine = codeLine === 5
            const hasBreakpoint = breakpoints?.includes(codeLine)

            return (
              <>
                <span
                  style={{
                    display: 'inline-block',
                    color: hasBreakpoint ? 'var(--color-white)' : '#666666',
                    textAlign: 'right',
                    paddingRight: '3px',
                    fontVariantNumeric: 'tabular-nums',
                    background: hasBreakpoint ? '#69A5FF' : undefined
                  }}
                >
                  {idx + 1}
                </span>
                <span
                  data-line={idx + 1}
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
                >
                  <span
                    id={isTargetLine ? 'dev-tools-add-print' : undefined}
                    className={clsx(s['add-print'])}
                  />
                </span>

                <CodeLine
                  debug={debugLine != undefined && codeLine === debugLine}
                  number={codeLine}
                >
                  {line.content}
                  {isTargetLine && (
                    <div
                      className={s['print-panel']}
                      id="dev-tools-print-panel"
                    >
                      <div
                        style={{
                          width: '100%',
                          transform: 'translateY(100%)',
                          padding: '10px',
                          background: '#FAFAFA'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div
                            id="dev-tools-console-markers"
                            className={s['markers']}
                          >
                            <div className={s['markers-container']}>
                              {[
                                'unicorn',
                                'green',
                                'red',
                                'yellow',
                                'purple'
                              ].map((color) => (
                                <button
                                  onClick={() => onChangeMarker?.(color)}
                                  data-marker={color}
                                  className={clsx(
                                    commonS['marker'],
                                    commonS[color],
                                    s['marker'],
                                    s['hoverable']
                                  )}
                                  key={color}
                                />
                              ))}
                            </div>
                            <span
                              className={clsx(
                                s['toggle'],
                                currentMarker && s[currentMarker]
                              )}
                            />
                          </div>
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
                        <div
                          style={{
                            display: 'flex',
                            marginTop: 12,
                            alignItems: 'center'
                          }}
                        >
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
                            <circle
                              cx="29.185"
                              cy="7.85294"
                              r="7.85294"
                              fill="#DBDBDB"
                            />
                            <path
                              d="M32.7474 7.17859L30.2016 5.60423L27.6558 4.02988C27.5454 3.96166 27.4201 3.92576 27.2927 3.92578C27.1652 3.92581 27.04 3.96176 26.9296 4.03002C26.8192 4.09829 26.7275 4.19646 26.6638 4.31469C26.6 4.43291 26.5665 4.56702 26.5664 4.70355V11.0009C26.5664 11.1375 26.6 11.2716 26.6638 11.3898C26.7275 11.508 26.8192 11.6062 26.9296 11.6745C27.04 11.7427 27.1652 11.7787 27.2927 11.7787C27.4201 11.7787 27.5454 11.7428 27.6558 11.6746L30.2016 10.1003L32.7474 8.52595C32.8578 8.45767 32.9495 8.35948 33.0132 8.24122C33.077 8.12296 33.1105 7.98882 33.1105 7.85227C33.1105 7.71572 33.077 7.58157 33.0132 7.46332C32.9495 7.34506 32.8578 7.24686 32.7474 7.17859Z"
                              fill="white"
                            />
                          </svg>
                          <div style={{ flex: 1, padding: '0 10px' }}>
                            <Timeline
                              loop={false}
                              primaryColor="#01ACFD"
                              secondaryColor="#D5D5D5"
                              duration={4}
                              markerSize={12}
                              viewportReactive={false}
                              {...timelineProps}
                              ref={timelineRef}
                            />
                          </div>
                          <span
                            className={clsx(
                              s['hit-counter'],
                              currentMarker && s[currentMarker]
                            )}
                          >
                            {currentHit}/{timelineProps['markers'].length}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CodeLine>
              </>
            )
          })}
        </div>
      </PanelContainer>
    )
  }
)
