import Image from 'next/image'
import { LandingPageFragment } from '~/lib/basehub-queries'
import { RichText } from 'basehub/react-rich-text'
import vamsi from '~/images/vamsi.jpeg'

const images = { vamsi }

export function Carousel({
  testimonials
}: {
  testimonials: LandingPageFragment['hero']['testimonials']['items']
}) {
  const testimonial = testimonials[0].testimonial
  return (
    <section className="isolate overflow-hidden px-6 lg:px-8">
      <div className="relative mx-auto py-4 text-left sm:py-0" style={{ width: '200px' }}>
        <figure className="grid grid-cols-1 items-center gap-x-6 gap-y-4 lg:gap-x-6">
          <div className="relative col-span-2 lg:col-start-1 lg:row-start-1">
            <blockquote className="text-md font-light leading-8 text-gray-900 sm:text-sm sm:leading-5">
              <RichText>{testimonial.quote.json.content}</RichText>
            </blockquote>
          </div>
          <figcaption className="flex items-center text-sm lg:col-start-1 lg:row-start-3">
            <Image
              src={images.vamsi}
              alt=""
              className="mr-2 rounded-full bg-indigo-50 lg:rounded-full"
            />
            <div>
              <div className="mb-0 pb-0 font-medium leading-tight text-gray-900">
                {testimonial.name}
              </div>
              <div className="mt-0 pt-0 leading-tight text-gray-500">{testimonial.title}</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
