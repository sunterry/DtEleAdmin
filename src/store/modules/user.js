import { serverLogin } from '@/http'
import { setStorage, getStorage, removeStorage } from '@/utils/dt-storage'
import deCodeToken from '@/utils/dt-resolution-token'
import { SET_TOKEN, SET_USER_INFO, GET_USER_ERR, SET_VUE_AUTH } from './../types'
export default {
  state: {
    token: getStorage('token'),
    userInfo: {},
    err: {},
    vueAuth: getStorage('vueAuth') ? JSON.parse(getStorage('vueAuth')) : []
  },
  actions: {
    handleLogin ({ commit }, { username, password }) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        serverLogin({ user_name: username, password }).then(res => {
          commit(SET_TOKEN, res.token)
          commit(SET_VUE_AUTH, res.vue_auth)
          resolve(res.token)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.token) {
          const userInfo = deCodeToken(state.token)
          commit(SET_USER_INFO, Object.assign({}, userInfo))
          resolve({ userInfo, vueAuth: state.vueAuth })
        } else {
          const ERR = { code: 401, msg: '登录失败' }
          commit(GET_USER_ERR, ERR)
          commit(SET_TOKEN, '')
          reject(ERR)
        }
      })
    },
    handleLogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        commit(SET_TOKEN, '')
        commit(SET_USER_INFO, {})
        commit(SET_VUE_AUTH, [])
        removeStorage('token')
        resolve()
      })
    }
  },
  mutations: {
    [SET_TOKEN] (state, token) {
      state.token = token
      setStorage('token', token)
    },
    [SET_VUE_AUTH] (state, vueAuth) {
      state.vueAuth = vueAuth
      setStorage('vueAuth', JSON.stringify(vueAuth))
    },
    [SET_USER_INFO] (state, userInfo) {
      state.userinfo = userInfo
      state.err = null
    },
    [GET_USER_ERR] (state, err) {
      state.isAuth = false
      state.userinfo = null
      state.err = err
    }
  },
  getters: {
    userinfo (state) {
      return state.userinfo
    },
    access (state) {
      return state.vueAuth
    }
  }
}
