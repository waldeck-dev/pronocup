'use strict';

/**
 * group controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { getAuthenticatedUser } = require('../../../utils');

module.exports = createCoreController('api::group.group', ({ strapi }) => ({
  /**
   * Retrieve a Group and related UserGroup object if member of group
   */
  async findOne(ctx) {
    const group = await strapi.entityService
      .findOne('api::group.group', ctx.params.id, {
        populate: { owner: true }
      });

    if (!group) return null;

    const groupData = JSON.parse(JSON.stringify(group));
    delete groupData.owner;

    const currentUserId = ctx.state.user.id;
    const isOwner = currentUserId === group.owner.id;

    const userGroups = await strapi.entityService
      .findMany('api::user-group.user-group', {
        filters: { group: ctx.params.id },
        populate: { user: true }
      });

    const isConfirmedMember =
      isOwner
      || !!userGroups.find(
        (ug) => ug.user.id === currentUserId && ug.confirmed && !ug.blocked
      );

    const newData = { id: group.id, attributes: { ...groupData }};
    if (isConfirmedMember) {
      newData.attributes = {
        ...newData.attributes,
        'user-groups': isOwner
          ? userGroups
          : userGroups.filter((ug) => ug.confirmed && !ug.blocked)
      };
    }

    return newData;
  },

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
