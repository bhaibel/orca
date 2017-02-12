// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import { map } from 'lodash'

import App from './App'
import TwLink from './components/TwLink'
import compilePassage from './lib/compile_passage'
import configureStore from 'store'

Vue.use(Vuex)

Vue.component('tw-link', TwLink)

const storyData = document.querySelector('tw-storydata')
const startingPid = storyData.getAttribute('startnode')

const passageData = document.querySelectorAll('tw-passagedata')
const passages = map(passageData, node => compilePassage(node))

const startingPassage = passages.find(passage => passage.pid === startingPid)

passages.forEach((passage) => {
  Vue.component(passage.component.name, passage.component)
})

const store = configureStore()
store.commit('hydratePassages', passages)
store.commit('setCurrentPassage', startingPassage.name)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App />',
  components: { App },
  store
})
