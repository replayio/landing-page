import { RichText } from '.basehub/react-rich-text'
import * as Tooltip from '@radix-ui/react-tooltip'
import Link from 'next/link'
import { LinkFragment, PopoverFragment, DescriptionFragment } from '~/lib/basehub-queries'

export const DescriptionTooltip = ({
  children,
  body,
  learnMore
}: {
  learnMore: LinkFragment | null
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
            className={`borderPrimaryAccent max-w-80 select-none rounded-[4px] border-t-4 border-blue-300 bg-slate-900 px-[15px] py-[10px] text-[15px] text-sm leading-relaxed text-slate-100/75 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade`}
            sideOffset={0}
            alignOffset={0}
            align="start"
          >
            <div className="flex flex-col">
              <p>{body}</p>
              {learnMore && (
                <div className="mt-2">
                  <Link
                    className="font-semibold text-slate-100/90 hover:text-slate-100 "
                    href={learnMore.href}
                  >
                    {learnMore.label}
                  </Link>
                </div>
              )}
            </div>

            <Tooltip.Arrow className="fill-slate-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

function Popover(props: PopoverFragment) {
  return (
    <span className="relative">
      <DescriptionTooltip body={props.body || ''} learnMore={props.learnMore}>
        <span className="relative font-semibold hover:cursor-pointer hover:text-white/85 ">
          {props._title}
        </span>
      </DescriptionTooltip>
    </span>
  )
}

export const Description = (props: DescriptionFragment) => {
  return (
    <div className="relative">
      <RichText
        blocks={props.blocks}
        components={{
          // @ts-ignore
          PopoverComponent_mark: Popover,
          a: ({ children, href }: { children: React.ReactNode; href: string }) => (
            <a href={href} className="underline">
              {children}
            </a>
          )
        }}
      >
        {props.content}
      </RichText>
    </div>
  )
}
