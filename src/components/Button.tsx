import Link from 'next/link'
import clsx from 'clsx'
import styles from '../styles/Landingpage.module.css'

const baseStyles = {
  solid:
    'group transition-colors ease-ease-in-out duration-100 inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
  outline:
    'group transition-colors ease-ease-in-out duration-100 inline-flex ring-1 bg-white/50 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none'
}

const variantStyles = {
  solid: {
    default: `bg-accent hover:bg-[#c61351] text-white hover:text-slate-100 active:bg-red-800 active:text-red-100 focus-visible:outline-blue-600`,
    blue: 'bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600',
    white:
      'bg-white text-slate-900 hover:bg-gray-50 active:bg-gray-200 active:text-slate-600 focus-visible:outline-white',
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
