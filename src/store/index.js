import Vuex from 'vuex'
import { keyBy } from 'lodash'

export default function configureStore () {
  return new Vuex.Store({
    state: {
      passageHistory: [],
      passages: {}
    },
    mutations: {
      setCurrentPassage (state, passageName) {
        state.passageHistory = state.passageHistory.concat(passageName)
      },
      hydratePassages (state, passages) {
        state.passages = keyBy(passages, 'name')
      }
    },
    getters: {
      currentPassage (state) {
        if (state.passageHistory.length === 0) {
          return null
        } else {
          return state.passageHistory[state.passageHistory.length - 1]
        }
      },
      currentPassageComponent (state, getters) {
        if (state.passages[getters.currentPassage]) {
          return state.passages[getters.currentPassage].component.name
        } else {
          return null
        }
      },
      passageComponentHistory (state, getters) {
        return state.passageHistory.map(p => state.passages[p].component.name)
      },
      passageForKey (state, getters) {
        return function (key) {
          return state.passages[key]
        }
      }
    }
  })
}
