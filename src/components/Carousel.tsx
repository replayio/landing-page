import Image from 'next/image'
import { LandingPageFragment } from '~/lib/basehub-queries'
import { RichText } from 'basehub/react-rich-text'
import vamsi from '~/images/vamsi.jpeg'
import styles from './Carousel.module.css'

const images = { vamsi }

export function Carousel({
  testimonials
}: {
  testimonials: LandingPageFragment['hero']['testimonials']['items']
}) {
  const testimonial = testimonials[0].testimonial

  return (
    <section
      className={`relative flex items-center justify-center rounded-lg bg-white shadow ${styles.testimonialSection}`}
      style={{ width: '320px' }}
    >
      <div className="w-full max-w-4xl">
        <blockquote
          className={` leading-2 relative p-6  text-sm font-normal italic text-gray-900 lg:p-8 lg:pl-10 ${styles.testimonialQuote}`}
        >
          <RichText>{testimonial.quote.json.content}</RichText>
        </blockquote>
        <figcaption className=" flex items-center border-t  border-gray-100 py-3 lg:px-8 lg:pl-10">
          <div>
            <div className="text-md font-semibold text-gray-900">{testimonial.name}</div>
            <div className="text-sm text-gray-500">{testimonial.title}</div>
          </div>
        </figcaption>
      </div>
    </section>
  )
}
