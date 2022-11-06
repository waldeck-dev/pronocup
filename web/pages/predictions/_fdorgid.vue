<template>
  <div>
    <b-message v-if="homeTeam.id && awayTeam.id" class="mb-5 has-text-centered">
      <h2 class="mb-1 has-text-weight-bold">
        {{ homeTeam.nameFr }} {{ homeTeam.emoji }}
        🆚
        {{ awayTeam.emoji }} {{ awayTeam.nameFr }}
      </h2>

      <p class="is-size-7">{{ matchDate }}</p>
    </b-message>

    <SectionTitle>Mon pronostic</SectionTitle>

    <ScoreBoard :match="match" :prediction="prediction"></ScoreBoard>
  </div>
</template>

<script>
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
    return {}
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
}
</script>
