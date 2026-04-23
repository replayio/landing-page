import { NextResponse } from 'next/server'
import generated from '../skills.generated.json'

type GeneratedSkill = {
  name: string
  type: string
  description: string
  url: string
  sha256: string
}

type Generated = {
  skills: GeneratedSkill[]
}

const { skills } = generated as Generated

type Params = { params: { file: string } }

export function GET(_request: Request, { params }: Params) {
  if (params.file !== 'index.json') {
    return new NextResponse(null, { status: 404 })
  }

  return NextResponse.json(
    {
      $schema: 'https://agentskills.io/schemas/v0.2.0/index.json',
      skills
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=300'
      }
    }
  )
}
