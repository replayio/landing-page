'use client'

import { NotionRenderer } from 'react-notion-x'
import type { ExtendedRecordMap } from 'notion-types'

type BlogPostBodyProps = {
  recordMap: ExtendedRecordMap
}

export function BlogPostBody({ recordMap }: BlogPostBodyProps) {
  return (
    <div className="notion-overrides">
      <NotionRenderer recordMap={recordMap} fullPage={false} darkMode={false} />
    </div>
  )
}
