<template>
  <div>
    <div
      class="mb-4 is-flex is-justify-content-center is-align-items-center"
      style="width: 100%"
    >
      <div
        class="is-flex is-flex-direction-column has-text-right is-flex-grow-1"
      >
        <p>{{ homeTeam.emoji }}</p>
        <p>
          <strong class="is-size-7">{{ homeTeam.nameFr }}</strong>
        </p>
      </div>

      <ScoreField v-model="score.fullTime.home" @input="onInput"></ScoreField>

      <span>🆚</span>

      <ScoreField v-model="score.fullTime.away" @input="onInput"></ScoreField>

      <div class="is-flex is-flex-direction-column is-flex-grow-1">
        <p>{{ awayTeam.emoji }}</p>
        <p>
          <strong class="is-size-7">{{ awayTeam.nameFr }}</strong>
        </p>
      </div>
    </div>

    <div class="has-text-centered is-size-7">
      <p>
        <template v-if="predictedWinnerFullTime === 'DRAW'">
          Un match nul
        </template>

        <template v-else>
          Une victoire de
          <strong>{{ predictedWinnerFullTimeName }}</strong></template
        >

        te rapportera <strong class="has-text-success">+10 points</strong>
      </p>

      <p>
        Un score exact de
        <strong>{{ predictedScoreFulltTime }}</strong> ajoutera un bonus de
        <strong class="has-text-success">+8 points</strong> 🥳
      </p>

      <p class="mt-2">
        Un pronostic erroné te fera gagner
        <strong class="has-text-success">+1 point</strong>
      </p>
    </div>
  </div>
</template>

<script>
import MatchData from '@/mixins/MatchData'
import ScoreField from '@/components/predictions/ScoreField.vue'

export default {
  name: 'PredictionPage',
  components: { ScoreField },
  mixins: [MatchData],
  props: {
    value: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    match: {
      type: Object,
      required: true,
    },
    prediction: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      counter: 0,
      score: {
        fullTime: { home: 0, away: 0 },
      },
    }
  },
  computed: {
    predictedWinnerFullTime() {
      if (this.score.fullTime.home === this.score.fullTime.away) return 'DRAW'
      return Object.entries(this.score.fullTime).reduce((w, entry) => {
        if (!w) return entry
        else return w[1] > entry[1] ? w[0] : entry[0]
      }, null)
    },
    predictedWinnerFullTimeName() {
      return {
        home: this.homeTeam.nameFr,
        away: this.awayTeam.nameFr,
      }[this.predictedWinnerFullTime]
    },
    predictedScoreFulltTime() {
      return `${this.score.fullTime.home}-${this.score.fullTime.away}`
    },
  },
  watch: {
    prediction: {
      deep: true,
      handler(newPrediction) {
        if (this.prediction.id) this.updateScore(newPrediction)
      },
    },
  },
  mounted() {
    if (this.prediction.id) this.updateScore(this.prediction)
    this.onInput()
  },
  methods: {
    updateScore(newPrediction) {
      const fields = [{ fullTime: ['home', 'away'] }]
      fields.forEach((fieldSet) => {
        Object.entries(fieldSet).forEach(([parent, keys]) => {
          keys.forEach((key) =>
            this.$set(
              this.score[parent],
              key,
              newPrediction.pronostic.score[parent][key]
            )
          )
        })
      })
    },
    onInput() {
      this.$emit('input', { score: { ...this.score } })
    },
  },
}
</script>
