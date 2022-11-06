const state = () => ({
  // API
  apiUrl: 'http://localhost:1337/api',
  // User
  token: null,
  user: {},
  // Predictions
  matches: [],
  predictions: [],
})

const getters = {
  isAuthenticated: (state) => !!state.token,
  apiHeaders: (state) => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${state.token}`,
  }),
  getPrediction: (state) => (matchId) => {
    return state.predictions.find((p) => matchId === parseInt(p.match_id))
  },
}

const mutations = {
  //
  // USER
  //
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
  //
  // PREDICTIONS
  //
  setMatches(state, matches) {
    state.matches = matches
  },
  setPredictions(state, predictions) {
    state.predictions = predictions
  },
}

const actions = {}

export default { state, getters, mutations, actions }
