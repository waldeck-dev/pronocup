<template>
  <div>
    <h1 class="mb-5 is-size-5 has-text-centered has-text-weight-bold">
      {{ scope === 'create' ? 'Création groupe' : 'Modification groupe' }}
    </h1>

    <b-field label="Nom du groupe" label-position="on-border">
      <b-input
        v-model="inputs.name"
        icon="account-group"
        placeholder="Nom du groupe"
        rounded
        expanded
      ></b-input>
    </b-field>

    <b-button type="is-primary" expanded rounded>💾 Enregistrer</b-button>
  </div>
</template>

<script>
export default {
  name: 'GroupForm',
  props: {
    scope: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      inputs: {
        name: null,
      },
    }
  },
}
</script>
