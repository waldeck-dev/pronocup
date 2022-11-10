<template>
  <div class="has-text-centered">
    <h1 class="is-size-1">👋</h1>
    <h2 class="is-size-5">Au revoir<br />Tu nous manques déjà...</h2>
  </div>
</template>

<script>
export default {
  name: 'LogoutPage',
  layout: 'public',
  mounted() {
    this.$store.commit('logout')

    setTimeout(() => {
      this.$router.push({ name: 'login' })
    }, 1500)
  },
}
</script>
