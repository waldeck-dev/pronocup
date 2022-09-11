/**
 * Get auhtenticated user
 */
async function getAuthenticatedUser(id) {
  return await strapi.entityService.findOne('plugin::users-permissions.user', id);
}

/**
 * Return a new object representing request.body with only specified fields
 * @param {Object} originalBody request.body to be filters
 * @param {String[]} fields fields to be kept on new request.body
 */
function extractData(originalBody, fields) {
  const newBody = {};

  for (const field of fields) {
    if (originalBody[field]) {
      newBody[field] = originalBody[field];
    }
  }
  
  return newBody;
}

module.exports = { getAuthenticatedUser, extractData };
