import {
  Column,
  Grid,
  Image,
  LayoutContext,
  Rectangle,
  Row,
  Space,
  Text
} from '@jsxui/react'
import { interpolate } from '@popmotion/popcorn'
import { animate } from 'motion'
import * as React from 'react'

import { Logo } from '~/components/primitives/logo'
import overboardStore from '~/public/images/home/overboard-store.png'

function SceneOne() {
  return (
    <Column>
      <Space />
      <Row>
        <Space />
        <Image
          id="image-1"
          width={20}
          height={14}
          source={overboardStore.src}
        />
        <Space />
      </Row>
      <Space />
    </Column>
  )
}

function SceneTwo() {
  return (
    <Grid height="fill">
      <Column>
        <Space size={1} />

        <Row height={1}>
          <Space size={1} />
          <Text width={1}>
            <Logo />
          </Text>
          <Space />
          <Text width={4}>{/* <ViewToggle /> */}</Text>
          <Space size={1} />
        </Row>

        <Space size={1} />

        <Row>
          <Space size={1} />
          <Rectangle color="#f1f7ff" weight={0.6} />
          <Grid width="fill">
            <Rectangle color="white" />
            <Row>
              <Space size={1} />
              <Column>
                <Space size={1} />
                <Text />
                <Space size={1} />
              </Column>
              <Space size={1} />
            </Row>
          </Grid>
          <Column>
            <Space id="image-2" size={6} />
            <Rectangle color="white" />
          </Column>
          <Space size={1} />
        </Row>
        <Space size={1} />
      </Column>
    </Grid>
  )
}

function Sequence() {
  // @ts-ignore
  const layoutStore = React.useContext(LayoutContext)

  React.useEffect(() => {
    if (layoutStore === null) {
      return
    }

    const { getNodeFromId } = layoutStore.getState()
    const node1 = getNodeFromId('image-1')
    const node2 = getNodeFromId('image-2')
    const node3 = getNodeFromId('image-3')

    // @ts-ignore
    const controls = animate('#image-1', {
      width: [node1?.offsets.width, node2?.offsets.width, node3?.offsets.width],
      height: [
        node1?.offsets.height,
        node2?.offsets.height,
        node3?.offsets.height
      ],
      transform: [
        `translate(${node1?.offsets.column}, ${node1?.offsets.row})`,
        `translate(${node2?.offsets.column}, ${node2?.offsets.row})`,
        `translate(${node3?.offsets.column}, ${node3?.offsets.row})`
      ]
    })

    controls.stop()

    document.addEventListener('pointermove', (event) => {
      controls.currentTime = interpolate(
        [0, window.innerWidth],
        [0, controls.duration]
      )(event.clientX) as number
    })
  }, [layoutStore])

  return null
}

export function Story() {
  const sceneColumns = 41
  const sceneRows = 18

  return (
    <>
      <Grid columns={sceneColumns} rows={sceneRows} space={8}>
        <Column>
          <Space size={1} />
          <Grid>
            <Rectangle color="#f5f5f5" cornerRadius={20} />

            <Row>
              <Space size={1} />
              <SceneTwo />
              <Space size={1} />
            </Row>

            <SceneOne />

            <Row>
              <Space />
              <Column>
                <Space />
                <Space id="image-3" />
                <Space size={1} />
              </Column>
              <Space size={1} />
            </Row>

            <Sequence />
          </Grid>
        </Column>
      </Grid>
    </>
  )
}
