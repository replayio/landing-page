import brian from '~/images/team/brian.png'
import colin from '~/images/team/colin.png'
import dan from '~/images/team/dan.png'
import domi from '~/images/team/domi.png'
import holger from '~/images/team/holger.png'
import jason from '~/images/team/jason.png'
import jon from '~/images/team/jon.png'
import mark from '~/images/team/mark.png'
import miriam from '~/images/team/miriam.png'
import ryan from '~/images/team/ryan.png'
import vaughn from '~/images/team/vaughn.jpeg'
import Image from 'next/image'

export const team = [
  {
    image: jason,
    role: 'CEO',
    name: 'Jason Laster',
    bio: 'Jason has contributed to debuggers in several runtimes and prior to Replay was the tech lead for the Firefox Debugger. When not debugging the debugger, you’ll likely find him in the woodworking studio or outside with his pup Walle.',
    socials: {
      twitter: 'https://twitter.com/jasonlaster11/',
      linkedin: 'https://www.linkedin.com/in/jason-laster-6657167/'
    }
  },
  {
    image: brian,
    role: 'CTO',
    name: 'Brian Hackett',
    bio: 'Brian has had a longtime passion for helping people understand hugely complex software systems, starting with a Stanford Ph.D. and continuing through 10 years at Mozilla, where he worked on JavaScript VM optimizations and developed a precursor to Replay. He is a nomadic adventurer and enjoys sailing around Polynesia and van travel in the western US with his wife.'
  },
  {
    image: vaughn,
    role: 'Software engineer',
    name: 'Brian Vaughn',
    bio: `Brian enjoys building tools that help make other engineers more productive. Before joining Replay, he spent the past several years building and maintaining the React JS developer tools. When he's not writing software, Brian also enjoys making music and running.`,
    socials: {
      twitter: 'https://twitter.com/brian_d_vaughn',
      linkedin: 'https://www.linkedin.com/in/briandavidvaughn/'
    }
  },

  {
    image: dan,
    role: 'Software engineer',
    name: 'Dan Miller',
    bio: `Dan started his career at Etsy where he worked on PHP runtimes and type systems and has been trying to help developers be more productive ever since. When not trying to express the "is a hot dog a sandwich" question using types, he can probably be found hiking or skiing if the weather is nice, otherwise he's probably playing Super Smash Bros.`,
    socials: {
      twitter: 'https://twitter.com/jazzdan',
      linkedin: 'https://www.linkedin.com/in/dan-miller-b3790211/'
    }
  },
  {
    image: mark,
    role: 'Software engineer',
    name: 'Mark Erikson',
    bio: `Mark lives in southwest Ohio, USA and is a Redux maintainer, creator of Redux Toolkit, and general keeper of the Redux docs. He spends much of his time answering questions about React and Redux anywhere there's a comment box on the internet, and usually hangs out in the Reactiflux chat channels. Mark is also disturbed at the number of third-person references he has written in this bio.`,
    socials: {
      twitter: 'https://twitter.com/acemarke',
      linkedin: 'https://www.linkedin.com/in/markerikson/'
    }
  },

  {
    image: domi,
    role: 'Software engineer',
    name: 'Dominik Seifert',
    bio: `Dominik's two decades of software engineering adventures involved building MMORPG servers, optimizing CUDA algorithms and building/debugging full-stack applications. After getting frustrated about the inability to directly analyze his own systems' control and data flow, he dedicated his PhD dissertation to exploring and finding novel solutions for exactly that problem. Originally from Germany, he has been living in Taiwan for most of his adult life.`
  }
]

export function Team() {
  return (
    <div className="bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            Meet the Team
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            We&lsquo;re a distributed company, founded by people who have spent years working on
            fully distributed teams at companies like Mozilla. We work across the globe, so we focus
            less on hours and more on building a great product. We build for the long term:
            it&lsquo;s a relay, not a sprint.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-left sm:grid-cols-1 md:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
        >
          {team.map((person) => (
            <li key={person.name}>
              <Image className="h-24 w-24 rounded-md object-cover" src={person.image} alt="" />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-slate-100">
                {person.name}
              </h3>
              <p className="text-sm  leading-6 text-slate-300">{person.role}</p>
              <p className="mt-4 text-sm leading-6 text-slate-300">{person.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
