const state = () => ({
  // API
  apiUrl: 'http://localhost:1337/',
  // User
  token: null,
  user: {},
})

const getters = {
  isAuthenticated: (state) => !!state.token,
}

const mutations = {
  setAuthToken(state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  setUserData(state, user) {
    Object.assign(state.user, user)
  },
  logout(state) {
    state.token = null
    localStorage.removeItem('token')
  },
}

const actions = {}

export default { state, getters, mutations, actions }
