'use client'

import Image from 'next/image'
import { LandingPageFragment } from '~/lib/basehub-queries'
import { Title } from '../primitives/texts'
import { Button } from '../Button'
import { Container } from '../Container'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from 'lucide-react'
import { clsx } from 'clsx'
import { padZeroes } from '~/lib/utils'
import { RichText } from 'basehub/react-rich-text'

type VideoType = {
  href: string
  title: string
  duration: string
}

function Video({ video }: { video: VideoType }) {
  return (
    <a href={video.href} className="group" target="_blank" rel="noopener noreferrer">
      <div className="flex justify-between border-b border-gray-200 p-2 pl-0 ">
        <div className="flex items-center  text-gray-800">
          <p className="group-hover:underline">{video.title}</p>
        </div>
        <span className="text-gray-400">{video.duration}</span>
      </div>
    </a>
  )
}

type PostType = {
  title: string
  imageUrl: string
  href: string
}

function Post({ post }: { post: PostType }) {
  return (
    <article
      key={post.title}
      className="relative isolate flex flex-col overflow-hidden rounded-lg bg-white px-6 pt-64 sm:pt-32 lg:pt-64"
    >
      <Image
        fill={true}
        src={post.imageUrl}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 rounded-lg ring-1 ring-inset ring-gray-900/10" />
      <div className="flex-1 rounded">
        <h3 className="mb-6 text-2xl font-bold leading-6 text-white">
          <p className="group-hover:underline">{post.title}</p>
        </h3>
      </div>
    </article>
  )
}

