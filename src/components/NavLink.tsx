import { clsx } from 'clsx'
import Link from 'next/link'

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
      className={clsx(
        'inline-block rounded-full px-3 py-2 text-sm leading-[calc(18/20)]',
        type === 'default'
          ? variant === 'dark'
            ? 'text-slate-200'
            : 'text-slate-700'
          : variant === 'dark'
            ? 'bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900'
            : 'bg-slate-900 text-white hover:bg-slate-800 hover:text-slate-100',
        className
      )}
    >
      {children}
    </Link>
  )
}
