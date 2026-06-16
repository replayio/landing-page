// Static testimonial data — previously fetched from BaseHub CMS.
// Image keys map to local imports in Testimonials.tsx.

export type TestimonialData = {
  name: string
  handle: string
  quote: string
  image: string
  featured?: boolean
}

export type CaseStudyData = {
  name: string
  handle: string
  quote: string
  image: string
  logo: string
  url: string
}

export type TestimonialSectionData = {
  title: string
  subtitle: string
  caseStudyTitle: string
  caseStudySubTitle: string
  testimonials: TestimonialData[]
  caseStudies: CaseStudyData[]
}

export const testimonialData: TestimonialSectionData = {
  title: 'See what time travelers are saying',
  subtitle: 'Testimonials',
  caseStudyTitle: 'Hear from Replay teams directly',
  caseStudySubTitle: 'Case Studies',
  caseStudies: [
    {
      name: 'Mark Probst',
      handle: 'VP Eng, Glide',
      quote:
        'Before Replay We spent somewhere between 1\u20132 hours per day per dev in this reproducibility purgatory. The toll this was taking on our development velocity and our ability to respond and resolve issues was huge. We thought there must be a better way.',
      image: 'glide',
      logo: 'glide',
      url: 'https://blog.replay.io/glide-saves-40-hours-weekly-by-eliminating-the-%22reproducibility%22-problem'
    },
    {
      name: 'Simeon Cheeseman',
      handle: 'Tablecheck, Principal Engineer',
      quote:
        'If I didn\u2019t have Replay, it would have taken me several days or even weeks getting the debugger to run properly in all the dynamically loaded scripts, which is not easy. With Replay it took me half a day to figure it out and get a fix ready.',
      image: 'simeon',
      logo: 'tablecheck',
      url: 'https://blog.replay.io/tablecheck-transforms-qa-lessgreater-dev-communication-to-support-thousands-of-restaurants-and-hotel-chains'
    },
    {
      name: 'Shane Duff',
      handle: 'Pantheon, Front End Lead',
      quote:
        'The tools that we were using before were barely better than useless. You\u2019d say thanks for the console log screenshot and spend 2\u20133 days trying to recreate the issues and finding it in the code. With Replay, all that wasted time has been eliminated.',
      image: 'shane',
      logo: 'pantheon',
      url: 'https://blog.replay.io/pantheon-solves-performance-bottlenecks-improving-load-time-by-5x'
    }
  ],
  testimonials: [
    {
      name: 'Guillermo Rauch',
      handle: 'Founder of Vercel',
      quote:
        'I think Replay has a very good chance of creating a new category around collaborative debugging',
      image: 'guillermo',
      featured: true
    },
    {
      name: 'Tim Neutkens',
      handle: 'Co-author of Next.js',
      quote:
        'Next.js App Router is now stable in 13.4. Wouldn\u2019t have been possible without Replay, we investigated so many (over 20) super complicated bugs that using traditional debugging would have cost us days to investigate.',
      image: 'timn'
    },
    {
      name: 'JJ Kasper',
      handle: 'Co-author of Next.js',
      quote: 'When I see a hard-to-reproduce issue in GitHub, I ask for a replay.',
      image: 'jj'
    },
    {
      name: 'Sebastian Markb\u00E5ge',
      handle: 'React Maintainer',
      quote:
        'If I don\u2019t immediately know the answer to a bug, I immediately reach for Replay.io. It\u2019s like HMR for repros.',
      image: 'sebastian'
    },
    {
      name: 'Dan Abramov',
      handle: 'React Maintainer',
      quote: 'Replay.io is galaxy brain tooling. Real gamechanger.',
      image: 'dan'
    },
    {
      name: 'Amjad Masad',
      handle: 'Founder Replit',
      quote:
        'Programmers typically reach for debuggers when they run out of ideas on how to fix their code. Now coders reach for time-travel debugging to understand their programs and not just when they want to fix a bug.',
      image: 'amjad'
    },
    {
      name: 'Ryan Carniato',
      handle: 'Solid Founder',
      quote:
        'Fast forwarding and rewinding to breakpoints has saved me days(weeks??) while hunting down issues in @solid_js interruptible concurrent rendering.',
      image: 'ryan'
    },
    {
      name: 'Mark Erikson',
      handle: 'Redux Maintainer',
      quote:
        'Replay.io gives me the tools I need to solve seemingly impossible bugs. It\u2019s like the Redux DevTools, but for every line of code in your app.',
      image: 'marke'
    },
    {
      name: 'Lenz Weber-Tronic',
      handle: 'Redux Toolkit Maintainer',
      quote:
        'Replay.io allows me to debug problems that would be impossible to debug by traditional means - it has saved me from countless hours of confusion and frustration.',
      image: 'lenz'
    },
    {
      name: 'Dom Saadi',
      handle: 'Maintainer of RedwoodJS',
      quote:
        'I\u2019m not sure if we could\u2019ve shipped the last major version of RedwoodJS without Replay.',
      image: 'dom'
    },
    {
      name: 'Ives van Hoorne',
      handle: 'Co-founder CodeSandbox',
      quote:
        'Replay.io is so great! Today I had a hard-to-repro flow in development, so I recorded a replay to see how it works. I didn\u2019t only find the bug, I discovered a performance improvement using Replay.',
      image: 'ives'
    },
    {
      name: 'Mateusz Burzy\u0144ski',
      handle: 'OSS Contributor to Typescript',
      quote:
        'Current status: time-travel debugging Typescript\u2019s compiler. Replay is the hero tool I don\u2019t deserve. My dev life consists of 2 major eras now - I call them pre-Replay and post-Replay.',
      image: 'mateusz'
    },
    {
      name: 'Matt Pocock',
      handle: 'Full-time TypeScript educator',
      quote:
        'Replay.io is from another planet where bug reports save you time, instead of eating up hours of debugging.',
      image: 'matt'
    },
    {
      name: 'David Khourshid',
      handle: 'Founder of Stately.ai',
      quote:
        'Time travel is the obvious next step for the future of collaboratively inspecting and debugging applications.',
      image: 'david'
    },
    {
      name: 'Erik Rasmussen',
      handle: 'Author of Redux form and final form',
      quote:
        'People use the word "game-changer" waaaaay too often. Very rarely does anything change the game. But this just might! I\u2019m sharing it to all of my teams.',
      image: 'erik'
    },
    {
      name: 'Harald Kirschner',
      handle: 'Product Manager, VS Code',
      quote:
        'Replay.io is one of these experiences that first feels like magic \u2013 but after squashing your first bugs with it, you will quickly wonder how you ever worked without it',
      image: 'harald'
    },
    {
      name: 'Kenneth Auchenberg',
      handle: 'Developer Products, Stripe',
      quote:
        'Replay.io is the most significant leap forward for debugging since we introduced the step debugger',
      image: 'kenneth'
    },
    {
      name: 'Zack Rosen',
      handle: 'CEO of Pantheon',
      quote: 'If a picture is worth a thousand words, a replay is worth a thousand pictures',
      image: 'zack'
    },
    {
      name: 'Gleb Bahmutov',
      handle: 'Distinguished Engineer, Cypress',
      quote:
        'Recording and debugging flaky tests with Replay.io feels like hopping in Doc Brown\u2019s DeLorean and flying back to the time of the crash!',
      image: 'gleb'
    },
    {
      name: 'Mark Probst',
      handle: 'Glide apps, VP Eng',
      quote:
        'Before Replay.io, we spent somewhere between 1–2 hours per day per dev in this reproducibility purgatory',
      image: 'markp'
    }
  ]
}

