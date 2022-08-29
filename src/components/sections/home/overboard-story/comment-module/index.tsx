import clsx from 'clsx'
import Image, { ImageProps } from 'next/future/image'
import { FC } from 'react'

import s from './comment-module.module.scss'

export type CommentModuleProps = {
  side?: 'bottom-right' | 'side-left'
  comments: {
    text: string
    avatar: ImageProps['src']
    name: string
    date: string
  }[]
}

export const CommentModule: FC<CommentModuleProps> = ({
  comments,
  side = 'left'
}) => {
  const mainComment = comments[0]

  return (
    <div className={s['container']}>
      <svg
        className={clsx('comment-icon', s['comment-icon'])}
        width="100%"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="22" cy="22" r="18" fill="var(--color-pink-crayon)" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.0054 32.4325C18.5546 32.8438 18.2567 33 17.8864 33C17.347 33 17.0251 32.6216 17.0251 32.0211V29.6599H16.8077C14.61 29.6599 13 28.1134 13 25.6125V19.0476C13 16.5466 14.5054 15 16.9606 15H27.0313C29.4945 15 31 16.5548 31 19.0476V25.6125C31 28.1052 29.4945 29.6684 27.0313 29.6599H22.0724L19.0054 32.4325ZM18 23C18.5523 23 19 22.5523 19 22C19 21.4477 18.5523 21 18 21C17.4477 21 17 21.4477 17 22C17 22.5523 17.4477 23 18 23ZM22 23C22.5523 23 23 22.5523 23 22C23 21.4477 22.5523 21 22 21C21.4477 21 21 21.4477 21 22C21 22.5523 21.4477 23 22 23ZM27 22C27 22.5523 26.5523 23 26 23C25.4477 23 25 22.5523 25 22C25 21.4477 25.4477 21 26 21C26.5523 21 27 21.4477 27 22Z"
          fill="white"
        />
      </svg>

      <div className={clsx('comment', s['comment'], s[side])}>
        <div className={s['thread']}>
          {comments.map((comment, idx) => (
            <div className={clsx('content', s['content'])} key={idx}>
              <div className={s['content-inner']}>
                <div className={s['header']}>
                  <Image className={s['picture']} src={comment.avatar} />
                  <div>
                    <p className={s['name']}>{comment.name}</p>
                    <p className={s['date']}>{comment.date}</p>
                  </div>
                </div>
                <p className={s['text']}>{comment.text}</p>
              </div>
              <div className={s['divisor']} />
            </div>
          ))}
        </div>

        <div
          data-text={mainComment.text}
          data-placeholder="Type a comment..."
          className={clsx('input', s['input'])}
        >
          Type a comment...
        </div>
      </div>
    </div>
  )
}
