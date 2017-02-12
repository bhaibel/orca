import Vue from 'vue'
import Vuex from 'vuex'
import configureStore from 'src/store'

Vue.use(Vuex)

describe('store', () => {
  it('can set current passage', () => {
    const store = configureStore()
    store.commit('setCurrentPassage', 'a-name')
    expect(store.state.currentPassage).to.equal('a-name')
  })

  it('can load passages', () => {
    const store = configureStore()
    store.commit('hydratePassages', [{name: 'passage name'}])
    expect(store.state.passages['passage name'].name).to.equal('passage name')
  })

  it('surfaces the current passage\'s component name', () => {
    const store = configureStore()
    store.commit('hydratePassages', [{name: 'passage name', component: {name: 'foo'}}])
    store.commit('setCurrentPassage', 'passage name')
    expect(store.getters.currentPassageComponent).to.equal('foo')
  })

  it('doesn\'t error out when providing the current passage component pre-load', () => {
    const store = configureStore()
    expect(store.getters.currentPassageComponent).to.be.null
  })
})
