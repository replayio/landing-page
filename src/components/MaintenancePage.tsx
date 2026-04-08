'use client'

import { useState } from 'react'
import { Container } from '~/components/Container'
import { TextField } from '~/components/Fields'
import { Button } from '~/components/Button'

export function MaintenancePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    appName: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - you can integrate with your backend/API here
    console.log('Form submitted:', formData)
    // For now, this could open a calendar link or submit to an API
  }

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Support for Your Web App
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Need help maintaining or fixing your AI-generated web application? We're here
              to help: we'll use <a href="https://builder.replay.io" target="_blank" rel="noopener noreferrer">Replay Builder</a>{' '}
              to thoroughly test and debug your app, getting it working and keeping it working.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Fill out the form below to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />

            <TextField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />

            <TextField
              label="Company Name"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Acme Inc."
            />

            <TextField
              label="App Name"
              type="text"
              name="appName"
              value={formData.appName}
              onChange={handleChange}
              placeholder="My Awesome App"
            />

            <div>
              <label htmlFor="message" className="mb-3 block text-sm font-medium text-gray-700">
                Tell us about your app and what kind of support you need
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Describe your app, the AI tools you used, and the type of support you're looking for..."
              />
            </div>

            <div className="pt-4">
              <Button type="submit" size="base" variant="solid" color="default" className="w-full">
                Schedule 15 Minute Call
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}

