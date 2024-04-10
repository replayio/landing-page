'use client'

import { useMemo, useState } from 'react'
import { Button } from './Button'
import { Testimonial, TestimonialItem } from './Testimonials'

function TestimonialForSmallScreen({ testimonials }: { testimonials: TestimonialItem[][][] }) {
  const [showAll, setShowAll] = useState(false)

  const allTestimonials = useMemo(
    () => testimonials.flatMap((columnGroup) => columnGroup.flatMap((column) => column)),
    [testimonials]
  )
  const testimonialsToShow = showAll ? allTestimonials : allTestimonials.slice(0, 4)
  return (
    <div className="visible col-span-2 flex flex-col gap-y-4 xl:hidden">
      {testimonialsToShow.map((testimonial, i) => (
        <Testimonial key={i} testimonial={testimonial} columnIdx={i} columnGroupIdx={0} />
      ))}
      {!showAll && <Button onClick={() => setShowAll(!showAll)}>Show more</Button>}
    </div>
  )
}

export default TestimonialForSmallScreen
