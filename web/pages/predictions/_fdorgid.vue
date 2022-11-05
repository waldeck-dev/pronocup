<template>
  <div>
    {{ fdorgId }}
  </div>
</template>

<script>
export default {
  name: 'PredictionPage',
  computed: {
    fdorgId() {
      return +this.$route.params.fdorgid
    },
  },
}
</script>
