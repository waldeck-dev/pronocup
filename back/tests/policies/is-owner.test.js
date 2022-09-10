const { setupStrapi, cleanupStrapi } = require('../helpers/strapi');
const isOwner = require('../../src/policies/is-owner');

jest.setTimeout(30000);

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  await cleanupStrapi();
});

describe('Test global policy `is-owner`', () => {

  const ownerId = 123;
  const fakeContext = { state: { user: { id: ownerId } } };
  const fakeObj = { owner: { id : ownerId } };
  const fakeConfig = { getObject: jest.fn(() => fakeObj) };

  test('is-owner returns owner from config.getObject()', async () => {
    // IS owner
    const owner = await isOwner(fakeContext, fakeConfig, { strapi });
    expect(owner).toBeTruthy();

    // Is NOT owner
    const fakeContext2 = { state: { user: { id: ownerId * -1 } } };
    const owner2 = await isOwner(fakeContext2, fakeConfig, { strapi });
    expect(owner2).toBeFalsy();
  });

  test('is-owner throws error on invalid config', async () => {
    const fakeConfig = [{}, { getObject: 'invalid type' }];
    for (const conf of fakeConfig) {
      const fn = async () => await isOwner(fakeContext, conf, { strapi });
      await expect(fn).rejects.toThrow(Error);
    }
  });
});
