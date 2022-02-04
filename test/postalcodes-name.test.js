const request = require('supertest');
const { test, describe } = require('@jest/globals');
const assert = require('assert').strict;

const app = require('../app');

describe('finding postal codes by giving a postal district name', () => {

    test('only postal code for Korvatunturi is 99999', async () => {
        const response = await request(app).get('/postalcodes/korvatunturi');

        assert.ok(response.ok, `Server responded with HTTP status ${response.statusCode}`);
        assert.ok(response.body.numbers, 'Response JSON should have attribute `numbers`');

        assert.strictEqual(response.body.numbers, ['99999']);
    });

    test('Helsinki has multiple postal codes', async () => {
        const response = await request(app).get('/postalcodes/helsinki');

        assert.ok(response.ok, `Server responded with HTTP status ${response.statusCode}`);
        assert.ok(response.body.name, 'Response JSON should have attribute `numbers`');

        ['00100', '00730'].forEach(number => {
            assert.strictEqual(response.body.numbers.includes(number), `Helsinki should have postal code ${number}.`);
        });
    });
});