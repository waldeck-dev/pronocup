<template>
  <b-field>
    <p class="control is-flex-grow-1">
      <b-button
        type="is-primary is-light"
        rounded
        expanded
        @click="goToGroup(group.id)"
      >
        {{ group.name }}
      </b-button>
    </p>

    <p class="control">
      <b-dropdown>
        <template #trigger>
          <b-button type="is-primary is-light" rounded>โ๏ธ</b-button>
        </template>

        <b-dropdown-item class="has-text-weight-bold" custom>
          {{ group.name }}
        </b-dropdown-item>

        <b-dropdown-item
          v-for="(action, index) in actions"
          :key="index"
          @click="action.onclick"
        >
          {{ action.label }}
        </b-dropdown-item>
      </b-dropdown>
    </p>
  </b-field>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { isSuccess, apiError } from '@/components/helpers'

export default {
  name: 'GroupCard',
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      actions: [
        {
          label: '๐งโ๐คโ๐ง Voir les membres',
          onclick: () => this.goToGroup(this.group.id),
        },
        {
          label: '๐๏ธ Modifier le groupe',
          onclick: () =>
            this.$router.push({
              name: 'groups-id-update',
              params: { id: this.group.id },
            }),
        },
        {
          label: '๐๏ธ Supprimer le groupe',
          onclick: () =>
            this.$buefy.dialog.confirm({
              title: '๐๏ธ Supprimer le groupe',
              message: 'Es-tu sรปr de vouloir supprimer le groupe\u00A0?',
              type: 'is-danger',
              hasIcon: true,
              cancelText: 'Annuler',
              closeOnConfirm: false,
              confirmText: 'Supprimer',
              onConfirm: async (_, dialog) => await this.deleteGroup(dialog),
            }),
        },
      ],
    }
  },
  computed: {
    ...mapState(['apiUrl']),
    ...mapGetters(['apiHeaders']),
  },
  methods: {
    goToGroup(groupId) {
      this.$router.push({ name: 'groups-id', params: { id: groupId } })
    },
    async deleteGroup(dialog) {
      await this.$axios
        .delete(`${this.apiUrl}/groups/${this.group.id}`, {
          headers: this.apiHeaders,
        })
        .then(() => {
          this.$emit('deleted', this.group.id)
          this.$router.push({ name: 'groups' })
          isSuccess.bind(this)(`Le groupe "${this.group.name}" a รฉtรฉ supprimรฉ`)
          dialog.close()
        })
        .catch((error) => apiError.bind(this)(error))
    },
  },
}
</script>
