'use strict';

/**
 * `is-worker` policy
 */

module.exports = (policyContext) => {
  if (!policyContext.state.isAuthenticated) return false;

  return policyContext.state.auth.strategy.name === 'api-token'
    && policyContext.state.auth.credentials.name === 'worker';
};
