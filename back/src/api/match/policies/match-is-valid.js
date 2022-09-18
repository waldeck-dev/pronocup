'use strict';

/**
 * `match-is-valid` policy
 */

module.exports = async (policyContext, config, { strapi }) => {
  if (typeof config.getMatchId !== 'function')
    throw new Error('`getMatchId()` must be set on `match-is-valid` policy');

  const fdorg_id = config.getMatchId(policyContext);

  const match = await strapi.entityService
    .findMany('api::match.match', { filters: { fdorg_id } });

  if (match.length === 0)
    return policyContext.response
      .ctx.notFound(`Match ${fdorg_id} not found`, {
        code: 'match_not_found'
      });

  const m = match[0].data;

  const matchStartDate = new Date(m?.utcDate);
  if (!(matchStartDate instanceof Date)) return false;

  const now = new Date().getTime();

  return now < matchStartDate.getTime();
};
