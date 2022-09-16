const {
  setupStrapi, cleanupStrapi,
  createUser, createGroup, createUserGroup
} = require('../helpers/strapi');
const isUniqueInGroup = require('../../src/api/user-group/policies/is-unique-in-group');

jest.setTimeout(30000);

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  await cleanupStrapi();
});

describe('Test global policy `is-unique-in-group`', () => {

  test('missing `group` attr in body return false', async () => {
    const context = {
      request: { body: { data: { no_group_in_here: true } } }
    };
    const isUnique = await isUniqueInGroup(context, {}, { strapi });
    expect(isUnique).toBeFalsy();
  });

  test('policy work as expected', async () => {
    const group = await createGroup();
    const { user } = await createUser();

    const context = {
      state: { user },
      request: { body: { data: { group: group.id } } }
    };

    // User NOT in group => true
    const isUnique = await isUniqueInGroup(context, {}, { strapi });
    expect(isUnique).toBeTruthy();

    // User ALREADY IN group => false
    await createUserGroup(user, group);
    const isUnique2 = await isUniqueInGroup(context, {}, { strapi });
    expect(isUnique2).toBeFalsy();
  });

});
