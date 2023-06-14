import clsx from 'clsx'
import Image from 'next/image'
import { useRef } from 'react'
import Marquee from 'react-fast-marquee'

import { Timeline } from '~/components/common/progress-bar'
import { CssIcon } from '~/components/icons/css'
import { JavascriptIcon } from '~/components/icons/javascript'
import { ReactIcon } from '~/components/icons/react'

import s from './assets.module.scss'

const AssetSideBox = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={s.assetSide}>
      <div className={s.assetWrapper}>
        <div className={s.assetTab}>
          <span />
          <span />
          <span />
        </div>
        <div className={clsx(s.assetContent, className)}>{children}</div>
      </div>
    </div>
  )
}

const BinaryBackground = ({ animation = false }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const text =
    '0101011101100101001000000110110101100001011010110110010100100000011000110110111101101111011011000010000001110011011010000110100101110100001000000111010001101000011000010111010000100000011100000110010101110010011001100110111101110010011011010111001101010111011001010010000001101101011000010110101101100101001000000110001101101111011011110110110000100000011100110110100001101001011101000010000001110100011010000110000101110100001000000111000001100101011100100110011001101111011100100110110101110011010101110110010100100000011011010110000101101011011001010010000001100011011011110110111101101100001000000111001101101000011010010111010000100000011101000110100001100001011101000010000001110000011001010111001001100110011011110111001001101101011100110101011101100101001000000110110101100001011010110110010100100000011000110110111101101111011011000010000001110011011010000110100101110100001000000111010001101000011000010111010000100000011100000110010101110010011001100110111101110010011011010111001101010111011001010010000001101101011000010110101101100101001000000110001101101111011011110110110000100000011100110110100001101001011101000010000001110100011010000110000101110100001000000111'

  return (
    <div ref={containerRef} className={s.binaryBackground}>
      <p className={s.text}>
        {animation
          ? (text.match(/.{1,5}/g) || []).map((e, i) => {
              return i % 6 === 0 || i % 9 === 0 ? (
                <span
                  style={{
                    animationDelay: `${0.5 + i * 0.1}s`
                  }}
                  className={s.highlight}
                  key={i}
                >
                  {e}
                </span>
              ) : (
                <span key={i}>{e}</span>
              )
            })
          : text}
      </p>
    </div>
  )
}

const RecordRuntime = () => {
  return (
    <div className={s.recordRuntime}>
      <AssetSideBox className={s.recordRuntime}>
        <BinaryBackground />
        <div className={s.illustration}>
          <Image
            src="/images/bugs-slider/skateboard-shadow.png"
            alt="Skateboard"
            height={75}
            width={186}
            className={s.skateboardShadow}
          />
          <Image
            src="/images/bugs-slider/skateboard.svg"
            alt="Skateboard"
            height={75}
            width={186}
            className={s.skateboard}
          />
        </div>
        <div className={s.timeline}>
          <Timeline
            playing
            solid
            duration={10}
            primaryColor="var(--color-pink-crayon)"
            secondaryColor="var(--grey-600)"
            thickness={5}
            markerActiveColor="var(--color-pink-crayon)"
            markerColor="var(--grey-600)"
            markerSize={10}
            markers={[
              {
                position: 30
              },
              {
                position: 50
              },
              {
                position: 75
              }
            ]}
          />
        </div>
      </AssetSideBox>
    </div>
  )
}

const RecordRandomness = () => {
  return (
    <AssetSideBox className={s.RecordRandomness}>
      <BinaryBackground animation />
      <div className={s.playerButton}>
        <span className={s.playState} />
      </div>
    </AssetSideBox>
  )
}

const Debugging = () => {
  return (
    <AssetSideBox className={s.debugging}>
      <Marquee
        direction="right"
        autoFill
        className={clsx(s.binaryIconsMarquee, s.marquee)}
      >
        {binaryIcons.map((Icon, idx) => (
          <div className={s.iconWrapper} key={idx}>
            <Icon className={s.icon as string} />
          </div>
        ))}
      </Marquee>
      <Marquee
        direction="right"
        autoFill
        className={clsx(s.iconsMarquee, s.marquee)}
      >
        {icons.map((Icon, idx) => (
          <div className={s.iconWrapper} key={idx}>
            <Icon className={s.icon} />
          </div>
        ))}
      </Marquee>
      <span className={s.devider} />
    </AssetSideBox>
  )
}

const binaryIcons = [
  ({ className }: { className: string }) => (
    <Image
      className={className}
      src="/images/time-travel/fundamentals/react_binary.png"
      alt="react"
      height={40}
      width={40}
      quality={100}
    />
  ),
  ({ className }: { className: string }) => (
    <Image
      className={className}
      src="/images/time-travel/fundamentals/css_binary.png"
      alt="css"
      height={40}
      width={40}
      quality={100}
    />
  ),
  ({ className }: { className: string }) => (
    <Image
      className={className}
      src="/images/time-travel/fundamentals/js_binary.png"
      alt="javascript"
      height={40}
      width={40}
      quality={100}
    />
  )
]
const icons = [ReactIcon, CssIcon, JavascriptIcon]

export { Debugging, RecordRandomness, RecordRuntime }
