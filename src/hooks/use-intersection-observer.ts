import * as React from 'react'

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverInit & {
    triggerOnce?: boolean
    target?: T
  }
): [React.MutableRefObject<T | null>, { inView: boolean }] {
  const ref = React.useRef(options.target || null)
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const elementToObserve = ref.current
    if (!elementToObserve) return
    const handleObserve: IntersectionObserverCallback = ([element]) => {
      if (element) {
        setInView((p) => {
          // trigger once?
          if (options.triggerOnce && p === true) return p
          else return element.isIntersecting
        })
      }
    }

    const observer = new IntersectionObserver(handleObserve, options)

    observer.observe(elementToObserve)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return [ref, { inView }]
}
