<template>
  <div :class='cssClasses'>
    <component :is='passage'
               v-scroll-to
               />
  </div>
</template>

<script>
export default {
  name: 'passage-container',
  props: ['passage', 'active'],
  computed: {
    cssClasses () {
      return {
        passage: true,
        [this.passage]: true,
        active: this.active
      }
    }
  },
  directives: {
    scrollTo: {
      inserted (el) {
        window.scrollTo(0, el.offsetTop)
      }
    }
  }
}
</script>
