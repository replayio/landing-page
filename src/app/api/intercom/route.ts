import { NextRequest, NextResponse } from 'next/server'

const INTERCOM_TOKEN = process.env.INTERCOM_ACCESS_TOKEN

export async function POST(req: NextRequest) {
  if (!INTERCOM_TOKEN) {
    return NextResponse.json(
      { error: 'Intercom is not configured' },
      { status: 500 }
    )
  }

  try {
    const { email, name, tool } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const response = await fetch('https://api.intercom.io/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${INTERCOM_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        role: 'lead',
        email,
        ...(name && { name }),
        custom_attributes: {
          ...(tool && { vibe_tool: tool }),
          source: 'chrome-extension-notification',
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      // Intercom returns 409 if contact already exists — update instead
      if (response.status === 409 && data?.errors?.[0]?.code === 'conflict') {
        const contactId = data.errors[0].data?.contact_id

        if (contactId) {
          const updateRes = await fetch(
            `https://api.intercom.io/contacts/${contactId}`,
            {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${INTERCOM_TOKEN}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify({
                custom_attributes: {
                  ...(tool && { vibe_tool: tool }),
                  source: 'chrome-extension-notification',
                },
              }),
            }
          )
          const updateData = await updateRes.json()
          return NextResponse.json(updateData)
        }
      }

      return NextResponse.json(
        { error: data?.errors?.[0]?.message || 'Intercom API error' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Intercom API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
