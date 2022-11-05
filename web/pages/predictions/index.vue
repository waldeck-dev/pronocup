<template>
  <div>
    <SectionTitle>Pronostics</SectionTitle>

    <section v-for="(matches, index) in classifiedMatched" :key="index">
      <h2
        class="has-text-weight-bold mb-2"
        v-html="matches.length > 0 ? stages[matches[0].data.stage] : ''"
      ></h2>

      <MatchCard
        v-for="match in matches"
        :key="match.id"
        :match="match"
      ></MatchCard>
    </section>
  </div>
</template>

<script>
import MatchList from '@/mixins/MatchList'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import MatchCard from '@/components/predictions/MatchCard.vue'

export default {
  name: 'PredictionsPage',
  components: { SectionTitle, MatchCard },
  mixins: [MatchList],
  data() {
    return {
      stages: {
        GROUP_STAGE: 'Phase de poule',
        LAST_16: '8<sup>ème</sup> de finale',
        QUARTER_FINALS: 'Quart de finale',
        SEMI_FINALS: 'Demi-finale',
        THIRD_PLACE: 'Petite finale',
        FINAL: 'Final',
      },
    }
  },
  computed: {
    classifiedMatched() {
      return Object.keys(this.stages).map((s) => {
        return [...this.$store.state.matches]
          .filter(
            (m) =>
              m.data.stage === s && m.data.homeTeam.id && m.data.awayTeam.id
          )
          .sort(
            (a, b) =>
              new Date(a.data.utcDate).getTime() -
              new Date(b.data.utcDate).getTime()
          )
      })
    },
  },
}
</script>
