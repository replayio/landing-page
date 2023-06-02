import { forwardRef } from 'react'

import { useDeviceDetect } from '~/hooks/use-device-detect'

import s from './grid-3d.module.scss'

const GridSvg = () => {
  const { isDesktop, isSafari } = useDeviceDetect()

  const loadHeavyFilters = isDesktop && !isSafari

  return (
    <svg
      className={s['grid']}
      viewBox="0 0 1497 1409"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath={loadHeavyFilters ? 'url(#clip0_1451_459)' : undefined}>
        <g filter={loadHeavyFilters ? 'url(#filter0_ddd_1451_459)' : undefined}>
          <path
            d="M264.5 1V1409M352.5 1V1409M440.5 1V1409M0.5 1L0.499901 1409M88.5 1V1409M176.5 1V1409M1320.5 1V1409M1408.5 1V1409M1496.5 1V1409M1056.5 1V1409M1144.5 1V1409M1232.5 1V1409M792.5 1V1409M880.5 1V1409M968.5 1V1409M528.5 1V1409M616.5 1V1409M704.5 1V1409M0 1232.5H1497M0 1144.5H1497M0 1056.5H1497M0 1320.5H1497M0 176.5H1497M0 88.5H1497M0 0.5L1497 0.500099M0 440.5H1497M0 352.5H1497M0 264.5H1497M0 704.5H1497M0 616.5H1497M0 528.5H1497M0 968.5H1497M0 880.5H1497M0 792.5H1497"
            stroke="#F41C52"
            strokeWidth={loadHeavyFilters ? 1 : 2}
          />
        </g>
        <path
          opacity="0.4"
          d="M1497 0H0V1409H1497V0Z"
          fill="url(#paint0_linear_1451_459)"
        />
      </g>
      <defs>
        <filter
          id="filter0_ddd_1451_459"
          x="-16.0001"
          y="-16"
          width="1529"
          height="1441"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1451_459"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_1451_459"
            result="effect2_dropShadow_1451_459"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.3875 0 0 0 0 0.894397 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_1451_459"
            result="effect3_dropShadow_1451_459"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_1451_459"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1451_459"
          x1="748.5"
          y1="0"
          x2="748.5"
          y2="1409"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#111827" stopOpacity="0" />
          <stop offset="0.302083" stopColor="#111827" stopOpacity="0.48" />
          <stop offset="0.786458" stopColor="#111827" stopOpacity="0.8" />
          <stop offset="1" stopColor="#111827" stopOpacity="0" />
        </linearGradient>
        <clipPath id="clip0_1451_459">
          <rect width="1497" height="1409" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const Grid3D = forwardRef<HTMLDivElement, unknown>((_, ref) => {
  return (
    /* Gives perspective */
    <div className={s['container']}>
      {/* Gives rotation */}
      <div className={s['rotate']}>
        {/* Gives y displace control */}
        <div className={s['y-group-control']} ref={ref}>
          <GridSvg />
          <GridSvg />
        </div>
      </div>
    </div>
  )
})
