<template>
  <GroupForm v-if="group.id" :group="group" scope="update" />
</template>

<script>
import GroupRetrieve from '@/mixins/GroupRetrieve'
import GroupForm from '@/components/groups/GroupForm.vue'

export default {
  name: 'UpdateForm',
  components: { GroupForm },
  mixins: [GroupRetrieve],
}
</script>
