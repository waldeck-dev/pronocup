'use strict';

/**
 * user-group router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;
const { getUserGroup } = require('../utils');

module.exports = createCoreRouter('api::user-group.user-group', {
  config: {
    /**
     * CREATE: Join request from other user
     */
    create: {
      policies: [
        {
          name: 'global::is-owner',
          config: {
            negate: true,
            getObject: async ({ ctx, strapi }) => await strapi.entityService
              .findOne('api::group.group', ctx.request.body.data.group, {
                populate: { owner: true }
              })
          }
        }
      ]
    },

    /**
     * UPDATE: Group owner accept / reject members
     */
    update: {
      policies: [
        {
          name: 'global::is-owner',
          config: {
            getObject: async ({ ctx, strapi }) => {
              const userGroup = await getUserGroup(ctx.params.id, { strapi });

              return await strapi.entityService
                .findOne('api::group.group', userGroup.group.id, {
                  populate: { owner: true }
                });
            }
          }
        }
      ]
    },

    /**
     * DELETE: User cancels his join request
     */
    delete: {
      policies: [
        {
          name: 'global::is-owner',
          config: {
            field: 'user.id',
            getObject: async ({ ctx, strapi }) => await getUserGroup(ctx.params.id, { strapi })
          }
        }
      ]
    }
  }
});
