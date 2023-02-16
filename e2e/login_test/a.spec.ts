import { test, expect } from '@playwright/test';

test.use({ storageState: `storageState.json` });

test('Please work', async ({ page }) => {
  await page.goto('https://demopages.aslushnikov.com/login_cookie.html');
  await expect(page.locator('h1')).toHaveText('Hello, "John Doe"!');
});
