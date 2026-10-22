import { notFound } from 'next/navigation'
import { Viewport } from 'next/types'
import { buildMetadata } from '~/components/seo-landing/SeoLandingPage'
import { ComparePage } from '~/components/compare/ComparePage'
import { competitors, getCompetitor } from '~/components/compare/content'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return competitors.map((c) => ({ slug: c.key }))
}

export async function generateMetadata({ params }: Props) {
  const competitor = getCompetitor((await params).slug)
  if (!competitor) notFound()
  return buildMetadata(competitor)
}

export const viewport: Viewport = {
  themeColor: '#FFF'
}

export default async function Page({ params }: Props) {
  const competitor = getCompetitor((await params).slug)
  if (!competitor) notFound()
  return <ComparePage competitor={competitor} />
}
