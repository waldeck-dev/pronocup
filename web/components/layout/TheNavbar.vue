<template>
  <header class="container mb-5">
    <h1
      id="brand"
      class="has-text-centered has-text-primary is-size-1 my-5"
      @click="$router.push({ name: 'predictions' })"
    >
      Pronocup
    </h1>

    <nav v-if="isAuthenticated" class="is-flex is-justify-content-center">
      <b-field>
        <p v-for="(tab, index) in tabs" :key="tab.name" class="control">
          <b-button
            :type="highlightTab(tab) ? 'is-primary' : null"
            :disabled="!isAuthenticated"
            rounded
            @click="goTo(index)"
          >
            {{ tab.name }}
          </b-button>
        </p>
      </b-field>
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
    const tabIndex = this.tabs.findIndex((t) => routeName.startsWith(t.route))
    if (tabIndex >= 0) {
      this.current = tabIndex
    }
  },
  methods: {
    highlightTab(tab) {
      const routeName = this.$route.name
      return routeName.startsWith(tab.route)
    },
    goTo(tabIndex) {
      const tab = this.tabs[tabIndex]
      this.$router.push({ name: tab.route })
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap');
#brand {
  font-family: 'Bungee Shade', cursive;
}
</style>
