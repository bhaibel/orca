<template>
  <a href='#' @click.prevent='go'><slot></slot></a>
</template>

<script>
export default {
  name: 'tw-link',
  props: ['to'],
  methods: {
    go () {
      if (this.$store.getters.passageForKey(this.to)) {
        this.$store.commit('setCurrentPassage', this.to)
      }
    }
  }
}
</script>
