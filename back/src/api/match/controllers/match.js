'use strict';

/**
 * match controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::match.match', () => ({
  async find(ctx) {
    console.log(ctx.state);
    return await super.find(ctx);
  }
}));
