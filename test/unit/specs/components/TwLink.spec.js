import Vue from 'vue'
import Vuex from 'vuex'
import TwLink from 'src/components/TwLink'

Vue.use(Vuex)

describe('TwLink.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      template: '<div><tw-link to="a place">lol</tw-link></div>',
      components: {TwLink}
    }).$mount()

    expect(vm.$el.querySelector('a[href="#"]').textContent)
      .to.equal('lol')
  })

  it('should set a new location on click', () => {
    const store = new Vuex.Store({
      state: {currentPassage: ''},
      mutations: {
        setCurrentPassage (state, name) {
          state.currentPassage = name
        }
      },
      getters: {
        passageForKey (state) {
          return function (key) {
            return true
          }
        }
      }
    })
    const vm = new Vue({
      template: '<div><tw-link to="a place">lol</tw-link></div>',
      components: {TwLink},
      store
    }).$mount()

    vm.$el.querySelector('a').dispatchEvent(new Event('click'))
    expect(store.state.currentPassage).to.equal('a place')
  })

  it('should no-op on nonexistent passages', () => {
    const store = new Vuex.Store({
      state: {currentPassage: 'no where'},
      mutations: {
        setCurrentPassage (state, name) {
          state.currentPassage = name
        }
      },
      getters: {
        passageForKey (state) {
          return function (key) {
            return false
          }
        }
      }
    })
    const vm = new Vue({
      template: '<div><tw-link to="a place">lol</tw-link></div>',
      components: {TwLink},
      store
    }).$mount()

    vm.$el.querySelector('a').dispatchEvent(new Event('click'))
    expect(store.state.currentPassage).to.equal('no where')
  })
})
