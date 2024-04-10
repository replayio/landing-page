import Link from 'next/link'
import Image from 'next/image'
import { LandingPageFragment } from '~/lib/basehub-queries'
import { RichText } from 'basehub/react-rich-text'

type VideoType = {
  href: string
  title: string
  duration: string
}

function Video({ video }: { video: VideoType }) {
  return (
    <div className="flex justify-between border-b border-gray-200 p-2 pl-0 ">
      <div className="flex items-center  text-gray-800">
        <Link
          href={video.href}
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer "
        >
          {video.title}
        </Link>
      </div>
      <span className="text-gray-400">{video.duration}</span>
    </div>
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
          <a href={post.href} className="hover:underline">
            {post.title}
          </a>
        </h3>
      </div>
    </article>
  )
}

export function Content({ content }: LandingPageFragment) {
  return (
    <div className="mx-auto mt-12 max-w-7xl sm:mt-16 sm:px-6 lg:px-8">
      <div className="relative isolate overflow-hidden bg-gray-50 px-6 py-16 text-left shadow-xl sm:rounded-xl sm:px-12">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            {content.title}
          </h2>
          <div className="prose mt-2 text-base leading-6 text-slate-500">
            <RichText>{content.subTitle.json.content}</RichText>
          </div>
        </div>
        <div className="mx-auto mt-8 grid max-w-2xl auto-rows-fr grid-cols-1 gap-6 sm:mt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {content.blog.items.map((post, i) => (
            <Post key={post.title} post={post} />
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-2xl auto-rows-fr grid-cols-1 gap-6 sm:mt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div
            className="col-span-1 rounded-lg bg-black px-2 pt-32 lg:col-span-1"
            style={{
              backgroundImage: "url('images/screenshots/course-thumbnail.png')",
              backgroundSize: '100% auto',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="p-4 text-2xl font-bold text-white">{content.course.title}</div>
            <div className="my-0 mb-4 p-4 pt-0 text-gray-600 text-white">
              {content.course.description}
            </div>
            <div className="flex justify-center">
              <a
                href={content.course.getStarted.href}
                className="inline-block w-1/2 rounded-full bg-white p-3 text-center font-bold text-black"
              >
                {content.course.getStarted.label}
              </a>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-2">
            <div className="flex flex-col">
              {content.course.course.items.map((video) => (
                <Video key={video.title} video={video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
