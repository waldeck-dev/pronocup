import { mapState, mapGetters } from 'vuex'
import { apiError } from '@/components/helpers'

export default {
  data() {
    return {
      group: {},
    }
  },
  async fetch() {
    const groupId = this.$route.params.id
    if (isNaN(+groupId)) return

    const group = await this.$axios
      .get(`${this.apiUrl}/groups/${groupId}`, {
        headers: this.apiHeaders,
      })
      .then((response) => response.data.attributes)
      .catch((error) => apiError.bind(this)(error))
    if (!group) return

    Object.entries(group).forEach(([attr, value]) => {
      this.$set(this.group, attr, value)
    })
  },
  computed: {
    ...mapState(['apiUrl']),
    ...mapGetters(['apiHeaders']),
  },
}
