'use strict';

const { extractData } = require('../../../utils');

/**
 * match controller
 */

module.exports = {
  insert: async (ctx) => {
    const payload = ctx.request.body.data?.matches;
    if (!payload || !Array.isArray(payload)) {
      return ctx.send('Invalid payload', 400);
    }

    // Validate data
    const data = extractData(ctx.request.body.data, ['matches']);
    if (!data.matches.every((m) => typeof m.id === 'number')) {
      return ctx.send('Invalid payload', 400);
    }

    // Delete all existing matches
    await strapi.db.query('api::match.match').deleteMany();

    // Store new matches data
    const formattedMatches = data.matches
      .map((m) => ({ fdorg_id: m.id, data: { ...m } }));
    const res = await  strapi.db.query('api::match.match')
      .createMany({ data: formattedMatches });

    await ctx.send(res, 201);
  }
};
