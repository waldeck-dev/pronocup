<template>
  <div>
    <SectionTitle>{{ group.name }}</SectionTitle>

    <UserCard
      v-for="userGroup in group['user-groups']"
      :key="userGroup.id"
      :user-group="userGroup"
      :is-confirmed="userGroup.confirmed"
      :is-blocked="userGroup.blocked"
    ></UserCard>
  </div>
</template>

<script>
import GroupRetrieve from '@/mixins/GroupRetrieve'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import UserCard from '@/components/groups/UserCard.vue'

export default {
  name: 'GroupDetails',
  components: { SectionTitle, UserCard },
  mixins: [GroupRetrieve],
}
</script>
