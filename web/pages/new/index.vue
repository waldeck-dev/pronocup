<template>
  <AuthForm scope="new"></AuthForm>
</template>

<script>
import AuthForm from '@/components/auth/AuthForm.vue'

export default {
  name: 'NewPage',
  components: { AuthForm },
  layout: 'public',
}
</script>
