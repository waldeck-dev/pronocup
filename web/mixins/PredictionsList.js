import { mapState, mapGetters } from 'vuex'
import { apiError } from '@/components/helpers'

export default {
  methods: {
    async listPredictions() {
      if (this.$store.state.predictions.length > 0) return

      await this.$axios
        .get(`${this.apiUrl}/pronostics`, { headers: this.apiHeaders })
        .then((response) =>
          this.$store.commit('setPredictions', response.data.data.pronostics)
        )
        .catch((error) => apiError.bind(this)(error))
    },
  },
  computed: {
    ...mapState(['apiUrl']),
    ...mapGetters(['apiHeaders']),
  },
}
