'use strict';

/**
 * group router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const isOwnerPolicy = {
  name: 'global::is-owner',
  config: {
    getObject: async ({ ctx, strapi }) => {
      return await strapi.entityService
        .findOne('api::group.group', +ctx.params.id, {
          populate: { owner: true }
        });
    }
  }
};

module.exports = createCoreRouter('api::group.group', {
  config: {
    update: {
      policies: [isOwnerPolicy]
    },

    delete: {
      policies: [isOwnerPolicy]
    }
  }
});
