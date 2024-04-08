import clsx from 'clsx'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

import { ColaborationIcon } from '~/components/icons/colaboration'
import { CursorOutlinedIcon } from '~/components/icons/cursorOutlined'
import { DebuggingIcon } from '~/components/icons/debugging'
import { GridIcon } from '~/components/icons/grid'
import { WorkflowIcon } from '~/components/icons/workflow'
import { useAppStore } from '~/context/use-app-store'
import { useTabletLgBreakpoint } from '~/hooks/use-media'

import s from './nav-sitemap.module.scss'

export const NavigationSitemap = () => {
  const [sitemap, setSitemap] = useState<
    {
      id: string
      icon: string
      shortTitle: string
      completeTitle: string
    }[]
  >([])

  const [activeItem, setActiveItem] = useState<
    | {
        isIntersecting: boolean
        id: string | null
      }
    | undefined
  >(undefined)
  const { setNavigationSitemapShowing } = useAppStore()
  const listRef = useRef<HTMLUListElement>(null)
  const isTablet = useTabletLgBreakpoint()

  // Collect all sections with data-sitemap attr and store it on a state
  useEffect(() => {
    const sections: any[] = Array.from(document.querySelectorAll('section[data-sitemap]'))

    setSitemap(
      sections.map((item) => {
        return {
          id: item.id,
          icon: item.dataset.sitemapIcon,
          shortTitle: item.dataset.sitemapShortTitle,
          completeTitle: item.dataset.sitemapCompleteTitle
        }
      })
    )
  }, [])

  // Sets the active sitemap with an IntersectionObserver
  // and also sets the visiblity of the sitemap if some section is on the view
  useEffect(() => {
    const querySectionsToObserve: any[] = Array.from(
      document.querySelectorAll('section[data-sitemap]')
    )
    let sectionsIntersecting: {
      [key: string]: { isIntersecting: boolean; id: string | null }
    } = {}

    querySectionsToObserve.forEach((item) => {
      sectionsIntersecting = {
        ...sectionsIntersecting,
        [item.id as string]: { isIntersecting: false, id: null }
      }
    })

    const handleObserve = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        sectionsIntersecting = {
          ...sectionsIntersecting,
          [entry.target.id]: {
            isIntersecting: entry.isIntersecting,
            id: entry.target.id
          }
        }
      })

      setActiveItem(Object.values(sectionsIntersecting).find((item) => item.isIntersecting))
    }

    const options: IntersectionObserverInit & { triggerOnce?: boolean } = {
      triggerOnce: false,
      threshold: 0,
      rootMargin: '-300px 0px -200px 0px'
    }

    const observer = new IntersectionObserver(handleObserve, options)

    querySectionsToObserve.forEach((item) => observer.observe(item))

    return () => {
      observer.disconnect()
    }
  }, [])

  // On mobile it slides the view of the list to the selected item
  useEffect(() => {
    if (!isTablet || document.querySelector(`#sitemap-${activeItem?.id}-item`) === undefined) {
      return
    }

    const leftPositionOfElement =
      document.querySelector(`#sitemap-${activeItem?.id}-item`)?.getBoundingClientRect().left || 0

    listRef.current?.scrollBy(leftPositionOfElement - 16, 0)
  }, [isTablet, activeItem])

  // Setting global state of the navigation show/off
  useEffect(() => {
    setNavigationSitemapShowing(Boolean(activeItem))
  }, [activeItem, setNavigationSitemapShowing])

  return (
    <nav
      className={clsx(s.navigationSitemap, {
        [s.show as string]: Boolean(activeItem)
      })}
    >
      <div className={s.listWrapper}>
        <ul ref={listRef}>
          {sitemap.map((item) => (
            <li key={item.id}>
              <Item {...item} active={activeItem?.id === item.id} />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

const Item = ({
  id,
  icon,
  shortTitle,
  completeTitle,
  active
}: {
  id: string
  icon: string
  shortTitle: string
  completeTitle: string
  active?: boolean
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const completeTitleRef = useRef<HTMLDivElement>(null)
  const shortTitleRef = useRef<HTMLDivElement>(null)

  // set initial css vars
  useEffect(() => {
    linkRef.current?.style.setProperty(
      '--closed',
      shortTitleRef.current?.getBoundingClientRect().width + 'px'
    )

    linkRef.current?.style.setProperty(
      '--open',
      Number(shortTitleRef.current?.getBoundingClientRect().width) +
        Number(completeTitleRef.current?.getBoundingClientRect().width) +
        12 +
        'px'
    )
  }, [])

  const renderIcon = useCallback(() => {
    switch (icon) {
      case 'workflow':
        return <WorkflowIcon />
      case 'colaboration':
        return <ColaborationIcon />
      case 'debugging':
        return <DebuggingIcon />
      case 'fundamentals':
        return <GridIcon />
      case 'roadmap':
        return <CursorOutlinedIcon />
      default:
        return null
    }
  }, [icon])

  return (
    <Link
      passHref
      id={`sitemap-${id}-item`}
      className={clsx({
        [s.active as string]: active
      })}
      href={`#${id}`}
      ref={linkRef}
    >
      <div className={s.shortTitle} ref={shortTitleRef}>
        <div className={s.icon}>{renderIcon()}</div>
        <span>
          {shortTitle}
          {active && ':'}
        </span>
      </div>
      <div className={s.completeTitle} ref={completeTitleRef}>
        {completeTitle}
      </div>
    </Link>
  )
}
