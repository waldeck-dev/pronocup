<template>
  <div class="mx-3 is-flex is-flex-direction-column is-align-items-center">
    <div
      :style="{ cursor: canIncrease ? 'pointer' : 'initial' }"
      :class="{
        'has-text-primary': canIncrease,
        'has-text-grey-lighter': !canIncrease,
        'is-small': isHalfTime,
      }"
      class="arrow has-text-centered has-text-primary"
      @click="increase"
    >
      ▲
    </div>

    <div
      :class="{
        'is-size-1': !isHalfTime,
        'is-size-3': isHalfTime,
        'is-small': isHalfTime,
      }"
      class="score is-flex is-justify-content-center is-align-items-center"
    >
      {{ value }}
    </div>

    <div
      :style="{ cursor: canDecrease ? 'pointer' : 'initial' }"
      :class="{
        'has-text-primary': canDecrease,
        'has-text-grey-lighter': !canDecrease,
        'is-small': isHalfTime,
      }"
      class="arrow has-text-centered"
      @click="decrease"
    >
      ▼
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreField',
  props: {
    value: {
      type: Number,
      required: false,
      default: 0,
    },
    min: {
      type: Number,
      required: false,
      default: 0,
    },
    max: {
      type: Number,
      required: false,
      default: 15,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    isHalfTime: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    canIncrease() {
      const inc = this.value < this.max && !this.disabled
      return this.isHalfTime ? inc : inc
    },
    canDecrease() {
      return this.value > this.min && !this.disabled
    },
  },
  methods: {
    increase() {
      if (!this.canIncrease) return
      this.updateValue(this.value + 1)
    },
    decrease() {
      if (!this.canDecrease) return
      this.updateValue(this.value - 1)
    },
    updateValue(value) {
      this.$emit('input', value)
      this.$emit('updated')
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
.score {
  height: 72px;
  width: 48px;
  font-family: 'Share Tech Mono', cursive;
  border: 1px solid lightgrey;
  border-radius: 1rem;
}
.score.is-small {
  height: 64px;
  width: 40px;
}
.arrow {
  width: 48px;
  cursor: pointer;
  font-size: 1.25rem;
}
.arrow.is-small {
  width: 40px;
  font-size: 1.1rem;
}
</style>
