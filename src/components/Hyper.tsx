import React from 'react'

// https://chat.openai.com/share/4a16299a-6afe-4b2b-b4fc-15c8303b3510

interface Props {
  cx: number
  cy: number
  radiusX: number
  radiusY: number
  lines: number
  strokeWidth: number
  stroke: string
  extensionLength: number
}

export const HyperSpace: React.FC<Props> = ({
  cx,
  cy,
  radiusX,
  radiusY,
  lines,
  strokeWidth,
  stroke,
  extensionLength
}) => {
  const generateLines = () => {
    const angleIncrement = 360 / lines
    let svgLines = []

    for (let i = 0; i < lines; i++) {
      const angle = angleIncrement * i
      const radians = (angle * Math.PI) / 180
      // Adjust the starting points based on the ellipse's radii
      const x1 = cx + radiusX * Math.cos(radians)
      const y1 = cy + radiusY * Math.sin(radians)
      // Extend lines further from the ellipse
      const x2 = cx + (radiusX + extensionLength) * Math.cos(radians)
      const y2 = cy + (radiusY + extensionLength) * Math.sin(radians)

      svgLines.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={`#f1f1f1`} // Apply a uniform gradient to all lines
          strokeWidth={strokeWidth}
        />
      )
    }

    return svgLines
  }

  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient
          id="lineGradient"
          gradientUnits="userSpaceOnUse"
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
        >
          <stop offset="0%" stopColor={stroke} />
          <stop offset="100%" stopColor="f1f1f1" />
        </linearGradient>
      </defs>
      {generateLines()}
    </svg>
  )
}
