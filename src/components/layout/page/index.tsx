import { Footer } from '~/components/layout/footer'
import { Header } from '~/components/layout/header'

import { Meta, type MetaProps } from '../../common/meta'
import s from './page.module.scss'

type Props = {
  meta?: MetaProps
  children?: React.ReactNode
}

export const PageLayout = ({ meta, children }: Props) => {
  return (
    <>
      <Meta {...meta} />

      <Header />
      <main className={s.main}>{children}</main>
      <Footer />
    </>
  )
}
