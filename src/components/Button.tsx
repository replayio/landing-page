'use client'

import { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import styles from '../styles/Landingpage.module.css'

const CopyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.1384 4.13594V2.7878C3.1384 2.18377 3.29305 1.72528 3.60234 1.41235C3.91527 1.09578 4.37193 0.9375 4.97232 0.9375H6.99183C7.32658 0.9375 7.62497 0.984802 7.88693 1.07941C8.1489 1.17402 8.38542 1.33048 8.59649 1.54881L11.2928 4.29423C11.5148 4.52346 11.6712 4.76908 11.7622 5.03107C11.8531 5.29306 11.8987 5.61145 11.8987 5.98623V10.2326C11.8987 10.833 11.7422 11.2915 11.4292 11.608C11.1199 11.9247 10.6651 12.0829 10.0647 12.0829H8.95675V10.8658H9.93918C10.1866 10.8658 10.3722 10.8039 10.4959 10.6802C10.6196 10.5528 10.6815 10.3691 10.6815 10.1289V5.71879H8.38364C8.03429 5.71879 7.76325 5.62419 7.5704 5.43497C7.38116 5.24576 7.28654 4.97467 7.28654 4.62171V2.15466H5.09786C4.84678 2.15466 4.65939 2.21833 4.53567 2.34569C4.41559 2.4694 4.35555 2.65134 4.35555 2.8915V4.13594H3.1384ZM8.25812 4.48526C8.25812 4.57987 8.27811 4.649 8.31815 4.69267C8.36181 4.73269 8.42914 4.75271 8.52008 4.75271H10.3649L8.25812 2.61313V4.48526ZM0.398438 13.0872V5.64238C0.398438 5.04199 0.553083 4.58533 0.862373 4.2724C1.17531 3.95582 1.63196 3.79754 2.23236 3.79754H4.1154C4.46108 3.79754 4.74854 3.83393 4.97778 3.9067C5.20702 3.97947 5.43626 4.13412 5.6655 4.37064L8.58557 7.32891C8.74207 7.48902 8.86029 7.64367 8.94038 7.79287C9.02402 7.94207 9.08043 8.10763 9.10956 8.28958C9.14231 8.46783 9.15868 8.68252 9.15868 8.93364V13.0872C9.15868 13.6913 9.00219 14.1497 8.68927 14.4626C8.37634 14.7792 7.92152 14.9375 7.32474 14.9375H2.23236C1.63196 14.9375 1.17531 14.7792 0.862373 14.4626C0.553083 14.1497 0.398438 13.6913 0.398438 13.0872ZM1.61013 12.9835C1.61013 13.2237 1.67199 13.4074 1.79571 13.5348C1.91943 13.6621 2.105 13.7258 2.35244 13.7258H7.19921C7.45026 13.7258 7.63589 13.6621 7.75595 13.5348C7.87964 13.4074 7.94151 13.2237 7.94151 12.9835V9.12465H5.20702C4.78493 9.12465 4.46835 9.02096 4.25731 8.8135C4.0499 8.60612 3.9462 8.28958 3.9462 7.86382V5.00923H2.35789C2.10682 5.00923 1.91943 5.07292 1.79571 5.20027C1.67199 5.32763 1.61013 5.50956 1.61013 5.74608V12.9835ZM5.31618 8.09304H7.81053L4.98323 5.22756V7.76012C4.98323 7.87657 5.00871 7.96206 5.05965 8.01663C5.11423 8.06759 5.19974 8.09304 5.31618 8.09304Z"
      fill="white"
    />
  </svg>
)

const SuccessIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.84849 14.3174C2.02656 14.3174 1.40022 14.1044 0.969443 13.6786C0.543628 13.2578 0.330719 12.6414 0.330719 11.8293V2.80545C0.330719 1.99342 0.543628 1.37697 0.969443 0.956106C1.40022 0.530292 2.02656 0.317383 2.84849 0.317383H11.8204C12.6423 0.317383 13.2662 0.530292 13.692 0.956106C14.1227 1.37697 14.3381 1.99342 14.3381 2.80545V11.8293C14.3381 12.6414 14.1227 13.2578 13.692 13.6786C13.2662 14.1044 12.6423 14.3174 11.8204 14.3174H2.84849ZM2.98218 12.6686H11.6867C12.0086 12.6686 12.2561 12.5869 12.4294 12.4235C12.6027 12.2551 12.6894 12.0002 12.6894 11.6585V2.97627C12.6894 2.63462 12.6027 2.3821 12.4294 2.21871C12.2561 2.05037 12.0086 1.96619 11.6867 1.96619H2.98218C2.65539 1.96619 2.40534 2.05037 2.23205 2.21871C2.0637 2.3821 1.97953 2.63462 1.97953 2.97627V11.6585C1.97953 12.0002 2.0637 12.2551 2.23205 12.4235C2.40534 12.5869 2.65539 12.6686 2.98218 12.6686ZM6.54716 10.8341C6.40358 10.8341 6.27236 10.8019 6.15353 10.7375C6.03965 10.6732 5.93072 10.5791 5.82674 10.4553L4.11109 8.37574C3.97246 8.20244 3.90313 8.02667 3.90313 7.84842C3.90313 7.65037 3.97246 7.48201 4.11109 7.34338C4.24973 7.20474 4.4156 7.13542 4.60871 7.13542C4.72754 7.13542 4.83399 7.16017 4.92807 7.20969C5.02214 7.2592 5.11622 7.3409 5.2103 7.45479L6.53231 9.11849L9.34715 4.58052C9.51554 4.31314 9.72599 4.17945 9.97848 4.17945C10.1666 4.17945 10.3349 4.24135 10.4835 4.36513C10.632 4.48891 10.7064 4.64983 10.7064 4.84788C10.7064 4.93206 10.6865 5.01871 10.6469 5.10783C10.6122 5.19696 10.5677 5.28361 10.5132 5.36778L7.25273 10.4479C7.07944 10.7054 6.84425 10.8341 6.54716 10.8341Z"
      fill="white"
    />
  </svg>
)

const baseStyles = {
  solid:
    'group transition-colors ease-ease-in-out duration-100 inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
  outline:
    'group transition-colors ease-ease-in-out duration-100 inline-flex ring-1 bg-white/50 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none'
}

const variantStyles = {
  solid: {
    default: `bg-accent hover:bg-[#c61351] text-white  active:bg-red-800 active:text-red-100 focus-visible:outline-blue-600`,
    blue: 'bg-blue-600 text-white  hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600',
    white:
      'bg-white text-slate-900  active:bg-gray-200 active:text-slate-600 focus-visible:outline-white',
    gray: 'bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white'
  },
  outline: {
    default: `ring-accent text-accent transition-colors shadow-none`,
    blue: 'ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300',
    white:
      'ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white',
    gray: 'ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white'
  }
}

type ButtonProps = (
  | {
      variant?: 'solid'
      color?: keyof typeof variantStyles.solid
    }
  | {
      variant: 'outline'
      color?: keyof typeof variantStyles.outline
    }
) &
  (
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'color'>
    | (Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> & {
        href?: undefined
      })
  )
export function Button({ className, ...props }: ButtonProps) {
  const variant = props.variant || ('solid' as keyof typeof variantStyles)
  const color = props.color || ('slate' as keyof typeof variantStyles.solid)

  className = clsx(baseStyles[variant], variantStyles[variant][color], className)

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} {...props} />
  ) : (
    <Link className={className} {...props} {...props} />
  )
}

type BaseHubButtonProps = {
  className?: string
  label: string
  href: string
  color?: 'default' | 'blue' | 'white'
  variant: string
}

type Variant = 'solid' | 'outline'

export function BaseHubButton({ className, label, ...props }: BaseHubButtonProps) {
  props.variant ??= 'solid'
  props.color ??= 'default'

  const variantClassName = clsx(
    baseStyles[props.variant as Variant],
    {
      [variantStyles.outline[props.color as keyof (typeof variantStyles)['outline']]]:
        props.variant === 'outline',
      [variantStyles.solid[props.color]]: props.variant === 'solid'
    },
    className
  )

  return typeof props.href === 'undefined' ? (
    <button className={variantClassName} {...props}>
      {label}{' '}
    </button>
  ) : (
    <Link className={variantClassName} {...props}>
      {label}{' '}
    </Link>
  )
}

interface ClipboardButtonProps {
  href: string
  label: string
  variant: string
  _id: string
  className?: string
}

export function ClipboardButton({ className, label, ...props }: BaseHubButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const variantClassName = clsx(
    baseStyles[props.variant as keyof typeof baseStyles],
    variantStyles[props.variant as keyof typeof variantStyles][props.color || 'default'],
    className
  )

  const handleCopy = () => {
    navigator.clipboard.writeText(label)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2400) // Adjust the timeout as needed
  }

  return (
    <button
      className={variantClassName}
      onClick={handleCopy}
      style={{ minWidth: '242px' }} // Set min-width here
      {...props}
    >
      <div className="flex w-full items-center justify-between space-x-2">
        <span className="text-shadow-lg">{isCopied ? 'Copied to clipboard!' : label}</span>
        <div>{isCopied ? <SuccessIcon /> : <CopyIcon />}</div>
      </div>
    </button>
  )
}
