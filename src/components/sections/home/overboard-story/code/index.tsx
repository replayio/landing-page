// eslint-disable-next-line simple-import-sort/imports
import 'prismjs/themes/prism.css'

import clsx from 'clsx'
import Prism from 'prismjs'
import {
  forwardRef,
  RefObject,
  useImperativeHandle,
  useMemo,
  useRef
} from 'react'

import 'prismjs/components/prism-jsx'

// eslint-disable-next-line import/no-named-as-default-member
Prism.manual = true

import {
  Marker as ProgressMarker,
  ProgressAPI,
  ProgressBar,
  Timeline
} from '~/components/common/progress-bar'
import { UseGsapTimeAPI } from '~/hooks/use-gsap-time'

import { Header, PanelContainer } from '../common'
import { Marker as ConsoleMarker } from '../devtools/console'
import commonS from '../overboard-story.module.scss'
import s from './code.module.scss'

const CodeLine = ({
  children,
  debug,
  code
}: {
  number: number
  debug?: boolean
  code: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={s['code-line']}
      style={{ background: debug ? '#BBEAFA' : 'transparent' }}
    >
      <pre>
        <code
          className="language-jsx"
          dangerouslySetInnerHTML={{
            __html: code
          }}
        />
      </pre>

      {children}
    </div>
  )
}

type CodeProps = {
  filename?: string
  breakpoints?: number[]
  printIndicators?: {
    [key: number]: 'disabled' | 'not-available' | 'available'
  }
  debugLine?: number
  code?: string
  debugger?: boolean
  printPanelConfig?: {
    print: string
    markers: ProgressMarker[]
    currentMarker?: ConsoleMarker
    currentHit?: number
    onComplete?: () => void
    onChangeMarker?: (
      marker: string,
      paused?: boolean
    ) => GSAPTimeline | undefined
    onHit?: (idx: number) => void
    printLineTarget: number
    timelineType: 'justUi' | 'timeBased'
  }
} & JSX.IntrinsicElements['div']

export type CodeRef<> = {
  elm: HTMLDivElement | null
  timeline: UseGsapTimeAPI | ProgressAPI | null
}

export const Code = forwardRef<CodeRef, CodeProps>(
  (
    {
      filename,
      debugLine,
      printPanelConfig,
      code,
      breakpoints,
      className,
      printIndicators,
      ...rest
    },
    ref
  ) => {
    const elmRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<UseGsapTimeAPI | ProgressAPI>(null)

    const timelineProps = useMemo(
      () => ({
        markers: printPanelConfig?.markers?.map(({ position }, idx) => ({
          position,
          onActive: () => printPanelConfig?.onHit?.(idx + 1),
          onInactive: () => printPanelConfig?.onHit?.(idx)
        })),
        markerSize: 12,
        markerActiveColor: 'var(--color-pink-crayon)',
        onStart: () => {
          printPanelConfig?.onHit?.(0)
        },
        onComplete: printPanelConfig?.onComplete
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [printPanelConfig?.onComplete, printPanelConfig?.onHit]
    )

    const parsedCode = useMemo(() => {
      if (!code) return ''
      return Prism.highlight(code, Prism?.languages?.jsx, 'jsx')
    }, [code])

    useImperativeHandle(
      ref,
      () => ({
        elm: elmRef.current,
        timeline:
          printPanelConfig?.timelineType === 'justUi'
            ? (timelineRef.current as ProgressAPI)
            : {
                ...(timelineRef.current as UseGsapTimeAPI),
                reset: () => {
                  ;(timelineRef.current as UseGsapTimeAPI)?.reset()
                }
              }
      }),
      [printPanelConfig?.timelineType]
    )

    return (
      <PanelContainer
        id="dev-tools-code-panel"
        className={clsx(s['code-panel'], className)}
        {...rest}
        ref={elmRef}
      >
        <Header>
          {filename && <div className={s['file-tab']}>{filename}</div>}
        </Header>

        <div className={s['code']}>
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

          {parsedCode?.split(/\n/g).map((line, idx) => {
            const codeLine = idx + 1
            const isTargetLine = codeLine === printPanelConfig?.printLineTarget
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
                  className={s['print-indicator']}
                  style={{
                    background:
                      (printIndicators?.[codeLine] === 'not-available' &&
                        '#BBEAFA') ||
                      (printIndicators?.[codeLine] === 'available' &&
                        '#69A5FF') ||
                      '#F1F1F1'
                  }}
                >
                  {isTargetLine && (
                    <>
                      <span
                        id="dev-tools-add-print"
                        className={clsx(s['add-print'])}
                      />
                      <div
                        id="dev-tools-print-tutorial"
                        className={s['tutorial-popup']}
                      >
                        <p className={s['text']}>
                          Click to add a print statement
                        </p>
                        <span className={s['hits']}>1 hit</span>
                      </div>
                    </>
                  )}
                </span>

                <CodeLine
                  debug={debugLine != undefined && codeLine === debugLine}
                  number={codeLine}
                  code={line}
                >
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
                                  onClick={() =>
                                    printPanelConfig?.onChangeMarker?.(color)
                                  }
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
                                printPanelConfig.currentMarker &&
                                  s[printPanelConfig.currentMarker]
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
                            {printPanelConfig?.print}
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
                            {printPanelConfig?.timelineType === 'justUi' ? (
                              <ProgressBar
                                solid
                                primaryColor="#01ACFD"
                                secondaryColor="#D5D5D5"
                                animated={false}
                                {...timelineProps}
                                debug
                                ref={timelineRef as RefObject<ProgressAPI>}
                              />
                            ) : (
                              <Timeline
                                loop={false}
                                primaryColor="#01ACFD"
                                secondaryColor="#D5D5D5"
                                duration={4}
                                {...timelineProps}
                                ref={timelineRef as RefObject<UseGsapTimeAPI>}
                              />
                            )}
                          </div>
                          <span
                            className={clsx(
                              s['hit-counter'],
                              printPanelConfig.currentMarker &&
                                s[printPanelConfig.currentMarker]
                            )}
                          >
                            {printPanelConfig?.currentHit}/
                            {timelineProps?.markers?.length}
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
