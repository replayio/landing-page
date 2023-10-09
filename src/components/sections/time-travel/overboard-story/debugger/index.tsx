import clsx from 'clsx'
import get from 'lodash/get'
import { FC, forwardRef, useMemo } from 'react'

import { Header, IdentifiedNode, logContent, PanelContainer } from '../common'
import s from './debugger.module.scss'

export type Snapshot = {
  scope?: {
    name: string
    type?: 'component' | 'function'
  }
  line: number
  variables: {
    [key: string]: any
  }
  children?: Snapshot[]
}

type DebuggerProps = {
  breakpoints: number[]
  snapshotTree: IdentifiedNode<Snapshot>[]
  currentSnapshotPath: string
  onCurrentSnapshotPathChange: (path: string) => void
} & JSX.IntrinsicElements['div']

const process = (
  path: string,
  snapshotTree: IdentifiedNode<Snapshot>[],
  breakpoints?: number[]
) => {
  const parsedPath = path.split('.').map((path) => {
    const maybeNumber = Number(path[path.length - 1])

    return isNaN(maybeNumber) ? path : maybeNumber
  })

  const lastIdx = parsedPath[parsedPath.length - 1] as number
  let prevPath: string | undefined = parsedPath
    .slice(0, parsedPath.length - 2)
    .join('.')
  const currentScope = prevPath
    ? (get(snapshotTree, prevPath + '.children') as IdentifiedNode<Snapshot>[])
    : snapshotTree

  let prev: IdentifiedNode<Snapshot> | undefined,
    prevBreakpoint: IdentifiedNode<Snapshot> | undefined,
    nextBreakpoint: IdentifiedNode<Snapshot> | undefined

  if (prevPath.length > 0) {
    prev = get(snapshotTree, prevPath)
  } else {
    prev = undefined
    prevPath = undefined
  }

  if (breakpoints) {
    prevBreakpoint = currentScope
      .slice(0, lastIdx)
      .reverse()
      .find((e) => breakpoints.includes(e.line))
    nextBreakpoint = currentScope
      .slice(lastIdx + 1, currentScope.length)
      .find((e) => breakpoints.includes(e.line))
  }

  return {
    parsedPath,
    currentPath: path,
    lastIdx,
    prevPath,
    hasChilds: !!get(snapshotTree, [path, 'children']),
    prevBreakpoint: prevBreakpoint,
    nextBreakpoint: nextBreakpoint,
    next:
      get(
        snapshotTree,
        `${prevPath ? `${prevPath}.children.` : ''}${(lastIdx as number) + 1}`
      ) || prev,
    prev:
      get(
        snapshotTree,
        `${prevPath ? `${prevPath}.children.` : ''}${(lastIdx as number) - 1}`
      ) || prev
  }
}

const DebuggerSection: FC<{
  title: string
}> = ({ title, children }) => {
  return (
    <div className={s['section']}>
      <div className={s['title']}>
        <span>
          <svg
            width="12"
            viewBox="0 0 7 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.66667 3L0.779915 1.19209e-07H6.55342L3.66667 3Z"
              fill="#7C7C7C"
            />
          </svg>
        </span>
        <span>{title}</span>
      </div>

      <div>{children}</div>
    </div>
  )
}

