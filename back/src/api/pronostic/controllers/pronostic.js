'use strict';

/**
 * pronostic controller
 */

const { getAuthenticatedUser, extractData } = require('../../../utils');
const { pronosticSchema } = require('../validations');

module.exports = {
  /**
   * FIND user's pronostics
   */
  find: async (ctx) => {
    let user;

    const userId = ctx.query.user;
    if (userId) {
      if (typeof userId === 'number' && !isNaN(userId)) 
        return ctx.badRequest('Invalid user ID', { code: 'invalid_payload' });

      user = await strapi.entityService
        .findOne('plugin::users-permissions.user', userId);

    } else {
      user = await getAuthenticatedUser(ctx.state.user.id);
    }

    const filters = { user };

    const matchId = ctx.query.match;
    if (matchId) {
      if (typeof matchId === 'number' && !isNaN(matchId))
        return ctx.badRequest('Invalid match ID', { code: 'invalid_payload' });

      const match = await strapi.entityService
        .findMany('api::match.match', { filters: { fdorg_id: matchId } });
      
      filters.match_id = match.length > 0 ? match[0].fdorg_id : -1;
    }

    const pronostics = await strapi.entityService
      .findMany('api::pronostic.pronostic', { filters });

    return ctx.send({ data: { pronostics } }, 200);
  },

  /**
   * FIND ONE user pronostic
   */
  findOne: async (ctx) => {
    const fdorg_id = +ctx.params.mid;

    const user = await getAuthenticatedUser(ctx.state.user.id);

    // UPDATE pronostic if already exists
    const pronostic = await strapi.entityService
      .findMany('api::pronostic.pronostic', {
        filters: { match_id: fdorg_id, user }
      });

    if (pronostic.length === 0) {
      return ctx.notFound('No prediction');
    }

    ctx.send({ data: pronostic[0] });
  },

  /**
   * CREATE pronostics
   */
  submit: async (ctx) => {
    const fdorg_id = +ctx.params.mid;

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
