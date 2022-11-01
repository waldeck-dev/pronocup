<template>
  <header class="container pb-5">
    <h1 id="brand" class="has-text-centered has-text-primary is-size-1 my-5">
      Pronocup
    </h1>

    <nav v-if="isAuthenticated">
      <b-tabs
        v-model="current"
        type="is-toggle-rounded"
        position="is-centered"
        class="block"
      >
        <b-tab-item
          v-for="tab in tabs"
          :key="tab.name"
          :label="tab.name"
          :disabled="!isAuthenticated"
        >
        </b-tab-item>
      </b-tabs>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheNavbar',
  data() {
    return {
      current: -1,
      tabs: [
        { name: '⚽ Pronostics', route: 'predictions' },
        { name: '🧑‍🤝‍🧑 Groupes', route: 'groups' },
        { name: '💡', route: 'help' },
      ],
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap');
#brand {
  font-family: 'Bungee Shade', cursive;
}
</style>
