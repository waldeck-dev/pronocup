<template>
  <AuthForm scope="login" />
</template>

<script>
import AuthForm from '@/components/auth/AuthForm.vue'

export default {
  name: 'LoginPage',
  components: { AuthForm },
}
</script>
