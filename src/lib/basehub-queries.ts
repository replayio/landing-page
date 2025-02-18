import { fragmentOn } from '.basehub'
import { link } from 'fs'

export const linkFragment = fragmentOn('LinkComponent', {
  _id: true,
  href: true,
  label: true,
  variant: true
})

const popoverFragment = fragmentOn('PopoverComponent', {
  _id: true,
  _title: true,
  body: true,
  learnMore: linkFragment
})

export type PopoverFragment = fragmentOn.infer<typeof popoverFragment>

export const descriptionFragment = fragmentOn('DescriptionRichText', {
  content: true,
  toc: true,
  blocks: {
    __typename: true,
    on_PopoverComponent: popoverFragment
  }
})

export type DescriptionFragment = fragmentOn.infer<typeof descriptionFragment>

export const imageFragment = fragmentOn('BlockImage', {
  url: {
    __args: {
      quality: 100
    }
  },
  alt: true,
  width: true,
  height: true,
  aspectRatio: true
})

export const landingPageFragment = fragmentOn('LandingPage', {
  hero: {
    secondaryCta: linkFragment,
    showSecondaryCta: true,
    installationLink: {
      ...linkFragment,
      clipboard: true
    },
    example: imageFragment,
    logosTitle: true,
    heroVariants: {
      items: {
        h1: { json: { content: true } },
        h2: { json: { content: true } }
      }
    },
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
    replayUrl: true,
    description: {
      json: descriptionFragment
    },
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
        image: true,
        link: true
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
        icon: true,
        learnMore: true
      }
    }
  },
  nut: {
    title: true,
    subtitle: true,
    description: {
      json: descriptionFragment
    },
    logo: imageFragment,
    cta: linkFragment,
    showExamples: true,
    earlyAdopterTitle: true,
    earlyAdopterDescription: {
      json: { content: true }
    },
    examples: {
      items: {
        _title: true,
        title: true,
        description: {
          json: { content: true }
        },
        screenshot: imageFragment
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
    courseSubtitle: { json: { content: true } },
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
export type AboutPageFragment = fragmentOn.infer<typeof aboutPageFragment>
