import { FC, useRef } from 'react'

import {
  animateScale,
  animateUnscale,
  animateWaves,
  useEnterExit
} from './common'

export const Stories: FC<{ active: boolean }> = ({ active }) => {
  const ref = useRef(null)

  useEnterExit(
    ref,
    {
      enter: () => {
        if (ref.current) {
          return [animateScale(ref.current), animateWaves(ref.current)]
        }

        return []
      },
      exit: () => {
        if (ref.current) {
          return [animateUnscale(ref.current, '.container, .wave')]
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
      viewBox="0 0 521 515"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
    >
      <path
        className="wave"
        d="M66.1532 230.805c-.0001 99.777 80.4078 180.652 179.5828 180.652 99.176 0 179.584-80.875 179.584-180.652 0-99.777-80.408-180.6517-179.584-180.6517-99.175 0-179.5828 80.8747-179.5828 180.6517Z"
        stroke="url(#paint0_linear_2322_6328)"
        strokeWidth="2"
      />
      <path
        className="wave"
        d="M17.0001 230.805c0 126.922 102.4129 229.804 228.7359 229.804s228.736-102.882 228.736-229.804S372.059.999991 245.736.99998C119.413.999969 17.0001 103.883 17.0001 230.805Z"
        stroke="url(#paint1_linear_2322_6328)"
        strokeWidth="2"
      />
      <g className="container">
        <g className="scale">
          <rect
            x="4"
            y="66"
            width="75"
            height="75"
            rx="37.5"
            fill="url(#pattern0)"
          />
          <circle
            cx="65.875"
            cy="132.876"
            r="9.625"
            fill="url(#paint2_linear_2322_6328)"
            stroke="#fff"
            strokeWidth="3"
          />
          <g filter="url(#filter0_d_2322_6328)">
            <path
              d="M97 70c0-2.2091 1.7909-4 4-4h188.21c8.837 0 16 7.1634 16 16v42.717c0 8.837-7.163 16-16 16H113c-8.837 0-16-7.163-16-16V70Z"
              fill="#fff"
            />
            <path
              d="M121 92.6793C121 91.1995 122.203 90 123.687 90h154.836c1.484 0 2.687 1.1995 2.687 2.6793 0 1.4797-1.203 2.6792-2.687 2.6792H123.687c-1.484 0-2.687-1.1995-2.687-2.6792ZM121 114.038c0-1.48 1.203-2.68 2.687-2.68h80.336c1.484 0 2.687 1.2 2.687 2.68 0 1.479-1.203 2.679-2.687 2.679h-80.336c-1.484 0-2.687-1.2-2.687-2.679Z"
              fill="#BEBEBE"
            />
            <path
              d="M98 70c0-1.6569 1.3431-3 3-3h188.21c8.284 0 15 6.7157 15 15v42.717c0 8.284-6.716 15-15 15H113c-8.284 0-15-6.716-15-15V70Z"
              stroke="url(#paint3_linear_2322_6328)"
              strokeWidth="2"
            />
          </g>
        </g>
        <g className="scale">
          <g filter="url(#filter1_d_2322_6328)">
            <path
              d="M97 168.717c0-2.209 1.7909-4 4-4h307c8.837 0 16 7.163 16 16v174c0 8.836-7.163 16-16 16H113c-8.837 0-16-7.164-16-16v-186Z"
              fill="#fff"
            />
            <circle
              cx="260.5"
              cy="254.017"
              r="46.8863"
              fill="#F41C52"
              fillOpacity=".2"
            />
            <path
              d="M296.837 254.017c0 20.068-16.269 36.337-36.337 36.337-20.068 0-36.337-16.269-36.337-36.337 0-20.069 16.269-36.337 36.337-36.337 20.068 0 36.337 16.268 36.337 36.337Z"
              fill="url(#paint4_linear_2322_6328)"
            />
            <path
              d="m275.738 254.603-22.271 13.48v-26.96l22.271 13.48Z"
              fill="#fff"
            />
            <path
              d="M137 338.446c0-1.38.859-2.5 1.92-2.5h243.16c1.061 0 1.92 1.12 1.92 2.5 0 1.381-.859 2.5-1.92 2.5H138.92c-1.061 0-1.92-1.119-1.92-2.5Z"
              fill="#BEBEBE"
            />
            <path
              d="M137 338.499c0-1.324 1.073-2.397 2.398-2.397H316.82c1.324 0 2.397 1.073 2.397 2.397 0 1.324-1.073 2.398-2.397 2.398H139.398c-1.325 0-2.398-1.074-2.398-2.398Z"
              fill="#F41C52"
            />
            <path
              d="M324.012 338.498c0 3.089-2.504 5.594-5.594 5.594-3.09 0-5.595-2.505-5.595-5.594 0-3.09 2.505-5.595 5.595-5.595s5.594 2.505 5.594 5.595Z"
              fill="#F41C52"
            />
            <path
              d="M318.418 345.85c4.061 0 7.353-3.292 7.353-7.352 0-4.061-3.292-7.353-7.353-7.353s-7.353 3.292-7.353 7.353c0 4.06 3.292 7.352 7.353 7.352Z"
              stroke="#F41C52"
              strokeOpacity=".2"
              strokeWidth="3.51648"
            />
            <path
              d="M200.189 338.707c0 3.089-2.505 5.594-5.595 5.594-3.089 0-5.594-2.505-5.594-5.594 0-3.09 2.505-5.595 5.594-5.595 3.09 0 5.595 2.505 5.595 5.595ZM247.189 338.708c0 3.089-2.505 5.594-5.595 5.594-3.089 0-5.594-2.505-5.594-5.594 0-3.09 2.505-5.595 5.594-5.595 3.09 0 5.595 2.505 5.595 5.595Z"
              fill="#F41C52"
            />
            <path
              d="M98 168.717c0-1.657 1.3431-3 3-3h307c8.284 0 15 6.716 15 15v174c0 8.284-6.716 15-15 15H113c-8.284 0-15-6.716-15-15v-186Z"
              stroke="url(#paint5_linear_2322_6328)"
              strokeWidth="2"
            />
          </g>
          <rect
            x="413"
            y="333"
            width="75"
            height="75"
            rx="37.5"
            fill="url(#pattern1)"
          />
          <circle
            cx="474.875"
            cy="399.875"
            r="9.625"
            fill="url(#paint6_linear_2322_6328)"
            stroke="#fff"
            strokeWidth="3"
          />
          <path
            d="m411.788 309.241 16.634 9.007c1.243.673 1.051 2.513-.304 2.916l-7.564 2.25c-.341.102-.637.314-.842.603l-4.16 5.865c-.815 1.149-2.612.745-2.857-.643l-3.226-18.328c-.23-1.307 1.151-2.302 2.319-1.67Z"
            fill="url(#paint7_linear_2322_6328)"
            stroke="#FAFAFA"
            strokeWidth="2"
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2322_6328"
          x1="245.076"
          y1="35.3736"
          x2="245.076"
          y2="420.146"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset=".690859" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2322_6328"
          x1="244.896"
          y1="-17.5083"
          x2="244.896"
          y2="471.378"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset=".690859" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_2322_6328"
          x1="66.2719"
          y1="124.751"
          x2="84.611"
          y2="133.712"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F41C52" />
          <stop offset="1" stopColor="#FF537E" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_2322_6328"
          x1="201.105"
          y1="66"
          x2="201.105"
          y2="140.717"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DCDCDC" />
          <stop offset="1" stopColor="#DCDCDC" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_2322_6328"
          x1="249.461"
          y1="296.091"
          x2="315.663"
          y2="254.35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F41C52" />
          <stop offset="1" stopColor="#FF537E" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_2322_6328"
          x1="260.5"
          y1="164.717"
          x2="260.5"
          y2="370.717"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DCDCDC" />
          <stop offset="1" stopColor="#DCDCDC" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_2322_6328"
          x1="469.629"
          y1="388.989"
          x2="474.875"
          y2="426.932"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#03A2FD" />
          <stop offset="1" stopColor="#70CBFF" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_2322_6328"
          x1="412.901"
          y1="300.047"
          x2="437.681"
          y2="348.974"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#03A2FD" />
          <stop offset="1" stopColor="#70CBFF" />
        </linearGradient>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_2322_6328" transform="scale(.005)" />
        </pattern>
        <pattern
          id="pattern1"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image1_2322_6328" transform="scale(.005)" />
        </pattern>
        <filter
          id="filter0_d_2322_6328"
          x=".904305"
          y="17.9522"
          width="400.401"
          height="266.908"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="48.0478" />
          <feGaussianBlur stdDeviation="48.0478" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2322_6328"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2322_6328"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_2322_6328"
          x=".904305"
          y="116.669"
          width="519.191"
          height="398.191"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="48.0478" />
          <feGaussianBlur stdDeviation="48.0478" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2322_6328"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2322_6328"
            result="shape"
          />
        </filter>
        <image
          id="image0_2322_6328"
          width="200"
          height="200"
          href="/images/home/avatar-1.webp"
        />
        <image
          id="image1_2322_6328"
          width="200"
          height="200"
          href="/images/home/avatar-1.webp"
        />
      </defs>
    </svg>
  )
}

export default Stories
