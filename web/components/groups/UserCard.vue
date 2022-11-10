<template>
  <b-field>
    <p class="control">
      <b-button type="is-primary is-light" rounded expanded>
        🏆
      </b-button>
    </p>

    <p class="control is-flex-grow-1">
      <b-button type="is-primary is-light" rounded expanded>
        {{ userGroup.user.username }}
        <span v-if="isOwner">👑</span>
      </b-button>
    </p>

    <p v-if="isConfirmed" class="control">
      <b-button type="is-primary is-light" class="has-text-weight-bold" rounded>
        <span>666 pts</span>
      </b-button>
    </p>

    <template v-else>
      <p class="control">
        <b-button type="is-danger is-light" rounded>
          <span class="is-size-7">❌</span>
        </b-button>
      </p>

      <p class="control">
        <b-button type="is-primary" rounded>
          <span class="is-size-7">✔️</span>
        </b-button>
      </p>
    </template>
  </b-field>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    userGroup: {
      type: Object,
      required: true,
    },
    isConfirmed: {
      type: Boolean,
      required: true
    },
    isBlocked: {
      type: Boolean,
      required: false
    },
    isOwner: {
      type: Boolean,
      required: false,
      default: false
    }
  },
}
</script>
