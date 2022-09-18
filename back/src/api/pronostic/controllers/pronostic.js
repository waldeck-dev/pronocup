'use strict';

/**
 * pronostic controller
 */

const { getAuthenticatedUser, extractData } = require('../../../utils');
const { pronosticSchema } = require('../validations');

module.exports = {
  /**
   * CREATE pronostics
   */
  submit: async (ctx) => {
    const fdorg_id = +ctx.params.mid;

    const match = await strapi.entityService
      .findMany('api::match.match', { filters: { fdorg_id } });

    if (match.length === 0)
      return ctx.notFound(`Match ${fdorg_id} not found`);

    const user = await getAuthenticatedUser(ctx.state.user.id);

    // UPDATE pronostic if already exists
    let existingPronostic = await strapi.entityService
      .findMany('api::pronostic.pronostic', {
        filters: { match_id: fdorg_id, user }
      });

    existingPronostic = existingPronostic.length > 0
      ? existingPronostic[0]
      : null;

    // Validate pronostic data
    const pronostic = extractData(ctx.request.body.data, ['pronostic']);

    const { value, error } = pronosticSchema.validate(pronostic.pronostic);
    if (error) return ctx.badRequest(error, {
      code: 'invalid_payload'
    });

    // Perform CREATE or UPDATE
    if (existingPronostic) {
      const updatedProno = await strapi.entityService
        .update('api::pronostic.pronostic', existingPronostic.id, {
          data: { pronostic: JSON.stringify(value) }
        });

      return ctx.send({ data: updatedProno }, 200);

    } else {
      const newProno = await strapi.entityService
        .create('api::pronostic.pronostic', {
          data: { user, match_id: fdorg_id, pronostic: JSON.stringify(value) }
        });

      ctx.send({ data: newProno }, 201);
    }
  }
};
