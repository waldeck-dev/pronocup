const { setupStrapi, cleanupStrapi } = require('./helpers/strapi');

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  await cleanupStrapi();
});

test('strapi is defined', () => {
  expect(strapi).toBeDefined();
});
