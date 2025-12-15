'use client'

import { Container } from '~/components/Container'
import InputArea from './components/InputArea'
import Hyperspace from '~/app/components/hero/hyperspace'
import { usePageSectionAnimation } from '~/hooks/use-page-section-animation'

export default function BuilderHomeMain() {
  const heroContentRef = usePageSectionAnimation<HTMLDivElement>()

  return (
    <section className="relative min-h-screen flex flex-col bg-white">
      {/* Radial gradient background with subtle lines */}
      <div className="absolute -top-[30%] left-0 h-[130%] w-full animate-fadeIn lg:-left-[35%] lg:top-0 lg:h-full lg:w-[135%]">
        <Hyperspace className="opacity-10" />
      </div>


      <Container className="relative z-10 flex w-full max-w-7xl flex-col items-center flex-1">
        <div ref={heroContentRef} className="flex w-full max-w-4xl flex-col items-center pt-8 md:pt-12 lg:pt-16 xl:pt-20">
          {/* Main Headline */}
          <h1 className="text-center text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl">
            Own your tools
            <br />
            with web apps that{' '}
            <span className="relative inline-block">
              work
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="10"
                viewBox="0 0 120 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 5C8 3, 15 7, 22 5C29 3, 36 7, 43 5C50 3, 57 7, 64 5C71 3, 78 7, 85 5C92 3, 99 7, 106 5C110 4.5, 114 4, 118 5"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="mt-4 text-center text-base text-gray-600 sm:text-lg">
            Build and customize web apps for you and your team in minutes.
          </p>

          <a className="max-w-[600px] w-full" href="https://builder.replay.io/?focus=true" target="_blank">
            <InputArea />
          </a>


          {/* Bottom Section */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-sm text-gray-600">
              Not sure what to start with? Check out some examples
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('showcase-gallery')
                if (element) {
                  const headerHeight = 80
                  const elementPosition = element.getBoundingClientRect().top + window.scrollY
                  window.scrollTo({
                    top: elementPosition - headerHeight,
                    behavior: 'smooth'
                  })
                }
              }}
              className="rounded-full border-2 px-6 py-2.5 font-semibold text-accent-light transition-colors hover:bg-accent-light hover:text-white shadow-lg hover:border-accent"
            >
              Showcase Gallery
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

