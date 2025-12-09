import Image from 'next/image'
import clsx from 'clsx'

export enum ReferenceAppCategory {
  Business = 'Business',
  Technical = 'Technical',
  Personal = 'Personal',
}

export interface ReferenceApp {
  appPath?: string
  appName: string
  description: string
  bulletPoints?: string[]
  photo?: string
  categories: ReferenceAppCategory[]
}

export interface ReferenceAppCardProps {
  app: ReferenceApp
  className?: string
}

export function ReferenceAppCard({ app, className }: ReferenceAppCardProps) {
  const imageAlt = app.appName

  return (
    <div
      className={clsx(
        'group relative overflow-hidden rounded-lg flex flex-col justify-end items-start gap-4 p-4 border block w-full h-[369px] aspect-video border-[var(--base-border,#E5E5E5)]',
        className
      )}
    >
      {/* App Screenshot - Sharp */}
      <Image
        src={app.photo!}
        alt={imageAlt}
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
      />

      {/* Blurred image overlay - only at bottom */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src={app.photo!}
          alt=""
          fill
          className="object-cover object-top blur-[2px]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          style={{
            maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 60%)',
          }}
        />
      </div>

      {/* Background gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(156deg, rgba(255, 255, 255, 0.00) 44.15%, #FFF 95.01%), linear-gradient(236deg, rgba(255, 255, 255, 0.00) 26.51%, rgba(255, 255, 255, 0.60) 84.05%)',
        }}
      />

      {/* Gradient overlay for text readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" /> */}

      {/* Content Section - Positioned at bottom via flexbox */}
      <div className="flex flex-col relative w-full gap-4">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <h3
            className="text-lg font-bold leading-none text-base"
            style={{
              textShadow: 'var(--shadow-sm-1-offset-x, 0) var(--shadow-sm-1-offset-y, 1px) var(--shadow-sm-1-blur-radius, 3px) var(--shadow-sm-1-color, rgba(0, 0, 0, 0.10)), var(--shadow-sm-2-offset-x, 0) var(--shadow-sm-2-offset-y, 1px) var(--shadow-sm-2-blur-radius, 2px) var(--shadow-sm-2-color, rgba(0, 0, 0, 0.10))',
            }}
          >
            {app.appName}
          </h3>

          {/* Description */}
          <p
            className="text-xs font-normal leading-4 text-base"
            style={{
              textShadow: 'var(--shadow-sm-1-offset-x, 0) var(--shadow-sm-1-offset-y, 1px) var(--shadow-sm-1-blur-radius, 3px) var(--shadow-sm-1-color, rgba(0, 0, 0, 0.10)), var(--shadow-sm-2-offset-x, 0) var(--shadow-sm-2-offset-y, 1px) var(--shadow-sm-2-blur-radius, 2px) var(--shadow-sm-2-color, rgba(0, 0, 0, 0.10))',
            }}
          >
            {app.description}
          </p>
        </div>

        {/* Feature Tags */}
        {app.bulletPoints && app.bulletPoints.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {app.bulletPoints.map((badge, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-sm font-medium bg-white text-accent rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

