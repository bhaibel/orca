<template>
  <a :href='active ? "" : null' @click.prevent='go'><slot></slot></a>
</template>

<script>
export default {
  name: 'tw-link',
  props: ['to'],
  computed: {
    active () {
      return this.$parent.$parent.active
    }
  },
  methods: {
    go () {
      if (!this.active) return
      if (this.$store.getters.passageForKey(this.to)) {
        this.$store.commit('setCurrentPassage', this.to)
      }
    }
  }
}
</script>
