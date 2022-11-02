export default async (ctx) => {
  const store = ctx.store
  const redirect = ctx.redirect
  const app = ctx.app

  if (!store.getters.isAuthenticated) {
    // Check if any token available on localStorage
    const localToken = localStorage.getItem('token')

    if (localToken) {
      store.commit('setAuthToken', localToken)

      const authOk = await app.$axios
        .get(`${store.state.apiUrl}/users/me`, {
          headers: store.getters.apiHeaders,
        })
        .then(() => true)
        .catch(() => {
          store.commit('logout') // Clear existing token
          return false
        })

      if (authOk) return
    }

    // Fallback to login form if no token
    redirect({ name: 'login' })
  }
}
