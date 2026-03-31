'use client'

import { FC, FormEvent, useRef, useState } from 'react'
import clsx from 'clsx'

import { Section } from '~/components/common/section'

import s from './contact.module.scss'

const fieldLabelClass = 'block text-sm font-semibold text-gray-900'

const fieldControlClass =
  'mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500'

const fieldControlErrorClass =
  'mt-2 block w-full rounded-lg border border-rose-400 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500'

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

const inlineLinkClass =
  'font-medium text-accent underline-offset-2 transition-colors hover:text-accent-light hover:underline'

const ContactForm: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const submitInFlightRef = useRef(false)

  const handleBlurEmail = () => {
    if (!formData.email.trim()) return
    if (isValidEmail(formData.email)) setEmailError('')
    else setEmailError('Please enter a valid email address (e.g. name@company.com)')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (submitInFlightRef.current) return

    if (!isValidEmail(formData.email)) {
      setEmailError('Please enter a valid email address (e.g. name@company.com)')
      return
    }

    submitInFlightRef.current = true
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data?.error || 'Could not send message')
      }

      setSubmitted(true)
      setEmailError('')
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      })
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Something went wrong. Please try again.'
      )
    } finally {
      submitInFlightRef.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <Section className={s.section}>
      <div className={s.twoColumnLayout}>
        <div className={clsx(s.firstColumn, 'min-w-0')}>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contact us
          </h2>
          <article className="mt-6 max-w-xl space-y-10">
            <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
              We&apos;d love to hear from you. Reach out with the form,{' '}
              <a href="https://replay.io/discord" className={inlineLinkClass}>
                say hi on Discord
              </a>
              , or browse our{' '}
              <a
                href="https://docs.replay.io"
                className={inlineLinkClass}
                rel="noopener noreferrer"
              >
                documentation
              </a>
              .
            </p>
            <blockquote className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-base italic leading-relaxed text-gray-600 sm:text-[17px]">
                &quot;Next.js App Router is now stable in 13.4. Wouldn&apos;t have been possible
                without Replay—we investigated so many (over 20) super complicated bugs that using
                traditional debugging would have cost us days to investigate.&quot;
              </p>
              <footer className="mt-5 border-t border-gray-100 pt-5 text-sm font-medium not-italic text-gray-500">
                — Tim Neutkens, Co-author of Next.js
              </footer>
            </blockquote>
          </article>
        </div>
        <div
          className={clsx(
            s.secondColumn,
            'flex flex-col justify-center rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm sm:p-8'
          )}
        >
          {submitted ? (
            <div className="flex flex-col items-center rounded-xl border border-gray-200/90 bg-white px-6 py-10 text-center shadow-sm sm:px-10 sm:py-12">
              <h3 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                Thanks for reaching out
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-600 sm:text-base">
                We received your message and will get back to you at the email you provided, usually
                within a couple of business days.
              </p>
              <button
                type="button"
                className="mt-8 text-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-light hover:underline"
                onClick={() => setSubmitted(false)}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className={fieldLabelClass}>
                Name
                <input
                  className={fieldControlClass}
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, name: event.target.value }))
                  }
                />
              </label>

              <label className={fieldLabelClass}>
                Email
                <input
                  className={emailError ? fieldControlErrorClass : fieldControlClass}
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(event) => {
                    setFormData((prev) => ({ ...prev, email: event.target.value }))
                    setEmailError('')
                  }}
                  onBlur={handleBlurEmail}
                />
                {emailError && <p className="mt-1.5 text-xs text-rose-600">{emailError}</p>}
              </label>

              <label className={fieldLabelClass}>
                Company (optional)
                <input
                  className={fieldControlClass}
                  type="text"
                  name="company"
                  autoComplete="organization"
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, company: event.target.value }))
                  }
                />
              </label>

              <label className={fieldLabelClass}>
                Message
                <textarea
                  className={clsx(fieldControlClass, 'min-h-[140px] resize-y')}
                  name="message"
                  required
                  rows={6}
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, message: event.target.value }))
                  }
                />
              </label>

              {error && <p className="text-sm text-rose-600">{error}</p>}

              <button
                className="mt-2 w-full rounded-full bg-accent px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  )
}

export default ContactForm
