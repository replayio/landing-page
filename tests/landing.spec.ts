import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/')
})

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Replay/)
})

test.skip('schedule demo', async ({ page }) => {
  await page.getByRole('link', { name: 'Schedule a demo ->' }).click()
  const el = await page.frameLocator('iframe[name="cal-embed\\="]').getByTestId('event-title')
  await expect(el).toBeVisible()
})
