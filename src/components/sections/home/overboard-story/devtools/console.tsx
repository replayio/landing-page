import clsx from 'clsx'
import range from 'lodash/range'
import { forwardRef, Fragment } from 'react'

import { logContent, SearchBar } from '../common'
import commonS from '../overboard-story.module.scss'
import s from './devtools.module.scss'

const rewind = (
  <svg viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="0.582031"
      y="0.583984"
      width="1.16667"
      height="5.83333"
      rx="0.583333"
      fill="white"
    />
    <path
      d="M2.75973 3.089C2.47272 3.28784 2.47272 3.71216 2.75973 3.911L5.75676 5.9874C6.08836 6.21714 6.5415 5.97981 6.5415 5.5764V1.4236C6.5415 1.02019 6.08836 0.78286 5.75676 1.0126L2.75973 3.089Z"
      fill="white"
    />
  </svg>
)

const forward = (
  <svg viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="0.582031"
      y="0.583984"
      width="1.16667"
      height="5.83333"
      rx="0.583333"
      fill="white"
    />
    <path
      d="M6.40678 3.089C6.69378 3.28784 6.69378 3.71216 6.40678 3.911L3.40975 5.9874C3.07815 6.21714 2.625 5.97981 2.625 5.5764V1.4236C2.625 1.02019 3.07815 0.78286 3.40975 1.0126L6.40678 3.089Z"
      fill="white"
    />
  </svg>
)

export type Marker =
  | 'yellow'
  | 'purple'
  | 'green'
  | 'red'
  | 'unicorn'
  | 'transparent'

export type ConsoleProps = {
  disableTravel?: boolean
  currentHit: number
  onCurrentHitChange: (hit: number) => void
  logs: {
    hide?: boolean
    marker: Marker
    prepend?: string
    content: any[]
    hits: number
    line?: number
    isError?: boolean
  }[]
}

export const Console = forwardRef<HTMLDivElement, ConsoleProps>(
  (
    { currentHit = 0, disableTravel = false, logs, onCurrentHitChange },
    ref
  ) => {
    const fullLogs = logs
      .map(({ hits, content, ...rest }) =>
        range(hits).map((i) => ({
          content: content[i],
          ...rest
        }))
      )
      .flat()

    return (
      <div
        className={s['console-panel']}
        style={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          backgroundColor: 'white'
        }}
        ref={ref}
      >
        <SearchBar>Search for logs...</SearchBar>

        <div className={s['logs']}>
          {fullLogs.map((log, i) => (
            <Fragment key={i}>
              {i === currentHit && (
                <hr
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    width: '100%',
                    borderColor: 'var(--color-pink-crayon)',
                    borderTopWidth: '1px'
                  }}
                />
              )}
              <div
                className={clsx(s['log-line'], {
                  [s['is-error']]: log.isError,
                  [s['active']]: i === currentHit
                })}
                id="log-line"
                style={{
                  display: log.hide ? 'none' : 'flex'
                }}
              >
                {!disableTravel && (
                  <button
                    onClick={() => onCurrentHitChange(i)}
                    tabIndex={-1}
                    className={s['travel']}
                    disabled={i === currentHit}
                    id="icon"
                  >
                    <span className={s['icon']}>
                      {i > currentHit ? forward : rewind}
                    </span>
                    {i > currentHit ? 'Forward' : 'Rewind'}
                  </button>
                )}

                <div className={s['marker-container']}>
                  <span
                    data-marker={log.marker}
                    data-line={log.line}
                    className={clsx(
                      'marker',
                      commonS['marker'],
                      commonS[log.marker],
                      s['marker']
                    )}
                  />
                </div>

                <div key={i}>
                  {log.prepend ? `${log.prepend}, ` : ''}
                  {logContent(log.content)}
                </div>
              </div>
            </Fragment>
          ))}
        </div>

        <div
          style={{
            borderTop: '1px solid #EAEAEA',
            padding: '8px 8px 20px 8px'
          }}
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
)
