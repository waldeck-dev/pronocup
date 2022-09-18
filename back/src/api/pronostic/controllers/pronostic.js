'use strict';

/**
 * pronostic controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { getAuthenticatedUser, extractData } = require('../../../utils');
const { pronosticSchema } = require('../validations');

module.exports = createCoreController('api::pronostic.pronostic', () => ({
  /**
   * CREATE pronostics
   */
  create: async (ctx) => {
    const match = await strapi.entityService
      .findMany('api::match.match', {
        filters: { fdorg_id: +ctx.params.mid }
      });

    if (match.length === 0)
      return ctx.notFound(`Match ${ctx.params.mid} not found`);

    const matchId = match[0].id;
    const user = await getAuthenticatedUser(ctx.state.user.id);

    // Only ONE pronostic allowed by player
    const existingPronostic = await strapi.entityService
      .findMany('api::pronostic.pronostic', {
        filters: { match_id: matchId, user }
      });

    if (existingPronostic.length > 0)
      return ctx.badRequest('Pronostic already exists', {
        code: 'already_exists'
      });

    // Validate pronostic data
    const pronostic = extractData(ctx.request.body.data, ['pronostic']);

    const { value, error } = pronosticSchema.validate(pronostic.pronostic);
    if (error) return ctx.badRequest(error, {
      code: 'invalid_payload'
    });

    const newProno = await strapi.entityService.create('api::pronostic.pronostic', {
      data: {
        user,
        match_id: matchId,
        pronostic: JSON.stringify(value)
      }
    });

    ctx.send({ data: newProno }, 201);
  }
}));
