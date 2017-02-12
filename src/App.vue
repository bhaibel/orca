<template>
  <div id="app">
    <component v-for='passage in passages'
               :is='passage' />
  </div>
</template>

<script>
export default {
  name: 'app',
  props: ['passages']
}
</script>

<style>
tw-storydata {
  display: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
