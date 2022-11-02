<template>
  <div>
    <b-button
      style="display: block; margin: 0 auto 1.5rem auto"
      type="is-primary"
      icon-left="plus-circle-outline"
      rounded
      @click="$router.push({ name: 'groups-new' })"
    >
      Créer un groupe
    </b-button>

    <SectionTitle>Mes groupes</SectionTitle>

    <GroupCard
      v-for="group in groups"
      :key="group.id"
      :group="group"
    ></GroupCard>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { apiError } from '@/components/helpers'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import GroupCard from '@/components/groups/GroupCard.vue'

export default {
  name: 'GroupsPage',
  components: { SectionTitle, GroupCard },
  data() {
    return {
      groups: [],
    }
  },
  async fetch() {
    await this.$axios
      .get(`${this.apiUrl}/groups`, { headers: this.apiHeaders })
      .then((response) => {
        this.groups = response.data.data
      })
      .catch((error) => apiError(error))
  },
  computed: {
    ...mapState(['apiUrl']),
    ...mapGetters(['apiHeaders']),
  },
}
</script>
