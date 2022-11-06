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

    <ScoreBoard :match="match"></ScoreBoard>
  </div>
</template>

<script>
import MatchList from '@/mixins/MatchList'
import Teams from '@/mixins/Teams'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ScoreBoard from '@/components/predictions/ScoreBoard.vue'

export default {
  name: 'PredictionPage',
  components: { SectionTitle, ScoreBoard },
  mixins: [MatchList, Teams],
  data() {
    return {}
  },
  computed: {
    fdorgId() {
      return +this.$route.params.fdorgid
    },
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
  },
}
</script>
