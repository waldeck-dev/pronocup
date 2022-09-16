'use strict';

/**
 * `is-unique-in-group` policy
 */

module.exports = async (policyContext, _config, { strapi }) => {
  const group = policyContext.request.body.data?.group;
  if (!group) return false;

  const userGroups = await strapi.entityService
    .findMany('api::user-group.user-group', {
      filters: { user: policyContext.state.user.id, group }
    });
  
  return userGroups.length === 0; 
};
