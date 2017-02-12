// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import TwLink from './components/TwLink'
import compilePassage from './lib/compile_passage'

import { map } from 'lodash'

Vue.component('tw-link', TwLink)

const passageData = document.querySelectorAll('tw-passagedata')
const passages = map(passageData, node => compilePassage(node))

passages.forEach((passage) => {
  Vue.component(passage.component.name, passage.component)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App :passages="passages.map(p => p.component.name)" />',
  components: { App },
  data () {
    return {
      passages
    }
  }
})
