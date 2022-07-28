import React, { FC, useRef } from 'react'

import { animateScale, animateUnscale, useEnterExit } from './common'

export const Tutorials: FC<{ active: boolean }> = ({ active }) => {
  const ref = useRef(null)

  useEnterExit(
    ref,
    {
      enter: () => {
        if (ref.current) {
          return [animateScale(ref.current)]
        }

        return []
      },
      exit: () => {
        if (ref.current) {
          return [animateUnscale(ref.current, '.container, .grid')]
        }

        return []
      }
    },
    active
  )

  return (
    <svg
      style={{
        transform: 'translateY(6%)',
        overflow: 'visible',
        opacity: 0
      }}
      viewBox="0 0 598 587"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
    >
      <mask
        id="mask0_2308_10856"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="24"
        y="0"
        width="551"
        height="548"
      >
        <path
          fill="url(#paint0_radial_2308_10856)"
          d="M24 .111328h551v547.778H24z"
        />
      </mask>
      <g
        className="scale grid"
        mask="url(#mask0_2308_10856)"
        stroke="#fff"
        strokeWidth="2"
      >
        <path d="M24-2.03711h68.875v68.875H24zM92.875-2.03711h68.875v68.875H92.875zM161.75-2.03711h68.875v68.875H161.75zM230.625-2.03711H299.5v68.875h-68.875zM299.5-2.03711h68.875v68.875H299.5zM368.375-2.03711h68.875v68.875h-68.875zM437.25-2.03711h68.875v68.875H437.25zM506.125-2.03711H575v68.875h-68.875zM24 66.8379h68.875v68.875H24zM92.875 66.8379h68.875v68.875H92.875zM161.75 66.8379h68.875v68.875H161.75zM230.625 66.8379H299.5v68.875h-68.875zM299.5 66.8379h68.875v68.875H299.5zM368.375 66.8379h68.875v68.875h-68.875zM437.25 66.8379h68.875v68.875H437.25zM506.125 66.8379H575v68.875h-68.875zM24 135.713h68.875v68.875H24zM92.875 135.713h68.875v68.875H92.875zM161.75 135.713h68.875v68.875H161.75zM230.625 135.713H299.5v68.875h-68.875zM299.5 135.713h68.875v68.875H299.5zM368.375 135.713h68.875v68.875h-68.875zM437.25 135.713h68.875v68.875H437.25zM506.125 135.713H575v68.875h-68.875zM24 204.588h68.875v68.875H24zM92.875 204.588h68.875v68.875H92.875zM161.75 204.588h68.875v68.875H161.75zM230.625 204.588H299.5v68.875h-68.875zM299.5 204.588h68.875v68.875H299.5zM368.375 204.588h68.875v68.875h-68.875zM437.25 204.588h68.875v68.875H437.25zM506.125 204.588H575v68.875h-68.875zM24 273.463h68.875v68.875H24zM92.875 273.463h68.875v68.875H92.875zM161.75 273.463h68.875v68.875H161.75zM230.625 273.463H299.5v68.875h-68.875zM299.5 273.463h68.875v68.875H299.5zM368.375 273.463h68.875v68.875h-68.875zM437.25 273.463h68.875v68.875H437.25zM506.125 273.463H575v68.875h-68.875zM24 342.338h68.875v68.875H24zM92.875 342.338h68.875v68.875H92.875zM161.75 342.338h68.875v68.875H161.75zM230.625 342.338H299.5v68.875h-68.875zM299.5 342.338h68.875v68.875H299.5zM368.375 342.338h68.875v68.875h-68.875zM437.25 342.338h68.875v68.875H437.25zM506.125 342.338H575v68.875h-68.875zM24 411.213h68.875v68.875H24zM92.875 411.213h68.875v68.875H92.875zM161.75 411.213h68.875v68.875H161.75zM230.625 411.213H299.5v68.875h-68.875zM299.5 411.213h68.875v68.875H299.5zM368.375 411.213h68.875v68.875h-68.875zM437.25 411.213h68.875v68.875H437.25zM506.125 411.213H575v68.875h-68.875z" />
        <path d="M24 411.213h68.875v68.875H24zM92.875 411.213h68.875v68.875H92.875zM161.75 411.213h68.875v68.875H161.75zM230.625 411.213H299.5v68.875h-68.875zM299.5 411.213h68.875v68.875H299.5zM368.375 411.213h68.875v68.875h-68.875zM437.25 411.213h68.875v68.875H437.25zM506.125 411.213H575v68.875h-68.875zM24 480.088h68.875v68.875H24zM92.875 480.088h68.875v68.875H92.875zM161.75 480.088h68.875v68.875H161.75zM230.625 480.088H299.5v68.875h-68.875zM299.5 480.088h68.875v68.875H299.5zM368.375 480.088h68.875v68.875h-68.875zM437.25 480.088h68.875v68.875H437.25zM506.125 480.088H575v68.875h-68.875z" />
      </g>
      <g className="container">
        <g className="scale" filter="url(#filter0_d_2308_10856)">
          <rect
            x="92"
            y="100"
            width="346"
            height="276.268"
            rx="16"
            fill="#fff"
          />
          <circle
            cx="265"
            cy="221.905"
            r="46.8863"
            fill="#F41C52"
            fillOpacity=".2"
          />
          <path
            d="M301.337 221.904c0 20.069-16.269 36.337-36.337 36.337-20.068 0-36.337-16.268-36.337-36.337 0-20.068 16.269-36.337 36.337-36.337 20.068 0 36.337 16.269 36.337 36.337Z"
            fill="url(#paint1_linear_2308_10856)"
          />
          <path
            d="m280.238 222.491-22.271 13.479v-26.959l22.271 13.48Z"
            fill="#fff"
          />
          <path
            d="M110.754 321.273c0-1.325 1.074-2.398 2.398-2.398h303.696c1.324 0 2.397 1.073 2.397 2.398 0 1.324-1.073 2.397-2.397 2.397H113.152c-1.324 0-2.398-1.073-2.398-2.397Z"
            fill="#BEBEBE"
          />
          <path
            d="M110.754 321.273c0-1.325 1.074-2.398 2.398-2.398h177.422c1.324 0 2.398 1.073 2.398 2.398 0 1.324-1.074 2.397-2.398 2.397H113.152c-1.324 0-2.398-1.073-2.398-2.397Z"
            fill="#F41C52"
          />
          <path
            d="M297.767 321.271c0 3.09-2.505 5.595-5.594 5.595-3.09 0-5.595-2.505-5.595-5.595s2.505-5.594 5.595-5.594c3.089 0 5.594 2.504 5.594 5.594Z"
            fill="#F41C52"
          />
          <path
            d="M292.173 328.624c4.06 0 7.352-3.292 7.352-7.353s-3.292-7.352-7.352-7.352c-4.061 0-7.353 3.291-7.353 7.352s3.292 7.353 7.353 7.353Z"
            stroke="#F41C52"
            strokeOpacity=".2"
            strokeWidth="3.51648"
          />
          <path
            d="m151.514 347.811-13.187 7.613v-15.227l13.187 7.614Z"
            fill="#464646"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M172.693 345.965v-5.347h3.196v14.385h-3.196v-5.347l-9.99 5.768v-15.227l9.99 5.768ZM116.349 345.965v-5.347h-3.197v14.385h3.197v-5.347l9.99 5.768v-15.227l-9.99 5.768Z"
            fill="#464646"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M383.282 343.816h-15.984v9.591h15.984v-9.591Zm-15.984-1.598c-.883 0-1.599.715-1.599 1.598v9.591c0 .882.716 1.598 1.599 1.598h15.984c.882 0 1.598-.716 1.598-1.598v-9.591c0-.883-.716-1.598-1.598-1.598h-15.984ZM415.249 343.815h-15.984v9.591h15.984v-9.591Zm-15.984-1.598c-.882 0-1.598.715-1.598 1.598v9.591c0 .882.716 1.598 1.598 1.598h15.984c.883 0 1.599-.716 1.599-1.598v-9.591c0-.883-.716-1.598-1.599-1.598h-15.984Z"
            fill="#BEBEBE"
          />
          <path
            d="M352.912 348.611c0 4.414-3.578 7.992-7.992 7.992s-7.992-3.578-7.992-7.992 3.578-7.992 7.992-7.992 7.992 3.578 7.992 7.992ZM196.27 349.654v-4.878c0-.702.457-1.322 1.128-1.528l5.983-1.841c.811-.249 1.681.176 1.939.984 1.259 3.939 1.082 6.385.007 9.651-.264.805-1.135 1.231-1.945.981l-5.984-1.841c-.671-.206-1.128-.826-1.128-1.528Z"
            fill="#BEBEBE"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M209.431 354.785c-.65-.325-.908-1.115-.631-1.787 1.706-4.138 1.705-8.541.083-12.182-.296-.664-.083-1.466.548-1.826.631-.361 1.441-.144 1.748.515 2.079 4.465 2.041 9.8-.019 14.673-.284.67-1.079.932-1.729.607ZM216.01 347.098c.062-2.649-.522-5.413-1.997-8.997-.277-.672.02-1.45.685-1.744.664-.295 1.444.004 1.722.676 1.583 3.831 2.295 6.986 2.221 10.126-.072 3.089-.903 6.061-2.239 9.527-.261.678-1.03 1.004-1.704.731-.674-.272-.998-1.039-.737-1.718 1.28-3.33 1.987-5.959 2.049-8.601Z"
            fill="#BEBEBE"
          />
          <rect
            x="93"
            y="101"
            width="344"
            height="274.268"
            rx="15"
            stroke="url(#paint2_linear_2308_10856)"
            strokeWidth="2"
          />
        </g>
        <g className="scale" filter="url(#filter1_d_2308_10856)">
          <rect
            x="359"
            y="233"
            width="148.275"
            height="247.977"
            rx="15"
            fill="#fff"
          />
          <path
            d="M373.124 257.425c0-1.504 1.223-2.739 2.731-2.739h45.811c1.508 0 2.731 1.235 2.731 2.739 0 1.504-1.223 2.739-2.731 2.739h-45.811c-1.508 0-2.731-1.235-2.731-2.739Z"
            fill="#F41C52"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M373.124 278.92c0-2.006 1.63-3.632 3.641-3.632H489.51c2.011 0 3.641 1.626 3.641 3.632v103.509c0 2.005-1.63 3.631-3.641 3.631H376.765c-2.011 0-3.641-1.626-3.641-3.631V278.92Zm3.641-1.816c-1.005 0-1.82.813-1.82 1.816v103.509c0 1.003.815 1.815 1.82 1.815H489.51c1.005 0 1.821-.812 1.821-1.815V278.92c0-1.003-.816-1.816-1.821-1.816H376.765Z"
            fill="#BEBEBE"
          />
          <path
            d="M463.031 330.897c0 16.276-13.231 29.471-29.552 29.471-16.321 0-29.551-13.195-29.551-29.471 0-16.277 13.23-29.472 29.551-29.472 16.321 0 29.552 13.195 29.552 29.472Z"
            fill="url(#paint3_linear_2308_10856)"
          />
          <path
            d="M435.719 342.351V320.33h7.908v22.021h-7.908Zm-13.354 0V320.33h7.909v22.021h-7.909Z"
            fill="#fff"
          />
          <path
            d="M373.124 403.863c0-1.48 1.203-2.679 2.687-2.679h79.699c1.484 0 2.687 1.199 2.687 2.679 0 1.48-1.203 2.679-2.687 2.679h-79.699c-1.484 0-2.687-1.199-2.687-2.679ZM373.124 416.844c0-1.504 1.223-2.74 2.731-2.74h45.811c1.508 0 2.731 1.236 2.731 2.74 0 1.504-1.223 2.739-2.731 2.739h-45.811c-1.508 0-2.731-1.235-2.731-2.739Z"
            fill="#F41C52"
          />
          <path
            d="m442.652 449.836-16.791 8.894v-17.789l16.791 8.895Z"
            fill="#464646"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M468.222 447.543v-6.642h3.982v17.868h-3.982v-6.642l-12.442 7.164v-18.912l12.442 7.164ZM398.053 447.543v-6.642h-3.982v17.868h3.982v-6.642l12.442 7.164v-18.912l-12.442 7.164Z"
            fill="#464646"
          />
          <rect
            x="359"
            y="233"
            width="148.275"
            height="247.977"
            rx="15"
            stroke="url(#paint4_linear_2308_10856)"
            strokeWidth="2"
          />
        </g>
      </g>

      <defs>
        <linearGradient
          id="paint1_linear_2308_10856"
          x1="253.961"
          y1="263.979"
          x2="320.163"
          y2="222.237"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F41C52" />
          <stop offset="1" stopColor="#FF537E" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_2308_10856"
          x1="265"
          y1="100"
          x2="265"
          y2="376.268"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DCDCDC" />
          <stop offset="1" stopColor="#DCDCDC" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_2308_10856"
          x1="424.502"
          y1="365.022"
          x2="478.259"
          y2="331.035"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F41C52" />
          <stop offset="1" stopColor="#FF537E" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_2308_10856"
          x1="433.137"
          y1="232"
          x2="433.137"
          y2="481.977"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DCDCDC" />
          <stop offset="1" stopColor="#DCDCDC" stopOpacity="0" />
        </linearGradient>
        <filter
          id="filter0_d_2308_10856"
          x=".965172"
          y="54.4826"
          width="528.07"
          height="458.337"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="45.5174" />
          <feGaussianBlur stdDeviation="45.5174" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2308_10856"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2308_10856"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_2308_10856"
          x="268.296"
          y="187.148"
          width="329.683"
          height="429.385"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="44.8521" />
          <feGaussianBlur stdDeviation="44.8521" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2308_10856"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2308_10856"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_2308_10856"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 259.389 -260.915 0 299.5 263.259)"
        >
          <stop stopColor="#fff" />
          <stop offset=".519904" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}
