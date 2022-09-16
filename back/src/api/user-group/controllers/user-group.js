'use strict';

/**
 * user-group controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { extractData } = require('../../../utils');

module.exports = createCoreController('api::user-group.user-group', ({ strapi }) => ({
  /**
   * FIND: List user's UserGroup
   */
  async find(ctx) {
    const userGroups = await strapi.entityService
      .findMany('api::user-group.user-group', {
        filters: { user: ctx.state.user.id },
        populate: { group: true }
      });

    return ctx.send({ data: userGroups }, 200);
  },

  /**
   * CREATE: Join request (create)
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
