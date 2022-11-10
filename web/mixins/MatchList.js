import { mapState, mapGetters } from 'vuex'
import { apiError } from '@/components/helpers'

export default {
  methods: {
    async listMatches() {
      if (this.$store.state.matches.length > 0) return

      await this.$axios
        .get(`${this.apiUrl}/matches`, { headers: this.apiHeaders })
        .then((response) =>
          this.$store.commit('setMatches', response.data.data)
        )
        .catch((error) => apiError.bind(this)(error))
    },
  },
  computed: {
    ...mapState(['apiUrl']),
    ...mapGetters(['apiHeaders']),
  },
}
