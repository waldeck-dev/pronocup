<template>
  <div class="container column is-10">
    <TheNavbar />
    <Nuxt />
  </div>
</template>

<script>
import TheNavbar from '~/components/layout/TheNavbar.vue'

export default {
  name: 'DefaultLayout',
  components: { TheNavbar },
}
</script>
