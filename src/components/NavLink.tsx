import Link from 'next/link'
function classNames(...classes: (boolean | string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function NavLink({
  variant,
  href,
  className,
  children
}: {
  variant?: 'light' | 'dark'
  href: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={classNames(
        'inline-block rounded-full px-2 py-1 text-sm ',
        variant === 'dark'
          ? 'text-slate-200 hover:bg-slate-800 hover:text-slate-100'
          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
        className
      )}
    >
      {children}
    </Link>
  )
}
