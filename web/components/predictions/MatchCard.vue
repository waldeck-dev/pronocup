<template>
  <b-field>
    <p class="control is-flex-grow-1">
      <b-button
        type="is-primary is-light"
        rounded
        expanded
        @click="goToPrediction(match.fdorg_id)"
      >
        {{ homeTeam.emoji }}
        {{ predictedScore }}
        {{ awayTeam.emoji }}
      </b-button>
    </p>

    <p class="control">
      <b-button type="is-primary is-light" rounded>
        <span class="is-size-7" v-html="matchDate"></span>
      </b-button>
    </p>
  </b-field>
</template>

<script>
import MatchData from '@/mixins/MatchData'
import PredictionsList from '@/mixins/PredictionsList'
import { getEmojiNumber } from '@/components/helpers'

export default {
  name: 'MatchCard',
  mixins: [PredictionsList, MatchData],
  props: {
    match: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    prediction() {
      return this.$store.getters.getPrediction(this.match.fdorg_id)
    },
    predictedScore() {
      if (!this.prediction.id) return '➖ 🆚 ➖'
      return (
        `${getEmojiNumber(this.prediction?.pronostic?.score?.fullTime?.home)}` +
        ' 🆚 ' +
        `${getEmojiNumber(this.prediction?.pronostic?.score?.fullTime?.away)}`
      )
    },
    matchDate() {
      const date = new Date(this.match.data.utcDate)
      const day = this.addZero(date.getDate())
      const month = this.addZero(date.getMonth() + 1)
      const hour = this.addZero(date.getHours())
      const minute = this.addZero(date.getMinutes())
      return `<p class="line-height-small">${day}/${month}</p><p class="line-height-small">${hour}:${minute}</p>`
    },
  },
  methods: {
    goToPrediction(fdorgid) {
      this.$router.push({ name: 'predictions-fdorgid', params: { fdorgid } })
    },
    addZero(value) {
      return ('0' + value.toString()).slice(-2)
    },
  },
}
</script>

<style>
.line-height-small {
  line-height: 0.75rem;
}
</style>
