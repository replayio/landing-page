import { TooltipProvider } from '@radix-ui/react-tooltip';
import clsx from 'clsx'
import WithTooltip from '~/components/ui/Tooltip'

export interface PricingFeature {
  name: string
  included: boolean
  tooltip?: string
}

export interface PricingCardProps {
  title: string
  description: string
  price: string
  pricePeriod?: string
  features: PricingFeature[]
  emphasized?: boolean
  className?: string
  featuresLabel?: string
}

// Checkmark icon
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.6667 5L7.50001 14.1667L3.33334 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// X icon
const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 5L5 15M5 5L15 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Info icon
const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="5" r="0.75" fill="currentColor" />
  </svg>
)

export function PricingCard({
  title,
  description,
  price,
  pricePeriod = '/month',
  features,
  emphasized = false,
  className,
  featuresLabel,
}: PricingCardProps) {
  return (
    <div
      className={clsx(
        'relative flex flex-col rounded-xl border bg-gray-50 p-6',
        'w-full max-w-[320px] md:w-[320px]',
        {
          'border-gray-300 shadow-xl z-10': emphasized,
          'border-gray-200 shadow-sm': !emphasized,
        },
        className
      )}
    >
      {/* Header */}
      <div className="mb-4">
        <h3
          className={clsx('text-xl font-bold mb-1', {
            'text-accent': emphasized,
            'text-gray-900': !emphasized,
          })}
        >
          {title}
        </h3>
        <p className="text-sm text-gray-600 leading-snug">{description}</p>
      </div>

      {/* Price */}
      <div className="mb-4">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        {pricePeriod && (
          <span className={clsx('text-sm ml-0.5', emphasized ? 'text-accent' : 'text-accent')}>
            {pricePeriod}
          </span>
        )}
      </div>

      {/* Features */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          {featuresLabel || "What's included:"}
        </h4>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex-shrink-0">
                {feature.included ? (
                  <CheckIcon className="text-accent" />
                ) : (
                  <XIcon className="text-accent" />
                )}
              </div>
              <span
                className={clsx('flex-1 text-sm', {
                  'text-gray-900': feature.included,
                  'text-gray-400': !feature.included,
                })}
              >
                {feature.name}
              </span>
              {feature.tooltip && (
                <TooltipProvider>
                  <WithTooltip tooltip={feature.tooltip}>
                    <InfoIcon className="text-gray-400 hover:text-gray-600 transition-colors" />
                  </WithTooltip>
                </TooltipProvider>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
