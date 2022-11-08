<template>
  <div v-if="!$fetchState.pending">
    <b-message v-if="homeTeam.id && awayTeam.id" class="mb-5 has-text-centered">
      <h2 class="mb-1 has-text-weight-bold">
        {{ homeTeam.nameFr }} {{ homeTeam.emoji }}
        🆚
        {{ awayTeam.emoji }} {{ awayTeam.nameFr }}
      </h2>

      <p class="is-size-7">{{ matchDate }}</p>
    </b-message>

    <SectionTitle>Mon pronostic</SectionTitle>

    <!-- Score Full-Time -->
    <h3 class="prediction-title has-text-primary">Score du match</h3>
    <ScoreBoard
      v-model="fullTime"
      :match="match"
      :prediction="prediction"
      @updated="submit"
    ></ScoreBoard>

    <!-- Score Half-time -->
    <h3 class="mt-6 prediction-title has-text-primary">Score à la mi-temps</h3>
    <h4 class="optional has-text-primary is-size-7">(facultatif)</h4>
    <div style="opacity: 0.5">
      <ScoreBoard
        v-model="halfTime"
        :match="match"
        :prediction="prediction"
        is-half-time
        @updated="submit"
      ></ScoreBoard>
    </div>
  </div>
</template>

<script>
import { apiError } from '@/components/helpers'
import MatchList from '@/mixins/MatchList'
import PredictionsList from '@/mixins/PredictionsList'
import MatchData from '@/mixins/MatchData'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ScoreBoard from '@/components/predictions/ScoreBoard.vue'

export default {
  name: 'PredictionPage',
  components: { SectionTitle, ScoreBoard },
  mixins: [MatchList, PredictionsList, MatchData],
  data() {
    return {
      fullTime: {},
      halfTime: {},
    }
  },
  async fetch() {
    await this.listMatches()
    await this.listPredictions()
  },
  computed: {
    match() {
      return (
        this.$store.state.matches.find(
          (m) => parseInt(m.fdorg_id) === this.fdorgId
        ) ?? {}
      )
    },
    matchDate() {
      return new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(this.match.data.utcDate))
    },
    prediction() {
      return this.$store.getters.getPrediction(this.fdorgId)
    },
  },
  watch: {
    '$fetchState.pending'() {
      if (!this.$fetchState.pending && !this.prediction.id) {
        setTimeout(() => {
          this.submit()
        }, 1000);
      }
    },
  },
  methods: {
    async submit(isHalfTime = false) {
      const payload = { score: { fullTime: this.fullTime } }

      if (isHalfTime) {
        payload.score.halfTime = this.halfTime
      }

      await this.$axios
        .put(
          `${this.apiUrl}/matches/${this.fdorgId}/pronostics`,
          { data: { pronostic: { ...payload } } },
          { headers: this.apiHeaders }
        )
        .then((response) => {
          this.$store.commit('putPrediction', response.data.data)
        })
        .catch((error) => apiError.bind(this)(error))
    },
  },
}
</script>

<style>
.prediction-title {
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: bold;
}
.optional {
  text-align: center;
  margin-top: -1.75rem;
}
</style>
