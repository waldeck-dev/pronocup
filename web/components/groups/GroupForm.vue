<template>
  <div>
    <SectionTitle>
      {{ scope === 'create' ? 'Création groupe' : 'Modification groupe' }}
    </SectionTitle>

    <b-field label="Nom du groupe" label-position="on-border">
      <b-input
        v-model="inputs.name"
        icon="account-group"
        placeholder="Nom du groupe"
        maxlength="30"
        rounded
        expanded
      ></b-input>
    </b-field>

    <b-button type="is-primary" expanded rounded @click="submit"
      >💾 Enregistrer</b-button
    >
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { isSuccess, apiError } from '@/components/helpers'
import SectionTitle from '@/components/ui/SectionTitle.vue'

export default {
  name: 'GroupForm',
  components: { SectionTitle },
  props: {
    scope: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      inputs: {
        name: null,
      },
    }
  },
  computed: {
    ...mapState(['apiUrl']),
    ...mapGetters(['apiHeaders']),
  },
  methods: {
    async submit() {
      this.isLoading = true

      const endpoint = `${this.apiUrl}/groups`
      const method = 'post'

      await this.$axios[method](
        endpoint,
        {
          data: { name: this.inputs.name },
        },
        { headers: this.apiHeaders }
      )
        .then((response) => {
          isSuccess.bind(this)(
            `Le groupe "${response.data.data.attributes.name}" a été créé`
          )
          this.$router.push({
            name: 'groups-id',
            params: { id: response.data.data.id },
          })
        })
        .catch((error) => apiError.bind(this)(error))

      this.isLoading = false
    },
  },
}
</script>
