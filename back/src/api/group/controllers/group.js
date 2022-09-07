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
    const data = { group, user: ctx.state.user.id, confirmed: true };

    await strapi.entityService.create('api::user-group.user-group', { data });

    return response;
  },

  /**
   * Delete UserGroup object upon Group.delete()
   */
  async delete(ctx) {
    console.log('BEFORE', ctx.params);
    const group = +ctx.params.id;

    const entities = await strapi.entityService.findMany('api::user-group.user-group', {
      filters: { user: ctx.state.user.id, group }
    });

    const response = await super.delete(ctx);

    for (const entity of entities) {
      await strapi.entityService.delete('api::user-group.user-group', entity.id);
    }

    return response;
  }
}));
