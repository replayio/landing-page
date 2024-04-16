import { clsx } from 'clsx'
import Link from 'next/link'

export function NavLink({
  variant = 'light',
  href,
  className,
  children,
  type = 'default',
  active = false
}: {
  variant?: 'light' | 'dark'
  href: string
  className?: string
  children: React.ReactNode
  type?: 'default' | 'solid'
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={clsx(
        'group inline-block rounded-full px-3 py-2 text-sm leading-[calc(18/20)]',
        type === 'default'
          ? `transition-all duration-200 hover:font-semibold hover:text-accent focus:font-semibold focus:text-accent ${
              !active && clsx(variant === 'dark' ? 'text-slate-200' : 'text-slate-700')
            } ${clsx(active && 'font-semibold text-accent')}`
          : variant === 'dark'
            ? 'bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900'
            : 'bg-slate-900 text-white hover:bg-slate-800 hover:text-slate-100',
        className
      )}
      data-testid={children?.toString()}
    >
      {type === 'default' ? (
        <span className="relative">
          <span className="hover-group:font-semibold absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
            {children}
          </span>
          <span aria-hidden={true} className="font-semibold opacity-0">
            {children}
          </span>
        </span>
      ) : (
        children
      )}
    </Link>
  )
}
