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
        @input="goTo"
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
      current: 0,
      tabs: [
        { name: '⚽ Pronostics', route: 'predictions' },
        { name: '🧑‍🤝‍🧑 Groupes', route: 'groups' },
        { name: '⚙️', route: 'info' },
      ],
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  created() {
    // Make sure selected tab match route on first load
    const routeName = this.$route.name
    const tabIndex = this.tabs.findIndex((t) => t.route === routeName)
    if (tabIndex >= 0) {
      this.current = tabIndex
    }
  },
  methods: {
    goTo(tabIndex) {
      const tab = this.tabs[tabIndex]
      this.$router.push({ name: tab.route })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap');
#brand {
  font-family: 'Bungee Shade', cursive;
}
</style>
