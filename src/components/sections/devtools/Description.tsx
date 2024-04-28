import react from 'react'
import { RichText, RichTextProps } from '.basehub/react-rich-text'
import { fragmentOn } from '.basehub'
import * as Tooltip from '@radix-ui/react-tooltip'
import Link from 'next/link'

export const DescriptionTooltip = ({
  children,
  body,
  learnMore
}: {
  learnMore: string | null
  body: string
  children: React.ReactNode
}) => {
  if (!body) return children
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={`borderPrimaryAccent max-w-64 select-none rounded-[4px] border-t-4 border-yellow-500 bg-slate-800 px-[15px] py-[10px] text-[15px] text-sm leading-relaxed text-slate-100 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade`}
            sideOffset={0}
            alignOffset={0}
            align="start"
          >
            <div className="flex flex-col">
              <p>{body}</p>
              {learnMore && (
                <div className="mt-2">
                  <Link className="text-yellow-200 underline" href={learnMore}>
                    Learn more
                  </Link>
                </div>
              )}
            </div>

            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

const popoverFragment = fragmentOn('PopoverComponent', {
  _id: true,
  _title: true,
  label: true,
  body: true,
  learnMore: true
})

type PopoverFragment = fragmentOn.infer<typeof popoverFragment>

function Popover(props: PopoverFragment) {
  return (
    <span className="relative">
      <DescriptionTooltip body={props.body || ''} learnMore={props.learnMore}>
        <span className="relative font-semibold hover:cursor-pointer hover:text-white ">
          {props.label}
        </span>
      </DescriptionTooltip>
    </span>
  )
}

export const bodyFragment = fragmentOn('DescriptionRichText', {
  content: true,
  toc: true,
  blocks: {
    __typename: true,
    on_PopoverComponent: popoverFragment
  }
})

type BodyFragment = fragmentOn.infer<typeof bodyFragment>

export const Description = (props: RichTextProps<BodyFragment['blocks']>) => {
  return (
    <div className="relative">
      <RichText
        blocks={props.blocks}
        components={{
          PopoverComponent: Popover,
          PopoverComponent_mark: Popover
        }}
      >
        {props.children}
      </RichText>
    </div>
  )
}
