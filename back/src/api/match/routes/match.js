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
      method: 'GET',
      path: '/matches/processed',
      handler: 'match.processed',
      config: {
        policies: ['global::is-worker']
      }
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
