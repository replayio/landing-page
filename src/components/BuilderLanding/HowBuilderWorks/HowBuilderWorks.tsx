'use client'

import { useState } from 'react'
import { Button } from '~/components/Button'
import { Container } from '~/components/Container'

import { DocumentIcon } from '~/components/icons/document'
import { BrushIcon } from '~/components/icons/brush'
import { ToolIcon } from '~/components/icons/tool'
import { DeployIcon } from '~/components/icons/deploy'
import { RightArrowIcon } from '~/components/icons/rightArrow'


const features = [
  {
    title: 'Plan & Ideate',
    icon: <DocumentIcon />,
    description: 'Builder will help you create a detailed plan for your app.',
    highlight: 'No need for extensive prompts',
    videoId: 'd3yeUueEEJk',
  },
  {
    title: 'Design & Iterate',
    icon: <BrushIcon />,
    description: 'Easily make component changes & customize your design.',
    highlight: 'Edit only components you choose',
    videoId: '1LGONwSGWgo',
  },
  {
    title: 'Test & Fix',
    icon: <ToolIcon />,
    description: 'We will automatically test your application and fix any issues.',
    highlight: 'Goodbye to manual debugging',
    videoId: 'pkCMceghdgs',
  },
  {
    title: 'One-click Deploy',
    icon: <DeployIcon />,
    description: 'Deploying your app is as simple as it gets',
    highlight: 'No need for coding experience',
    videoId: 'uLoRbZdvUiE',
  },
]

export function HowBuilderWorks() {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(features[0].videoId)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  return (
    <section id="how-builder-works" className="relative isolate overflow-hidden bg-white pb-16 pt-8 md:pb-24 md:pt-20">
      <Container className="relative">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
            We're with you{' '}
            <br />
            <span className="text-accent">every step of the way.</span>
          </h2>
          <p className="mt-4 max-w-3xl text-base text-gray-700 sm:text-lg">
            Anyone can go from idea to live web application in minutes - no code, no hassle.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 mt-12">
          {/* Left Section - Text Content */}
          <div className="flex flex-col lg:max-w-sm lg:flex-shrink-0">
            {/* Feature Cards */}
            <div className="space-y-3">
              {features.map((feature, index) => {
                const isSelected = selectedVideoId === feature.videoId
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedVideoId(feature.videoId)
                      setHasUserInteracted(true)
                    }}
                    className={`group flex w-full items-center gap-4 rounded-lg border-2 p-4 text-left transition-all ${
                      isSelected
                        ? 'border-accent bg-white shadow-sm'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white'
                    }`}
                  >
                    {/* Icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-600 border border-gray-200 rounded-lg bg-white">
                      {feature.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                        {feature.description}{' '}
                        <span className="font-medium text-accent">{feature.highlight}</span>
                      </p>
                    </div>

                    {/* Right Arrow */}
                    <div className="w-10 h-10 flex shrink-0 items-center justify-center border border-gray-200 rounded-full bg-white">
                      <RightArrowIcon width={20} height={20} />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Section - Video Embed */}
          <div className="relative flex-1 flex items-center justify-center lg:justify-end">
            <div className="relative w-full">
              <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-xl">
                {selectedVideoId ? (
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedVideoId}?${hasUserInteracted ? 'autoplay=1&' : ''}rel=0`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-12 flex justify-center">
          <Button
            variant="solid"
            color="default"
            size="base"
            className="px-8"
            href="https://builder.replay.io/?focus=true"
            target="_blank"
          >
            Start Building
          </Button>
        </div>
      </Container>
    </section>
  )
}
