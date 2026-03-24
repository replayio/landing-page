import Image from 'next/image'
import clsx from 'clsx'
import { ExternalLinkIcon } from '~/components/icons/externalLink'
import { REFERENCE_APP_PLACEHOLDER_PHOTO, type ReferenceAppStage } from '~/lib/ReferenceApps'
import { ReferenceAppStatusIndicator } from './ReferenceAppStatusIndicator'

export interface ReferenceAppCardProps {
  appName: string
  description: string
  bulletPoints?: string[]
  stage: ReferenceAppStage
  photo?: string
  appPath?: string
  className?: string
}

export function ReferenceAppCard({
  appName,
  description,
  photo,
  className,
  appPath,
  stage
}: ReferenceAppCardProps) {
  const displayPhoto = photo || REFERENCE_APP_PLACEHOLDER_PHOTO
  const imageAlt = appName || 'Reference App'

  const handleCustomize = () => {
    if (!appPath) return
    window.open(`https://builder.replay.io/?appPath=${appPath}`, '_blank')
  }

  const handleViewDetails = () => {
    const encodedName = encodeURIComponent(appName)
    window.open(`https://builder.replay.io/gallery/${encodedName}`, '_blank')
  }

  return (
    <div
      className={clsx(
        // Full-width, responsive card that keeps a 16:9 aspect ratio.
        // The height is driven by aspect-video so it scales with viewport on mobile.
        'group relative flex aspect-video w-full flex-col items-start justify-end gap-4 overflow-hidden rounded-xl border border-[var(--base-border,#E5E5E5)] p-3 transition-all duration-300 sm:p-4',
        className
      )}
    >
      {/* App Screenshot - Sharp, blurred on hover */}
      <Image
        src={displayPhoto}
        alt={imageAlt}
        fill
        className="object-cover object-top transition-all duration-300 group-hover:blur-[2px]"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
      />

      {/* Blurred image overlay - only at bottom (default state) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-300 group-hover:opacity-0">
        <Image
          src={displayPhoto}
          alt=""
          fill
          className="object-cover object-top blur-[2px]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          style={{
            maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 60%)'
          }}
        />
      </div>

      {/* Background gradient overlays - default state */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
        style={{
          background:
            'linear-gradient(156deg, rgba(255, 255, 255, 0.00) 44.15%, #FFF 95.01%), linear-gradient(236deg, rgba(255, 255, 255, 0.00) 26.51%, rgba(255, 255, 255, 0.60) 84.05%)'
        }}
      />

      {/* Hover state: Gradient overlay with white and pink/red gradients */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(156deg, rgba(255, 255, 255, 0.00) 44.15%, #FFF 95.01%), linear-gradient(236deg, rgba(0, 0, 0, 0.00) 26.51%, var(--tailwind-colors-slate-500, rgba(240, 45, 94, 0.50)) 84.05%)'
        }}
      />

      {/* Content Section - Positioned at bottom via flexbox, hidden on hover */}
      <div className="relative flex w-full flex-col gap-2 transition-opacity duration-300 group-hover:opacity-0 sm:gap-4">
        {/* Title */}
        <div className="flex flex-col gap-1 sm:gap-2">
          <h3
            className="text-base font-bold leading-none text-black sm:text-lg"
            style={{
              textShadow:
                'var(--shadow-sm-1-offset-x, 0) var(--shadow-sm-1-offset-y, 1px) var(--shadow-sm-1-blur-radius, 3px) var(--shadow-sm-1-color, rgba(0, 0, 0, 0.10)), var(--shadow-sm-2-offset-x, 0) var(--shadow-sm-2-offset-y, 1px) var(--shadow-sm-2-blur-radius, 2px) var(--shadow-sm-2-color, rgba(0, 0, 0, 0.10))'
            }}
          >
            {appName}
          </h3>

          {/* Description */}
          <p
            className="truncate text-[11px] font-normal leading-4 text-black sm:text-xs"
            style={{
              textShadow:
                'var(--shadow-sm-1-offset-x, 0) var(--shadow-sm-1-offset-y, 1px) var(--shadow-sm-1-blur-radius, 3px) var(--shadow-sm-1-color, rgba(0, 0, 0, 0.10)), var(--shadow-sm-2-offset-x, 0) var(--shadow-sm-2-offset-y, 1px) var(--shadow-sm-2-blur-radius, 2px) var(--shadow-sm-2-color, rgba(0, 0, 0, 0.10))'
            }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Hover state: Buttons - centered */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:gap-3">
        {/* Customize it button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleCustomize()
          }}
          className="pointer-events-auto whitespace-nowrap rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-accent-light sm:px-6 sm:py-3 sm:text-base"
        >
          Customize it
        </button>
        {/* View details button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleViewDetails()
          }}
          className="pointer-events-auto flex items-center gap-1.5 whitespace-nowrap rounded-full border border-gray-200 bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-white sm:gap-2 sm:px-5 sm:py-2.5 sm:text-base"
        >
          View details
          <ExternalLinkIcon width={14} height={14} className="flex-shrink-0 sm:h-4 sm:w-4" />
        </button>

        {/* Stage display */}
        <div className="pointer-events-auto">
          <ReferenceAppStatusIndicator stage={stage} size="sm" />
        </div>
      </div>
    </div>
  )
}
