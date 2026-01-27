'use client'

import { useState, useEffect } from 'react'
import { getCollections, type CollectionPageIndexEntry } from '~/lib/ReferenceApps'

export function Collections() {
  const [collections, setCollections] = useState<CollectionPageIndexEntry[]>([])
  const [isLoadingCollections, setIsLoadingCollections] = useState(true)

  console.log('collections', collections);

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
    <div className="mt-12 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Collections</h2>
        <p className="text-gray-600">Apps for different use cases</p>
      </div>

      {isLoadingCollections ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-accent rounded-full animate-spin" />
            <p className="text-gray-600 text-sm">Loading collections...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {collections.map((collection) => (
            <button
              key={collection.collectionPath}
              onClick={() => {
                // Navigate to collection page or handle click
                const encodedPath = encodeURIComponent(collection.name)
                window.open(`https://builder.replay.io/collection/${encodedPath}`, '_blank')
              }}
              className="group text-left bg-white rounded-xl p-6 border border-gray-200 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-accent transition-colors">
                {collection.name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{collection.shortDescription}</p>
              <div className="mt-4 flex items-center text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium">View collection</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
