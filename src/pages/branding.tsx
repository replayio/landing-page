import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import { TitleAndSubtitle } from '~/components/primitives/texts'
import s from '~/components/sections/branding/branding.module.scss'
import LogoDownloadWidget from '~/components/sections/branding/LogoDownloadWidget'
import StyleGuide from '~/components/sections/branding/StyleGuide'

const Branding = () => {
  return (
    <PageLayout>
      <Meta title="Branding | Replay" />

      <TitleAndSubtitle
        title={{
          className: s.title,
          as: 'h2',
          children: 'Branding Resources'
        }}
        subtitle={{
          children: ''
        }}
      />

      <LogoDownloadWidget />
      <StyleGuide />
    </PageLayout>
  )
}

export default Branding
