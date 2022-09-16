const getUserGroup = async (id, { strapi }) => await strapi.entityService
  .findOne('api::user-group.user-group', id, {
    populate: { group: true, user: true }
  });

module.exports = { getUserGroup };
