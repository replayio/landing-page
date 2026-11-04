'use client'

import { ForTeamsTestimonials, defaultTestimonials } from '~/app/components/ForTeamsTestimonials'
import natachagrey from '~/images/testimonials/natachagrey.jpg'

const natacha = {
  quote:
    "If there's another agency listening to this, definitely check out Replay. You don't need to hire a QA resource for your projects. Everyone's trying to move so fast every day, and it helps you deliver faster.",
  name: 'Natacha Grey',
  handle: 'Founder, Swoon.ai',
  href: '/blog/customer-profile-natacha-grey-of-swoon-ai',
  image: natachagrey
}

export function AgenciesTestimonials() {
  return <ForTeamsTestimonials testimonials={[natacha, ...defaultTestimonials]} />
}
