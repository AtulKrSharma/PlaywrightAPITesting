import { test, expect } from '@playwright/test';

test('api-post-1', async ({ request }) => {
  const response = await request.post('/booking', {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
    },
    data: {
      firstname: 'atuKl',
      lastname: 'sharma',
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01',
      },
      additionalneeds: 'GMS',
    },
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toEqual(200);

  const responseBody = await response.json();
  console.log(responseBody);

  // expect(responseBody.booking).toHaveProperty('firstname', 'Jim');
  // expect(responseBody.booking).toHaveProperty('lastname', 'Brown');
  // expect(responseBody.booking).toHaveProperty('totalprice', 111);
});
