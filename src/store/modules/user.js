// import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, getSession } from '@/assets/js/util'

const states = {
  status: '',
  token: '',
  name: '',
}
Object.keys(states).forEach((key) => {
  getSession(key, states)
})
states.token = getToken()
const user = {
  state: states,
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_STATUS(state, status) {
      state.status = status
    },
    SET_NAME(state, name) {
      state.name = name
    },
  },

  actions: {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    // 用户名登录
    // LoginByUsername({ commit }, userInfo) {
    //   const username = userInfo.username.trim()
    //   return new Promise((resolve, reject) => {
    //     loginByUsername(username, userInfo.password).then(response => {
    //       const data = response.data
    //       commit('SET_TOKEN', data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    //
    // // 获取用户信息
    // GetUserInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo(state.token).then(response => {
    //       if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
    //         reject('error')
    //       }
    //       const data = response.data
    //
    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }
    //
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.introduction)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
  },
}

export default user
