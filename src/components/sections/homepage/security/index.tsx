import Link from 'next/link'
import { useRef } from 'react'
import Marquee from 'react-fast-marquee'

import { GoogleIcon } from '~/components/icons/google'
import { LinuxIcon } from '~/components/icons/linux'
import { MacOsIcon } from '~/components/icons/macos'
import { MozillaIcon } from '~/components/icons/mozilla'
import { NodeJsIcon } from '~/components/icons/nodejs'
import { WindowsIcon } from '~/components/icons/windows'
import { Section } from '~/components/layout/section'
import { useIsomorphicLayoutEffect } from '~/hooks/use-isomorphic-layout-effect'
import { useTabletLgBreakpoint } from '~/hooks/use-media'
import { gsap } from '~/lib/gsap'

import s from './security.module.scss'

export const Security = () => {
  const bgWrapperRef = useRef<HTMLDivElement>(null)
  const isTablet = useTabletLgBreakpoint()

  return (
    <Section id="homepage-security" className={s.section}>
      <div className={s.container}>
        <div className={s.cardsWrapper}>
          <div className={s.card}>
            <div className={s.content}>
              <p className={s.title}>
                Replay.io will not access your data
                <br />
                <span>without your explicit permission.</span>
              </p>
              <ul className={s.list}>
                <li>
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.25 5.25V3.375A2.24999 2.24999 0 0 0 6 1.125a2.24999 2.24999 0 0 0-2.25 2.25V5.25m-.375 5.625h5.25A1.12502 1.12502 0 0 0 9.75 9.75V6.375a1.12504 1.12504 0 0 0-.3295-.7955A1.12504 1.12504 0 0 0 8.625 5.25h-5.25a1.12504 1.12504 0 0 0-.7955.3295 1.12504 1.12504 0 0 0-.3295.7955V9.75a1.12502 1.12502 0 0 0 1.125 1.125Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>Private by default</p>
                </li>
                <li>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.25 5.75L5.75 7.25L8.25 4.75"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.5 9.00024L1.565 2.45674C1.54721 2.33218 1.57723 2.20551 1.64902 2.10218C1.72082 1.99885 1.82906 1.92652 1.952 1.89974L5.783 1.04824C5.92592 1.01647 6.07408 1.01647 6.217 1.04824L10.048 1.90024C10.303 1.95674 10.472 2.19824 10.435 2.45724L9.5 9.00024C9.465 9.24774 9.25 10.7502 6 10.7502C2.75 10.7502 2.535 9.24774 2.5 9.00024Z"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p>Enterprise grade security</p>
                </li>
                <li>
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5295 7.7605a1.49993 1.49993 0 0 1 1.5994-.05829c.2449.14228.4445.35098.5758.60197.1312.251.1887.53402.1658.81632A4.54687 4.54687 0 0 1 9 9.36a2.98726 2.98726 0 0 0-.4705-1.599A2.99757 2.99757 0 0 0 6 6.375a2.99752 2.99752 0 0 0-2.529 1.386m5.5285 1.5985L9 9.375c0 .1125-.006.2235-.0185.333A5.97134 5.97134 0 0 1 6 10.5c-1.085 0-2.1035-.288-2.9815-.792A3.03237 3.03237 0 0 1 3 9.3595m0 0a4.49077 4.49077 0 0 1-1.8695-.2385 1.50002 1.50002 0 0 1 2.3405-1.36M3 9.3595c.0018-.56664.16581-1.12107.471-1.5985M7.5 3.375a1.50002 1.50002 0 0 1-1.5 1.5 1.50002 1.50002 0 0 1-1.5-1.5 1.50002 1.50002 0 0 1 1.5-1.5 1.50002 1.50002 0 0 1 1.5 1.5Zm3 1.5c0 .14774-.0291.29403-.0856.43052a1.12563 1.12563 0 0 1-.2439.36498 1.12493 1.12493 0 0 1-1.22602.24386 1.12504 1.12504 0 0 1-.36498-.24386 1.12504 1.12504 0 0 1 0-1.591 1.12504 1.12504 0 0 1 1.591 0c.211.21098.3295.49713.3295.7955Zm-6.75 0a1.12493 1.12493 0 0 1-.3295.7955 1.12504 1.12504 0 0 1-1.83486-.36498 1.12493 1.12493 0 0 1 .24387-1.22602A1.125 1.125 0 0 1 3.75 4.875Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p>Org and team level permissions</p>
                </li>
                <li>
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.182 9.18203a4.50009 4.50009 0 0 0 0-6.364 4.50003 4.50003 0 0 0-6.364 0m6.364 6.364C8.33808 10.0259 7.19348 10.5001 6 10.5001c-1.19348 0-2.33808-.4742-3.182-1.31807a4.50003 4.50003 0 0 1 0-6.364m6.364 6.364-6.364-6.364"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p>Restrict recordings by domain</p>
                </li>
                <li>
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.25 5.25V3.375A2.24999 2.24999 0 0 0 6 1.125a2.24999 2.24999 0 0 0-2.25 2.25V5.25m-.375 5.625h5.25A1.12502 1.12502 0 0 0 9.75 9.75V6.375a1.12504 1.12504 0 0 0-.3295-.7955A1.12504 1.12504 0 0 0 8.625 5.25h-5.25a1.12504 1.12504 0 0 0-.7955.3295 1.12504 1.12504 0 0 0-.3295.7955V9.75a1.12502 1.12502 0 0 0 1.125 1.125Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p>Bring your own bucket</p>
                </li>
              </ul>
            </div>

            <div className={s.backgroundWrapper} ref={bgWrapperRef}>
              <BackgroundSvg isTablet={!!isTablet} />
            </div>

            <Link passHref href="/" aria-label="Go to" className={s.cta}>
              <svg
                width="20"
                height="20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 3.75v12.5M16.25 10H3.75"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <div className={s.card}>
            <div className={s.content}>
              <p className={s.title}>
                Replay.io’s recorder is designed to be runtime{' '}
                <span>and platform agnostic.</span>
              </p>
              <ul className={s.list}>
                <li>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_4063_173712)">
                      <path
                        d="M10.2259 1.72235C9.85981 1.34682 9.44191 1.02557 8.98489 0.76835C8.47189 0.49835 7.54889 0.04635 6.23839 0.01585C5.87139 0.00735002 5.50989 0.03085 5.15139 0.08785C4.79139 0.14485 4.45239 0.23385 4.09239 0.36785C3.58389 0.55635 3.09439 0.85535 2.80539 1.14485C3.09689 0.97035 3.54339 0.77835 4.08039 0.64885C4.69127 0.505217 5.32361 0.476898 5.94489 0.56535C7.11539 0.73535 8.03389 1.25585 8.68489 1.87785C8.93409 2.11367 9.15219 2.38032 9.33389 2.67135C10.0679 3.86235 9.99889 5.35935 9.42589 6.24235C9.00089 6.89835 8.09089 7.51435 7.24089 7.50735C6.94939 7.49585 6.52189 7.43135 6.11589 7.22435C4.80139 6.55285 4.60539 4.88035 5.55689 4.07135C5.24089 4.00335 4.64689 4.13635 4.23389 4.75285C3.86289 5.30635 3.88389 6.16085 4.11289 6.76685C3.96643 6.46806 3.86693 6.14847 3.81789 5.81935C3.72242 5.17126 3.79402 4.50953 4.02589 3.89685C4.18932 3.46094 4.42568 3.056 4.72489 2.69935C5.17289 2.16485 5.67889 1.83935 6.09989 1.69685C5.82989 1.46135 5.39439 1.32785 4.88939 1.31335C4.15489 1.29135 3.16339 1.53035 2.34989 2.20485C1.94589 2.53979 1.61041 2.94964 1.36189 3.41185C1.13439 3.82985 1.01639 4.24135 1.01339 4.25085C1.07439 3.52835 1.36539 2.75385 1.63739 2.22335C1.24239 2.42985 0.723886 3.05735 0.432386 3.74435C0.0473861 4.68485 -0.100114 5.80385 0.0698861 6.99435C0.552886 9.82835 3.01989 11.9854 5.99139 11.9854C9.30989 11.9854 11.9999 9.29535 11.9999 5.97785C12.0013 5.1863 11.8452 4.40238 11.5406 3.67178C11.2361 2.94117 10.7891 2.27849 10.2259 1.72235Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4063_173712">
                        <rect width="12" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p>Firefox for Mac, Windows, Linux</p>
                </li>
                <li>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_4063_173716)">
                      <path
                        d="M6.00001 1.35444e-07C4.10501 1.35444e-07 2.41551 0.8785 1.31601 2.2505L3.29251 5.6745C3.37199 5.0123 3.6914 4.40219 4.19032 3.95957C4.68923 3.51695 5.33305 3.27252 6.00001 3.2725H11.3455C10.8427 2.28732 10.0774 1.46029 9.13403 0.882783C8.19069 0.305276 7.10608 -0.000234842 6.00001 1.35444e-07ZM0.965507 2.735C0.333652 3.70658 -0.00181937 4.84103 7.42118e-06 6C7.42118e-06 9.006 2.21001 11.4955 5.09451 11.932L7.07101 8.5085C6.45787 8.7707 5.76987 8.79897 5.13728 8.58795C4.5047 8.37694 3.97145 7.94129 3.63851 7.3635L0.965507 2.735ZM7.63651 3.818C8.17053 4.21757 8.53934 4.79923 8.67297 5.45266C8.80661 6.1061 8.69578 6.78585 8.36151 7.363L8.36251 7.3635H8.36151L5.68951 11.992C5.79251 11.997 5.89601 12 6.00001 12C9.31351 12 12 9.3135 12 6C12 5.23 11.855 4.4945 11.591 3.818H7.63651ZM6.00001 8.182C5.42131 8.182 4.86631 7.95211 4.4571 7.54291C4.0479 7.1337 3.81801 6.5787 3.81801 6C3.81801 5.4213 4.0479 4.8663 4.4571 4.45709C4.86631 4.04789 5.42131 3.818 6.00001 3.818C6.57871 3.818 7.13371 4.04789 7.54291 4.45709C7.95212 4.8663 8.18201 5.4213 8.18201 6C8.18201 6.5787 7.95212 7.1337 7.54291 7.54291C7.13371 7.95211 6.57871 8.182 6.00001 8.182Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4063_173716">
                        <rect width="12" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p>Chrome for Linux</p>
                </li>
                <li>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 3.6766V8.3236C10.5 8.37717 10.4857 8.42976 10.4585 8.47592C10.4314 8.52208 10.3923 8.56013 10.3455 8.5861L6.1455 10.9191C6.10098 10.9438 6.05091 10.9567 6 10.9567C5.94909 10.9567 5.89902 10.9438 5.8545 10.9191L1.6545 8.5861C1.60766 8.56013 1.56863 8.52208 1.54146 8.47592C1.51429 8.42976 1.49997 8.37717 1.5 8.3236V3.6766C1.50006 3.62312 1.51442 3.57064 1.54158 3.52457C1.56875 3.47851 1.60773 3.44054 1.6545 3.4146L5.8545 1.0811C5.89902 1.05641 5.94909 1.04346 6 1.04346C6.05091 1.04346 6.10098 1.05641 6.1455 1.0811L10.3455 3.4146C10.3923 3.44054 10.4313 3.47851 10.4584 3.52457C10.4856 3.57064 10.4999 3.62312 10.5 3.6766Z"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.76367 3.64716L5.85367 5.91916C5.89825 5.94394 5.94842 5.95694 5.99942 5.95694C6.05043 5.95694 6.10059 5.94394 6.14517 5.91916L10.2497 3.63916M5.99967 10.5002V6.00016"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p>Major CI environments</p>
                </li>
                <li>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_4063_173729)">
                      <path
                        d="M5.99871 11.9996C5.83821 11.9996 5.67821 11.9576 5.53771 11.8761L4.06971 11.0076C3.85071 10.8851 3.95771 10.8416 4.02971 10.8161C4.32221 10.7146 4.38121 10.6911 4.69371 10.5141C4.72621 10.4956 4.76921 10.5026 4.80271 10.5226L5.93071 11.1921C5.97171 11.2146 6.02921 11.2146 6.06671 11.1921L10.4642 8.65414C10.5052 8.63064 10.5312 8.58364 10.5312 8.53514V3.46014C10.5312 3.41064 10.5047 3.36414 10.4627 3.33914L6.06721 0.803137C6.02671 0.779637 5.97271 0.779637 5.93171 0.803137L1.53721 3.33964C1.49471 3.36414 1.46771 3.41214 1.46771 3.46014V8.53514C1.46771 8.58364 1.49471 8.62964 1.53721 8.65264L2.74171 9.34864C3.39521 9.67564 3.79571 9.29064 3.79571 8.90364V3.89314C3.79571 3.82214 3.85271 3.76664 3.92371 3.76664H4.48121C4.55071 3.76664 4.60871 3.82264 4.60871 3.89314V8.90364C4.60871 9.77614 4.13371 10.2761 3.30671 10.2761C3.05271 10.2761 2.85221 10.2761 2.29371 10.0006L1.13971 9.33714C0.854711 9.17264 0.678711 8.86464 0.678711 8.53514V3.46014C0.678711 3.13064 0.855211 2.82264 1.13971 2.65864L5.53721 0.117637C5.81571 -0.0398633 6.18521 -0.0398633 6.46121 0.117637L10.8582 2.65864C11.1432 2.82314 11.3202 3.13064 11.3202 3.46014V8.53514C11.3202 8.86464 11.1432 9.17164 10.8582 9.33714L6.46121 11.8761C6.32121 11.9576 6.16171 11.9996 5.99871 11.9996ZM9.54921 6.99614C9.54921 6.04614 8.90721 5.79314 7.55571 5.61464C6.19021 5.43414 6.05121 5.34064 6.05121 5.02114C6.05121 4.75714 6.16871 4.40464 7.18021 4.40464C8.08371 4.40464 8.41671 4.59914 8.55371 5.20814C8.56571 5.26564 8.61821 5.30764 8.67721 5.30764H9.24771C9.28321 5.30764 9.31671 5.29214 9.34071 5.26714C9.36471 5.24014 9.37771 5.20564 9.37421 5.16914C9.28571 4.12014 8.58871 3.63114 7.18021 3.63114C5.92621 3.63114 5.17821 4.16014 5.17821 5.04764C5.17821 6.01014 5.92221 6.27614 7.12571 6.39514C8.56571 6.53614 8.67721 6.74664 8.67721 7.02964C8.67721 7.52114 8.28271 7.73064 7.35621 7.73064C6.19271 7.73064 5.93671 7.43864 5.85071 6.85964C5.84071 6.79764 5.78771 6.75214 5.72421 6.75214H5.15571C5.08521 6.75214 5.02871 6.80814 5.02871 6.87864C5.02871 7.61964 5.43171 8.50264 7.35621 8.50264C8.75021 8.50314 9.54921 7.95464 9.54921 6.99614Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4063_173729">
                        <rect width="12" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p>Node for Mac, and Linux in beta.</p>
                </li>
              </ul>
            </div>

            <div className={s.marqueeContainer}>
              <Marquee
                speed={30}
                direction={isTablet ? 'right' : 'down'}
                className={s.marquee}
                autoFill
              >
                {brands.map((brand, idx) => (
                  <div className={s.imageWrapper} key={idx}>
                    {brand.logo}
                  </div>
                ))}
              </Marquee>
            </div>

            <Link passHref href="/" aria-label="Go to" className={s.cta}>
              <svg
                width="20"
                height="20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 3.75v12.5M16.25 10H3.75"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}

