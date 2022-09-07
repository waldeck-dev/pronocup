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
            owner: async ({ ctx, strapi }) => {
              const entities = await strapi.entityService.findMany('api::user-group.user-group', {
                filters:  { group: +ctx.params.id, user: ctx.state.user.id }
              });

              if (entities.length === 1) return ctx.state.user.id;
            }
          }
        }
      ]
    }
  }
});
