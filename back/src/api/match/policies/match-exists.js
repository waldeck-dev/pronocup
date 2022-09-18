'use strict';

/**
 * `match-exists` policy
 */

module.exports = async (policyContext, config, { strapi }) => {
  if (typeof config.getMatchId !== 'function')
    throw new Error('`getMatchId()` must be set on `match-exists` policy');

  const fdorg_id = config.getMatchId(policyContext);

  const match = await strapi.entityService
    .findMany('api::match.match', { filters: { fdorg_id } });

  if (match.length === 0)
    return policyContext.response
      .ctx.notFound(`Match ${fdorg_id} not found`, {
        code: 'match_not_found'
      });

  return true;
};
