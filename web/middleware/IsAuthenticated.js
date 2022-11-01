export default ({ store, redirect, next }) => {
  if (!store.getters.isAuthenticated) {
    // Check if any token available on localStorage
    const localToken = localStorage.getItem('token')

    if (localToken) {
      store.commit('setAuthToken', localToken)
      return
    }

    // Fallback to login form if no token
    redirect({ name: 'login' })
  }
}
