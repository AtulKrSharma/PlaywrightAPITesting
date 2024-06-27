import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';
import fixtureFile from '../test-data/post_request_body.json';

test.describe('test-3', () => {
  test('api-post-get', async ({ request }) => {
    const response = await request.post('/booking', {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
      },
      data: {
        ...fixtureFile,
        firstname: `${faker.person.firstName()}`,
        lastname: `${faker.person.lastName()}`,
        bookingdates: {
          checkin: `${DateTime.now().toFormat('yyyy-MM-dd')}`,
          checkout: `${DateTime.now().plus({ day: 5 }).toFormat('yyyy-MM-dd')}`,
        },
      },
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toEqual(200);

    const responseBody = await response.json();
    console.log(responseBody);
    console.log(`bookingFirstName: ${responseBody.booking.firstName}`);
    console.log(`bookingLastName: ${responseBody.booking.lastName}`);

    const getResponse = await request.get(`/booking`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
      },
      params: {
        firstName: `${responseBody.booking.firstName}`,
        lastName: `${responseBody.booking.lastName}`,
      },
    });

    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toEqual(200);

    const getResponseBody = await response.json();
    console.log(getResponseBody);
  });
});
