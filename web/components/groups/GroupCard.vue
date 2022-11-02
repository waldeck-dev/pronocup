<template>
  <b-field>
    <p class="control is-flex-grow-1">
      <b-button type="is-primary is-light" rounded expanded>
        {{ group.name }}
      </b-button>
    </p>

    <p class="control">
      <b-dropdown>
        <template #trigger>
          <b-button type="is-primary is-light" rounded expanded>⚙️</b-button>
        </template>

        <b-dropdown-item class="has-text-weight-bold" custom>{{
          group.name
        }}</b-dropdown-item>

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
        { label: '🧑‍🤝‍🧑 Voir les membres', onclick() {} },
        { label: '🖊️ Modifier le group', onclick() {} },
        { label: '🗑️ Supprimer le groupe', onclick() {} },
      ],
    }
  },
  methods: {},
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bungee&display=swap');
.bungee {
  font-family: 'Bungee', cursive;
}
</style>
