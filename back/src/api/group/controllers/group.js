'use strict';

/**
 * group controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::group.group', ({ strapi }) => ({
  /**
   * Create UserGroup object upon Group.create()
   */
  async create(ctx) {
    const response = await super.create(ctx);
    
    const group = response.data.id;
    const data = { group, user: ctx.state.user.id };

    await strapi.entityService.create('api::user-group.user-group', { data });

    return response;
  }
}));
