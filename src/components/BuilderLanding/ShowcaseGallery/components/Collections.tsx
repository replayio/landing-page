'use client'

import { useState, useEffect } from 'react'
import { getCollections, type CollectionPageIndexEntry } from '~/lib/ReferenceApps'

export function Collections() {
  const [collections, setCollections] = useState<CollectionPageIndexEntry[]>([])
  const [isLoadingCollections, setIsLoadingCollections] = useState(true)

  // Fetch collections on mount
  useEffect(() => {
    const loadCollections = async () => {
      try {
        setIsLoadingCollections(true)
        const collections = await getCollections()
        setCollections(collections)
      } catch (error) {
        console.error('Failed to fetch collections:', error)
      } finally {
        setIsLoadingCollections(false)
      }
    }
    loadCollections()
  }, [])

  if (collections.length === 0 && !isLoadingCollections) {
    return null
  }

  return (
    <div className="animate-fade-in mt-12">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Collections</h2>
        <p className="text-gray-600">Apps for different use cases</p>
      </div>

      {isLoadingCollections ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-accent" />
            <p className="text-sm text-gray-600">Loading collections...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <button
              key={collection.collectionPath}
              onClick={() => {
                // Navigate to collection page or handle click
                const encodedPath = encodeURIComponent(collection.name)
                window.open(`https://builder.replay.io/collection/${encodedPath}`, '_blank')
              }}
              className="group rounded-xl border border-gray-200 bg-white p-6 text-left transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
            >
              <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-accent">
                {collection.name}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">{collection.shortDescription}</p>
              <div className="mt-4 flex items-center text-accent opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-sm font-medium">View collection</span>
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
