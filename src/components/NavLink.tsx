import Link from 'next/link'
import { classNames } from '~/lib/utils'

export function NavLink({
  variant,
  href,
  className,
  children,
  type = 'default'
}: {
  variant?: 'light' | 'dark'
  href: string
  className?: string
  children: React.ReactNode
  type?: 'default' | 'solid'
}) {
  return (
    <Link
      href={href}
      className={classNames(
        'inline-block rounded-full px-3 py-1 text-sm ',
        type === 'default'
          ? variant === 'dark'
            ? 'text-slate-200'
            : 'text-slate-700'
          : variant === 'dark'
            ? 'bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900'
            : 'bg-slate-900 text-white hover:bg-slate-800 hover:text-slate-100',
        className || ''
      )}
    >
      {children}
    </Link>
  )
}
