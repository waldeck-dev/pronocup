'use strict';

/**
 * `is-owner` policy
 */

module.exports = async (policyContext, config, { strapi }) => {

  if (typeof config.getObject !== 'function') {
    throw new Error('This policy requires a `getObject` function to be set');
  }

  let ownerField = 'owner';
  if (typeof config.field === 'string') {
    ownerField = config.field.includes('.')
      ? config.field.split('.')
      : config.field;
  }
  
  const obj = await config.getObject({ ctx: policyContext, config, strapi });
  if (!obj) return;

  let owner;
  if (Array.isArray(ownerField)) {
    owner = ownerField.reduce((acc, f) => acc[f], obj);
  } else {
    owner = obj[ownerField]?.id;
  }
  
  const isOwner = policyContext.state.user.id === owner;

  return config.negate ? !isOwner : isOwner;
};