export const Debugger = forwardRef<HTMLDivElement, DebuggerProps>(
  (
    {
      breakpoints,
      snapshotTree,
      currentSnapshotPath,
      onCurrentSnapshotPathChange,
      ...rest
    },
    ref
  ) => {
    const pathInfo = useMemo(() => {
      return process(currentSnapshotPath, snapshotTree, breakpoints)
    }, [currentSnapshotPath, snapshotTree, breakpoints])

    const functions = useMemo(() => {
      return {
        prevBreakpoint: () => {
          if (pathInfo?.prevBreakpoint?.path) {
            onCurrentSnapshotPathChange(pathInfo?.prevBreakpoint?.path)
          }
        },
        nextBreakpoint: () => {
          if (pathInfo?.nextBreakpoint?.path) {
            onCurrentSnapshotPathChange(pathInfo?.nextBreakpoint?.path)
          }
        },
        next: () => {
          if (pathInfo?.next?.path) {
            onCurrentSnapshotPathChange(pathInfo.next?.path)
          } else if (pathInfo?.prevPath) {
            onCurrentSnapshotPathChange(pathInfo?.prevPath)
          }
        },
        previous: () => {
          if (pathInfo?.prev?.path) {
            onCurrentSnapshotPathChange(pathInfo?.prev?.path)
          }
        },
        enter: () => {
          if (pathInfo?.hasChilds) {
            onCurrentSnapshotPathChange(pathInfo?.currentPath + '.children.0')
          }
        },
        exit: () => {
          if (pathInfo?.prevPath) {
            const prevPathInfo = process(pathInfo?.prevPath, snapshotTree)

            const nextIdx =
              (prevPathInfo?.parsedPath[
                prevPathInfo?.parsedPath.length - 1
              ] as number) + 1

            const _prevPath = prevPathInfo?.parsedPath
              .slice(0, prevPathInfo?.parsedPath.length - 2)
              .join('.')

            onCurrentSnapshotPathChange(
              _prevPath ? _prevPath + '.' : '' + nextIdx
            )
          }
        }
      }
    }, [pathInfo, snapshotTree, onCurrentSnapshotPathChange])

    const currentSnapshot: Snapshot = useMemo(() => {
      const snapshot = get(snapshotTree, currentSnapshotPath)

      Object.entries(snapshot.variables).map(([key, value]) => {
        if (value === '^') {
          snapshot.variables[key] = pathInfo?.prev?.variables[key]
        }
      })

      return snapshot
    }, [currentSnapshotPath, snapshotTree, pathInfo])

    const scopeArray = currentSnapshot.scope?.name?.split('>').reverse()

    return (
      // @ts-ignore
      <PanelContainer className={s['debugger']} {...rest} ref={ref}>
        <Header className={s['header']}>
          <div className={s['button-group']}>
            <button
              className={s['button']}
              onClick={functions['prevBreakpoint']}
              disabled={pathInfo?.prevBreakpoint === undefined}
              id="prev-breakpoint"
            >
              <svg
                width="13"
                height="16"
                viewBox="0 0 13 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8359 14.6428V1.35723L1.34768 8L10.8359 14.6428ZM12.1914 14.6428C12.1914 15.7189 10.9444 16.3832 10.0498 15.7588L0.56151 9.07613C0.387935 8.95296 0.246628 8.79121 0.149182 8.60414C0.0517368 8.41708 0.000929832 8.21004 0.000929832 8C0.000929832 7.78996 0.0517368 7.58292 0.149182 7.39586C0.246628 7.20879 0.387935 7.04704 0.56151 6.92387L10.0498 0.241242C10.9444 -0.383179 12.1914 0.281099 12.1914 1.35723V14.6428Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button
              className={s['button']}
              onClick={functions['nextBreakpoint']}
              disabled={pathInfo?.nextBreakpoint === undefined}
              id="next-breakpoint"
            >
              <svg
                width="13"
                height="16"
                viewBox="0 0 13 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.43359 1.35723V14.6428L10.9219 8L1.43359 1.35723ZM0.078125 1.35723C0.078125 0.281099 1.32515 -0.383178 2.21976 0.241242L11.708 6.92387C11.8816 7.04704 12.0229 7.20879 12.1203 7.39586C12.2178 7.58292 12.2686 7.78996 12.2686 8C12.2686 8.21004 12.2178 8.41708 12.1203 8.60414C12.0229 8.79121 11.8816 8.95296 11.708 9.07613L2.21976 15.7588C1.32515 16.3832 0.078125 15.7189 0.078125 14.6428V1.35723Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div className={s['button-group']}>
            <button
              className={s['button']}
              onClick={functions['previous']}
              disabled={pathInfo?.prev === undefined}
              id="prev-function"
            >
              <svg
                width="19"
                height="13"
                viewBox="0 0 19 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.29723 5.46202C4.22817 2.3398 7.44797 0 11.12 0C13.1944 0 15.1838 0.769281 16.6506 2.13861C18.1174 3.50794 18.9414 5.36515 18.9414 7.30167C18.9414 7.46584 18.8715 7.62328 18.7472 7.73937C18.6229 7.85545 18.4542 7.92067 18.2783 7.92067C18.1025 7.92067 17.9338 7.85545 17.8095 7.73937C17.6851 7.62328 17.6153 7.46584 17.6153 7.30167C17.6153 5.69348 16.931 4.15116 15.7129 3.014C14.4948 1.87684 12.8426 1.23799 11.12 1.23799C7.47317 1.23799 4.35415 4.00614 4.35415 7.30167V7.30662L9.43449 5.60686C9.60015 5.55137 9.78263 5.55959 9.94179 5.6297C10.101 5.69982 10.2238 5.82609 10.2832 5.98073C10.3426 6.13538 10.3338 6.30574 10.2587 6.45432C10.1836 6.60291 10.0484 6.71756 9.88272 6.77305L3.9656 8.75136C3.87946 8.78012 3.78789 8.79194 3.69663 8.78606C3.60537 8.78018 3.5164 8.75674 3.43531 8.7172C3.35423 8.67767 3.28278 8.6229 3.22547 8.55634C3.16816 8.48978 3.12622 8.41287 3.10229 8.33044C3.09257 8.31309 3.08372 8.29533 3.07577 8.27721L0.423544 2.08725C0.389019 2.01145 0.371048 1.92998 0.370682 1.84761C0.370317 1.76524 0.387566 1.68363 0.421417 1.60756C0.455269 1.53149 0.505043 1.4625 0.567822 1.40462C0.630602 1.34674 0.705124 1.30114 0.787024 1.27049C0.868921 1.23984 0.956549 1.22476 1.04477 1.22614C1.13299 1.22751 1.22003 1.2453 1.30079 1.27848C1.38155 1.31165 1.45441 1.35954 1.51509 1.41934C1.57577 1.47914 1.62306 1.54964 1.65418 1.62672L3.29856 5.46202H3.29723Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.29723 5.46202C4.22817 2.3398 7.44797 0 11.12 0C13.1944 0 15.1838 0.769281 16.6506 2.13861C18.1174 3.50794 18.9414 5.36515 18.9414 7.30167C18.9414 7.46584 18.8715 7.62328 18.7472 7.73937C18.6229 7.85545 18.4542 7.92067 18.2783 7.92067C18.1025 7.92067 17.9338 7.85545 17.8095 7.73937C17.6851 7.62328 17.6153 7.46584 17.6153 7.30167C17.6153 5.69348 16.931 4.15116 15.7129 3.014C14.4948 1.87684 12.8426 1.23799 11.12 1.23799C7.47317 1.23799 4.35415 4.00614 4.35415 7.30167V7.30662L9.43449 5.60686C9.60015 5.55137 9.78263 5.55959 9.94179 5.6297C10.101 5.69982 10.2238 5.82609 10.2832 5.98073C10.3426 6.13538 10.3338 6.30574 10.2587 6.45432C10.1836 6.60291 10.0484 6.71756 9.88272 6.77305L3.9656 8.75136C3.87946 8.78012 3.78789 8.79194 3.69663 8.78606C3.60537 8.78018 3.5164 8.75674 3.43531 8.7172C3.35423 8.67767 3.28278 8.6229 3.22547 8.55634C3.16816 8.48978 3.12622 8.41287 3.10229 8.33044C3.09257 8.31309 3.08372 8.29533 3.07577 8.27721L0.423544 2.08725C0.389019 2.01145 0.371048 1.92998 0.370682 1.84761C0.370317 1.76524 0.387566 1.68363 0.421417 1.60756C0.455269 1.53149 0.505043 1.4625 0.567822 1.40462C0.630602 1.34674 0.705124 1.30114 0.787024 1.27049C0.868921 1.23984 0.956549 1.22476 1.04477 1.22614C1.13299 1.22751 1.22003 1.2453 1.30079 1.27848C1.38155 1.31165 1.45441 1.35954 1.51509 1.41934C1.57577 1.47914 1.62306 1.54964 1.65418 1.62672L3.29856 5.46202H3.29723Z"
                  fill="currentColor"
                />
                <path
                  d="M11.6465 12.9994C10.9141 12.9994 10.3204 12.4452 10.3204 11.7614C10.3204 11.0777 10.9141 10.5234 11.6465 10.5234C12.3789 10.5234 12.9727 11.0777 12.9727 11.7614C12.9727 12.4452 12.3789 12.9994 11.6465 12.9994Z"
                  fill="currentColor"
                />
                <path
                  d="M11.6465 12.9994C10.9141 12.9994 10.3204 12.4452 10.3204 11.7614C10.3204 11.0777 10.9141 10.5234 11.6465 10.5234C12.3789 10.5234 12.9727 11.0777 12.9727 11.7614C12.9727 12.4452 12.3789 12.9994 11.6465 12.9994Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button
              className={s['button']}
              onClick={functions['next']}
              disabled={pathInfo?.next === undefined}
              id="next-function"
            >
              <svg
                width="19"
                height="13"
                viewBox="0 0 19 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.546 5.46202C14.6769 2.3398 11.6711 0 8.24308 0C6.30655 0 4.44935 0.769281 3.08002 2.13861C1.71069 3.50794 0.941406 5.36515 0.941406 7.30167C0.941406 7.46584 1.00662 7.62328 1.12271 7.73937C1.23879 7.85545 1.39623 7.92067 1.5604 7.92067C1.72457 7.92067 1.88201 7.85545 1.9981 7.73937C2.11418 7.62328 2.1794 7.46584 2.1794 7.30167C2.1794 5.69348 2.81825 4.15116 3.95541 3.014C5.09257 1.87684 6.63489 1.23799 8.24308 1.23799C11.6476 1.23799 14.5593 4.00614 14.5593 7.30167V7.30662L9.81656 5.60686C9.66192 5.55137 9.49156 5.55959 9.34298 5.6297C9.19439 5.69982 9.07974 5.82609 9.02425 5.98073C8.96876 6.13538 8.97698 6.30574 9.04709 6.45432C9.11721 6.60291 9.24348 6.71756 9.39812 6.77305L14.922 8.75136C15.0024 8.78012 15.0879 8.79194 15.1731 8.78606C15.2583 8.78018 15.3414 8.75674 15.4171 8.7172C15.4928 8.67767 15.5595 8.6229 15.613 8.55634C15.6665 8.48978 15.7056 8.41287 15.728 8.33044C15.7371 8.31309 15.7453 8.29533 15.7527 8.27721L18.2287 2.08725C18.2609 2.01145 18.2777 1.92998 18.2781 1.84761C18.2784 1.76524 18.2623 1.68363 18.2307 1.60756C18.1991 1.53149 18.1526 1.4625 18.094 1.40462C18.0354 1.34674 17.9658 1.30114 17.8894 1.27049C17.8129 1.23984 17.7311 1.22476 17.6488 1.22614C17.5664 1.22751 17.4852 1.2453 17.4098 1.27848C17.3344 1.31165 17.2664 1.35954 17.2097 1.41934C17.1531 1.47914 17.1089 1.54964 17.0799 1.62672L15.5447 5.46202H15.546Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.546 5.46202C14.6769 2.3398 11.6711 0 8.24308 0C6.30655 0 4.44935 0.769281 3.08002 2.13861C1.71069 3.50794 0.941406 5.36515 0.941406 7.30167C0.941406 7.46584 1.00662 7.62328 1.12271 7.73937C1.23879 7.85545 1.39623 7.92067 1.5604 7.92067C1.72457 7.92067 1.88201 7.85545 1.9981 7.73937C2.11418 7.62328 2.1794 7.46584 2.1794 7.30167C2.1794 5.69348 2.81825 4.15116 3.95541 3.014C5.09257 1.87684 6.63489 1.23799 8.24308 1.23799C11.6476 1.23799 14.5593 4.00614 14.5593 7.30167V7.30662L9.81656 5.60686C9.66192 5.55137 9.49156 5.55959 9.34298 5.6297C9.19439 5.69982 9.07974 5.82609 9.02425 5.98073C8.96876 6.13538 8.97698 6.30574 9.04709 6.45432C9.11721 6.60291 9.24348 6.71756 9.39812 6.77305L14.922 8.75136C15.0024 8.78012 15.0879 8.79194 15.1731 8.78606C15.2583 8.78018 15.3414 8.75674 15.4171 8.7172C15.4928 8.67767 15.5595 8.6229 15.613 8.55634C15.6665 8.48978 15.7056 8.41287 15.728 8.33044C15.7371 8.31309 15.7453 8.29533 15.7527 8.27721L18.2287 2.08725C18.2609 2.01145 18.2777 1.92998 18.2781 1.84761C18.2784 1.76524 18.2623 1.68363 18.2307 1.60756C18.1991 1.53149 18.1526 1.4625 18.094 1.40462C18.0354 1.34674 17.9658 1.30114 17.8894 1.27049C17.8129 1.23984 17.7311 1.22476 17.6488 1.22614C17.5664 1.22751 17.4852 1.2453 17.4098 1.27848C17.3344 1.31165 17.2664 1.35954 17.2097 1.41934C17.1531 1.47914 17.1089 1.54964 17.0799 1.62672L15.5447 5.46202H15.546Z"
                  fill="currentColor"
                />
                <path
                  d="M7.74971 12.9994C8.43343 12.9994 8.9877 12.4452 8.9877 11.7614C8.9877 11.0777 8.43343 10.5234 7.74971 10.5234C7.06599 10.5234 6.51172 11.0777 6.51172 11.7614C6.51172 12.4452 7.06599 12.9994 7.74971 12.9994Z"
                  fill="currentColor"
                />
                <path
                  d="M7.74971 12.9994C8.43343 12.9994 8.9877 12.4452 8.9877 11.7614C8.9877 11.0777 8.43343 10.5234 7.74971 10.5234C7.06599 10.5234 6.51172 11.0777 6.51172 11.7614C6.51172 12.4452 7.06599 12.9994 7.74971 12.9994Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div className={s['button-group']}>
            <button
              className={s['button']}
              onClick={functions['exit']}
              disabled={pathInfo?.prevPath === undefined}
              id="exit-function"
            >
              <svg
                width="15"
                height="13"
                viewBox="0 0 15 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.78776 12.0715H1.07364C0.950509 12.0715 0.832421 12.1204 0.745355 12.2074C0.658288 12.2945 0.609375 12.4126 0.609375 12.5357C0.609375 12.6589 0.658288 12.777 0.745355 12.864C0.832421 12.9511 0.950509 13 1.07364 13H4.78776C4.91089 13 5.02898 12.9511 5.11604 12.864C5.20311 12.777 5.25202 12.6589 5.25202 12.5357C5.25202 12.4126 5.20311 12.2945 5.11604 12.2074C5.02898 12.1204 4.91089 12.0715 4.78776 12.0715ZM11.2875 12.0715H7.57335C7.45022 12.0715 7.33213 12.1204 7.24506 12.2074C7.158 12.2945 7.10908 12.4126 7.10908 12.5357C7.10908 12.6589 7.158 12.777 7.24506 12.864C7.33213 12.9511 7.45022 13 7.57335 13H11.2875C11.4106 13 11.5287 12.9511 11.6157 12.864C11.7028 12.777 11.7517 12.6589 11.7517 12.5357C11.7517 12.4126 11.7028 12.2945 11.6157 12.2074C11.5287 12.1204 11.4106 12.0715 11.2875 12.0715ZM5.81843 4.19011C5.84883 4.18275 5.88 4.17901 5.91128 4.17897H12.4881L9.10171 0.793551C9.05854 0.750385 9.0243 0.69914 9.00094 0.642742C8.97758 0.586344 8.96555 0.525896 8.96555 0.464851C8.96555 0.403806 8.97758 0.343359 9.00094 0.28696C9.0243 0.230562 9.05854 0.179317 9.10171 0.136152C9.14487 0.0929864 9.19612 0.0587457 9.25251 0.0353847C9.30891 0.0120237 9.36936 0 9.43041 0C9.49145 0 9.5519 0.0120237 9.6083 0.0353847C9.66469 0.0587457 9.71594 0.0929864 9.7591 0.136152L13.9375 4.31454C13.9809 4.35754 14.0154 4.40873 14.039 4.46515C14.0625 4.52157 14.0747 4.5821 14.0747 4.64323C14.0747 4.70437 14.0625 4.7649 14.039 4.82132C14.0154 4.87774 13.9809 4.92893 13.9375 4.97193L9.7591 9.15032C9.71594 9.19348 9.66469 9.22772 9.6083 9.25108C9.5519 9.27444 9.49145 9.28647 9.43041 9.28647C9.36936 9.28647 9.30891 9.27444 9.25251 9.25108C9.19612 9.22772 9.14487 9.19348 9.10171 9.15032C9.05854 9.10715 9.0243 9.05591 9.00094 8.99951C8.97758 8.94311 8.96555 8.88266 8.96555 8.82162C8.96555 8.76057 8.97758 8.70012 9.00094 8.64373C9.0243 8.58733 9.05854 8.53608 9.10171 8.49292L12.4881 5.1075H6.18055V10.2144C6.18055 10.3375 6.13164 10.4556 6.04457 10.5427C5.95751 10.6298 5.83942 10.6787 5.71629 10.6787C5.59316 10.6787 5.47507 10.6298 5.388 10.5427C5.30094 10.4556 5.25202 10.3375 5.25202 10.2144V4.64323C5.25199 4.57357 5.26763 4.50479 5.29779 4.44199C5.32796 4.3792 5.37186 4.32399 5.42626 4.28047C5.48066 4.23695 5.54416 4.20623 5.61204 4.19059C5.67993 4.17495 5.75047 4.17479 5.81843 4.19011Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button
              className={s['button']}
              onClick={functions['enter']}
              disabled={!pathInfo.hasChilds}
              id="enter-function"
            >
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.573661 13H4.37616C4.4993 13 4.61739 12.9431 4.70446 12.8419C4.79153 12.7407 4.84045 12.6034 4.84045 12.4602C4.84045 12.3171 4.79153 12.1798 4.70446 12.0786C4.61739 11.9773 4.4993 11.9205 4.37616 11.9205H0.573661C0.450525 11.9205 0.332432 11.9773 0.245361 12.0786C0.158291 12.1798 0.109375 12.3171 0.109375 12.4602C0.109375 12.6034 0.158291 12.7407 0.245361 12.8419C0.332432 12.9431 0.450525 13 0.573661 13ZM6.59359 0.000312095C6.65588 -0.00215135 6.71795 0.00998904 6.77612 0.0360096C6.83428 0.0620302 6.88734 0.101398 6.93214 0.151768C6.97694 0.202137 7.01256 0.262476 7.03687 0.329189C7.06119 0.395902 7.0737 0.467623 7.07366 0.540077V8.61819L9.98566 5.02768C10.0701 4.92346 10.1868 4.86253 10.3099 4.85827C10.433 4.85402 10.5525 4.90681 10.6422 5.00501C10.7318 5.10321 10.7842 5.23879 10.7879 5.38193C10.7915 5.52506 10.7461 5.66402 10.6617 5.76824L6.94738 10.3487C6.90376 10.4025 6.8511 10.4453 6.79265 10.4744C6.7342 10.5035 6.67122 10.5183 6.60764 10.5179C6.54405 10.5175 6.48122 10.5019 6.42305 10.472C6.36488 10.4422 6.31262 10.3987 6.26952 10.3444L2.55616 5.76824C2.47169 5.66402 2.42629 5.52506 2.42994 5.38193C2.4336 5.23879 2.48602 5.10321 2.57566 5.00501C2.6653 4.90681 2.78483 4.85402 2.90795 4.85827C3.03107 4.86253 3.14769 4.92346 3.23216 5.02768L6.14509 8.61819V1.07984H0.607089C0.332232 1.07984 0.109375 0.838027 0.109375 0.540077C0.109375 0.242127 0.332232 0.000312095 0.607089 0.000312095H6.59359ZM8.9308 13H12.7333C12.8564 13 12.9745 12.9431 13.0616 12.8419C13.1487 12.7407 13.1976 12.6034 13.1976 12.4602C13.1976 12.3171 13.1487 12.1798 13.0616 12.0786C12.9745 11.9773 12.8564 11.9205 12.7333 11.9205H8.9308C8.80767 11.9205 8.68957 11.9773 8.6025 12.0786C8.51543 12.1798 8.46652 12.3171 8.46652 12.4602C8.46652 12.6034 8.51543 12.7407 8.6025 12.8419C8.68957 12.9431 8.80767 13 8.9308 13Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </Header>

        <div className={s['data']}>
          <DebuggerSection title="Call Stack">
            {scopeArray?.map((stack, idx) => (
              <div
                className={clsx(s['stack-line'], {
                  [s['active'] as string]: idx === 0
                })}
                key={stack}
              >
                {stack}
              </div>
            ))}
          </DebuggerSection>

          <DebuggerSection title="Scopes">
            <div className={clsx(s['stack-line'], s['current'])}>
              {currentSnapshot.scope?.type == 'component' ? (
                <>
                  {'<'}
                  {scopeArray?.[0]}
                  {'>'}
                </>
              ) : (
                <>{scopeArray?.[0]}()</>
              )}
            </div>
            <ul className={s['variables']}>
              {Object.entries(currentSnapshot.variables || {}).map(
                ([key, value]) => (
                  <li key={key}>
                    {key}:{' '}
                    <span style={{ color: '#314EB2' }}>
                      {logContent(value)}
                    </span>
                  </li>
                )
              )}
            </ul>
          </DebuggerSection>
        </div>
      </PanelContainer>
    )
  }
)
