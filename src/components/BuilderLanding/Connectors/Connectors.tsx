'use client'

import { useRef, useCallback } from 'react'
import Image from 'next/image'
import { EmblaCarouselType } from 'embla-carousel'
import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import { Carousel } from '~/components/common/carousel'
import { ChatGptIcon } from '~/components/icons/chatGpt'
import { AiIcon } from '~/components/icons/ai'
import { SupabaseIcon } from '~/components/icons/Supabase'
import { SmsIcon } from '~/components/icons/Sms'
import { GoogleDocsIcon } from '~/components/icons/GoogleDocs'
import { GoogleSheetsIcon } from '~/components/icons/GoogleSheets'
import { ResendIcon } from '~/components/icons/Resend'
import { StorageIcon } from '~/components/icons/Storage'
import { FileUploadIcon } from '~/components/icons/FileUpload'
import { RightArrowIcon } from '~/components/icons/rightArrow'

// Icon components for connectors
const AIIcon = () => (
  <div className="flex items-center gap-2">
    {/* OpenAI/ChatGPT style icon */}
    <div className="flex h-8 w-8 items-center justify-center">
     <ChatGptIcon />
    </div>
    {/* Anthropic style icon */}
    <div className="flex h-8 w-8 items-center justify-center">
      <AiIcon />
    </div>
  </div>
)

const DatabaseIcon = () => (
  <div className="flex h-8 w-8 items-center justify-center border border-gray-200 rounded-sm">
    <SupabaseIcon />
  </div>
)

const SMSIcon = () => (
  <div className="flex h-8 w-8 items-center justify-center">
    <SmsIcon />
  </div>
)

const DocumentIcon = () => (
  <div className="flex items-center gap-2">
    {/* Word/Doc icon */}
    <div className="flex h-8 w-8 items-center">
      <GoogleDocsIcon />
    </div>
    {/* Sheets/Excel icon */}
    <div className="flex h-8 w-8 items-center justify-center">
      <GoogleSheetsIcon />
    </div>
  </div>
)

const EmailIcon = () => (
  <div className="flex h-8 w-8 items-center justify-center">
    <ResendIcon />
  </div>
)

const FileStorageIcon = () => (
  <div className="flex items-center gap-2">
    {/* Uploadthing style icon */}
    <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-black">
      <FileUploadIcon />
    </div>
    {/* AWS/Vercel style icon */}
    <div className="flex h-8 w-8 items-center justify-center border border-gray-200 rounded-sm">
      <StorageIcon />
    </div>
  </div>
)

const WebhookIcon = () => (
  <div className="flex h-8 w-8 items-center justify-center text-accent border border-gray-200 rounded-sm">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM18 22a3 3 0 100-6 3 3 0 000 6zM8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
)

// Card component for consistent styling
const ConnectorCard = ({
  title,
  description,
  icon,
  backgroundImage,
  className = '',
}: {
  title: string
  description: string
  icon: React.ReactNode
  backgroundImage?: string
  className?: string
}) => (
  <div
    className={`relative flex flex-col rounded-xl border border-gray-200/60 bg-white  p-5 shadow-sm overflow-hidden border border-white ${className}`}
  >
    {/* Background pattern image */}
    {backgroundImage && (
      <>
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none overflow-hidden">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            style={{ transform: 'scale(3)' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        {/* Radial gradient overlay to fade edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(80.26% 80.26% at 50% 50%, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)',
          }}
        />
      </>
    )}
    
    {/* Content */}
    <div className="relative z-10">
      <h3 className="text-base font-semibold text-accent">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-800">{description}</p>
      <div className="mt-auto flex items-center pt-5">{icon}</div>
    </div>
  </div>
)

// Connector data array
const connectors = [
  {
    title: 'AI',
    description: 'Build apps that use LLMs do complex things like extracting & analyzing content from documents or form submissions, or conversational interfaces.',
    icon: <AIIcon />,
    backgroundImage: '/backgrounds/AI.svg',
  },
  {
    title: 'Full Database',
    description: 'Power your apps with an integrated database requiring zero setup. Builder handles everything.',
    icon: <DatabaseIcon />,
    backgroundImage: '/backgrounds/Full_database.svg',
  },
  {
    title: 'SMS / Text',
    description: 'Build apps that use SMS messages to communicate with customers, and send transactional updates.',
    icon: <SMSIcon />,
    backgroundImage: '/backgrounds/SMS_Text.svg',
  },
  {
    title: 'Document Ingestion & Analysis',
    description: 'Pull information out of your documents and spreadsheets, and write it back to them.',
    icon: <DocumentIcon />,
    backgroundImage: '/backgrounds/Document_Ingestion.svg',
  },
  {
    title: 'Email',
    description: 'Build apps that send notifications, like new user sign ups, and transactional emails.',
    icon: <EmailIcon />,
    backgroundImage: '/backgrounds/Email.svg',
  },
  {
    title: 'File Upload & Storage',
    description: 'Your Builder-built apps can offer photo, video and file upload features, including image resizing and compression.',
    icon: <FileStorageIcon />,
    backgroundImage: '/backgrounds/File_upload.svg',
  },
  {
    title: 'Webhooks',
    description: 'We make it easy to work with any third-party service that can trigger a webhook event, to retrieve data to include in your apps, or to send data out of them.',
    icon: <WebhookIcon />,
    backgroundImage: '/backgrounds/Webhooks.svg',
  },
]

