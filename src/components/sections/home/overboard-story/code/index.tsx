// eslint-disable-next-line simple-import-sort/imports
import 'prismjs/themes/prism-coy.css'

import clsx from 'clsx'
import Prism from 'prismjs'
import {
  forwardRef,
  Fragment,
  RefObject,
  useImperativeHandle,
  useMemo,
  useRef
} from 'react'

import 'prismjs/components/prism-jsx'
import avatarTwo from '~/public/images/home/avatar-2.webp'

// eslint-disable-next-line import/no-named-as-default-member
Prism.manual = true

import {
  Marker as ProgressMarker,
  ProgressAPI,
  ProgressBar,
  Timeline
} from '~/components/common/progress-bar'
import { UseGsapTimeAPI } from '~/hooks/use-gsap-time'

import { CommentModule } from '../comment-module'
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
      marker: ConsoleMarker,
      paused?: boolean
    ) => GSAPTimeline | void
    onHit?: (idx: number) => void
    printLineTarget: number
    comment?: string
    timelineType: 'justUi' | 'timeBased'
  }
} & JSX.IntrinsicElements['div']

export type CodeRef = {
  elm: HTMLDivElement | null
  timeline: UseGsapTimeAPI | ProgressAPI | null
}

const availableMarkers: ConsoleMarker[] = [
  'unicorn',
  'green',
  'red',
  'yellow',
  'purple'
]

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
              <Fragment key={idx}>
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
                        <div className={s['sparkles']}>
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_2704_7481)">
                              <path
                                d="M20.532 26.6387H18.743C18.743 22.0594 14.9444 18.334 10.2751 18.334V16.5795C14.9444 16.5795 18.743 12.8541 18.743 8.2749H20.532C20.532 12.8541 24.3307 16.5795 28.9999 16.5795V18.334C24.3307 18.334 20.532 22.0594 20.532 26.6387ZM14.4636 17.4568C16.7622 18.4719 18.6025 20.2768 19.6375 22.531C20.6726 20.2768 22.5129 18.4719 24.8115 17.4568C22.5129 16.4417 20.6726 14.6368 19.6375 12.3825C18.6025 14.6368 16.7622 16.4417 14.4636 17.4568Z"
                                fill="white"
                              />
                              <path
                                d="M8.27752 27.7502H7.08486C7.08363 26.6881 6.65287 25.6699 5.88707 24.9188C5.12128 24.1678 4.083 23.7453 3 23.7441V22.5745C4.083 22.5733 5.12128 22.1508 5.88707 21.3998C6.65287 20.6487 7.08363 19.6305 7.08486 18.5684H8.27752C8.27875 19.6305 8.70952 20.6487 9.47531 21.3998C10.2411 22.1508 11.2794 22.5733 12.3624 22.5745V23.7441C11.2794 23.7453 10.2411 24.1678 9.47531 24.9188C8.70952 25.6699 8.27875 26.6881 8.27752 27.7502ZM5.43553 23.1593C6.39546 23.6518 7.17901 24.4202 7.68119 25.3617C8.18338 24.4202 8.96692 23.6518 9.92685 23.1593C8.96692 22.6668 8.18338 21.8984 7.68119 20.9569C7.17901 21.8984 6.39546 22.6668 5.43553 23.1593Z"
                                fill="white"
                              />
                              <path
                                d="M10.4443 14.1819H9.25161C9.25038 13.1198 8.81962 12.1015 8.05382 11.3505C7.28803 10.5994 6.24974 10.177 5.16675 10.1758V9.00611C6.24974 9.0049 7.28803 8.58244 8.05382 7.83141C8.81962 7.08038 9.25038 6.06211 9.25161 5H10.4443C10.4455 6.06211 10.8763 7.08038 11.6421 7.83141C12.4079 8.58244 13.4461 9.0049 14.5291 9.00611V10.1758C13.4461 10.177 12.4079 10.5994 11.6421 11.3505C10.8763 12.1015 10.4455 13.1198 10.4443 14.1819ZM7.60228 9.59094C8.56221 10.0834 9.34575 10.8519 9.84794 11.7933C10.3501 10.8519 11.1337 10.0834 12.0936 9.59094C11.1337 9.09843 10.3501 8.33 9.84794 7.38858C9.34575 8.33 8.56221 9.09843 7.60228 9.59094Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2704_7481">
                                <rect
                                  width="26"
                                  height="22.75"
                                  fill="white"
                                  transform="translate(3 5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div>
                          <p className={s['text']}>
                            Click to add a print statement
                          </p>
                          <span className={s['hits']}>1 hit</span>
                        </div>
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
                              {availableMarkers.map((color) => (
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
                              flex: 1,
                              fontFamily: 'var(--font-mono)',
                              color: '#8000D7',
                              marginLeft: 8
                            }}
                          >
                            {printPanelConfig?.print}
                          </p>
                          <div
                            id="scrollytelling-second-comment"
                            style={{ position: 'relative', width: 32 }}
                          >
                            <CommentModule
                              name="Travis"
                              date="Now"
                              side="right"
                              avatar={avatarTwo}
                              comment="Yep. Maybe parameters are bad."
                            />
                          </div>
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
              </Fragment>
            )
          })}
        </div>
      </PanelContainer>
    )
  }
)
