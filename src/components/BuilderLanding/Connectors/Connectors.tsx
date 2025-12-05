'use client'

import { Button } from '~/components/Button'
import { Container } from '~/components/Container'

// Icon components for connectors
const AIIcon = () => (
  <div className="flex items-center gap-2">
    {/* OpenAI/ChatGPT style icon */}
    <div className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-gray-50">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93c-.04.34-.11.67-.19 1z"
          fill="currentColor"
          className="text-gray-700"
        />
      </svg>
    </div>
    {/* Anthropic style icon */}
    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#d4a27c]">
      <span className="text-sm font-bold text-white">A</span>
    </div>
  </div>
)

const DatabaseIcon = () => (
  <div className="flex h-8 w-8 items-center justify-center text-emerald-500">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
    </svg>
  </div>
)

const SMSIcon = () => (
  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" className="text-gray-600" />
      <path
        d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-gray-600"
      />
    </svg>
  </div>
)

const DocumentIcon = () => (
  <div className="flex items-center gap-2">
    {/* Word/Doc icon */}
    <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
          fill="white"
          fillOpacity="0.3"
        />
        <path d="M14 2v6h6" stroke="white" strokeWidth="1.5" />
        <path d="M9 13h6M9 17h6M9 9h2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
    {/* Sheets/Excel icon */}
    <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-600">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" rx="2" fill="white" fillOpacity="0.3" />
        <path d="M4 9h16M4 14h16M9 4v16M14 4v16" stroke="white" strokeWidth="1.5" />
      </svg>
    </div>
  </div>
)

const EmailIcon = () => (
  <div className="flex h-8 w-8 items-center justify-center">
    <span className="text-xl font-bold text-gray-800" style={{ fontFamily: 'system-ui' }}>
      R
    </span>
  </div>
)

const FileUploadIcon = () => (
  <div className="flex items-center gap-2">
    {/* Uploadthing style icon */}
    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-500">
      <span className="text-sm font-bold text-white">U</span>
    </div>
    {/* AWS/Vercel style icon */}
    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-500">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L4 20h16L12 4z" fill="white" />
      </svg>
    </div>
  </div>
)

const WebhookIcon = () => (
  <div className="flex h-8 w-8 items-center justify-center text-accent">
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
  className = '',
}: {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
}) => (
  <div
    className={`flex flex-col rounded-xl border border-gray-200/60 bg-white p-5 shadow-sm ${className}`}
  >
    <h3 className="text-base font-semibold text-accent">{title}</h3>
    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-800">{description}</p>
    <div className="mt-auto flex items-center pt-5">{icon}</div>
  </div>
)

export function Connectors() {
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

        {/* Connector Cards Grid - Custom layout with spanning */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {/* Row 1, Col 1 - AI */}
          <ConnectorCard
            title="AI"
            description="Build apps that use LLMs do complex things like extracting & analyzing content from documents or form submissions, or conversational interfaces."
            icon={<AIIcon />}
            className="lg:col-start-1 lg:row-start-1"
          />

          {/* Row 1-2, Col 2 - Full Database (spans 2 rows) */}
          <ConnectorCard
            title="Full Database"
            description="Power your apps with an integrated database requiring zero setup. Builder handles everything."
            icon={<DatabaseIcon />}
            className="lg:col-start-2 lg:row-span-2 lg:row-start-1"
          />

          {/* Row 1, Col 3 - SMS / Text */}
          <ConnectorCard
            title="SMS / Text"
            description="Build apps that use SMS messages to communicate with customers, and send transactional updates."
            icon={<SMSIcon />}
            className="lg:col-start-3 lg:row-start-1"
          />

          {/* Row 1, Col 4 - Document Ingestion & Analysis */}
          <ConnectorCard
            title="Document Ingestion & Analysis"
            description="Pull information out of your documents and spreadsheets, and write it back to them."
            icon={<DocumentIcon />}
            className="lg:col-start-4 lg:row-start-1"
          />

          {/* Row 2, Col 1 - Email */}
          <ConnectorCard
            title="Email"
            description="Build apps that send notifications, like new user sign ups, and transactional emails."
            icon={<EmailIcon />}
            className="lg:col-start-1 lg:row-start-2"
          />

          {/* Row 2, Col 3 - File Upload & Storage */}
          <ConnectorCard
            title="File Upload & Storage"
            description="Your Builder-built apps can offer photo, video and file upload features, including image resizing and compression."
            icon={<FileUploadIcon />}
            className="lg:col-start-3 lg:row-start-2"
          />

          {/* Row 2, Col 4 - Webhooks */}
          <ConnectorCard
            title="Webhooks"
            description="We make it easy to work with any third-party service that can trigger a webhook event, to retrieve data to include in your apps, or to send data out of them."
            icon={<WebhookIcon />}
            className="lg:col-start-4 lg:row-start-2"
          />
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

