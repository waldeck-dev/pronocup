<template>
  <div>
    <b-button
      style="display: block; margin: 0 auto"
      type="is-primary"
      icon-left="plus-circle-outline"
      rounded
      @click="$router.push({ name: 'groups-new' })"
    >
      Créer un groupe
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'GroupsPage',
}
</script>
