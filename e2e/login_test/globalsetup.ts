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
