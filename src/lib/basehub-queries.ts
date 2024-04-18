import { fragmentOn } from '.basehub'
import { link } from 'fs'

export const linkFragment = fragmentOn('LinkComponent', {
  _id: true,
  href: true,
  label: true,
  variant: true
})

export const landingPageFragment = fragmentOn('LandingPage', {
  hero: {
    subtitle: {
      json: { content: true }
    },
    getStartedLink: linkFragment,
    installationLink: linkFragment,
    contactUsLink: linkFragment,
    logosTitle: true,
    testimonials: {
      items: {
        testimonial: {
          name: true,
          title: true,
          quote: {
            json: { content: true }
          },
          image: true
        }
      }
    }
  },
  devTools: {
    title: true,
    subTitle: true,
    replayUrl: true,
    features: {
      items: {
        _title: true,
        subTitle: true,
        image: true,
        video: true,
        type: true
      }
    }
  },
  testSuites: {
    title: true,
    subTitle: true,
    superTitle: true,
    features: {
      items: {
        _title: true,
        subtitle: true,
        description: true,
        image: true
      }
    }
  },
  faq: {
    title: true,
    subTitle: true,
    questions: {
      items: {
        _title: true,
        summary: true,
        href: true,
        logos: true
      }
    }
  },
  cta: {
    title: true,
    getStartedLink: linkFragment
  },
  dynamicAnalysis: {
    title: true,
    subtitle: true,
    description: true,
    features: {
      items: {
        _title: true,
        feature: { json: { content: true } },
        icon: true
      }
    }
  },
  testimonials: {
    title: true,
    subtitle: true,
    caseStudyTitle: true,
    caseStudySubTitle: true,
    caseStudies: {
      items: {
        _title: true,
        name: true,
        handle: true,
        quote: true,
        image: true,
        logo: true,
        url: true
      }
    },
    testimonials: {
      items: {
        _title: true,
        title: true,
        quote: true,
        image: true,
        featured: true
      }
    }
  },
  content: {
    title: true,
    subTitle: { json: { content: true } },
    blog: {
      items: {
        title: true,
        href: true,
        description: true,
        imageUrl: true
      }
    },
    course: {
      title: true,
      description: true,
      getStarted: linkFragment,
      course: {
        items: {
          _title: true,
          title: true,
          href: true,
          duration: true
        }
      }
    }
  }
})

export const pricingPageFragment = fragmentOn('PricingPage', {
  hero: {
    title: {
      left: true,
      right: true
    },
    label: true,
    description: { json: { content: true } }
  },
  faq: {
    title: true,
    questions: {
      items: {
        _title: true,
        answer: true
      }
    }
  }
})

export const aboutPageFragment = fragmentOn('AboutPage', {
  hero: {
    title: true,
    subTitle: true,
    title1: true,
    description1: { json: { content: true } },
    title2: true,
    description2: { json: { content: true } }
  }
})

export type LandingPageFragment = fragmentOn.infer<typeof landingPageFragment>
export type LinkFragment = fragmentOn.infer<typeof linkFragment>
export type PricingPageFragment = fragmentOn.infer<typeof pricingPageFragment>
export type AboutPageFragment = fragmentOn.infer<typeof aboutPageFragment>
