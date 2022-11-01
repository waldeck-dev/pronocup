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
        :disabled="isLoading"
        type="is-primary"
        class="mt-2"
        outlined
        rounded
        expanded
      >
        ➡️ Inscription
      </b-button>

      <!-- <NuxtLink :to="{ name: 'forgot' }">Mot de passe oublié ?</NuxtLink> -->
    </form>
  </section>
</template>

<script>
export default {
  name: 'HomeView',
  props: {
    scope: { type: String, required: true },
  },
  data() {
    return {
      isLoading: false,
      inputs: {
        identifier: 'pronocup1@yopmail.com',
        password: 'Valentin74!',
        passwordConf: null,
      },
      allFields: [
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
          endpoint: 'api/auth/local',
          args: ['identifier', 'password'],
          resHandler: (res) => {
            this.$store.commit('setAuthToken', res.data.jwt)
            this.$store.commit('setUserData', res.data.user)
            this.$router.push({ name: 'predictions' })
          },
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
          payload[arg] = this.inputs[arg]
          return payload
        },
        { data: {} }
      )
    },
  },
}
</script>
