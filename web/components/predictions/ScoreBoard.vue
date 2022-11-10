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

      <ScoreField
        v-model="home"
        :is-half-time="isHalfTime"
        :max="
          isHalfTime ? prediction.pronostic?.score?.fullTime?.home : undefined
        "
        @input="onInput"
        @updated="onUpdated"
      ></ScoreField>

      <span>🆚</span>

      <ScoreField
        v-model="away"
        :is-half-time="isHalfTime"
        :max="
          isHalfTime ? prediction.pronostic?.score?.fullTime?.away : undefined
        "
        @input="onInput"
        @updated="onUpdated"
      ></ScoreField>

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
          <strong>{{ predictedWinnerFullTimeName }}</strong>
          {{ isHalfTime ? 'à la mi-temps' : null }}
        </template>

        te rapportera
        <strong class="has-text-success">
          {{ isHalfTime ? '+2 points' : '+5 points' }}
        </strong>
      </p>

      <p>
        Un score exact
        <strong>{{ predictedScore }}</strong>
        te donnera un bonus de
        <strong class="has-text-success">
          {{ isHalfTime ? '+3 points' : '+3 points' }}
        </strong>
      </p>

      <p>
        Un pronostic erroné te fera
        <template v-if="isHalfTime"
          >perdre <strong class="has-text-danger">-2 points</strong></template
        >
        <template v-else
          >gagner <strong class="has-text-success">+1 point</strong></template
        >
      </p>
    </div>
  </div>
</template>

<script>
import MatchData from '@/mixins/MatchData'
import ScoreField from '@/components/predictions/ScoreField.vue'

export default {
  name: 'ScoreBoard',
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
    isHalfTime: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      counter: 0,
      home: 0,
      away: 0,
    }
  },
  computed: {
    predictedWinnerFullTime() {
      if (this.home === this.away) return 'DRAW'
      return Object.entries({ home: this.home, away: this.away }).reduce(
        (w, entry) => {
          if (!w) return entry
          else return w[1] > entry[1] ? w[0] : entry[0]
        },
        null
      )
    },
    predictedWinnerFullTimeName() {
      return {
        home: this.homeTeam.nameFr,
        away: this.awayTeam.nameFr,
      }[this.predictedWinnerFullTime]
    },
    predictedScore() {
      return `${this.home}-${this.away}`
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
  created() {
    if (this.prediction.id) this.updateScore(this.prediction)
    this.onInput()
  },
  methods: {
    updateScore(newPrediction) {
      const source = this.isHalfTime
        ? newPrediction.pronostic.score.halfTime
        : newPrediction.pronostic.score.fullTime

      if (!source && this.isHalfTime && (this.home || this.away)) {
        // Reset haltTime prediction on checkbox unchecked
        this.home = 0
        this.away = 0
      }

      if (!source) return
      ;['home', 'away'].forEach((key) => {
        this.$set(this, key, source[key])
      })
    },
    onInput() {
      this.$emit('input', { home: this.home, away: this.away })
    },
    onUpdated() {
      this.$emit('updated')
    },
  },
}
</script>
