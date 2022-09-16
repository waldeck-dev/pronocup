'use strict';

/**
 * user-group controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { extractData } = require('../../../utils');

module.exports = createCoreController('api::user-group.user-group', ({ strapi }) => ({
  /**
   * Join request (create)
   */
  async create(ctx) {
    const data = {
      ...extractData(ctx.request.body.data, ['group']),
      user: ctx.state.user.id
    };

    const userGroup = await strapi.entityService
      .create('api::user-group.user-group', { data });

    if (userGroup) return ctx.send({ data: userGroup, meta: {} }, 201);
  },

  /**
   * UPDATE: Group owner accept / reject members
   */
  async update(ctx) {
    if (ctx.request.body.data) {
      ctx.request.body.data = {
        ...extractData(ctx.request.body.data, ['confirmed', 'blocked'])
      };
    }

    return await super.update(ctx);
  }
}));
