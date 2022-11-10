<template>
  <section class="px-4 pt-5">
    <form>
      <b-field
        v-for="field in fields"
        :key="field.label"
        :label="field.label"
        label-position="on-border"
        class="pb-4"
      >
        <b-input
          v-model="inputs[field.name]"
          :placeholder="field.label"
          :password-reveal="field.type === 'password'"
          :icon="field.icon"
          rounded
        ></b-input>
      </b-field>

      <b-button
        :loading="isLoading"
        type="is-primary"
        expanded
        rounded
        @click="submit(scope)"
      >
        🚀 Go !
      </b-button>

      <b-button
        v-if="['login'].includes(scope)"
        :disabled="isLoading"
        type="is-primary"
        class="mt-2"
        outlined
        rounded
        expanded
        @click="$router.push({ name: 'new' })"
      >
        ➡️ Inscription
      </b-button>

      <div class="mt-2 has-text-centered" style="width: 100%">
        <NuxtLink
          v-if="['new', 'reset', 'forgot'].includes(scope)"
          :to="{ name: 'login' }"
        >
          J'ai déjà un compte
        </NuxtLink>

        <!-- <NuxtLink :to="{ name: 'forgot' }">Mot de passe oublié ?</NuxtLink> -->
      </div>
    </form>
  </section>
</template>

<script>
import { isSuccess } from '@/components/helpers'

export default {
  name: 'HomeView',
  props: {
    scope: { type: String, required: true },
  },
  data() {
    return {
      isLoading: false,
      inputs: {
        username: null,
        identifier: 'pronocup1@yopmail.com',
        password: 'Valentin74!',
        passwordConf: null,
      },
      allFields: [
        {
          name: 'username',
          type: 'text',
          label: 'Pseudonyme',
          icon: 'account',
          scopes: ['new'],
        },
        {
          name: 'identifier',
          type: 'email',
          label: 'Email',
          icon: 'email',
          scopes: ['login', 'new', 'forgot'],
        },
        {
          name: 'password',
          type: 'password',
          label: 'Mot de passe',
          icon: 'lock',
          scopes: ['login', 'new', 'reset'],
        },
        {
          name: 'passwordConf',
          type: 'password',
          label: 'Confirmation mot de passe',
          icon: 'lock-check',
          scopes: ['new', 'reset'],
        },
      ],
    }
  },
  computed: {
    fields() {
      return this.allFields.filter((f) => f.scopes.includes(this.scope))
    },
  },
  methods: {
    async submit(scope) {
      this.isLoading = true

      const action = {
        login: {
          endpoint: '/auth/local',
          args: ['identifier', 'password'],
          resHandler: this.onLogin,
        },
        new: {
          endpoint: '/auth/local/register',
          args: ['username', 'email', 'password'],
          resHandler: this.onRegister,
        },
      }[scope]

      await this.$axios
        .post(
          `${this.$store.state.apiUrl}${action.endpoint}`,
          this.getPayload(action.args)
        )
        .then((res) => action.resHandler(res))

      this.isLoading = false
    },
    getPayload(args) {
      return args.reduce(
        (payload, arg) => {
          payload[arg] =
            arg === 'email' ? this.inputs.identifier : this.inputs[arg]
          return payload
        },
        { data: {} }
      )
    },
    onLogin(res) {
      this.$store.commit('setAuthToken', res.data.jwt)
      this.$store.commit('setUserData', res.data.user)
      this.$router.push({ name: 'predictions' })
    },
    onRegister(res) {
      isSuccess.bind(this)('Votre compte a été créé avec succès !')
      this.onLogin(res)
    },
  },
}
</script>
