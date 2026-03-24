'use client'

import { useState } from 'react'
import { Container } from '~/components/Container'

const teamSizeOptions = ['1–5', '6–20', '21–50', '51–200', '200+']

export function PartnerApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    email: '',
    linkedin: '',
    teamSize: '',
    painPoints: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [linkedinError, setLinkedinError] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (e.target.name === 'linkedin') setLinkedinError('')
    if (e.target.name === 'email') setEmailError('')
  }

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  const isValidLinkedin = (url: string) => /linkedin\.com\/in\//i.test(url.trim())

  const handleBlurEmail = () => {
    if (!formData.email.trim()) return
    if (isValidEmail(formData.email)) setEmailError('')
    else setEmailError('Please enter a valid email address (e.g. name@company.com)')
  }

  const handleBlurLinkedin = () => {
    if (!formData.linkedin.trim()) return
    if (isValidLinkedin(formData.linkedin)) setLinkedinError('')
    else
      setLinkedinError(
        'Please enter a valid LinkedIn profile URL (e.g. https://linkedin.com/in/yourname)'
      )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidEmail(formData.email)) {
      setEmailError('Please enter a valid email address (e.g. name@company.com)')
      return
    }
    if (!isValidLinkedin(formData.linkedin)) {
      setLinkedinError(
        'Please enter a valid LinkedIn profile URL (e.g. https://linkedin.com/in/yourname)'
      )
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/attio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Failed to submit application:', err)
      setError('Something went wrong. Please try again.')
    }

    setSubmitting(false)
  }

  return (
    <section id="apply" className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
              Apply to become a design partner
            </h2>
            <p className="mt-4 text-base text-gray-700 sm:text-lg">
              We review applications on a rolling basis and reach out within a few days.
            </p>
          </div>

          {submitted ? (
            <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-100 p-10 text-center">
              <h3 className="text-xl font-semibold text-gray-900">Thanks for applying!</h3>
              <p className="mt-3 text-base text-gray-600">
                We&apos;ll review your application and reach out within a few days.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-12 rounded-2xl border border-gray-200 bg-gray-100 p-8 sm:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900">
                    Full name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="Jane Smith"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-900">
                    Job title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    required
                    placeholder="Senior Software Engineer"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                  Work email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="jane@acmecorp.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlurEmail}
                  className={`mt-2 block w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 ${
                    emailError
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                      : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
                  }`}
                />
                {emailError && <p className="mt-1.5 text-xs text-rose-500">{emailError}</p>}
              </div>

              <div className="mt-6">
                <label htmlFor="linkedin" className="block text-sm font-semibold text-gray-900">
                  LinkedIn profile <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  required
                  placeholder="https://linkedin.com/in/janesmith"
                  inputMode="url"
                  autoComplete="url"
                  value={formData.linkedin}
                  onChange={handleChange}
                  onBlur={handleBlurLinkedin}
                  className={`mt-2 block w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 ${
                    linkedinError
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                      : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
                  }`}
                />
                {linkedinError && <p className="mt-1.5 text-xs text-rose-500">{linkedinError}</p>}
              </div>

              <div className="mt-6">
                <label htmlFor="teamSize" className="block text-sm font-semibold text-gray-900">
                  Engineering team size <span className="text-rose-500">*</span>
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  required
                  value={formData.teamSize}
                  onChange={handleChange}
                  className="mt-2 block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  <option value="" disabled>
                    Select a range...
                  </option>
                  {teamSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6">
                <label htmlFor="painPoints" className="block text-sm font-semibold text-gray-900">
                  What&apos;s getting you stuck? <span className="text-rose-500">*</span>
                </label>
                <p className="mt-1 text-xs text-gray-500">
                  What types of bugs or debugging scenarios are costing you the most time? Where
                  does your agent get stuck that Replay MCP might help?
                </p>
                <textarea
                  id="painPoints"
                  name="painPoints"
                  required
                  rows={4}
                  placeholder="e.g. We have a lot of flaky Playwright tests in CI that nobody can reproduce locally, and our agent just keeps retrying the same patch without making progress..."
                  value={formData.painPoints}
                  onChange={handleChange}
                  className="mt-2 block w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {error && <p className="mt-4 text-center text-sm text-rose-500">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-8 w-full rounded-full bg-accent px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Apply to become a design partner'}
              </button>

              <p className="mt-4 text-center text-xs text-gray-500">
                We review applications on a rolling basis. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}
