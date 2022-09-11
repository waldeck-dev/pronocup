'use strict';

/**
 * user-group router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::user-group.user-group', {
  config: {
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
    }
  }
});
