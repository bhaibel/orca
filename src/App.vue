<template>
  <div id="app">
    <transition-group name="passage__transition" tag="div">
      <passage-container v-for='(passage, index) in passageComponentHistory'
                         :passage='passage'
                         :active='index === passageComponentHistory.length - 1'
                         :key='passage'
                         />
    </transition-group>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PassageContainer from './components/PassageContainer'

export default {
  name: 'app',
  computed: mapGetters(['passageComponentHistory']),
  components: {
    PassageContainer
  }
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
