<template>
  <div class="container column is-10" style="max-width: 700px;">
    <TheNavbar />
    <Nuxt />
  </div>
</template>

<script>
import TheNavbar from '~/components/layout/TheNavbar.vue'

export default {
  name: 'DefaultLayout',
  components: { TheNavbar },
  middleware: 'IsAuthenticated',
}
</script>
