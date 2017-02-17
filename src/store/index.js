import Vuex from 'vuex'
import { keyBy } from 'lodash'

export default function configureStore () {
  return new Vuex.Store({
    state: {
      passageKeyHistory: [],
      passages: {}
    },
    mutations: {
      setCurrentPassage (state, passageName) {
        state.passageKeyHistory = state.passageKeyHistory.concat(passageName)
      },
      hydratePassages (state, passages) {
        state.passages = keyBy(passages, 'name')
      }
    },
    getters: {
      currentPassageName (state) {
        if (state.passageKeyHistory.length === 0) {
          return null
        } else {
          return state.passageKeyHistory[state.passageKeyHistory.length - 1]
        }
      },
      currentPassageComponent (state, getters) {
        if (state.passages[getters.currentPassageName]) {
          return state.passages[getters.currentPassageName].component.name
        } else {
          return null
        }
      },
      passageHistory (state, getters) {
        return state.passageKeyHistory.map(p => state.passages[p])
      },
      passageForKey (state, getters) {
        return function (key) {
          return state.passages[key]
        }
      },
      currentPassage (state, getters) {
        return getters.passageForKey(getters.currentPassageName)
      }
    },
    plugins: [bodyClassSync()]
  })
}

function bodyClassSync () {
  return function (store) {
    store.subscribe((mutation) => {
      if (!store.getters.currentPassage) return
      const bodyClasses = store
                         .getters
                         .currentPassage
                         .tags
                         .map(t => `tag--${t}`)
                         .join(' ')
      document.body.setAttribute('class', bodyClasses)
    })
  }
}
