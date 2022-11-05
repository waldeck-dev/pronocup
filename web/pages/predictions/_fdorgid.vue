<template>
  <div
    class="is-flex is-justify-content-center is-align-items-center"
    style="width: 100%"
  >
    <div class="is-flex is-flex-direction-column has-text-right is-flex-grow-1">
      <p>{{ homeTeam.emoji }}</p>
      <p>
        <strong class="is-size-7">{{ homeTeam.nameFr }}</strong>
      </p>
    </div>

    <ScoreField v-model="score.home"></ScoreField>

    <span>🆚</span>

    <ScoreField v-model="score.away"></ScoreField>

    <div class="is-flex is-flex-direction-column is-flex-grow-1">
      <p>{{ awayTeam.emoji }}</p>
      <p>
        <strong class="is-size-7">{{ awayTeam.nameFr }}</strong>
      </p>
    </div>
  </div>
</template>

<script>
import MatchList from '@/mixins/MatchList'
import ScoreField from '@/components/predictions/ScoreField.vue'

export default {
  name: 'PredictionPage',
  components: { ScoreField },
  mixins: [MatchList],
  data() {
    return {
      score: {
        home: 0,
        away: 0,
      },
    }
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
    homeTeam() {
      return this.match?.data?.homeTeam ?? {}
    },
    awayTeam() {
      return this.match?.data?.awayTeam ?? {}
    },
  },
}
</script>
