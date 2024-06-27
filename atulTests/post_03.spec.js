import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

test.describe('test-3', () => {
  test('api-post-1', async ({ request }) => {
    const response = await request.post('/booking', {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
      },
      data: {
        firstname: `${faker.person.firstName()}`,
        lastname: `${faker.person.lastName()}`,
        totalprice: `${faker.number.float({ min: 10, max: 1000 })}`,
        depositpaid: `${faker.datatype.boolean}`,
        bookingdates: {
          checkin: `${DateTime.now().toFormat('yyyy-MM-dd')}`, //`${DateTime.now().toFormat('yyyy - MM - dd')}`,
          checkout: `${DateTime.now().plus({ day: 5 }).toFormat('yyyy-MM-dd')}`,
        },
        additionalneeds: `${faker.string.alpha(6)}`,
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
});
