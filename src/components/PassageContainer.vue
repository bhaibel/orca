<template>
  <div :class='cssClasses'>
    <component :is='passage.component.name'
               v-scroll-to
               />
  </div>
</template>

<script>
import { reduce } from 'lodash'

export default {
  name: 'passage-container',
  props: ['passage', 'active'],
  computed: {
    tags () {
      return this.$store.state.passages[this.passage.name].tags || []
    },
    cssClasses () {
      const tagClasses = reduce(this.tags, (result, t) => {
        result[`tag--${t}`] = true
        return result
      }, {})

      return {
        passage: true,
        [this.passage.component.name]: true,
        'passage--active': this.active,
        ...tagClasses
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
