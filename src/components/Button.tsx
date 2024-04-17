import Link from 'next/link'
import clsx from 'clsx'
import styles from '../styles/Landingpage.module.css'
import { useMemo } from 'react'

const baseStyles = {
  solid:
    'group transition-colors ease-ease-in-out duration-100 inline-flex items-center justify-center rounded-full text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  outline:
    'group transition-colors ease-ease-in-out duration-100 inline-flex border-2 items-center justify-center rounded-full text-sm focus:outline-none focus-visible:outline-offset-2 focus-visible:outline-accent'
}

const sizeStyles = {
  sm: 'font-medium text-lg px-5 h-[33px]',
  base: 'font-semibold h-[54px] px-8 text-base'
}

const variantStyles = {
  solid: {
    default: `bg-accent hover:bg-accent-light text-white hover:text-slate-100 active:bg-blue-800 active:text-blue-100`,
    blue: 'bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100',
    white:
      'bg-white text-slate-900 hover:bg-gray-50 active:bg-gray-200 active:text-slate-600 focus-visible:outline-white',
    gray: 'bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white',
    black: 'bg-slate-900 text-white hover:text-slate-700 hover:bg-white'
  },
  outline: {
    default: `border-accent hover:border-accent-light text-accent hover:text-accent-light transition-colors shadow-none`,
    blue: 'border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:border-slate-300',
    white:
      'border-slate-700 text-white hover:border-slate-500 active:border-slate-700 active:text-slate-400 focus-visible:outline-white',
    gray: 'border-slate-700 text-white hover:border-slate-500 active:border-slate-700 active:text-slate-400 focus-visible:outline-white',
    black: 'border-slate-900 text-white hover:border-slate-800 hover:text-slate-100'
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
  | {
      variant: string
      color?: keyof typeof variantStyles.outline & keyof typeof variantStyles.solid
    }
) &
  (
    | {
        children?: never
        label: string
      }
    | {
        children: React.ReactNode
        label?: never
      }
  ) &
  (
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'color'>
    | (Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> & {
        href?: undefined
      })
  ) & { size?: keyof typeof sizeStyles }
export function Button({
  className,
  variant = 'solid',
  color = 'default',
  size = 'base',
  children,
  label,
  ...rest
}: ButtonProps) {
  const variantClassName = useMemo(() => {
    const v = (variant in variantStyles ? variant : 'solid') as keyof typeof variantStyles
    return clsx(baseStyles[v], sizeStyles[size], variantStyles[v][color], className)
  }, [variant, size, color, className])

  return typeof rest.href === 'undefined' ? (
    <button className={variantClassName} {...rest}>
      {children || label}
    </button>
  ) : (
    <Link className={variantClassName} {...rest}>
      {children || label}
    </Link>
  )
}
