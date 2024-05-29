'use client'

import React from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'
import Link from 'next/link'

export const PricingTooltip = ({
  children,
  body,
  learnMore,
  highlighted
}: {
  learnMore?: string
  body: string
  children: React.ReactNode
  highlighted?: boolean
}) => {
  if (!body) return children
  const tooltipClassName = highlighted
    ? 'bg-indigo-500 border-indigo-200'
    : 'border-slate-500 bg-slate-800'
  const tooltipArrowClassName = highlighted ? 'fill-indigo-800' : 'fill-slate-800'
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={`${tooltipClassName} borderPrimaryAccent max-w-64 select-none rounded-[4px] border-t-4   px-[15px] py-[10px] text-[15px] text-sm leading-relaxed text-slate-100 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade`}
            sideOffset={0}
            alignOffset={0}
            align="start"
          >
            <div className="flex flex-col">
              <p>{body}</p>
              {learnMore && (
                <div className="mt-2">
                  <Link className="text-slate-200 underline" href={learnMore}>
                    Learn more
                  </Link>
                </div>
              )}
            </div>

            <Tooltip.Arrow className={tooltipArrowClassName} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
