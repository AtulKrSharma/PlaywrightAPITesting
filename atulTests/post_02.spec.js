import { test, expect } from '@playwright/test';

import fixtureFile from '../test-data/post_request_body.json';

test.describe('Test', () => {
  test('api-post-2', async ({ request }) => {
    const response = await request.post('/booking', {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
      },
      data: fixtureFile,
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toEqual(200);

    const responseBody = await response.json();
    console.log(responseBody);
  });
});
