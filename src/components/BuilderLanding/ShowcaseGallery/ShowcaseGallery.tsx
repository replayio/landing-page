'use client'

import { useRef, useEffect, useCallback, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import { Container } from '~/components/Container'
import { ReferenceAppCard } from './components/Card'
import { CategorySelector, type IntroSectionCategory } from './components/CategorySelector'
import { Collections } from './components/Collections'
import {
  getReferenceAppSummaries,
  type ReferenceAppSummary,
} from '~/lib/ReferenceApps'

export function ShowcaseGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>('All')
  const [showAll, setShowAll] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const searchParams = useSearchParams()
  const hasHandledAppPath = useRef(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 })
  const [referenceApps, setReferenceApps] = useState<ReferenceAppSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch reference apps on mount
  useEffect(() => {
    const loadReferenceApps = async () => {
      try {
        setIsLoading(true)
        const apps = await getReferenceAppSummaries()
        setReferenceApps(apps)
      } catch (error) {
        console.error('Failed to fetch reference apps:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadReferenceApps()
  }, [])

  // Handle appPath URL parameter - automatically open customize
  useEffect(() => {
    if (hasHandledAppPath.current || referenceApps.length === 0) {
      return
    }

    const appPathParam = searchParams.get('appPath')
    if (!appPathParam) {
      return
    }

    const matchingApp = referenceApps.find((app) => app.referenceAppPath === appPathParam)
    if (!matchingApp) {
      return
    }

    hasHandledAppPath.current = true
    window.open(`https://builder.replay.io/?appPath=${matchingApp.referenceAppPath}`, '_blank')
  }, [searchParams, referenceApps])

  // Filter apps by stage first (before calculating categories)
  const stageFilteredApps = useMemo(() => {
    if (showAll) {
      return referenceApps
    }
    return referenceApps.filter((app) => ['alpha', 'beta', 'release'].includes(app.stage))
  }, [referenceApps, showAll])

  const categories = useMemo(() => {
    const sectionCategories: IntroSectionCategory[] = []
    sectionCategories.push({ name: 'All', count: stageFilteredApps.length })
    for (const { tags } of stageFilteredApps) {
      for (const tag of tags) {
        const existing = sectionCategories.find((c) => c.name === tag)
        if (existing) {
          existing.count++
        } else {
          sectionCategories.push({ name: tag, count: 1 })
        }
      }
    }
    return sectionCategories
  }, [stageFilteredApps])

  const filteredApps = useMemo(() => {
    let apps = stageFilteredApps

    // Filter by category
    if (!selectedCategory) {
      return []
    }
    if (selectedCategory !== 'All') {
      apps = apps.filter((app) => app.tags.some((category) => category === selectedCategory))
    }

    // Filter by search term (case-insensitive match on app names)
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim()
      apps = apps.filter((app) => app.name.toLowerCase().includes(searchLower))
    }

    return apps
  }, [selectedCategory, stageFilteredApps, searchTerm])

  // Drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) {
      return
    }

    // Don't start dragging if clicking on a button, interactive element, or card
    const target = e.target as HTMLElement
    if (target.tagName === 'BUTTON' || target.closest('button') || target.closest('[data-card-clickable]')) {
      return
    }

    setIsDragging(true)
    dragStartRef.current = {
      x: e.pageX - scrollContainerRef.current.offsetLeft,
      scrollLeft: scrollContainerRef.current.scrollLeft,
    }

    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) {
      return
    }

    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - dragStartRef.current.x) * 1.5 // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = dragStartRef.current.scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  // Navigation functions for mobile arrows
  const scrollPrev = useCallback(() => {
    if (!scrollContainerRef.current) {
      return
    }
    const container = scrollContainerRef.current
    const slideWidth = container.clientWidth
    container.scrollBy({ left: -slideWidth, behavior: 'smooth' })
  }, [])

  const scrollNext = useCallback(() => {
    if (!scrollContainerRef.current) {
      return
    }
    const container = scrollContainerRef.current
    const slideWidth = container.clientWidth
    container.scrollBy({ left: slideWidth, behavior: 'smooth' })
  }, [])

  return (
    <section id="showcase-gallery" className="relative isolate overflow-hidden bg-gray-200 pb-16 pt-8 md:pb-24 md:pt-20">
      <Container className="relative">
        {/* Header */}
        <div className="max-w-4xl mb-12">
          <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
            Start with
            <br />
            <span className="text-accent">a fully working app</span>
          </h2>
          <p className="mt-4 max-w-3xl text-base text-gray-700 sm:text-lg">
            Ready to use out-of-the-box (but can be aligned to your needs)
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-accent rounded-full animate-spin" />
              <p className="text-gray-600">Loading apps...</p>
            </div>
          </div>
        ) : (
          <>
            <CategorySelector
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={(category) => setSelectedCategory(category)}
              showAll={showAll}
              onShowAllChange={setShowAll}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            {/* Horizontal scrolling card container */}
            {filteredApps.length > 0 && (
              <>
                <div
                  ref={scrollContainerRef}
                  className={clsx(
                    'overflow-x-auto pb-4 px-4 sm:px-6 mb-4 sm:mb-8 snap-x snap-mandatory',
                    isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
                  )}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                    scrollBehavior: isDragging ? 'auto' : 'smooth',
                  }}
                >
                  <div className="flex gap-4 sm:gap-6" style={{ minWidth: 'min-content' }}>
                    {filteredApps.map((app) => (
                      <div
                        key={app.name}
                        className="w-[calc(100vw-2rem)] sm:w-[520px] lg:w-[656px] flex-shrink-0 snap-start"
                      >
                        <ReferenceAppCard
                          appName={app.name}
                          description={app.shortDescription}
                          bulletPoints={app.bulletPoints}
                          stage={app.stage}
                          photo={app.screenshotURL}
                          appPath={app.referenceAppPath}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile navigation arrows */}
                <div className="flex items-center justify-between px-6 sm:hidden mb-8">
                  <button
                    type="button"
                    onClick={scrollPrev}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-accent active:scale-95 transition-transform hover:bg-gray-50"
                    aria-label="Previous app"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    type="button"
                    onClick={scrollNext}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-accent active:scale-95 transition-transform hover:bg-gray-50"
                    aria-label="Next app"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </>
            )}

            {/* Collections Section */}
            <Collections />
          </>
        )}
      </Container>
    </section>
  )
}

