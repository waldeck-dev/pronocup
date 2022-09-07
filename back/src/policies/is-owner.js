'use strict';

/**
 * `is-owner` policy
 */

module.exports = async (policyContext, config, { strapi }) => {
  const ownerField = config.field || 'owner';
  let owner = config.owner || policyContext.request.body[ownerField];

  if (typeof owner === 'function') {
    owner = await owner({ ctx: policyContext, config, strapi });
  }

  return policyContext.state.user.id === owner;
};
