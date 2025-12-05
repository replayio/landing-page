'use client'

import { useRef, useEffect, useCallback } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import { Carousel } from '~/components/common/carousel'
import { ReferenceAppCard, ReferenceAppCategory, ReferenceApp } from './components/Card'

export const referenceApps: ReferenceApp[] = [
  {
    appPath: 'management/IssueTracker',
    appName: 'Issue Tracker',
    description: 'Track and manage issues across your projects',
    bulletPoints: ['Triage System', 'Personal Inboxes', 'Email Notifications'],
    photo: 'https://utfs.io/f/g4w5SXU7E8KdqUWQBDviRZOVD8n3oL79Tegv1adIFGkcmQ6H',
    categories: [ReferenceAppCategory.Business, ReferenceAppCategory.Technical],
  },
  {
    appPath: 'management/DocumentManager',
    appName: 'Team Wiki',
    description: 'A shared knowledge base for your team',
    bulletPoints: ['Rich Text Documents', 'Kanban Boards and Tables', 'Comment System'],
    photo: 'https://utfs.io/f/g4w5SXU7E8Kd65diTnZrn27SvXDfJANF0dzKcZECW1mhuabT',
    categories: [ReferenceAppCategory.Business],
  },
  {
    appPath: 'observe/TelemetryBoard',
    appName: 'Telemetry Board',
    description: 'Listens to OpenTelemetry events and helps you monitor your systems',
    bulletPoints: ['Custom Boards', 'Saved Views', 'Editable Log Rendering'],
    photo: 'https://utfs.io/f/g4w5SXU7E8KdjK4IdOUektSnylW57BEZobPcKpDY4LHifIMz',
    categories: [ReferenceAppCategory.Technical],
  },
  {
    appPath: 'social/ScoreKeeper',
    appName: 'ScoreKeeper',
    description: "Keep track of everyone's scores when playing card and board games",
    bulletPoints: ['Round History', 'Game History'],
    photo: 'https://utfs.io/f/g4w5SXU7E8KdLdVubLoPsxJKqg3tOm8U6XBkfWzF1NvylbMC',
    categories: [ReferenceAppCategory.Personal],
  },
  {
    appPath: 'personal/Paperlane',
    appName: 'Paperlane',
    description: 'Clean and simple note taking app',
    bulletPoints: ['Rich Text'],
    photo: 'https://utfs.io/f/g4w5SXU7E8KdYlDrUI5pOy8T4MGez0Njgs2FS9nmWfxvoXib',
    categories: [ReferenceAppCategory.Personal],
  },
  {
    appPath: 'social/FamilyCarts',
    appName: 'Family Carts',
    description: 'Shared grocery lists for you and your family',
    bulletPoints: ['Per Store Lists'],
    photo: 'https://utfs.io/f/g4w5SXU7E8KdeWtx5KE1nQ39PNmwcYLluUfE5oeBy6F2pkSM',
    categories: [ReferenceAppCategory.Personal],
  },
  {
    appPath: 'management/SupportCRM',
    appName: 'Support CRM',
    description: 'Manage support tickets from your customers',
    bulletPoints: ['Email Notifications'],
    photo: 'https://utfs.io/f/g4w5SXU7E8KdfbHk8O1ureDlVQJGmHCq126KNU7B3RpWcTtE',
    categories: [ReferenceAppCategory.Business],
  },
  {
    appPath: 'social/CommunityIdeas',
    appName: 'Community Ideas',
    description: 'Collect ideas from your users on upcoming features',
    bulletPoints: ['Voting System', 'User Comments'],
    photo: 'https://utfs.io/f/g4w5SXU7E8Kd4gd56oTwYcWkB0HDfQ6qhVKvEnaUGMbL8owF',
    categories: [ReferenceAppCategory.Business],
  },
  {
    appPath: 'management/Invoicerator',
    appName: 'Invoicerator',
    description: 'Track time on different projects and generate invoices',
    bulletPoints: ['PDF Invoicing'],
    photo: 'https://utfs.io/f/g4w5SXU7E8Kdjs887pUektSnylW57BEZobPcKpDY4LHifIMz',
    categories: [ReferenceAppCategory.Business, ReferenceAppCategory.Personal],
  },
  /*
  {
    appName: 'StudyBuddy',
    description: 'Generate study materials for any topic',
    bulletPoints: ['PDF Imports', 'AI Generated Flash Cards'],
    categories: [ReferenceAppCategory.Personal],
  },
  */
];

export function ShowcaseGallery() {
  const carouselRef = useRef<EmblaCarouselType | undefined>(undefined)
  const carouselContainerRef = useRef<HTMLDivElement>(null)

  // Handle wheel events to scroll carousel horizontally with smooth scrolling
  const handleWheel = useCallback((e: WheelEvent) => {
    const embla = carouselRef.current
    if (!embla) return
    
    // Prevent default scroll behavior when over carousel
    e.preventDefault()
    
    // Use deltaX for horizontal scroll, deltaY for vertical scroll
    // Convert any scroll direction to horizontal carousel movement
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    
    // Use internal engine for smooth continuous scrolling
    // Adjust multiplier for scroll speed (lower = slower)
    const scrollSpeed = 0.4
    const engine = embla.internalEngine()
    engine.scrollBody.useDuration(0) // Disable animation for immediate response
    engine.scrollTo.distance(-delta * scrollSpeed, false)
  }, [])

  useEffect(() => {
    const container = carouselContainerRef.current
    if (!container) return

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  return (
    <section id="showcase-gallery" className="relative isolate overflow-hidden bg-white pb-16 pt-8 md:pb-24 md:pt-20">
      {/* Headline Section - contained */}
      <Container className="relative">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
            Don&apos;t want to
            <br />
            <span className="text-accent">start from scratch?</span>
          </h2>
          <p className="mt-4 max-w-3xl text-base text-gray-700 sm:text-lg">
            Start with one of these apps, and map it to your needs.
          </p>
        </div>
      </Container>

      {/* Carousel - full width but starts at container edge */}
      <div 
        ref={carouselContainerRef}
        className="mt-12 w-full mx-auto"
      >
        <Carousel
          ref={carouselRef}
          config={{
            align: 'start',
            slidesToScroll: 1,
            dragFree: true,
          }}
          className="p-6"
          slideClassName="!w-[480px] sm:!w-[520px] lg:!w-[580px] flex-shrink-0 rounded-xl"
          dots={false}
          arrows={false}
        >
          {referenceApps.map((app, index) => (
            <ReferenceAppCard key={`${app.appName}-${index}`} app={app} />
          ))}
        </Carousel>
      </div>

      {/* CTA Button - contained */}
      <Container>
        <div className="mt-12 flex justify-center">
          <Button
            variant="solid"
            color="default"
            size="base"
            className="px-8"
            href="https://builder.replay.io/?focus=true"
            target="_blank"
          >
            Start Building
          </Button>
        </div>
      </Container>
    </section>
  )
}

