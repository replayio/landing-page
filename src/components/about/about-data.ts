export type TeamMember = {
  name: string
  role: string
  photo: string | null
  linkedin: string | null
  bio: string
  timeTravelDestination: string | null
}

export const aboutValues = [
  {
    title: 'Clarity over cleverness',
    description:
      'We build tools that show you exactly what happened — no abstractions, no hand-waving. That same principle runs through everything we do: our code, our communication, and our product.'
  },
  {
    title: 'Long-term over fast',
    description:
      "We're not optimizing for the next quarter. We're building technology that changes how software gets built and debugged. That takes patience, and we're built for it."
  },
  {
    title: 'Open over closed',
    description:
      "We're a distributed team across time zones and continents. We care about what you ship, not when you're online. And we believe the tools that make software understandable should be accessible to everyone — not just engineers at big companies."
  }
] as const

export const aboutTeam: TeamMember[] = [
  {
    name: 'Brian Hackett',
    role: 'CEO',
    photo: '/images/team/brian.png',
    linkedin: 'https://www.linkedin.com/in/brian-hackett-0969a070/',
    bio: "Stanford Ph.D. with 10 years at Mozilla, where he worked on the systems that power the Firefox browser engine. Brian started Replay to solve the problem he spent a decade fighting: helping developers understand complex systems when things go wrong. When he's not building Replay, he's sailing or traveling in a van.",
    timeTravelDestination: null
  },
  {
    name: 'Mark Erikson',
    role: 'Software Engineer',
    photo: '/images/team/mark.png',
    linkedin: 'https://www.linkedin.com/in/markerikson/',
    bio: 'The maintainer of Redux and creator of Redux Toolkit — tools used by millions of React developers worldwide. Mark brings deep expertise in developer tooling and an obsessive focus on developer experience. Based in Southwest Ohio.',
    timeTravelDestination: null
  },
  {
    name: 'Dominik Seifert',
    role: 'Software Engineer',
    photo: '/images/team/domi.png',
    linkedin: 'https://www.linkedin.com/in/dominik-seifert-phd-8b663b54/',
    bio: "Two decades of software engineering, from MMORPG servers to CUDA optimization. Dominik holds a Ph.D. in systems analysis and brings the kind of low-level systems knowledge that makes Replay's recording engine possible. Based in Taiwan, originally from Germany.",
    timeTravelDestination: null
  },
  {
    name: 'Thomas Daly',
    role: 'Head of Product',
    photo: '/images/team/thomasDaly.jpeg',
    linkedin: 'https://www.linkedin.com/in/tomcdaly/',
    bio: 'Thomas is a product builder/maker that lives at the intersection of the customer and the product, while reading the tea leaves of the shifting landscape. Obsessed with the details of making great things, and loves nothing more than to do with good people. He talks about hospitality vs. hostility a lot. He lives in the lower Hudson River valley in NY.',
    timeTravelDestination:
      "I'd like to travel 1,000 years into the future to see if people are still Rick Rolling each other."
  },
  {
    name: 'Strider Wilson',
    role: 'Software Engineer',
    photo: '/images/team/strider.png',
    linkedin: 'https://www.linkedin.com/in/strider-wilson/',
    bio: 'Frontend Software Engineer focused on building clean, intuitive user experiences that make complex technology feel simple. Strider specializes in React, TypeScript, and modern UI architecture, turning ambitious ideas into polished, scalable products. With experience across startups, product design, and fast-moving engineering teams, he enjoys solving hard problems through thoughtful design and efficient code. Outside of tech, he brings an adventurous mindset shaped by years as a wingsuit BASE jumper, skydiving instructor, photographer, and creator.',
    timeTravelDestination:
      "I would go back in time to the recording of Led Zeppelin's live at the BBC album."
  }
  // {
  //   name: 'Michael Ward',
  //   role: 'Dev Ops',
  //   photo: null,
  //   linkedin: null,
  //   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum aenean lacinia bibendum nulla sed.',
  //   timeTravelDestination: null
  // },
  // {
  //   name: 'Brett Lamy',
  //   role: 'Staff Software Engineer',
  //   photo: '/images/team/brett.jpeg',
  //   linkedin: 'https://www.linkedin.com/in/blamy/',
  //   bio: 'Staff Software Engineer with 15 years of experience delivering full-stack products for small startups and large high scale enterprises.',
  //   timeTravelDestination: null
  // },
  // {
  //   name: 'Mateusz Burzyński',
  //   role: 'Software Engineer',
  //   photo: '/images/team/mateusz.png',
  //   linkedin: 'https://www.linkedin.com/in/mateusz-burzy%C5%84ski-5183b0a3/',
  //   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu leo quam pellentesque ornare sem lacinia quam venenatis vestibulum. Duis mollis est non commodo luctus.',
  //   timeTravelDestination:
  //     "I'd either travel backward to my first Harry Potter read or forward 20 years to see if GRRM finally finished the damn thing or not."
  // },
]
