<template>
  <a :href='to'><slot></slot></a>
</template>

<script>
export default {
  name: 'tw-link',
  props: ['to']
}
</script>