interface BackgroundSvgProps extends React.SVGProps<SVGSVGElement> {
  isTablet: boolean
}

const BackgroundSvg = ({ isTablet }: BackgroundSvgProps) => {
  const timeline = useRef(
    gsap.timeline({
      repeat: -1,
      repeatDelay: 0,
      defaults: { duration: 1.5, ease: 'power1.inOut' }
    })
  )
  const svgRef = useRef(null)
  const gradientMidTop = useRef(null)
  const gradientLeftTop = useRef(null)
  const gradientRightTop = useRef(null)
  const gradientMidBottom = useRef(null)
  const gradientLeftBottom = useRef(null)
  const gradientRightBottom = useRef(null)

  useIsomorphicLayoutEffect(() => {
    const tl = timeline.current
    const gmt = gradientMidTop.current
    const glt = gradientLeftTop.current
    const grt = gradientRightTop.current
    const gmb = gradientMidBottom.current
    const glb = gradientLeftBottom.current
    const grb = gradientRightBottom.current
    const ctx = gsap.context(() => {
      tl.fromTo(
        gmt,
        {
          attr: {
            y1: -125,
            y2: 0
          }
        },
        { attr: { y1: 125, y2: 250 } }
      )
        .fromTo(
          gmb,
          {
            attr: {
              y1: 70,
              y2: 190
            }
          },
          { attr: { y1: 440, y2: 575 } },
          '<+=1'
        )
        .fromTo(
          glt,
          {
            attr: {
              y1: 0,
              y2: 0,
              x1: 0,
              x2: 0
            }
          },
          { attr: { y1: 125, y2: 250, x1: 0, x2: 50 } }
        )
        .fromTo(
          glb,
          {
            attr: {
              y1: 190,
              y2: 190,
              x1: 50,
              x2: 50
            }
          },
          { attr: { y1: 315, y2: 490, x1: 50, x2: 0 } },
          '<+=1'
        )
        .fromTo(
          grt,
          {
            attr: {
              y1: 0,
              y2: 0,
              x1: 92,
              x2: 92
            }
          },
          { attr: { y1: 125, y2: 250, h1: 92, x2: 42 } }
        )
        .fromTo(
          grb,
          {
            attr: {
              y1: 190,
              y2: 190,
              x1: 42,
              x2: 42
            }
          },
          { attr: { y1: 315, y2: 490, x1: 42, x2: 92 } },
          '<+=1'
        )
    }, svgRef)

    return () => {
      ctx.revert()
      ctx.kill()
    }
  }, [])
  return (
    <svg
      className={s.securityAnimation}
      ref={svgRef}
      viewBox="0 0 148 305"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle opacity=".8" cx="74" cy="153" r="74" fill="url(#a)" />
      <path
        d="M10 2v54.5c0 8.2843 6.7157 15 15 15h10.5c8.2843 0 15 6.7157 15 15v27"
        stroke="url(#b)"
        strokeWidth="2"
      />
      <path
        id="path-left-right"
        d="M10 2v54.5c0 8.2843 6.7157 15 15 15h10.5c8.2843 0 15 6.7157 15 15v27"
        stroke="url(#pulse-lt)"
        strokeWidth="2"
      />
      <path
        d="M134 304.5V250c0-8.284-6.716-15-15-15h-11.5c-8.2843 0-15-6.716-15-15v-27"
        stroke="url(#e)"
        strokeWidth="2"
        strokeDasharray="8 8"
      />
      <path
        id="path-right-bottom"
        d="M134 304.5V250c0-8.284-6.716-15-15-15h-11.5c-8.2843 0-15-6.716-15-15v-27"
        stroke="url(#pulse-rb)"
        strokeWidth="2"
        strokeDasharray="8 8"
      />
      <path
        d="M133.5 2v36.5c0 8.2843-6.716 15-15 15H108c-8.2843 0-15 6.7157-15 15v45"
        stroke="url(#f)"
        strokeWidth="2"
      />
      <path
        id="path-top-right"
        d="M133.5 2v36.5c0 8.2843-6.716 15-15 15H108c-8.2843 0-15 6.7157-15 15v45"
        stroke="url(#pulse-rt)"
        strokeWidth="2"
      />
      <path
        d="M10 304.5V269c0-8.284 6.7157-15 15-15h10.5c8.2843 0 15-6.716 15-15v-46"
        stroke="url(#g)"
        strokeWidth="2"
        strokeDasharray="8 8"
      />
      <path
        id="path-bottom-left"
        d="M10 304.5V269c0-8.284 6.7157-15 15-15h10.5c8.2843 0 15-6.716 15-15v-46"
        stroke="url(#pulse-lb)"
        strokeWidth="2"
        strokeDasharray="8 8"
      />
      <path d="M73.5 113V2" stroke="url(#h)" strokeWidth="2" />
      <path
        id="path-mid-top"
        d="M73.5 113V2"
        stroke="url(#pulse-mt)"
        strokeWidth="2"
      />

      <path
        d="M73 193.5v111"
        stroke="url(#k)"
        strokeWidth="2"
        strokeDasharray="8 8"
      />
      <path
        id="path-mid-bottom"
        d="M73 193.5v111"
        stroke="url(#pulse-mb)"
        strokeWidth="2"
        strokeDasharray="8 8"
      />
      <g
        className={s.lock}
        transform={isTablet ? 'rotate(90, 73, 153)' : undefined}
        filter="url(#l)"
      >
        <rect
          x="33"
          y="113"
          width="80"
          height="80"
          rx="8"
          fill="url(#m)"
          fillOpacity=".88"
        />
        <path
          d="M82 150v-7.5c0-2.387-.9482-4.676-2.636-6.364-1.6879-1.688-3.9771-2.636-6.364-2.636s-4.6761.948-6.364 2.636C64.9482 137.824 64 140.113 64 142.5v7.5m-1.5 22.5h21c1.1935 0 2.3381-.474 3.182-1.318.8439-.844 1.318-1.989 1.318-3.182v-13.5c0-1.193-.4741-2.338-1.318-3.182-.8439-.844-1.9885-1.318-3.182-1.318h-21c-1.1935 0-2.3381.474-3.182 1.318-.8439.844-1.318 1.989-1.318 3.182V168c0 1.193.4741 2.338 1.318 3.182.8439.844 1.9885 1.318 3.182 1.318Z"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M82 150v-7.5c0-2.387-.9482-4.676-2.636-6.364-1.6879-1.688-3.9771-2.636-6.364-2.636s-4.6761.948-6.364 2.636C64.9482 137.824 64 140.113 64 142.5v7.5m-1.5 22.5h21c1.1935 0 2.3381-.474 3.182-1.318.8439-.844 1.318-1.989 1.318-3.182v-13.5c0-1.193-.4741-2.338-1.318-3.182-.8439-.844-1.9885-1.318-3.182-1.318h-21c-1.1935 0-2.3381.474-3.182 1.318-.8439.844-1.318 1.989-1.318 3.182V168c0 1.193.4741 2.338 1.318 3.182.8439.844 1.9885 1.318 3.182 1.318Z"
          stroke="url(#n)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="33.5"
          y="113.5"
          width="79"
          height="79"
          rx="7.5"
          stroke="url(#o)"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M53 109h-5v2h-2v2h9v-2h-2v-2Z"
        fill="url(#p)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M76 109h-5v2h-2v2h9v-2h-2v-2Z"
        fill="url(#q)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M95 109h-5v2h-2v2h9v-2h-2v-2Z"
        fill="url(#r)"
      />
      <g filter="url(#s)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M53 109h-5v2h-2v2h9v-2h-2v-2Z"
          fill="url(#t)"
        />
      </g>
      <g filter="url(#u)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M53 197h-5v-2h-2v-2h9v2h-2v2Z"
          fill="url(#v)"
        />
      </g>
      <g filter="url(#w)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M76 109h-5v2h-2v2h9v-2h-2v-2Z"
          fill="url(#x)"
        />
      </g>
      <g filter="url(#y)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M76 197h-5v-2h-2v-2h9v2h-2v2Z"
          fill="url(#z)"
        />
      </g>
      <g filter="url(#A)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M95 109h-5v2h-2v2h9v-2h-2v-2Z"
          fill="url(#B)"
        />
      </g>
      <g filter="url(#C)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M95 197h-5v-2h-2v-2h9v2h-2v2Z"
          fill="url(#D)"
        />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1="50.5"
          y1="2"
          x2="50.4998"
          y2="114"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="1" stopColor="#1F2937" stopOpacity=".88" />
        </linearGradient>
        <linearGradient
          id="e"
          x1="93.5"
          y1="305"
          x2="93.5"
          y2="201"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1F2937" />
          <stop offset="1" stopColor="#1F2937" stopOpacity=".88" />
        </linearGradient>
        <linearGradient
          ref={gradientRightBottom}
          id="pulse-rb"
          x1="93.5"
          y1="305"
          x2="93.5"
          y2="201"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF" stopOpacity="0" />
          <stop offset=".20313" stopColor="#FFF" stopOpacity=".24" />
          <stop offset=".99" stopColor="#FFF" stopOpacity=".88" />
          <stop offset="1" stopColor="#FFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="f"
          x1="93"
          y1="2"
          x2="93.0002"
          y2="114"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="1" stopColor="#1F2937" stopOpacity=".88" />
        </linearGradient>
        <linearGradient
          id="g"
          x1="50.5"
          y1="305"
          x2="50.4998"
          y2="192.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1F2937" />
          <stop offset="1" stopColor="#1F2937" stopOpacity=".88" />
        </linearGradient>
        <linearGradient
          ref={gradientLeftBottom}
          id="pulse-lb"
          x1="50.5"
          y1="305"
          x2="50.4998"
          y2="192.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF" stopOpacity="0" />
          <stop offset=".20313" stopColor="#FFF" stopOpacity=".24" />
          <stop offset=".99" stopColor="#FFF" stopOpacity=".88" />
          <stop offset="1" stopColor="#FFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="h"
          x1="74.5"
          y1="2"
          x2="74.4929"
          y2="113.498"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="1" stopColor="#1F2937" stopOpacity=".88" />
        </linearGradient>
        <linearGradient
          ref={gradientMidTop}
          id="pulse-mt"
          y1="74.5"
          y2="74.4929"
          x1="74.5"
          x2="74.4929"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF" stopOpacity="0" />
          <stop offset=".20313" stopColor="#FFF" stopOpacity=".24" />
          <stop offset=".99" stopColor="#FFF" stopOpacity=".88" />
          <stop offset="1" stopColor="#FFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          ref={gradientLeftTop}
          id="pulse-lt"
          y1="74.5"
          y2="74.4929"
          x1="74.5"
          x2="74.4929"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF" stopOpacity="0" />
          <stop offset=".20313" stopColor="#FFF" stopOpacity=".24" />
          <stop offset=".99" stopColor="#FFF" stopOpacity=".88" />
          <stop offset="1" stopColor="#FFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          ref={gradientRightTop}
          id="pulse-rt"
          y1="74.5"
          y2="74.4929"
          x1="74.5"
          x2="74.4929"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF" stopOpacity="0" />
          <stop offset=".20313" stopColor="#FFF" stopOpacity=".24" />
          <stop offset=".99" stopColor="#FFF" stopOpacity=".88" />
          <stop offset="1" stopColor="#FFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="j"
          x1="74.5"
          y1="1"
          x2="74.4979"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity=".88" />
        </linearGradient>
        <linearGradient
          id="k"
          x1="74"
          y1="304.998"
          x2="73.9929"
          y2="193.002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1F2937" />
          <stop offset="1" stopColor="#1F2937" stopOpacity=".88" />
        </linearGradient>
        <linearGradient
          ref={gradientMidBottom}
          id="pulse-mb"
          x1="74"
          y1="304.998"
          x2="73.9929"
          y2="193.002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF" stopOpacity="0" />
          <stop offset=".20313" stopColor="#FFF" stopOpacity=".24" />
          <stop offset=".99" stopColor="#FFF" stopOpacity=".88" />
          <stop offset="1" stopColor="#FFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="m"
          x1="73"
          y1="113"
          x2="73"
          y2="193"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity=".88" />
          <stop offset="1" stopOpacity=".24" />
        </linearGradient>
        <linearGradient
          id="n"
          x1="73.1282"
          y1="133.5"
          x2="73.1282"
          y2="172.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1F2937" stopOpacity=".86" />
          <stop offset="1" stopColor="#1F2937" stopOpacity=".24" />
        </linearGradient>
        <linearGradient
          id="o"
          x1="73.3419"
          y1="113"
          x2="73.3418"
          y2="193"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1F2937" stopOpacity=".86" />
          <stop offset="1" stopColor="#1F2937" stopOpacity=".24" />
        </linearGradient>
        <linearGradient
          id="p"
          x1="50.5"
          y1="109"
          x2="50.5"
          y2="113"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset=".51042" stopColor="#202020" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="q"
          x1="73.5"
          y1="109"
          x2="73.5"
          y2="113"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset=".51042" stopColor="#202020" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="r"
          x1="92.5"
          y1="109"
          x2="92.5"
          y2="113"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset=".51042" stopColor="#202020" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="t"
          x1="50.5"
          y1="109"
          x2="50.5"
          y2="113"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1F2937" />
          <stop offset=".51042" stopColor="#273344" />
          <stop offset="1" stopColor="#1F2937" />
        </linearGradient>
        <linearGradient
          id="v"
          x1="50.5"
          y1="197"
          x2="50.5"
          y2="193"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1F2937" />
          <stop offset=".51042" stopColor="#273344" />
          <stop offset="1" stopColor="#1F2937" />
        </linearGradient>
        <linearGradient
          id="x"
          x1="73.5"
          y1="109"
          x2="73.5"
          y2="113"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1F2937" />
          <stop offset=".51042" stopColor="#273344" />
          <stop offset="1" stopColor="#1F2937" />
        </linearGradient>
        <linearGradient
          id="z"
          x1="73.5"
          y1="197"
          x2="73.5"
          y2="193"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1F2937" />
          <stop offset=".51042" stopColor="#273344" />
          <stop offset="1" stopColor="#1F2937" />
        </linearGradient>
        <linearGradient
          id="B"
          x1="92.5"
          y1="109"
          x2="92.5"
          y2="113"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1F2937" />
          <stop offset=".51042" stopColor="#273344" />
          <stop offset="1" stopColor="#1F2937" />
        </linearGradient>
        <linearGradient
          id="D"
          x1="92.5"
          y1="197"
          x2="92.5"
          y2="193"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1F2937" />
          <stop offset=".51042" stopColor="#273344" />
          <stop offset="1" stopColor="#1F2937" />
        </linearGradient>
        <filter
          id="i"
          x="72"
          y="0"
          width="3"
          height="48.5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            stdDeviation=".5"
            result="effect1_foregroundBlur_2851_88657"
          />
        </filter>
        <filter
          id="l"
          x="33"
          y="113"
          width="80"
          height="80"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 0.491667 0 0 0 0 0.491667 0 0 0 0 0.491667 0 0 0 0.25 0" />
          <feBlend in2="shape" result="effect1_innerShadow_2851_88657" />
        </filter>
        <filter
          id="s"
          x="46"
          y="108"
          width="9"
          height="5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation=".5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 0.211458 0 0 0 0 0.274392 0 0 0 0 0.3625 0 0 0 1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_2851_88657" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            in="SourceAlpha"
            result="effect2_innerShadow_2851_88657"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation=".5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend
            in2="effect1_innerShadow_2851_88657"
            result="effect2_innerShadow_2851_88657"
          />
        </filter>
        <filter
          id="u"
          x="46"
          y="192"
          width="9"
          height="5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation=".5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 0.211458 0 0 0 0 0.274392 0 0 0 0 0.3625 0 0 0 1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_2851_88657" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            in="SourceAlpha"
            result="effect2_innerShadow_2851_88657"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation=".5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend
            in2="effect1_innerShadow_2851_88657"
            result="effect2_innerShadow_2851_88657"
          />
        </filter>
        <filter
          id="w"
          x="69"
          y="108"
          width="9"
          height="5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation=".5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 0.211458 0 0 0 0 0.274392 0 0 0 0 0.3625 0 0 0 1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_2851_88657" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            in="SourceAlpha"
            result="effect2_innerShadow_2851_88657"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation=".5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend
            in2="effect1_innerShadow_2851_88657"
            result="effect2_innerShadow_2851_88657"
          />
        </filter>
        <filter
          id="y"
          x="69"
          y="192"
          width="9"
          height="5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation=".5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 0.211458 0 0 0 0 0.274392 0 0 0 0 0.3625 0 0 0 1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_2851_88657" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            in="SourceAlpha"
            result="effect2_innerShadow_2851_88657"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation=".5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend
            in2="effect1_innerShadow_2851_88657"
            result="effect2_innerShadow_2851_88657"
          />
        </filter>
        <filter
          id="A"
          x="88"
          y="108"
          width="9"
          height="5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation=".5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 0.211458 0 0 0 0 0.274392 0 0 0 0 0.3625 0 0 0 1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_2851_88657" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            in="SourceAlpha"
            result="effect2_innerShadow_2851_88657"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation=".5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend
            in2="effect1_innerShadow_2851_88657"
            result="effect2_innerShadow_2851_88657"
          />
        </filter>
        <filter
          id="C"
          x="88"
          y="192"
          width="9"
          height="5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation=".5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 0.211458 0 0 0 0 0.274392 0 0 0 0 0.3625 0 0 0 1 0" />
          <feBlend in2="shape" result="effect1_innerShadow_2851_88657" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            in="SourceAlpha"
            result="effect2_innerShadow_2851_88657"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation=".5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend
            in2="effect1_innerShadow_2851_88657"
            result="effect2_innerShadow_2851_88657"
          />
        </filter>
        <radialGradient
          id="a"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 77.7336 -74 0 74 153)"
        >
          <stop stopColor="#1F2937" />
          <stop offset=".5625" stopColor="#111827" />
          <stop offset="1" stopColor="#111827" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

type brandType = {
  name: string
  logo: React.ReactNode
}
const brands: brandType[] = [
  {
    name: 'Google',
    logo: <GoogleIcon />
  },
  {
    name: 'Mozilla',
    logo: <MozillaIcon />
  },
  {
    name: 'Node.js',
    logo: <NodeJsIcon />
  },
  {
    name: 'MacOS',
    logo: <MacOsIcon />
  },
  {
    name: 'Windows',
    logo: <WindowsIcon />
  },
  {
    name: 'Linux',
    logo: <LinuxIcon />
  }
]
