'use strict';

/**
 * `is-owner` policy
 */

module.exports = async (policyContext, config, { strapi }) => {
  const args = { ctx: policyContext, config, strapi };
  
  const obj = await config.getObject(args);
  if (!obj) return;

  const ownerField = config.field || 'owner';
  let owner = config.owner || obj[ownerField].id;

  if (typeof owner === 'function') {
    owner = await owner(args);
  }

  return policyContext.state.user.id === owner;
};
