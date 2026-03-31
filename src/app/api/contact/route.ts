import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_FORM_TO = process.env.CONTACT_FORM_TO || 'info@replay.io'
const CONTACT_FORM_FROM = process.env.CONTACT_FORM_FROM || 'Replay Contact <contact@replay.io>'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function trimStr(value: unknown, maxLen: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLen) : ''
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(req: NextRequest) {
  if (!RESEND_API_KEY) {
    return NextResponse.json({ error: 'Contact form is not configured' }, { status: 500 })
  }

  try {
    const body = await req.json()
    const name = trimStr(body?.name, 200)
    const email = trimStr(body?.email, 254)
    const company = trimStr(body?.company, 200)
    const message = trimStr(body?.message, 5000)

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
    }

    const textBody = [
      'New contact form submission:',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || 'Not provided'}`,
      '',
      'Message:',
      message
    ].join('\n')

    const htmlBody = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || 'Not provided')}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
    `

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: CONTACT_FORM_FROM,
        to: [CONTACT_FORM_TO],
        subject: `Contact form: ${name}`,
        reply_to: email,
        text: textBody,
        html: htmlBody
      })
    })

    if (!resendResponse.ok) {
      const resendError = (await resendResponse.json().catch(() => ({}))) as {
        message?: string
        name?: string
      }
      console.error('Resend send error:', resendError)

      const isDev = process.env.NODE_ENV === 'development'
      const resendHint = resendError?.message ? ` (${resendError.message})` : ''
      const userMessage = isDev
        ? `Email provider rejected the send${resendHint}. Check RESEND_API_KEY and CONTACT_FORM_FROM (domain must be verified in Resend).`
        : 'Failed to send your message. Please try again.'

      return NextResponse.json(
        {
          error: userMessage,
          ...(isDev ? { provider: resendError } : {})
        },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
