import { forwardRef } from 'react'

import { SearchBar } from './common'
import s from './devtools.module.scss'

export type NetworkCall = {
  method: string
  caller: string
  url: string
  status: number
  headers: { [key: string]: string }
  request: { [key: string]: string }
  response: { [key: string]: string }
}

export const Network = forwardRef<HTMLDivElement, { calls: NetworkCall[] }>(
  ({ calls }, ref) => {
    return (
      <div className={s['network-panel']} ref={ref}>
        <div style={{ width: '55%' }}>
          <SearchBar>Search for requests</SearchBar>

          <div className={s['calls']} style={{ padding: '8px 0' }}>
            {calls.map((call, idx) => {
              return (
                <button className={s['call-line']} key={idx}>
                  <span className={s['method']}>{call.method}</span>{' '}
                  <span className={s['caller']}>{call.caller}</span>{' '}
                  <span className={s['url']}>{call.url}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div
          style={{
            fontVariantNumeric: 'tabular-nums',
            borderLeft: '1px solid #DCDCDC',
            width: '45%'
          }}
        >
          <div className={s['tabs']}>
            <span>Headers</span>
            <span>Request</span>
            <span>Response</span>
          </div>
          <ul style={{ padding: 15 }}>
            {/* {Object.entries(activeStyles || {}).map(([key, value]) => (
              <li key={key}>
                {key}:{' '}
                <span id="hoverboard-rotate" style={{ color: '#314EB2' }}>
                  {logStyleContent(key, value)}
                </span>
              </li>
            ))} */}
          </ul>
        </div>
      </div>
    )
  }
)
