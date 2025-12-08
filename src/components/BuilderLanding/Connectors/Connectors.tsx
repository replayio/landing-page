'use client'

import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import { ChatGptIcon } from '~/components/icons/chatGpt'
import { AiIcon } from '~/components/icons/ai'
import { SupabaseIcon } from '~/components/icons/Supabase'
import { SmsIcon } from '~/components/icons/Sms'
import { GoogleDocsIcon } from '~/components/icons/GoogleDocs'
import { GoogleSheetsIcon } from '~/components/icons/GoogleSheets'
import { ResendIcon } from '~/components/icons/Resend'
import { StorageIcon } from '~/components/icons/Storage'
import { FileUploadIcon } from '~/components/icons/FileUpload'

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
            icon={<FileStorageIcon />}
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

