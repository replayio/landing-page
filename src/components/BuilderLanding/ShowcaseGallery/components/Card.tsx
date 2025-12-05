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
        'group relative overflow-hidden rounded-2xl bg-black shadow-lg',
        className
      )}
      style={{ width: '100%', height: '370px' }}
    >
      <a href={`https://builder.replay.io/?focus=true&app=${app.appPath}`} target="_blank">
        {/* App Screenshot */}
        {hasPhoto ? (
          <Image
            src={app.photo!}
            alt={imageAlt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
            <span className="text-2xl font-medium text-slate-400">Coming Soon</span>
          </div>
        )}

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Content Section - Overlaid at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/60 backdrop-blur-sm">
          {/* Title */}
          <h3 className="text-xl font-bold text-black mb-1">{app.appName}</h3>

          {/* Description */}
          <p className="text-sm text-gray-900 leading-relaxed mb-4">{app.description}</p>

          {/* Feature Tags */}
          {app.bulletPoints && app.bulletPoints.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {app.bulletPoints.map((badge, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-sm font-medium text-accent bg-rose-100/80 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </a>
    </div>
  )
}

