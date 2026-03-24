import * as Tooltip from '@radix-ui/react-tooltip'
import { forwardRef, type ForwardedRef, type ReactElement } from 'react'

interface TooltipProps {
  tooltip: React.ReactNode
  children: ReactElement
  sideOffset?: number
  className?: string
  arrowClassName?: string
  tooltipStyle?: React.CSSProperties
  position?: 'top' | 'bottom' | 'left' | 'right'
  maxWidth?: number
  delay?: number
  forceOpen?: boolean
}

const WithTooltip = forwardRef(
  (
    {
      tooltip,
      children,
      sideOffset = 5,
      className = '',
      arrowClassName = '',
      tooltipStyle = {},
      position = 'top',
      maxWidth = 250,
      delay = 0,
      forceOpen = false
    }: TooltipProps,
    _ref: ForwardedRef<HTMLElement>
  ) => {
    return (
      <Tooltip.Root delayDuration={delay} open={forceOpen ? true : undefined}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={position}
            className={`
              bg-bolt-elements-background-depth-3
              text-bolt-elements-textPrimary
              z-[2000]
              max-h-[300px]
              select-none
              rounded-md
              px-2.5
              py-1.5
              text-sm
              leading-tight
              shadow-lg
              animate-in
              fade-in-0
              zoom-in-95
              data-[state=closed]:animate-out
              data-[state=closed]:fade-out-0
              data-[state=closed]:zoom-out-95
              ${className}
            `}
            sideOffset={sideOffset}
            style={{
              maxWidth,
              ...tooltipStyle
            }}
          >
            <div className="break-words">{tooltip}</div>
            <Tooltip.Arrow
              className={`
                fill-bolt-elements-background-depth-3
                ${arrowClassName}
              `}
              width={12}
              height={6}
            />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    )
  }
)

WithTooltip.displayName = 'WithTooltip'

export default WithTooltip
