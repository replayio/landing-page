import { AboutPageFragment } from '~/lib/basehub-queries'
import { RichText } from 'basehub/react-rich-text'
import Logan from '~/images/logan.png'
import Cecelia from '~/images/cecelia.png'
import Image from 'next/image'

const stats = [
  { label: 'Founded', value: '2021' },
  { label: 'Employees', value: '37' },
  { label: 'Countries', value: '12' },
  { label: 'Raised', value: '$25M' }
]

function Panel({
  className = '',
  superTitle,
  title,
  description,
  orientation,
  imageSrc
}: {
  className: string
  superTitle: string
  title: string
  description: any
  orientation: 'left' | 'right'
  imageSrc: any
}) {
  const body = (
    <div>
      <div className="text-base leading-7 lg:max-w-lg">
        <p className="text-base font-semibold leading-7 text-primary">{superTitle}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <div className="prose max-w-xl text-gray-600">
          <RichText>{description}</RichText>
        </div>
      </div>
    </div>
  )
  const image = (
    <div className="lg:pr-4">
      <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
        <Image
          alt="team image"
          src={imageSrc}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
  return (
    <div
      className={`mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2 ${className}`}
    >
      {orientation == 'left' ? (
        <>
          {body}
          {image}
        </>
      ) : (
        <>
          {image}
          {body}
        </>
      )}
    </div>
  )
}

export function Hero({ hero }: { hero: AboutPageFragment['hero'] }) {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 ">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{hero.title}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{hero.subTitle}</p>
          </div>
        </div>

        <Panel
          superTitle="Our Belief"
          className="mt-32"
          title={hero.title1}
          description={hero.description1.json.content}
          imageSrc={Logan}
          orientation="left"
        />

        <Panel
          superTitle="The Future"
          className="mt-32"
          title={hero.title2}
          description={hero.description2.json.content}
          orientation="right"
          imageSrc={Cecelia}
        />
      </div>
    </div>
  )
}
