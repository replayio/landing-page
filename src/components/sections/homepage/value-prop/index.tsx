import { RichText, RichTextProps } from 'basehub/react'
import Link from 'next/link'
import React from 'react'

import { TitleAndSubtitle } from '~/components/primitives/texts'

import s from './value-prop.module.scss'

type ValuePropItem = {
  key: string
  title: string
  content: unknown
}

const ValueProp = ({
  title,
  subtitle,
  items
}: {
  title: string
  subtitle: unknown
  items: Array<ValuePropItem>
}) => {
  return (
    <div className={s.componentWrapper}>
      <div className={s.timeTravelHero}>
        <TitleAndSubtitle
          title={{
            as: 'h2',
            children: title,
            className: s.timeTravelHero
          }}
          subtitle={{
            children: (
              <ValuePropSubtitleRenderer>{subtitle}</ValuePropSubtitleRenderer>
            )
          }}
        />
      </div>

      <div className={s.columns}>
        {items.map((item, index) => (
          <React.Fragment key={item.key}>
            <div className={s.valueProp}>
              <TitleAndSubtitle
                title={{
                  as: 'h2',
                  children: item.title,
                  className: s.header
                }}
                subtitle={{
                  children: (
                    <ValuePropSubtitleRenderer>
                      {item.content}
                    </ValuePropSubtitleRenderer>
                  )
                }}
              />
            </div>
            {index === 1 && <hr className={s.divider} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const ValuePropSubtitleRenderer = ({
  children
}: {
  children: RichTextProps['children']
}) => {
  return (
    <RichText
      components={{
        p: (props) => (
          <span className={s.timeTravelText}>{props.children}</span>
        ),
        a: (props) => (
          <Link
            {...props}
            style={{
              textAlign: 'center',
              marginTop: '10px',
              color: '#9ca3af',
              textDecoration: 'underline'
            }}
          />
        )
      }}
    >
      {children}
    </RichText>
  )
}

export default ValueProp
