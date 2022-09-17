'use strict';

/**
 * match router
 */

module.exports = {
  routes: [
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
