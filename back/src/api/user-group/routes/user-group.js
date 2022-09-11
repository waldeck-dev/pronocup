'use strict';

/**
 * user-group router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

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
              const userGroup = await strapi.entityService
                .findOne('api::user-group.user-group', ctx.params.id, {
                  populate: { group: true }
                });

              return await strapi.entityService
                .findOne('api::group.group', userGroup.group.id, {
                  populate: { owner: true }
                });
            }
          }
        }
      ]
    }
  }
});
