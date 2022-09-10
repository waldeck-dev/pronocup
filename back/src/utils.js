/**
 * Get auhtenticated user
 */
async function getAuthenticatedUser(id) {
  return await strapi.entityService.findOne('plugin::users-permissions.user', id);
}

module.exports = { getAuthenticatedUser };
