const moduleB = {
  state: {
    list: [],
  },
  mutations: {
    ADD_LIST(state, info) {
      state.list.push(info)
    },
  },
  actions: {
    addList({ commit }, info) {
      commit('ADD_LIST', info)
    },
  },
}

export default moduleB
