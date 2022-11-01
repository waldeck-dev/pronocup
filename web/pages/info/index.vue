<template>
  <div>
    <b-button rounded @click="$router.push({ name: 'logout' })">
      👋 Se déconnecter
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'InfoPage'
}
</script>
