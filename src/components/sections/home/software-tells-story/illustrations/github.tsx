import { forwardRef, useImperativeHandle, useRef } from 'react'

import {
  animateScale,
  animateUnscale,
  animateWaves,
  AnimationFunction,
  clearProps
} from './common'

export const Github = forwardRef<
  { enter: AnimationFunction; exit: AnimationFunction },
  any
>((_, externalRef) => {
  const ref = useRef(null)

  useImperativeHandle(
    externalRef,
    () => {
      let entranceTimelines: gsap.core.Tween[]
      let exitTimelines: gsap.core.Tween[]

      const enter = () => {
        if (ref.current) {
          exitTimelines?.forEach((tl) => {
            clearProps(tl.targets())
            tl.kill()
          })

          entranceTimelines = [
            animateScale(ref.current),
            animateWaves(ref.current)
          ]

          return entranceTimelines
        }

        return []
      }

      const exit = () => {
        if (ref.current) {
          entranceTimelines?.forEach((tl) => tl.kill())

          exitTimelines = [animateUnscale(ref.current, '.container, .wave')]

          return exitTimelines
        }

        return []
      }

      return {
        enter,
        exit
      }
    },
    []
  )

  return (
    <svg
      style={{ transform: 'translateY(6%)', overflow: 'visible' }}
      viewBox="0 0 492 527"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
    >
      <path
        d="M66.1532 230.805c-.0001 99.777 80.4078 180.652 179.5828 180.652 99.176 0 179.584-80.875 179.584-180.652 0-99.777-80.408-180.6517-179.584-180.6517-99.175 0-179.5828 80.8747-179.5828 180.6517Z"
        stroke="url(#paint0_linear_2475_6504)"
        strokeWidth="2"
        className="wave"
      />
      <path
        className="wave"
        d="M17.0001 230.805c0 126.922 102.4129 229.804 228.7359 229.804s228.736-102.882 228.736-229.804S372.059.999991 245.736.99998C119.413.999969 17.0001 103.883 17.0001 230.805Z"
        stroke="url(#paint1_linear_2475_6504)"
        strokeWidth="2"
      />
      <g className="container">
        <g className="scale" filter="url(#filter0_d_2475_6504)">
          <rect
            className="scale"
            x="97"
            y="79"
            width="298"
            height="303.072"
            rx="16"
            fill="#fff"
            stroke="url(#paint2_linear_2475_6504)"
            strokeWidth="2"
          />
          <path
            className="scale"
            d="M246 136.864c-31.152 0-56.417 25.261-56.417 56.418 0 24.927 16.163 46.074 38.584 53.535 2.817.522 3.729-1.227 3.729-2.713v-10.503c-15.694 3.414-18.961-6.657-18.961-6.657-2.567-6.521-6.267-8.256-6.267-8.256-5.12-3.502.39-3.427.39-3.427 5.665.395 8.646 5.816 8.646 5.816 5.03 8.622 13.197 6.13 16.417 4.687.503-3.644 1.966-6.135 3.583-7.541-12.53-1.434-25.703-6.272-25.703-27.884 0-6.164 2.205-11.195 5.811-15.144-.583-1.424-2.515-7.165.55-14.932 0 0 4.739-1.513 15.52 5.783 4.499-1.25 9.323-1.876 14.118-1.899 4.795.023 9.624.649 14.133 1.899 10.771-7.296 15.5-5.783 15.5-5.783 3.07 7.772 1.138 13.512.555 14.932 3.62 3.949 5.806 8.985 5.806 15.144 0 21.669-13.197 26.441-25.759 27.837 2.022 1.749 3.869 5.181 3.869 10.447v15.481c0 1.5.903 3.263 3.766 2.709 22.403-7.471 38.547-28.614 38.547-53.531 0-31.157-25.26-56.418-56.417-56.418Z"
            fill="#464646"
          />
          <path
            className="scale"
            stroke="#BEBEBE"
            strokeWidth="2"
            d="M290.476 271.062h-88.952"
          />
          <path
            className="scale"
            d="M198.816 317.384c2.178 0 4.026-1.122 4.686-2.772v2.596h2.068v-5.456c0-1.65-1.452-2.596-2.662-2.596h-3.916v1.848h3.344c.638 0 1.034.418 1.034 1.012 0 2.002-2.134 3.41-4.488 3.41-3.014 0-5.236-2.156-5.236-5.918s2.222-5.852 5.258-5.852c2.266 0 4.026 1.298 4.334 3.168h2.376c-.308-3.036-3.08-5.192-6.71-5.192-3.894 0-7.546 2.618-7.546 7.876 0 5.258 3.608 7.876 7.458 7.876Zm8.434-15.906v2.684h2.376v-2.684h-2.376Zm.132 15.73h2.134V306.12h-2.134v11.088Zm5.45-14.564v3.476h-2.266v1.848h2.266v5.61c0 2.266 1.43 3.63 3.674 3.63h1.738v-1.848h-1.562c-1.078 0-1.716-.66-1.716-1.848v-5.544h3.278v-1.848h-3.278v-3.476h-2.134Zm6.961 14.564h2.134v-6.006c0-1.936 1.232-3.344 2.97-3.344 1.562 0 2.596 1.188 2.596 2.948v6.402h2.134v-6.82c0-2.64-1.628-4.444-4.136-4.444-1.65 0-2.97.748-3.564 2.134v-6.6h-2.134v15.73Zm21.632-11.088h-2.134v6.006c0 1.936-1.232 3.344-2.97 3.344-1.562 0-2.596-1.188-2.596-2.948v-6.402h-2.134v6.82c0 2.64 1.628 4.444 4.136 4.444 1.65 0 2.97-.748 3.564-2.134v1.958h2.134V306.12Zm7.795 11.264c3.41 0 5.324-2.42 5.324-5.72s-1.914-5.72-5.302-5.72c-1.518 0-2.86.726-3.498 1.804v-6.27h-2.134v15.73h2.134v-1.65c.638 1.1 2.002 1.826 3.476 1.826Zm-.242-1.87c-2.068 0-3.41-1.54-3.41-3.85s1.342-3.85 3.41-3.85c2.046 0 3.41 1.54 3.41 3.85s-1.364 3.85-3.41 3.85Zm6.652-.682v2.376h2.354v-2.376h-2.354Zm8.921 2.552c2.816 0 4.796-1.584 5.148-3.916h-2.112c-.352 1.254-1.474 2.046-2.992 2.046-2.2 0-3.322-1.716-3.322-3.85 0-2.134 1.1-3.85 3.322-3.85 1.496 0 2.772.924 2.97 2.178h2.134c-.308-2.508-2.552-4.048-5.148-4.048-3.498 0-5.5 2.662-5.5 5.72s2.002 5.72 5.5 5.72Zm11.592 0c3.322 0 5.698-2.398 5.698-5.72 0-3.322-2.376-5.72-5.698-5.72-3.322 0-5.72 2.398-5.72 5.72 0 3.322 2.398 5.72 5.72 5.72Zm0-1.87c-2.112 0-3.542-1.584-3.542-3.85s1.43-3.85 3.542-3.85c2.09 0 3.52 1.584 3.52 3.85s-1.43 3.85-3.52 3.85Zm7.127 1.694h2.134v-6.446c0-1.76 1.012-2.948 2.706-2.948 1.452 0 2.332 1.188 2.332 2.948v6.446h2.134v-6.446c0-1.76 1.012-2.948 2.706-2.948 1.474 0 2.354 1.188 2.354 2.948v6.446h2.134v-7.04c0-2.574-1.496-4.224-3.894-4.224-1.716 0-3.168 1.012-3.608 2.266-.44-1.452-1.782-2.266-3.586-2.266-1.628 0-2.816.902-3.278 2.156v-1.98h-2.134v11.088Z"
            fill="#464646"
          />
        </g>
        <g className="scale" filter="url(#filter1_d_2475_6504)">
          <circle
            cx="245.5"
            cy="374.5"
            r="37.5"
            fill="url(#paint3_linear_2475_6504)"
          />
          <circle
            cx="245.5"
            cy="374.5"
            r="39.5"
            stroke="#fff"
            strokeWidth="4"
          />
        </g>
        <path
          className="scale"
          d="m248.728 363.238-6.478-3.747-6.478-3.747c-.281-.163-.6-.248-.924-.248-.324 0-.643.086-.924.248-.281.163-.514.396-.676.678-.162.281-.248.6-.248.925v14.988c0 .325.086.645.248.926s.395.515.676.678c.281.162.6.248.924.248.324 0 .643-.086.924-.248l6.478-3.747 6.478-3.747c.281-.163.515-.396.677-.678.162-.281.247-.601.247-.926 0-.325-.085-.644-.247-.925-.162-.282-.396-.516-.677-.678ZM248.728 384.11l-6.478-3.747-6.478-3.747c-.281-.162-.6-.248-.924-.248-.324 0-.643.086-.924.248-.281.163-.514.396-.676.678-.162.281-.248.6-.248.925v14.988c0 .325.086.645.248.926s.395.515.676.678c.281.162.6.248.924.248.324 0 .643-.086.924-.248l6.478-3.747 6.478-3.747c.281-.163.515-.396.677-.678.162-.281.247-.601.247-.926 0-.325-.085-.644-.247-.925-.162-.282-.396-.516-.677-.678ZM267.203 373.674l-6.478-3.747-6.479-3.747c-.281-.162-.599-.247-.924-.247-.324 0-.643.085-.923.248-.281.162-.515.396-.677.677-.162.282-.248.601-.248.926v14.988c0 .325.086.644.248.925.162.282.396.515.677.678.28.162.599.248.923.248.325 0 .643-.085.924-.248l6.479-3.747 6.478-3.747c.281-.162.514-.396.676-.677.162-.282.248-.601.248-.926 0-.325-.086-.644-.248-.926-.162-.281-.395-.515-.676-.678Z"
          fill="#fff"
        />
      </g>

      <defs>
        <linearGradient
          id="paint0_linear_2475_6504"
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
          id="paint1_linear_2475_6504"
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
          id="paint2_linear_2475_6504"
          x1="246"
          y1="79"
          x2="246"
          y2="382.072"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DCDCDC" />
          <stop offset="1" stopColor="#DCDCDC" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_2475_6504"
          x1="247.332"
          y1="337"
          x2="331.974"
          y2="378.358"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F41C52" />
          <stop offset="1" stopColor="#FF537E" />
        </linearGradient>
        <filter
          id="filter0_d_2475_6504"
          x=".904305"
          y="30.9522"
          width="490.191"
          height="495.264"
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
            result="effect1_dropShadow_2475_6504"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2475_6504"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_2475_6504"
          x="170.571"
          y="299.786"
          width="215.857"
          height="215.857"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="33" dy="33.2143" />
          <feGaussianBlur stdDeviation="33.2143" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2475_6504"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2475_6504"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
})
