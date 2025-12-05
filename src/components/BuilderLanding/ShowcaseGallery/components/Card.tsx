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
  const hasPhoto = !!app.photo
  const imageAlt = app.appName

  return (
    <div
      className={clsx(
        'group relative overflow-hidden w-full h-full rounded-lg border border-gray-200 shadow-lg transition-transform hover:scale-[1.02]',
        className
      )}
      style={{ aspectRatio: '16/9' }}
    >
      {/* Background Image or Coming Soon Placeholder */}
      <div className="absolute inset-0">
        {hasPhoto ? (
          <>
            <Image
              src={app.photo!}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </>
        ) : (
          <>
            {/* Coming Soon Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200" />
            {/* Coming Soon Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-gray-400">Coming Soon</div>
                <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-accent/50 to-transparent rounded-full" />
              </div>
            </div>
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </>
        )}
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-4 bg-white/20 backdrop-blur-md">
        <div className="flex flex-col items-start gap-4">
          {/* Title and Description */}
          <div className="flex flex-col gap-1">
            <h3
              className="text-lg font-bold leading-none text-black"
            >
              {app.appName}
            </h3>
            <p
              className="text-xs leading-normal text-black"
            >
              {app.description}
            </p>
          </div>

          {/* Badges */}
          {app.bulletPoints && app.bulletPoints.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {app.bulletPoints.map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center justify-center rounded-full border border-accent px-3 py-1.5 text-xs font-medium text-accent"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

