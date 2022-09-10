'use strict';

/**
 * `is-owner` policy
 */

module.exports = async (policyContext, config, { strapi }) => {

  if (typeof config.getObject !== 'function') {
    throw new Error('This policy requires a `getObject` function to be set');
  }

  const ownerField = config.field || 'owner';
  
  const obj = await config.getObject({ ctx: policyContext, config, strapi });
  if (!obj) return;

  const owner = obj[ownerField]?.id;
  
  const isOwner = policyContext.state.user.id === owner;

  return config.negate ? !isOwner : isOwner;
};
