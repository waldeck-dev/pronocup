<template>
  <div>
    <SectionTitle>{{ group.name }}</SectionTitle>
    {{ group }}
  </div>
</template>

<script>
import GroupRetrieve from '@/mixins/GroupRetrieve'
import SectionTitle from '@/components/ui/SectionTitle.vue'

export default {
  name: 'GroupDetails',
  components: { SectionTitle },
  mixins: [GroupRetrieve],
}
</script>
