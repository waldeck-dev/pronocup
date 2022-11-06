export default {
  computed: {
    homeTeam() {
      return this.match?.data?.homeTeam ?? {}
    },
    awayTeam() {
      return this.match?.data?.awayTeam ?? {}
    },
  },
}
