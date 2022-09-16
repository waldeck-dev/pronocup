const Strapi = require('@strapi/strapi');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

let instance;

async function setupStrapi() {
  if (!instance) {
    await Strapi().load();
    instance = strapi;

    await instance.server.mount();
  }
  return instance;
}

async function cleanupStrapi() {
  const dbSettings = strapi.config.get('database.connections.default.settings');

  //close server to release the db-file
  await strapi.server.httpServer.close();

  //delete test database after all tests have completed
  if (dbSettings && dbSettings.filename) {
    const tmpDbFile = `${__dirname}/../${dbSettings.filename}`;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
  // close the connection to the database
  await strapi.db.connection.destroy();
}

const mockUserData = {
  username: uuidv4(),
  email: `${uuidv4()}@strapi.com`,
  provider: 'local',
  password: '1234abc',
  confirmed: true,
  blocked: null,
};

async function createUser(customData = {}) {
  const defaultRole = await strapi.entityService.findOne('plugin::users-permissions.role', 1);

  const role = customData.role || defaultRole;

  const user = await strapi.plugins['users-permissions'].services.user.add({
    ...mockUserData,
    ...customData,
    role: role.id
  });

  const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
    id: user.id,
  });

  return { user, role, jwt };
}

async function createGroup(customData = {}) {
  return await strapi.entityService
    .create('api::group.group', {
      data: {
        name: 'The test group',
        ...customData
      }
    });
}

async function createUserGroup(user, group, customData = {}) {
  return await strapi.entityService
    .create('api::user-group.user-group', {
      data: {
        user,
        group,
        ...customData
      }
    });
}

module.exports = {
  setupStrapi, cleanupStrapi,
  createUser, createGroup, createUserGroup
};
