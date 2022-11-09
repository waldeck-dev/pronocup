const state = () => ({
  // API
  apiUrl: 'http://localhost:1337/api',
  // User
  token: null,
  user: {},
  // Predictions
  stages: {
    GROUP_STAGE: 'Phase de poule',
    LAST_16: '8<sup>ème</sup> de finale',
    QUARTER_FINALS: 'Quart de finale',
    SEMI_FINALS: 'Demi-finale',
    THIRD_PLACE: 'Petite finale',
    FINAL: 'Final',
  },
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
    return (
      state.predictions.find(
        (p) => parseInt(p.match_id) === parseInt(matchId)
      ) ?? {}
    )
  },
  getSortedMatches: (state) => {
    return Object.keys(state.stages).map((s) => {
      return [...state.matches]
        .filter(
          (m) => m.data.stage === s && m.data.homeTeam.id && m.data.awayTeam.id
        )
        .sort(
          (a, b) =>
            new Date(a.data.utcDate).getTime() -
            new Date(b.data.utcDate).getTime()
        )
    })
  },
  getMatchIndices: (_, getters) => (fdorgId) => {
    let sIdx
    let mIdx

    for (let i = 0; i < getters.getSortedMatches.length; i++) {
      const matches = getters.getSortedMatches[i]
      mIdx = matches.findIndex(
        (m) => parseInt(m.fdorg_id) === parseInt(fdorgId)
      )
      if (mIdx > -1) {
        sIdx = i
        break
      }
    }

    return [sIdx, mIdx] // Stage index, match index
  },
  getOffsetMatch: (_, getters) => (fdorgId, offset) => {
    const [sIdx, mIdx] = getters.getMatchIndices(fdorgId)
    if (typeof sIdx !== 'number' || typeof mIdx !== 'number') return null

    try {
      return getters.getSortedMatches[sIdx][mIdx + offset]
    } catch (error) {
      return null
    }
  },
  getNextMatch: (_, getters) => (fdorgId) => {
    return getters.getOffsetMatch(fdorgId, 1) ?? {}
  },
  getPreviousMatch: (_, getters) => (fdorgId) => {
    return getters.getOffsetMatch(fdorgId, -1) ?? {}
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
  putPrediction(state, prediction) {
    const matchId = prediction.match_id
    const idx = state.predictions.findIndex((p) => p.match_id === matchId)
    if (idx >= 0) {
      Object.assign(state.predictions[idx], prediction)
    } else {
      state.predictions.push(prediction)
    }
  },
}

const actions = {}

export default { state, getters, mutations, actions }