// Old / unused testimonials — preserved from earlier homepage versions (2023–2024 Web Archive).
// These were removed from the active set during homepage redesigns but may be useful in the future.
export const archivedTestimonials: TestimonialData[] = [
  {
    name: 'Jacob Zhang',
    handle: 'Founder, Algodaily',
    quote:
      "Haven't been blown away by a dev tool since… well, browser devtools. Incredible DX that makes debugging the gnarliest problems a breeze",
    image: 'algodaily'
  },
  {
    name: 'Tim Haines',
    handle: 'Founder, Percy',
    quote:
      "Replay.io is a huge improvement in state-of-the-art debugging that's easy to use. It's worth your time to get familiar with it ASAP.",
    image: 'timh'
  },
  {
    name: 'Simeon Cheeseman',
    handle: 'Principal Engineer, Tablecheck',
    quote:
      'With Replay.io, we no longer need to drop everything to fix the issue because we have the replay so the bug is reproduced forever.',
    image: 'simeon'
  },
  {
    name: 'Simeon Cheeseman',
    handle: 'Principal Engineer, TableCheck',
    quote:
      'Adding Replay to our Cypress tests has helped us catch and easily fix the most difficult flaky tests that only occur in CI without endless guessing and frustration.',
    image: 'simeon'
  },
  {
    name: 'Vamsi Peri',
    handle: 'Director of Engineering, Metabase',
    quote:
      'Running our end to end tests through Replay saves us countless hours of manually reproducing and debugging CI failures, and lets us seamlessly share failed tests across our engineering teams.',
    image: 'metabase'
  },
  {
    name: 'David Jackson',
    handle: 'Senior Engineer, Weights and Biases',
    quote:
      "Before Replay, some test flakes were simply not debuggable: we didn't have the information required for anything better than an educated guess. Now, we always have a perfect reproduction, and our tests have a 99.9% pass rate.",
    image: 'wandb'
  }
]
