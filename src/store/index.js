import Vuex from 'vuex'
import { keyBy } from 'lodash'

export default function configureStore () {
  return new Vuex.Store({
    state: {
      currentPassage: '',
      passages: {}
    },
    mutations: {
      setCurrentPassage (state, passageName) {
        state.currentPassage = passageName
      },
      hydratePassages (state, passages) {
        state.passages = keyBy(passages, 'name')
      }
    },
    getters: {
      currentPassageComponent (state) {
        if (state.passages[state.currentPassage]) {
          return state.passages[state.currentPassage].component.name
        } else {
          return null
        }
      }
    }
  })
}
