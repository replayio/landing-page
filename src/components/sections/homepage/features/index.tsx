import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { ArrowIcon } from '~/components/icons'
import ChevronIcon from '~/components/icons/chevron'
import { Section } from '~/components/layout/section'
import { NavLink } from '~/components/primitives/nav-link'
import { TitleAndSubtitle } from '~/components/primitives/texts'
import { useTabletLgBreakpoint } from '~/hooks/use-media'

import s from './features.module.scss'

export const Features = () => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>(
    data[0]?.id || 'reporting-label'
  )
  const [emblaRef, embla] = useEmblaCarousel({ align: 'center' })
  const isTablet = useTabletLgBreakpoint()
  const activeBarRef = useRef<HTMLDivElement>(null)

  const scrollTo = useCallback(
    (index: number) => embla && embla.scrollTo(index),
    [embla]
  )

  useEffect(() => {
    if (!activeBarRef.current) return

    const findFeature = data.find((item) => item.id === selectedFeatureId)
    const findFeatureIndex = data.findIndex(
      (item) => item.id === selectedFeatureId
    )

    if (!findFeature) return

    const findLabelElement: any = document.querySelector(`#${findFeature.id}`)
    const labelElementComputedStyle = getComputedStyle(findLabelElement)

    const labelElementWithoutPadding =
      findLabelElement.clientWidth -
      parseFloat(labelElementComputedStyle.paddingRight) -
      parseFloat(labelElementComputedStyle.paddingLeft)

    activeBarRef.current.style.width = `${labelElementWithoutPadding}px`

    if (findFeatureIndex === 0) {
      activeBarRef.current.style.left = `${findLabelElement.offsetLeft}px`
    } else {
      activeBarRef.current.style.left = `${
        findLabelElement.offsetLeft +
        parseFloat(labelElementComputedStyle.paddingLeft)
      }px`
    }

    if (isTablet) {
      scrollTo(findFeatureIndex)
    }
  }, [selectedFeatureId, isTablet, scrollTo])

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedFeatureId(data[embla.selectedScrollSnap()]?.id as string)
  }, [embla])

  useEffect(() => {
    if (!embla || !isTablet) return
    onSelect()
    embla.on('select', onSelect)
  }, [embla, onSelect, isTablet])

  useEffect(() => {
    if (isTablet) {
      embla?.reInit()
    } else if (!isTablet) {
      embla?.destroy()
    }
  }, [isTablet, embla])

  return (
    <Section id="homepage-features" className={s.section}>
      <div className={s.container}>
        <TitleAndSubtitle
          className={s.titleAndSubtitle}
          title={{
            as: 'h2',
            children: 'Enterprise grade'
          }}
          subtitle={{
            children: (
              <span>
                Designed with enterprise grade security, reliability, and
                privacy controls from the start because earning your trust is
                our top priority.
              </span>
            )
          }}
        />

        <div className={s.filterWrapper}>
          <div className={s.activeBar} ref={activeBarRef} />

          <div className={s.labelsWrapper}>
            {data.map((item) => (
              <button
                key={item.id}
                id={item.id}
                type="button"
                aria-label={item.label}
                onClick={() => setSelectedFeatureId(item.id)}
                className={clsx({
                  [s.active as string]: item.id === selectedFeatureId
                })}
              >
                {item.label}
              </button>
            ))}
          </div>

          {!isTablet && (
            <Arrows
              selectedFeatureId={selectedFeatureId}
              handleSelctedFeature={(id) => setSelectedFeatureId(id)}
            />
          )}
        </div>

        <div className={s.embla} ref={emblaRef}>
          <div className={s.emblaContainer}>
            {data.map((item) => (
              <div className={s.emblaSlide} key={item.id}>
                <div
                  className={clsx(s.card, {
                    [s.active as string]: item.id === selectedFeatureId
                  })}
                  onClick={() => {
                    if (item.id !== selectedFeatureId) {
                      setSelectedFeatureId(item.id)
                    }
                  }}
                >
                  <Image
                    src={item.asset.url}
                    width={40}
                    height={40}
                    alt={item.label}
                  />
                  <div>
                    <p className={s.title}>{item.title}</p>
                    <p className={s.description}>{item.description}</p>

                    <CardLink
                      item={item}
                      disabled={item.id !== selectedFeatureId}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isTablet && (
            <Arrows
              selectedFeatureId={selectedFeatureId}
              handleSelctedFeature={(id) => setSelectedFeatureId(id)}
            />
          )}
        </div>
      </div>
    </Section>
  )
}

const CardLink = ({
  item,
  disabled
}: {
  item: DataType
  disabled: boolean
}) => {
  return (
    <NavLink
      invertedHover
      href={item.cta.href}
      aria-label={item.cta.label}
      aria-disabled={disabled}
      disabled={disabled}
    >
      {item.cta.label}
      <ArrowIcon />
    </NavLink>
  )
}

const Arrows = ({
  selectedFeatureId,
  handleSelctedFeature
}: {
  selectedFeatureId: string
  handleSelctedFeature: (id: string) => void
}) => {
  return (
    <div className={s.arrowsWrapper}>
      <button
        type="button"
        aria-label="Previous feature"
        disabled={selectedFeatureId === data[0]?.id}
        onClick={() => {
          const findFeatureIndex: number = data.findIndex(
            (item) => item.id === selectedFeatureId
          )

          if (data[findFeatureIndex - 1]) {
            handleSelctedFeature(data[findFeatureIndex - 1]?.id as string)
          }
        }}
      >
        <ChevronIcon />
      </button>
      <button
        type="button"
        aria-label="Next feature"
        disabled={selectedFeatureId === data[data.length - 1]?.id}
        onClick={() => {
          const findFeatureIndex: number = data.findIndex(
            (item) => item.id === selectedFeatureId
          )

          if (data[findFeatureIndex + 1] !== undefined) {
            handleSelctedFeature(data[findFeatureIndex + 1]?.id as string)
          }
        }}
      >
        <ChevronIcon />
      </button>
    </div>
  )
}

type DataType = {
  id: string
  label: string
  title: React.ReactNode
  description: React.ReactNode
  cta: {
    label: string
    href: string
  }
  asset: {
    url: string
  }
}

const data: DataType[] = [
  {
    id: 'reporting-label',
    label: 'Reporting',
    title: 'SOC2 Type II reporting',
    description: (
      <>
        Replay.io continuously monitors and reports primarily using System and
        Organization Controls (SOC) 2 Type&nbsp;2.
      </>
    ),
    cta: {
      label: 'Learn more',
      href: '/security-and-privacy#compliance'
    },
    asset: {
      url: '/images/homepage/features/reporting.png'
    }
  },
  {
    id: 'encryptions-label',
    label: 'Encryptions',
    title: <>Encryption in transit and at&nbsp;rest</>,
    description:
      'Replay.io databases and their client communications are AES encrypted throughout the PlanetScale platform.',
    cta: {
      label: 'Learn more',
      href: '/security-and-privacy#encryption'
    },
    asset: {
      url: '/images/homepage/features/encryptions.svg'
    }
  },
  {
    id: 'saml-label',
    label: 'SAML/SSO',
    title: 'SAML / SSO',
    description:
      'Replay.io supports single sign-on via Google SAML 2.0, Multi Factor Authentication, and automated account provisioning.',
    cta: {
      label: 'Learn more',
      href: '/security-and-privacy#authentication'
    },
    asset: {
      url: '/images/homepage/features/saml.svg'
    }
  }
]
