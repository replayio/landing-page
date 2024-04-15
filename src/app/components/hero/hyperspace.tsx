'use client'

import React, { FC, useEffect, useLayoutEffect, useRef } from 'react'

const NUMBER_OF_STARS = 40
const VELOCITY = 15
const STAR_COLOR = '#f02d5e'
const OFFSET_X = 200
const OFFSET_Y = 50

class Star {
  x: number
  y: number
  radius: number
  color: string
  minRadius: number
  slope: number
  direction: number

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    slope: number,
    direction: number
  ) {
    this.x = x
    this.y = y
    this.radius = radius
    this.direction = direction
    this.color = color
    this.minRadius = radius
    this.slope = slope
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.color
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.stroke()
    ctx.fill()
  }
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

function slopeFromCenter(x: number, y: number, centerX: number, centerY: number) {
  let direction = 1
  let q = x > centerX ? (y <= centerY ? 'Q1' : 'Q4') : y <= centerY ? 'Q2' : 'Q3'

  if (q == 'Q2' || q == 'Q3') {
    direction = -1
  }

  return [(centerY - y) / (centerX - x), direction]
}

function nextStop(currentX: number, currentY: number, m: number) {
  const s = VELOCITY / Math.sqrt(1 + m * m)
  return [Math.ceil(currentX + s), Math.ceil(currentY + m * s)]
}

function createStars(array: Star[], canvasWidth: number, canvasHeight: number) {
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2

  for (let i = 0; i < NUMBER_OF_STARS; i++) {
    let radius = getRandomInt(1, 5)
    let angle = Math.random() * Math.PI * 2
    let distanceX = getRandomInt(radius + OFFSET_X, Math.min(canvasWidth, canvasHeight) / 2)
    let distanceY = getRandomInt(radius + OFFSET_Y, Math.min(canvasWidth, canvasHeight) / 2)
    let x = Math.ceil(centerX + distanceX * Math.cos(angle))
    let y = Math.ceil(centerY + distanceY * Math.sin(angle))
    let color = STAR_COLOR
    let slopeAndDirection = slopeFromCenter(x, y, centerX, centerY)
    array.push(new Star(x, y, radius, color, slopeAndDirection[0], slopeAndDirection[1]))
  }
}

type HyperspaceProps = Omit<React.HTMLAttributes<HTMLCanvasElement>, 'width' | 'height'>

const Hyperspace: FC<HyperspaceProps> = ({ style, ...rest }) => {
  const starsList = useRef<Star[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useLayoutEffect(() => {
    if (!canvasRef.current) return

    const stars = starsList.current
    const canvas = canvasRef.current
    canvas.width = canvasRef.current.clientWidth
    canvas.height = canvasRef.current.clientHeight
    const ctx = canvas.getContext('2d')!

    createStars(starsList.current, canvas.width, canvas.height)
    starsList.current.forEach((star) => star.draw(ctx))

    const raf = () => {
      ctx.fillStyle = 'rgba(255,255,255,0.25)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]

        if (star.x <= 0 || star.x > canvas.width || star.y <= 0 || star.y > canvas.height) {
          const angle = Math.random() * Math.PI * 2
          const radiusX = Math.random() * (Math.min(canvas.width, canvas.height) / 2) + OFFSET_X
          const radiusY = Math.random() * (Math.min(canvas.width, canvas.height) / 2) + OFFSET_Y
          star.x = Math.ceil(canvas.width / 2 + radiusX * Math.cos(angle))
          star.y = Math.ceil(canvas.height / 2 + radiusY * Math.sin(angle))
          const slopeAndDirection = slopeFromCenter(
            star.x,
            star.y,
            canvas.width / 2,
            canvas.height / 2
          )
          star.slope = slopeAndDirection[0]
          star.direction = slopeAndDirection[1]
        }

        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        const nextXY = nextStop(star.x * star.direction, star.y * star.direction, star.slope)
        const nextX = nextXY[0]
        const nextY = nextXY[1]
        ctx.lineTo(nextX * star.direction, nextY * star.direction)
        ctx.strokeStyle = star.color
        ctx.lineWidth = star.radius
        ctx.lineCap = 'round'
        ctx.stroke()
        ctx.closePath()
        star.x = nextX * star.direction
        star.y = nextY * star.direction
      }

      requestAnimationFrame(raf)
    }
    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', ...style }} {...rest} />
}

export default Hyperspace