export function Connectors() {
  const carouselRef = useRef<EmblaCarouselType | undefined>(undefined)

  const scrollPrev = useCallback(() => {
    const embla = carouselRef.current
    if (!embla) return
    embla.scrollPrev()
  }, [])

  const scrollNext = useCallback(() => {
    const embla = carouselRef.current
    if (!embla) return
    embla.scrollNext()
  }, [])

  return (
    <section id="connectors" className="relative isolate overflow-hidden bg-gray-200 pb-16 pt-12 md:pb-24 md:pt-20">
      <Container className="relative">
        {/* Headline Section - Left aligned */}
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
            Out-of-the-box
            <br />
            <span className="text-accent">awesomeness</span>
          </h2>
          <p className="mt-4 max-w-3xl text-base text-gray-700 sm:text-lg">
            Our built-in connectors give your apps superpowers that used to require technical
            expertise and tons of troubleshooting.
          </p>
        </div>

        {/* Desktop Grid - Custom layout with spanning */}
        <div className="mt-10 hidden lg:grid grid-cols-4 grid-rows-2 gap-4">
          {/* Row 1, Col 1 - AI */}
          <ConnectorCard
            title={connectors[0].title}
            description={connectors[0].description}
            icon={connectors[0].icon}
            backgroundImage={connectors[0].backgroundImage}
            className="lg:col-start-1 lg:row-start-1"
          />

          {/* Row 1-2, Col 2 - Full Database (spans 2 rows) */}
          <ConnectorCard
            title={connectors[1].title}
            description={connectors[1].description}
            icon={connectors[1].icon}
            backgroundImage={connectors[1].backgroundImage}
            className="lg:col-start-2 lg:row-span-2 lg:row-start-1"
          />

          {/* Row 1, Col 3 - SMS / Text */}
          <ConnectorCard
            title={connectors[2].title}
            description={connectors[2].description}
            icon={connectors[2].icon}
            backgroundImage={connectors[2].backgroundImage}
            className="lg:col-start-3 lg:row-start-1"
          />

          {/* Row 1, Col 4 - Document Ingestion & Analysis */}
          <ConnectorCard
            title={connectors[3].title}
            description={connectors[3].description}
            icon={connectors[3].icon}
            backgroundImage={connectors[3].backgroundImage}
            className="lg:col-start-4 lg:row-start-1"
          />

          {/* Row 2, Col 1 - Email */}
          <ConnectorCard
            title={connectors[4].title}
            description={connectors[4].description}
            icon={connectors[4].icon}
            backgroundImage={connectors[4].backgroundImage}
            className="lg:col-start-1 lg:row-start-2"
          />

          {/* Row 2, Col 3 - File Upload & Storage */}
          <ConnectorCard
            title={connectors[5].title}
            description={connectors[5].description}
            icon={connectors[5].icon}
            backgroundImage={connectors[5].backgroundImage}
            className="lg:col-start-3 lg:row-start-2"
          />

          {/* Row 2, Col 4 - Webhooks */}
          <ConnectorCard
            title={connectors[6].title}
            description={connectors[6].description}
            icon={connectors[6].icon}
            backgroundImage={connectors[6].backgroundImage}
            className="lg:col-start-4 lg:row-start-2"
          />
        </div>

        {/* Mobile Carousel */}
        <div className="mt-10 lg:hidden">
          <Carousel
            ref={carouselRef}
            config={{
              align: 'start',
              slidesToScroll: 1,
              dragFree: true,
              loop: true,
            }}
            slideClassName="!w-full flex-shrink-0"
            dots={false}
            arrows={false}
          >
            {connectors.map((connector, index) => (
              <ConnectorCard
                key={`${connector.title}-${index}`}
                title={connector.title}
                description={connector.description}
                icon={connector.icon}
                backgroundImage={connector.backgroundImage}
              />
            ))}
          </Carousel>

          {/* Mobile navigation buttons */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={scrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-accent active:scale-95 transition-transform"
              aria-label="Previous connector"
            >
              <span className="inline-flex rotate-180">
                <RightArrowIcon width={18} height={18} />
              </span>
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-accent active:scale-95 transition-transform"
              aria-label="Next connector"
            >
              <RightArrowIcon width={18} height={18} />
            </button>
          </div>
        </div>

        {/* CTA Button */}
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

