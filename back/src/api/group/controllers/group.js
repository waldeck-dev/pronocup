'use strict';

/**
 * group controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { getAuthenticatedUser } = require('../../../utils');

module.exports = createCoreController('api::group.group', ({ strapi }) => ({
  /**
   * Create Group and add related owner and UserGroup object
   */
  async create(ctx) {
    const response = await super.create(ctx);
    const group = response.data.id;

    const user = await getAuthenticatedUser(ctx.state.user.id);

    // Add current user as Group.owner
    await strapi.entityService
      .update('api::group.group', group, {
        data: { owner: user.id }
      });

    // Create UserGroup relation
    const data = { group, user: ctx.state.user.id, confirmed: true };
    await strapi.entityService.create('api::user-group.user-group', { data });

    return response;
  },

  /**
   * Delete UserGroup object upon Group.delete()
   */
  async delete(ctx) {
    const group = +ctx.params.id;

    const entities = await strapi.entityService.findMany('api::user-group.user-group', {
      filters: { group }
    });

    const response = await super.delete(ctx);

    for (const entity of entities) {
      await strapi.entityService.delete('api::user-group.user-group', entity.id);
    }

    return response;
  }
}));
