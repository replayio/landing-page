import { ReactNode } from 'react'

import { isClient } from '~/lib/constants'

export const formatError = (
  error: unknown
): { message: string; name?: string } => {
  try {
    if (error instanceof Error) {
      return { message: error.message, name: error.name }
    }
    return { message: String(error) }
  } catch (error) {
    return { message: 'An unknown error ocurred.' }
  }
}

export const isApiSupported = (api: string) => isClient && api in window

/* Builds responsive sizes string for images */
export const getSizes = (
  entries: ({ breakpoint: string; width: string } | string | number)[]
) => {
  const sizes = entries.map((entry) => {
    if (!entry) {
      return ''
    }

    if (typeof entry === 'string') {
      return entry
    }

    if (typeof entry === 'number') {
      return `${entry}px`
    }

    if (entry.breakpoint.includes('px') || entry.breakpoint.includes('rem')) {
      return `(min-width: ${entry.breakpoint}) ${entry.width}`
    }

    throw new Error(`Invalid breakpoint: ${entry.breakpoint}`)
  })

  return sizes.join(', ')
}

export const msToSecs = (ms: number) => ms / 1000

export const secsToMs = (secs: number) => secs * 1000

export const padZeroesToNumber = (number: number, digits: number) =>
  number.toString().padStart(digits, '0')

export const rangeMap = (
  input: number,
  inputStart: number,
  inputEnd: number,
  outputStart: number,
  outputEnd: number
) =>
  ((input - inputStart) / (inputEnd - inputStart)) * (outputEnd - outputStart) +
  outputStart

export const userTagRegex = /(@\w+)/g
export const mdCodeRegex = /`(\w+)`/g

type Option = {
  regex: RegExp
  fn: (key: number, result: RegExpExecArray) => ReactNode
}

export const processString = (options: Option[]) => {
  let key = 0

  function processInputWithRegex(
    option: Option,
    input: string | string[]
  ): string | string[] | ReactNode[] {
    if (!option.fn || typeof option.fn !== 'function') return input

    if (!option.regex || !(option.regex instanceof RegExp)) return input

    if (typeof input === 'string') {
      const regex = option.regex
      let result = null
      const output: ReactNode[] = []

      while ((result = regex.exec(input)) !== null) {
        const index = result.index
        const match = result[0]

        output.push(input.substring(0, index))
        output.push(option.fn(++key, result))

        input = input.substring(index + match.length, input.length + 1)
        regex.lastIndex = 0
      }

      output.push(input)
      return output
    } else if (Array.isArray(input)) {
      return input.map((chunk) => processInputWithRegex(option, chunk))
    } else return input
  }

  return function (input: string | string[]) {
    if (!options || !Array.isArray(options) || !options.length) return input

    options.forEach(
      (option: Option) => (input = processInputWithRegex(option, input))
    )

    return input
  }
}
