import { RichText, RichTextProps } from '.basehub/react-rich-text'
import { fragmentOn } from '.basehub'
import { DescriptionRichText } from '.basehub/schema'

const PopoverFragment = fragmentOn('PopoverComponent', {
  _id: true,
  _title: true,
  body: { json: { content: true } }
})

const richTextFragment = fragmentOn('BodyRichText', {
  content: true,
  blocks: {
    __typename: true,
    on_PopoverComponent: PopoverFragment
  }
})

type RichTextFragment = fragmentOn.infer<typeof richTextFragment>

function Popover({ _title, body }: typeof PopoverFragment) {
  return (
    <div className="relative">
      <div className="mt-auto">
        <div className="max-w-[400px] text-base leading-7 text-gray-600">
          {_title}
          {/* <RichText>{body.json.content}</RichText> */}
        </div>
      </div>
    </div>
  )
}

export const Description = ({ description }: RichTextProps<RichTextFragment['blocks']>) => {
  return (
    <div className="dark:prose-dark prose max-w-none">
      <RichText
        blocks={description.json.blocks}
        components={{
          PopoverComponent: Popover,
          PopoverComponent_mark: Popover
        }}
      >
        {description.children}
      </RichText>
    </div>
  )
}
