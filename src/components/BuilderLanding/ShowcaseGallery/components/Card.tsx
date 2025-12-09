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
        'group relative overflow-hidden rounded-lg flex flex-col justify-end items-start gap-4 p-4 border block w-full h-[369px] aspect-video border-[var(--base-border,#E5E5E5)] transition-all duration-300',
        className
      )}
    >
      {/* App Screenshot - Sharp, blurred on hover */}
      <Image
        src={app.photo!}
        alt={imageAlt}
        fill
        className="object-cover object-top group-hover:blur-[2px] transition-all duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
      />

      {/* Blurred image overlay - only at bottom (default state) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
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

      {/* Background gradient overlays - default state */}
      <div
        className="absolute inset-0 pointer-events-none group-hover:opacity-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(156deg, rgba(255, 255, 255, 0.00) 44.15%, #FFF 95.01%), linear-gradient(236deg, rgba(255, 255, 255, 0.00) 26.51%, rgba(255, 255, 255, 0.60) 84.05%)',
        }}
      />

      {/* Hover state: Gradient overlay with white and pink/red gradients */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(156deg, rgba(255, 255, 255, 0.00) 44.15%, #FFF 95.01%), linear-gradient(236deg, rgba(0, 0, 0, 0.00) 26.51%, var(--tailwind-colors-slate-500, rgba(240, 45, 94, 0.50)) 84.05%)',
        }}
      />

      {/* Content Section - Positioned at bottom via flexbox, hidden on hover */}
      <div className="flex flex-col relative w-full gap-4 group-hover:opacity-0 transition-opacity duration-300">
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

      {/* Hover state: Buttons - centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
        {/* Customize it button */}
        <button onClick={() => window.open(`https://builder.replay.io/?appPath=${app.appPath}`, '_blank')} className="px-6 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent-light transition-colors duration-200 whitespace-nowrap">
          Customize it
        </button>
      </div>
    </div>
  )
}

