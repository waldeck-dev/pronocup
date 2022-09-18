const {
  setupStrapi, cleanupStrapi,
  createUser, createGroup, createUserGroup
} = require('../helpers/strapi');
const { v4: uuidv4 } = require('uuid');

const isOwner = require('../../src/policies/is-owner');
const isWorker = require('../../src/policies/is-worker');
const isUniqueInGroup = require('../../src/api/user-group/policies/is-unique-in-group');
const matchExists = require('../../src/api/match/policies/match-exists');

jest.setTimeout(30000);

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  await cleanupStrapi();
});

/**
 * IS-OWNER global policy
 */
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

  test('is-owner negated', async () => {
    const negatedConf = { ...fakeConfig, negate: true };

    // IS owner
    const owner = await isOwner(fakeContext, negatedConf, { strapi });
    expect(owner).toBeFalsy();

    // Is NOT owner
    const fakeContext2 = { state: { user: { id: ownerId * -1 } } };
    const owner2 = await isOwner(fakeContext2, negatedConf, { strapi });
    expect(owner2).toBeTruthy();
  });

  test('is-owner with custom field', async () => {
    const fakeObj2 = { parent: { child: { id: ownerId } } };
    const fakeConf2 = {
      field: 'parent.child.id',
      getObject: jest.fn(() => fakeObj2)
    };

    // IS owner
    const owner = await isOwner(fakeContext, fakeConf2, { strapi });
    expect(owner).toBeTruthy();

    // Is NOT owner
    const fakeContext2 = { state: { user: { id: ownerId * -1 } } };
    const owner2 = await isOwner(fakeContext2, fakeConf2, { strapi });
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

/**
 * IS-WORKER global policy
 */
describe('Test global policy `is-worker`', () => {

  test('Unauthenticated requests return false', async () => {
    const worker = await isWorker({ state: { isAuthenticated: false } });
    expect(worker).toBeFalsy();
  });

  test('Authenticated req fails', async () => {
    const isAuth = { isAuthenticated: true };
    
    // Strategy NOT OK
    const context1 = {
      state: { auth: { strategy: { name: 'I am invalid' } }, ...isAuth },
    };
    const worker1 = await isWorker(context1);
    expect(worker1).toBeFalsy();

    // Credential NOT OK
    const context2 = {
      state: { auth: {
        strategy: { name: 'api-token' },
        credentials: {name: 'I am invalid'}
      },
      ...isAuth },
    };
    const worker2 = await isWorker(context2);
    expect(worker2).toBeFalsy();
  });

  test('Authenticated req succeeds', async () => {
    // Strategy & Credential OK
    const context = {
      state: {
        auth: {
          strategy: { name: 'api-token' },
          credentials: { name: 'worker' }
        },
        isAuthenticated: true
      },
    };
    const worker = await isWorker(context);
    expect(worker).toBeTruthy();
  });

});

/**
 * IS-UNIQUE-IN-GROUP (UserGroup policy)
 */
describe('Test UserGroup policy `is-unique-in-group`', () => {

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

/**
 * MATCH-EXISTS (Match policy)
 */
describe('Test Match policy `match-exists`', () => {

  test('policy fails if not config.getMatchId()', async () => {
    const fakeConfig = [{}, { getMatchId: 'invalid-type' }];
    for (const conf of fakeConfig) {
      const fn = async () => await matchExists({}, conf, { strapi });
      await expect(fn).rejects.toThrow(Error);
    } 
  });

  test('match not exists returns 404', async () => {
    const fakeConfig = { getMatchId: jest.fn(() => -1) };
    const fakeRes = jest.fn(() => false);
    const fakeContext = { response: { ctx: { notFound: fakeRes } } };
    const res = await matchExists(fakeContext, fakeConfig, { strapi });
    expect(res).toBeFalsy();
    expect(fakeRes.mock.calls.length).toBe(1);
  });

  test('match exists returns true', async () => {
    const fdorg_id = uuidv4();
    await strapi.entityService.create('api::match.match', {
      data: { fdorg_id, data: '{}' }
    });

    const fakeConfig = { getMatchId: jest.fn(() => fdorg_id) };
    const fakeRes = jest.fn(() => false);
    const fakeContext = { response: { ctx: { notFound: fakeRes } } };
    const res = await matchExists(fakeContext, fakeConfig, { strapi });
    expect(res).toBeTruthy();
    expect(fakeRes.mock.calls.length).toBe(0);
  });

});
