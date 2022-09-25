'use strict';

/**
 * match router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/matches',
      handler: 'match.find'
    },
    {
      method: 'PUT',
      path: '/matches',
      handler: 'match.insert',
      config: {
        policies: ['global::is-worker']
      }
    }
  ]
};
