'use client'
import { useState } from 'react'

const caseStudies = [
  {
    body: `We went from 30% of our test runs failing to less than 5%. And our tests became simpler.`,
    author: 'Vamsi Peri',
    handle: 'VP Engineering, Metabase',
    company: 'TableCheck',
    logoUrl: 'https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg'
  },
  {
    body: `We went from 30% of our test runs failing to less than 5%. And our tests became simpler.`,
    author: 'Vamsi Peri',
    handle: 'VP Engineering, Metabase',
    company: 'Weights and Biases',
    logoUrl: 'https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg'
  },
  {
    body: `We went from 30% of our test runs failing to less than 5%. And our tests became simpler.`,
    author: 'Vamsi Peri',
    handle: 'VP Engineering, Metabase',
    company: 'Metabase',
    logoUrl: 'https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg'
  }
]

const AnimateSquare = ({
  featured,
  setFeatured,
  caseStudy
}: {
  featured: boolean
  setFeatured: (company: string) => void
  caseStudy: (typeof caseStudies)[0]
}) => {
  return (
    <div
      className={` flex h-32 items-center justify-center rounded-xl bg-gray-300 transition-all duration-500 ${featured ? 'sm:col-span-3' : 'sm:col-span-1'}`}
      onClick={() => {
        setFeatured(caseStudy.company)
      }}
    >
      {caseStudy.company}
    </div>
  )
}

export function TestSuiteCaseStudies() {
  const [featured, setFeatured] = useState('Metabase')

  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="border-t border-gray-300 bg-gray-200 py-16 sm:py-16"
    >
      <div className="mx-auto max-w-7xl ">
        <div className="mx-auto grid grid-cols-5 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:grid-cols-1 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-5">
          {caseStudies.map((study, index) => (
            <AnimateSquare
              key={index}
              caseStudy={study}
              featured={featured === study.company}
              setFeatured={setFeatured}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
