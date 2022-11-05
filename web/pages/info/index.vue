<template>
  <div class="has-text-centered">
    <SectionTitle>Gestion de mon compte</SectionTitle>

    <b-button rounded @click="$router.push({ name: 'logout' })">
      👋 Se déconnecter
    </b-button>

    <b-button class="mt-2" type="is-danger" rounded disabled>
      🗑️ Supprimer mon compte
    </b-button>
  </div>
</template>

<script>
import SectionTitle from '@/components/ui/SectionTitle.vue'

export default {
  name: 'InfoPage',
  components: { SectionTitle }
}
</script>
