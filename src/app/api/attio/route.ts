import { NextRequest, NextResponse } from 'next/server'

const ATTIO_API_KEY = process.env.ATTIO_API_KEY

async function attioFetch(path: string, method: string, body?: object) {
  return fetch(`https://api.attio.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${ATTIO_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    ...(body && { body: JSON.stringify(body) }),
  })
}

export async function POST(req: NextRequest) {
  if (!ATTIO_API_KEY) {
    return NextResponse.json(
      { error: 'Attio is not configured' },
      { status: 500 }
    )
  }

  try {
    const { fullName, company, email, linkedin, teamSize, painPoints } =
      await req.json()

    if (!email || !fullName) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    const nameParts = fullName.trim().split(/\s+/)
    const firstName = nameParts[0] || fullName.trim()
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''

    const descriptionParts = [
      company && `Company: ${company}`,
      teamSize && `Team size: ${teamSize}`,
      painPoints && `Pain points: ${painPoints}`,
    ]
      .filter(Boolean)
      .join('\n')

    // Assert person record (create or update, matched by email)
    // Company is auto-linked by Attio from the email domain
    const personRes = await attioFetch(
      '/v2/objects/people/records?matching_attribute=email_addresses',
      'PUT',
      {
        data: {
          values: {
            email_addresses: [email],
            name: [
              {
                first_name: firstName,
                last_name: lastName,
                full_name: fullName.trim(),
              },
            ],
            ...(linkedin && {
              linkedin: linkedin,
            }),
            ...(descriptionParts && {
              description: descriptionParts,
            }),
            source: 'design-partner-application',
          },
        },
      }
    )

    const personData = await personRes.json()

    if (!personRes.ok) {
      console.error('Attio person error:', personData)
      return NextResponse.json(
        { error: personData?.message || 'Failed to create person in Attio' },
        { status: personRes.status }
      )
    }

    const personId = personData?.data?.id?.record_id

    // If a list ID is configured, add an entry to the design partners list
    const listId = process.env.ATTIO_PARTNER_LIST_ID
    if (listId && personId) {
      const entryRes = await attioFetch(`/v2/lists/${listId}/entries`, 'POST', {
        data: {
          parent_record_id: personId,
          parent_object: 'people',
        },
      })

      if (!entryRes.ok) {
        const entryErr = await entryRes.json()
        console.error('Attio list entry error:', entryErr)
      }
    }

    return NextResponse.json({ success: true, id: personId })
  } catch (error) {
    console.error('Attio API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
