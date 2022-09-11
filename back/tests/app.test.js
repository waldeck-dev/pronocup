const { setupStrapi, cleanupStrapi, createUser } = require('./helpers/strapi');
const { getAuthenticatedUser, extractData } = require('../src/utils');

jest.setTimeout(30000);

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  await cleanupStrapi();
});

test('strapi is defined', () => {
  expect(strapi).toBeDefined();
});

/**
 * Test utils.js
 */
describe('Test utils.js functions', () => {

  test('getAuthenticatedUser works properly', async () => {
    // User NOT exists
    expect(await getAuthenticatedUser(-1)).toBe(null);

    // User exists
    const { user } = await createUser();
    const authUser = await getAuthenticatedUser(user.id);
    expect(typeof authUser).toBe('object');
    expect(authUser.id).toBe(user.id);
  });

});
