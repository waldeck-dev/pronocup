import { mapState, mapGetters } from 'vuex'
import { apiError } from '@/components/helpers'

export default {
  created() {
    if (this.$store.state.predictions.length > 0) return

    this.$axios
      .get(`${this.apiUrl}/pronostics`, { headers: this.apiHeaders })
      .then((response) =>
        this.$store.commit('setPredictions', response.data.data.pronostics)
      )
      .catch((error) => apiError.bind(this)(error))
  },
  computed: {
    ...mapState(['apiUrl']),
    ...mapGetters(['apiHeaders']),
  },
}
