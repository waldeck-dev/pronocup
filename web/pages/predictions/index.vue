<template>
  <div v-if="!$fetchState.pending">
    <SectionTitle>Pronostics</SectionTitle>

    <section v-for="(matches, index) in getSortedMatches" :key="index">
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
import { mapState, mapGetters } from 'vuex'
import MatchList from '@/mixins/MatchList'
import PredictionsList from '@/mixins/PredictionsList'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import MatchCard from '@/components/predictions/MatchCard.vue'

export default {
  name: 'PredictionsPage',
  components: { SectionTitle, MatchCard },
  mixins: [MatchList, PredictionsList],
  async fetch() {
    await this.listMatches()
    await this.listPredictions()
  },
  computed: {
    ...mapState(['stages']),
    ...mapGetters(['getSortedMatches']),
  },
}
</script>
