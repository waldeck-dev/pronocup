export default {
  computed: {
    fdorgId() {
      return +this.$route.params.fdorgid
    },
    homeTeam() {
      return this.match?.data?.homeTeam ?? {}
    },
    awayTeam() {
      return this.match?.data?.awayTeam ?? {}
    },
  },
}
