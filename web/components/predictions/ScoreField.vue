<template>
  <div class="mx-3 is-flex is-flex-direction-column is-align-items-center">
    <div
      :style="{ cursor: value < max ? 'pointer' : 'initial' }"
      :class="{
        'has-text-primary': value < max,
        'has-text-grey-lighter': value >= max,
      }"
      class="arrow has-text-centered has-text-primary"
      @click="increase"
    >
      ▲
    </div>

    <div
      style="height: 72px"
      class="score is-size-1 is-flex is-justify-content-center is-align-items-center"
    >
      {{ value }}
    </div>

    <div
      :style="{ cursor: value > min ? 'pointer' : 'initial' }"
      :class="{
        'has-text-primary': value > min,
        'has-text-grey-lighter': value <= min,
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
  },
  data() {
    return {}
  },
  methods: {
    increase() {
      if (this.value >= this.max) return
      this.updateValue(this.value + 1)
    },
    decrease() {
      if (this.value <= this.min) return
      this.updateValue(this.value - 1)
    },
    updateValue(value) {
      this.$emit('input', value)
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
.arrow {
  width: 48px;
  cursor: pointer;
  font-size: 1.25rem;
}
</style>
