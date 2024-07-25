import { createStore } from 'vuex'

export default createStore({
  state: {
    username: ''
  },
  getters: {
    getUsername: (state) => state.username
  },
  mutations: {
    setUsername: (state, username) => {
      state.username = username
    }
  },
  actions: {
    updateUsername: ({ commit }, username) => {
      commit('setUsername', username)
    }
  },
  modules: {}
})
