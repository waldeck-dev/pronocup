'use strict';

/**
 * group router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::group.group', {
  config: {
    update: {
      policies: [
        {
          name: 'global::is-owner',
          config: {
            getObject: async ({ ctx, strapi }) => {
              return await strapi.entityService
                .findOne('api::group.group', ctx.params.id, {
                  populate: { owner: true }
                });
            }
          }
        }
      ]
    }
  }
});
