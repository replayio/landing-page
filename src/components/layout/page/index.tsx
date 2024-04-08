import clsx from 'clsx'

import { Footer } from '~/components/layout/footer'
import { Header } from '~/components/layout/header'

import { Meta, type MetaProps } from '../../common/meta'
import s from './page.module.scss'

type Props = {
  meta?: MetaProps
  children?: React.ReactNode
  showHeader?: boolean
  showFooter?: boolean
}
export const PageLayout = ({ meta, children, showHeader = true, showFooter = true }: Props) => {
  return (
    <>
      <Meta {...meta} />
      {showHeader && <Header />}
      <main
        className={clsx(s.main, {
          [s.showHeader as string]: showHeader
        })}
      >
        {children}
      </main>
      {showFooter && <Footer />}
    </>
  )
}
