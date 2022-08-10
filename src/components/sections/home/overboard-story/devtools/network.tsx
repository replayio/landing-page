import clsx from 'clsx'
import { FC, forwardRef, useEffect, useRef } from 'react'

import { logContent, SearchBar } from '../common'
import s from './devtools.module.scss'

export type NetworkCall = {
  pending?: boolean
  method: 'GET' | 'POST'
  caller: string
  url: string
  status: number
  request?: { [key: string]: any }
  response: { [key: string]: any }
}

export type NetworkProps = {
  calls: NetworkCall[]
  onActiveCallChange: (idx: number) => void
  activeCallIdx?: number
}

const CallInfoSection: FC<{
  title: string
  extra?: { [x: string]: any }
  data?: { [x: string]: any }
}> = ({ title, data, extra }) => {
  const logInfo = (info?: { [x: string]: any }) => {
    return (
      <ul>
        {Object.entries(info || {}).map(([key, value]) => (
          <li key={key}>
            {key}: <span style={{ color: '#314EB2' }}>{logContent(value)}</span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <div className={s['tabs']}>
        <span>{title}</span>
      </div>

      <div className={s['call-info-section']}>
        {extra && <div>{logInfo(extra)}</div>}
        {data ? (
          <div>
            {'body: {'}
            <div style={{ paddingLeft: 6 }}>{logInfo(data)}</div>
            {'}'}
          </div>
        ) : (
          <span>No data</span>
        )}
      </div>
    </>
  )
}

export const Network = forwardRef<HTMLDivElement, NetworkProps>(
  ({ activeCallIdx, onActiveCallChange, calls }, ref) => {
    const callsContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!callsContainerRef.current) return

      callsContainerRef.current.scrollTop =
        callsContainerRef.current.scrollHeight
    }, [calls])

    return (
      <div className={s['network-panel']} ref={ref}>
        <div style={{ width: activeCallIdx != undefined ? '55%' : '100%' }}>
          <SearchBar>Search for requests</SearchBar>

          <div
            className={s['calls']}
            style={{ padding: '8px 0' }}
            ref={callsContainerRef}
          >
            {calls.map((call, idx) => {
              return (
                <button
                  onClick={() => onActiveCallChange(idx)}
                  className={clsx(s['call-line'], {
                    [s['pending']]: call.pending,
                    [s['active']]: idx === activeCallIdx,
                    [s['error']]: call.status >= 400
                  })}
                  key={idx}
                >
                  <span className={s['method']}>{call.method}</span>{' '}
                  <span className={s['caller']}>{call.caller}</span>{' '}
                  <span className={s['url']}>{call.url}</span>
                </button>
              )
            })}
          </div>
        </div>

        {activeCallIdx != undefined && (
          <div
            className={s['call-info']}
            style={{
              fontVariantNumeric: 'tabular-nums',
              borderLeft: '1px solid #DCDCDC',
              width: '45%'
            }}
          >
            <CallInfoSection
              title="Request"
              data={calls[activeCallIdx]?.request}
            />
            {!calls[activeCallIdx]?.pending && (
              <CallInfoSection
                title="Response"
                extra={{ status: calls[activeCallIdx]?.status }}
                data={calls[activeCallIdx]?.response}
              />
            )}
          </div>
        )}
      </div>
    )
  }
)
