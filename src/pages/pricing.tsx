import * as TabsPrimitive from '@radix-ui/react-tabs'
import { useState } from 'react'

import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import { TitleAndSubtitle } from '~/components/primitives/texts'
import { FAQ } from '~/components/sections/pricing/faq'
import { Hero } from '~/components/sections/pricing/hero'
import { Plans } from '~/components/sections/pricing/plans'
import styles from '~/components/sections/pricing/pricing.module.css'

const Pricing = () => {
  const [selectedTab, setSelectedTab] = useState('testsuite')

  const handleTabChange = (tabValue: string) => {
    setSelectedTab(tabValue)
  }

  return (
    <PageLayout>
      <Meta title="Pricing | Replay" />

      <TitleAndSubtitle
        className={styles.title}
        title={{
          children: <>Pricing</>,
          hero: true
        }}
        subtitle={{
          children:
            'Individuals and open source communities will always be able to use Replay for free.'
        }}
      />

      <TabsPrimitive.Root
        defaultValue="bugs"
        onValueChange={handleTabChange}
        className={styles.tabs}
      >
        <TabsPrimitive.List className={styles.tabList}>
          <TabsPrimitive.Trigger value="bugs" className={styles.tab}>
            Bug Reporting
          </TabsPrimitive.Trigger>
          <TabsPrimitive.Trigger value="tests" className={styles.tab}>
            Testsuites
          </TabsPrimitive.Trigger>
        </TabsPrimitive.List>
      </TabsPrimitive.Root>

      <Hero selectedTab={selectedTab} />
      <Plans selectedTab={selectedTab} />
      <FAQ />
      <br />
      <br />
    </PageLayout>
  )
}

export default Pricing
