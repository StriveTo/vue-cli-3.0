const moduleA = {
  state: {
    age: 0,
  },
  mutations: {
    ADD_NAME(state, age) {
      state.age = age
    },
  },
  actions: {
    addAge({ commit }, age) {
      commit('ADD_NAME', age)
    },
  },
}

export default moduleA
