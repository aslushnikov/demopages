# Demo Pages

This website is deployed with Netlify: https://app.netlify.com/sites/gregarious-blini-b58a7c/overview

To re-deploy, just push to this repo.

### `login_cookie.html`

This page implements a trivial login-by-cookie flow. You can either login via Web Page, or use API Testing
to get login cookie:

```ts
// globalsetup.ts
import { request } from '@playwright/test';

export default async function setup() {
  const appUser = await request.newContext({
    baseURL: 'https://demopages.aslushnikov.com',
  });
  const response = await appUser.post('.netlify/functions/login_cookie', {
    data: {
      'username': 'John Doe',
    }
  });
  await appUser.storageState({ path: 'storageState.json' });
  await appUser.dispose();
}
```

And later in your test:

```ts
// a.spec.ts
import { test, expect } from '@playwright/test';

test.use({ storageState: `storageState.json` });

test('should be logged in', async ({ page }) => {
  await page.goto('https://demopages.aslushnikov.com/login_cookie.html');
  await expect(page.locator('h1')).toHaveText('Hello, "John Doe"!');
});
```

And of course, do not forget `playwright.config.ts`:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './globalsetup.ts',
});
```