export function Content({ content }: LandingPageFragment) {
  return (
    <section className="border-t border-slate-300 bg-[#F8F8F8] pb-[74px] pt-24 lg:pb-[234px]">
      <Container className="!max-w-5xl lg:!px-0">
        <Title as="h2" className="text-center">
          {content.title}
        </Title>

        <div className="mt-8 lg:mt-20">
          <div className="text-center text-lg lg:text-2xl [&_a]:font-bold [&_a]:underline">
            <RichText>{content.subTitle.json.content}</RichText>
          </div>

          <div className="mt-6 overflow-hidden rounded-[20px] shadow-[0px_2px_18px_0px_rgba(5,73,30,0.08)]">
            <div className="bg-[url('/images/course-bg-mobile.png')] bg-cover p-5 lg:flex lg:justify-between lg:gap-[76px] lg:bg-[url('/images/course-bg-desktop.png')]">
              <div>
                <Title as="h3" white className="flex items-center gap-x-2 lg:text-3xl">
                  <svg
                    width="20"
                    height="23"
                    viewBox="0 0 20 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.95486 4.50096L5.26658 2.32232L1.57826 0.143683C1.4183 0.049278 1.23688 -0.000401791 1.05221 -0.000366192C0.86754 -0.000330592 0.68613 0.0494189 0.526203 0.143885C0.366275 0.238351 0.233461 0.374209 0.141097 0.537811C0.0487322 0.701414 6.96327e-05 0.887001 0 1.07593V9.7904C6.2098e-05 9.97933 0.0487196 10.1649 0.141081 10.3285C0.233442 10.4921 0.366256 10.628 0.526184 10.7225C0.686113 10.817 0.867526 10.8667 1.0522 10.8667C1.23687 10.8668 1.4183 10.8171 1.57826 10.7227L5.26658 8.54405L8.95486 6.36546C9.11481 6.27099 9.24765 6.1351 9.34 5.97145C9.43235 5.80781 9.48097 5.62217 9.48097 5.43321C9.48097 5.24425 9.43235 5.05861 9.34 4.89497C9.24765 4.73132 9.11481 4.59543 8.95486 4.50096Z"
                      fill="white"
                    />
                    <path
                      d="M8.95485 16.6364L5.26658 14.4578L1.57826 12.2792C1.4183 12.1848 1.23687 12.1351 1.0522 12.1351C0.867524 12.1352 0.686113 12.1849 0.526184 12.2794C0.366255 12.3739 0.23344 12.5097 0.141078 12.6733C0.0487169 12.8369 6.2098e-05 13.0225 0 13.2115V21.9259C6.2098e-05 22.1148 0.0487169 22.3004 0.141078 22.464C0.23344 22.6276 0.366255 22.7635 0.526184 22.858C0.686113 22.9524 0.867524 23.0022 1.0522 23.0022C1.23687 23.0023 1.4183 22.9526 1.57826 22.8582L5.26658 20.6796L8.95485 18.501C9.11482 18.4065 9.24766 18.2706 9.34002 18.1069C9.43238 17.9433 9.48101 17.7577 9.48101 17.5687C9.48101 17.3797 9.43238 17.1941 9.34002 17.0304C9.24766 16.8668 9.11482 16.7309 8.95485 16.6364Z"
                      fill="white"
                    />
                    <path
                      d="M19.4724 10.5706L15.7842 8.39198L12.0958 6.21338C11.9359 6.11898 11.7545 6.0693 11.5698 6.06934C11.3851 6.06937 11.2037 6.11912 11.0438 6.21359C10.8839 6.30805 10.751 6.44391 10.6587 6.60751C10.5663 6.77112 10.5176 6.9567 10.5176 7.14564V15.8601C10.5176 16.049 10.5663 16.2346 10.6587 16.3982C10.751 16.5618 10.8839 16.6977 11.0438 16.7922C11.2037 16.8866 11.3851 16.9364 11.5698 16.9364C11.7545 16.9364 11.9359 16.8868 12.0958 16.7924L15.7842 14.6138L19.4724 12.4351C19.6324 12.3406 19.7652 12.2048 19.8576 12.0411C19.9499 11.8775 19.9986 11.6918 19.9986 11.5029C19.9986 11.3139 19.9499 11.1283 19.8576 10.9646C19.7652 10.801 19.6324 10.6651 19.4724 10.5706Z"
                      fill="white"
                    />
                  </svg>
                  {content.course.title}
                </Title>
                <p className="mt-3 max-w-[534px] text-sm leading-normal text-[#E8E8E8]">
                  {content.course.description}
                </p>

                <div className="mt-4 overflow-hidden rounded-[20px] lg:hidden">
                  <Image
                    className="w-full object-cover lg:h-full"
                    src="/images/screenshots/course-thumbnail.png"
                    alt=""
                    width={706}
                    height={350}
                    quality={100}
                  />
                </div>

                <Button
                  className="mt-5 w-full lg:max-w-72"
                  color="white"
                  href={content.course.getStarted.href}
                >
                  Get Started {'->'}
                </Button>
              </div>
              <div className="mt-4 hidden h-auto w-[365px] overflow-hidden rounded-[20px] lg:mt-0 lg:block">
                <Image
                  className="w-full object-cover"
                  src="/images/screenshots/course-thumbnail.png"
                  alt=""
                  width={706}
                  height={350}
                />
              </div>
            </div>

            <Disclosure as="div" className="flex flex-col bg-white px-5 pb-[15px]">
              {({ open }) => (
                <>
                  <Disclosure.Button className="mt-3 flex items-center text-lg">
                    Chapter Index
                    <ChevronUpIcon
                      className={clsx(
                        'ml-auto h-6 w-6 transform transition-transform duration-200 ease-in-out',
                        open ? 'rotate-0' : 'rotate-180'
                      )}
                    />
                  </Disclosure.Button>

                  <Transition
                    show={open}
                    enter="transition duration-200 ease-in-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-200 ease-in-out"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Disclosure.Panel className="mt-1 text-gray-500">
                      {content.course.course.items.map((video, idx) => (
                        <a
                          key={video.title}
                          href={video.href}
                          className="block border-b border-solid border-[#9DA3AE] py-2 last:border-0 hover:bg-slate-50"
                        >
                          <p className="flex">
                            <span className="min-w-[86px] whitespace-nowrap text-slate-900">
                              Chapter {padZeroes(idx, 2)}{' '}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1"
                              height="21"
                              viewBox="0 0 1 21"
                              fill="none"
                              className="mx-2"
                            >
                              <path d="M0.5 1V20" stroke="#212936" stroke-linecap="round" />
                            </svg>
                            <span className="flex-1 truncate" title={video.title}>
                              {video.title}
                            </span>
                            <span className="ml-4">{video.duration}</span>
                          </p>
                        </a>
                      ))}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>

          <div className="mt-10 text-center text-lg lg:mt-20 lg:text-2xl [&_a]:font-bold [&_a]:underline">
            <RichText>{content.courseSubtitle.json.content}</RichText>
          </div>
        </div>
      </Container>
      <PostsShowcase posts={content.blog.items} />
    </section>
  )
}

const PostsShowcase = ({
  posts
}: {
  posts: {
    title: string
    href: string
    description: string
    imageUrl: string
  }[]
}) => {
  return (
    <div className="relative mt-7">
      <div className="w-full overflow-hidden">
        <ul
          className="mx-auto grid max-w-5xl select-none snap-x snap-mandatory grid-cols-[var(--columns-mobile)] grid-rows-1 justify-between gap-x-2 overflow-x-auto overflow-y-hidden overscroll-x-contain px-6 pb-6 md:grid-cols-[var(--columns-desktop)] md:px-6 lg:gap-x-5 lg:px-0"
          style={
            {
              '--columns-mobile': `repeat(${posts.length},85vw)`,
              '--columns-desktop': `repeat(${posts.length}, minmax(0, 1fr)`
            } as React.CSSProperties
          }
        >
          {posts.map((post) => (
            <li
              className="w-full snap-center rounded-[20px] bg-white p-6 shadow-[0px_2px_18px_0px_rgba(5,73,30,0.08)]"
              key={post.title}
            >
              <a href={post.href} className="flex h-full flex-col">
                <svg
                  width="20"
                  height="23"
                  viewBox="0 0 20 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.95486 4.50096L5.26658 2.32232L1.57826 0.143683C1.4183 0.049278 1.23688 -0.000401791 1.05221 -0.000366192C0.86754 -0.000330592 0.68613 0.0494189 0.526203 0.143885C0.366275 0.238351 0.233461 0.374209 0.141097 0.537811C0.0487322 0.701414 6.96327e-05 0.887001 0 1.07593V9.7904C6.2098e-05 9.97933 0.0487196 10.1649 0.141081 10.3285C0.233442 10.4921 0.366256 10.628 0.526184 10.7225C0.686113 10.817 0.867526 10.8667 1.0522 10.8667C1.23687 10.8668 1.4183 10.8171 1.57826 10.7227L5.26658 8.54405L8.95486 6.36546C9.11481 6.27099 9.24765 6.1351 9.34 5.97145C9.43235 5.80781 9.48097 5.62217 9.48097 5.43321C9.48097 5.24425 9.43235 5.05861 9.34 4.89497C9.24765 4.73132 9.11481 4.59543 8.95486 4.50096Z"
                    fill="#232323"
                  />
                  <path
                    d="M8.95485 16.6364L5.26658 14.4578L1.57826 12.2792C1.4183 12.1848 1.23687 12.1351 1.0522 12.1351C0.867524 12.1352 0.686113 12.1849 0.526184 12.2794C0.366255 12.3739 0.23344 12.5097 0.141078 12.6733C0.0487169 12.8369 6.2098e-05 13.0225 0 13.2115V21.9259C6.2098e-05 22.1148 0.0487169 22.3004 0.141078 22.464C0.23344 22.6276 0.366255 22.7635 0.526184 22.858C0.686113 22.9524 0.867524 23.0022 1.0522 23.0022C1.23687 23.0023 1.4183 22.9526 1.57826 22.8582L5.26658 20.6796L8.95485 18.501C9.11482 18.4065 9.24766 18.2706 9.34002 18.1069C9.43238 17.9433 9.48101 17.7577 9.48101 17.5687C9.48101 17.3797 9.43238 17.1941 9.34002 17.0304C9.24766 16.8668 9.11482 16.7309 8.95485 16.6364Z"
                    fill="#232323"
                  />
                  <path
                    d="M19.4724 10.5706L15.7842 8.39198L12.0958 6.21338C11.9359 6.11898 11.7545 6.0693 11.5698 6.06934C11.3851 6.06937 11.2037 6.11912 11.0438 6.21359C10.8839 6.30805 10.751 6.44391 10.6587 6.60751C10.5663 6.77112 10.5176 6.9567 10.5176 7.14564V15.8601C10.5176 16.049 10.5663 16.2346 10.6587 16.3982C10.751 16.5618 10.8839 16.6977 11.0438 16.7922C11.2037 16.8866 11.3851 16.9364 11.5698 16.9364C11.7545 16.9364 11.9359 16.8868 12.0958 16.7924L15.7842 14.6138L19.4724 12.4351C19.6324 12.3406 19.7652 12.2048 19.8576 12.0411C19.9499 11.8775 19.9986 11.6918 19.9986 11.5029C19.9986 11.3139 19.9499 11.1283 19.8576 10.9646C19.7652 10.801 19.6324 10.6651 19.4724 10.5706Z"
                    fill="#232323"
                  />
                </svg>
                <p className="my-4 text-lg leading-normal text-slate-900 xl:text-2xl">
                  {post.title}
                </p>

                <div className="relative mt-auto aspect-square h-auto w-full overflow-hidden rounded-2xl">
                  <Image
                    fill={true}
                    src={post.imageUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
